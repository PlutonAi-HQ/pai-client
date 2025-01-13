import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function NavigationSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="mt-20 h-[calc(100svh-80px)]"
      variant="inset">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Chat Agent</SidebarMenuButton>
            <SidebarMenuBadge>24</SidebarMenuBadge>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Smart Wallet</SidebarMenuButton>
            <SidebarMenuBadge>soon</SidebarMenuBadge>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Trending</SidebarMenuButton>
            <SidebarMenuBadge>soon</SidebarMenuBadge>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Hot tokens</SidebarMenuButton>
            <SidebarMenuBadge>soon</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Yesterday:</SidebarGroupLabel>
          <SidebarGroupContent>Chat Title 1</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 2</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 3</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 4</SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>12/01/2025:</SidebarGroupLabel>
          <SidebarGroupContent>Chat Title 1</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 2</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 3</SidebarGroupContent>
          <SidebarGroupContent>Chat Title 4</SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
