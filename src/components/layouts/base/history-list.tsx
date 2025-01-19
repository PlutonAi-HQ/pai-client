"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useConversation } from "@/hooks/use-conversation";

export default function HistoryList() {
  const { conversationSessions, fetchConversation } = useConversation();

  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {conversationSessions?.map((session) => (
            <Collapsible
              defaultOpen
              key={session.session_id}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="truncate"
                  onClick={() =>
                    fetchConversation({ sessionId: session.session_id })
                  }>
                  {session.content}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
