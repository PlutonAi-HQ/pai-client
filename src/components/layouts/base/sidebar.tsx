import HistoryList from "./history-list";
import NavigationMenu from "./navigation-menu";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar
      className="mt-20 h-[calc(100svh-80px)]"
      variant="inset">
      <SidebarContent className="overflow-y-hidden">
        <NavigationMenu />
        <HistoryList />
      </SidebarContent>
    </Sidebar>
  );
}
