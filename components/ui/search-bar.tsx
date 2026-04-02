"use client";

import { useState, forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void;
  inputClassName?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, inputClassName, value, onClear, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value !== undefined && value !== "";

    return (
      <div
        className={cn(
          "flex items-center w-full rounded-2xl border overflow-clip transition-all duration-150",
          "pl-2 pr-3 py-2",
          focused
            ? "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-brand-default)] shadow-[0_0_0_2px_var(--shadow-brand-moderate)]"
            : "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-default)] hover:bg-[var(--backgrounds-neutral-secondary-hover)]",
          className
        )}
      >
        <div className={cn("flex items-center gap-2", hasValue ? "flex-1 min-w-0" : "shrink-0")}>
          <Search size={20} className="shrink-0 text-[var(--text-base-secondary)]" />
          <input
            ref={ref}
            type="text"
            value={value}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "text-base leading-6 font-normal",
              "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]",
              inputClassName
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
        {hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 size-4 flex items-center justify-center text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)] transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
