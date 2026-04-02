"use client";

import { Globe } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { CauseChip, CAUSE_COLORS } from "@/components/ui/cause-chip";

export function ChipDefault() {
  return <div className="flex flex-wrap items-center gap-3">{<Chip size="sm" label="Small" />}{<Chip size="md" label="Medium" />}{<Chip size="lg" label="Large" />}{<Chip size="xl" label="Extra Large" />}</div>;
}
export function ChipAvatar() {
  return <div className="flex flex-wrap items-center gap-3">{<Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=1" size="sm" label="Alice" />}{<Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=2" size="md" label="Bob" />}{<Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=3" size="lg" label="Charlie" />}{<Chip variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=4" size="xl" label="Diana" />}</div>;
}
export function ChipSocial() {
  return <div className="flex flex-wrap items-center gap-3">{<Chip variant="social" socialIcon={<Globe size={16} />} size="sm" label="Globe" />}{<Chip variant="social" socialIcon={<Globe size={16} />} size="md" label="Globe" />}{<Chip variant="social" socialIcon={<Globe size={20} />} size="lg" label="Globe" />}{<Chip variant="social" socialIcon={<Globe size={20} />} size="xl" label="Globe" />}</div>;
}
export function ChipTypes() {
  return <div className="flex flex-wrap items-center gap-3">{<Chip type="fill" label="Fill" />}{<Chip type="light" label="Light" />}{<Chip type="fill" variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=5" label="Fill Avatar" />}{<Chip type="light" variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=6" label="Light Avatar" />}</div>;
}
export function ChipRemovable() {
  return <div className="flex flex-wrap items-center gap-3">{<Chip label="React" onRemove={() => {}} />}{<Chip label="TypeScript" onRemove={() => {}} />}{<Chip label="Tailwind" type="light" onRemove={() => {}} />}{<Chip label="Figma" variant="avatar" avatarSrc="https://i.pravatar.cc/40?u=7" onRemove={() => {}} />}</div>;
}
export function CauseChipColors() {
  return <div className="flex flex-wrap gap-2">{CAUSE_COLORS.map(color => <CauseChip color={color} label={color.replace(/-/g, " ")} />)}</div>;
}
export function CauseChipSizes() {
  return <div className="flex items-center gap-3">{<CauseChip color="purple" size="xs" label="Extra Small" />}{<CauseChip color="purple" size="md" label="Medium" />}{<CauseChip color="purple" size="lg" label="Large" />}</div>;
}
export function CauseChipGlass() {
  return <div className="relative w-full overflow-hidden rounded-2xl">{<div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #5b247a 75%, #1de9b6 100%)"
    }} />}{<div className="absolute inset-0 bg-black/20" />}{<div className="relative flex flex-wrap gap-2 p-12">{<CauseChip color="neon-pink" type="glass" label="Neon Pink" />}{<CauseChip color="blue" type="glass" label="Blue" />}{<CauseChip color="caribbean-green" type="glass" label="Caribbean Green" />}{<CauseChip color="purple" type="glass" label="Purple" />}{<CauseChip color="yellow" type="glass" label="Yellow" />}{<CauseChip color="red" type="glass" label="Red" />}</div>}</div>;
}