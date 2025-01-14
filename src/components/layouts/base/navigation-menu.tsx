"use client";

import { SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, FlameIcon, GemIcon, WalletIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, Key, SVGAttributes } from "react";

type NavigationItem = {
  path: string;
  title: string;
  icon: FC<SVGAttributes<SVGSVGElement>>;
  notifyContent?: string;
  notifyType?: "normal" | "urgent";
  disable?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    path: "/",
    title: "Chat Agent",
    icon: BotIcon,
  },
  {
    path: "/smart-wallets",
    title: "Smart Wallets",
    icon: WalletIcon,
    notifyContent: "soon",
    notifyType: "normal",
    disable: true,
  },
  {
    path: "/trending",
    title: "Trendings",
    icon: GemIcon,
    notifyContent: "soon",
    notifyType: "normal",
    disable: true,
  },
  {
    path: "/hot-tokens",
    title: "Hot Tokens",
    icon: FlameIcon,
    notifyContent: "soon",
    notifyType: "normal",
    disable: true,
  },
];

export default function NavigationMenu() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navigationItems.map((navigationItem: NavigationItem, key: Key) => (
        <SidebarMenuItem
          key={key}
          className={cn(
            navigationItem.path === pathname &&
              "rounded-md bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-200 p-px",
          )}>
          <SidebarMenuButton
            disabled={navigationItem.disable}
            className={cn("p-3", navigationItem.path === pathname && "bg-background font-bold")}>
            <div
              className={cn(
                "flex items-center gap-2",
                navigationItem.path === pathname &&
                  "bg-gradient-to-r from-cyan-400 via-cyan-100 to-cyan-200 bg-clip-text text-transparent",
              )}>
              <navigationItem.icon
                className={cn("size-6 min-w-4 max-w-6", navigationItem.path === pathname && "text-cyan-400")}
              />
              {navigationItem.title}
            </div>
          </SidebarMenuButton>
          {navigationItem.notifyContent && (
            <SidebarMenuBadge
              className={cn(
                "text-white",
                navigationItem.notifyType === "urgent" && "bg-red-400",
                navigationItem.notifyType === "normal" && "bg-gray-400/10",
              )}>
              {navigationItem.notifyContent}
            </SidebarMenuBadge>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
