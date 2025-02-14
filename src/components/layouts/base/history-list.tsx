"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useConversation } from "@/hooks/use-conversation";
import { Conversation } from "@/interfaces/conversation";

export default function HistoryList() {
  const {
    isFetchingConversationSessions,
    conversationSessions,
    fetchConversation,
  } = useConversation();
  if (isFetchingConversationSessions)
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );

  if (conversationSessions.length == 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem className="text-center">
          No Conversations
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarGroup className="overflow-y-hidden">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent className="h-full hover:overflow-y-auto">
        <SidebarMenu className="pr-2">
          {conversationSessions.map(({ session_id, title }) => (
            <SidebarMenuItem key={session_id}>
              <SidebarMenuButton
                className="min-w-0 max-w-full truncate"
                onClick={() =>
                  fetchConversation({
                    sessionId: session_id,
                  })
                }>
                <p className="truncate"> {title}</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
