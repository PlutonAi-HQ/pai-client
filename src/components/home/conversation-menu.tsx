"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useConversation } from "@/hooks/use-conversation";

export default function ConversationMenu() {
  const { createConversation } = useConversation();
  return (
    <div className="flex items-center space-x-3">
      <SidebarTrigger />
      <Button
        variant={"secondary"}
        onClick={createConversation}>
        New chat
      </Button>
    </div>
  );
}
