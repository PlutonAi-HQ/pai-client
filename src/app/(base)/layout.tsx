import BaseHeader from "@/components/layouts/base/header";
// import Portfolio from "@/components/layouts/base/portfolio";
import AppSidebar from "@/components/layouts/base/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConversationProvider } from "@/providers/conversation-provider";
import { Fragment, ReactNode } from "react";

export default function BaseLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <ConversationProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="h-svh w-full bg-background pt-20 text-foreground">
            {children}
          </main>
          {/* <Portfolio /> */}
        </SidebarProvider>
      </ConversationProvider>
      <BaseHeader />
    </Fragment>
  );
}
