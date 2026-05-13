"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronRight, ArrowRight, Home, Compass, User } from "lucide-react";
import { CampaignCard, SHARED_ELEMENT_TRANSITION } from "@/components/ui/campaign-card";
import { CampaignPage } from "@/components/ui/campaign-page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SEASPIRACY = {
  name: "@seaspiracy",
  avatar: "/campaign-card/creator-seaspiracy.png",
  verified: true,
  supporters: 336,
};

const SUPPORTERS = [
  "/campaign-card/supporter-1.png",
  "/campaign-card/supporter-2.png",
  "/campaign-card/supporter-3.png",
];

const CELINA = {
  name: "@celina_chen",
  avatar: "/campaign-card/creator-celina.png",
  verified: false,
};

const HERO = "/campaign-card/hero-thailand.png";
const STORY_BODY =
  "This is more than a monument — it's a legacy carved in stone. The US Marine Monument represents courage, history, and the voices of those who came before us. But today, it's at risk of being damaged, removed, or forgotten. Once it's gone, it's gone for good. People are already…";

/* ------------------------------------------------------------------ */

export function CampaignShowcase() {
  const [openCampaignId, setOpenCampaignId] = useState<string | null>(null);

  return (
    <div className="flex justify-center py-10">
      {/* iOS device frame 375×812 */}
      <div
        className="relative overflow-hidden rounded-[44px] border border-[var(--borders-default)] bg-[var(--backgrounds-base)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{ width: 375, height: 812 }}
      >
        <FeedView onOpen={(id) => setOpenCampaignId(id)} />
        <Dock />

        {/* Campaign detail overlay */}
        <AnimatePresence>
          {openCampaignId && (
            <motion.div
              key="campaign-overlay"
              className="absolute inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SHARED_ELEMENT_TRANSITION}
            >
              <CampaignPage
                campaignId={openCampaignId}
                image={HERO}
                creator={SEASPIRACY}
                title="Save US Marine Monument"
                body="Trump wants to rollback the protections for the Northeast Canyons & Seamounts Marine National Monument. We have to stop him!"
                storyBody={STORY_BODY}
                supportersCount={2000}
                onClose={() => setOpenCampaignId(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home indicator */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-1 w-[134px] -translate-x-1/2 rounded-full bg-[var(--text-base-primary)] opacity-50" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feed layout                                                        */
/* ------------------------------------------------------------------ */

function FeedView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="absolute inset-0 overflow-y-auto">
      <MobileHeader />

      <div className="flex flex-col gap-8 pt-4">
        {/* First campaign — fresh */}
        <section className="px-4">
          <CampaignCard
            campaignId="save-marine-1"
            image={HERO}
            creator={SEASPIRACY}
            title="Tell Thailand's Energy Ministry: Renewables needed amid Hormuz Crisis"
            body="Trump wants to rollback the protections for the Northeast Canyons & Seamounts Marine National Monument."
            supporters={{ count: 3400, avatars: SUPPORTERS }}
            commentCount={12}
            sectionLabel="new from creator you like"
            onOpen={() => onOpen("save-marine-1")}
            onCta={() => onOpen("save-marine-1")}
          />
        </section>

        {/* "more from @celina_chen" — Campaign minus carousel */}
        <MoreFromSection
          creator={CELINA}
          items={[
            { id: "total-tx", image: "/campaign-card/mini-1.png", title: "Write to Texas officials: Total is poisoning communities and paying no taxes" },
            { id: "staghorn", image: "/campaign-card/mini-2.png", title: "Call to protect coral reefs with the endangered staghorn coral from dredging" },
            { id: "total-fr", image: "/campaign-card/mini-3.png", title: "Write to the American Embassy in France: make TotalEnergies pay windfall taxes" },
          ]}
        />

        {/* Second campaign — supporter in progress */}
        <section className="px-4">
          <CampaignCard
            campaignId="save-marine-2"
            image={HERO}
            creator={SEASPIRACY}
            title="Save US Marine Monument"
            body="Trump wants to rollback the protections for the Northeast Canyons & Seamounts Marine National Monument."
            supporters={{ count: 3400, avatars: SUPPORTERS }}
            commentCount={12}
            supporter
            progress={{ done: 2, total: 4 }}
            onOpen={() => onOpen("save-marine-2")}
            onCta={() => onOpen("save-marine-2")}
          />
        </section>

        {/* Trending creators */}

        {/* Third campaign */}
        <section className="px-4">
          <CampaignCard
            campaignId="total-fr"
            image="/campaign-card/mini-3.png"
            creator={CELINA}
            title="Write to Texas officials: Total is poisoning communities and paying"
            body="TotalEnergies must pay windfall taxes to support French households."
            supporters={{ count: 2100, avatars: SUPPORTERS }}
            commentCount={24}
            supporter
            progress={{ done: 3, total: 4 }}
            onOpen={() => onOpen("total-fr")}
            onCta={() => onOpen("total-fr")}
          />
        </section>

        {/* Creators you might like */}
        <CreatorsYouMightLike />

        {/* End state */}
        <EndState />

        {/* Space for dock */}
        <div className="h-[136px]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileHeader — StatusBar (iOS) + App header (title + bell)         */
/*  Bound to Figma node 4209:399721 (Mobile header).                   */
/* ------------------------------------------------------------------ */

function MobileHeader() {
  return (
    <div className="sticky top-0 z-30 flex flex-col bg-[var(--backgrounds-base)]/90 backdrop-blur-[20px]">
      <IOSStatusBar />
      <div className="flex items-center justify-between py-2 pl-4 pr-3">
        {/* Title — Headings/display/semibold (32/40, -1px) per Figma */}
        <h1
          className="text-[32px] font-semibold leading-10 tracking-[-1px] text-[var(--text-base-primary)]"
          style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
        >
          feed
        </h1>
        {/* Icon nav button — 40×40 with notification dot */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 shrink-0 items-center justify-center rounded-full text-[var(--text-base-primary)] transition-colors active:bg-[var(--backgrounds-neutral-opacity-lighter)]"
        >
          <Bell size={20} aria-hidden="true" />
          {/* Unread dot — brand strong #ff4beb */}
          <span
            aria-hidden="true"
            className="absolute right-[7px] top-2 size-2 rounded-full border border-[var(--borders-default)] bg-[var(--backgrounds-brand-strong-default)]"
          />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  iOS Status Bar — accurate iPhone 14/15 shape                       */
/* ------------------------------------------------------------------ */

function IOSStatusBar() {
  return (
    <div className="flex h-[54px] w-full items-center justify-between px-6 text-[var(--text-base-primary)]">
      {/* Time */}
      <span
        className="text-[17px] font-semibold leading-[22px] tracking-[-0.2px]"
        style={{ fontFamily: "'SF Pro Display', var(--font-family-primary), sans-serif", fontVariationSettings: "'wdth' 100" }}
      >
        9:41
      </span>

      {/* Right cluster: cellular, wifi, battery */}
      <div className="flex items-center gap-[5px]">
        {/* Cellular (4 bars, ascending) */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden="true">
          <rect x="0.5" y="7.5" width="3" height="3" rx="0.5" />
          <rect x="4.75" y="5.5" width="3" height="5" rx="0.5" />
          <rect x="9" y="3" width="3" height="7.5" rx="0.5" />
          <rect x="13.25" y="0.5" width="3" height="10" rx="0.5" />
        </svg>

        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
          <path
            d="M8 10.5c-.7 0-1.3-.6-1.3-1.3S7.3 7.9 8 7.9s1.3.6 1.3 1.3S8.7 10.5 8 10.5Zm3.6-3.7c-.2 0-.4-.1-.6-.2A4.5 4.5 0 0 0 8 5.4c-1.2 0-2.3.4-3.1 1.2-.3.3-.8.2-1.1-.1s-.2-.8.1-1A6 6 0 0 1 8 3.9c1.6 0 3.1.6 4.2 1.6.3.3.3.8 0 1.1-.1.2-.3.2-.6.2Zm2.7-2.6c-.2 0-.4-.1-.6-.2A7.7 7.7 0 0 0 8 2.1 7.7 7.7 0 0 0 2.2 4c-.3.2-.8.2-1-.1-.3-.3-.3-.8 0-1.1A9.2 9.2 0 0 1 8 .6c2.6 0 5 .9 6.8 2.4.3.3.3.8 0 1.1-.1.1-.3.1-.5.1Z"
            fill="currentColor"
          />
        </svg>

        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill="currentColor" />
          <path d="M24 4.3v4.4c.8-.3 1.3-1.2 1.3-2.2S24.8 4.6 24 4.3Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  "more from @celina_chen" carousel                                  */
/* ------------------------------------------------------------------ */

function MoreFromSection({
  creator,
  items,
}: {
  creator: { name: string; avatar: string };
  items: { id: string; image: string; title: string }[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-4">
        <img src={creator.avatar} alt="" className="size-12 shrink-0 rounded-full object-cover" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm leading-5 text-[var(--text-base-secondary)]">more from</span>
          <div className="flex items-center gap-1">
            <span
              className="text-xl font-semibold leading-7 tracking-[-0.4px] text-[var(--text-base-primary)]"
              style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
            >
              {creator.name}
            </span>
            <ChevronRight size={20} className="shrink-0 text-[var(--text-base-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-3 px-4">
          {items.map((item) => (
            <div key={item.id} className="snap-start">
              <CampaignCard
                type="minus"
                campaignId={item.id}
                image={item.image}
                creator={creator as { name: string; avatar: string; verified?: boolean }}
                title={item.title}
                hideCreatorLabel
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  "creators you might like" — avatar grid                            */
/* ------------------------------------------------------------------ */

function CreatorsYouMightLike() {
  const avatars = [
    { id: "u1", avatar: "/campaign-card/avatar-1.png", name: "@_outinsight" },
    { id: "u2", avatar: "/campaign-card/avatar-2.png", name: "@niangelin" },
    { id: "u3", avatar: "/campaign-card/avatar-3.png", name: "@nowworlx" },
    { id: "u4", avatar: "/campaign-card/avatar-4.png", name: "@carriers615" },
    { id: "u5", avatar: "/campaign-card/avatar-5.png", name: "@itsclaudes" },
    { id: "u6", avatar: "/campaign-card/avatar-6.png", name: "@tomriegan" },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-4">
        <h2
          className="text-xl font-semibold leading-7 tracking-[-0.4px] text-[var(--text-base-primary)]"
          style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
        >
          creators you might like
        </h2>
        <Button variant="ghost" size="xsm">
          see more
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 px-4">
        {avatars.map((a) => (
          <button
            key={a.id}
            type="button"
            className="flex flex-col items-center gap-1 transition-transform duration-150 active:scale-[0.95]"
          >
            <img src={a.avatar} alt="" className="size-[100px] rounded-full object-cover" />
            <span className="truncate text-xs leading-4 text-[var(--text-base-secondary)]">{a.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  End state                                                          */
/* ------------------------------------------------------------------ */

function EndState() {
  return (
    <section className="flex flex-col items-center gap-4 px-4 text-center">
      <div className="flex flex-col items-center gap-1">
        <h3
          className="text-base font-semibold leading-6 text-[var(--text-base-primary)]"
          style={{ fontFamily: "var(--font-family-primary), sans-serif" }}
        >
          no more actions here, yet
        </h3>
        <p className="text-sm leading-5 text-[var(--text-base-secondary)]">
          Discover more actions by exploring content from creators or joining causes!
        </p>
      </div>
      <Button variant="secondary" size="md" rightIcon={ArrowRight}>
        explore
      </Button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dock                                                               */
/* ------------------------------------------------------------------ */

function Dock() {
  const tabs = [
    { icon: Home, label: "feed", active: true },
    { icon: Compass, label: "discover", active: false },
    { icon: Bell, label: "inbox", active: false },
    { icon: User, label: "profile", active: false },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex h-[80px] items-start justify-around border-t border-[var(--borders-default)] bg-[var(--backgrounds-base)]/85 px-4 pt-2 backdrop-blur-[20px]">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={cn(
            "flex flex-1 flex-col items-center gap-0.5 py-1 text-xs font-medium transition-colors",
            tab.active
              ? "text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)] active:text-[var(--text-base-primary)]"
          )}
        >
          <tab.icon size={22} aria-hidden="true" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
