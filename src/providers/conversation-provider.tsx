"use client";

import useLocalStorage from "@/hooks/use-localstorage";
import { generateSessionId } from "@/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

export type Conversation = {
  role: "user" | "agent";
  message: string;
};

export type Chat = {
  conversation: Conversation[];
  isThinking: boolean;
  isFetching: boolean;
  isAnswering: boolean;
  answeringText: string | null;
  conversationSessions: string[];
  fetchConversation: ({ sessionId }: { sessionId: string }) => void;
  submitUserInput: (message: string) => void;
  createConversation: () => void;
};

type ConversationItem = {
  role: string;
  content: string;
  session_id: string;
};

export const ConversationContext = createContext<Chat | null>(null);

export const ConversationProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { publicKey } = useWallet();

  const [conversation, setConversation] = useState<{ role: "user" | "agent"; message: string }[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [answeringText, setAnsweringText] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversationSessions, setConversationSessions] = useState<string[]>([]);
  const { getLocalValue, setLocalValue } = useLocalStorage();

  const fetchConversation = useCallback(
    async ({ sessionId }: { sessionId: string }) => {
      const payload = {
        session_id: sessionId,
        user_id: publicKey,
      };

      try {
        setIsFetching(true);
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
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
        setConversation(conversationHistory);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [publicKey],
  );

  const fetchConversationSessions = useCallback(async () => {
    const payload = {
      user_id: publicKey,
    };

    try {
      setIsFetching(true);
      const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
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
      const handledConversationSessionsHistory: string[] = Array.from(
        new Set(conversationSessionsHistory.flat().map((item: ConversationItem) => item.session_id)),
      );
      setConversationSessions(handledConversationSessionsHistory);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  }, [publicKey]);

  const submitUserInput = useCallback(
    async (message: string) => {
      setConversation([...conversation, { role: "user", message: message }]);
      setIsThinking(true);

      const payload = {
        message: message,
        session_id: sessionId,
        images: [],
        user_id: publicKey,
      };

      try {
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/agent/call`;
        if (!serverUrl) {
          throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");
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

          const handledChunkArray: { event: string; data: string[] } = { event: "", data: [] };
          chunkArray.forEach((line) => {
            if (line.startsWith("event: ")) {
              handledChunkArray.event = line.replace("event: ", "");
            } else if (line.startsWith("data:")) {
              handledChunkArray.data.push(line.replace(/^data: /, ""));
            } else handledChunkArray.data.push(line);
          });

          if (handledChunkArray.event === "token") {
            result += handledChunkArray.data.filter((str) => str.trim() !== "").join("\n");
          } else {
            result = handledChunkArray.data.join("\n");
          }
          setAnsweringText(result);
        }
        setIsAnswering(false);
        setAnsweringText(null);
        setConversation([...conversation, { role: "agent", message: result }]);
      } catch (error) {
        console.error("Error:", error);
        setConversation([
          ...conversation,
          { role: "agent", message: "Failed to get response. Try again in 1 minutes" },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [conversation, publicKey, sessionId],
  );

  const createConversation = useCallback(() => {
    setConversation([]);
    setLocalValue("session_id", generateSessionId());
  }, [setLocalValue]);

  useEffect(() => {
    fetchConversationSessions();
  }, [fetchConversationSessions]);

  useEffect(() => {
    if (!sessionId) {
      const localSessionId = getLocalValue("session_id");
      if (!localSessionId) {
        const newSessionId = generateSessionId();
        setLocalValue("session_id", newSessionId);
        setSessionId(newSessionId);
        return;
      } else {
        setSessionId(localSessionId);
      }
    } else {
      fetchConversation({
        sessionId: sessionId,
      });
    }
  }, [fetchConversation, getLocalValue, publicKey, setLocalValue, sessionId]);

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
