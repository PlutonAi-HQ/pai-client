import {
  ethnocentric,
  ibmPlexMono,
  loraSerif,
  outfitSans,
} from "@/assets/fonts/index.config";
import BaseHeader from "@/components/layouts/base/header";
// import Portfolio from "@/components/layouts/base/portfolio";
import AppSidebar from "@/components/layouts/base/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConversationProvider } from "@/providers/conversation-provider";
import { ReactNode } from "react";

export default function BaseLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div
      className={`${outfitSans.variable} ${loraSerif.variable} ${ethnocentric.variable} ${ibmPlexMono.variable}`}>
      <ConversationProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="h-svh w-full bg-background pt-16 text-foreground">
            {children}
          </main>
          {/* <Portfolio /> */}
        </SidebarProvider>
      </ConversationProvider>
      <BaseHeader />
    </div>
  );
}
