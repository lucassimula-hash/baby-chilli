"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { Check, ExternalLink, FileText, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardCanvas } from "@/components/ui/animated-glow-card";
import { FlagIcon } from "@/components/ui/flag-icon";

export type CtaCardType = "email" | "comment" | "external-link" | "google-maps" | "question" | "phone-call";
type CtaCardBreakpoint = "mobile" | "desktop";

type CtaConfig = {
  icon: ElementType;
  label: string;
  completedLabel: string;
  statLabel: string;
  defaultHeight: number;
  desktopHeight?: number;
  tone: "email" | "glow" | "comment" | "external-link" | "google-maps";
};

const CTA_CONFIG: Record<CtaCardType, CtaConfig> = {
  email: {
    icon: Send,
    label: "send email",
    completedLabel: "email sent",
    statLabel: "sent",
    defaultHeight: 200,
    tone: "email",
  },
  comment: {
    icon: MessageCircle,
    label: "comment",
    completedLabel: "posted",
    statLabel: "comments",
    defaultHeight: 178,
    desktopHeight: 200,
    tone: "comment",
  },
  "external-link": {
    icon: ExternalLink,
    label: "open link",
    completedLabel: "completed",
    statLabel: "completed",
    defaultHeight: 178,
    tone: "external-link",
  },
  "google-maps": {
    icon: MapPin,
    label: "Google Maps",
    completedLabel: "completed",
    statLabel: "completed",
    defaultHeight: 178,
    tone: "google-maps",
  },
  question: {
    icon: FileText,
    label: "reply",
    completedLabel: "completed",
    statLabel: "replies",
    defaultHeight: 200,
    tone: "glow",
  },
  "phone-call": {
    icon: Phone,
    label: "call",
    completedLabel: "called",
    statLabel: "called",
    defaultHeight: 200,
    tone: "glow",
  },
};

const FLAG_STACK = ["US", "FR", "CA"] as const;

const MAP_GRID_STYLE: CSSProperties = {
  backgroundImage: [
    "linear-gradient(to right, rgba(245,245,245,0.05) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(245,245,245,0.05) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "24px 24px",
};

const EMAIL_COPY_FADE_STYLE: CSSProperties = {
  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0.6) 82%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0.6) 82%, transparent 100%)",
};

function CtaButton({
  icon: Icon,
  label,
  completed = false,
  onClick,
}: {
  icon: ElementType;
  label: string;
  completed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-8 min-w-[56px] shrink-0 items-center gap-0 overflow-hidden rounded-full px-2",
        "border border-[var(--borders-glass-lighter)]",
        "shadow-[0_0_1px_0_rgba(0,0,0,0.10)]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full backdrop-blur-[14px]",
          completed ? "bg-[rgba(23,178,106,0.13)]" : "bg-[var(--backgrounds-neutral-opacity-medium)]",
        )}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_0.5px_#a6a6a6]"
      />
      <Icon size={16} className="relative shrink-0 text-[var(--color-white)]" />
      <span className="relative px-1 text-sm font-medium leading-5 whitespace-nowrap text-[var(--color-white)]">
        {label}
      </span>
    </button>
  );
}

function CountryFlags() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {FLAG_STACK.map((flag, index) => (
          <div
            key={flag}
            className={cn(
              "flex size-4 items-center justify-center rounded-full border border-[var(--color-neutral-900)] bg-[var(--color-neutral-900)]",
              index !== FLAG_STACK.length - 1 && "-mr-[10px]",
            )}
          >
            <FlagIcon code={flag} size={16} alt={`${flag} flag`} />
          </div>
        ))}
      </div>
      <span className="text-xs leading-4 text-[var(--color-opacity-neutral-800)]">+3</span>
    </div>
  );
}

function DecorBadge({
  icon: Icon,
}: {
  icon: ElementType;
}) {
  return (
    <div className="absolute right-3 top-3 z-[1] flex size-7 items-center justify-center rounded-xl border border-[var(--borders-glass-lighter)] bg-[var(--backgrounds-neutral-opacity-faint)] backdrop-blur-[14px] shadow-[0_0_1px_0_rgba(0,0,0,0.10)]">
      <Icon size={14} className="text-[var(--color-white)]" />
    </div>
  );
}

function CtaCardBackground({
  tone,
  completed,
  backgroundSrc,
  backgroundClassName,
  backgroundDecoration,
}: {
  tone: CtaConfig["tone"];
  completed: boolean;
  backgroundSrc?: string;
  backgroundClassName?: string;
  backgroundDecoration?: ReactNode;
}) {
  if (completed) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", backgroundClassName)}>
        <div className="absolute inset-0 bg-[rgba(23,178,106,0.08)]" />
        <div className="absolute -bottom-12 -right-10 size-40 rounded-full bg-[var(--backgrounds-success-strong-default)] opacity-15 blur-[64px]" />
        {backgroundDecoration}
      </div>
    );
  }

  if (tone === "email") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", backgroundClassName)}>
        <div className="absolute inset-0 bg-[var(--color-neutral-900)]" />

        <CardCanvas className="absolute inset-0 rounded-[inherit]">
          <Card className="absolute inset-0 rounded-[inherit]">
            <div className="absolute inset-0 bg-[var(--color-neutral-900)]" />
            <div className="absolute inset-[1px] rounded-[calc(var(--radius-7)-1px)] bg-[var(--color-neutral-900)]" />

            {backgroundSrc && (
              <img
                alt=""
                src={backgroundSrc}
                className="absolute inset-0 size-full object-cover opacity-45"
              />
            )}

            {backgroundDecoration}
          </Card>
        </CardCanvas>
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-[inherit]", backgroundClassName)}>
      <div className="absolute inset-0 bg-[var(--backgrounds-neutral-primary-default)]" />

      {tone === "comment" && (
        <>
          <div className="absolute inset-0 bg-[var(--backgrounds-other-ultra-blue-strong)] opacity-28" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--backgrounds-neutral-primary-default)] to-transparent" />
          <div className="absolute -bottom-14 left-8 size-[120px] rounded-full bg-[var(--backgrounds-brand-strong-default)] opacity-45 blur-[54px]" />
          <div className="absolute -top-12 right-0 size-[128px] rounded-full bg-[var(--backgrounds-other-ultra-blue-strong)] opacity-35 blur-[56px]" />
        </>
      )}

      {tone === "external-link" && (
        <>
          <div className="absolute inset-0 bg-[var(--backgrounds-other-caribbean-green-strong)] opacity-[0.14]" />
          <div className="absolute -top-10 right-0 size-[136px] rounded-full bg-[var(--backgrounds-other-caribbean-green-strong)] opacity-35 blur-[54px]" />
          <div className="absolute bottom-[-44px] left-[-20px] size-[132px] rounded-full bg-[var(--backgrounds-other-lime-green-strong)] opacity-20 blur-[64px]" />
        </>
      )}

      {tone === "google-maps" && (
        <>
          <div className="absolute inset-0 opacity-25" style={MAP_GRID_STYLE} />
          <div className="absolute inset-0 bg-[var(--backgrounds-other-caribbean-green-strong)] opacity-[0.08]" />
          <div className="absolute -bottom-12 right-8 size-[148px] rounded-full bg-[var(--backgrounds-other-caribbean-green-strong)] opacity-20 blur-[64px]" />
        </>
      )}

      {backgroundSrc && (
        <img
          alt=""
          src={backgroundSrc}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,15,20,0)_0%,rgba(20,15,20,0.34)_100%)]" />
      {backgroundDecoration}
    </div>
  );
}

export interface CtaCardProps {
  type: CtaCardType;
  title: string;
  body?: string;
  completed?: boolean;
  statCount?: number;
  imageSrc?: string;
  backgroundSrc?: string;
  breakpoint?: CtaCardBreakpoint;
  className?: string;
  backgroundClassName?: string;
  backgroundDecoration?: ReactNode;
  onClick?: () => void;
}

export function CtaCard({
  type,
  title,
  body,
  completed = false,
  statCount = 0,
  imageSrc,
  backgroundSrc,
  breakpoint = "mobile",
  className,
  backgroundClassName,
  backgroundDecoration,
  onClick,
}: CtaCardProps) {
  const config = CTA_CONFIG[type];
  const isDesktop = breakpoint === "desktop";
  const isEmail = type === "email";
  const showCommentMedia = type === "comment" && !!imageSrc;
  const isCompact = type === "external-link" || type === "google-maps";
  const cardHeight = isDesktop ? config.desktopHeight ?? config.defaultHeight : config.defaultHeight;
  const contentPaddingClass = isDesktop ? "p-4" : "p-3";
  const cardWidthClass = isDesktop ? "w-[470px]" : "w-[343px]";
  const titleClampClass = isEmail
    ? "line-clamp-1"
    : body
      ? "line-clamp-1"
      : isDesktop
        ? "line-clamp-5"
        : "line-clamp-4";
  const bodyClampClass = isDesktop ? "line-clamp-4" : "line-clamp-3";
  const ctaGapClass = isDesktop ? "gap-2" : "gap-1";
  const mediaWidthClass = isDesktop ? "w-[142px]" : "w-[117px]";
  const toneBadgeIcon = type === "external-link" ? ExternalLink : type === "google-maps" ? MapPin : null;
  const showEmailFade = isEmail && !completed && Boolean(body);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-7)]",
        cardWidthClass,
        completed && "border border-[var(--borders-default)]",
        className,
      )}
      style={{ height: cardHeight }}
    >
      <CtaCardBackground
        tone={config.tone}
        completed={completed}
        backgroundSrc={backgroundSrc}
        backgroundClassName={backgroundClassName}
        backgroundDecoration={backgroundDecoration}
      />

      {!completed && config.tone !== "email" && (
        <div className="absolute inset-0 rounded-[inherit] border border-[var(--borders-divider)]" />
      )}
      {toneBadgeIcon && !completed && <DecorBadge icon={toneBadgeIcon} />}

      <div className={cn("relative z-[1] flex h-full flex-col", contentPaddingClass)}>
        <div className={cn("flex min-h-0 flex-1 items-start", showCommentMedia ? (isDesktop ? "gap-4" : "gap-3") : "gap-3")}>
          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <CountryFlags />

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <p className={cn("text-sm font-medium leading-5 text-[var(--color-white)]", titleClampClass)}>
                {title}
              </p>

              {body && (
                <p
                  className={cn(
                    "mt-0.5 text-sm leading-5 text-[var(--color-opacity-neutral-800)]",
                    isEmail ? "whitespace-pre-line" : bodyClampClass,
                  )}
                  style={showEmailFade ? EMAIL_COPY_FADE_STYLE : undefined}
                >
                  {body}
                </p>
              )}
            </div>
          </div>

          {showCommentMedia && (
            <div className={cn("h-full shrink-0 overflow-hidden rounded-[var(--radius-5)]", mediaWidthClass)}>
              <img alt="" src={imageSrc} className="size-full object-cover" />
            </div>
          )}
        </div>

        <div className={cn("relative mt-auto flex items-center pt-0", ctaGapClass, isCompact && !showCommentMedia && "pr-8")}>
          <CtaButton
            icon={completed ? Check : config.icon}
            label={completed ? config.completedLabel : config.label}
            completed={completed}
            onClick={completed ? undefined : onClick}
          />

          <span className="text-xs leading-4 text-[var(--color-opacity-neutral-800)]">
            {statCount} {config.statLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

CtaCard.displayName = "CtaCard";
