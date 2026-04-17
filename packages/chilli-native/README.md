# chilli-native

React Native + Expo design system for Chilli. Phase 1: foundations + 10 primitives, dark mode only, iOS + RN Web.

See `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md` (in the monorepo root) for the full design.

## Status

In active development. Public API is not stable until phase 1 is closed.

## Install (consumer side)

This package is consumed via local pnpm workspace link:

```json
{
  "dependencies": {
    "chilli-native": "workspace:*"
  }
}
```

It expects the consumer to provide:

- `react`, `react-native`, `expo` (SDK 54)
- `expo-blur`, `expo-font`
- `react-native-svg`
- `lucide-react-native`

## Conventions

- Foundations contain no JSX (tokens + helpers only).
- Primitives import only from foundations.
- All platform branching lives in `foundations/platform/`. No `Platform.select` in primitives.
- Dark mode only in phase 1.
