# Chilli Registry

The repository has a documentation registry in `lib/registry.ts`.

It is used by the Next.js docs route at `app/docs/[slug]/page.tsx` to render component pages, previews, install commands and API tables.

## Current Status

- Registry source: `lib/registry.ts`
- Component docs route: `app/docs/[slug]/page.tsx`
- Demo renderer: `components/docs/component-preview.tsx`
- Demo components: `components/demos/*`
- Install commands: stored per registry entry as `installCmd`

There is no local CLI implementation in this repository. The registry entries reference commands such as:

```bash
npx chilli@latest add button
```

Those commands are documented because they already exist in `lib/registry.ts`, but this repository does not include the CLI code that implements them.

## List Components

Use the docs site:

```bash
npm run dev
```

Then open `/docs/showcase` or any component page under `/docs/[slug]`.

For script access, read `components.manifest.json`.

## Install a Component

The registry currently documents install commands per component. Example:

```bash
npx chilli@latest add button
```

Use this only if the external `chilli` CLI is available in the target environment.

## Package vs Registry

Use the package entry point when the component library is installed as code:

```tsx
import { Button } from "../index";
```

Use the registry when copying or installing individual component files into another project.

## Dependencies Between Components

Dependencies are visible in the component source imports. Examples:

- `ActionInput` imports `Toggle`.
- `Select` imports `Dropdown` and `MenuItem`.
- `AvatarGroup` imports `Avatar`.
- `CampaignCard` uses identity and progress patterns internally.

## Update a Registry Entry

When a public component changes:

1. Update the component in `components/ui`.
2. Update or add demos in `components/demos`.
3. Update `lib/registry.ts`.
4. Update `COMPONENTS.md`.
5. Update `components.manifest.json`.
6. Run:

```bash
npm run check:docs
```

## Missing Registry Capabilities

- No local command lists registry entries.
- No local command installs a component.
- No dependency graph is generated.
- No update command exists.

Keep registry documentation factual until those tools exist.
