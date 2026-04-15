"use client";

import { CampaignCard } from "@/components/ui/campaign-card";

const CAMPAIGN = {
  id: "save-marine-monument",
  image: "/campaign-card/hero-thailand.png",
  creator: {
    name: "@seaspiracy",
    avatar: "/campaign-card/creator-seaspiracy.png",
    verified: true,
  },
  title: "Tell Thailand's Energy Ministry: Renewables needed amid Hormuz Crisis",
  body: "Trump wants to rollback the protections for the Northeast Canyons & Seamounts Marine National Monument. We have to stop him!",
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
        body={CAMPAIGN.body}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        sectionLabel="new from creator you like"
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
        body={CAMPAIGN.body}
        supporters={CAMPAIGN.supporters}
        commentCount={CAMPAIGN.commentCount}
        sectionLabel="new from creator you like"
        supporter
        progress={{ done: 2, total: 4 }}
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
        body={CAMPAIGN.body}
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
        body={CAMPAIGN.body}
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
