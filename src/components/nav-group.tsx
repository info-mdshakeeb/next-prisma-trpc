"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import {
  INavCollapsible,
  INavGroup,
  INavItem,
  INavLink,
} from "@/types/sidebar.types";
import { Route } from "next";
import LinkLoadingIndicator from "./loader/link-loading-indicator";

export function NavGroup({ title, items }: INavGroup) {
  // const { state } = useSidebar();
  const href = usePathname();
  return (
    <>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={href} />;

          // if (state === "collapsed")
          //   return (
          //     <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
          //   );
          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="text-xs rounded-full px-1 py-0">{children}</Badge>
);

const SidebarLink = ({ item, ...props }: { item: INavLink }) => {
  const { setOpenMobile } = useSidebar();
  const handleCLick = () => {
    setOpenMobile(false);
  };
  return (
    <Link
      prefetch={false}
      {...props}
      href={item.url as Route}
      onClick={handleCLick}
    >
      {item.icon && <item.icon />}
      <LinkLoadingIndicator title={item.title} className="capitalize" />
      {item.badge && <NavBadge>{item.badge}</NavBadge>}
    </Link>
  );
};

const SidebarMenuLink = ({ item, href }: { item: INavLink; href: string }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}
      >
        <SidebarLink item={item} />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: INavCollapsible;
  href: string;
}) => {
  const isParentActive = checkIsActive(href, item, true);
  const hasActiveChild = item.items.some((child) => checkIsActive(href, child));
  const shouldBeOpen = isParentActive || hasActiveChild;
  return (
    <Collapsible
      asChild
      defaultOpen={shouldBeOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            {shouldBeOpen && (
              <div className="absolute  right-7">
                <span className="relative flex size-1.5  group-data-[state=open]/collapsible:hidden ">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 duration-500" />
                  <span className="relative inline-flex rounded-full size-1.5 bg-primary opacity-15" />
                </span>
              </div>
            )}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}

            <ChevronRight
              className={cn(
                "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ",
                {
                  "text-primary": shouldBeOpen,
                }
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={checkIsActive(href, subItem)}
                  >
                    <SidebarLink item={subItem} />
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

// const SidebarMenuCollapsedDropdown = ({
//   item,
//   href,
// }: {
//   item: NavCollapsible;
//   href: string;
// }) => {
//   return (
//     <SidebarMenuItem>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <SidebarMenuButton
//             tooltip={item.title}
//             isActive={checkIsActive(href, item)}
//           >
//             {item.icon && <item.icon />}
//             <span>{item.title}</span>
//             {item.badge && <NavBadge>{item.badge}</NavBadge>}
//             <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//           </SidebarMenuButton>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" align="start" sideOffset={4}>
//           <DropdownMenuLabel>
//             {item.title} {item.badge ? `(${item.badge})` : ""}
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {item.items.map((sub) => (
//             <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
//               <Link
//                 href={sub.url}
//                 className={`${checkIsActive(href, sub) ? "bg-secondary" : ""}`}
//               >
//                 {sub.icon && <sub.icon />}
//                 <span className="max-w-52 text-wrap">{sub.title}</span>
//                 {sub.badge && (
//                   <span className="ml-auto text-xs">{sub.badge}</span>
//                 )}
//               </Link>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </SidebarMenuItem>
//   );
// };

function checkIsActive(href: string, item: INavItem, mainNav = false) {
  const cleanHref = href.split("?")[0];

  if (item.activePaths) {
    const patterns = Array.isArray(item.activePaths)
      ? item.activePaths
      : [item.activePaths];

    for (const pattern of patterns) {
      const regex = new RegExp(
        "^" +
          pattern
            .replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&") // escape regex chars
            .replace(/\*\*/g, "__DOUBLE_STAR__") // mark double star
            .replace(/\*/g, "(?!create$)[^/]+")
            .replace(/__DOUBLE_STAR__/g, ".*") + // double star
          "$"
      );
      if (regex.test(cleanHref)) {
        return true;
      }
    }
  }

  return (
    href === item.url ||
    (item.activePaths && cleanHref === item.url) ||
    !!item?.items?.filter((i) => i.url === href).length ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] ===
        (typeof item.url === "string" ? item.url.split("/")[1] : ""))
  );
}
