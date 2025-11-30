"use client";

import * as React from "react";

import { NavGroup } from "@/components/nav-group";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "../../core/sidebar-data";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="">
      <SidebarHeader className="h-16  flex items-center justify-center">
        {/* <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5 w-fit">
          <a href="#" className="flex items-center gap-2">
            <Logo className="size-6!" />
          </a>

          <span
            aria-hidden="true"
            className="text-gray-300 w-4 min-w-4 select-none text-center text-lg hidden md:block"
          >
            /
          </span>
        </SidebarMenuButton> */}
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-transparent" />
    </Sidebar>
  );
}
