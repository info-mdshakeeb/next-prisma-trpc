"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import LinkLoadingIndicator from "@/components/loader/link-loading-indicator";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "./sidebar-nav.data";

export default function SidebarNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const navigate = useRouter();
  const [val, setVal] = useState(pathname ?? "/settings");

  const handleSelect = (e: string) => {
    setVal(e);
    startTransition(() => {
      navigate.push(e);
    });
  };

  return (
    <>
      <div className="p-1 lg:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-12 sm:w-48">
            {sidebarNavItems.find((item) => item.href === val)?.title}
          </SelectTrigger>
          <SelectContent>
            {sidebarNavItems?.map((item) => {
              return (
                <SelectItem key={item.href} value={item.href}>
                  <div className="flex gap-x-4 px-2 py-1">
                    <span className="scale-125">
                      <item.icon size={18} />
                    </span>
                    {isPending && val === item.href ? (
                      <TextShimmer duration={1.2}>{item.title}</TextShimmer>
                    ) : (
                      <span className="text-md">{item.title}</span>
                    )}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        type="always"
        className="hidden w-full min-w-40 bg-background  py-2 lg:block "
      >
        <nav
          className={cn(
            "flex space-x-2 py-1 lg:flex-col lg:space-x-0 lg:space-y-1",
            className
          )}
          {...props}
        >
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href &&
                  "border-l-4 border-primary bg-gradient-to-r from-primary/10 to-transparent hover:bg-muted",
                "justify-start rounded-none"
              )}
            >
              <span className="mr-2">
                <item.icon size={18} />
              </span>
              <LinkLoadingIndicator title={item.title} />
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  );
}
