import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CommandMenu } from "../command-menu";
import { Expander } from "../ui/expander";

type SearchContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchProviderProps = {
  children: React.ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const triggerRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <SearchContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}

      <Expander open={open} onOpenChange={setOpen}>
        <Expander.View>
          <Expander.Content>
            <CommandMenu />
          </Expander.Content>
        </Expander.View>
      </Expander>
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("useSearch has to be used within SearchProvider");
  }

  return searchContext;
};
