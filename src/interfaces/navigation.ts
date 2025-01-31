import { Icon, NotifyPriority } from "../types/common";

export type SidebarNavigationMenu = SidebarNavigationMenuItem[];

export interface SidebarNavigationMenuItem {
  path: string;
  title: string;
  icon: Icon;
  notifyContent?: string;
  notifyPriority?: NotifyPriority;
  disable?: boolean;
}
