"use client";

import { useState } from "react";
import { Users, Clock, Star, Share2, Lock } from "lucide-react";
import { Select } from "@/components/ui/select";

const creatorOptions = [{
  value: "all",
  label: "All creators"
}, {
  value: "john",
  label: "john_doe"
}, {
  value: "jane",
  label: "jane_smith"
}, {
  value: "alex",
  label: "alex_design"
}, {
  value: "maria",
  label: "maria_dev"
}];
const categoryOptions = [{
  value: "teamspaces",
  label: "Teamspaces",
  icon: Users
}, {
  value: "recents",
  label: "Recents",
  icon: Clock
}, {
  value: "favorites",
  label: "Favorites",
  icon: Star
}, {
  value: "shared",
  label: "Shared",
  icon: Share2
}, {
  value: "private",
  label: "Private",
  icon: Lock
}];
export function SelectBasic() {
  const [value, setValue] = useState();
  return <div className="flex items-start gap-4 flex-wrap">{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" size="sm" />}{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" size="md" />}</div>;
}
export function SelectWithIcons() {
  const [value, setValue] = useState("favorites");
  return <div className="flex items-start gap-4 flex-wrap">{<Select options={categoryOptions} value={value} onChange={setValue} placeholder="Category" size="sm" />}{<Select options={categoryOptions} value={value} onChange={setValue} placeholder="Category" size="md" />}</div>;
}
export function SelectAvatar() {
  const [value, setValue] = useState("jane");
  return <div className="flex items-start gap-4 flex-wrap">{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" variant="avatar" avatarSrc="https://i.pravatar.cc/40" size="sm" />}{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" variant="avatar" avatarSrc="https://i.pravatar.cc/40" size="md" />}</div>;
}
export function SelectBorderless() {
  const [value, setValue] = useState();
  return <div className="flex items-start gap-4 flex-wrap">{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" variant="borderless" size="sm" />}{<Select options={creatorOptions} value={value} onChange={setValue} placeholder="creator" variant="borderless" size="md" />}</div>;
}