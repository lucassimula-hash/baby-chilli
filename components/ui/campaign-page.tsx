"use client";

/**
 * CampaignPage — mobile detail view mock (bound to node 4099:98218).
 * Used inside a modal overlay in the docs showcase to demonstrate the
 * shared-element transition from CampaignCard.
 */

import { motion } from "framer-motion";
import { X, ArrowRight, MoreVertical, Heart } from "lucide-react";
import { ActionCtaCard } from "@/components/ui/action-cta-card";
import { Button } from "@/components/ui/button";
import { type CampaignCreator, SHARED_ELEMENT_TRANSITION } from "@/components/ui/campaign-card";
import { AnimatedTitle } from "@/components/ui/animated-title";

export interface CampaignPageProps {
  campaignId: string;
  image: string;
  creator: CampaignCreator & { supporters?: number };
  title: string;
  body: string;
  storyBody: string;
  supportersCount: number;
  onClose?: () => void;
}

function formatSupporterCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-label="Verified" className="shrink-0">
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

export function CampaignPage({
  campaignId,
  image,
  creator,
  title,
  body,
  storyBody,
  supportersCount,
  onClose,
}: CampaignPageProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--backgrounds-base)]">
      {/* Top nav bar — fixed over hero */}
      <div className="absolute left-0 right-0 top-0 z-20 flex h-[110px] shrink-0 items-end justify-between px-4 pb-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-9 items-center justify-center rounded-full bg-[rgba(20,15,20,0.32)] text-white backdrop-blur-[20px] transition-colors active:bg-[rgba(20,15,20,0.48)]"
        >
          <X size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="More"
          className="flex size-9 items-center justify-center rounded-full bg-[rgba(20,15,20,0.32)] text-white backdrop-blur-[20px] transition-colors active:bg-[rgba(20,15,20,0.48)]"
        >
          <MoreVertical size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="relative flex-1 overflow-y-auto">
        {/* Header — hero image bleeds full-width at top */}
        <header className="relative">
          <div className="relative h-[164px] w-full">
            <motion.img
              layoutId={`campaign-${campaignId}-hero`}
              src={image}
              alt=""
              className="absolute inset-0 size-full object-cover"
              transition={SHARED_ELEMENT_TRANSITION}
            />
            {/* Bottom fade-out — image dissolves into the page background (#140f14). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(20,15,20,0)_0%,rgba(20,15,20,0.6)_55%,rgba(20,15,20,1)_100%)]"
            />
          </div>

          {/* Creator avatar — overlaps image bottom */}
          <div className="relative -mt-8 flex flex-col items-center px-4">
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
          </div>

          {/* Title + body */}
          <motion.div
            className="mt-4 flex flex-col items-center gap-2 px-4 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <AnimatedTitle as="h1"
              className="text-2xl font-semibold leading-8 tracking-[-0.5px] text-[var(--text-base-primary)]"
              style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
            >
              {title}
            </AnimatedTitle>
            <p className="text-sm leading-5 text-[var(--text-glass-primary)]">{body}</p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <div className="flex items-center -space-x-1.5">
                {["/campaign-card/supporter-1.png","/campaign-card/supporter-2.png","/campaign-card/supporter-3.png"].map((src, i) => (
                  <img key={i} src={src} alt="" className="size-5 shrink-0 rounded-full border border-[var(--backgrounds-base)] object-cover" />
                ))}
              </div>
              <p className="text-xs leading-4 text-[var(--text-glass-primary)]">
                <strong className="font-medium text-[var(--text-base-primary)]">
                  {formatSupporterCount(supportersCount)}
                </strong>{" "}
                supporters already took action, join us!
              </p>
            </div>
          </motion.div>
        </header>

        {/* "start here" — Action CTA carousel */}
        <motion.section
          className="mt-6 flex flex-col gap-4 px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-semibold leading-7 text-[var(--text-base-primary)]"
              style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
            >
              start here
            </h2>
            <span className="text-xs leading-4 text-[var(--text-glass-primary)]">0 of 4 completed</span>
          </div>
          <div className="-mx-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-3 px-4">
              <div className="w-[300px] shrink-0 snap-start">
                <ActionCtaCard type="send-email" state="default" />
              </div>
              <div className="w-[300px] shrink-0 snap-start">
                <ActionCtaCard type="instagram" state="default" />
              </div>
              <div className="w-[300px] shrink-0 snap-start">
                <ActionCtaCard type="phone-call" state="default" />
              </div>
              <div className="w-[300px] shrink-0 snap-start">
                <ActionCtaCard type="google-maps" state="default" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[var(--borders-default)]" aria-hidden="true" />

        {/* "the story" */}
        <motion.section
          className="mt-6 flex flex-col gap-3 px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
        >
          <h2
            className="text-xl font-semibold leading-7 text-[var(--text-base-primary)]"
            style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
          >
            the story
          </h2>
          <p className="text-sm leading-5 text-[var(--text-glass-primary)]">{storyBody}</p>
        </motion.section>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[var(--borders-default)]" aria-hidden="true" />

        {/* "fund the fight" — simplified */}
        <motion.section
          className="mt-6 flex flex-col gap-4 px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <h2
            className="text-xl font-semibold leading-7 text-[var(--text-base-primary)]"
            style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
          >
            fund the fight
          </h2>
          <div className="flex items-start gap-3">
            <img src={creator.avatar} alt="" className="size-[84px] shrink-0 rounded-full object-cover" />
            <div className="flex flex-col gap-1 pt-4">
              <div className="flex items-center gap-1">
                <span
                  className="text-xl font-semibold leading-7 text-[var(--text-base-primary)]"
                  style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
                >
                  {creator.name.replace("@", "")}
                </span>
                <VerifiedBadge size={20} />
              </div>
              <span className="text-sm leading-5 text-[var(--text-glass-primary)]">
                {(creator.supporters ?? 336).toLocaleString()} supporters
              </span>
            </div>
          </div>
          <p className="text-sm leading-5 text-[var(--text-glass-primary)]">
            We are a tiny team of only 2 people and we do all we can to save the ocean: protect
            corals, deep sea marine ecosystems, captive cetaceans and everything in between. No
            corporate sponsors. No ad money. Just this community.
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm leading-5 text-[var(--text-base-primary)]">
              <span className="font-medium">
                $3,600 <span className="text-[var(--text-glass-primary)]">/ $5,000</span>
              </span>
              <span className="text-[var(--text-glass-primary)]">43 donations</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--backgrounds-neutral-opacity-lighter)]">
              <motion.div
                className="h-full rounded-full bg-[var(--backgrounds-brand-strong-default)]"
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              />
            </div>
          </div>
          {/* CTAs group — 8px gaps per Figma */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm leading-5 text-[var(--text-glass-primary)]">
              <Heart size={16} className="shrink-0 fill-[var(--text-glass-primary)]" aria-hidden="true" />
              <span>
                <strong className="font-medium text-[var(--text-base-primary)]">Emilie_323</strong>{" "}
                donated $10
              </span>
            </div>
            <Button variant="brand" size="md" className="w-full">
              I&apos;ll fund {creator.name}
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              no I&apos;ll donate instead
            </Button>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-[var(--borders-default)]" aria-hidden="true" />

        {/* "about chilli" */}
        <motion.section
          className="mt-6 flex flex-col gap-3 px-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
        >
          <h2
            className="text-xl font-semibold leading-7 text-[var(--text-base-primary)]"
            style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
          >
            about chilli
          </h2>
          <p className="text-sm leading-5 text-[var(--text-glass-primary)]">
            chilli is the platform for people who give a damn. We help trusted impact creators
            organise live collective actions for more climate and social justice. And this is how we
            win — action by action, together.
          </p>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium leading-5 text-[var(--text-base-primary)]"
          >
            <span>learn about chilli</span>
            <ArrowRight size={14} />
          </button>
        </motion.section>

        {/* Brand footer */}
        <motion.div
          className="mt-12 flex justify-center pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 0.56 }}
        >
          <span
            className="text-xl font-semibold tracking-[-0.5px] text-[var(--text-glass-primary)]"
            style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
          >
            chilli.club
          </span>
        </motion.div>
      </div>

      {/* Bottom dock (iOS-style nav) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[80px] items-center justify-center border-t border-[var(--borders-default)] bg-[var(--backgrounds-base)]/80 backdrop-blur-[20px]">
        <div className="flex items-center gap-6">
          {["feed", "search", "profile"].map((tab, i) => (
            <div
              key={tab}
              className={`flex h-10 items-center justify-center rounded-full px-4 text-xs font-medium ${
                i === 0
                  ? "bg-[var(--backgrounds-neutral-opacity-lighter)] text-[var(--text-base-primary)]"
                  : "text-[var(--text-glass-primary)]"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
