import type { ReactNode } from "react";
import { InstallBlock } from "@/components/docs/install-block";
import { PageHeader } from "@/components/docs/page-header";

const registryBaseUrl = "https://design.chilli.app/r";

const components = [
  { name: "Button", slug: "button" },
  { name: "Input", slug: "input" },
  { name: "Action CTA Card", slug: "action-cta-card" },
];

function Section({
  title,
  children,
  className = "mb-8",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`scroll-mt-24 ${className}`}>
      <h3 className="mb-5 text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 max-w-[570px] text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
      {children}
    </p>
  );
}

export default function InstallationPage() {
  return (
    <div className="min-w-0 flex-1">
      <PageHeader currentSlug="installation" title="Installation" />
      <p className="mb-12 max-w-[570px] text-[14px] leading-relaxed text-[var(--text-base-secondary)]">
        Add Chilli components one by one with registry commands. This keeps the
        Expo + React Native Web app stable while the design system is adopted
        progressively.
      </p>

      <Section title="Install one component">
        <Paragraph>
          Start with the smallest component that unlocks the product work. The
          command copies only that component and the shared files it needs.
        </Paragraph>
        <InstallBlock
          command={`npx shadcn@latest add ${registryBaseUrl}/button.json`}
        />
      </Section>

      <Section title="Use it locally">
        <Paragraph>
          Import the generated component from the local app codebase. Keep the
          first usage narrow until it has been checked in the real Chilli flow.
        </Paragraph>
        <InstallBlock command={'import { Button } from "@/components/ui/button";'} />
      </Section>

      <Section title="Add more later">
        <Paragraph>
          Add the next component only after the previous one is visually and
          functionally verified on iOS, Android and Web.
        </Paragraph>
        <div className="grid gap-3">
          {components.map((component) => (
            <InstallBlock
              key={component.slug}
              command={`npx shadcn@latest add ${registryBaseUrl}/${component.slug}.json`}
            />
          ))}
        </div>
      </Section>

      <Section title="Registry status" className="mt-16 mb-10">
        <Paragraph>
          These commands document the target installation flow for the Chilli
          registry. The registry URL must be hosted before another project can
          install components from it.
        </Paragraph>
      </Section>
    </div>
  );
}
