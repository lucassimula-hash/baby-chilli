"use client";

import { CampaignShowcase } from "@/components/showcase/campaign-showcase";

export default function CampaignShowcasePage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Campaign showcase
        </h1>
        <p className="mt-2 text-base leading-relaxed text-[var(--text-base-secondary)]">
          Mobile (iOS) preview of the campaign feed + detail page. Tap the CampaignCard
          to open the detail — the hero image morphs into the page banner using a
          framer-motion shared-element transition.
        </p>
      </header>

      <CampaignShowcase />
    </article>
  );
}
