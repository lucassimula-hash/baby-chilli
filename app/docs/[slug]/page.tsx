import { notFound } from "next/navigation";
import { getComponent, getAllSlugs } from "@/lib/registry";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ApiTable } from "@/components/docs/api-table";
import { InstallBlock } from "@/components/docs/install-block";
import { CodeBlock } from "@/components/docs/code-block";

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
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold text-[var(--text-base-primary)]">
        {component.name}
      </h1>
      <p className="text-[var(--text-base-secondary)] mb-8">
        {component.description}
      </p>

      {component.sections.map((section, index) => (
        <section key={index} className="mb-10">
          <h3 className="mb-4 text-xl font-semibold text-[var(--text-base-primary)]">
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
