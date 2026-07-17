import {
  ActionCtaCard,
  AvatarGroup,
  Button,
  CampaignCard,
  PageNavigation,
  ProgressBar,
} from "../index";
import type { ComponentType, ReactNode } from "react";

type LooseComponent = ComponentType<Record<string, unknown> & { children?: ReactNode }>;

const PublicAvatarGroup = AvatarGroup as unknown as LooseComponent;
const PublicButton = Button as unknown as LooseComponent;
const PublicPageNavigation = PageNavigation as unknown as LooseComponent;
const PublicProgressBar = ProgressBar as unknown as LooseComponent;

export function CampaignPageExample() {
  return (
    <main className="flex w-full max-w-[375px] flex-col gap-[var(--space-6)] bg-[var(--backgrounds-base)] pb-[var(--space-8)]">
      <PublicPageNavigation title="Campaign" variant="mobile" />

      <section className="px-[var(--space-6)]">
        <CampaignCard
          campaignId="protect-ocean"
          image="/campaign-card/hero-thailand.png"
          creator={{
            name: "@seaspiracy",
            avatar: "/campaign-card/creator-seaspiracy.png",
            verified: true,
          }}
          title="Protect marine reserves before the next vote"
          body="Supporters are asking officials to keep the strongest protections in place."
          supporter
          progress={{ done: 2, total: 4 }}
        />
      </section>

      <section className="flex flex-col gap-[var(--space-4)] px-[var(--space-6)]">
        <div className="flex items-center justify-between gap-[var(--space-4)]">
          <PublicAvatarGroup
            avatars={[
              { src: "/campaign-card/avatar-1.png", alt: "Supporter 1" },
              { src: "/campaign-card/avatar-2.png", alt: "Supporter 2" },
              { src: "/campaign-card/avatar-3.png", alt: "Supporter 3" },
            ]}
            max={3}
            size="sm"
          />
          <span className="text-[var(--font-size-sm)] leading-[var(--line-height-sm)] text-[var(--text-base-secondary)]">
            3.4k supporters
          </span>
        </div>
        <PublicProgressBar value={50} segments={4} labelPosition="right" />
      </section>

      <section className="flex flex-col gap-[var(--space-4)] px-[var(--space-6)]">
        <ActionCtaCard
          type="send-email"
          state="default"
          title="Email the ministry"
          actionLabel="send email"
        />
        <ActionCtaCard
          type="google-maps"
          state="completed"
          title="Leave a public review"
        />
      </section>

      <div className="px-[var(--space-6)]">
        <PublicButton variant="brand" size="lg" className="w-full">
          Continue action
        </PublicButton>
      </div>
    </main>
  );
}
