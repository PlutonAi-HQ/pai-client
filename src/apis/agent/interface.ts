export interface ConversationSessionsPayload {
  user_id: string;
}

export interface ConversationPayload {
  session_id: string;
  // user_id: string;
}

export interface AgentCallPayload {
  message?: string;
  session_id: string;
  images?: string[];
  user_id: string;
}
