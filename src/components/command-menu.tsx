import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
import React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useSmoothTheme } from "@/hooks/use-smooth-theme";
import { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { BorderTrail } from "./border-trail";
import { sidebarData } from "./layout";
import { useSearch } from "./providers/search-provider";
import { ScrollArea } from "./ui/scroll-area";
import { TextShimmer } from "./ui/text-shimmer";

export function CommandMenu() {
  const navigate = useRouter();
  const pathname = usePathname();
  const { setTheme } = useSmoothTheme();
  const { open, setOpen, startTransition, isPending } = useSearch();
  const [loadingUrl, setLoadingUrl] = React.useState<string | null>(null);

  const runCommand = React.useCallback(
    (fn: () => void, url?: Route | null) => {
      if (url) {
        setLoadingUrl(url);
      }
      startTransition(() => {
        fn();
        setOpen(false);
        if (url) {
          setLoadingUrl(null);
        }
      });
    },
    [setOpen, startTransition]
  );

  const isActive = (url?: string | null) => {
    if (!url) return false;
    // Simple match; adjust if you use query/hash etc.
    return pathname === url;
  };

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      {isPending && (
        <BorderTrail
          className="bg-linear-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
          // eslint-disable-next-line react-hooks/purity
          size={Math.floor(Math.random() * (200 - 50 + 1)) + 100}
        />
      )}
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pe-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url) {
                  const active = isActive(navItem.url as string);
                  const isLoading = loadingUrl === navItem.url;
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      disabled={active || isLoading}
                      className={
                        active || isLoading
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                      onSelect={() => {
                        if (active || isLoading) return;
                        runCommand(
                          () => navigate.push(navItem.url! as Route),
                          navItem.url as Route
                        );
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {active ? (
                        <span>{navItem.title}</span>
                      ) : isLoading ? (
                        <TextShimmer>{navItem.title}</TextShimmer>
                      ) : (
                        navItem.title
                      )}
                    </CommandItem>
                  );
                }

                return navItem.items?.map((subItem, j) => {
                  const active = isActive(subItem.url as string);
                  const isLoading = loadingUrl === subItem.url;
                  return (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${j}`}
                      value={`${navItem.title}-${subItem.url}`}
                      disabled={active || isLoading}
                      className={
                        active || isLoading
                          ? "opacity-60 pointer-events-none"
                          : ""
                      }
                      onSelect={() => {
                        if (active || isLoading) return;
                        runCommand(
                          () => navigate.push(subItem.url! as Route),
                          subItem.url as Route
                        );
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {isLoading ? (
                        <TextShimmer>{`${navItem.title} > ${subItem.title}`}</TextShimmer>
                      ) : (
                        <>
                          {navItem.title} <ChevronRight /> {subItem.title}
                        </>
                      )}
                    </CommandItem>
                  );
                });
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
