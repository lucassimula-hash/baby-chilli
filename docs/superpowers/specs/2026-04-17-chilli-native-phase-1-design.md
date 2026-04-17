# Design — Chilli Native Design System (Phase 1)

**Date:** 2026-04-17
**Source:** `chilli-docs/` (Next.js documentation app for Chilli web design system)
**Target:** `packages/chilli-native/` (new React Native + Expo design system package)
**Phase 1 scope:** foundations + 10 primitives, dark mode only, iOS + RN Web.

---

## 1. Goals and non-goals

### Goals

- Adapt the Chilli web design system to React Native + Expo with a clean, native architecture rather than a copy of the web stack.
- Stand up foundations (tokens, platform helpers, fonts) and 10 primitive components in a self-contained, integration-ready package.
- Establish conventions (file structure, styling, accessibility, glass effect) that scale to phases 2 and beyond.
- Validate foundations through real primitive usage, not in isolation.

### Non-goals (Phase 1)

- Light theme. Dark only.
- Android (project targets iOS + Web).
- ThemeProvider / `useTokens()` hook (direct token import is sufficient while we have a single theme).
- Business components (CampaignCard, CampaignPage, ActionCtaCard, SupportCreatorCard, CampaignShowcase) — phase 3.
- Animation primitives (timing/spring helpers), haptics, breakpoint helpers — added when a real component requires them.
- Storybook, Jest unit tests — playground covers visual validation in phase 1.
- Web-only effects (`aurora-shader`, `animated-glow-card`, `animated-gradient-border`) — frozen until a screen demands them.

---

## 2. Constraints (binding rules)

1. No web-only dependency in the package (`lucide-react`, `framer-motion`, `class-variance-authority`, etc. are forbidden).
2. No Tailwind classes, no CSS variables in the final result.
3. Source design tokens, names, variants, and design intentions are preserved as faithfully as possible.
4. iOS conventions take priority where web behavior does not transfer (hover, tooltip-on-hover, etc.).
5. No new design tokens are invented when the source has an equivalent.
6. Foundations contain no JSX. Primitives import only foundations. Components (phase 3) import primitives + foundations. Dependencies never flow upward.
7. `Platform.select` only lives in `foundations/platform/`. Primitives consume helpers, never branch on `Platform.OS` directly.
8. Every divergence from the web source is documented (`CHANGELOG.md` entry + spec note).

---

## 3. Repository structure

`chilli-components/` becomes a pnpm workspaces monorepo. Two new packages, plus the existing `chilli-docs/` left untouched.

```
chilli-components/
├── pnpm-workspace.yaml
├── package.json                          # root, private
├── chilli-docs/                          # existing, unchanged
└── packages/
    ├── chilli-native/                    # design system package
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── README.md
    │   ├── CHANGELOG.md
    │   └── src/
    │       ├── foundations/
    │       │   ├── tokens/
    │       │   ├── theme.ts              # exports `tokens`
    │       │   ├── fonts.ts              # useLoadChilliFonts(), font assets
    │       │   └── platform/             # pressable.ts, shadow.ts
    │       ├── primitives/
    │       │   ├── _internal/
    │       │   │   └── GlassSurface/     # private, used by Button, IconButton
    │       │   ├── Text/
    │       │   ├── Button/
    │       │   ├── Icon/
    │       │   ├── IconButton/
    │       │   ├── Badge/
    │       │   ├── Chip/
    │       │   ├── Avatar/
    │       │   ├── AvatarGroup/
    │       │   ├── AvatarDuo/
    │       │   └── AvatarLabel/
    │       └── index.ts                  # public barrel
    └── chilli-native-playground/         # Expo app for visual validation
        ├── app.json
        ├── package.json
        ├── app/                          # expo-router screens, one per primitive
        └── ...
```

Decisions:

- pnpm workspaces, no Turborepo (two packages does not justify the extra tooling).
- Playground lives in its own package, not as a `example/` folder, so it can evolve independently.
- The package exports source TypeScript directly (`"main": "src/index.ts"`); transpilation handled by Metro/Expo at the consumer side. No bundler at this stage.
- Expo SDK target: **54** (aligned with the main Chilli app, currently `expo ^54.0.33`).

---

## 4. Foundations

### 4.1 Token model

Two layers, both exposed:

- **Primitive tokens** — direct mirror of source CSS variables (`--color-brand-800` → `colors.brand[800]`, `--space-6` → `spacing[6]`).
- **Semantic tokens** — derived from source semantic CSS variables (`--backgrounds-neutral-primary-default` → `backgrounds.neutral.primary.default`, `--btn-brand-bg-hover` → `buttons.brand.bgHover`).

Editorial rule: primitives consume **semantic** tokens by default. Primitive tokens are used only when no semantic token applies.

Naming conversion rule: kebab-case CSS → camelCase JS, with namespaces preserved (`backgrounds`, `text` exposed as `textColors` to avoid conflict with the Text component, `borders`, `iconColors`, `buttons`, `links`, `shadows`).

State variants `default` / `hover` / `pressed` are preserved on every semantic token group that defines them. iOS ignores hover; web (RN Web) uses it. The `pickStateful` helper resolves the right slot per platform and Pressable state.

### 4.2 File layout

```
foundations/
├── tokens/
│   ├── colors.ts            # primitives: brand, neutral, success, danger, warning, link, opacity, other
│   ├── spacing.ts           # 0..16
│   ├── radius.ts            # 0..8, full
│   ├── borderWidth.ts       # 0..7
│   ├── size.ts              # 1..16
│   ├── typography.ts        # fontSize, lineHeight, letterSpacing, fontFamily, textStyles
│   ├── backgrounds.ts       # semantic
│   ├── textColors.ts        # semantic
│   ├── borders.ts           # semantic
│   ├── iconColors.ts        # semantic
│   ├── buttons.ts           # semantic btn-*
│   ├── links.ts             # semantic
│   ├── shadows.ts           # semantic shadows (ShadowToken[])
│   └── index.ts
├── theme.ts                 # exports `tokens` aggregate + `Tokens` type
├── fonts.ts                 # useLoadChilliFonts(), fontAssets
└── platform/
    ├── pressable.ts         # InteractionState, resolveStateSlot, pickStateful
    ├── shadow.ts            # shadow(token) -> ViewStyle
    └── index.ts
```

### 4.3 Typography (option 2B)

Two layers:

- **Primitive scales** — direct mirror of source (`fontSize`, `lineHeight`, `letterSpacing`, `fontFamily`).
- **Pre-baked `textStyles`** — derived from observed usage in `chilli-docs/components/`. Each entry documented as an interpretation, not a source mirror. The `Text` primitive accepts `variant="bodyMd"` etc. for ergonomic consumption.

Rule: when the source and the `textStyles` derivation diverge, the source is the reference; `textStyles` adapts.

Initial set (refined at implementation time from source demos):
- `bodyXs` (12 / 16 / Inter / 500)
- `bodySm` (14 / 20 / Inter / 500)
- `bodyMd` (16 / 24 / Inter / 500)
- Headings: defined when first needed by a primitive (Text variants for now stay body-focused; headings added as soon as a demo requires them).

### 4.4 Public export surface

```ts
// foundations
export { tokens } from './foundations/theme';
export type { Tokens } from './foundations/theme';
export { shadow } from './foundations/platform/shadow';
export { pickStateful, resolveStateSlot } from './foundations/platform/pressable';
export type { InteractionState } from './foundations/platform/pressable';
export { useLoadChilliFonts, fontAssets } from './foundations/fonts';

// primitives (10)
export { Text } from './primitives/Text';
export { Button } from './primitives/Button';
export { Icon } from './primitives/Icon';
export { IconButton } from './primitives/IconButton';
export { Badge } from './primitives/Badge';
export { Chip } from './primitives/Chip';
export { Avatar } from './primitives/Avatar';
export { AvatarGroup } from './primitives/AvatarGroup';
export { AvatarDuo } from './primitives/AvatarDuo';
export { AvatarLabel } from './primitives/AvatarLabel';

// public types exported on demand (per primitive)
export type { ButtonProps } from './primitives/Button/Button.types';
// ...
```

---

## 5. Platform abstractions

All platform branching lives in `foundations/platform/`. Primitives never call `Platform.select`.

### 5.1 Interaction state — `Pressable`

`Pressable` is the single interactive primitive (no `TouchableOpacity`). Helpers in `pressable.ts`:

```ts
export type InteractionState = { pressed: boolean; hovered: boolean; focused: boolean };

export function resolveStateSlot(state: InteractionState): 'default' | 'hover' | 'pressed' {
  if (state.pressed) return 'pressed';
  if (Platform.OS === 'web' && (state.hovered || state.focused)) return 'hover';
  return 'default';
}

export function pickStateful<T>(
  values: { default: T; hover?: T; pressed?: T },
  state: InteractionState,
): T {
  const slot = resolveStateSlot(state);
  return values[slot] ?? values.default;
}
```

### 5.2 Shadows

Single helper normalizes iOS native shadow props and web `boxShadow`.

```ts
export type ShadowToken = {
  color: string;       // includes alpha
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;     // web only
};

export function shadow(token: ShadowToken): ViewStyle;
```

iOS branch: returns `{ shadowColor, shadowOffset, shadowOpacity: 1, shadowRadius: blur / 2 }`.
Web branch: returns `{ boxShadow: ... }`.

Shadow tokens (`tokens.shadows`) carry `offsetX/offsetY/blur` derived from observation of source demos. Values audited during Button implementation by side-by-side screenshot comparison.

### 5.3 Fonts

Strategy 3B (pragmatic, license-safe today):

- **Inter** — embedded as font files (`expo-font`). Required weights for phase 1: Regular, Medium, SemiBold, Bold (+ italics if any `Text` variant uses them; otherwise deferred until needed).
- **SF Pro Display** — referenced by name (`fontFamily: 'SF Pro Display'`). On iOS, resolved by the system (San Francisco). On Web, falls back through `'SF Pro Display, -apple-system, system-ui'`.

Re-evaluable: if SF Pro Display licensing for web is later clarified, switching to embedded files is a tokens-only change.

`useLoadChilliFonts()` exposed publicly. The package does not auto-load; consumer (playground or main app) calls the hook at root and gates on its result.

### 5.4 SVG

- **Icons** — `lucide-react-native`, passed by direct component reference (`<Icon source={Heart} />`). No registry layer in phase 1.
- **Logos** — generated as React components via `svgr` (no Metro transformer dependency).
- **Flags** — handled when the `FlagIcon` primitive moves to phase 2.

### 5.5 Glass effect — `expo-blur`

Real blur, not a translucent fill. Single dependency: `expo-blur`.

- iOS uses native `UIBlurEffect`.
- Web (RN Web) uses CSS `backdrop-filter: blur()` (Safari 9+, Chrome 76+, Firefox 103+).
- Browsers without `backdrop-filter` see a translucent solid (built-in `BlurView` fallback). Acceptable, documented.

Architecture: an internal primitive `_internal/GlassSurface/` (not exported publicly in phase 1). `Button` and `IconButton` compose it when `glass=true`.

```ts
type GlassSurfaceProps = {
  intensity?: number;       // default centralized in DEFAULT_GLASS_INTENSITY = 50
  tint?: 'light' | 'dark' | 'default';   // default 'dark'
  overlayColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
};
```

Composition rule: `Pressable` parent carries the shadow (no `overflow:hidden`); `GlassSurface` (nested, absolute fill) carries `overflow:hidden` and the rounded corners that clip the blur. Overlay color sits on top of the blur, not in place of it.

Glass on `variant="danger"` and `variant="danger-soft"`: not supported (source defines no glass-danger combination). When requested, the component emits a single deduplicated dev-only warning and renders the non-glass variant.

---

## 6. Primitive conventions

### 6.1 Folder per primitive

```
primitives/<Name>/
├── <Name>.tsx          # component + co-located StyleSheet
├── <Name>.types.ts     # extracted only when types exceed ~30 lines or are public
└── index.ts            # re-export
```

Trivial primitives (Badge, AvatarLabel) skip `.types.ts` and inline types in the `.tsx`.

### 6.2 Styling pattern

`StyleSheet.create` for static styles (layout, sizes, radius, padding). Inline style objects for the 1–2 props that depend on state (`backgroundColor`, `borderColor`).

```tsx
const styles = StyleSheet.create({
  base: { /* layout + radius + flex */ },
  size_xsm: { height: 28, paddingHorizontal: 8 },
  size_sm: { height: 32, paddingHorizontal: 8 },
  size_md: { height: 40, paddingHorizontal: 16 },
  size_lg: { height: 48, paddingHorizontal: 16, minWidth: 72 },
});
```

### 6.3 API conventions

- Props in camelCase. Variant values are string literals (no `cva`).
- `forwardRef` on interactive primitives (Button, Chip, IconButton). Skipped on visual primitives (Text, Badge, Avatar, AvatarGroup, AvatarDuo, AvatarLabel, Icon).
- `style` prop accepted everywhere, merged last.
- Variant and size names mirror source names (`primary`, `secondary`, `brand`, `ghost`, `danger`, `danger-soft`; `xsm`, `sm`, `md`, `lg`, etc.).
- Every interactive primitive sets `accessibilityRole` by default and accepts `accessibilityLabel`. `IconButton` requires `accessibilityLabel` in its prop type.

### 6.4 The 10 primitives (sketch APIs)

Built in this priority order:

1. **`Text`** — wrapper around RN `Text`; props: `variant?: keyof typeof textStyles`, `color?`, `align?`, `numberOfLines?`. Defaults: `variant="bodyMd"`, `color=tokens.textColors.basePrimary`.
2. **`Button`** — `variant: 'primary'|'secondary'|'brand'|'ghost'|'danger'|'danger-soft'`, `size: 'xsm'|'sm'|'md'|'lg'`, `glass?: boolean`, `loading?`, `leftIcon?`, `rightIcon?`, children. Loading shows `ActivityIndicator` in the left-icon slot.
3. **`Icon`** — `source: IconComponent` (passed directly), `size?: number`, `color?: string`. Default color `tokens.iconColors.neutralPrimary`.
4. **`IconButton`** — `Omit<ButtonProps, 'leftIcon'|'rightIcon'|'children'>` + `icon: IconComponent` + **required** `accessibilityLabel: string` + `size: 'sm'|'md'|'lg'` (square).
5. **`Badge`** — `label: string|number`, `variant: 'neutral'|'brand'|'danger'|'success'|'warning'`, `size: 'sm'|'md'`. Visual only, no ref.
6. **`Chip`** — `label`, `type: 'fill'|'light'`, `size: 'sm'|'md'|'lg'|'xl'`, `variant: 'default'|'avatar'|'social'`, `avatarSrc?`, `socialIcon?`, `onRemove?`. Interactive only when `onPress` or `onRemove` provided.
7. **`Avatar`** — `source?`, `initials?`, `size?: number|preset`, `ring?: boolean`, `backgroundColor?`. Initials fallback when source missing or fails to load.
8. **`AvatarGroup`** — `avatars: AvatarProps[]`, `size?`, `max?` (renders `+N` when exceeded), `overlap?: number`.
9. **`AvatarDuo`** — `primary: AvatarProps`, `secondary: AvatarProps`, `size?`. Final layout matched to source `chilli-docs/components/ui/avatar-duo.tsx` at implementation time.
10. **`AvatarLabel`** — `avatar: AvatarProps`, `title: string`, `subtitle?: string`, `size: 'sm'|'md'|'lg'`. Purely presentational, no interaction.

### 6.5 Documented divergences from source web

These divergences are conscious and accepted; each is repeated in `CHANGELOG.md`.

- `textStyles` are derived/interpreted from source usage; they are not a 1:1 mirror of CSS tokens.
- Shadow `offsetX/offsetY/blur` values are derived from source demo observation; the source CSS only specifies the color.
- Hover states are ignored on iOS (no equivalent input modality).
- `Tooltip` (hover-triggered on web) is out of scope for phase 1; when added in phase 2, it becomes a tap-triggered popover on iOS.
- Glass effect on `danger` and `danger-soft` button variants is unsupported (source has no token mapping).
- Backdrop blur is real (`expo-blur`) on both platforms; we do not approximate it via translucent fill.
- `Aurora-shader`, `animated-glow-card`, `animated-gradient-border` are deferred — they require a dedicated design when first needed by a real screen.

---

## 7. Playground

Separate Expo app: `packages/chilli-native-playground/`, using `expo-router`.

Per primitive, one route under `app/`:

```
app/
├── _layout.tsx           # root with useLoadChilliFonts() gate
├── index.tsx             # primitive index/links
├── text.tsx
├── button.tsx
├── icon.tsx
├── icon-button.tsx
├── badge.tsx
├── chip.tsx
├── avatar.tsx
├── avatar-group.tsx
├── avatar-duo.tsx
└── avatar-label.tsx
```

Each screen, scrollable, on `tokens.backgrounds.base`, contains the standard sections:

- **Variants × Sizes** — full grid of combinations, each labeled.
- **States** — default, hover (web only, with note when not applicable), pressed, disabled, loading where relevant.
- **Edge cases** — long text, no children, icon-only, missing source, etc.
- **Accessibility** — readable display of `accessibilityLabel` and `accessibilityRole` for each case.

Trivial primitives (Badge, AvatarLabel) may collapse or omit lighter sections; the four headers remain the standard frame.

---

## 8. Definition of Done — Phase 1

### Foundations

- [ ] All dark primitive tokens from source ported (`colors`, `spacing`, `radius`, `borderWidth`, `size`, `fontSize`, `lineHeight`, `letterSpacing`, `fontFamily`).
- [ ] All dark semantic tokens ported (`backgrounds`, `textColors`, `borders`, `iconColors`, `buttons`, `links`, `shadows`).
- [ ] `textStyles` defined and documented as a derived layer (with source reference per entry).
- [ ] `tokens` exported as a typed object with `Tokens` type derived via `as const`.
- [ ] `shadow()` helper works on iOS and RN Web.
- [ ] `pickStateful` and `resolveStateSlot` consumed by at least one primitive.
- [ ] `useLoadChilliFonts()` loads Inter weights (Regular, Medium, SemiBold, Bold + italics if used); SF Pro Display falls back to system.

### Primitives (each of the 10)

- [ ] Implemented per its sketch API (section 6.4).
- [ ] Playground screen covering variants × sizes × states.
- [ ] Reads styles from `tokens` (no hex literals in `.tsx`).
- [ ] No `Platform.select` (always via `foundations/platform/`).
- [ ] Accepts `style` prop, merged last.
- [ ] Interactive primitives set `accessibilityRole` by default and accept `accessibilityLabel` (`IconButton` requires `accessibilityLabel`).
- [ ] Presentational primitives do not expose unnecessary interactive accessibility semantics.

### Glass

- [ ] `GlassSurface` works on iOS (real `UIBlurEffect`) and Web (`backdrop-filter`).
- [ ] `Button glass` and `IconButton glass` render correctly with overlay color reactive to state.
- [ ] Unsupported glass combinations (`danger`, `danger-soft`) emit a single deduplicated dev-only warning and render the non-glass variant.

### Package & monorepo

- [ ] `pnpm-workspace.yaml` at `chilli-components/` root.
- [ ] `packages/chilli-native/` consumable from the main Chilli app via local link.
- [ ] `packages/chilli-native-playground/` boots on iOS and Web with `expo start`.
- [ ] Both packages aligned on Expo SDK 54.
- [ ] `package.json` includes no web-only dependency.
- [ ] TypeScript strict, build of `packages/chilli-native/` and `packages/chilli-native-playground/` produces no warnings (warnings elsewhere in the repo are out of scope for this checklist).

### Documentation

- [ ] `packages/chilli-native/README.md` — installation, conventions, public exports.
- [ ] `packages/chilli-native/CHANGELOG.md` — running journal of token decisions made during implementation.
- [ ] "Divergences vs web source" section listing each conscious divergence (textStyles, glass danger, hover ignored on iOS, etc.).

### Final manual validation

1. Visual comparison — for each primitive, screenshot of playground (iOS + Web) side by side with the corresponding `chilli-docs` demo. Notable divergences documented or fixed.
2. Light integration test — a "profile card" assembly screen in the playground using Button + Chip + Avatar + AvatarLabel + Badge. If composition is uncomfortable with current public exports, the API has a problem; fix before closing.
3. Integration test in main Chilli app (highly desirable, non-blocking) — local link, import a Button and a Chip, verify build and runtime. If externally blocked, becomes the first phase 2 action.

---

## 9. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `textStyles` miss a real source case. | Medium | Low | Re-read source demos as primitives are ported; extend `textStyles` and document at the same time. |
| `expo-blur` web fallback on very old Safari shows over-opaque background. | Low | Low | Acceptable, documented; no manual fallback implemented. |
| Inter font weights/italics missing in package assets. | Medium | Medium | Phase 1 requires Regular/Medium/SemiBold/Bold (+ italics where used). Final list pinned in implementation plan. |
| Shadow token mappings (offset/blur) deviate visually from source. | Medium | Medium | Side-by-side screenshot audit on the playground while implementing Button; tune shadow tokens at that step. |
| Expo SDK mismatch between playground and main Chilli app. | Low | High | Pin Expo SDK 54 from day one (matches main app `expo ^54.0.33`). |
| "Other" colors (`neonPink`, `electricMagenta`, …) are unused in phase 1 primitives and may drift. | Low | Low | Mirror source names exactly; if source renames, propagate. |

---

## 10. Cadence after phase 1

- Phase 2 priority order (by main-app demand): `Input`, `Textarea`, `SearchBar`, `Select`. Each gets its own brainstorm → spec → plan → implementation cycle.
- Frozen-until-needed list: `aurora-shader`, `animated-glow-card`, `animated-gradient-border`, business components (`CampaignCard`, `CampaignPage`, `ActionCtaCard`, `SupportCreatorCard`, `CampaignShowcase`).
- Every phase 2+ addition re-checks the phase 1 conventions: tokens-only colors in `.tsx`, no `Platform.select` outside foundations, accessibility defaults, etc.

### Scope-creep guard for phase 1

A new item is allowed into phase 1 only if **all three** are true:

1. A primitive in the validated list (Text → AvatarLabel) is blocked without it.
2. The addition is a token, a platform helper, or an internal primitive (not a new public component).
3. The addition takes less than half a day.

Otherwise: documented as deferred, not added.

---

## 11. Dependencies (phase 1)

Covers both the design system package (`packages/chilli-native/`) and the playground app (`packages/chilli-native-playground/`).

- `expo` (SDK 54)
- `react-native` (paired with SDK 54)
- `react-native-svg`
- `expo-font`
- `expo-blur`
- `expo-router` (playground routing)
- `lucide-react-native`
- `react` / `react-dom` (peer)
- `react-native-web` (peer; required in playground for web target)

Dev tooling for the package: `typescript`, `@types/react`, `svgr` (for logo SVG → React component conversion). No bundler; no test runner in phase 1.
