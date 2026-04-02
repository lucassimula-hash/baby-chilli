"use client";

import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { AvatarDuo } from "@/components/ui/avatar-duo";
import { AvatarLabel } from "@/components/ui/avatar-label";

const smallSizes = ["xxsm", "xsm", "sm", "md", "lg", "xl"];
const largeSizes = ["2xl", "3xl", "4xl", "5xl"];

export function AvatarSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap items-end gap-3">
        {smallSizes.map((size) => (
          <Avatar
            key={size}
            size={size}
            src={`https://i.pravatar.cc/200?u=${size}`}
            alt="User"
          />
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {largeSizes.map((size) => (
          <Avatar
            key={size}
            size={size}
            src={`https://i.pravatar.cc/200?u=${size}`}
            alt="User"
          />
        ))}
      </div>
    </div>
  );
}

export function AvatarFallbacks() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap items-end gap-3">
        {smallSizes.map((size) => (
          <Avatar key={size} size={size} fallback="L" />
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {largeSizes.map((size) => (
          <Avatar key={size} size={size} fallback="L" />
        ))}
      </div>
    </div>
  );
}

export function AvatarImageError() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar size="lg" src="https://i.pravatar.cc/200" alt="Valid" />
      <Avatar size="lg" src="https://invalid-url.com/nope.jpg" fallback="E" />
      <Avatar size="lg" fallback="AB" />
    </div>
  );
}

export function AvatarGroupDemo() {
  const users = [
    { src: "https://i.pravatar.cc/200?img=1" },
    { src: "https://i.pravatar.cc/200?img=2" },
    { src: "https://i.pravatar.cc/200?img=3" },
    { src: "https://i.pravatar.cc/200?img=4" },
    { src: "https://i.pravatar.cc/200?img=5" },
    { src: "https://i.pravatar.cc/200?img=6" },
    { src: "https://i.pravatar.cc/200?img=7" },
  ];

  return (
    <div className="flex w-full flex-col items-start gap-6">
      <AvatarGroup avatars={users} size="xxsm" />
      <AvatarGroup avatars={users} size="xsm" showAddButton />
      <AvatarGroup avatars={users} size="sm" showAddButton />
      <AvatarGroup avatars={users} size="md" showAddButton />
      <AvatarGroup
        avatars={[
          { src: "https://i.pravatar.cc/200?img=10" },
          { fallback: "AB" },
          { src: "https://i.pravatar.cc/200?img=12" },
          { fallback: "CD" },
          { fallback: "EF" },
        ]}
        size="md"
        max={4}
        showAddButton
      />
    </div>
  );
}

export function AvatarDuoDemo() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <AvatarDuo
        size="xxsm"
        primarySrc="https://i.pravatar.cc/200?img=1"
        secondarySrc="https://i.pravatar.cc/200?img=2"
      />
      <AvatarDuo
        size="xsm"
        primarySrc="https://i.pravatar.cc/200?img=3"
        secondarySrc="https://i.pravatar.cc/200?img=4"
      />
      <AvatarDuo
        size="sm"
        primarySrc="https://i.pravatar.cc/200?img=5"
        secondarySrc="https://i.pravatar.cc/200?img=6"
      />
      <AvatarDuo
        size="md"
        primarySrc="https://i.pravatar.cc/200?img=7"
        secondarySrc="https://i.pravatar.cc/200?img=8"
      />
      <AvatarDuo
        size="lg"
        primarySrc="https://i.pravatar.cc/200?img=9"
        secondarySrc="https://i.pravatar.cc/200?img=10"
      />
      <AvatarDuo
        size="xl"
        primarySrc="https://i.pravatar.cc/200?img=11"
        secondarySrc="https://i.pravatar.cc/200?img=12"
      />
    </div>
  );
}

export function AvatarLabelDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-8">
        <AvatarLabel
          size="sm"
          src="https://i.pravatar.cc/200?img=15"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="md"
          src="https://i.pravatar.cc/200?img=16"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="lg"
          src="https://i.pravatar.cc/200?img=17"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="xl"
          src="https://i.pravatar.cc/200?img=18"
          name="Username"
          supportingText="Supporting text"
        />
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <AvatarLabel
          size="sm"
          fallback="L"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="md"
          fallback="L"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="lg"
          fallback="L"
          name="Username"
          supportingText="Supporting text"
        />
        <AvatarLabel
          size="xl"
          fallback="L"
          name="Username"
          supportingText="Supporting text"
        />
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <AvatarLabel
          size="md"
          src="https://i.pravatar.cc/200?img=20"
          name="Username only"
        />
        <AvatarLabel size="lg" fallback="A" name="No subtitle" />
      </div>
    </div>
  );
}
