"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSmoothTheme } from "@/hooks/use-smooth-theme";
import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ModeSwitcher() {
  const { toggleTheme: smoothToggleTheme, theme } = useSmoothTheme();
  const { setMetaColor, metaColor } = useMetaColor();

  // Returns true on client, false during SSR to prevent hydration mismatch
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    smoothToggleTheme({
      x: event.clientX,
      y: event.clientY,
    });
    setMetaColor(metaColor);
  };

  if (!mounted) {
    return (
      <Button
        size={"icon-sm"}
        variant="outline"
        className="group/toggle cursor-pointer"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      size={"icon-sm"}
      variant="outline"
      className="group/toggle cursor-pointer "
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
            className=""
          >
            <Sun />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
            className=""
          >
            <Moon />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
