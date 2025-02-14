import { ConversationContent, Conversation } from "@/interfaces/conversation";

export interface ConversationContextValue {
  conversation: ConversationContent[];
  isThinking: boolean;
  isFetchingConversation: boolean;
  isFetchingConversationSessions: boolean;
  isAnswering: boolean;
  answeringText: string | null;
  conversationSessions: Omit<Conversation, "data">[];
  conversationId: string | undefined | null;
  fetchConversation: ({ sessionId }: { sessionId: string }) => void;
  submitUserInput: ({
    message,
    images,
  }: {
    message?: string;
    images?: File[];
  }) => void;
  createConversation: () => void;
}
