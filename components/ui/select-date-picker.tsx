"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface DateTimePillProps {
  value: string;
  selected?: boolean;
}

function DateTimePill({ value, selected = false }: DateTimePillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm leading-5 shrink-0",
        selected
          ? "bg-[var(--backgrounds-neutral-opacity-lighter)] text-[var(--text-selected)] shadow-[0_0_0_2px_var(--shadow-brand-moderate),0_0_2px_0_rgba(0,0,0,0.1),0_2px_10px_0_rgba(0,0,0,0.1)] backdrop-blur-[7px] ring-[0.5px] ring-inset ring-[#a6a6a6]"
          : "bg-[var(--backgrounds-neutral-opacity-lighter)] text-[var(--text-base-primary)]"
      )}
    >
      {value}
    </div>
  );
}

export interface SelectDatePickerProps {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  helperText?: string;
  showHelperText?: boolean;
  focused?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SelectDatePicker = forwardRef<HTMLDivElement, SelectDatePickerProps>(
  (
    {
      startDate = "nov 12, 2025",
      startTime = "5:30PM",
      endDate = "nov 17, 2025",
      endTime,
      helperText,
      showHelperText = false,
      focused = false,
      className,
      onClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 items-start w-[343px]", className)}
      >
        <div
          className={cn(
            "relative w-full rounded-3xl border overflow-hidden cursor-pointer transition-all duration-150",
            focused
              ? "border-[var(--borders-brand-default)] shadow-[0_0_0_2px_var(--shadow-brand-moderate),0_0_2px_0_rgba(0,0,0,0.1),0_2px_10px_0_rgba(0,0,0,0.1)]"
              : "border-[var(--borders-default)] backdrop-blur-[8px] bg-[var(--backgrounds-neutral-secondary-default)] hover:bg-[var(--backgrounds-neutral-secondary-hover)]"
          )}
          onClick={onClick}
        >
          {/* Glass backdrop for focused state */}
          {focused && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-3xl backdrop-blur-[7px] bg-[var(--backgrounds-neutral-secondary-default)]"
            />
          )}

          <div className="relative flex gap-3 items-start p-3">
            {/* Timeline dots */}
            <div className="flex flex-col items-center justify-center gap-1 py-5 shrink-0">
              <div className="size-2 rounded-full border-2 border-[var(--text-base-secondary)] bg-transparent" />
              <div className="flex-1 w-px border-l border-dashed border-[var(--text-base-secondary)] min-h-[48px]" />
              <div className="size-2 rounded-full border-2 border-[var(--text-base-secondary)] bg-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2 min-w-0">
              {/* Start */}
              <div className="flex flex-col gap-1 pb-2 border-b border-[var(--borders-default)]">
                <span className="text-sm font-medium leading-5 text-[var(--text-base-secondary)]">
                  start
                </span>
                <div className="flex gap-1.5 items-start">
                  <DateTimePill value={startDate} selected={focused} />
                  {startTime && (
                    <DateTimePill value={startTime} selected={focused} />
                  )}
                </div>
              </div>

              {/* End */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium leading-5 text-[var(--text-base-secondary)]">
                  end
                </span>
                <div className="flex gap-1.5 items-start">
                  <DateTimePill value={endDate} />
                  {endTime && <DateTimePill value={endTime} />}
                </div>
              </div>
            </div>
          </div>

          {/* Inner ring for focused */}
          {focused && (
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] ring-[0.5px] ring-inset ring-[#a6a6a6]" />
          )}
        </div>

        {/* Helper text */}
        {showHelperText && helperText && (
          <p className="text-sm leading-5 text-[var(--text-base-secondary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SelectDatePicker.displayName = "SelectDatePicker";
