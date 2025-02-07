"use client";

import { MagicCard } from "../ui/magic-card";
import { actionSuggestions } from "@/constants/conversation";
import { useConversation } from "@/hooks/use-conversation";
import { Key } from "react";

export default function Suggestions() {
  const { submitUserInput, conversation, conversationId } = useConversation();

  if (conversation.length > 0 || conversationId) return;

  return (
    <div className="mx-auto my-3 grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-4">
      {actionSuggestions.map((suggestion, key: Key) => (
        <MagicCard
          key={key}
          className="border border-transparent hover:border-[#3FCBFA] hover:shadow-md hover:shadow-[#3FCBFA]"
          gradientColor="#262626"
          gradientFrom="#ecfeff"
          gradientTo="#3FCBFA">
          <div
            className="cursor-pointer p-4"
            onClick={() => submitUserInput({ message: suggestion.title })}>
            <p className="bg-gradient-to-b from-white to-[#3FCBFA] bg-clip-text font-bold text-transparent">
              {suggestion.title}
            </p>
            <p className="text-xs text-black/70 dark:text-white/50">
              {suggestion.description}
            </p>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
