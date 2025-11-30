"use client";

import { cn } from "@/lib/utils";
import { useLinkStatus } from "next/link";

import React from "react";
import { TextShimmer } from "../ui/text-shimmer";

export default function LinkLoadingIndicator({
  title,
  className,
  element,
}: {
  title?: string;
  className?: string;
  element?: React.ReactNode;
}) {
  const { pending } = useLinkStatus();

  // Handle pending state with element
  if (pending) {
    return (
      <TextShimmer duration={1.2} className={cn("", className)}>
        {element ? "..." : title ?? "---"}
      </TextShimmer>
    );
  }

  // Non-pending state - return element if present, otherwise title
  return element ? element : <div className={className}>{title}</div>;
}
