import { ConversationRole } from "@/types/conversation";

export interface Conversation {
  title: string;
  session_id: string;
  data: ConversationContent[];
  created_at: Date;
}

export interface ConversationContent {
  role: ConversationRole;
  content: string;
  images?: string[];
}

export interface ActionSuggestion {
  title: string;
  description: string;
}

export interface Intergration {
  title: string;
  description: string;
}

export interface AgentCallPayload {
  message?: string;
  session_id: string;
  images?: string[];
}
