"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMetaColor } from "@/hooks/use-meta-color";
import { useSmoothTheme } from "@/hooks/use-smooth-theme";
import { AnimatePresence, motion } from "motion/react";

export function ModeSwitcher() {
  const { toggleTheme: smoothToggleTheme, theme } = useSmoothTheme();

  const { setMetaColor, metaColor } = useMetaColor();

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    smoothToggleTheme({
      x: event.clientX,
      y: event.clientY,
    });
    setMetaColor(metaColor);
  };

  return (
    <Button
      variant="secondary"
      className="group/toggle h-8 w-8 px-0 cursor-pointer"
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
            className="text-white"
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
            className="text-black"
          >
            <Moon />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
