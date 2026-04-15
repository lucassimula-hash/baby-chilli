"use client";

/**
 * SupportCreatorCard — bound to `support creator card` (node 43407:6504) in the
 * Foundations & Components Figma library.
 * fileKey: RcR7D8LPcMhNadWgs8T5cF
 *
 * Compact creator profile card for the "trending creators" feed section.
 * 167.5 × 206.58px on mobile — avatar + username badge (tilted), stats row
 * (actions / supporters), and a brand-pink "support creator" CTA.
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SupportCreatorCardProps {
  /** Creator handle (without the `@`). */
  username: string;
  /** Creator avatar URL. */
  avatar: string;
  /** Number of actions completed by this creator (e.g. `230`). */
  actions: number | string;
  /** Number of supporters (e.g. `2.1k`, `230`, `1.2M`). */
  supporters: number | string;

  /** Primary CTA label — defaults to "support creator". */
  ctaLabel?: string;

  /** Click handler for the CTA. */
  onSupport?: () => void;
  /** Tap full-card handler (navigate to creator profile). */
  onOpen?: () => void;

  className?: string;
}

export function SupportCreatorCard({
  username,
  avatar,
  actions,
  supporters,
  ctaLabel = "support creator",
  onSupport,
  onOpen,
  className,
}: SupportCreatorCardProps) {
  return (
    <div
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      className={cn(
        "relative flex w-[167.5px] shrink-0 flex-col items-center justify-center gap-3 overflow-hidden",
        "rounded-[var(--radius-7)] border border-[var(--borders-neutral-moderate)]",
        "bg-[var(--backgrounds-neutral-primary-default)] p-3",
        // Press feedback (mobile-first)
        "transition-[transform,filter] duration-150 ease-out",
        onOpen && "cursor-pointer active:scale-[0.98] active:brightness-95 motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className
      )}
    >
      {/* Avatar + tilted username badge */}
      <div className="flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="size-[84px] overflow-hidden rounded-full">
            <img src={avatar} alt="" className="size-full object-cover" />
          </div>
          {/* Tilted username badge — overlaps avatar bottom */}
          <div className="-mt-[19px] -rotate-1">
            <div className="flex items-center rounded-full bg-[var(--backgrounds-neutral-secondary-default)] px-1.5 py-1">
              <span className="text-xs leading-4 text-[var(--text-base-primary)]">
                <span className="text-[var(--text-brand-primary)]">@</span>
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex w-full items-center justify-center gap-1">
        <StatColumn value={actions} label="actions" />
        <div
          aria-hidden="true"
          className="h-4 w-px shrink-0 bg-[var(--borders-default)]"
        />
        <StatColumn value={supporters} label="supporters" />
      </div>

      {/* CTA */}
      <Button
        variant="brand"
        size="sm"
        className="w-full"
        onClick={
          onSupport
            ? (e) => {
                e.stopPropagation();
                onSupport();
              }
            : undefined
        }
      >
        {ctaLabel}
      </Button>
    </div>
  );
}

function StatColumn({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
      <span className="text-sm font-medium leading-5 text-[var(--text-base-primary)]">
        {value}
      </span>
      <span className="text-xs leading-4 text-[var(--text-base-secondary)]">
        {label}
      </span>
    </div>
  );
}
