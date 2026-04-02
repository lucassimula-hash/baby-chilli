"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/code-block";

// Action Navigation demos
import { ActionNavigationDemo, ActionNavigationStates, ActionNavigationWithButton } from "@/components/demos/action-navigation-demos";
// Badge demos
import { BadgeDefault, BadgeSizes, BadgeWithDot, BadgeWithIcons } from "@/components/demos/badge-demos";
// Action Input demos
import { ActionInputDefault, ActionInputStates, ActionInputWithToggle, ActionInputWithAvatar } from "@/components/demos/action-input-demos";
// Accordion demos
import { AccordionDefault, AccordionSingle, AccordionMultiple } from "@/components/demos/accordion-demos";
// ActionTextArea demos
import { ActionTextAreaDefault, ActionTextAreaStates, ActionTextAreaGlass } from "@/components/demos/action-textarea-demos";
// ActionFormTitle demos
import { FormTitleDefault, FormTitleStates } from "@/components/demos/form-title-demos";
// Avatar demos
import { AvatarSizes, AvatarFallbacks, AvatarImageError, AvatarGroupDemo, AvatarDuoDemo, AvatarLabelDemo } from "@/components/demos/avatar-demos";
// Chip demos
import { ChipDefault, ChipAvatar, ChipSocial, ChipTypes, ChipRemovable } from "@/components/demos/chip-demos";
// Button demos
import { ButtonVariants, ButtonSizes, ButtonWithIcons, ButtonLoading, ButtonGlass } from "@/components/demos/button-demos";
// Checkbox demos
import { CheckboxDefault, CheckboxSizes, CheckboxStates, CheckboxWithTextDemo } from "@/components/demos/checkbox-demos";
// Date Picker demos
import { DatePickerDefault, DatePickerInteractive, DatePickerMinMax } from "@/components/demos/date-picker-demos";
// Select Date Picker demos
import { SelectDatePickerDefault, SelectDatePickerFocused, SelectDatePickerWithHelper, SelectDatePickerInteractive } from "@/components/demos/select-date-picker-demos";
// Dropdown demos
import { DropdownSmall, DropdownMedium, DropdownLarge } from "@/components/demos/dropdown-demos";
// Icon Button demos
import { IconButtonVariants, IconButtonSizes, IconButtonGlass, IconButtonStates } from "@/components/demos/icon-button-demos";
// Input demos
import { InputFieldDemo, ActionInputDemo, CauseInputDemo, FormTitleDemo, NumberInputDemo } from "@/components/demos/input-demos";
// Number Input demos
import { NumberInputDefault, NumberInputStates, NumberInputLength } from "@/components/demos/number-input-demos";
// Page Navigation demos
import { PageNavigationDemo, PageNavigationStates, PageNavigationCustomActions } from "@/components/demos/page-navigation-demos";
// Radio demos
import { RadioDefault, RadioSizes, RadioStates, RadioHorizontal, RadioWithTextDemo } from "@/components/demos/radio-demos";
// Search Bar demos
import { SearchBarDefault, SearchBarStates } from "@/components/demos/search-bar-demos";
// Select demos
import { SelectBasic, SelectWithIcons, SelectAvatar, SelectBorderless } from "@/components/demos/select-demos";
// Tabs demos
import { TabsUnderline, TabsPill, TabsSegmented, TabsSizes } from "@/components/demos/tabs-demos";
// Toggle demos
import { ToggleDefault, ToggleSizes, ToggleStates, ToggleWithLabel } from "@/components/demos/toggle-demos";
// Tooltip demos
import { TooltipBasic, TooltipPlacement, TooltipRichContent, TooltipDelay } from "@/components/demos/tooltip-demos";
// Progress Bar demos
import { ProgressBarDefault, ProgressBarSizes, ProgressBarWithLabel, ProgressBarInteractive } from "@/components/demos/progress-bar-demos";
// TextArea demos
import { TextAreaDefault, TextAreaStates, TextAreaWithAI } from "@/components/demos/textarea-demos";
// Thinking Indicator demos
import { ThinkingDefault, ThinkingCustom } from "@/components/demos/thinking-indicator-demos";

const DEMO_MAP: Record<string, React.ReactNode> = {
  // Action Navigation
  "action-navigation-default": <ActionNavigationDemo />,
  "action-navigation-states": <ActionNavigationStates />,
  "action-navigation-button": <ActionNavigationWithButton />,
  // Accordion
  "accordion-default": <AccordionDefault />,
  "accordion-single": <AccordionSingle />,
  "accordion-multiple": <AccordionMultiple />,
  // ActionTextArea
  "action-textarea-default": <ActionTextAreaDefault />,
  "action-textarea-states": <ActionTextAreaStates />,
  "action-textarea-glass": <ActionTextAreaGlass />,
  // ActionFormTitle
  "form-title-default": <FormTitleDefault />,
  "form-title-states": <FormTitleStates />,
  // Action Input
  "action-input-default": <ActionInputDefault />,
  "action-input-states": <ActionInputStates />,
  "action-input-toggle": <ActionInputWithToggle />,
  "action-input-avatar": <ActionInputWithAvatar />,
  // Badge
  "badge-default": <BadgeDefault />,
  "badge-sizes": <BadgeSizes />,
  "badge-dot": <BadgeWithDot />,
  "badge-icons": <BadgeWithIcons />,
  // Avatar
  "avatar-sizes": <AvatarSizes />,
  "avatar-fallbacks": <AvatarFallbacks />,
  "avatar-image-error": <AvatarImageError />,
  "avatar-group-default": <AvatarGroupDemo />,
  "avatar-duo-default": <AvatarDuoDemo />,
  "avatar-label-default": <AvatarLabelDemo />,
  // Chip
  "chip-default": <ChipDefault />,
  "chip-types": <ChipTypes />,
  "chip-avatar": <ChipAvatar />,
  "chip-social": <ChipSocial />,
  "chip-removable": <ChipRemovable />,
  // Button
  "button-variants": <ButtonVariants />,
  "button-sizes": <ButtonSizes />,
  "button-icons": <ButtonWithIcons />,
  "button-loading": <ButtonLoading />,
  "button-glass": <ButtonGlass />,
  // Checkbox
  "checkbox-default": <CheckboxDefault />,
  "checkbox-sizes": <CheckboxSizes />,
  "checkbox-states": <CheckboxStates />,
  "checkbox-text": <CheckboxWithTextDemo />,
  // Date Picker
  "datepicker-default": <DatePickerDefault />,
  "datepicker-range": <DatePickerInteractive />,
  "datepicker-minmax": <DatePickerMinMax />,
  // Select Date Picker
  "select-date-picker-default": <SelectDatePickerDefault />,
  "select-date-picker-focused": <SelectDatePickerFocused />,
  "select-date-picker-helper": <SelectDatePickerWithHelper />,
  "select-date-picker-interactive": <SelectDatePickerInteractive />,
  // Dropdown
  "dropdown-default": <DropdownSmall />,
  "dropdown-medium": <DropdownMedium />,
  "dropdown-large": <DropdownLarge />,
  // Icon Button
  "icon-button-variants": <IconButtonVariants />,
  "icon-button-sizes": <IconButtonSizes />,
  "icon-button-glass": <IconButtonGlass />,
  "icon-button-states": <IconButtonStates />,
  // Input
  "input-default": <InputFieldDemo />,
  "input-action": <ActionInputDemo />,
  "input-cause": <CauseInputDemo />,
  "input-formtitle": <FormTitleDemo />,
  "input-number": <NumberInputDemo />,
  // Number Input
  "number-input-default": <NumberInputDefault />,
  "number-input-states": <NumberInputStates />,
  "number-input-length": <NumberInputLength />,
  // Page Navigation
  "page-navigation-default": <PageNavigationDemo />,
  "page-navigation-states": <PageNavigationStates />,
  "page-navigation-custom": <PageNavigationCustomActions />,
  // Radio
  "radio-default": <RadioDefault />,
  "radio-sizes": <RadioSizes />,
  "radio-states": <RadioStates />,
  "radio-text": <RadioWithTextDemo />,
  "radio-horizontal": <RadioHorizontal />,
  // Search Bar
  "search-bar-default": <SearchBarDefault />,
  "search-bar-states": <SearchBarStates />,
  // Select
  "select-default": <SelectBasic />,
  "select-icons": <SelectWithIcons />,
  "select-avatar": <SelectAvatar />,
  "select-borderless": <SelectBorderless />,
  // Tabs
  "tabs-default": <TabsUnderline />,
  "tabs-pill": <TabsPill />,
  "tabs-segmented": <TabsSegmented />,
  "tabs-sizes": <TabsSizes />,
  // Toggle / Switch
  "switch-default": <ToggleDefault />,
  "switch-sizes": <ToggleSizes />,
  "switch-states": <ToggleStates />,
  "switch-label": <ToggleWithLabel />,
  // Tooltip
  "tooltip-default": <TooltipBasic />,
  "tooltip-placement": <TooltipPlacement />,
  "tooltip-rich": <TooltipRichContent />,
  "tooltip-delay": <TooltipDelay />,
  // Slider / Progress Bar
  "slider-default": <ProgressBarDefault />,
  "slider-sizes": <ProgressBarSizes />,
  "slider-label": <ProgressBarWithLabel />,
  "slider-interactive": <ProgressBarInteractive />,
  // TextArea
  "textarea-default": <TextAreaDefault />,
  "textarea-states": <TextAreaStates />,
  "textarea-ai": <TextAreaWithAI />,
  // Thinking Indicator
  "thinking-default": <ThinkingDefault />,
  "thinking-custom": <ThinkingCustom />,
};

export function ComponentPreview({
  title,
  componentName,
  demoCode,
  demoKey,
}: {
  title: string;
  componentName: string;
  demoCode: string;
  demoKey: string;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const liveDemo = demoKey ? DEMO_MAP[demoKey] : null;

  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--borders-default)]">
      <div className="flex items-center gap-0 border-b border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)]">
        <button
          onClick={() => setTab("preview")}
          className={cn(
            "px-4 py-2.5 text-[13px] font-medium transition-colors",
            tab === "preview"
              ? "text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)]"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setTab("code")}
          className={cn(
            "px-4 py-2.5 text-[13px] font-medium transition-colors",
            tab === "code"
              ? "text-[var(--text-base-primary)]"
              : "text-[var(--text-base-secondary)] hover:text-[var(--text-base-primary)]"
          )}
        >
          Code
        </button>
      </div>

      {tab === "preview" ? (
        <div className="flex min-h-[200px] items-center justify-center p-8">
          {liveDemo || (
            <div className="flex flex-col items-center gap-2 text-[var(--text-base-secondary)]">
              <p className="text-sm font-medium">Component preview</p>
              <p className="text-xs opacity-70">
                Add your <code className="rounded bg-[var(--backgrounds-neutral-secondary-default)] px-1 py-0.5 font-mono text-[var(--text-base-primary)]">{componentName}</code> component here
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="[&>div]:rounded-none [&>div]:border-0">
          <CodeBlock code={demoCode} />
        </div>
      )}
    </div>
  );
}
