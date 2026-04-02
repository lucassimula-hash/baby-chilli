"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const spacingScale = [
  { name: "0", rem: "0rem", px: "0px" },
  { name: "0.5", rem: "0.125rem", px: "2px" },
  { name: "1", rem: "0.25rem", px: "4px" },
  { name: "1.5", rem: "0.375rem", px: "6px" },
  { name: "2", rem: "0.5rem", px: "8px" },
  { name: "2.5", rem: "0.625rem", px: "10px" },
  { name: "3", rem: "0.75rem", px: "12px" },
  { name: "3.5", rem: "0.875rem", px: "14px" },
  { name: "4", rem: "1rem", px: "16px" },
  { name: "5", rem: "1.25rem", px: "20px" },
  { name: "6", rem: "1.5rem", px: "24px" },
  { name: "7", rem: "1.75rem", px: "28px" },
  { name: "8", rem: "2rem", px: "32px" },
  { name: "9", rem: "2.25rem", px: "36px" },
  { name: "10", rem: "2.5rem", px: "40px" },
  { name: "11", rem: "2.75rem", px: "44px" },
  { name: "12", rem: "3rem", px: "48px" },
  { name: "14", rem: "3.5rem", px: "56px" },
  { name: "16", rem: "4rem", px: "64px" },
  { name: "20", rem: "5rem", px: "80px" },
  { name: "24", rem: "6rem", px: "96px" },
  { name: "28", rem: "7rem", px: "112px" },
  { name: "32", rem: "8rem", px: "128px" },
  { name: "36", rem: "9rem", px: "144px" },
  { name: "40", rem: "10rem", px: "160px" },
  { name: "44", rem: "11rem", px: "176px" },
  { name: "48", rem: "12rem", px: "192px" },
  { name: "52", rem: "13rem", px: "208px" },
  { name: "56", rem: "14rem", px: "224px" },
  { name: "60", rem: "15rem", px: "240px" },
  { name: "64", rem: "16rem", px: "256px" },
  { name: "72", rem: "18rem", px: "288px" },
  { name: "80", rem: "20rem", px: "320px" },
  { name: "96", rem: "24rem", px: "384px" },
];

const borderRadii = [
  { name: "rounded-none", value: "0px", cssValue: "0" },
  { name: "rounded-sm", value: "2px", cssValue: "0.125rem" },
  { name: "rounded", value: "4px", cssValue: "0.25rem" },
  { name: "rounded-md", value: "6px", cssValue: "0.375rem" },
  { name: "rounded-lg", value: "8px", cssValue: "0.5rem" },
  { name: "rounded-xl", value: "12px", cssValue: "0.75rem" },
  { name: "rounded-2xl", value: "16px", cssValue: "1rem" },
  { name: "rounded-3xl", value: "24px", cssValue: "1.5rem" },
  { name: "rounded-full", value: "9999px", cssValue: "9999px" },
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
      title="Copy class"
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
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Spacing
        </h1>
        <p className="mt-2 text-base text-[var(--text-base-secondary)] max-w-2xl leading-relaxed">
          A consistent spacing scale ensures visual harmony across the design system. These
          tokens map to Tailwind&apos;s default spacing utilities and are used for margin, padding,
          gap, width, and height.
        </p>
      </header>

      <div className="space-y-14">
        {/* ---- Spacing Scale ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Spacing Scale
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Use these values with any spacing utility: <code className="rounded bg-[var(--backgrounds-neutral-primary-default)] px-1.5 py-0.5 text-xs font-mono">p-4</code>, <code className="rounded bg-[var(--backgrounds-neutral-primary-default)] px-1.5 py-0.5 text-xs font-mono">gap-6</code>, <code className="rounded bg-[var(--backgrounds-neutral-primary-default)] px-1.5 py-0.5 text-xs font-mono">mt-8</code>, etc.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-4 px-5 py-3 bg-[var(--backgrounds-neutral-primary-default)] border-b border-[var(--borders-default)]">
              <span className="w-16 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Token
              </span>
              <span className="w-20 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                rem
              </span>
              <span className="w-16 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                px
              </span>
              <span className="flex-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Visual
              </span>
            </div>

            {spacingScale.map((s, i) => {
              const pxNum = parseInt(s.px, 10);
              // Cap bar width at 100% for display
              const barWidth = Math.min(pxNum, 384);

              return (
                <div
                  key={s.name}
                  className={`group flex items-center gap-4 px-5 py-2.5 hover:bg-[var(--backgrounds-neutral-primary-default)] transition-colors ${
                    i !== spacingScale.length - 1
                      ? "border-b border-[var(--borders-default)]"
                      : ""
                  }`}
                >
                  <div className="w-16 flex items-center gap-1.5">
                    <span className="text-sm font-mono font-medium text-[var(--text-base-primary)]">
                      {s.name}
                    </span>
                    <CopyButton text={`p-${s.name}`} />
                  </div>
                  <span className="w-20 text-xs font-mono text-[var(--text-base-secondary)]">
                    {s.rem}
                  </span>
                  <span className="w-16 text-xs font-mono text-[var(--text-base-secondary)]">
                    {s.px}
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

        {/* ---- Border Radius ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Border Radius
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Border radius tokens control the roundness of corners across buttons, cards, inputs,
              and other surfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {borderRadii.map((r) => (
              <div
                key={r.name}
                className="group flex flex-col items-center gap-4 rounded-xl border border-[var(--borders-default)] p-5"
              >
                {/* Visual example */}
                <div
                  className="h-20 w-20 border-2 border-[var(--backgrounds-brand-strong-default)] bg-[var(--backgrounds-brand-lighter-default)]"
                  style={{ borderRadius: r.cssValue }}
                />

                {/* Token info */}
                <div className="text-center space-y-0.5">
                  <p className="text-sm font-medium text-[var(--text-base-primary)]">
                    {r.name}
                  </p>
                  <p className="text-xs font-mono text-[var(--text-base-secondary)]">
                    {r.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
