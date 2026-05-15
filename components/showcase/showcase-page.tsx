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
import { DatePicker } from "@/components/ui/date-picker";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { AccordionGroup, AccordionItem } from "@/components/ui/accordion";
import { Dropdown, MenuItem } from "@/components/ui/dropdown";
import { PageHeader } from "@/components/docs/page-header";
import { cn } from "@/lib/utils";

const TAB_ITEMS = [
  { label: "Overview", value: "overview" },
  { label: "States", value: "states" },
  { label: "Code", value: "code" },
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tone, setTone] = useState("direct");
  const [enabled, setEnabled] = useState(true);
  const [dropdownIndex, setDropdownIndex] = useState(2);

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        currentSlug="showcase"
        title="Showcase"
        subtitle="Components, states, and patterns in one place."
      />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
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

        <ShowcaseTile className="lg:col-span-4" label="Tabs" minHeight="160px">
          <div className="mx-auto w-full max-w-[280px]">
            <Tabs items={TAB_ITEMS} value={tab} onValueChange={setTab} type="segmented" size="md" />
          </div>
        </ShowcaseTile>

        <ShowcaseTile className="lg:col-span-8" label="Dropdown" minHeight="160px">
          <div className="mx-auto w-full max-w-[260px]">
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

        <ShowcaseTile className="lg:col-span-5" label="Switch" minHeight="160px">
          <div className="mx-auto flex w-full max-w-[220px] justify-center">
            <Toggle
              size="md"
              checked={enabled}
              onCheckedChange={setEnabled}
              label="Enabled"
            />
          </div>
        </ShowcaseTile>

        <ShowcaseTile className="lg:col-span-7" label="Date picker" minHeight="460px">
          <div className="mx-auto w-full max-w-[360px]">
            <DatePicker value={date} onChange={setDate} />
          </div>
        </ShowcaseTile>

        <ShowcaseTile className="lg:col-span-7" label="Radio" minHeight="460px" labelAlign="left">
          <div className="mx-auto w-full max-w-[280px]">
            <RadioGroup value={tone} onValueChange={setTone} className="gap-3 pt-1">
              <Radio value="direct" label="Direct" description="Clear and immediate." />
              <Radio value="soft" label="Soft" description="Warm and quiet." />
              <Radio value="bold" label="Bold" description="Sharp and assertive." />
              <Radio value="calm" label="Calm" description="Soft and steady." />
              <Radio value="confident" label="Confident" description="Strong and precise." />
            </RadioGroup>
          </div>
        </ShowcaseTile>

        <ShowcaseTile className="lg:col-span-5" label="Accordion" minHeight="460px" labelAlign="left">
          <div className="mx-auto w-full max-w-2xl">
            <AccordionGroup type="single" defaultValue="one" className="gap-3 w-full">
              <AccordionItem value="one" title="One" defaultOpen>
                First section
              </AccordionItem>
              <AccordionItem value="two" title="Two">
                Second section
              </AccordionItem>
              <AccordionItem value="three" title="Three">
                Third section
              </AccordionItem>
            </AccordionGroup>
          </div>
        </ShowcaseTile>
      </section>
    </article>
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
      whileHover={{ scale: 1.004 }}
      whileTap={{ scale: 0.998 }}
      className={cn(
        "group overflow-hidden rounded-[16px] border border-[var(--borders-default)] transition-colors duration-200 hover:border-[var(--text-base-secondary)]",
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
          "border-t border-[var(--borders-default)] px-5 py-3 transition-colors duration-200 group-hover:bg-[var(--backgrounds-neutral-secondary-default)]/40",
          labelAlign === "center" ? "text-center" : "text-left"
        )}
      >
        <p className="text-[13px] font-medium text-[var(--text-base-secondary)] transition-colors duration-200 group-hover:text-[var(--text-base-primary)]">
          {label}
        </p>
      </div>
    </motion.section>
  );
}
