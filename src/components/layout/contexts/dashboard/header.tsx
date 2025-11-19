"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TeamSwitcher } from "./team-switcher";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
};

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const { state } = useSidebar();

  return (
    <header
      className={cn(
        "z-50 h-16",
        fixed &&
          "header-fixed peer/header sticky top-0 w-[inherit] border-b border-border",

        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex h-full items-center gap-3 p-4 sm:gap-4",

          fixed &&
            "after:bg-background after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg"
        )}
      >
        {" "}
        <div
          className={cn(
            "flex items-center transition-all duration-100 ease-out will-change-transform motion-reduce:transition-none",
            state === "expanded"
              ? "md:max-w-0 md:opacity-0 md:-translate-y-1 md:scale-95 md:overflow-hidden md:pointer-events-none md:flex-0 md:basis-0"
              : "md:max-w-[16rem] md:opacity-100 md:translate-y-0 md:scale-100 md:flex-initial md:basis-auto"
          )}
        >
          <TeamSwitcher />
        </div>
        <SidebarTrigger variant="outline" className="max-md:scale-125" />
        <Separator orientation="vertical" className="h-6" />
        {children}
      </div>
    </header>
  );
}
