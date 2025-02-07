"use client";

import { AgentCallPayload, ConversationPayload } from "@/apis/agent";
import { SERVER_URL } from "@/configs/env.config";
import { ConversationContext } from "@/contexts/conversation";
import useFileUpload from "@/hooks/use-file-upload";
import { Conversation, ConversationSession } from "@/interfaces/conversation";
import { generateSessionId, handleStreamEventData } from "@/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

export const ConversationProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isFetchingConversation, setIsFetchingConversation] =
    useState<boolean>(true);
  const [isFetchingConversationSessions, setIsFetchingConversationSessions] =
    useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [answeringText, setAnsweringText] = useState<string | null>(null);
  const [conversationSessionId, setConversationSessionId] = useState<
    string | null
  >(null);
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const [conversationSessions, setConversationSessions] = useState<
    ConversationSession[][] | ConversationSession[]
  >([]);

  const { data: session } = useSession();
  const { uploadFiles } = useFileUpload();
  const router = useRouter();
  const pathname = usePathname();

  const updateQuery = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router],
  );

  const resetQuery = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const fetchConversation = useCallback(
    async ({ sessionId }: { sessionId: string }) => {
      if (!session?.user?.email) return;
      setConversationSessionId(sessionId);
      const payload: ConversationPayload = {
        session_id: sessionId,
      };

      try {
        setIsFetchingConversation(true);
        const serverUrl = `${SERVER_URL}/agent/history`;
        if (!serverUrl) throw new Error("Server URL are not defined");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const conversation: Conversation[] = await response.json();
        if (!conversation || conversation.length === 0) {
          throw new Error("No conversation data found");
        }

        setConversation(conversation);
        updateQuery("conversation", sessionId);
      } catch (error) {
        console.error("Error:", error);
        router.push(pathname);
      } finally {
        setIsFetchingConversation(false);
      }
    },
    [
      session,
      router,
      pathname,
      updateQuery,
      setConversationSessionId,
      setConversation,
      setIsFetchingConversation,
    ],
  );

  const fetchConversationSessions = useCallback(async () => {
    if (!session) return;
    try {
      setIsFetchingConversationSessions(true);
      const serverUrl = `${SERVER_URL}/agent/history`;
      if (!serverUrl) throw new Error("Server URL are not defined");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const conversationSessions: ConversationSession[][] =
        await response.json();

      setConversationSessions(conversationSessions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetchingConversationSessions(false);
    }
  }, [session, setIsFetchingConversationSessions, setConversationSessions]);

  const submitUserInput = useCallback(
    async ({ message, images }: { message?: string; images?: File[] }) => {
      if (
        !session ||
        !conversationSessionId ||
        !session?.user?.email ||
        (!message && !images)
      )
        return;

      setIsThinking(true);

      let uploadImageURLs: string[] = [];
      if (images && images.length > 0) {
        uploadImageURLs = await uploadFiles(images);
      }

      setConversation((prev) => [
        ...prev,
        { role: "user", content: message || "", images: uploadImageURLs },
      ]);

      const payload: AgentCallPayload = {
        message,
        session_id: conversationSessionId,
        images: uploadImageURLs,
      };

      try {
        const serverUrl = `${SERVER_URL}/agent/call`;
        if (!serverUrl) throw new Error("SERVER_URL is not defined");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const agentResponse = response.body;

        setIsThinking(false);
        setIsAnswering(true);

        const reader = agentResponse?.getReader();
        if (!reader)
          throw new Error("Failed to get reader from response body.");

        const decoder = new TextDecoder("utf-8");
        let result = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += handleStreamEventData(chunk);

          setAnsweringText(result);
        }

        setIsAnswering(false);
        setAnsweringText(null);
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: result },
        ]);

        if (conversation.length === 0) {
          await fetchConversationSessions();
          updateQuery("conversation", conversationSessionId);
        }
      } catch (error) {
        console.error("Error:", error);
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: "Failed to get response. Try again!" },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [
      conversationSessionId,
      session,
      conversation,
      updateQuery,
      uploadFiles,
      fetchConversationSessions,
      setConversation,
      setIsThinking,
      setIsAnswering,
      setAnsweringText,
    ],
  );

  const createConversation = useCallback(() => {
    resetQuery();
    setConversation([]);
    const newConversationSessionId = generateSessionId();
    setConversationSessionId(newConversationSessionId);
  }, [resetQuery]);

  useEffect(() => {
    if (!conversationId) {
      createConversation();
    } else {
      fetchConversation({ sessionId: conversationId });
    }
  }, [createConversation, conversationId, fetchConversation]);

  useEffect(() => {
    fetchConversationSessions();
  }, [fetchConversationSessions]);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        isThinking,
        isFetchingConversation,
        isFetchingConversationSessions,
        isAnswering,
        answeringText,
        conversationSessions,
        conversationId,
        submitUserInput,
        fetchConversation,
        createConversation,
      }}>
      {children}
    </ConversationContext.Provider>
  );
};
