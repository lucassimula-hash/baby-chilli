"use client";

import { CampaignCard } from "@/components/ui/campaign-card";

const CAMPAIGN = {
  id: "einar-buyout-fraud",
  image: "/campaign-card/hero-einar-gustafsson.jpg",
  creator: {
    name: "@seaspiracy",
    avatar: "/campaign-card/creator-seaspiracy.png",
    verified: true,
  },
  title: "Tell Einar Gustafsson: Your Buyout Bid Is Now Tied to Catch Fraud",
  body: "",
  supporters: {
    count: 3400,
    avatars: [
      "/campaign-card/supporter-1.png",
      "/campaign-card/supporter-2.png",
      "/campaign-card/supporter-3.png",
    ],
  },
  commentCount: 12,
};

export function CampaignCardDefault() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-default"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
      />
    </div>
  );
}

export function CampaignCardSupporter() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-supporter"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        supporter
        progress={{ done: 2, total: 4 }}
      />
    </div>
  );
}

export function CampaignCardDefaultHover() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-default-hover"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        state="hover"
      />
    </div>
  );
}

export function CampaignCardSupporterHover() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-supporter-hover"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        supporter
        progress={{ done: 2, total: 4 }}
        state="hover"
      />
    </div>
  );
}

export function CampaignCardStart() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-start"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        supporter
        progress={{ done: 0, total: 4 }}
      />
    </div>
  );
}

export function CampaignCardFinish() {
  return (
    <div className="flex justify-center p-4">
      <CampaignCard
        campaignId="demo-finish"
        image={CAMPAIGN.image}
        creator={CAMPAIGN.creator}
        title={CAMPAIGN.title}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        supporter
        progress={{ done: 3, total: 4 }}
      />
    </div>
  );
}

export function CampaignCardMinusDemo() {
  return (
    <div className="flex justify-center gap-3 p-4">
      <CampaignCard
        type="minus"
        campaignId="demo-minus-1"
        image="/campaign-card/mini-1.png"
        creator={CAMPAIGN.creator}
        title="Write to Texas officials: Total is poisoning communities and paying no taxes"
      />
      <CampaignCard
        type="minus"
        campaignId="demo-minus-2"
        image="/campaign-card/mini-2.png"
        creator={CAMPAIGN.creator}
        title="Call to protect coral reefs with the endangered staghorn coral from dredging"
      />
    </div>
  );
}

export function CampaignCardMinusNoLabel() {
  return (
    <div className="flex justify-center gap-3 p-4">
      <CampaignCard
        type="minus"
        campaignId="demo-minus-nolabel-1"
        image="/campaign-card/mini-1.png"
        creator={CAMPAIGN.creator}
        title="Write to Texas officials: Total is poisoning communities"
        hideCreatorLabel
      />
      <CampaignCard
        type="minus"
        campaignId="demo-minus-nolabel-2"
        image="/campaign-card/mini-3.png"
        creator={CAMPAIGN.creator}
        title="Make TotalEnergies pay windfall taxes"
        hideCreatorLabel
      />
    </div>
  );
}
