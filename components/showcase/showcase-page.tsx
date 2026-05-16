"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Compass,
  Settings,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Tabs } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { AccordionGroup, AccordionItem } from "@/components/ui/accordion";
import { Dropdown, MenuItem } from "@/components/ui/dropdown";
import { SearchBar } from "@/components/ui/search-bar";
import { ThinkingIndicator } from "@/components/ui/thinking-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageHeader } from "@/components/docs/page-header";
import { cn } from "@/lib/utils";

const TAB_ITEMS = [
  { label: "Overview", value: "overview" },
  { label: "States", value: "states" },
  { label: "Code", value: "code" },
];

const ACCORDION_ITEMS = [
  { value: "one", title: "One", body: "First section" },
  { value: "two", title: "Two", body: "Second section" },
  { value: "three", title: "Three", body: "Third section" },
];

const DROPDOWN_ITEMS = [
  "List item",
  "List item",
  "List item",
  "List item",
  "List item",
];

export function ShowcasePage() {
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [tone, setTone] = useState("direct");
  const [enabled, setEnabled] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(2);

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        currentSlug="showcase"
        title="Showcase"
        subtitle="Components, states, and patterns in one place."
      />

      <div className="space-y-14">
        <ShowcaseSection title="Core controls">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            <ShowcaseTile className="lg:col-span-7" label="Button" minHeight="190px">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button leftIcon={Compass}>Primary</Button>
                <Button variant="secondary" rightIcon={ArrowRight}>
                  Secondary
                </Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-5" label="Icon button" minHeight="190px">
              <div className="flex items-center justify-center gap-3">
                <IconButton variant="secondary" icon={ArrowLeft} aria-label="Back" />
                <IconButton variant="secondary" icon={Settings} aria-label="Settings" />
                <IconButton variant="transparent" icon={ChevronRight} aria-label="Forward" />
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-6" label="Input" minHeight="220px">
              <div className="mx-auto w-full max-w-[360px]">
                <Input
                  label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  leftIcon={<Search size={20} />}
                  clearable
                  onClear={() => setQuery("")}
                />
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-6" label="Chat box" minHeight="220px">
              <div className="mx-auto w-full max-w-[420px]">
                <TextArea label="Message" placeholder="Write something" rows={4} />
              </div>
            </ShowcaseTile>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Selection patterns">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            <ShowcaseTile className="lg:col-span-7" label="Tabs" minHeight="320px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[360px] flex-col gap-5 pt-2">
                <Tabs
                  items={TAB_ITEMS}
                  value={tab}
                  onValueChange={setTab}
                  type="segmented"
                  size="md"
                />
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-5" label="Dropdown" minHeight="360px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[300px] flex-col gap-4 pt-2">
                <Dropdown checkedIndex={dropdownIndex} size="md" className="w-full">
                  {DROPDOWN_ITEMS.map((label, index) => (
                    <MenuItem
                      key={`${label}-${index}`}
                      icon={Plus}
                      label={label}
                      index={index}
                      onSelect={() => setDropdownIndex(index)}
                    />
                  ))}
                </Dropdown>
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-5" label="Switch" minHeight="360px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[280px] flex-col gap-4 pt-3">
                <Toggle
                  size="md"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  label="Enabled"
                  description="Main actions are available."
                  className="w-full"
                />
                <Toggle
                  size="md"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  label="Notifications"
                  description="Pings when someone replies."
                  className="w-full"
                />
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-7" label="Radio" minHeight="360px" labelAlign="left">
              <div className="mx-auto w-full max-w-[300px] pt-2">
                <RadioGroup value={tone} onValueChange={setTone} className="gap-3 pt-1">
                  <Radio value="direct" label="Direct" description="Clear and immediate." />
                  <Radio value="soft" label="Soft" description="Warm and quiet." />
                  <Radio value="bold" label="Bold" description="Sharp and assertive." />
                  <Radio value="calm" label="Calm" description="Soft and steady." />
                  <Radio value="confident" label="Confident" description="Strong and precise." />
                </RadioGroup>
              </div>
            </ShowcaseTile>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Signals and disclosure">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
            <ShowcaseTile className="lg:col-span-4" label="Search" minHeight="240px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 pt-3">
                <SearchBar
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onClear={() => setQuery("")}
                  placeholder="Search components"
                />
              </div>
            </ShowcaseTile>

            <ShowcaseTile
              className="lg:col-span-4"
              label="Thinking indicator"
              minHeight="240px"
              labelAlign="left"
            >
              <div className="mx-auto flex w-full max-w-[260px] flex-col gap-4 pt-3">
                <ThinkingIndicator words={["Thinking", "Checking", "Ready"]} interval={2600} />
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-4" label="Progress bar" minHeight="240px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4 pt-3">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[var(--text-base-primary)]">Draft</p>
                    <ProgressBar value={24} segments={6} size="md" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[var(--text-base-primary)]">Publish</p>
                    <ProgressBar value={88} segments={6} size="md" />
                  </div>
                </div>
              </div>
            </ShowcaseTile>

            <ShowcaseTile className="lg:col-span-12" label="Accordion" minHeight="360px" labelAlign="left">
              <div className="mx-auto flex w-full max-w-[680px] flex-col gap-4 pt-3">
                <AccordionGroup type="single" defaultValue="one" className="gap-3 w-full">
                  {ACCORDION_ITEMS.map((item) => (
                    <AccordionItem
                      key={item.value}
                      value={item.value}
                      title={item.title}
                      defaultOpen={item.value === "one"}
                    >
                      {item.body}
                    </AccordionItem>
                  ))}
                </AccordionGroup>
              </div>
            </ShowcaseTile>
          </div>
        </ShowcaseSection>
      </div>
    </article>
  );
}

function ShowcaseSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <p className="text-[12px] font-medium tracking-wide text-[var(--text-base-secondary)]">
        {title}
      </p>
      {children}
    </section>
  );
}

function ShowcaseTile({
  label,
  className,
  children,
  minHeight = "220px",
  labelAlign = "left",
}: {
  label: string;
  className?: string;
  children: ReactNode;
  minHeight?: string;
  labelAlign?: "left" | "center";
}) {
  return (
    <motion.section
      whileHover={{ scale: 1.002 }}
      whileTap={{ scale: 0.999 }}
      className={cn(
        "group overflow-hidden rounded-[16px] border border-[var(--borders-default)] transition-colors duration-200 hover:bg-[var(--backgrounds-neutral-secondary-default)]/10",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center px-6 py-6 md:px-8 md:py-8"
        )}
        style={{ minHeight }}
      >
        <div className="flex w-full justify-center">{children}</div>
      </div>

      <div
        className={cn(
          "border-t border-[var(--borders-default)] px-5 py-3",
          labelAlign === "center" ? "text-center" : "text-left"
        )}
      >
        <p className="text-[13px] font-medium text-[var(--text-base-secondary)]">
          {label}
        </p>
      </div>
    </motion.section>
  );
}
