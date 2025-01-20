"use client";

import { SERVER_URL } from "@/configs/env.config";
import useLocalStorage from "@/hooks/use-localstorage";
import { generateSessionId } from "@/utils";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export type Conversation = {
  role: "user" | "agent";
  message: string;
};
type ConversationItem = {
  role: string;
  content: string;
  session_id: string;
};

type ConversationSession = {
  session_id: string;
  content: string;
};

export type Chat = {
  conversation: Conversation[];
  isThinking: boolean;
  isFetching: boolean;
  isAnswering: boolean;
  answeringText: string | null;
  conversationSessions: ConversationSession[];
  fetchConversation: ({ sessionId }: { sessionId: string }) => void;
  submitUserInput: ({
    message,
    images,
  }: {
    message?: string;
    images?: File[];
  }) => void;
  createConversation: () => void;
};

export const ConversationContext = createContext<Chat | null>(null);

export const ConversationProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [answeringText, setAnsweringText] = useState<string | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [conversationSessions, setConversationSessions] = useState<
    ConversationSession[]
  >([]);
  const { data: session } = useSession();
  const { getLocalValue, setLocalValue } = useLocalStorage();

  const fetchConversation = useCallback(
    async ({ sessionId }: { sessionId: string }) => {
      setCurrentSessionId(sessionId);
      const payload = {
        session_id: sessionId,
        user_id: session?.user?.email,
      };

      try {
        setIsFetching(true);
        const serverUrl = `${SERVER_URL}/agent/history`;
        if (!serverUrl) throw new Error("Server URL are not defined");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const conversationHistory = await response.json();
        const transformedConversation = conversationHistory.map(
          (item: ConversationItem) => ({
            role: item.role === "user" ? "user" : "agent",
            message: item.content,
          }),
        );
        setConversation(transformedConversation);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [session?.user?.email],
  );

  const fetchConversationSessions = useCallback(async () => {
    const payload = {
      user_id: session?.user?.email,
    };

    try {
      setIsFetching(true);
      const serverUrl = `${SERVER_URL}/agent/history`;
      if (!serverUrl) throw new Error("Server URL are not defined");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const conversationSessionsHistory = await response.json();

      console.log("temp 1: ", conversationSessionsHistory);

      const transformedConversationSessionsHistory =
        conversationSessionsHistory.map((item: ConversationItem[]) => ({
          session_id: item[0].session_id,
          content: item[0].content,
        }));

      console.log("temp: ", transformedConversationSessionsHistory);

      setConversationSessions(transformedConversationSessionsHistory);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  }, [session?.user?.email]);

  const submitUserInput = useCallback(
    async ({ message, images }: { message?: string; images?: File[] }) => {
      if (!session) {
        setConversation((prev) => [
          ...prev,
          { role: "agent", message: "Please signin to chat with me" },
        ]);
        return;
      }
      if (!message) return;
      setConversation((prev) => [...prev, { role: "user", message: message }]);
      setIsThinking(true);

      const payload = {
        message: message,
        session_id: currentSessionId,
        images: images,
        user_id: session?.user?.email,
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
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        setIsThinking(false);
        setIsAnswering(true);
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Failed to get reader from response body.");
        }

        const decoder = new TextDecoder("utf-8");
        let result = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const chunkArray = chunk.split("\n");

          const handledChunkArray: { event: string; data: string[] } = {
            event: "",
            data: [],
          };
          chunkArray.forEach((line) => {
            if (line.startsWith("event: ")) {
              handledChunkArray.event = line.replace("event: ", "");
            } else if (line.startsWith("data:")) {
              handledChunkArray.data.push(line.replace(/^data: /, ""));
            } else handledChunkArray.data.push(line);
          });

          if (handledChunkArray.event === "token") {
            result += handledChunkArray.data
              .filter((str) => str.trim() !== "")
              .join("\n");
          } else {
            result = handledChunkArray.data.join("\n");
          }
          setAnsweringText(result);
        }
        setIsAnswering(false);
        setAnsweringText(null);
        setConversation((prev) => [
          ...prev,
          { role: "agent", message: result },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setConversation((prev) => [
          ...prev,
          {
            role: "agent",
            message: "Failed to get response. Try again in 1 minutes",
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [currentSessionId, session],
  );

  const createConversation = useCallback(() => {
    setConversation([]);
    const newSessionId = generateSessionId();
    setLocalValue("session_id", newSessionId);
    setCurrentSessionId(newSessionId);
  }, [setLocalValue]);

  useEffect(() => {
    if (session) {
      fetchConversationSessions();
    }
  }, [fetchConversationSessions, session]);

  useEffect(() => {
    const localSessionId = getLocalValue("session_id");
    if (!localSessionId) {
      const newSessionId = generateSessionId();
      setLocalValue("session_id", newSessionId);
      setCurrentSessionId(newSessionId);
      return;
    }
    if (!session) return;

    fetchConversation({
      sessionId: localSessionId,
    });
  }, [fetchConversation, getLocalValue, setLocalValue, session]);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        isThinking,
        isFetching,
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
