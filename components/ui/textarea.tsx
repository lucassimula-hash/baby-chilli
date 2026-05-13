"use client";

import { useState, forwardRef } from "react";
import { Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  showAiButton?: boolean;
  onAiGenerate?: () => void;
  inputClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      disabled,
      showAiButton = false,
      onAiGenerate,
      className,
      inputClassName,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const state = disabled
      ? "disabled"
      : error
      ? "error"
      : focused
      ? "focused"
      : "default";

    return (
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        {label && (
          <label
            className={cn(
              "text-sm font-medium leading-5",
              disabled
                ? "text-[var(--text-disabled)]"
                : "text-[var(--text-base-primary)]"
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex flex-col gap-2 items-end justify-end w-full min-h-[120px] p-3 rounded-2xl border transition-all duration-150",
            state === "focused" &&
              "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-brand-default)] shadow-[0_0_0_1px_var(--borders-brand-default)]",
            state === "error" &&
              "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-danger-default)] shadow-[0_0_0_1px_var(--borders-danger-default)]",
            state === "disabled" &&
              "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)] cursor-not-allowed",
            state === "default" &&
              "bg-[var(--backgrounds-neutral-secondary-default)] border-[var(--borders-neutral-moderate)]"
          )}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex-1 min-h-0 w-full bg-transparent outline-none resize-none",
              "text-sm leading-5 font-normal",
              "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]",
              disabled &&
                "cursor-not-allowed text-[var(--text-disabled)] placeholder:text-[var(--text-disabled)]",
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

          {showAiButton && (
            <button
              type="button"
              onClick={onAiGenerate}
              disabled={disabled}
              className={cn(
                "shrink-0 h-7 min-w-[56px] px-2 py-1 rounded-full flex items-center gap-0 text-sm font-medium",
                disabled
                  ? "bg-[var(--backgrounds-disabled)] text-[var(--text-disabled)] cursor-not-allowed"
                  : "bg-[var(--backgrounds-neutral-secondary-default)] text-[var(--text-base-primary)] hover:opacity-80 transition-opacity"
              )}
            >
              <Wand2 size={12} className="shrink-0" />
              <span className="px-1">generate with AI</span>
            </button>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              "text-sm font-normal leading-5",
              disabled
                ? "text-[var(--text-disabled)]"
                : error
                ? "text-[var(--text-danger-primary)]"
                : "text-[var(--text-base-secondary)]"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
