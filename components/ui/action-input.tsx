"use client";

import { useState, forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

export const ActionInput = forwardRef(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  showAvatar,
  avatarSrc,
  showToggle,
  toggleChecked,
  onToggleChange,
  disabled,
  className,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const state = disabled ? "disabled" : error ? "error" : focused ? "focused" : "default";
  return <div className={cn("flex flex-col gap-2 w-full", className)}>{<div className={cn("flex flex-col gap-2 w-full p-3 rounded-3xl overflow-clip transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]", "bg-[var(--backgrounds-neutral-secondary-default)]", "border", state === "default" && "border-[var(--borders-default)]", state === "focused" && "border-[var(--borders-brand-default)] shadow-[0_0_0_1px_var(--borders-brand-default)]", state === "error" && "border-[var(--borders-danger-default)] shadow-[0_0_0_1px_var(--borders-danger-default)]", state === "disabled" && "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] opacity-50 cursor-not-allowed")}>{label && <span className="text-sm font-medium text-[var(--text-base-primary)] leading-[22px]">{label}</span>}{<div className="flex items-center gap-2 w-full">{leftIcon && <span className="size-5 shrink-0 text-[var(--text-base-secondary)] flex items-center justify-center">{leftIcon}</span>}{showAvatar && avatarSrc && <img src={avatarSrc} alt="" className="size-5 rounded-full object-cover shrink-0" />}{<input ref={ref} disabled={disabled} className={cn("flex-1 min-w-0 bg-transparent outline-none text-sm font-normal", "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]", disabled && "cursor-not-allowed")} onFocus={e => {
        setFocused(true);
        onFocus?.(e);
      }} onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }} {...props} />}{!showToggle && rightIcon !== null && (rightIcon !== undefined ? rightIcon : <ChevronRight size={20} className="shrink-0 text-[var(--text-base-secondary)]" />)}{showToggle && <Toggle size="sm" checked={toggleChecked} onCheckedChange={onToggleChange} />}</div>}</div>}{(helperText || error) && <p className={cn("text-sm font-normal leading-5", error ? "text-[var(--text-danger-primary)]" : "text-[var(--text-base-primary)]")}>{error || helperText}</p>}</div>;
});
ActionInput.displayName = "ActionInput";
