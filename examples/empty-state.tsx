import { Badge, Button, IconButton, ThinkingIndicator } from "../index";
import { Plus, RefreshCw } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

type LooseComponent = ComponentType<Record<string, unknown> & { children?: ReactNode }>;

const PublicBadge = Badge as unknown as LooseComponent;
const PublicButton = Button as unknown as LooseComponent;
const PublicIconButton = IconButton as unknown as LooseComponent;
const PublicThinkingIndicator = ThinkingIndicator as unknown as LooseComponent;

export function EmptyStateExample() {
  return (
    <section className="flex w-full max-w-[375px] flex-col items-center gap-[var(--space-6)] rounded-[var(--radius-7)] border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-[var(--space-8)] text-center">
      <PublicBadge label="No actions yet" type="fill" size="md" />

      <div className="flex flex-col items-center gap-[var(--space-3)]">
        <PublicThinkingIndicator />
        <h2 className="text-[var(--font-size-xl)] leading-[var(--line-height-xl)] font-semibold text-[var(--text-base-primary)]">
          Create the first action
        </h2>
        <p className="max-w-[280px] text-[var(--font-size-sm)] leading-[var(--line-height-sm)] text-[var(--text-base-secondary)]">
          Add one clear task supporters can complete in a few minutes.
        </p>
      </div>

      <div className="flex items-center gap-[var(--space-3)]">
        <PublicButton variant="brand" leftIcon={Plus}>
          Add action
        </PublicButton>
        <PublicIconButton icon={RefreshCw} variant="secondary" aria-label="Refresh actions" />
      </div>
    </section>
  );
}
