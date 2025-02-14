"use client";

import HistoryItem from "./history-item";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { useConversation } from "@/hooks/use-conversation";

export default function HistoryList() {
  const { isFetchingConversationSessions, conversationSessions } =
    useConversation();
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
      <SidebarGroupContent className="h-full overflow-y-auto">
        <SidebarMenu className="pr-2">
          {conversationSessions.map(({ session_id, title }) => (
            <HistoryItem
              key={session_id}
              sessionId={session_id}
              title={title}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
