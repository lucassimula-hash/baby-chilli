export function ApiTable({ title, props }) {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold text-[var(--text-base-primary)]">
        {title}
      </h3>

      <div className="overflow-x-auto rounded-[16px] border border-[var(--borders-default)] bg-[var(--backgrounds-base)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--borders-default)] bg-[var(--backgrounds-neutral-primary-default)]">
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Prop
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Type
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Default
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-base-secondary)]">
                Description
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--borders-default)]">
            {props.map((prop) => (
              <tr
                key={prop.prop}
                className="transition-colors hover:bg-[var(--backgrounds-neutral-secondary-default)]"
              >
                <td className="px-4 py-2.5">
                  <code className="rounded-md bg-[var(--backgrounds-neutral-primary-default)] px-1.5 py-0.5 font-mono text-[12px] text-[var(--text-base-primary)]">
                    {prop.prop}
                  </code>
                </td>
                <td className="px-4 py-2.5">
                  <code className="font-mono text-[12px] text-[var(--text-base-secondary)]">
                    {prop.type}
                  </code>
                </td>
                <td className="px-4 py-2.5">
                  <code className="font-mono text-[12px] text-[var(--text-base-secondary)]">
                    {prop.default}
                  </code>
                </td>
                <td className="px-4 py-2.5 text-[13px] text-[var(--text-base-secondary)]">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
