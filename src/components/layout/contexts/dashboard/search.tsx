"use client";
import { SearchCheckIcon } from "lucide-react";

import { useSearch } from "@/components/providers/search-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GlobalSearch = () => {
  const { setOpen, open, isPending } = useSearch();
  return (
    <Button
      disabled={isPending}
      onClick={() => setOpen(!open)}
      variant={"outline"}
      className={cn(
        "text-muted-foreground  h-8  justify-start pl-2.5 font-normal shadow-none sm:pr-12 w-fit  md:w-56 relative"
      )}
    >
      <span className="hidden lg:inline-flex items-center">
        <SearchCheckIcon className="size-4 mr-1 text-muted-foreground" />
        <div>Search Here...</div>
      </span>
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
};
export { GlobalSearch };
