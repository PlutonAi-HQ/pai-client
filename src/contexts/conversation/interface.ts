import { Conversation, ConversationSession } from "@/interfaces/conversation";

export interface ConversationContextValue {
  conversation: Conversation[];
  isThinking: boolean;
  isFetchingConversation: boolean;
  isFetchingConversationSessions: boolean;
  isAnswering: boolean;
  answeringText: string | null;
  conversationSessions: ConversationSession[][] | ConversationSession[];
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
