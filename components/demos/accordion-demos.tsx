"use client";

import { AccordionGroup, AccordionItem } from "@/components/ui/accordion";

const faqContent =
  "Install the component and import it into your project. The accordion supports both single and multiple expand modes.";

export function AccordionDefault() {
  return (
    <div className="w-full max-w-[343px]">
      <AccordionItem title="Question title" defaultOpen>
        {faqContent}
      </AccordionItem>
    </div>
  );
}

export function AccordionSingle() {
  return (
    <div className="w-full max-w-[343px]">
      <AccordionGroup type="single" defaultValue="q1">
        <AccordionItem value="q1" title="What is Chilli?">
          Chilli is a design system built for modern web applications with a focus on consistency and developer experience.
        </AccordionItem>
        <AccordionItem value="q2" title="How do I install it?">
          {faqContent}
        </AccordionItem>
        <AccordionItem value="q3" title="Can I customize the theme?">
          Yes, all colors and tokens are defined as CSS custom properties that you can override in your project.
        </AccordionItem>
      </AccordionGroup>
    </div>
  );
}

export function AccordionMultiple() {
  return (
    <div className="w-full max-w-[343px]">
      <AccordionGroup type="multiple" defaultValue={["q1", "q3"]}>
        <AccordionItem value="q1" title="Single expand mode">
          Only one item can be open at a time. Opening a new item closes the previous one.
        </AccordionItem>
        <AccordionItem value="q2" title="Multiple expand mode">
          Multiple items can be open simultaneously. Each item toggles independently.
        </AccordionItem>
        <AccordionItem value="q3" title="Standalone mode">
          An accordion item can also be used standalone without a group, managing its own open state.
        </AccordionItem>
      </AccordionGroup>
    </div>
  );
}
