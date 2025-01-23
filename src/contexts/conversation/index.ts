import { ConversationContextValue } from "./interface";
import { createContext } from "react";

export const ConversationContext =
  createContext<ConversationContextValue | null>(null);
