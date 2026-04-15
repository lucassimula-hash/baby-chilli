"use client";

import { useId } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardCanvas({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={cn("card-canvas", className)} {...props}>
      <div className="card-backdrop" />
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  const glowId = useId().replace(/:/g, "");

  return (
    <div className={cn("glow-card", className)} {...props}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="glow-svg"
      >
        <defs>
          <linearGradient id={`${glowId}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,245,245,0.10)" />
            <stop offset="38%" stopColor="rgba(255,75,235,0.92)" />
            <stop offset="68%" stopColor="rgba(245,245,245,0.96)" />
            <stop offset="100%" stopColor="rgba(255,75,235,0.18)" />
          </linearGradient>
          <filter id={`${glowId}-blur`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.25" />
          </filter>
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="12"
          ry="12"
          className="glow-stroke-track"
          pathLength="100"
        />

        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="12"
          ry="12"
          pathLength="100"
          className="glow-stroke glow-stroke-blur"
          stroke={`url(#${glowId}-gradient)`}
          filter={`url(#${glowId}-blur)`}
        />

        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="12"
          ry="12"
          pathLength="100"
          className="glow-stroke glow-stroke-sharp"
          stroke={`url(#${glowId}-gradient)`}
        />
      </svg>
      <div className="card-content">{children}</div>
    </div>
  );
}
