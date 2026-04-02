"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentVariants = cva("flex-1 min-w-0", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2"
    },
    active: {
      true: "bg-[var(--backgrounds-brand-strong-default)]",
      false: "bg-[var(--backgrounds-neutral-secondary-default)]"
    }
  },
  defaultVariants: {
    size: "md",
    active: false
  }
});
export const ProgressBar = forwardRef(({
  value = 0,
  segments = 5,
  size = "md",
  labelPosition = "none",
  formatLabel,
  className,
  ...props
}, ref) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const activeSegments = Math.round(clampedValue / 100 * segments);
  const label = formatLabel ? formatLabel(clampedValue) : `${clampedValue}%`;
  const bar = <div className="flex flex-1 items-center min-w-0">{Array.from({
      length: segments
    }).map((_, i) => <div className={cn(segmentVariants({
      size,
      active: i < activeSegments
    }), i === 0 && "rounded-l", i === segments - 1 && "rounded-r")} />)}</div>;
  if (labelPosition === "right") {
    return <div ref={ref} className={cn("flex items-center gap-3 w-full", className)} {...props}>{bar}{<span className="text-sm font-medium text-[var(--text-base-secondary)] whitespace-nowrap shrink-0">{label}</span>}</div>;
  }
  if (labelPosition === "bottom") {
    return <div ref={ref} className={cn("flex flex-col gap-2 w-full", className)} {...props}>{bar}{<span className="text-sm font-medium text-[var(--text-base-secondary)] text-right">{label}</span>}</div>;
  }
  return <div ref={ref} className={cn("w-full", className)} {...props}>{bar}</div>;
});
ProgressBar.displayName = "ProgressBar";