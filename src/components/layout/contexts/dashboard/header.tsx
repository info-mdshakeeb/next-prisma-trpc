import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import * as React from "react";

export function Header({
  className,
  fixed,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { fixed?: boolean }) {
  return (
    <header
      data-layout-header={fixed ? "fixed" : "auto"}
      className={cn(
        "z-50 h-16  bg-background ",
        "rounded-t-xl group-data-[layout=fixed]/layout:border-b",

        fixed && "sticky top-0 border-b",
        className
      )}
      {...props}
    >
      <div className="flex h-full items-center gap-2 px-4">{children}</div>
    </header>
  );
}

export function HeaderSidebarTrigger({
  className,
  showSeparator,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showSeparator?: boolean }) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <SidebarTrigger variant="outline" className="" />
      {showSeparator && <Separator className="h-7 w-px bg-border" />}
    </div>
  );
}

export function HeaderContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-1 items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
}

export function HeaderActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-4 ml-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}
