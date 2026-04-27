"use client";

import { HeaderApp } from "@/components/ui/header-app";
import { ChilliLogo } from "@/components/ui/chilli-logo";

const FRAME =
  "border border-[var(--borders-default)] rounded-xl overflow-hidden bg-[var(--backgrounds-base)] w-[375px] mx-auto";

const AVATAR = "https://i.pravatar.cc/128?img=33";

export function HeaderAppHome() {
  return (
    <div className={FRAME}>
      <HeaderApp type="home" logo={<ChilliLogo type="symbol" size={32} />} avatarSrc={AVATAR} />
    </div>
  );
}

export function HeaderAppHomeNoDot() {
  return (
    <div className={FRAME}>
      <HeaderApp
        type="home"
        logo={<ChilliLogo type="symbol" size={32} />}
        avatarSrc={AVATAR}
        hasNotificationDot={false}
      />
    </div>
  );
}

export function HeaderAppSearch() {
  return (
    <div className={FRAME}>
      <HeaderApp type="search" />
    </div>
  );
}

export function HeaderAppNotification() {
  return (
    <div className={FRAME}>
      <HeaderApp type="notification" title="notifications" />
    </div>
  );
}

export function HeaderAppProfile() {
  return (
    <div className={FRAME}>
      <HeaderApp type="profile" title="@seaspiracy" />
    </div>
  );
}

export function HeaderAppProfileNoSettings() {
  return (
    <div className={FRAME}>
      <HeaderApp type="profile" title="@seaspiracy" showSettings={false} />
    </div>
  );
}

export function HeaderAppAllTypes() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderAppHome />
      <HeaderAppSearch />
      <HeaderAppNotification />
      <HeaderAppProfile />
    </div>
  );
}
