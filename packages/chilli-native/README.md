# chilli-native

React Native + Expo design system for Chilli. **Phase 1 implementation is complete**: foundations + 10 primitives, dark mode only, iOS + RN Web.

> Spec: `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md`
> Plan: `docs/superpowers/plans/2026-04-17-chilli-native-phase-1-plan.md`

## Status

The code for phase 1 is in place and the playground bundles successfully on web. Final sign-off still requires:

- the manual visual audit against `chilli-docs`
- the iOS glass-blur check
- the main-app integration sanity check

Until those are done, treat the package as **implementation complete, sign-off pending**.

## Install (consumer side)

The package is consumed via local pnpm workspace link:

```json
{
  "dependencies": {
    "chilli-native": "workspace:*"
  }
}
```

Required peer dependencies on the consumer side:

- `react`, `react-native`, `expo` (SDK 54)
- `expo-blur`, `expo-font`
- `react-native-svg`
- `lucide-react-native`

## Public API

### Foundations

- `tokens` — aggregated tokens object. Type: `Tokens`.
- Individual token groups for convenience:
  - `colors`, `spacing`, `radius`, `borderWidth`, `size`
  - `fontSize`, `lineHeight`, `letterSpacing`, `fontFamily`, `textStyles`
  - `backgrounds`, `textColors`, `borders`, `iconColors`, `buttons`, `links`, `shadows`
- `useLoadChilliFonts()` — `expo-font` hook returning `[loaded, error]`
- `fontAssets` — raw font asset map
- `pickStateful(values, state)` — resolves `default` / `hover` / `pressed`
- `resolveStateSlot(state)` — returns the slot key only
- `shadow(token)` — converts a `ShadowToken` to a platform-appropriate `ViewStyle`

### Primitives

- `Text`
- `Button`
- `Icon`
- `IconButton`
- `Badge`
- `Chip`
- `Avatar`
- `AvatarGroup`
- `AvatarDuo`
- `AvatarLabel`

Each primitive exports its props type as `<Name>Props`.

## Conventions

- Foundations contain no JSX.
- Primitives import only from foundations and other primitives.
- `Platform.select` / `Platform.OS` are restricted to `foundations/platform/`.
- Dark mode only in phase 1.
- All hex literals live in `foundations/tokens/`.
- Variant and size names mirror the source web design system where applicable.

## Divergences vs web source

Full details live in `CHANGELOG.md`. The main intentional divergences are:

- `textStyles` is a derived layer on top of the source typography scales, not a 1:1 CSS mirror.
- Runtime font family names are explicit (`Inter-Regular`, `Inter-Medium`, `Inter-SemiBold`) to match `expo-font`.
- Hover states are ignored on iOS.
- Glass effect on `danger` and `danger-soft` button variants is unsupported and falls back to non-glass.
- `buttons.ghost` does not exist as a token group; the primitive composes it from `backgrounds` + `textColors`.
- `GlassSurface` is internal only in phase 1.

## Validation State

Already validated:

- `pnpm --filter chilli-native typecheck`
- `pnpm --filter chilli-native-playground typecheck`
- `pnpm --filter chilli-native-playground exec expo export --platform web`
- one playground screen per primitive
- one profile-card assembly screen

Still manual / pending:

- side-by-side visual audit against `chilli-docs`
- native iOS verification of real blur on glass buttons
- sanity import inside the main Chilli app

## Phase 2 priority

Priority order for the next phase:

1. `Input`
2. `Textarea`
3. `SearchBar`
4. `Select`
