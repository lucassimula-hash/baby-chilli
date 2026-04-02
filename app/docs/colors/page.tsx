"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Token data                                                         */
/* ------------------------------------------------------------------ */

interface ColorToken {
  name: string;
  variable: string;
  description?: string;
}

const backgrounds: ColorToken[] = [
  { name: "backgrounds-base", variable: "--backgrounds-base", description: "Default page background" },
  { name: "backgrounds-elevated", variable: "--backgrounds-elevated", description: "Elevated surfaces like cards and modals" },
  { name: "backgrounds-neutral-primary-default", variable: "--backgrounds-neutral-primary-default", description: "Primary neutral surface" },
  { name: "backgrounds-neutral-primary-hover", variable: "--backgrounds-neutral-primary-hover", description: "Hover state for primary neutral" },
  { name: "backgrounds-neutral-primary-pressed", variable: "--backgrounds-neutral-primary-pressed", description: "Pressed state for primary neutral" },
  { name: "backgrounds-neutral-secondary-default", variable: "--backgrounds-neutral-secondary-default", description: "Secondary neutral surface" },
  { name: "backgrounds-neutral-secondary-hover", variable: "--backgrounds-neutral-secondary-hover", description: "Hover state for secondary neutral" },
  { name: "backgrounds-neutral-secondary-pressed", variable: "--backgrounds-neutral-secondary-pressed", description: "Pressed state for secondary neutral" },
  { name: "backgrounds-neutral-tertiary-default", variable: "--backgrounds-neutral-tertiary-default", description: "Tertiary neutral surface" },
  { name: "backgrounds-neutral-inverse-default", variable: "--backgrounds-neutral-inverse-default", description: "Inverse neutral surface" },
  { name: "backgrounds-neutral-glass-default", variable: "--backgrounds-neutral-glass-default", description: "Glass neutral surface" },
  { name: "backgrounds-neutral-opacity-faint", variable: "--backgrounds-neutral-opacity-faint", description: "Faint opacity overlay" },
  { name: "backgrounds-neutral-opacity-lighter", variable: "--backgrounds-neutral-opacity-lighter", description: "Lighter opacity overlay" },
  { name: "backgrounds-brand-strong-default", variable: "--backgrounds-brand-strong-default", description: "Primary brand background" },
  { name: "backgrounds-brand-lighter-default", variable: "--backgrounds-brand-lighter-default", description: "Secondary brand background" },
  { name: "backgrounds-danger-strong-default", variable: "--backgrounds-danger-strong-default", description: "Danger strong background" },
  { name: "backgrounds-danger-lighter-default", variable: "--backgrounds-danger-lighter-default", description: "Danger lighter background" },
  { name: "backgrounds-success-lighter-default", variable: "--backgrounds-success-lighter-default", description: "Success lighter background" },
  { name: "backgrounds-warning-lighter-default", variable: "--backgrounds-warning-lighter-default", description: "Warning lighter background" },
  { name: "backgrounds-disabled", variable: "--backgrounds-disabled", description: "Disabled surface" },
];

const text: ColorToken[] = [
  { name: "text-base-primary", variable: "--text-base-primary", description: "Primary body text" },
  { name: "text-base-secondary", variable: "--text-base-secondary", description: "Secondary/muted text" },
  { name: "text-base-alternate", variable: "--text-base-alternate", description: "Alternate emphasis text" },
  { name: "text-selected", variable: "--text-selected", description: "Selected/active text" },
  { name: "text-brand-primary", variable: "--text-brand-primary", description: "Brand-colored text" },
  { name: "text-brand-secondary", variable: "--text-brand-secondary", description: "Secondary brand text" },
  { name: "text-danger-primary", variable: "--text-danger-primary", description: "Error and danger text" },
  { name: "text-danger-secondary", variable: "--text-danger-secondary", description: "Secondary danger text" },
  { name: "text-warning-primary", variable: "--text-warning-primary", description: "Warning text" },
  { name: "text-success-primary", variable: "--text-success-primary", description: "Success text" },
  { name: "text-disabled", variable: "--text-disabled", description: "Disabled text" },
  { name: "text-fixed", variable: "--text-fixed", description: "Fixed-color text (always light)" },
  { name: "text-inverse", variable: "--text-inverse", description: "Inverse text" },
  { name: "text-glass-primary", variable: "--text-glass-primary", description: "Glass primary text" },
  { name: "text-glass-subtle", variable: "--text-glass-subtle", description: "Glass subtle text" },
];

const borders: ColorToken[] = [
  { name: "borders-base", variable: "--borders-base", description: "Subtle base border" },
  { name: "borders-default", variable: "--borders-default", description: "Default border for inputs and dividers" },
  { name: "borders-neutral-moderate", variable: "--borders-neutral-moderate", description: "Moderate neutral border" },
  { name: "borders-neutral-bolder", variable: "--borders-neutral-bolder", description: "Bolder neutral border" },
  { name: "borders-brand-default", variable: "--borders-brand-default", description: "Brand-colored border" },
  { name: "borders-brand-lighter", variable: "--borders-brand-lighter", description: "Lighter brand border" },
  { name: "borders-danger-default", variable: "--borders-danger-default", description: "Danger border" },
  { name: "borders-danger-lighter", variable: "--borders-danger-lighter", description: "Subtle danger border" },
  { name: "borders-success-default", variable: "--borders-success-default", description: "Success border" },
  { name: "borders-warning-default", variable: "--borders-warning-default", description: "Warning border" },
  { name: "borders-disabled", variable: "--borders-disabled", description: "Disabled border" },
  { name: "borders-glass-lighter", variable: "--borders-glass-lighter", description: "Glass lighter border" },
  { name: "borders-glass-medium", variable: "--borders-glass-medium", description: "Glass medium border" },
];

const buttons: ColorToken[] = [
  { name: "btn-brand-bg", variable: "--btn-brand-bg", description: "Brand button background" },
  { name: "btn-primary-bg", variable: "--btn-primary-bg", description: "Primary button background" },
  { name: "btn-secondary-bg", variable: "--btn-secondary-bg", description: "Secondary button background" },
  { name: "btn-destructive-bg", variable: "--btn-destructive-bg", description: "Destructive button background" },
  { name: "btn-destructive-secondary-bg", variable: "--btn-destructive-secondary-bg", description: "Soft destructive button background" },
  { name: "btn-disabled-bg", variable: "--btn-disabled-bg", description: "Disabled button background" },
  { name: "btn-glass-primary-bg", variable: "--btn-glass-primary-bg", description: "Brand glass button background" },
  { name: "btn-glass-secondary-bg", variable: "--btn-glass-secondary-bg", description: "Secondary glass button background" },
  { name: "btn-glass-ghost-bg", variable: "--btn-glass-ghost-bg", description: "Ghost glass button background" },
];

const shadows: ColorToken[] = [
  { name: "shadow-brand-moderate", variable: "--shadow-brand-moderate", description: "Brand focus ring color" },
  { name: "shadow-danger-moderate", variable: "--shadow-danger-moderate", description: "Danger focus ring color" },
];

const sections = [
  { title: "Backgrounds", description: "Surface and container colors used for page backgrounds, cards, and interactive states.", tokens: backgrounds },
  { title: "Text", description: "Typographic colors for headings, body copy, labels, and interactive text.", tokens: text },
  { title: "Borders", description: "Stroke colors for dividers, input outlines, and container edges.", tokens: borders },
  { title: "Shadows", description: "Focus ring and elevation shadow colors.", tokens: shadows },
  { title: "Buttons", description: "Fill colors for button variants across default, hover, and disabled states.", tokens: buttons },
];

/* ------------------------------------------------------------------ */
/*  Swatch component                                                   */
/* ------------------------------------------------------------------ */

function Swatch({ token }: { token: ColorToken }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`var(${token.variable})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const isTextToken = token.variable.startsWith("--text-");

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-start gap-3 rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-4 text-left transition-all hover:border-[var(--borders-neutral-bolder)] hover:shadow-sm"
    >
      {/* Color swatch */}
      {isTextToken ? (
        <div className="relative flex h-14 w-full items-center justify-center rounded-lg bg-[var(--backgrounds-neutral-primary-default)]">
          <span
            className="text-2xl font-bold"
            style={{ color: `var(${token.variable})` }}
          >
            Aa
          </span>
          <span className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} className="text-[var(--text-base-secondary)]" />
            )}
          </span>
        </div>
      ) : (
        <div className="relative h-14 w-full rounded-lg border border-[var(--borders-default)]" style={{ backgroundColor: `var(${token.variable})` }}>
          <span className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} className="text-[var(--text-base-secondary)]" />
            )}
          </span>
        </div>
      )}

      {/* Token info */}
      <div className="space-y-0.5 w-full min-w-0">
        <p className="truncate text-sm font-medium text-[var(--text-base-primary)]">
          {token.name}
        </p>
        <p className="truncate text-xs font-mono text-[var(--text-base-secondary)]">
          var({token.variable})
        </p>
        {token.description && (
          <p className="text-xs text-[var(--text-base-secondary)] leading-relaxed">
            {token.description}
          </p>
        )}
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ColorsPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Colors
        </h1>
        <p className="mt-2 text-base text-[var(--text-base-secondary)] max-w-2xl leading-relaxed">
          The Chilli design system uses semantic color tokens mapped to CSS custom properties.
          Each token adapts automatically between light and dark themes. Click any swatch to
          copy its CSS variable.
        </p>
      </header>

      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
                {section.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.tokens.map((token) => (
                <Swatch key={token.name} token={token} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
