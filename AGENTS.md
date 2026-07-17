# Chilli Design System

This repository contains the official Chilli component documentation and local component library.

## Source of Truth

- `COMPONENTS.md` is the human-readable component inventory.
- `components.manifest.json` is the machine-readable inventory.
- `TOKENS.md` documents the available design tokens.
- `examples/` contains approved composition patterns.
- `index.ts` is the current local public entry point.
- `lib/registry.ts` powers the docs pages.

## Mandatory Rules

1. Inspect `COMPONENTS.md` before creating a component.
2. Inspect `components.manifest.json` before adding public API.
3. Do not duplicate an existing component or variant.
4. Reuse existing design tokens instead of arbitrary visual values.
5. Preserve public component APIs unless a breaking change is explicitly requested.
6. Do not introduce another UI library.
7. Public components must be exported from `index.ts`.
8. New public components must include:
   - typed props;
   - docs in `COMPONENTS.md`;
   - manifest metadata;
   - demos or stories;
   - accessibility notes;
   - tests when applicable.
9. Keep internal implementation details out of the public API.
10. Use the existing naming conventions and folder structure.
11. Run validation before finishing.

## Validation Commands

```bash
npm run check:docs
npm run typecheck
npm run lint
npm run build
```

## Public Imports

This repository is currently private and named `chilli-docs`. Until a published package name is configured, examples should import public components from the local entry point:

```tsx
import { Button } from "../index";
```

Do not import public components from `components/ui/*` in new examples.

## Internal Files

Do not import these from product code:

- `components/docs/*`
- `components/demos/*`
- `components/layout/*`
- `components/showcase/*`
- `lib/*` helpers unless a helper is explicitly documented

## Production Constraints

- Do not add preview-only switches to production code.
- Do not bypass authentication, authorization, feature flags, redirects or validation.
- For visual-only work, only change presentation.
- Review the diff before finishing.
