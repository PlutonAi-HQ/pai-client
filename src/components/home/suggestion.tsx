"use client";

import { MagicCard } from "../ui/magic-card";
import { actionSuggestions } from "@/constants/conversation";
import { useConversation } from "@/hooks/use-conversation";
import { useTheme } from "next-themes";
import { Key } from "react";

export default function Suggestions() {
  const { theme } = useTheme();
  const { submitUserInput, conversation } = useConversation();

  if (conversation.length > 0) return;

  return (
    <div className="mx-auto w-full max-w-191">
      <h3 className="my-2 text-sm font-bold text-white/80 dark:text-black/40">
        Suggestion
      </h3>
      <div className="my-2 grid grid-cols-2 gap-4">
        {actionSuggestions.map((suggestion, key: Key) => (
          <MagicCard
            key={key}
            className="hover:shadow-xl hover:shadow-white/20"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            gradientFrom="#ecfeff"
            gradientTo="#22d3ee">
            <div
              className="cursor-pointer p-4"
              onClick={() => submitUserInput({ message: suggestion.title })}>
              <p className="font-bold">{suggestion.title}</p>
              <p className="text-xs text-white/50 dark:text-black/70">
                {suggestion.description}
              </p>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
}
