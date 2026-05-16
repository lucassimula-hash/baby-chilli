"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/animated-title";

/* ------------------------------------------------------------------ */
/*  Token data — mirrors Figma "_root font" + "theme/text" collections */
/* ------------------------------------------------------------------ */

const fontFamilies = [
  { token: "--font-family-primary", value: "SF Pro Display", usage: "Headings, display moments" },
  { token: "--font-family-secondary", value: "Inter", usage: "Body, buttons, UI" },
];

const fontSizes = [
  { token: "--font-size-2xs", px: 10 },
  { token: "--font-size-xs", px: 12 },
  { token: "--font-size-sm", px: 14 },
  { token: "--font-size-md", px: 16 },
  { token: "--font-size-lg", px: 18 },
  { token: "--font-size-xl", px: 20 },
  { token: "--font-size-2xl", px: 24 },
  { token: "--font-size-3xl", px: 28 },
  { token: "--font-size-4xl", px: 32 },
  { token: "--font-size-5xl", px: 48 },
  { token: "--font-size-6xl", px: 60 },
  { token: "--font-size-7xl", px: 72 },
  { token: "--font-size-8xl", px: 96 },
  { token: "--font-size-9xl", px: 128 },
];

const lineHeights = [
  { token: "--line-height-2xs", px: 14 },
  { token: "--line-height-xs", px: 16 },
  { token: "--line-height-sm", px: 20 },
  { token: "--line-height-md", px: 24 },
  { token: "--line-height-lg", px: 26 },
  { token: "--line-height-xl", px: 28 },
  { token: "--line-height-2xl", px: 32 },
  { token: "--line-height-3xl", px: 40 },
  { token: "--line-height-4xl", px: 46 },
  { token: "--line-height-5xl", px: 54 },
  { token: "--line-height-6xl", px: 66 },
  { token: "--line-height-7xl", px: 78 },
  { token: "--line-height-8xl", px: 106 },
  { token: "--line-height-9xl", px: 136 },
];

const letterSpacings = [
  { token: "--letter-spacing-xs", value: "-2px", description: "Tightest — display" },
  { token: "--letter-spacing-sm", value: "-1px", description: "Tight — large headings" },
  { token: "--letter-spacing-md", value: "0px", description: "Default" },
  { token: "--letter-spacing-lg", value: "1px", description: "Loose — labels" },
  { token: "--letter-spacing-xl", value: "2px", description: "Loosest — caps" },
];

const fontWeights = [
  { name: "Regular", value: 400 },
  { name: "Medium", value: 500 },
  { name: "Semibold", value: 600 },
  { name: "Bold", value: 700 },
];

interface TextStyle {
  name: string;
  family: "SF Pro Display" | "Inter";
  fontSize: number;
  lineHeight: number;
  weight: number;
}

const headingStyles: TextStyle[] = [
  { name: "Headings/display/bold", family: "SF Pro Display", fontSize: 32, lineHeight: 40, weight: 700 },
  { name: "Headings/display/semibold", family: "SF Pro Display", fontSize: 32, lineHeight: 40, weight: 600 },
  { name: "Headings/large/Semibold", family: "SF Pro Display", fontSize: 24, lineHeight: 32, weight: 600 },
  { name: "Headings/large/Medium", family: "SF Pro Display", fontSize: 24, lineHeight: 32, weight: 500 },
  { name: "Headings/medium/semibold", family: "SF Pro Display", fontSize: 20, lineHeight: 28, weight: 600 },
  { name: "Headings/medium/medium", family: "SF Pro Display", fontSize: 20, lineHeight: 28, weight: 500 },
  { name: "Headings/small/semibold", family: "SF Pro Display", fontSize: 18, lineHeight: 26, weight: 600 },
  { name: "Headings/small/medium", family: "SF Pro Display", fontSize: 18, lineHeight: 26, weight: 500 },
  { name: "Headings/xsmall/Semibold", family: "SF Pro Display", fontSize: 16, lineHeight: 20, weight: 600 },
  { name: "Headings/xsmall/Medium", family: "SF Pro Display", fontSize: 16, lineHeight: 20, weight: 500 },
];

const bodyStyles: TextStyle[] = [
  { name: "Body/P1/strong", family: "Inter", fontSize: 18, lineHeight: 26, weight: 600 },
  { name: "Body/P1/accent", family: "Inter", fontSize: 18, lineHeight: 26, weight: 500 },
  { name: "Body/P1/regular", family: "Inter", fontSize: 18, lineHeight: 26, weight: 400 },
  { name: "Body/P2/strong", family: "Inter", fontSize: 16, lineHeight: 24, weight: 600 },
  { name: "Body/P2/accent", family: "Inter", fontSize: 16, lineHeight: 24, weight: 500 },
  { name: "Body/P2/regular", family: "Inter", fontSize: 16, lineHeight: 24, weight: 400 },
  { name: "Body/P3/strong", family: "Inter", fontSize: 14, lineHeight: 20, weight: 600 },
  { name: "Body/P3/accent", family: "Inter", fontSize: 14, lineHeight: 20, weight: 500 },
  { name: "Body/P3/Regular", family: "Inter", fontSize: 14, lineHeight: 20, weight: 400 },
  { name: "Body/P4/strong", family: "Inter", fontSize: 12, lineHeight: 16, weight: 600 },
  { name: "Body/P4/accent", family: "Inter", fontSize: 12, lineHeight: 16, weight: 500 },
  { name: "Body/P4/Regular", family: "Inter", fontSize: 12, lineHeight: 16, weight: 400 },
];

const buttonStyles: TextStyle[] = [
  { name: "Button/B1/semibold", family: "Inter", fontSize: 16, lineHeight: 24, weight: 600 },
  { name: "Button/B1/medium", family: "Inter", fontSize: 16, lineHeight: 24, weight: 500 },
  { name: "Button/B2/semibold", family: "Inter", fontSize: 14, lineHeight: 20, weight: 600 },
  { name: "Button/B2/medium", family: "Inter", fontSize: 14, lineHeight: 20, weight: 500 },
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

function StyleRow({ s, isLast }: { s: TextStyle; isLast: boolean }) {
  return (
    <div
      className={`flex items-baseline gap-6 px-5 py-4 ${
        !isLast ? "border-b border-[var(--borders-default)]" : ""
      }`}
    >
      <div className="w-56 shrink-0">
        <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">{s.name}</p>
        <p className="text-[11px] text-[var(--text-base-secondary)]">
          {s.family} · {s.fontSize}/{s.lineHeight} · {s.weight}
        </p>
      </div>
      <p
        className="truncate text-[var(--text-base-primary)]"
        style={{
          fontFamily: `${s.family}, sans-serif`,
          fontSize: `${s.fontSize}px`,
          lineHeight: `${s.lineHeight}px`,
          fontWeight: s.weight,
        }}
      >
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TypographyPage() {
  const [previewWeight, setPreviewWeight] = useState(400);

  return (
    <article>
      <header className="mb-10">
        <AnimatedTitle as="h1" className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Typography
        </AnimatedTitle>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          The Chilli design system uses{" "}
          <strong className="text-[var(--text-base-primary)]">SF Pro Display</strong> for headings
          and <strong className="text-[var(--text-base-primary)]">Inter</strong> for body copy,
          buttons, and UI. Use named text styles (Headings / Body / Button) whenever possible —
          raw tokens are exposed below for custom compositions.
        </p>
      </header>

      <div className="space-y-14">
        {/* Font Families */}
        <section>
          <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)] mb-4">
            Font Families
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fontFamilies.map((f) => (
              <div
                key={f.token}
                className="rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-base)] p-6"
              >
                <p
                  className="mb-3 text-4xl font-semibold text-[var(--text-base-primary)]"
                  style={{ fontFamily: `${f.value}, sans-serif` }}
                >
                  {f.value}
                </p>
                <p className="mb-3 text-sm text-[var(--text-base-secondary)]">{f.usage}</p>
                <CopyButton text={`var(${f.token})`} />
              </div>
            ))}
          </div>
        </section>

        {/* Text styles (Headings / Body / Button) */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">Text Styles</h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Named styles from the Figma library. Use these as the first choice — they pin font
              family, size, line height, and weight together.
            </p>
          </div>

          {[
            { label: "Headings — SF Pro Display", styles: headingStyles },
            { label: "Body — Inter", styles: bodyStyles },
            { label: "Button — Inter", styles: buttonStyles },
          ].map((group) => (
            <div key={group.label} className="mb-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                {group.label}
              </h3>
              <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
                {group.styles.map((s, i) => (
                  <StyleRow key={s.name} s={s} isLast={i === group.styles.length - 1} />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Font Size Scale */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">Font Size</h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              14 sizes from 10px to 128px. Match with a corresponding line-height token below.
            </p>
          </div>

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

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {fontSizes.map((t, i) => (
              <div
                key={t.token}
                className={`flex items-baseline gap-6 px-5 py-4 ${
                  i !== fontSizes.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-40 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {t.token}
                  </p>
                  <p className="text-[11px] text-[var(--text-base-secondary)]">{t.px}px</p>
                </div>
                <p
                  className="truncate text-[var(--text-base-primary)]"
                  style={{
                    fontSize: `${t.px}px`,
                    lineHeight: 1.2,
                    fontWeight: previewWeight,
                  }}
                >
                  The quick brown fox
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Line Heights */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">Line Height</h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Absolute line-height values (px). Pair with the matching font-size.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {lineHeights.map((lh, i) => (
              <div
                key={lh.token}
                className={`flex items-center gap-6 px-5 py-3 ${
                  i !== lineHeights.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-40 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {lh.token}
                  </p>
                  <p className="text-[11px] text-[var(--text-base-secondary)]">{lh.px}px</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm text-[var(--text-base-primary)]"
                    style={{ lineHeight: `${lh.px}px` }}
                  >
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Letter Spacing */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">Letter Spacing</h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              5 tracking tokens adjust horizontal spacing between characters.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {letterSpacings.map((ls, i) => (
              <div
                key={ls.token}
                className={`flex items-center gap-6 px-5 py-4 ${
                  i !== letterSpacings.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-40 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {ls.token}
                  </p>
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

        {/* Font Weights */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">Font Weights</h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Four weights cover text styles from body copy to bold headings.
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
