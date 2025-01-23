import HistoryList from "./history-list";
import NavigationMenu from "./navigation-menu";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar
      className="mt-16 h-[calc(100svh-4rem)]"
      variant="inset">
      <SidebarContent className="overflow-hidden">
        <NavigationMenu />
        <HistoryList />
      </SidebarContent>
    </Sidebar>
  );
}
