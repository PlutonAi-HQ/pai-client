"use client";

import {
  AgentCallPayload,
  ConversationPayload,
  getConversation,
  getConversationSessions,
  postAgentCall,
} from "@/apis/agent";
import { SERVER_URL } from "@/configs/env.config";
import { ConversationContext } from "@/contexts/conversation";
import useFileUpload from "@/hooks/use-file-upload";
import useLocalStorage from "@/hooks/use-localstorage";
import { Conversation, ConversationSession } from "@/interfaces/conversation";
import { generateSessionId, handleStreamEventData } from "@/utils";
import { useSession } from "next-auth/react";
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
  const [conversationSessions, setConversationSessions] = useState<
    ConversationSession[][] | ConversationSession[]
  >([]);
  const { data: session } = useSession();
  const { setLocalValue } = useLocalStorage();
  const { uploadFiles } = useFileUpload();

  const fetchConversation = useCallback(
    async ({ sessionId }: { sessionId: string }) => {
      if (!session?.user?.email) return;
      setConversationSessionId(sessionId);
      const payload: ConversationPayload = {
        session_id: sessionId,
        // user_id: session.user.email,
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
        setConversation(conversation);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsFetchingConversation(false);
      }
    },
    [session],
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
  }, [session]);

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
        user_id: session.user.email,
      };

      try {
        const serverUrl = `${SERVER_URL}/agent/call`;
        if (!serverUrl) {
          throw new Error("SERVER_URL is not defined");
        }
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
        if (!reader) {
          throw new Error("Failed to get reader from response body.");
        }

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
        }
      } catch (error) {
        console.error("Error:", error);
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Failed to get response. Try again!",
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [
      conversationSessionId,
      uploadFiles,
      fetchConversationSessions,
      session,
      conversation,
    ],
  );

  const createConversation = useCallback(() => {
    setConversation([]);
    const newConversationSessionId = generateSessionId();
    setLocalValue("conversation_session_id", newConversationSessionId);
    setConversationSessionId(newConversationSessionId);
  }, [setLocalValue]);

  useEffect(() => {
    fetchConversationSessions();
  }, [fetchConversationSessions]);

  useEffect(() => {
    const newLocalSessionId = generateSessionId();
    setLocalValue("conversation_session_id", newLocalSessionId);
    setConversationSessionId(newLocalSessionId);
  }, [setLocalValue]);

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
        submitUserInput,
        fetchConversation,
        createConversation,
      }}>
      {children}
    </ConversationContext.Provider>
  );
};
