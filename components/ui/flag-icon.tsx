"use client";

import { cn } from "@/lib/utils";
import { FLAG_URLS, type FlagCode } from "@/lib/flags.generated";

export interface FlagIconProps {
  code: FlagCode;
  size?: number;
  className?: string;
  alt?: string;
}

export function FlagIcon({
  code,
  size = 24,
  className,
  alt,
}: FlagIconProps) {
  return (
    <span
      className={cn("inline-flex shrink-0 overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={FLAG_URLS[code]}
        alt={alt ?? `${code} flag`}
        width={size}
        height={size}
        loading="lazy"
        className="size-full object-cover"
      />
    </span>
  );
}

FlagIcon.displayName = "FlagIcon";
