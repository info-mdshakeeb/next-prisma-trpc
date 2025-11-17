import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import * as React from "react";

export function Header({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        "z-50 h-16 bg-background",
        "group-data-[slot=sidebar-inset]:sticky group-data-[slot=sidebar-inset]:top-0 flex h-full items-center gap-2 px-2",
        className
      )}
      {...props}
    >
      {children}
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
      <SidebarTrigger variant="ghost" className="" size={"icon-lg"} />
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
