"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
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

  type?: "default" | "minus";

  body?: string;
  supporters?: { count: number; avatars: string[] };
  commentCount?: number;
  sectionLabel?: string;
  sectionDateLabel?: string;
  supporter?: boolean;
  progress?: { done: number; total: number };
  onCta?: () => void;

  onOpen?: () => void;
  hideCreatorLabel?: boolean;
  className?: string;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function deriveCtaLabel(supporter: boolean, progress?: { done: number; total: number }): string {
  if (!supporter) return "start";
  if (!progress) return "continue";
  const { done, total } = progress;
  if (done === 0) return "start";
  if (done >= total - 1) return "finish";
  return "continue";
}

function deriveProgressLabel(progress?: { done: number; total: number }): string {
  if (!progress) return "0 of 4 completed";
  return `${progress.done} of ${progress.total} completed`;
}

export function CampaignCard(props: CampaignCardProps) {
  if (props.type === "minus") {
    return <CampaignCardMinus {...props} />;
  }
  return <CampaignCardDefaultVariant {...props} />;
}

function CampaignCardDefaultVariant({
  campaignId,
  image,
  creator,
  title,
  body = "",
  supporters = { count: 0, avatars: [] },
  commentCount = 0,
  sectionLabel,
  sectionDateLabel,
  supporter = false,
  progress,
  onOpen,
  onCta,
  className,
}: CampaignCardProps) {
  const ctaLabel = deriveCtaLabel(supporter, progress);
  const statusLabel = supporter ? deriveProgressLabel(progress) : "4 actions left";

  return (
    <div className={cn("flex w-full max-w-[343px] flex-col gap-2", className)}>
      {(sectionLabel || sectionDateLabel) && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm leading-5 text-[var(--text-base-secondary)]">
            {sectionLabel ?? ""}
          </p>
          {sectionDateLabel ? (
            <p className="text-xs leading-4 text-[var(--text-base-secondary)]">{sectionDateLabel}</p>
          ) : null}
        </div>
      )}

      <motion.article
        onClick={onOpen}
        className={cn(
          "group relative h-[360px] w-full cursor-pointer overflow-hidden rounded-[var(--radius-7)]",
          "border border-[var(--borders-default)]",
          "shadow-[0_32px_64px_-12px_rgba(20,15,20,0.14),0_5px_5px_-2.5px_rgba(20,15,20,0.04)]",
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
        <motion.img
          layoutId={`campaign-${campaignId}-hero`}
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover"
          transition={SHARED_ELEMENT_TRANSITION}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,96,180,0)_0%,#00101f_64%)]" />

        <div className="relative flex h-full flex-col justify-between px-5 pb-4 pt-5">
          <motion.div
            layoutId={`campaign-${campaignId}-avatar`}
            className="flex items-center gap-1.5"
            transition={SHARED_ELEMENT_TRANSITION}
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              className="size-6 rounded-full border-[0.5px] border-[var(--borders-icon-neutral-primary)] object-cover"
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium leading-5 text-[var(--text-base-primary)]">{creator.name}</span>
              {creator.verified ? <VerifiedBadge /> : null}
            </div>
          </motion.div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-0.5">
              <h3
                className="line-clamp-2 text-xl font-semibold leading-7 tracking-[-0.5px] text-[var(--text-base-primary)] drop-shadow-[0_2px_4px_rgba(20,15,20,0.06)]"
                style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
              >
                {title}
              </h3>
              <p className="truncate text-sm leading-5 text-[var(--text-glass-primary)]">{body}</p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <SocialProofRow supporters={supporters} commentCount={commentCount} />

              <div className="relative flex h-8 shrink-0 items-center">
                <span className="text-sm leading-5 text-[var(--text-glass-primary)] transition-opacity duration-150 group-hover:opacity-0 group-focus-within:opacity-0">
                  {statusLabel}
                </span>

                <div className="pointer-events-none absolute right-0 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <CtaButton
                    label={ctaLabel}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCta?.();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

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
              className="size-5 shrink-0 rounded-full border border-[var(--backgrounds-base)] object-cover"
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
      <span className="relative whitespace-nowrap">{label}</span>
      <ArrowRight size={16} className="relative shrink-0" aria-hidden="true" />
    </button>
  );
}
