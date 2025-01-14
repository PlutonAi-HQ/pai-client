import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Key } from "react";

type History = {
  time: string;
  chatIdList: string[];
};

const historyList: History[] = [
  { time: "Yesterday", chatIdList: ["Chat ID 1", "Chat ID 2", "Chat ID 3", "Chat ID 4"] },
  {
    time: "Last week",
    chatIdList: [
      "Chat ID 1",
      "Chat ID 2",
      "Chat ID 3",
      "Chat ID 4",
      "Chat ID 5",
      "Chat ID 6",
      "Chat ID 7",
      "Chat ID 8",
      "Chat ID 9",
      "Chat ID 10",
      "Chat ID 11",
      "Chat ID 12",
      "Chat ID 13",
      "Chat ID 14",
      "Chat ID 15",
      "Chat ID 16",
    ],
  },
];

export default function HistoryList() {
  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {historyList.map((history: History, key: Key) => (
            <Collapsible
              defaultOpen
              key={key}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>{history.time}</SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {history.chatIdList.map((chatId: string) => (
                      <SidebarMenuSubItem key={chatId}>
                        <SidebarMenuSubButton>{chatId}</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
