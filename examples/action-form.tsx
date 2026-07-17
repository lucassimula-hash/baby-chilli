import {
  ActionInput,
  ActionNavigation,
  ActionTextArea,
  Button,
  FormTitle,
  SelectDatePicker,
  Toggle,
} from "../index";
import type { ComponentType, ReactNode } from "react";

type LooseComponent = ComponentType<Record<string, unknown> & { children?: ReactNode }>;

const PublicActionInput = ActionInput as unknown as LooseComponent;
const PublicButton = Button as unknown as LooseComponent;
const PublicFormTitle = FormTitle as unknown as LooseComponent;
const PublicToggle = Toggle as unknown as LooseComponent;

export function ActionFormExample() {
  return (
    <form className="flex w-full max-w-[375px] flex-col gap-[var(--space-6)] bg-[var(--backgrounds-base)] p-[var(--space-6)]">
      <ActionNavigation title="New action" showButton buttonLabel="save" />

      <PublicFormTitle placeholder="Action title" />

      <PublicActionInput
        label="Target"
        placeholder="@energyministry"
        helperText="Use the public account or contact handle."
      />

      <ActionTextArea
        prompt="What should supporters say?"
        placeholder="Write a short message supporters can personalize."
      />

      <SelectDatePicker
        startDate="Jul 17"
        endDate="Jul 24"
        helperText="Keep urgent actions short."
        showHelperText
      />

      <div className="flex items-center justify-between rounded-[var(--radius-6)] bg-[var(--backgrounds-neutral-secondary-default)] p-[var(--space-5)]">
        <div>
          <p className="text-[var(--font-size-sm)] leading-[var(--line-height-sm)] font-medium text-[var(--text-base-primary)]">
            Pin action
          </p>
          <p className="text-[var(--font-size-xs)] leading-[var(--line-height-xs)] text-[var(--text-base-secondary)]">
            Keep it visible at the top of the campaign.
          </p>
        </div>
        <PublicToggle checked size="md" />
      </div>

      <PublicButton variant="brand" size="lg">
        Create action
      </PublicButton>
    </form>
  );
}
