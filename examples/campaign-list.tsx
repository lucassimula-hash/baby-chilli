import { Button, CampaignCard } from "../index";
import type { ComponentType, ReactNode } from "react";

type LooseComponent = ComponentType<Record<string, unknown> & { children?: ReactNode }>;

const PublicButton = Button as unknown as LooseComponent;
const PublicCampaignCard = CampaignCard as unknown as LooseComponent;

const campaigns = [
  {
    id: "renewables-thailand",
    title: "Tell Thailand's Energy Ministry: Renewables needed amid Hormuz Crisis",
    body: "Ask decision makers to protect communities and accelerate clean energy.",
    image: "/campaign-card/hero-thailand.png",
    creator: {
      name: "@seaspiracy",
      avatar: "/campaign-card/creator-seaspiracy.png",
      verified: true,
    },
  },
  {
    id: "clean-river",
    title: "Ask local officials to protect the river before the next permit vote",
    body: "A short public message can help keep pressure on the permitting process.",
    image: "/campaign-card/mini-1.png",
    creator: {
      name: "@celina_chen",
      avatar: "/campaign-card/creator-celina.png",
      verified: false,
    },
  },
];

export function CampaignListExample() {
  return (
    <section className="flex w-full max-w-[375px] flex-col gap-[var(--space-6)] bg-[var(--backgrounds-base)] p-[var(--space-6)]">
      <div className="flex items-center justify-between gap-[var(--space-4)]">
        <div>
          <h2 className="text-[var(--font-size-xl)] leading-[var(--line-height-xl)] font-semibold text-[var(--text-base-primary)]">
            New actions
          </h2>
          <p className="text-[var(--font-size-sm)] leading-[var(--line-height-sm)] text-[var(--text-base-secondary)]">
            Campaigns from creators you follow.
          </p>
        </div>
        <PublicButton size="sm" variant="secondary">
          View all
        </PublicButton>
      </div>

      {campaigns.map((campaign) => (
        <PublicCampaignCard
          key={campaign.id}
          campaignId={campaign.id}
          image={campaign.image}
          creator={campaign.creator}
          title={campaign.title}
          body={campaign.body}
          supporters={{
            count: 3400,
            avatars: [
              "/campaign-card/avatar-1.png",
              "/campaign-card/avatar-2.png",
              "/campaign-card/avatar-3.png",
            ],
          }}
          commentCount={12}
        />
      ))}
    </section>
  );
}
