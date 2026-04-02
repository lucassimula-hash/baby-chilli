"use client";

import { Fragment } from "react";
import { X, Upload, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export function ActionNavigation({
  title = "title",
  border = false,
  scrolled = false,
  onClose,
  showClose = true,
  showButton = false,
  buttonLabel = "next",
  onButtonClick,
  actions,
  variant = "auto",
  className,
  ...props
}: {
  title?: string;
  border?: boolean;
  scrolled?: boolean;
  onClose?: () => void;
  showClose?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  actions?: React.ReactNode;
  variant?: "mobile" | "desktop" | "auto";
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <header
      className={cn(
        "flex items-center w-full transition-colors duration-200",
        variant === "mobile"
          ? "h-14 px-4 py-2"
          : variant === "desktop"
          ? "h-[72px] px-8 py-4"
          : "h-14 px-4 py-2 md:h-[72px] md:px-8 md:py-4",
        scrolled && "backdrop-blur-[20px]",
        border && "border-b border-[var(--borders-default)]",
        className
      )}
      {...props}
    >
      <div className="flex-1 flex items-center">
        {showClose && (
          <IconButton
            icon={X}
            variant="secondary"
            glass
            size="md"
            onClick={onClose}
            aria-label="Close"
          />
        )}
      </div>

      <span className="text-base font-semibold text-[var(--text-base-primary)] leading-5 text-center shrink-0">
        {title}
      </span>

      <div
        className={cn(
          "flex-1 flex items-center justify-end",
          variant === "desktop" ? "gap-3" : "gap-2"
        )}
      >
        {showButton && (
          <button
            onClick={onButtonClick}
            className="h-10 min-w-[64px] px-3 rounded-full bg-[var(--backgrounds-neutral-inverse-default)] text-[var(--text-base-alternate)] text-base font-medium leading-6"
          >
            {buttonLabel}
          </button>
        )}
        {actions || (
          <Fragment>
            <IconButton
              icon={Upload}
              variant="secondary"
              glass
              size="md"
              aria-label="Share"
            />
            <IconButton
              icon={MoreHorizontal}
              variant="secondary"
              glass
              size="md"
              aria-label="More"
            />
          </Fragment>
        )}
      </div>
    </header>
  );
}

ActionNavigation.displayName = "ActionNavigation";
