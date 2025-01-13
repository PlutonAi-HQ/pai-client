import BaseHeader from "@/components/layouts/base/header";
import NavigationSidebar from "@/components/layouts/base/navigation-sidebar";
import PortfolioSidebar from "@/components/layouts/base/portfolio-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Fragment, ReactNode } from "react";

export default function BaseLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Fragment>
      <SidebarProvider>
        <NavigationSidebar />
        <main className="h-svh w-full pt-20 text-foreground">{children}</main>
        <PortfolioSidebar />
      </SidebarProvider>
      <BaseHeader />
    </Fragment>
  );
}
