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
import { ConversationSession } from "@/interfaces/conversation";

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

  const isNestedArray = Array.isArray(conversationSessions?.[0]);

  return (
    <SidebarGroup className="overflow-y-hidden">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent className="h-full hover:overflow-y-auto">
        <SidebarMenu className="pr-2">
          {isNestedArray
            ? (conversationSessions as ConversationSession[][]).map(
                (childArray) => (
                  <SidebarMenuItem key={childArray[0].session_id}>
                    <SidebarMenuButton
                      className="min-w-0 max-w-full truncate"
                      onClick={() =>
                        fetchConversation({
                          sessionId: childArray[0].session_id,
                        })
                      }>
                      <p className="truncate"> {childArray[0].content}</p>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )
            : (conversationSessions as ConversationSession[]).map((session) => (
                <SidebarMenuItem key={session.session_id}>
                  <SidebarMenuButton
                    className="truncate"
                    onClick={() =>
                      fetchConversation({ sessionId: session.session_id })
                    }>
                    {session.content}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
