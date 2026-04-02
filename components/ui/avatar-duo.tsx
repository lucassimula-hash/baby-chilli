"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

const sizeConfig = {
  xxsm: {
    container: "size-5",
    inner: 16,
    border: "0.4px"
  },
  xsm: {
    container: "size-6",
    inner: 18,
    border: "0.8px"
  },
  sm: {
    container: "size-8",
    inner: 24,
    border: "0.9px"
  },
  md: {
    container: "size-10",
    inner: 32,
    border: "0.9px"
  },
  lg: {
    container: "size-12",
    inner: 40,
    border: "1px"
  },
  xl: {
    container: "size-16",
    inner: 48,
    border: "1px"
  }
};
export function AvatarInner({
  src,
  fallback
}) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return <img src={src} alt="" className="size-full object-cover rounded-full" onError={() => setErr(true)} />;
  }
  return <div className="size-full rounded-full bg-[var(--backgrounds-brand-strong-default)] flex items-center justify-center text-[var(--text-base-primary)] font-medium text-[0.5em]">{fallback || "?"}</div>;
}
export const AvatarDuo = forwardRef(({
  primarySrc,
  primaryFallback,
  secondarySrc,
  secondaryFallback,
  size = "md",
  className,
  ...props
}, ref) => {
  const config = sizeConfig[size];
  const innerStyle = {
    width: config.inner,
    height: config.inner,
    border: `${config.border} solid var(--borders-base)`,
    borderRadius: "9999px",
    overflow: "hidden"
  };
  return <div ref={ref} className={cn("relative overflow-clip shrink-0", config.container, className)} {...props}>{<div className="absolute bottom-0 right-0" style={innerStyle}>{<AvatarInner src={secondarySrc} fallback={secondaryFallback} />}</div>}{<div className="absolute top-0 left-0 z-[1]" style={innerStyle}>{<AvatarInner src={primarySrc} fallback={primaryFallback} />}</div>}</div>;
});
AvatarDuo.displayName = "AvatarDuo";