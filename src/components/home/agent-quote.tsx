"use client";

import TypingAnimation from "../ui/typing-animation";
import { useConversation } from "@/hooks/use-conversation";
import { getLastName } from "@/utils";
import { useSession } from "next-auth/react";

export default function AgentQuote() {
  const { data: session } = useSession();
  const { conversation } = useConversation();

  if (conversation.length > 0 || !session?.user?.name) return null;

  return (
    <TypingAnimation
      duration={25}
      className="z-10 mx-auto mb-3 w-full max-w-191 text-2xl font-semibold text-white">
      {`Hi ${getLastName(session?.user?.name ?? "")}, what can I help with?`}
    </TypingAnimation>
  );
}
