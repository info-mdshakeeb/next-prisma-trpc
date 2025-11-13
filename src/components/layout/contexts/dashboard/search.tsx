"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export function Search({ className = "" }: Props) {
  // const { setOpen, open } = useSearch();
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "text-muted-foreground relative h-8  justify-start pl-2.5 font-normal shadow-none sm:pr-12 w-fit md:w-40 lg:w-56",
        className
      )}
      // onClick={() => setOpen(true)}
    >
      <span className="hidden lg:inline-flex">Search Here...</span>
      <span className="inline-flex lg:hidden">Search...</span>

      <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
        <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3">
          Ctrl
        </kbd>
        <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3 aspect-square">
          K
        </kbd>
      </div>
    </Button>
  );
}
