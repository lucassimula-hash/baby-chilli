"use client";

/**
 * CampaignCard — bound to `CampaignCard` (node 4201:389668) in the Product Figma library.
 * fileKey: 7S4EQFfpK3hIN87Nd7ggV8
 *
 * Feed preview for a campaign. Tap anywhere on the card → campaign detail page.
 * Hero image uses framer-motion `layoutId` so the transition morphs it into the
 * detail page's top banner (Airbnb / App Store style).
 */

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared-element transition config used for the hero image + creator avatar
 * morph between feed CampaignCard and detail CampaignPage.
 * Apple iOS-inspired easing curve: soft start + smooth settle, same timing both directions.
 */
export const SHARED_ELEMENT_TRANSITION = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1] as const,
};

export interface CampaignCreator {
  name: string; // e.g. "@seaspiracy"
  avatar: string;
  verified?: boolean;
}

export interface CampaignCardProps {
  /** Stable ID used for the shared-element hero transition. */
  campaignId: string;
  image: string;
  creator: CampaignCreator;
  title: string;

  /**
   * Card variant.
   * - `default` — full card (343×363), with body, supporters, CTA.
   * - `minus`   — compact mini card (160×236) for carousels: image + title + small creator label.
   */
  type?: "default" | "minus";

  /* ---------- Default variant only ---------- */
  body?: string;
  /** Supporters social proof (avatars + count, e.g. 3400 → "3.4k"). */
  supporters?: { count: number; avatars: string[] };
  commentCount?: number;

  /** Optional section label above the card (e.g. "new from creator you like"). */
  sectionLabel?: string;

  /** True when the current user has joined. Switches footer to progress. */
  supporter?: boolean;
  /** Required when supporter=true. Drives progress bar + button micro-copy. */
  progress?: { done: number; total: number };

  /** Click handler for the primary CTA. */
  onCta?: () => void;

  /* ---------- Shared ---------- */

  /** Click handler (tap full-card → campaign page). */
  onOpen?: () => void;

  /** Hide the creator avatar + handle label below the title (minus variant only). */
  hideCreatorLabel?: boolean;

  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

/** Derive the CTA label from supporter state + progress. */
function deriveCtaLabel(supporter: boolean, progress?: { done: number; total: number }): string {
  if (!supporter) return "join";
  if (!progress) return "continue";
  const { done, total } = progress;
  if (done === 0) return "start";
  if (done >= total - 1) return "finish";
  return "continue";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CampaignCard(props: CampaignCardProps) {
  if (props.type === "minus") {
    return <CampaignCardMinus {...props} />;
  }
  return <CampaignCardDefaultVariant {...props} />;
}

/* ------------------------------------------------------------------ */
/*  Default variant (full card)                                        */
/* ------------------------------------------------------------------ */

function CampaignCardDefaultVariant({
  campaignId,
  image,
  creator,
  title,
  body = "",
  supporters = { count: 0, avatars: [] },
  commentCount = 0,
  sectionLabel,
  supporter = false,
  progress,
  onOpen,
  onCta,
  className,
}: CampaignCardProps) {
  const ctaLabel = deriveCtaLabel(supporter, progress);
  const layoutId = `campaign-${campaignId}-hero`;

  return (
    <div className={cn("flex w-full max-w-[343px] flex-col gap-2", className)}>
      {/* Section label (optional, lives outside the card as per Figma) */}
      {sectionLabel && (
        <p className="px-0 text-sm leading-5 text-[var(--text-base-secondary)]">{sectionLabel}</p>
      )}

      {/* Card — full-card tap target opens the campaign detail */}
      <motion.article
        onClick={onOpen}
        className={cn(
          "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[var(--radius-7)]",
          "border border-[var(--borders-default)]",
          "bg-[linear-gradient(180deg,#0060b4_0%,#00101f_80%)]",
          "shadow-[0_32px_64px_-12px_rgba(20,15,20,0.14),0_5px_5px_-2.5px_rgba(20,15,20,0.04)]",
          // Entrance + press feedback (consistent with ActionCtaCard)
          "animate-action-cta-enter",
          "transition-[transform,filter] duration-150 ease-out",
          "active:scale-[0.98] active:brightness-95",
          "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        )}
        role="article"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.();
          }
        }}
        aria-label={`Open campaign: ${title}`}
      >
        {/* Hero image — motion + layoutId = shared element transition target */}
        <div className="relative h-[142px] w-full shrink-0">
          <motion.img
            layoutId={layoutId}
            src={image}
            alt=""
            className="size-full object-cover"
            transition={SHARED_ELEMENT_TRANSITION}
          />
          {/* Bottom fade-out — image dissolves into the card's vertical gradient.
             Target color = the card bg color at the image's bottom edge (y≈142/363 of
             `linear-gradient(180deg, #0060b4 0%, #00101f 80%)`), i.e. ~rgb(0, 58, 108). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(0,58,108,0)_0%,rgba(0,58,108,0.6)_55%,rgba(0,58,108,1)_100%)]"
          />
        </div>

        {/* Content */}
        <div className="relative flex -mt-[33px] flex-col items-center gap-2 px-6 pb-6">
          {/* Creator avatar */}
          <motion.div
            layoutId={`campaign-${campaignId}-avatar`}
            className="flex flex-col items-center gap-0.5"
            transition={SHARED_ELEMENT_TRANSITION}
          >
            <div className="relative size-16 rounded-full border border-[var(--text-base-primary)]">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="size-full rounded-full object-cover"
              />
            </div>
            <div className="mt-1 flex items-center gap-0.5 text-sm font-medium leading-5 text-[var(--text-base-primary)]">
              <span>{creator.name}</span>
              {creator.verified && <VerifiedBadge />}
            </div>
          </motion.div>

          {/* Title + body */}
          <div className="flex w-full flex-col items-center gap-0.5">
            <h3
              className="text-center text-xl font-semibold leading-7 tracking-[-0.4px] text-[var(--text-base-primary)] drop-shadow-[0_2px_4px_rgba(20,15,20,0.06)]"
              style={{
                fontFamily: "var(--font-family-primary), sans-serif",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </h3>
            <div
              className="max-h-[40px] w-full overflow-hidden text-center text-sm leading-5 text-[var(--text-glass-primary)]"
              style={{
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
              }}
            >
              <p>{body}</p>
            </div>
          </div>

          {/* Footer row */}
          <div className="mt-2 flex w-full items-center justify-between gap-3">
            {supporter && progress ? (
              <ProgressRow done={progress.done} total={progress.total} />
            ) : (
              <SocialProofRow
                supporters={supporters}
                commentCount={commentCount}
              />
            )}

            <CtaButton
              label={ctaLabel}
              onClick={(e) => {
                e.stopPropagation();
                onCta?.();
              }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Minus variant (compact 160×236 mini card)                          */
/* ------------------------------------------------------------------ */

function CampaignCardMinus({
  image,
  creator,
  title,
  onOpen,
  hideCreatorLabel,
  className,
}: CampaignCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex w-[160px] shrink-0 flex-col gap-2 text-left",
        "animate-action-cta-enter",
        "transition-[transform,filter] duration-150 ease-out",
        "active:scale-[0.98] active:brightness-95",
        "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-[var(--radius-6)]",
        className
      )}
    >
      <img
        src={image}
        alt=""
        className="h-[160px] w-[160px] shrink-0 rounded-[var(--radius-6)] border border-[var(--borders-default)] object-cover"
      />
      <div className="flex w-full flex-col items-start gap-1">
        <p
          className="text-sm font-semibold leading-5 text-[var(--text-base-primary)]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 40,
          }}
        >
          {title}
        </p>
        {!hideCreatorLabel && (
          <div className="flex items-center gap-1">
            <img
              src={creator.avatar}
              alt=""
              className="size-6 shrink-0 rounded-full object-cover"
            />
            <span className="text-xs font-medium leading-4 text-[var(--text-base-primary)]">
              {creator.name.replace(/^@/, "")}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
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

function SocialProofRow({
  supporters,
  commentCount,
}: {
  supporters: { count: number; avatars: string[] };
  commentCount: number;
}) {
  return (
    <div className="flex h-6 items-center gap-2">
      <div className="flex items-center gap-1">
        <div className="flex items-center -space-x-1.5">
          {supporters.avatars.slice(0, 3).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="size-5 shrink-0 rounded-full border border-[#003166] object-cover"
            />
          ))}
        </div>
        <span className="text-sm leading-5 text-[var(--text-glass-primary)]">
          {formatCount(supporters.count)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle size={16} className="shrink-0 text-[var(--text-glass-primary)]" aria-hidden="true" />
        <span className="text-sm leading-5 text-[var(--text-glass-primary)]">{commentCount}</span>
      </div>
    </div>
  );
}

function ProgressRow({ done, total }: { done: number; total: number }) {
  return (
    <div className="flex min-w-0 items-center">
      <span className="text-sm leading-5 text-[var(--text-glass-primary)]">
        {done} of {total} completed
      </span>
    </div>
  );
}

function CtaButton({ label, onClick }: { label: string; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-8 shrink-0 items-center justify-center gap-0.5 overflow-hidden",
        "rounded-full border border-[rgba(245,245,245,0.06)]",
        "bg-[rgba(245,245,245,0.9)] px-3 pl-4",
        "text-sm font-medium leading-5 text-[var(--text-base-alternate)]",
        "shadow-[0_0_1px_rgba(0,0,0,0.1)] backdrop-blur-[7px]",
        "transition-[background-color,transform] duration-150 ease-out",
        "active:bg-[rgba(245,245,245,0.95)] active:scale-[0.97] motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full",
        "before:shadow-[inset_0_0_0_0.5px_#a6a6a6]"
      )}
    >
      <span className="relative">{label}</span>
      <ArrowRight size={16} className="relative shrink-0" aria-hidden="true" />
    </button>
  );
}
