"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { FlagIcon } from "@/components/ui/flag-icon";
import { FLAG_OPTIONS, type FlagCode } from "@/lib/flags.generated";
import { AnimatedTitle } from "@/components/ui/animated-title";

function FlagButton({
  code,
  label,
}: {
  code: FlagCode;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${code}`}
      className="group relative flex size-6 items-center justify-center rounded-full transition-transform duration-150 hover:scale-[1.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--borders-brand-default)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      <FlagIcon code={code} alt={`${label} flag`} />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-neutral-950)] px-2 py-1 text-[10px] font-medium leading-none text-white shadow-[0_8px_24px_rgba(20,15,20,0.16)] group-hover:flex">
        {copied ? (
          <span className="inline-flex items-center gap-1">
            <Check size={10} />
            copied
          </span>
        ) : (
          code
        )}
      </span>
    </button>
  );
}

export default function FlagsPage() {
  return (
    <article>
      <header className="mb-10">
        <AnimatedTitle as="h1" className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Flags
        </AnimatedTitle>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          Circular country flags used across the Chilli product for geo context, supporter stacks,
          and campaign UI. The library follows the 24px foundation from Figma. Click any flag to
          copy its country code.
        </p>
      </header>

      <section className="space-y-5">
        <div>
          <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
            Library
          </h2>
          <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
            230 circular flags imported from the Figma foundations library.
          </p>
        </div>

        <div className="rounded-[32px] border border-[var(--borders-default)] bg-white p-4 shadow-[0_16px_40px_rgba(20,15,20,0.04)] md:p-6">
          <div className="grid grid-cols-6 gap-x-8 gap-y-8 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-9">
            {FLAG_OPTIONS.map((flag) => (
              <div key={flag.code} className="flex items-center justify-center">
                <FlagButton code={flag.code} label={flag.label} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
