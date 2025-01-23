import { ConversationRole } from "@/types/conversation";

export interface ConversationSession {
  role: ConversationRole;
  session_id: string;
  content: string;
}

export interface Conversation {
  role: ConversationRole;
  content: string;
  images?: string[];
  session_id?: string;
}

export interface ActionSuggestion {
  title: string;
  description: string;
}

export interface Intergration {
  title: string;
  description: string;
}
