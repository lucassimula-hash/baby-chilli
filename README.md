# Chilli Design System

Chilli Design System is the component documentation and local component library for Chilli product surfaces.

The repository is currently a private Next.js docs app. Components live in `components/ui`, demos live in `components/demos`, and the local public entry point is `index.ts`.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Minimal Import

```tsx
import { Button } from "../index";

export function Example() {
  return <Button>Continue</Button>;
}
```

## Main Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run check:docs
```

## Documentation

- Component inventory: `COMPONENTS.md`
- Machine-readable manifest: `components.manifest.json`
- Design tokens: `TOKENS.md`
- Registry notes: `REGISTRY.md`
- Composition examples: `examples/`
- Docs app registry: `lib/registry.ts`

## Contribution Rules

1. Reuse existing components before creating new ones.
2. Reuse existing tokens before adding visual values.
3. Preserve public APIs unless a breaking change is explicitly requested.
4. Export public components from `index.ts`.
5. Keep internal helpers out of the public API.
6. Update docs, manifest and examples when public components change.
7. Run validation before finishing.

## Storybook

No Storybook setup is present in this repository today. Current component previews are rendered through the Next.js docs app.
