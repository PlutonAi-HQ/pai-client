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
      className="mx-auto mb-1 w-full max-w-5xl text-center text-2xl font-semibold">
      {`Hi ${getLastName(session?.user?.name ?? "")}, what can I help with?`}
    </TypingAnimation>
  );
}
