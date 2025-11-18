import { cookies } from "next/headers";
import React from "react";

import { AppHeader, AppSidebar } from "@/components/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
              "group relative",
              "mx-2! md:ml-0!",
              "rounded-[6px]! mt-0! material-medium",
              "has-data-[layout=fixed]:h-[calc(100svh-4rem)]",
              "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-4rem)]",
              " overflow-hidden shadow-lg border-foreground/10"
              // "no-scrollbar"
            )}
          >
            <ScrollArea className="flex flex-1 flex-col w-full overflow-auto">
              {children}
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
