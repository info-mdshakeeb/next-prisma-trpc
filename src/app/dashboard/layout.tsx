import AppHeader from "@/components/layout/contexts/dashboard/app-header";
import { AppSidebar } from "@/components/layout/contexts/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    // <SidebarProvider
    //   defaultOpen={defaultOpen}
    //   style={
    //     {
    //       "--sidebar-width": "calc(var(--spacing) * 72)",
    //       "--header-height": "calc(var(--spacing) * 12)",
    //     } as React.CSSProperties
    //   }
    // >
    //   <AppSidebar variant="inset" />
    //   <SidebarInset className="shadow overflow-hidden ">
    //     {children}
    //   </SidebarInset>
    // </SidebarProvider>

    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen={defaultOpen} className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar variant="inset" />
          <SidebarInset
            className={cn(
              "group",
              "mx-2! md:ml-0!",
              "rounded-[6px]! mt-0! material-medium",
              "h-[calc(100vh-4rem)]  overflow-auto shadow-lg border-foreground/10"
            )}
          >
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
