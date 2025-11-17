"use client";

import { motion } from "motion/react";
import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

type ElementTag = keyof React.JSX.IntrinsicElements;

export type TextShimmerProps = {
  children: string;
  as?: ElementTag;
  className?: string;
  duration?: number;
  spread?: number;
  role?: string;
  "aria-hidden"?: boolean | "true" | "false";
  style?: React.CSSProperties;
};

function TextShimmerComponent({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
  role,
  style,
  "aria-hidden": ariaHidden,
}: TextShimmerProps) {
  const MotionComponent = (
    motion as unknown as Record<ElementTag, typeof motion.span>
  )[Component as ElementTag];

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        "relative inline-block bg-size-[250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      role={role}
      aria-hidden={ariaHidden}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
          ...style,
        } as React.CSSProperties & { "--spread"?: string }
      }
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
