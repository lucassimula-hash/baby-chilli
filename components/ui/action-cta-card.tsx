"use client";

/**
 * ActionCtaCard — bound to `action CTA` (node 3403:68397) in the Product Figma library.
 * fileKey: 7S4EQFfpK3hIN87Nd7ggV8
 * Matrix: 7 Types × 3 States (+ Action type variants).
 *
 * Visual target (from Figma design_context):
 * - Default / Pinned  → 300×312 glass card (backdrop-blur-20, translucent overlay gradient)
 *                       Pinned = brighter overlay + "pinned" label in header.
 * - Completed         → 343×auto dark card (bg neutral primary), green "completed" chip,
 *                       truncated title, "do again" refresh pill. Not a horizontal banner.
 * - Action            → 300×332 dark glass card with big counter (1/5, of supporters, etc.)
 */

import type { ReactNode } from "react";
import {
  Mail,
  Phone,
  HelpCircle,
  Link as LinkIcon,
  MessageCircle,
  Pin,
  Check,
  RefreshCw,
  MapPin,
} from "lucide-react";

/** Inline Instagram glyph (lucide's `Instagram` isn't re-exported in this build). */
function InstagramIcon({ className, size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ActionCtaType =
  | "send-email"
  | "instagram"
  | "google-maps"
  | "phone-call"
  | "question"
  | "external-link"
  | "action";

export type ActionCtaState = "default" | "pinned" | "completed" | "top-supporters";

export interface ActionCtaCardProps {
  type?: ActionCtaType;
  state?: ActionCtaState;
  title?: string;
  dear?: string;
  body?: string;
  count?: number;
  countLabel?: string;
  actionLabel?: string;
  channelLabel?: string;
  className?: string;
  /** Click handler for the primary CTA (vertical card + action counter). */
  onAction?: () => void;
  /** Click handler for the "do again" refresh button on the completed state. */
  onRedo?: () => void;
  /** Render the primary CTA in a loading state (spinner, disables click). */
  isLoading?: boolean;
  /** Disable the primary CTA. */
  isDisabled?: boolean;
  /** Accessible label when the visible button text isn't descriptive enough. */
  "aria-label"?: string;
}

/* ------------------------------------------------------------------ */
/*  Assets (served locally from /public/action-cta-card/)              */
/* ------------------------------------------------------------------ */

const GOOGLE_MAPS_BASEMAP = "/action-cta-card/google-maps-basemap.png";
const COMMENT_AUTHOR_AVATAR = "/action-cta-card/comment-author.png";
const COMMENT_REPLY_AVATAR = "/action-cta-card/comment-reply.png";
const COMMENT_PREVIEW_IMAGE = "/action-cta-card/comment-preview.png";
const COMPLETED_CARD_GRADIENT = "/action-cta-card/completed-gradient.png";

/* ------------------------------------------------------------------ */
/*  Type metadata                                                      */
/* ------------------------------------------------------------------ */

const TYPE_META: Record<ActionCtaType, {
  chipLabel: string;
  icon: ReactNode;
  actionLabel: string;
  countLabel: string;
  count: number;
  title: string;
  body: string;
}> = {
  "send-email": {
    chipLabel: "email",
    icon: <Mail size={12} className="shrink-0" />,
    actionLabel: "send email",
    countLabel: "email sent",
    count: 34,
    title: "Call for Action: Protecting our ocean's legacy",
    body: "I am writing to bring to your attention a serious accountability concern in Idaho wildlife management. Fish and Game Commissioner Brody Harshbarger has been charged…",
  },
  instagram: {
    chipLabel: "comment",
    icon: <InstagramIcon className="shrink-0" />,
    actionLabel: "comment on Instagram",
    countLabel: "comments",
    count: 142,
    title: "‼️ URGENT ‼️ Yesterday, Trump's “God Squad” voted to exempt oil and gas companies from complying with the #endangeredspeciesact when operating in the Gulf. 🤡",
    body: "here 5 variations pick one, do not use hashtag # or @ : \n\n1. Saying “we operate under regulations” doesn't make industrial krill harvesting sustainable. True commitment to Antarctica is measured by…",
  },
  "google-maps": {
    chipLabel: "Google Maps",
    icon: <MapPin size={12} className="shrink-0 text-[#ea4335]" />,
    actionLabel: "post a review",
    countLabel: "reviews",
    count: 142,
    title: "",
    body: "",
  },
  "phone-call": {
    chipLabel: "call",
    icon: <Phone size={12} className="shrink-0" />,
    actionLabel: "call",
    countLabel: "calls done",
    count: 12,
    title: "",
    body: "Hi, I'm calling to urge Governor Abbott to publicly respond to the 47 Texas House members who wrote him about the Big Bend border wall. Local ranchers, sheriffs, and county officials across five counties oppose this project. A federal contractor has already entered county-owned roads without permis…",
  },
  question: {
    chipLabel: "question",
    icon: <HelpCircle size={12} className="shrink-0" />,
    actionLabel: "reply to the survey",
    countLabel: "replies",
    count: 423,
    title: "",
    body: "Why do you think most of the young people despite their active participation in Advocacy, they are left out in global discussions and major opportunities…",
  },
  "external-link": {
    chipLabel: "external link",
    icon: <LinkIcon size={12} className="shrink-0" />,
    actionLabel: "take action",
    countLabel: "completed",
    count: 52,
    title: "",
    body: "Hi all\nI am trying to build a community of artists, scientists, and people who care about climate and the environment! I have a website I made with fun stuff to look at and discuss and made a server…",
  },
  action: {
    chipLabel: "action",
    icon: <MessageCircle size={12} className="shrink-0" />,
    actionLabel: "view actions completed",
    countLabel: "actions completed",
    count: 1,
    title: "",
    body: "",
  },
};

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin motion-reduce:animate-none", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.25" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  "aria-label"?: string;
}

function GlassButton({ children, className, onClick, disabled, loading, ...rest }: GlassButtonProps) {
  const isInactive = disabled || loading;
  return (
    <button
      type="button"
      onClick={isInactive ? undefined : onClick}
      disabled={isInactive}
      aria-busy={loading || undefined}
      aria-label={rest["aria-label"]}
      className={cn(
        "relative flex h-10 w-full items-center justify-center gap-1.5",
        "rounded-full border border-[rgba(245,245,245,0.06)]",
        "bg-[rgba(245,245,245,0.9)] px-3",
        "text-base font-medium leading-6 text-[var(--text-base-alternate)]",
        "shadow-[0_0_1px_rgba(0,0,0,0.1)]",
        "backdrop-blur-[7px] transition-[background-color,opacity,transform] duration-150 ease-out",
        "active:bg-[rgba(245,245,245,0.95)] active:scale-[0.98] motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full",
        "before:shadow-[inset_0_0_0_0.5px_#a6a6a6]",
        className
      )}
    >
      {loading && <Spinner className="relative" />}
      <span className="relative truncate">{children}</span>
    </button>
  );
}

function Chip({
  label,
  icon,
  strong,
}: {
  label: string;
  icon: ReactNode;
  /** Stronger backdrop + tint — used over bright backgrounds (e.g. Google Maps). */
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-full px-2 py-1 text-sm leading-5 text-[var(--text-base-primary)]",
        strong
          ? "bg-[rgba(20,15,20,0.32)] text-white backdrop-blur-[100px]"
          : "bg-[var(--backgrounds-neutral-opacity-lighter)] backdrop-blur-[20px]"
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function PinnedLabel() {
  return (
    <div className="ml-auto flex items-center gap-1 text-sm leading-5 text-[var(--text-glass-primary)]">
      <Pin size={12} className="shrink-0 animate-action-cta-pin-pulse" />
      <span>pinned</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical card shell (Default + Pinned)                             */
/* ------------------------------------------------------------------ */

interface CardShellProps {
  state: ActionCtaState;
  children: ReactNode;
  backgroundLayer?: ReactNode;
  /** Override radius (google-maps uses 32px instead of 24px). */
  radius?: string;
  className?: string;
}

function CardShell({ state, children, backgroundLayer, radius = "24px", className }: CardShellProps) {
  const isPinned = state === "pinned";

  const overlayGradient = isPinned
    ? "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.048) 49.5%, rgba(255, 255, 255, 0.024) 100%), linear-gradient(90deg, rgba(44, 44, 44, 0.35), rgba(44, 44, 44, 0.35))"
    : "linear-gradient(180deg, rgba(255, 255, 255, 0.063) 0%, rgba(255, 255, 255, 0.02) 49.5%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgba(44, 44, 44, 0.35), rgba(44, 44, 44, 0.35))";

  return (
    <div
      className={cn(
        "relative flex h-[312px] w-full max-w-[300px] shrink-0 flex-col overflow-hidden",
        "border border-solid",
        isPinned ? "border-[var(--borders-default)]" : "border-[rgba(255,255,255,0.12)]",
        "backdrop-blur-[20px]",
        // Entrance animation (runs once when the card mounts — naturally staggers in a feed
        // because cards are rendered lazily by the parent list/virtualizer).
        "animate-action-cta-enter",
        // Touch press feedback (full-card tactile response for mobile).
        "transition-[transform,filter] duration-150 ease-out",
        "active:scale-[0.98] active:brightness-95",
        "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
        className
      )}
      style={{ backgroundImage: overlayGradient, borderRadius: radius }}
    >
      {backgroundLayer}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Type-specific content renderers                                    */
/* ------------------------------------------------------------------ */

function EmailContent({ title, dear, body }: { title: string; dear: string; body: string }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1 text-sm leading-5">
      <p className="font-medium text-[var(--text-base-primary)]">{title}</p>
      <div className="relative min-h-0 flex-1 overflow-hidden text-[var(--text-glass-primary)]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
          }}
        >
          <p>{dear}</p>
          <p className="mt-0.5">{body}</p>
        </div>
      </div>
    </div>
  );
}

function InstagramContent({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Author comment + preview */}
      <div className="flex gap-1.5">
        <div className="flex flex-col items-center pt-0.5">
          <img alt="@camshaw_" src={COMMENT_AUTHOR_AVATAR} className="size-5 shrink-0 rounded-full object-cover" />
          <div className="mt-1 w-px flex-1 bg-[rgba(245,245,245,0.08)]" />
        </div>
        <div className="min-w-0 flex-1 pb-1">
          <div className="flex gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-xs font-medium leading-4 text-[var(--text-base-primary)]">@camshaw_</p>
              <p className="text-xs leading-4 text-[var(--text-glass-primary)] line-clamp-4">{title}</p>
            </div>
            <img alt="" src={COMMENT_PREVIEW_IMAGE} className="h-[103px] w-[72px] shrink-0 rounded object-cover" />
          </div>
          <p className="mt-1 text-xs leading-4 text-[var(--text-glass-primary)]">
            comment to <span className="font-medium text-[var(--text-base-primary)]">@camshaw</span>
          </p>
        </div>
      </div>
      {/* Reply */}
      <div className="flex gap-1.5 pt-1">
        <img alt="" src={COMMENT_REPLY_AVATAR} className="size-5 shrink-0 rounded-full object-cover" />
        <p className="whitespace-pre-line text-xs leading-4 text-[var(--text-glass-primary)]">{body}</p>
      </div>
    </div>
  );
}

function PlainBodyContent({ body }: { body: string }) {
  return (
    <div
      className="min-h-0 flex-1 overflow-hidden text-sm leading-5 text-[var(--text-base-primary)]"
      style={{
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)",
      }}
    >
      <p className="whitespace-pre-line">{body}</p>
    </div>
  );
}

function QuestionContent({ body }: { body: string }) {
  const skeletonWidths = ["82.5%", "58.7%", "40%", "12.5%"];
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <p
        className="text-sm leading-5 text-[var(--text-base-primary)]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {body}
      </p>
      <div className="flex flex-col gap-1">
        {skeletonWidths.map((w, i) => (
          <div key={i} className="h-7 w-full overflow-hidden rounded-lg bg-[var(--backgrounds-neutral-opacity-faint)]">
            <div className="h-full rounded-lg bg-[var(--backgrounds-neutral-opacity-lighter)]" style={{ width: w }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical card                                                      */
/* ------------------------------------------------------------------ */

interface VerticalCardProps {
  type: ActionCtaType;
  state: ActionCtaState;
  title: string;
  dear: string;
  body: string;
  count: number;
  countLabel: string;
  actionLabel: string;
  channelLabel: string;
  className?: string;
  onAction?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  "aria-label"?: string;
}

function VerticalCard(props: VerticalCardProps) {
  const { type, state, title, dear, body, count, countLabel, actionLabel, channelLabel, className, onAction, isLoading, isDisabled } = props;
  const meta = TYPE_META[type];
  const isPinned = state === "pinned";
  const ariaLabel = props["aria-label"];

  /* Background layer per type */
  let background: ReactNode = null;
  if (type === "google-maps") {
    background = (
      <>
        <img
          alt=""
          src={GOOGLE_MAPS_BASEMAP}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Centered blue pulse marker (decorative). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative size-4">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#6393F2] opacity-40 motion-reduce:animate-none" />
            <span className="absolute inset-0 rounded-full bg-[#6393F2] shadow-[0_0_0_4px_rgba(99,147,242,0.2)]" />
          </div>
        </div>
      </>
    );
  }

  /* Google Maps has no body — just header, spacer, CTA */
  if (type === "google-maps") {
    return (
      <CardShell state={state} backgroundLayer={background} radius="32px" className={className}>
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-center gap-2">
            <Chip label={channelLabel || meta.chipLabel} icon={meta.icon} strong />
            {isPinned && (
              <div className="ml-auto flex items-center gap-1 rounded-full bg-[rgba(20,15,20,0.32)] px-2 py-0.5 text-sm leading-5 text-white backdrop-blur-[100px]">
                <Pin size={12} className="shrink-0 animate-action-cta-pin-pulse" />
                <span>pinned</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <GlassButton
              onClick={onAction}
              disabled={isDisabled}
              loading={isLoading}
              aria-label={ariaLabel}
            >
              {actionLabel || meta.actionLabel}
            </GlassButton>
            <span className="truncate rounded-full bg-[rgba(20,15,20,0.32)] px-2 py-0.5 text-xs leading-4 text-white backdrop-blur-[100px]">
              {count} {countLabel || meta.countLabel}
            </span>
          </div>
        </div>
      </CardShell>
    );
  }

  let content: ReactNode;
  if (type === "send-email") {
    content = <EmailContent title={title} dear={dear} body={body} />;
  } else if (type === "instagram") {
    content = <InstagramContent title={title} body={body} />;
  } else if (type === "question") {
    content = <QuestionContent body={body} />;
  } else {
    content = <PlainBodyContent body={body} />;
  }

  return (
    <CardShell state={state} backgroundLayer={background} className={className}>
      <div className="relative flex h-full flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Chip label={channelLabel || meta.chipLabel} icon={meta.icon} />
          {isPinned && <PinnedLabel />}
        </div>

        {/* Content + CTA */}
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <div className="flex min-h-0 flex-1 flex-col">{content}</div>

          <div className="flex flex-col items-center gap-2">
            <GlassButton
              onClick={onAction}
              disabled={isDisabled}
              loading={isLoading}
              aria-label={ariaLabel}
            >
              {actionLabel || meta.actionLabel}
            </GlassButton>
            <span className="truncate text-xs leading-4 text-[var(--text-glass-primary)]">
              {count} {countLabel || meta.countLabel}
            </span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Completed card — dark neutral card with "do again" refresh button  */
/* ------------------------------------------------------------------ */

function CompletedCard(props: ActionCtaCardProps) {
  const { type = "send-email", title, count, countLabel, actionLabel, className, onRedo, isLoading, isDisabled } = props;
  const meta = TYPE_META[type];
  const resolvedTitle = title ?? meta.title;
  const resolvedCount = count ?? meta.count;
  const resolvedCountLabel = countLabel ?? meta.countLabel;
  const resolvedAction = actionLabel ?? "do again";
  const isInactive = isDisabled || isLoading;

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[343px] shrink-0 flex-col gap-3 overflow-hidden",
        "rounded-[var(--radius-6)] border border-[var(--borders-default)]",
        "bg-[var(--backgrounds-neutral-primary-default)] p-3",
        "animate-action-cta-enter",
        className
      )}
    >
      <div className="flex flex-col items-start gap-2">
        {/* Success "completed" chip — icon bumped from success-500 → 400 for AA contrast on dark card. */}
        <div className="inline-flex items-center gap-1 rounded-full bg-[rgba(71,205,137,0.16)] px-1.5 py-0.5 text-xs leading-4 text-[var(--text-base-primary)]">
          <Check
            size={12}
            strokeWidth={2.5}
            className="shrink-0 animate-action-cta-pop-in text-[#75e0a7]"
            aria-hidden="true"
          />
          <span>completed</span>
        </div>
        {resolvedTitle && (
          <p
            className="w-full text-sm font-medium leading-5 text-[var(--text-base-primary)] [overflow-wrap:anywhere]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {resolvedTitle}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-xs leading-4 text-[var(--text-glass-primary)]">
          {resolvedCount} {resolvedCountLabel}
        </span>
        <button
          type="button"
          onClick={isInactive ? undefined : onRedo}
          disabled={isInactive}
          aria-busy={isLoading || undefined}
          aria-label={isLoading ? `${resolvedAction} in progress` : undefined}
          className={cn(
            "group relative flex h-8 min-w-[56px] shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full",
            "bg-[rgba(20,15,20,0.32)] px-2 text-sm font-medium text-[var(--text-base-primary)]",
            "backdrop-blur-[7px] transition-[background-color,opacity,transform] duration-150 ease-out",
            "active:bg-[rgba(20,15,20,0.48)] active:scale-[0.98] motion-reduce:active:scale-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shadow-brand-moderate)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_0_0_0.5px_#a6a6a6]"
          )}
        >
          {isLoading ? (
            <Spinner className="relative" />
          ) : (
            <RefreshCw
              size={14}
              className="relative shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-active:-rotate-180 motion-reduce:transition-none motion-reduce:group-active:rotate-0"
              aria-hidden="true"
            />
          )}
          <span className="relative">{resolvedAction}</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Action type — big counter card                                     */
/* ------------------------------------------------------------------ */

function ActionCounterCard(props: ActionCtaCardProps) {
  const { state = "default", count, actionLabel, className, onAction, isLoading, isDisabled } = props;
  const meta = TYPE_META.action;
  const resolvedCount = count ?? meta.count;
  const resolvedAction = actionLabel ?? meta.actionLabel;
  const isTop = state === "top-supporters";
  const isCompleted = state === "completed";
  const ariaLabel = props["aria-label"];

  return (
    <div
      className={cn(
        "relative flex h-[332px] w-full max-w-[300px] shrink-0 flex-col overflow-hidden",
        "rounded-[var(--radius-7)] border border-[var(--borders-default)]",
        "bg-[rgba(245,245,245,0.06)] backdrop-blur-[50px]",
        "animate-action-cta-enter",
        "transition-[transform,filter] duration-150 ease-out",
        "active:scale-[0.98] active:brightness-95",
        "motion-reduce:active:scale-100 motion-reduce:active:brightness-100",
        className
      )}
    >
      <img alt="" aria-hidden="true" src={COMPLETED_CARD_GRADIENT} className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,15,20,0.08)_0%,rgba(20,15,20,0.2)_100%)]" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <span
            className="text-[56px] font-semibold leading-[1] tracking-[-0.04em] text-[var(--text-base-primary)]"
            style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
          >
            {resolvedCount}
          </span>
          <p className="text-sm leading-5 text-[var(--text-glass-primary)]">
            {isTop ? "of top supporters" : isCompleted ? "of actions completed" : "of supporters"}
          </p>
        </div>
        <GlassButton
          onClick={onAction}
          disabled={isDisabled}
          loading={isLoading}
          aria-label={ariaLabel}
        >
          {resolvedAction}
        </GlassButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component — router                                          */
/* ------------------------------------------------------------------ */

export function ActionCtaCard(props: ActionCtaCardProps) {
  const {
    type = "send-email",
    state = "default",
    title,
    dear,
    body,
    count,
    countLabel,
    actionLabel,
    channelLabel,
    className,
  } = props;

  if (type === "action") {
    return <ActionCounterCard {...props} />;
  }

  if (state === "completed") {
    return <CompletedCard {...props} />;
  }

  const meta = TYPE_META[type];
  return (
    <VerticalCard
      type={type}
      state={state}
      title={title ?? meta.title}
      dear={dear ?? "Dear U.S. Fish & Wildlife Service,"}
      body={body ?? meta.body}
      count={count ?? meta.count}
      countLabel={countLabel ?? meta.countLabel}
      actionLabel={actionLabel ?? meta.actionLabel}
      channelLabel={channelLabel ?? ""}
      className={className}
      onAction={props.onAction}
      isLoading={props.isLoading}
      isDisabled={props.isDisabled}
      aria-label={props["aria-label"]}
    />
  );
}
