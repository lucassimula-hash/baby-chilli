"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/animated-title";

/* ------------------------------------------------------------------ */
/*  Token data — mirrors the Figma "theme" collection (Light / Dark)  */
/* ------------------------------------------------------------------ */

interface ColorToken {
  name: string;
  variable: string;
  description?: string;
}

interface Section {
  title: string;
  description: string;
  groups: { label?: string; tokens: ColorToken[] }[];
}

/* ----- Backgrounds ----- */

const bgSurface: ColorToken[] = [
  { name: "backgrounds-base", variable: "--backgrounds-base", description: "Default page background" },
  { name: "backgrounds-elevated", variable: "--backgrounds-elevated", description: "Elevated surfaces (cards, modals)" },
  { name: "backgrounds-selected", variable: "--backgrounds-selected", description: "Selected surface" },
  { name: "backgrounds-fixed", variable: "--backgrounds-fixed", description: "Fixed surface" },
  { name: "backgrounds-disabled", variable: "--backgrounds-disabled", description: "Disabled surface" },
];

const bgNeutralPrimary: ColorToken[] = [
  { name: "backgrounds-neutral-primary-default", variable: "--backgrounds-neutral-primary-default" },
  { name: "backgrounds-neutral-primary-hover", variable: "--backgrounds-neutral-primary-hover" },
  { name: "backgrounds-neutral-primary-pressed", variable: "--backgrounds-neutral-primary-pressed" },
];
const bgNeutralSecondary: ColorToken[] = [
  { name: "backgrounds-neutral-secondary-default", variable: "--backgrounds-neutral-secondary-default" },
  { name: "backgrounds-neutral-secondary-hover", variable: "--backgrounds-neutral-secondary-hover" },
  { name: "backgrounds-neutral-secondary-pressed", variable: "--backgrounds-neutral-secondary-pressed" },
];
const bgNeutralTertiary: ColorToken[] = [
  { name: "backgrounds-neutral-tertiary-default", variable: "--backgrounds-neutral-tertiary-default" },
  { name: "backgrounds-neutral-tertiary-hover", variable: "--backgrounds-neutral-tertiary-hover" },
  { name: "backgrounds-neutral-tertiary-pressed", variable: "--backgrounds-neutral-tertiary-pressed" },
];
const bgNeutralInverse: ColorToken[] = [
  { name: "backgrounds-neutral-inverse-default", variable: "--backgrounds-neutral-inverse-default" },
  { name: "backgrounds-neutral-inverse-hover", variable: "--backgrounds-neutral-inverse-hover" },
  { name: "backgrounds-neutral-inverse-pressed", variable: "--backgrounds-neutral-inverse-pressed" },
];
const bgNeutralGlass: ColorToken[] = [
  { name: "backgrounds-neutral-glass-default", variable: "--backgrounds-neutral-glass-default" },
  { name: "backgrounds-neutral-glass-hover", variable: "--backgrounds-neutral-glass-hover" },
  { name: "backgrounds-neutral-glass-pressed", variable: "--backgrounds-neutral-glass-pressed" },
];
const bgNeutralOpacity: ColorToken[] = [
  { name: "backgrounds-neutral-opacity-faint", variable: "--backgrounds-neutral-opacity-faint" },
  { name: "backgrounds-neutral-opacity-lighter", variable: "--backgrounds-neutral-opacity-lighter" },
  { name: "backgrounds-neutral-opacity-medium", variable: "--backgrounds-neutral-opacity-medium" },
  { name: "backgrounds-neutral-opacity-moderate", variable: "--backgrounds-neutral-opacity-moderate" },
  { name: "backgrounds-neutral-opacity-bolder", variable: "--backgrounds-neutral-opacity-bolder" },
  { name: "backgrounds-neutral-opacity-strong", variable: "--backgrounds-neutral-opacity-strong" },
];

const bgBrand: ColorToken[] = [
  { name: "backgrounds-brand-lighter-default", variable: "--backgrounds-brand-lighter-default" },
  { name: "backgrounds-brand-lighter-hover", variable: "--backgrounds-brand-lighter-hover" },
  { name: "backgrounds-brand-lighter-pressed", variable: "--backgrounds-brand-lighter-pressed" },
  { name: "backgrounds-brand-strong-default", variable: "--backgrounds-brand-strong-default" },
  { name: "backgrounds-brand-strong-hover", variable: "--backgrounds-brand-strong-hover" },
  { name: "backgrounds-brand-strong-pressed", variable: "--backgrounds-brand-strong-pressed" },
];
const bgDanger: ColorToken[] = [
  { name: "backgrounds-danger-lighter-default", variable: "--backgrounds-danger-lighter-default" },
  { name: "backgrounds-danger-lighter-hover", variable: "--backgrounds-danger-lighter-hover" },
  { name: "backgrounds-danger-lighter-pressed", variable: "--backgrounds-danger-lighter-pressed" },
  { name: "backgrounds-danger-strong-default", variable: "--backgrounds-danger-strong-default" },
  { name: "backgrounds-danger-strong-hover", variable: "--backgrounds-danger-strong-hover" },
  { name: "backgrounds-danger-strong-pressed", variable: "--backgrounds-danger-strong-pressed" },
];
const bgSuccess: ColorToken[] = [
  { name: "backgrounds-success-lighter-default", variable: "--backgrounds-success-lighter-default" },
  { name: "backgrounds-success-lighter-hover", variable: "--backgrounds-success-lighter-hover" },
  { name: "backgrounds-success-lighter-pressed", variable: "--backgrounds-success-lighter-pressed" },
  { name: "backgrounds-success-strong-default", variable: "--backgrounds-success-strong-default" },
  { name: "backgrounds-success-strong-hover", variable: "--backgrounds-success-strong-hover" },
  { name: "backgrounds-success-strong-pressed", variable: "--backgrounds-success-strong-pressed" },
];
const bgWarning: ColorToken[] = [
  { name: "backgrounds-warning-lighter-default", variable: "--backgrounds-warning-lighter-default" },
  { name: "backgrounds-warning-lighter-hover", variable: "--backgrounds-warning-lighter-hover" },
  { name: "backgrounds-warning-lighter-pressed", variable: "--backgrounds-warning-lighter-pressed" },
  { name: "backgrounds-warning-strong-default", variable: "--backgrounds-warning-strong-default" },
  { name: "backgrounds-warning-strong-hover", variable: "--backgrounds-warning-strong-hover" },
  { name: "backgrounds-warning-strong-pressed", variable: "--backgrounds-warning-strong-pressed" },
];

const bgAccent: ColorToken[] = [
  "neon-pink", "bright-pink", "electric-magenta", "purple",
  "ultra-blue", "blue", "cyan-blue", "liquid-blue", "bright-cyan",
  "caribbean-green", "lime-green", "lime",
  "yellow", "amber-orange", "orange", "red",
  "antique-gold", "desert-orange", "grey", "midnight-blue",
].flatMap<ColorToken>((hue) => [
  { name: `backgrounds-other-${hue}-lighter`, variable: `--backgrounds-other-${hue}-lighter` },
  { name: `backgrounds-other-${hue}-strong`, variable: `--backgrounds-other-${hue}-strong` },
]);

/* ----- Text ----- */

const textBase: ColorToken[] = [
  { name: "text-base-primary", variable: "--text-base-primary", description: "Primary body text" },
  { name: "text-base-secondary", variable: "--text-base-secondary", description: "Secondary / muted text" },
  { name: "text-base-alternate", variable: "--text-base-alternate", description: "Alternate emphasis text" },
  { name: "text-base-disabled", variable: "--text-base-disabled", description: "Disabled body text" },
  { name: "text-base-link", variable: "--text-base-link", description: "Link text" },
  { name: "text-base-link-focus", variable: "--text-base-link-focus", description: "Focused link text" },
  { name: "text-selected", variable: "--text-selected", description: "Selected text" },
  { name: "text-disabled", variable: "--text-disabled", description: "Disabled text" },
  { name: "text-fixed", variable: "--text-fixed", description: "Fixed-color text" },
  { name: "text-inverse", variable: "--text-inverse", description: "Inverse text" },
];
const textBrand: ColorToken[] = [
  { name: "text-brand-primary", variable: "--text-brand-primary" },
  { name: "text-brand-secondary", variable: "--text-brand-secondary" },
];
const textStatus: ColorToken[] = [
  { name: "text-danger-primary", variable: "--text-danger-primary" },
  { name: "text-danger-secondary", variable: "--text-danger-secondary" },
  { name: "text-warning-primary", variable: "--text-warning-primary" },
  { name: "text-warning-secondary", variable: "--text-warning-secondary" },
  { name: "text-success-primary", variable: "--text-success-primary" },
  { name: "text-success-secondary", variable: "--text-success-secondary" },
];
const textGlass: ColorToken[] = [
  { name: "text-glass-primary", variable: "--text-glass-primary" },
  { name: "text-glass-subtle", variable: "--text-glass-subtle" },
];

/* ----- Links ----- */

const links: ColorToken[] = [
  { name: "link-primary", variable: "--link-primary" },
  { name: "link-hover", variable: "--link-hover" },
  { name: "link-pressed", variable: "--link-pressed" },
  { name: "link-visited", variable: "--link-visited" },
];

/* ----- Icons ----- */

const iconsNeutral: ColorToken[] = [
  { name: "icon-neutral-primary", variable: "--icon-neutral-primary" },
  { name: "icon-neutral-secondary", variable: "--icon-neutral-secondary" },
  { name: "icon-neutral-alternate", variable: "--icon-neutral-alternate" },
  { name: "icon-neutral-disabled", variable: "--icon-neutral-disabled" },
];
const iconsBrand: ColorToken[] = [
  { name: "icon-brand-primary", variable: "--icon-brand-primary" },
  { name: "icon-brand-secondary", variable: "--icon-brand-secondary" },
];
const iconsStatus: ColorToken[] = [
  { name: "icon-danger-primary", variable: "--icon-danger-primary" },
  { name: "icon-danger-secondary", variable: "--icon-danger-secondary" },
  { name: "icon-warning-primary", variable: "--icon-warning-primary" },
  { name: "icon-warning-secondary", variable: "--icon-warning-secondary" },
  { name: "icon-success-primary", variable: "--icon-success-primary" },
  { name: "icon-success-secondary", variable: "--icon-success-secondary" },
];
const iconsGlassLink: ColorToken[] = [
  { name: "icon-link-default", variable: "--icon-link-default" },
  { name: "icon-link-hover", variable: "--icon-link-hover" },
  { name: "icon-glass-primary", variable: "--icon-glass-primary" },
  { name: "icon-glass-subtle", variable: "--icon-glass-subtle" },
];

/* ----- Borders ----- */

const bordersBase: ColorToken[] = [
  { name: "borders-base", variable: "--borders-base" },
  { name: "borders-default", variable: "--borders-default" },
  { name: "borders-selected", variable: "--borders-selected" },
  { name: "borders-divider", variable: "--borders-divider" },
  { name: "borders-disabled", variable: "--borders-disabled" },
];
const bordersNeutral: ColorToken[] = [
  { name: "borders-neutral-default", variable: "--borders-neutral-default" },
  { name: "borders-neutral-moderate", variable: "--borders-neutral-moderate" },
  { name: "borders-neutral-bolder", variable: "--borders-neutral-bolder" },
];
const bordersStatus: ColorToken[] = [
  { name: "borders-brand-default", variable: "--borders-brand-default" },
  { name: "borders-brand-lighter", variable: "--borders-brand-lighter" },
  { name: "borders-danger-default", variable: "--borders-danger-default" },
  { name: "borders-danger-lighter", variable: "--borders-danger-lighter" },
  { name: "borders-warning-default", variable: "--borders-warning-default" },
  { name: "borders-warning-lighter", variable: "--borders-warning-lighter" },
  { name: "borders-success-default", variable: "--borders-success-default" },
  { name: "borders-success-lighter", variable: "--borders-success-lighter" },
];
const bordersGlass: ColorToken[] = [
  { name: "borders-glass-lighter", variable: "--borders-glass-lighter" },
  { name: "borders-glass-medium", variable: "--borders-glass-medium" },
  { name: "borders-glass-strong", variable: "--borders-glass-strong" },
];

/* ----- Buttons ----- */

const btnPrimary: ColorToken[] = [
  { name: "btn-primary-bg", variable: "--btn-primary-bg" },
  { name: "btn-primary-bg-hover", variable: "--btn-primary-bg-hover" },
  { name: "btn-primary-bg-pressed", variable: "--btn-primary-bg-pressed" },
  { name: "btn-primary-bg-disabled", variable: "--btn-primary-bg-disabled" },
  { name: "btn-primary-text", variable: "--btn-primary-text" },
];
const btnSecondary: ColorToken[] = [
  { name: "btn-secondary-bg", variable: "--btn-secondary-bg" },
  { name: "btn-secondary-bg-hover", variable: "--btn-secondary-bg-hover" },
  { name: "btn-secondary-bg-pressed", variable: "--btn-secondary-bg-pressed" },
  { name: "btn-secondary-bg-disabled", variable: "--btn-secondary-bg-disabled" },
  { name: "btn-secondary-text", variable: "--btn-secondary-text" },
];
const btnBrand: ColorToken[] = [
  { name: "btn-brand-bg", variable: "--btn-brand-bg" },
  { name: "btn-brand-bg-hover", variable: "--btn-brand-bg-hover" },
  { name: "btn-brand-bg-pressed", variable: "--btn-brand-bg-pressed" },
  { name: "btn-brand-bg-disabled", variable: "--btn-brand-bg-disabled" },
  { name: "btn-brand-text", variable: "--btn-brand-text" },
];
const btnDestructive: ColorToken[] = [
  { name: "btn-destructive-bg", variable: "--btn-destructive-bg" },
  { name: "btn-destructive-bg-hover", variable: "--btn-destructive-bg-hover" },
  { name: "btn-destructive-bg-pressed", variable: "--btn-destructive-bg-pressed" },
  { name: "btn-destructive-bg-disabled", variable: "--btn-destructive-bg-disabled" },
  { name: "btn-destructive-text", variable: "--btn-destructive-text" },
  { name: "btn-destructive-secondary-bg", variable: "--btn-destructive-secondary-bg" },
  { name: "btn-destructive-secondary-bg-hover", variable: "--btn-destructive-secondary-bg-hover" },
  { name: "btn-destructive-secondary-bg-pressed", variable: "--btn-destructive-secondary-bg-pressed" },
  { name: "btn-destructive-secondary-text", variable: "--btn-destructive-secondary-text" },
];
const btnGlass: ColorToken[] = [
  { name: "btn-glass-primary-bg", variable: "--btn-glass-primary-bg" },
  { name: "btn-glass-primary-bg-hover", variable: "--btn-glass-primary-bg-hover" },
  { name: "btn-glass-primary-bg-pressed", variable: "--btn-glass-primary-bg-pressed" },
  { name: "btn-glass-secondary-bg", variable: "--btn-glass-secondary-bg" },
  { name: "btn-glass-secondary-bg-hover", variable: "--btn-glass-secondary-bg-hover" },
  { name: "btn-glass-secondary-bg-pressed", variable: "--btn-glass-secondary-bg-pressed" },
  { name: "btn-glass-ghost-bg", variable: "--btn-glass-ghost-bg" },
  { name: "btn-glass-ghost-bg-hover", variable: "--btn-glass-ghost-bg-hover" },
  { name: "btn-glass-ghost-text", variable: "--btn-glass-ghost-text" },
];
const btnDisabled: ColorToken[] = [
  { name: "btn-disabled-bg", variable: "--btn-disabled-bg" },
  { name: "btn-disabled-text", variable: "--btn-disabled-text" },
];

/* ----- Shadows (focus ring colors) ----- */

const shadowFocus: ColorToken[] = [
  { name: "shadow-color-lighter", variable: "--shadow-color-lighter" },
  { name: "shadow-brand-moderate", variable: "--shadow-brand-moderate", description: "Brand focus ring" },
  { name: "shadow-danger-moderate", variable: "--shadow-danger-moderate", description: "Danger focus ring" },
];

/* ----- Sections ----- */

const sections: Section[] = [
  {
    title: "Backgrounds",
    description: "Surface and container colors. Hover/pressed states are listed alongside each base variant.",
    groups: [
      { label: "Surface", tokens: bgSurface },
      { label: "Neutral — Primary", tokens: bgNeutralPrimary },
      { label: "Neutral — Secondary", tokens: bgNeutralSecondary },
      { label: "Neutral — Tertiary", tokens: bgNeutralTertiary },
      { label: "Neutral — Inverse", tokens: bgNeutralInverse },
      { label: "Neutral — Glass", tokens: bgNeutralGlass },
      { label: "Neutral — Opacity", tokens: bgNeutralOpacity },
      { label: "Brand", tokens: bgBrand },
      { label: "Danger", tokens: bgDanger },
      { label: "Success", tokens: bgSuccess },
      { label: "Warning", tokens: bgWarning },
      { label: "Accent — Other", tokens: bgAccent },
    ],
  },
  {
    title: "Text",
    description: "Typographic colors for headings, body copy, labels, and interactive text.",
    groups: [
      { label: "Base", tokens: textBase },
      { label: "Brand", tokens: textBrand },
      { label: "Status", tokens: textStatus },
      { label: "Glass", tokens: textGlass },
    ],
  },
  {
    title: "Links",
    description: "Link text colors across default, hover, pressed, and visited states.",
    groups: [{ tokens: links }],
  },
  {
    title: "Icons",
    description: "Icon fill colors for neutral, brand, status, and interactive contexts.",
    groups: [
      { label: "Neutral", tokens: iconsNeutral },
      { label: "Brand", tokens: iconsBrand },
      { label: "Status", tokens: iconsStatus },
      { label: "Link & Glass", tokens: iconsGlassLink },
    ],
  },
  {
    title: "Borders",
    description: "Stroke colors for dividers, input outlines, and container edges.",
    groups: [
      { label: "Base", tokens: bordersBase },
      { label: "Neutral", tokens: bordersNeutral },
      { label: "Brand & Status", tokens: bordersStatus },
      { label: "Glass", tokens: bordersGlass },
    ],
  },
  {
    title: "Buttons",
    description: "Fill and text colors for button variants across default, hover, pressed, and disabled states.",
    groups: [
      { label: "Primary", tokens: btnPrimary },
      { label: "Secondary", tokens: btnSecondary },
      { label: "Brand", tokens: btnBrand },
      { label: "Destructive", tokens: btnDestructive },
      { label: "Glass", tokens: btnGlass },
      { label: "Disabled", tokens: btnDisabled },
    ],
  },
  {
    title: "Shadows",
    description: "Focus ring and elevation shadow colors.",
    groups: [{ tokens: shadowFocus }],
  },
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

  const isTextToken = token.variable.startsWith("--text-") || token.variable.startsWith("--link-") || token.variable.startsWith("--icon-");

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-start gap-3 rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-4 text-left transition-all hover:border-[var(--borders-neutral-bolder)] hover:shadow-sm"
    >
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
        <AnimatedTitle as="h1" className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Colors
        </AnimatedTitle>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          The Chilli design system uses semantic color tokens mapped to CSS custom properties.
          Each token adapts automatically between light and dark themes. Click any swatch to
          copy its CSS variable.
        </p>
      </header>

      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-5">
              <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
                {section.description}
              </p>
            </div>
            <div className="space-y-8">
              {section.groups.map((group, idx) => (
                <div key={group.label ?? idx}>
                  {group.label && (
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                      {group.label}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.tokens.map((token) => (
                      <Swatch key={token.name} token={token} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
