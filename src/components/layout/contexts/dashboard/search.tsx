"use client";
import { SearchCheckIcon } from "lucide-react";

import { BorderTrail } from "@/components/border-trail";
import { useSearch } from "@/components/providers/search-provider";
import { Button } from "@/components/ui/button";
import { TextShimmer } from "@/components/ui/text-shimmer";
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

        <span key={isPending ? "searching" : "search-here"}>
          {isPending ? (
            <TextShimmer duration={1.2}>Search Here...</TextShimmer>
          ) : (
            <div>Search Here...</div>
          )}
        </span>
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

      {isPending && (
        <BorderTrail
          className="bg-gradient-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
          size={45}
        />
      )}
    </Button>
  );
};
export { GlobalSearch };
