import { AgentCallPayload, ConversationPayload } from "./interface";
import { SERVER_URL } from "@/configs/env.config";
import { Conversation, ConversationSession } from "@/interfaces/conversation";
import { getSession } from "next-auth/react";

export const getConversationSessions = async () => {
  const session = await getSession();

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

  const conversationSessions: ConversationSession[][] = await response.json();

  return conversationSessions;
};

export const getConversation = async (
  payload: ConversationPayload,
): Promise<Conversation[]> => {
  const session = await getSession();

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
  return conversation;
};

export const postAgentCall = async (payload: AgentCallPayload) => {
  const session = await getSession();

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

  return response.body;
};
