import { Icon, NotifyPriority } from "../types/common";

export interface SidebarNavigatiomMenu
  extends Array<SidebarNavigationMenuItem> {}

export interface SidebarNavigationMenuItem {
  path: string;
  title: string;
  icon: Icon;
  notifyContent?: string;
  notifyPriority?: NotifyPriority;
  disable?: boolean;
}
