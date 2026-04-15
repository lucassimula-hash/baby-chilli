"use client";

import { SupportCreatorCard } from "@/components/ui/support-creator-card";

const CLIMATE = {
  username: "ClimateChe",
  avatar: "/support-creator/climate-che.png",
  actions: 230,
  supporters: "2.1k",
};

export function SupportCreatorCardDefault() {
  return (
    <div className="flex justify-center p-4">
      <SupportCreatorCard {...CLIMATE} />
    </div>
  );
}

export function SupportCreatorCardGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      <SupportCreatorCard username="ClimateChe" avatar={CLIMATE.avatar} actions={230} supporters="2.1k" />
      <SupportCreatorCard username="oceanrise" avatar={CLIMATE.avatar} actions={84} supporters={512} />
      <SupportCreatorCard username="verdant" avatar={CLIMATE.avatar} actions={1200} supporters="3.4k" />
    </div>
  );
}

export function SupportCreatorCardLargeCounts() {
  return (
    <div className="flex justify-center p-4">
      <SupportCreatorCard
        username="ClimateChe"
        avatar={CLIMATE.avatar}
        actions="12k"
        supporters="1.2M"
      />
    </div>
  );
}
