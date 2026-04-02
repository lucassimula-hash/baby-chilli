"use client";

import { Save } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function TooltipBasic() {
  return <div className="flex items-center justify-center py-12">{<Tooltip content="This is a tooltip">{<Button variant="secondary">Hover me</Button>}</Tooltip>}</div>;
}
export function TooltipPlacement() {
  return <div className="flex items-center justify-center gap-4 py-12 flex-wrap">{<Tooltip content="Top tooltip" side="top">{<Button variant="secondary" size="sm">Top</Button>}</Tooltip>}{<Tooltip content="Right tooltip" side="right">{<Button variant="secondary" size="sm">Right</Button>}</Tooltip>}{<Tooltip content="Bottom tooltip" side="bottom">{<Button variant="secondary" size="sm">Bottom</Button>}</Tooltip>}{<Tooltip content="Left tooltip" side="left">{<Button variant="secondary" size="sm">Left</Button>}</Tooltip>}</div>;
}
export function TooltipRichContent() {
  return <div className="flex items-center justify-center py-12">{<Tooltip content={<div className="flex flex-col gap-1">{<span className="font-medium">Save document</span>}{<span className="text-xs opacity-70">Ctrl + S</span>}</div>}>{<Button variant="brand">{<Save size={16} className="mr-2" />}Save</Button>}</Tooltip>}</div>;
}
export function TooltipDelay() {
  return <div className="flex items-center justify-center gap-4 py-12">{<Tooltip content="No delay" delayDuration={0}>{<Button variant="secondary" size="sm">No delay</Button>}</Tooltip>}{<Tooltip content="500ms delay" delayDuration={500}>{<Button variant="secondary" size="sm">500ms delay</Button>}</Tooltip>}</div>;
}