"use client";

import { useState, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const avatarVariants = cva("relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0", {
  variants: {
    size: {
      xxsm: "size-5 text-[10px]",
      xsm: "size-6 text-[10px]",
      sm: "size-8 text-xs",
      md: "size-10 text-sm",
      lg: "size-12 text-base",
      xl: "size-16 text-lg",
      "2xl": "size-[84px] text-xl",
      "3xl": "size-[100px] text-2xl",
      "4xl": "size-[120px] text-[28px]",
      "5xl": "size-[136px] text-[32px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
export const Avatar = forwardRef(({
  src,
  alt,
  fallback,
  size = "md",
  className,
  ...props
}, ref) => {
  const [imgError, setImgError] = useState(false);
  const showFallback = !src || imgError;
  return <div ref={ref} className={cn(avatarVariants({
    size
  }), className)} {...props}>{showFallback ? <div className="flex items-center justify-center size-full bg-[var(--backgrounds-brand-strong-default)] text-[var(--text-base-primary)] font-medium">{fallback || "?"}</div> : <img src={src} alt={alt || ""} className="size-full object-cover" onError={() => setImgError(true)} />}</div>;
});
Avatar.displayName = "Avatar";