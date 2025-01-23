"use client";

import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarNavigatiomMenu } from "@/constants/navigation";
import { SidebarNavigationMenuItem } from "@/interfaces/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Key } from "react";

export default function NavigationMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {sidebarNavigatiomMenu.map(
        (navigationItem: SidebarNavigationMenuItem, key: Key) => (
          <SidebarMenuItem
            key={key}
            className={cn(
              navigationItem.path === pathname &&
                "rounded-md bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-200 p-px",
            )}>
            <SidebarMenuButton
              disabled={navigationItem.disable}
              className={cn(
                "p-3",
                navigationItem.path === pathname && "bg-background font-bold",
              )}>
              <div
                className={cn(
                  "flex items-center gap-2",
                  navigationItem.path === pathname &&
                    "bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-200 bg-clip-text text-transparent",
                )}>
                <navigationItem.icon
                  className={cn(
                    "size-6 min-w-4 max-w-6",
                    navigationItem.path === pathname && "text-cyan-400",
                  )}
                />
                {navigationItem.title}
              </div>
            </SidebarMenuButton>
            {navigationItem.notifyContent && (
              <SidebarMenuBadge
                className={cn(
                  "text-white",
                  navigationItem.notifyPriority === "urgent" && "bg-red-400",
                  navigationItem.notifyPriority === "silent" &&
                    "bg-gray-400/50",
                )}>
                {navigationItem.notifyContent}
              </SidebarMenuBadge>
            )}
          </SidebarMenuItem>
        ),
      )}
    </SidebarMenu>
  );
}
