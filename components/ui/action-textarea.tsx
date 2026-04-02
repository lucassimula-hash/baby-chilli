"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ActionTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  prompt?: string;
  error?: boolean;
  glass?: boolean;
  inputClassName?: string;
}

export const ActionTextArea = forwardRef<HTMLTextAreaElement, ActionTextAreaProps>(
  (
    {
      prompt = "what's your strategy? how will you turn challenges into opportunities?",
      error,
      disabled,
      glass = false,
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
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        <div
          className={cn(
            "flex flex-col gap-2 w-full p-3 rounded-3xl border transition-all duration-150",
            glass
              ? cn(
                  "backdrop-blur-[8px]",
                  state === "default" &&
                    "bg-[var(--backgrounds-neutral-opacity-faint)] border-[var(--borders-default)]",
                  state === "focused" &&
                    "border-[var(--borders-brand-lighter)] shadow-[0_0_0_2px_var(--shadow-brand-moderate),0_0_2px_0_rgba(0,0,0,0.1),0_2px_10px_0_rgba(0,0,0,0.1)] overflow-clip",
                  state === "error" &&
                    "bg-[var(--backgrounds-neutral-opacity-lighter)] border-[var(--borders-danger-default)]",
                  state === "disabled" &&
                    "bg-[var(--backgrounds-disabled)] border-[rgba(20,15,20,0.03)] backdrop-blur-[12px]"
                )
              : cn(
                  state === "default" &&
                    "bg-[var(--backgrounds-neutral-primary-default)] border-[var(--borders-default)]",
                  state === "focused" &&
                    "bg-[var(--backgrounds-neutral-primary-default)] border-[var(--borders-brand-default)] shadow-[0_0_0_2px_var(--shadow-brand-moderate)] overflow-clip",
                  state === "error" &&
                    "bg-[var(--backgrounds-neutral-primary-default)] border-[var(--borders-danger-default)] shadow-[0_0_0_2px_var(--shadow-danger-moderate)] overflow-clip",
                  state === "disabled" &&
                    "bg-[var(--backgrounds-disabled)] border-[var(--borders-disabled)]"
                )
          )}
        >
          {/* Focused glass backdrop */}
          {glass && state === "focused" && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-3xl backdrop-blur-[7px] bg-[var(--backgrounds-neutral-opacity-lighter)]"
            />
          )}

          {/* Prompt */}
          <p
            className={cn(
              "text-sm font-medium leading-5 w-full relative",
              disabled
                ? "text-[var(--text-disabled)]"
                : glass
                ? "text-[var(--text-glass-primary)]"
                : state === "default"
                ? "text-[var(--text-base-primary)]"
                : "text-[var(--text-base-secondary)]"
            )}
          >
            {prompt}
          </p>

          {/* Content */}
          <textarea
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full min-h-[99px] bg-transparent outline-none resize-none relative",
              "text-sm leading-5 font-normal",
              glass
                ? "text-[var(--text-base-primary)] placeholder:text-[var(--text-glass-subtle)]"
                : "text-[var(--text-base-primary)] placeholder:text-[var(--text-base-secondary)]",
              disabled && "cursor-not-allowed text-[var(--text-disabled)] placeholder:text-[var(--text-disabled)]",
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

          {/* Inner ring for focused glass */}
          {glass && state === "focused" && (
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] ring-[0.5px] ring-inset ring-[#a6a6a6]" />
          )}
        </div>
      </div>
    );
  }
);

ActionTextArea.displayName = "ActionTextArea";
