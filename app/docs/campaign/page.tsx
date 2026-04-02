export default function ShowcasePage() {
  return (
    <article className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-base-primary)]">
          Showcase
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--text-base-secondary)]">
          This page is reserved for featured prototype and showcase explorations built with the
          Chilli design system.
        </p>
      </header>

      <section className="rounded-3xl border border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)] p-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--text-base-primary)]">
            Showcase content is ready to be added here.
          </p>
          <p className="text-sm leading-6 text-[var(--text-base-secondary)]">
            Use this space for curated flows, marketing explorations, or polished UI compositions
            that sit outside the component-by-component documentation.
          </p>
        </div>
      </section>
    </article>
  );
}
