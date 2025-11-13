import { META_THEME_COLORS } from "@/lib/config"
import * as React from "react"
import { useSmoothTheme } from "./use-smooth-theme"


export function useMetaColor() {
  const { resolvedTheme } = useSmoothTheme()

  const metaColor = React.useMemo(() => {
    return resolvedTheme !== "dark"
      ? META_THEME_COLORS.light
      : META_THEME_COLORS.dark
  }, [resolvedTheme])

  const setMetaColor = React.useCallback((color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color)
  }, [])

  return {
    metaColor,
    setMetaColor,
  }
}
