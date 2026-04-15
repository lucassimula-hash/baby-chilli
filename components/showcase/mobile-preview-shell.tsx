"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobilePreviewShell({
  label,
  caption,
  children,
  footer,
  showTopHandle = true,
  className,
  scrollClassName,
  contentClassName,
}: {
  label?: string;
  caption?: string;
  children: ReactNode;
  footer?: ReactNode;
  showTopHandle?: boolean;
  className?: string;
  scrollClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div className="flex shrink-0 flex-col gap-3">
      {label ? (
        <div className="px-1">
          <p className="text-sm font-medium text-[var(--text-base-primary)]">{label}</p>
          {caption ? (
            <p className="mt-1 text-sm leading-5 text-[var(--text-base-secondary)]">
              {caption}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mx-auto w-[375px]">
        <div
          className={cn(
            "relative h-[812px] overflow-hidden rounded-[36px] border border-[var(--borders-default)]",
            "bg-[var(--backgrounds-base)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.56)]",
            className
          )}
        >
          {showTopHandle ? (
            <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-1 w-28 -translate-x-1/2 rounded-full bg-[rgba(245,245,245,0.18)]" />
          ) : null}

          <div className="flex h-full flex-col overflow-hidden rounded-[inherit]">
            <div
              className={cn(
                "flex-1 overflow-y-auto overscroll-y-contain bg-[var(--backgrounds-base)]",
                scrollClassName
              )}
            >
              <div
                className={cn(
                  "min-h-full pt-[max(env(safe-area-inset-top),0px)]",
                  contentClassName
                )}
              >
                {children}
              </div>
            </div>

            {footer ? (
              <div className="border-t border-[var(--borders-default)] bg-[var(--backgrounds-base)] px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
