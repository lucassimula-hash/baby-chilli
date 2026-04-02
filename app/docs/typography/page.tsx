"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const typeScale = [
  { name: "text-xs", size: "12px", rem: "0.75rem", lineHeight: "16px" },
  { name: "text-sm", size: "14px", rem: "0.875rem", lineHeight: "20px" },
  { name: "text-base", size: "16px", rem: "1rem", lineHeight: "24px" },
  { name: "text-lg", size: "18px", rem: "1.125rem", lineHeight: "28px" },
  { name: "text-xl", size: "20px", rem: "1.25rem", lineHeight: "28px" },
  { name: "text-2xl", size: "24px", rem: "1.5rem", lineHeight: "32px" },
  { name: "text-3xl", size: "30px", rem: "1.875rem", lineHeight: "36px" },
  { name: "text-4xl", size: "36px", rem: "2.25rem", lineHeight: "40px" },
];

const fontWeights = [
  { name: "Regular", value: 400, class: "font-normal" },
  { name: "Medium", value: 500, class: "font-medium" },
  { name: "Semibold", value: 600, class: "font-semibold" },
  { name: "Bold", value: 700, class: "font-bold" },
];

const lineHeights = [
  { name: "leading-none", value: "1", description: "Tight, use for large display text" },
  { name: "leading-tight", value: "1.25", description: "Slightly tight" },
  { name: "leading-snug", value: "1.375", description: "Compact paragraphs" },
  { name: "leading-normal", value: "1.5", description: "Default body text" },
  { name: "leading-relaxed", value: "1.625", description: "Comfortable reading" },
  { name: "leading-loose", value: "2", description: "Extra-spacious text" },
];

const letterSpacings = [
  { name: "tracking-tighter", value: "-0.05em", description: "Dense display headings" },
  { name: "tracking-tight", value: "-0.025em", description: "Headings" },
  { name: "tracking-normal", value: "0em", description: "Default body text" },
  { name: "tracking-wide", value: "0.025em", description: "Uppercase labels" },
  { name: "tracking-wider", value: "0.05em", description: "Small caps and labels" },
  { name: "tracking-widest", value: "0.1em", description: "All-caps text" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--borders-default)] px-2 py-1 text-xs font-mono text-[var(--text-base-secondary)] transition-colors hover:border-[var(--borders-neutral-bolder)] hover:text-[var(--text-base-primary)]"
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
      {text}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Size class map (Tailwind v4 uses dynamic classes so we define      */
/*  font-sizes via inline styles for reliability)                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TypographyPage() {
  const [previewWeight, setPreviewWeight] = useState(400);

  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Typography
        </h1>
        <p className="mt-2 text-base text-[var(--text-base-secondary)] max-w-2xl leading-relaxed">
          The Chilli design system uses <strong className="text-[var(--text-base-primary)]">SF Pro Display</strong>
          for display moments and <strong className="text-[var(--text-base-primary)]">Inter</strong> for interface
          and body copy. The type scale, weights, line heights, and letter-spacing tokens below
          form the foundation for all text in the system.
        </p>
      </header>

      <div className="space-y-14">
        {/* ---- Font Family ---- */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-base-primary)] mb-4">
            Font Family
          </h2>
          <div className="rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] p-6">
            <p className="text-4xl font-semibold text-[var(--text-base-primary)] mb-2" style={{ fontFamily: "var(--font-family-primary), sans-serif" }}>
              SF Pro Display
            </p>
            <p className="text-lg text-[var(--text-base-secondary)] mb-3" style={{ fontFamily: "var(--font-family-secondary), sans-serif" }}>
              Inter for UI and supporting copy
            </p>
            <p className="text-sm text-[var(--text-base-secondary)] mb-4">
              The font family tokens come directly from the latest variables export. Use the display
              family for strong hierarchy and the secondary family for controls, content, and dense UI.
            </p>
            <div className="flex flex-wrap gap-2">
              <CopyButton text="font-family: var(--font-family-primary)" />
              <CopyButton text="font-family: var(--font-family-secondary)" />
              <CopyButton text="@fontsource/inter" />
            </div>
          </div>
        </section>

        {/* ---- Type Scale ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Type Scale
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Eight sizes from caption to display, each with a balanced line height.
            </p>
          </div>

          {/* Weight toggle */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-medium text-[var(--text-base-secondary)]">Weight:</span>
            <div className="flex rounded-lg border border-[var(--borders-default)] overflow-hidden">
              {fontWeights.map((w) => (
                <button
                  key={w.value}
                  onClick={() => setPreviewWeight(w.value)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    previewWeight === w.value
                      ? "bg-[var(--backgrounds-brand-strong-default)] text-white"
                      : "text-[var(--text-base-secondary)] hover:bg-[var(--backgrounds-neutral-primary-default)]"
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-0 rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {typeScale.map((t, i) => (
              <div
                key={t.name}
                className={`flex items-baseline gap-6 px-5 py-4 ${
                  i !== typeScale.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                {/* Meta */}
                <div className="w-28 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--text-base-secondary)]">
                    {t.size} / {t.lineHeight}
                  </p>
                </div>
                {/* Sample */}
                <p
                  className="truncate text-[var(--text-base-primary)]"
                  style={{
                    fontSize: t.rem,
                    lineHeight: t.lineHeight,
                    fontWeight: previewWeight,
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Font Weights ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Font Weights
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Four weights cover all typographic needs from body copy to bold headings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fontWeights.map((w) => (
              <div
                key={w.value}
                className="rounded-xl border border-[var(--borders-default)] p-5"
              >
                <p
                  className="text-2xl text-[var(--text-base-primary)] mb-3"
                  style={{ fontWeight: w.value }}
                >
                  The quick brown fox
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[var(--text-base-primary)]">
                    {w.name}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-base-secondary)]">
                    {w.value}
                  </span>
                  <CopyButton text={w.class} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Line Heights ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Line Heights
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Line height utilities control the vertical rhythm between lines of text.
            </p>
          </div>

          <div className="space-y-0 rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {lineHeights.map((lh, i) => (
              <div
                key={lh.name}
                className={`flex items-center gap-6 px-5 py-4 ${
                  i !== lineHeights.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-36 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">{lh.name}</p>
                  <p className="text-[11px] text-[var(--text-base-secondary)]">{lh.value}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm text-[var(--text-base-primary)]"
                    style={{ lineHeight: lh.value }}
                  >
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                  </p>
                </div>
                <p className="text-xs text-[var(--text-base-secondary)] shrink-0 hidden sm:block">
                  {lh.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Letter Spacing ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Letter Spacing
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Tracking utilities adjust horizontal spacing between characters.
            </p>
          </div>

          <div className="space-y-0 rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {letterSpacings.map((ls, i) => (
              <div
                key={ls.name}
                className={`flex items-center gap-6 px-5 py-4 ${
                  i !== letterSpacings.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-36 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">{ls.name}</p>
                  <p className="text-[11px] text-[var(--text-base-secondary)]">{ls.value}</p>
                </div>
                <p
                  className="flex-1 text-lg font-medium text-[var(--text-base-primary)] truncate"
                  style={{ letterSpacing: ls.value }}
                >
                  ABCDEFGHIJKLM abcdefghijklm
                </p>
                <p className="text-xs text-[var(--text-base-secondary)] shrink-0 hidden sm:block">
                  {ls.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
