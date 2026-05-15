import { notFound } from "next/navigation";
import { getComponent, getAllSlugs } from "@/lib/registry";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ApiTable } from "@/components/docs/api-table";
import { InstallBlock } from "@/components/docs/install-block";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponent(slug);

  if (!component) {
    notFound();
  }

  return (
    <div className="min-w-0 flex-1">
      <PageHeader currentSlug={slug} title={component.name} />
      <p className="mb-12 text-[14px] text-[var(--text-base-secondary)]">
        {component.description}
      </p>

      {component.sections.map((section, index) => (
        <section
          key={index}
          id={slugify(section.title)}
          className={`scroll-mt-24 ${
            section.type === "api" ? "mt-16 mb-10" : "mb-8"
          }`}
        >
          <h3 className="mb-5 text-[16px] leading-[24px] font-semibold font-[family-name:var(--font-family-primary)] text-[var(--text-base-primary)]">
            {section.title}
          </h3>

          {section.type === "install" && (
            <InstallBlock command={component.installCmd} />
          )}

          {section.type === "preview" && (
            <ComponentPreview
              title={section.title}
              componentName={component.name}
              demoKey={section.demoKey}
              demoCode={section.demoCode}
            />
          )}

          {section.type === "api" &&
            component.apiTables.map((table, tableIndex) => (
              <ApiTable key={tableIndex} {...table} />
            ))}
        </section>
      ))}
    </div>
  );
}
