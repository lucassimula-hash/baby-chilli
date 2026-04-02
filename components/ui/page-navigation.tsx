"use client";

import { Fragment } from "react";
import { ChevronLeft, Upload, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export function PageNavigation({
  title = "title",
  border = false,
  scrolled = false,
  onBack,
  showBack = true,
  actions,
  variant = "auto",
  className,
  ...props
}) {
  return <header className={cn("flex items-center w-full transition-colors duration-200", variant === "mobile" ? "h-14 px-4" : variant === "desktop" ? "h-[72px] px-6" : "h-14 px-4 md:h-[72px] md:px-6", scrolled ? "bg-[var(--backgrounds-elevated)]" : "bg-transparent", border && !scrolled && "border-b border-[var(--borders-default)]", className)} {...props}>{<div className="flex-1 flex items-center">{showBack && <IconButton icon={ChevronLeft} variant="transparent" size="sm" onClick={onBack} aria-label="Go back" />}</div>}{<div className="flex-shrink-0">{<span className="text-base font-medium text-[var(--text-base-primary)] leading-6">{title}</span>}</div>}{<div className="flex-1 flex items-center justify-end gap-1">{actions || <Fragment>{<IconButton icon={Upload} variant="transparent" size="sm" aria-label="Share" />}{<IconButton icon={Settings} variant="transparent" size="sm" aria-label="Settings" />}</Fragment>}</div>}</header>;
}
PageNavigation.displayName = "PageNavigation";