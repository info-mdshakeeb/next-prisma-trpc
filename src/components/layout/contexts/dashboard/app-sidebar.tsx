"use client";

import * as React from "react";

import { NavGroup } from "@/components/nav-group";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "../../core/sidebar-data";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          {sidebarData.map((props) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-transparent" />
    </Sidebar>
  );
}
