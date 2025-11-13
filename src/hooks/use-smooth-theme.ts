"use client"

import { useTheme } from "next-themes";
import { useCallback } from "react";


type Coords = { x: number; y: number };

export function useSmoothTheme() {
  const { theme, setTheme, ...rest } = useTheme();


  const toggleTheme = useCallback(
    (coords?: Coords) => {


      const root = document.documentElement;
      const isDark =
        theme === "dark" || (theme === "system" && root.classList.contains("dark"));
      const newTheme = isDark ? "light" : "dark";

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!document.startViewTransition || prefersReducedMotion) {
        setTheme(newTheme);
        return;
      }

      // set coords
      if (coords) {
        root.style.setProperty("--x", `${coords.x}px`);
        root.style.setProperty("--y", `${coords.y}px`);
      }

      // Add class to enable animation
      root.classList.add("theme-animating");

      document.startViewTransition(() => {
        setTheme(newTheme);
      }).finished.finally(() => {
        // Clean up
        root.classList.remove("theme-animating");
        root.style.removeProperty("--x");
        root.style.removeProperty("--y");
      });
    },
    [theme, setTheme]
  );

  return {
    theme,
    setTheme,
    toggleTheme,
    ...rest,
  };
}
