import { SidebarNavigationMenu } from "@/interfaces/navigation";
import { BotIcon, FlameIcon, GemIcon, WalletIcon } from "lucide-react";

export const sidebarNavigatiomMenu: SidebarNavigationMenu = [
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
    notifyPriority: "normal",
    disable: true,
  },
  {
    path: "/trending",
    title: "Trendings",
    icon: GemIcon,
    notifyContent: "soon",
    notifyPriority: "normal",
    disable: true,
  },
  {
    path: "/hot-tokens",
    title: "Hot Tokens",
    icon: FlameIcon,
    notifyContent: "soon",
    notifyPriority: "normal",
    disable: true,
  },
];
