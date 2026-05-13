"use client";

/**
 * CampaignCard — bound to `CampaignCard` (node 4201:389668) in the Product Figma library.
 * fileKey: 7S4EQFfpK3hIN87Nd7ggV8
 *
 * Full-bleed image card for a campaign feed. Two size variants:
 *  - default / activity — 343 × 360px, image fills the card, content overlaid at bottom.
 *  - minus             — 160 × 200px compact card for carousels.
 *
 * Hero image uses framer-motion `layoutId` for a shared-element transition into the
 * detail page (Airbnb / App Store pattern). Apple iOS easing curve.
 */

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const SHARED_ELEMENT_TRANSITION = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
};

export interface CampaignCreator {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface CampaignCardProps {
  campaignId: string;
  image: string;
  creator: CampaignCreator;
  title: string;

  /**
   * Card variant:
   * - `default`  — standard full card (343 × 360px).
   * - `activity` — full card with creator header rendered above the card.
   * - `minus`    — compact carousel card (160 × 200px).
   */
  type?: "default" | "activity" | "minus";

  /* ---------- Default / Activity variant only ---------- */
  body?: string;
  supporters?: { count: number | string; avatars: string[] };
  commentCount?: number | string;
  /** Optional section label above the card (e.g. "new from creator you like"). */
  sectionLabel?: string;
  /** True when the current user has joined — changes gradient + footer text. */
  supporter?: boolean;
  /** Drives progress copy ("2 of 4 completed") when supporter=true. */
  progress?: { done: number; total: number };
  /** Click handler for the primary CTA pill. */
  onCta?: () => void;

  /* ---------- Shared ---------- */
  onOpen?: () => void;
  /** Minus variant: hide the creator avatar + label row. */
  hideCreatorLabel?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCount(n: number | string): string {
  if (typeof n === "string") return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function deriveCtaLabel(supporter: boolean, progress?: { done: number; total: number }): string {
  if (!supporter) return "start";
  if (!progress) return "continue";
  if (progress.done === 0) return "start";
  if (progress.done >= progress.total - 1) return "finish";
  return "continue";
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export function CampaignCard(props: CampaignCardProps) {
  if (props.type === "minus") return <CampaignCardSm {...props} />;
  return <CampaignCardMd {...props} />;
}

/* ------------------------------------------------------------------ */
/*  Md variant — 343 × 360px full-bleed card                          */
/* ------------------------------------------------------------------ */

function CampaignCardMd({
  campaignId,
  image,
  creator,
  title,
  body = "",
  supporters = { count: 0, avatars: [] },
  commentCount = 0,
  sectionLabel,
  type = "default",
  supporter = false,
  progress,
  onOpen,
  onCta,
  className,
}: CampaignCardProps) {
  const ctaLabel = deriveCtaLabel(supporter, progress);
  const heroId = `campaign-${campaignId}-hero`;

  const progressText = supporter && progress
    ? `${progress.done} of ${progress.total} completed`
    : `${progress?.total ?? 4} actions left`;

  return (
    <div className={cn("flex w-full max-w-[343px] flex-col gap-2", className)}>

      {/* Section label above card */}
      {sectionLabel && (
        <p className="text-sm leading-5 text-[var(--text-base-secondary)]">{sectionLabel}</p>
      )}

      {/* Activity type: creator header above the card */}
      {type === "activity" && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img
              src={creator.avatar}
              alt=""
              className="size-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium leading-5 text-[var(--text-base-primary)]">
              {creator.name}
            </span>
          </div>
          <span className="text-xs leading-4 text-[var(--text-base-secondary)]">Jan 16th</span>
        </div>
      )}

      {/* Card */}
      <motion.article
        onClick={onOpen}
        role="article"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen?.(); }
        }}
        aria-label={`Open campaign: ${title}`}
        className={cn(
          "group relative flex h-[360px] w-full cursor-pointer flex-col",
          "overflow-hidden rounded-[var(--radius-7)]",
          "border border-[var(--borders-default)]",
          "shadow-[0_32px_64px_-12px_rgba(20,15,20,0.14),0_5px_5px_-2.5px_rgba(20,15,20,0.04)]",
          "transition-[transform,filter] duration-150 ease-out",
          "active:scale-[0.98] active:brightness-95",
          "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
      >
        {/* Background image */}
        <motion.img
          layoutId={heroId}
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover"
          transition={SHARED_ELEMENT_TRANSITION}
        />

        {/* Gradient overlay — deeper when supporter (less blue in image) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[var(--radius-7)]",
            supporter
              ? "bg-gradient-to-b from-[rgba(0,49,92,0)] to-[#00101f] to-[64%]"
              : "bg-gradient-to-b from-[rgba(0,96,180,0)] to-[#00101f] to-[64%]"
          )}
        />

        {/* Content layer */}
        <div className="relative flex h-full flex-col justify-between px-5 pb-4 pt-5">

          {/* Creator on card (default type only) */}
          {type !== "activity" && (
            <div className="flex items-center gap-1.5">
              <img
                src={creator.avatar}
                alt=""
                className="size-6 rounded-full border-[0.5px] border-[var(--text-base-primary)] object-cover"
              />
              <span className="text-sm font-medium leading-5 text-[var(--text-base-primary)]">
                {creator.name}
              </span>
              {creator.verified && <VerifiedBadge size={16} />}
            </div>
          )}

          {/* Bottom content */}
          <div className="flex flex-col gap-4">

            {/* Text block */}
            <div className="flex flex-col gap-0.5">
              <h3
                className="overflow-hidden text-ellipsis text-[20px] font-semibold leading-7 tracking-[-0.4px] text-[var(--text-base-primary)] drop-shadow-[0_2px_4px_rgba(20,15,20,0.06)]"
                style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
              >
                {title}
              </h3>
              {body && (
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-5 text-[var(--text-glass-primary)]">
                  {body}
                </p>
              )}
            </div>

            {/* Footer: metrics + progress text, CTA on hover */}
            <div className="flex items-center justify-between">
              <div className="flex h-6 items-center gap-2">
                {/* Avatar group + supporter count */}
                <SupporterAvatars avatars={supporters.avatars} count={supporters.count} />
                {/* Comment count */}
                <CommentCount count={commentCount} />
              </div>

              <div className="flex items-center gap-3">
                <GlassPillButton
                  label={ctaLabel}
                  onClick={(e) => { e.stopPropagation(); onCta?.(); }}
                  className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sm variant — 160 × 200px compact carousel card                    */
/* ------------------------------------------------------------------ */

function CampaignCardSm({
  image,
  creator,
  title,
  supporters = { count: 0, avatars: [] },
  commentCount = 0,
  onOpen,
  hideCreatorLabel,
  className,
}: CampaignCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open campaign: ${title}`}
      className={cn(
        "group relative flex h-[200px] w-[160px] shrink-0 cursor-pointer flex-col overflow-hidden",
        "rounded-[var(--radius-6)] border border-[var(--borders-default)]",
        "transition-[transform,filter] duration-150 ease-out",
        "active:scale-[0.98] active:brightness-95",
        "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className
      )}
    >
      {/* Background image */}
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-6)] bg-gradient-to-b from-[rgba(0,96,180,0)] to-[#00101f] to-[80%]"
      />

      {/* Content — creator top, title+metrics always at bottom */}
      <div className={cn("relative flex h-full flex-col p-3", hideCreatorLabel ? "justify-end" : "justify-between")}>

        {/* Creator row — top */}
        {!hideCreatorLabel && (
          <div className="flex items-center gap-1">
            <img
              src={creator.avatar}
              alt=""
              className="size-5 shrink-0 rounded-full border-[0.5px] border-[var(--text-base-primary)] object-cover"
            />
            <div className="flex items-center gap-0.5">
              <span className="text-[12px] font-medium leading-4 text-[var(--text-base-primary)]">
                {creator.name}
              </span>
              {creator.verified && <VerifiedBadge size={12} />}
            </div>
          </div>
        )}

        {/* Bottom — title + metrics */}
        <div className="flex flex-col justify-end gap-1.5 text-left">
          <p
            className="overflow-hidden text-ellipsis text-[14px] font-semibold leading-5 text-[var(--text-base-primary)]"
            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
          >
            {title}
          </p>
          {/* Metrics row — h-6, gap-2 */}
          <div className="flex h-6 items-center gap-2">
            <SupporterAvatars avatars={supporters.avatars} count={supporters.count} size="sm" />
            <CommentCount count={commentCount} size="sm" />
          </div>
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Verified"
      className="shrink-0"
    >
      <path
        d="M8 1.5 9.7 3l2.3-.3.4 2.3 2 1.2-.9 2.2.9 2.2-2 1.2-.4 2.3-2.3-.3L8 14.5 6.3 13l-2.3.3-.4-2.3-2-1.2.9-2.2-.9-2.2 2-1.2.4-2.3 2.3.3L8 1.5Z"
        fill="#2b7fff"
      />
      <path
        d="M5.5 8 7 9.5l3.5-3.5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupporterAvatars({
  avatars,
  count,
  size = "md",
}: {
  avatars: string[];
  count: number | string;
  size?: "md" | "sm";
}) {
  const avatarSize = size === "sm" ? "size-4" : "size-5";
  const overlap = size === "sm" ? "-space-x-[3.3px]" : "-space-x-[4.2px]";

  return (
    <div className="flex items-center gap-1">
      <div className={cn("flex items-center", overlap)}>
        {avatars.slice(0, 3).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={cn(avatarSize, "shrink-0 rounded-full border border-[#003166] object-cover")}
          />
        ))}
      </div>
      <span className={cn("leading-5 text-[var(--text-glass-primary)]", size === "sm" ? "text-xs" : "text-sm")}>
        {formatCount(count)}
      </span>
    </div>
  );
}

function CommentCount({ count, size = "md" }: { count: number | string; size?: "md" | "sm" }) {
  const iconSize = size === "sm" ? 12 : 16;
  return (
    <div className="flex items-center gap-1">
      {/* message-dots-circle icon (mirrored as in Figma) */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 20 20"
        fill="currentColor"
        className="shrink-0 -scale-y-100 rotate-180 text-[var(--text-glass-primary)]"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2C5.58 2 2 5.36 2 9.5c0 1.9.73 3.63 1.93 4.96L2.3 17.1a.5.5 0 0 0 .62.65l3.3-1.1A8.2 8.2 0 0 0 10 17c4.42 0 8-3.36 8-7.5S14.42 2 10 2Zm-2.5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm3.5-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        />
      </svg>
      <span className={cn("leading-5 text-[var(--text-glass-primary)]", size === "sm" ? "text-xs" : "text-sm")}>
        {count}
      </span>
    </div>
  );
}

function GlassPillButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-8 shrink-0 items-center justify-center gap-0.5 overflow-hidden",
        "rounded-full border border-[rgba(245,245,245,0.06)]",
        "min-w-[56px] px-2",
        "text-sm font-medium leading-5 text-[var(--text-base-alternate)]",
        "shadow-[0_0_1px_rgba(0,0,0,0.1)]",
        "transition-[background-color,transform,opacity] duration-150 ease-out",
        "active:scale-[0.97] motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_0_0_0.5px_#a6a6a6]",
        className
      )}
    >
      {/* Glass blur background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full backdrop-blur-[7px] bg-[rgba(245,245,245,0.9)]"
      />
      <span className="relative">{label}</span>
      <ArrowRight size={16} className="relative shrink-0" aria-hidden="true" />
    </button>
  );
}
