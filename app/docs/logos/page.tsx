"use client";

import { ChilliLogo } from "@/components/ui/chilli-logo";
import { AnimatedTitle } from "@/components/ui/animated-title";

/* ------------------------------------------------------------------ */
/*  Logos & Brand Guidelines page                                      */
/* ------------------------------------------------------------------ */

function DontCard({ description }: { description: string }) {
  return (
    <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
      <div className="flex items-center justify-center h-28 bg-[var(--backgrounds-neutral-primary-default)]">
        <div className="h-12 w-24 rounded-md border-2 border-dashed border-red-300 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-xs font-mono">logo</span>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-[var(--borders-default)]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="inline-block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            &times;
          </span>
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
            Don&apos;t
          </span>
        </div>
        <p className="text-xs text-[var(--text-base-secondary)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LogosPage() {
  return (
    <article>
      <header className="mb-10">
        <AnimatedTitle as="h1" className="text-[24px] font-bold tracking-tight text-[var(--text-base-primary)]">
          Logos
        </AnimatedTitle>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
          Brand guidelines for using the Chilli logo across products, marketing, and partner
          materials. Consistent usage protects brand recognition and visual trust.
        </p>
      </header>

      <div className="space-y-14">
        {/* ---- Logo Variants ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Logo Variants
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Three variants exist to fit different layout contexts. Always prefer the full logo
              when space allows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex items-center justify-center h-32 bg-[var(--backgrounds-neutral-primary-default)]">
                <ChilliLogo type="logo" size={140} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Logo</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Mark + wordmark. Primary usage.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex items-center justify-center h-32 bg-[var(--backgrounds-neutral-primary-default)]">
                <ChilliLogo type="symbol" size={64} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Symbol</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Round mark. Avatars, small surfaces.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex items-center justify-center h-32 bg-[var(--backgrounds-neutral-primary-default)]">
                <ChilliLogo type="favicon" size={48} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Favicon</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Simplified shape. Browser tabs, app icons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Clear Space ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Clear Space
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Maintain a minimum clear space equal to the height of the symbol around all sides of
              the logo. This ensures the logo remains legible and visually distinct.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] p-8 flex items-center justify-center">
            <div className="relative">
              {/* Clear space guides */}
              <div className="absolute -inset-8 rounded-xl border-2 border-dashed border-[var(--borders-brand-lighter)]" />

              {/* Dimension lines */}
              <div className="absolute -top-6 left-0 right-0 flex items-center justify-center">
                <span className="bg-[var(--backgrounds-neutral-primary-default)] px-1 text-[10px] font-mono text-[var(--text-brand-primary)]">
                  1x
                </span>
              </div>
              <div className="absolute -left-6 top-0 bottom-0 flex items-center justify-center">
                <span className="bg-[var(--backgrounds-neutral-primary-default)] px-1 text-[10px] font-mono text-[var(--text-brand-primary)] -rotate-90">
                  1x
                </span>
              </div>

              <div className="bg-[var(--backgrounds-base)] rounded-lg px-6 py-4 border border-[var(--borders-default)]">
                <ChilliLogo type="logo" size={120} />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Color Variations ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Color Variations
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Use the appropriate color variation based on background context.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Brand */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[var(--backgrounds-base)]">
                <ChilliLogo type="symbol" color="brand" size={56} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Brand</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Default. #FF4BEB.</p>
              </div>
            </div>

            {/* Black */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[#F5F5F5]">
                <ChilliLogo type="symbol" color="black" size={56} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Black</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Light surfaces. #140F14.</p>
              </div>
            </div>

            {/* White */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[#140F14]">
                <ChilliLogo type="symbol" color="white" size={56} />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">White</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Dark surfaces. #F5F5F5.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Minimum Sizes ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Minimum Sizes
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Never render the logo below the minimum sizes to preserve legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--borders-default)] p-6 flex flex-col items-center gap-3">
              <ChilliLogo type="logo" size={80} />
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--text-base-primary)]">Full Logo</p>
                <p className="text-[11px] font-mono text-[var(--text-base-secondary)]">
                  Min width: 80px
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] p-6 flex flex-col items-center gap-3">
              <ChilliLogo type="symbol" size={16} />
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--text-base-primary)]">Symbol</p>
                <p className="text-[11px] font-mono text-[var(--text-base-secondary)]">
                  Min size: 16 × 16px
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Don'ts ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
              Incorrect Usage
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Avoid these common misuses to maintain brand consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DontCard description="Do not stretch or distort the logo proportions." />
            <DontCard description="Do not rotate the logo at any angle." />
            <DontCard description="Do not change the logo colors outside the approved palette." />
            <DontCard description="Do not add drop shadows, outlines, or effects." />
            <DontCard description="Do not place the logo on busy or low-contrast backgrounds." />
            <DontCard description="Do not rearrange the mark and wordmark relationship." />
          </div>
        </section>

        {/* ---- Download ---- */}
        <section>
          <div className="rounded-xl border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] p-6">
            <h2 className="text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)] mb-2">
              Download Assets
            </h2>
            <p className="text-sm text-[var(--text-base-secondary)] mb-4">
              Logo assets are available in SVG and PNG formats for web, print, and marketing use.
              Contact the design team for access to the full brand kit.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-lg border border-[var(--borders-default)] bg-[var(--backgrounds-base)] px-4 py-2 text-sm font-medium text-[var(--text-base-secondary)]">
                SVG Pack (coming soon)
              </span>
              <span className="inline-flex items-center rounded-lg border border-[var(--borders-default)] bg-[var(--backgrounds-base)] px-4 py-2 text-sm font-medium text-[var(--text-base-secondary)]">
                PNG Pack (coming soon)
              </span>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
