"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const FormTitle = forwardRef(({
  error,
  disabled,
  className,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const state = disabled ? "disabled" : error ? "error" : focused ? "focused" : "default";

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div
        className={cn(
          "flex items-center justify-center w-full overflow-clip p-3 rounded-full transition-all duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
          "bg-[var(--backgrounds-neutral-secondary-default)] border",
          state === "default" && "border-[var(--borders-default)]",
          state === "focused" && "border-[var(--borders-brand-default)] shadow-[0_0_0_1px_var(--borders-brand-default)]",
          state === "error" && "border-[var(--borders-danger-default)]",
          state === "disabled" && "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent outline-none text-center font-medium text-base leading-6",
            state === "error"
              ? "text-[var(--text-danger-secondary)] placeholder:text-[var(--text-danger-secondary)]"
              : "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]",
            disabled && "cursor-not-allowed"
          )}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm font-normal leading-5 text-[var(--text-danger-secondary)] text-center">
          {error}
        </p>
      )}
    </div>
  );
});

FormTitle.displayName = "FormTitle";

