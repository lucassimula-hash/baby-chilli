"use client";

/* ------------------------------------------------------------------ */
/*  Logos & Brand Guidelines page                                      */
/* ------------------------------------------------------------------ */

function LogoPlaceholder({
  label,
  wide = false,
  dark = false,
}: {
  label: string;
  wide?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed ${
        dark
          ? "border-[var(--borders-neutral-bolder)] bg-[var(--backgrounds-neutral-inverse-default)]"
          : "border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)]"
      } ${wide ? "h-32 col-span-full" : "h-32"}`}
    >
      <span
        className={`text-sm font-medium ${
          dark ? "text-[var(--text-base-disabled)]" : "text-[var(--text-base-secondary)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

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
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Logos
        </h1>
        <p className="mt-2 text-base text-[var(--text-base-secondary)] max-w-2xl leading-relaxed">
          Brand guidelines for using the Chilli logo across products, marketing, and partner
          materials. Consistent usage protects brand recognition and visual trust.
        </p>
      </header>

      <div className="space-y-14">
        {/* ---- Logo Variants ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
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
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-[var(--backgrounds-brand-strong-default)]" />
                  <span className="text-xl font-bold text-[var(--text-base-primary)]">Chilli</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Full Logo</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Mark + wordmark. Primary usage.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex items-center justify-center h-32 bg-[var(--backgrounds-neutral-primary-default)]">
                <div className="h-10 w-10 rounded-lg bg-[var(--backgrounds-brand-strong-default)]" />
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Mark</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Icon only. Favicons, app icons, avatars.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex items-center justify-center h-32 bg-[var(--backgrounds-neutral-primary-default)]">
                <span className="text-2xl font-bold text-[var(--text-base-primary)]">Chilli</span>
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Wordmark</p>
                <p className="text-xs text-[var(--text-base-secondary)]">
                  Text only. Navigation, footers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Clear Space ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Clear Space
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Maintain a minimum clear space equal to the height of the mark around all sides of
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

              {/* Logo placeholder */}
              <div className="flex items-center gap-3 bg-[var(--backgrounds-base)] rounded-lg px-6 py-4 border border-[var(--borders-default)]">
                <div className="h-8 w-8 rounded-lg bg-[var(--backgrounds-brand-strong-default)]" />
                <span className="text-lg font-bold text-[var(--text-base-primary)]">Chilli</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Color Variations ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Color Variations
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Use the appropriate color variation based on background context.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Default */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[var(--backgrounds-base)]">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-[var(--backgrounds-brand-strong-default)]" />
                  <span className="text-lg font-bold text-[var(--text-base-primary)]">Chilli</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Default</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Light backgrounds</p>
              </div>
            </div>

            {/* Inverse */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[var(--backgrounds-neutral-inverse-default)]">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-[var(--backgrounds-brand-strong-default)]" />
                  <span className="text-lg font-bold text-[var(--text-inverse)]">Chilli</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Inverse</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Dark backgrounds</p>
              </div>
            </div>

            {/* Monochrome */}
            <div className="rounded-xl border border-[var(--borders-default)] overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-[var(--backgrounds-neutral-secondary-default)]">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-[var(--backgrounds-neutral-inverse-default)]" />
                  <span className="text-lg font-bold text-[var(--text-base-primary)]">Chilli</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-[var(--borders-default)]">
                <p className="text-sm font-medium text-[var(--text-base-primary)]">Monochrome</p>
                <p className="text-xs text-[var(--text-base-secondary)]">Single-color contexts</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Minimum Sizes ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
              Minimum Sizes
            </h2>
            <p className="mt-1 text-sm text-[var(--text-base-secondary)]">
              Never render the logo below the minimum sizes to preserve legibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--borders-default)] p-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded bg-[var(--backgrounds-brand-strong-default)]" />
                <span className="text-xs font-bold text-[var(--text-base-primary)]">Chilli</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--text-base-primary)]">Full Logo</p>
                <p className="text-[11px] font-mono text-[var(--text-base-secondary)]">
                  Min width: 80px
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--borders-default)] p-6 flex flex-col items-center gap-3">
              <div className="h-5 w-5 rounded bg-[var(--backgrounds-brand-strong-default)]" />
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--text-base-primary)]">Mark</p>
                <p className="text-[11px] font-mono text-[var(--text-base-secondary)]">
                  Min size: 16 x 16px
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Don'ts ---- */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--text-base-primary)]">
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
            <h2 className="text-lg font-semibold text-[var(--text-base-primary)] mb-2">
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
