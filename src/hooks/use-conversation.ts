"use client";

import { ConversationContext } from "@/providers/conversation-provider";
import { useContext } from "react";

export function useConversation() {
  const conversationContext = useContext(ConversationContext);
  if (!conversationContext) {
    throw new Error("useConversation must be within a ConversationProvider");
  }
  return conversationContext;
}
