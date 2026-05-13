"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Token data — mirrors Figma "_root global" collection               */
/* ------------------------------------------------------------------ */

const spaceScale = [
  { token: "--space-0", px: 0 },
  { token: "--space-1", px: 2 },
  { token: "--space-2", px: 4 },
  { token: "--space-3", px: 6 },
  { token: "--space-4", px: 8 },
  { token: "--space-5", px: 12 },
  { token: "--space-6", px: 16 },
  { token: "--space-7", px: 20 },
  { token: "--space-8", px: 24 },
  { token: "--space-9", px: 32 },
  { token: "--space-10", px: 40 },
  { token: "--space-11", px: 48 },
  { token: "--space-12", px: 64 },
  { token: "--space-13", px: 80 },
  { token: "--space-14", px: 96 },
  { token: "--space-15", px: 160 },
  { token: "--space-16", px: 260 },
];

const sizeScale = [
  { token: "--size-1", px: 4 },
  { token: "--size-2", px: 6 },
  { token: "--size-3", px: 8 },
  { token: "--size-4", px: 12 },
  { token: "--size-5", px: 16 },
  { token: "--size-6", px: 20 },
  { token: "--size-7", px: 24 },
  { token: "--size-8", px: 32 },
  { token: "--size-9", px: 40 },
  { token: "--size-10", px: 48 },
  { token: "--size-11", px: 56 },
  { token: "--size-12", px: 64 },
  { token: "--size-13", px: 72 },
  { token: "--size-14", px: 80 },
  { token: "--size-15", px: 96 },
  { token: "--size-16", px: 128 },
];

const radiusScale = [
  { token: "--radius-0", value: "0px" },
  { token: "--radius-1", value: "2px" },
  { token: "--radius-2", value: "4px" },
  { token: "--radius-3", value: "6px" },
  { token: "--radius-4", value: "8px" },
  { token: "--radius-5", value: "12px" },
  { token: "--radius-6", value: "16px" },
  { token: "--radius-7", value: "24px" },
  { token: "--radius-8", value: "32px" },
  { token: "--radius-full", value: "9999px" },
];

const borderWidths = [
  { token: "--border-width-0", value: "0px" },
  { token: "--border-width-1", value: "0.5px" },
  { token: "--border-width-2", value: "1px" },
  { token: "--border-width-3", value: "2px" },
  { token: "--border-width-4", value: "3px" },
  { token: "--border-width-5", value: "4px" },
  { token: "--border-width-6", value: "6px" },
  { token: "--border-width-7", value: "8px" },
];

const breakpoints = [
  { token: "--breakpoint-xs", px: 375 },
  { token: "--breakpoint-sm", px: 440 },
  { token: "--breakpoint-md", px: 768 },
  { token: "--breakpoint-lg", px: 1024 },
  { token: "--breakpoint-xl", px: 1280 },
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
      className="opacity-0 group-hover:opacity-100 transition-opacity"
      title="Copy token"
    >
      {copied ? (
        <Check size={14} className="text-green-500" />
      ) : (
        <Copy size={14} className="text-[var(--text-base-secondary)]" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SpacingPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Spacing
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          Spacing, sizing, radius, border-width and breakpoint tokens. Values come directly from
          the Figma <code className="font-mono text-xs">_root global</code> collection and are exposed
          as CSS custom properties.
        </p>
      </header>

      <div className="space-y-14">
        {/* ---- Space Scale ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Space
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              17 steps from 0 to 260px. Use for padding, margin, and gap.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            <div className="flex items-center gap-4 px-5 py-3 bg-[var(--backgrounds-neutral-primary-default)] border-b border-[var(--borders-default)]">
              <span className="w-28 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">Token</span>
              <span className="w-16 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">px</span>
              <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">Visual</span>
            </div>
            {spaceScale.map((s, i) => {
              const barWidth = Math.min(s.px, 384);
              return (
                <div
                  key={s.token}
                  className={`group flex items-center gap-4 px-5 py-2.5 hover:bg-[var(--backgrounds-neutral-primary-default)] transition-colors ${
                    i !== spaceScale.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                  }`}
                >
                  <div className="w-28 flex items-center gap-1.5">
                    <span className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                      {s.token}
                    </span>
                    <CopyButton text={`var(${s.token})`} />
                  </div>
                  <span className="w-16 text-xs font-mono text-[var(--text-base-secondary)]">
                    {s.px}px
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-3 rounded-sm bg-[var(--backgrounds-brand-strong-default)]"
                      style={{ width: barWidth === 0 ? "1px" : `${barWidth}px` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- Size Scale ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Size
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              16 steps from 4px to 128px. Use for square dimensions (icon boxes, avatars, control heights).
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {sizeScale.map((s, i) => (
              <div
                key={s.token}
                className={`group flex items-center gap-4 px-5 py-2.5 ${
                  i !== sizeScale.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-28 flex items-center gap-1.5">
                  <span className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {s.token}
                  </span>
                  <CopyButton text={`var(${s.token})`} />
                </div>
                <span className="w-16 text-xs font-mono text-[var(--text-base-secondary)]">
                  {s.px}px
                </span>
                <div className="flex-1 flex items-center">
                  <div
                    className="rounded-sm bg-[var(--backgrounds-brand-strong-default)]"
                    style={{ width: `${s.px}px`, height: `${s.px}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Radius ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Border Radius
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Corner radius tokens from 0 to full. Use for buttons, cards, inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {radiusScale.map((r) => (
              <div
                key={r.token}
                className="group flex flex-col items-center gap-4 rounded-xl border border-[var(--borders-default)] p-5"
              >
                <div
                  className="h-20 w-20 border-2 border-[var(--backgrounds-brand-strong-default)] bg-[var(--backgrounds-brand-lighter-default)]"
                  style={{ borderRadius: r.value }}
                />
                <div className="text-center space-y-0.5">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {r.token}
                  </p>
                  <p className="text-xs font-mono text-[var(--text-base-secondary)]">
                    {r.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Border Width ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Border Width
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              8 stroke thicknesses from 0 to 8px.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {borderWidths.map((b) => (
              <div
                key={b.token}
                className="flex flex-col items-center gap-3 rounded-xl border border-[var(--borders-default)] p-5"
              >
                <div
                  className="h-16 w-16 rounded-lg bg-[var(--backgrounds-base)]"
                  style={{
                    border: `${b.value} solid var(--backgrounds-brand-strong-default)`,
                  }}
                />
                <div className="text-center">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {b.token}
                  </p>
                  <p className="text-xs font-mono text-[var(--text-base-secondary)]">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Breakpoints ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Breakpoints
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              5 viewport breakpoints for responsive layouts.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {breakpoints.map((b, i) => (
              <div
                key={b.token}
                className={`flex items-center gap-6 px-5 py-3 ${
                  i !== breakpoints.length - 1 ? "border-b border-[var(--borders-default)]" : ""
                }`}
              >
                <div className="w-40 shrink-0">
                  <p className="text-xs font-mono font-medium text-[var(--text-base-primary)]">
                    {b.token}
                  </p>
                </div>
                <span className="text-sm font-mono text-[var(--text-base-secondary)]">
                  {b.px}px
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
