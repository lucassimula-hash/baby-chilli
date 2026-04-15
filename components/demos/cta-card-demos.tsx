"use client";

import { useState } from "react";
import { CtaCard, type CtaCardProps, type CtaCardType } from "@/components/ui/cta-card";
import { BreakpointSwitch } from "@/components/ui/breakpoint-switch";

type CardDemoProps = {
  type: CtaCardType;
  title: string;
  body?: string;
  statCount: number;
  completedStatCount?: number;
  imageSrc?: string;
  backgroundSrc?: string;
};

function CtaCardShowcase({
  type,
  title,
  body,
  statCount,
  completedStatCount,
  imageSrc,
  backgroundSrc,
}: CardDemoProps) {
  const [view, setView] = useState<CtaCardProps["breakpoint"]>("mobile");

  return (
    <div className="flex w-full flex-col gap-4">
      <BreakpointSwitch value={view} onChange={setView} />
      <div className="flex flex-col items-start gap-4 transition-all duration-300">
        <CtaCard
          type={type}
          title={title}
          body={body}
          statCount={statCount}
          imageSrc={imageSrc}
          backgroundSrc={backgroundSrc}
          breakpoint={view}
        />
        <CtaCard
          type={type}
          title={title}
          body={body}
          statCount={completedStatCount ?? statCount + 1}
          imageSrc={imageSrc}
          backgroundSrc={backgroundSrc}
          breakpoint={view}
          completed
        />
      </div>
    </div>
  );
}

export function CtaCardEmail() {
  return (
    <CtaCardShowcase
      type="email"
      title="Chubb's Role in Safeguarding Endangered Species"
      body={`Dear Mr. Greenberg and Chubb Leadership,
In light of recent decisions by the U.S. government to waive protections for Gulf of Mexico oil and gas operations, I am reaching out to discuss Chubb's potential influence on environmental stewardship. As a leading fossil fuel insurer, Chubb is in a unique position to advocate for the protection of vulnerable species such as the Rice's whale, which is critically endangered with less than 50 individuals remaining.`}
      statCount={53}
      completedStatCount={54}
    />
  );
}

export function CtaCardComment() {
  return (
    <CtaCardShowcase
      type="comment"
      title="@americanseafoods deep-sea mining threatens the health and supply of the fish..."
      statCount={142}
      completedStatCount={143}
      imageSrc="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop"
    />
  );
}

export function CtaCardQuestion() {
  return (
    <CtaCardShowcase
      type="question"
      title="Why do you think most of the young people despite their active participation in Advocacy, they are left out in global discussions and major opportunities..."
      statCount={412}
    />
  );
}

export function CtaCardPhoneCall() {
  return (
    <CtaCardShowcase
      type="phone-call"
      title="My name is [Name] from [City, State]. I'm calling because the EPA voted on March 31 to exempt all Gulf of Mexico oil and gas operations from the Endangered Species Act..."
      statCount={41}
    />
  );
}

export function CtaCardExternalLink() {
  return (
    <CtaCardShowcase
      type="external-link"
      title="I am submitting these comments during the scoping period for the Bureau of Land Management's environmental assessment of the pro..."
      statCount={142}
      completedStatCount={143}
    />
  );
}

export function CtaCardGoogleMaps() {
  return (
    <CtaCardShowcase
      type="google-maps"
      title="CHILLI WORKS FOR ICE"
      body="This is Nameless. We don't work for factories. We started up out of this with no factories..."
      statCount={143}
    />
  );
}
