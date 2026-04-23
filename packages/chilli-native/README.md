# chilli-native

React Native + Expo design system for Chilli. **Phase 6 is shipped**: foundations + 35 primitives, dark mode only, iOS + Android + RN Web.

> Phase 1 spec: `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md`
> Phase 1 plan: `docs/superpowers/plans/2026-04-17-chilli-native-phase-1-plan.md`

## Status

The code for phase 1 is in place and the playground bundles successfully on web. Final sign-off still requires:

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

Phase 1:

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

Phase 2 (form / navigation):

- `Input`
- `Textarea`
- `SearchBar`
- `Select` (platform-responsive: anchored popover on web, bottom sheet on iOS/Android)

Phase 3 (state controls):

- `Toggle` (tap + drag, press-extend via transform scale)
- `Radio` + `RadioGroup` (vertical / horizontal)
- `Checkbox` (checked, indeterminate, number badge)

Phase 4 (navigation):

- `AccordionGroup` + `AccordionItem` (single-open, animated height)
- `Tabs` (pill / underline / segmented × sm / md / lg)
- `Dropdown` + `MenuItem` (low-level menu primitives, also consumed by `Select` and `Menu`)
- `Menu` (render-prop trigger + platform-responsive presentation: anchored popover on web, bottom sheet on iOS / Android)

Phase 5 (feedback + advanced inputs):

- `ProgressBar` (segmented bar, sm / md / lg, optional label right or bottom)
- `Tooltip` (hover on web via `react-dom` portal, long-press on mobile via `Modal`)
- `NumberInput` (multi-cell OTP / verification-code input)
- `DatePicker` (single-month calendar with min / max bounds; `default` surface only)

Phase 6 (form / auth / action helpers):

- `FormTitle` (large 24/32 SF Pro Display Semibold centered title input — Figma "ActionFormTitle")
- `FlagIcon` (200+ ISO country flags from Figma S3 CDN)
- `SocialButton` (apple / google / facebook / apple-pay with built-in brand SVGs)
- `SelectDatePicker` (343 px display card with start / end timeline)
- `ActionInput` (glass card with label inside, optional avatar / toggle / right icon)
- `ActionTextarea` (prompt + textarea, glass + non-glass variants)
- `ActionNavigation` (modal/screen header, mobile / desktop variants, scrolled `BlurView`)

Each primitive exports its props type as `<Name>Props`. `Select` also exports `SelectOption`, `SelectSize`, `SelectVariant`. `Radio` exports `RadioGroupProps`, `RadioSize`, `RadioOrientation`. `Toggle` exports `ToggleSize`. `Checkbox` exports `CheckboxSize`. `Tabs` exports `TabItem`, `TabsType`, `TabsSize`. `Menu` exports `MenuOption`, `MenuTriggerProps`. `Dropdown` exports `DropdownSize`, `DropdownContextValue`. `ProgressBar` exports `ProgressBarSize`, `ProgressBarLabelPosition`. `Tooltip` exports `TooltipSide`. `FlagIcon` re-exports `FlagCode`, `FLAG_URLS`, `FLAG_OPTIONS`. `SocialButton` exports `SocialProvider`, `SocialButtonVariant`. `ActionNavigation` exports `ActionNavigationVariant`.

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
- The current body text presets (`bodyXs`, `bodySm`, `bodyMd`) use `Inter-Regular` by design-system decision.
- Hover states are ignored on iOS.
- Glass effect on `danger` and `danger-soft` button variants is unsupported and falls back to non-glass.
- `buttons.ghost` does not exist as a token group; the primitive composes it from `backgrounds` + `textColors`.
- `IconButton` follows the native phase-1 button API (`primary`, `secondary`, `brand`, `ghost`, `danger`, `danger-soft`) instead of mirroring the narrower web docs surface (`primary`, `secondary`, `transparent`).
- `IconButton` ships only `sm` / `md` / `lg` square sizes in native phase 1; the web docs also show `xsm`.
- `GlassSurface` is internal only in phase 1.
- `Select` trigger ships a single trailing chevron; the web source has two `<ChevronDown>` in the trigger JSX, read here as a copy-paste artifact and corrected in native.
- `Select` menu presentation: web uses an anchored popover via transparent `Modal` + `measureInWindow` (functional equivalent of `createPortal`); iOS/Android use a bottom sheet, not a popover, as the idiomatic mobile pattern.
- `Input`, `Textarea`, and `Select` expose a `disabled` prop with consistent native semantics; this is a superset of the web demo surface.
- `Dropdown` / `MenuItem` highlight tracks the currently checked item (and animates to the tapped item on press). Web tracks hover; that interaction model does not map to touch.
- `Toggle`, `Radio`, `Checkbox`: label + description unified on `bodySm` (P3, `Inter-Regular` 14/20) regardless of size; web uses `font-medium` labels and size-scaled type with 12px descriptions.
- `Toggle` press-extend animates the thumb via `transform: scaleX/scaleY` (native driver) rather than width/height. Hover pill-extension is omitted (no hover model on touch).
- `Radio` / `Checkbox`: focus-visible ring is omitted (no keyboard focus pattern targeted in phase 3).
- `AccordionGroup` is single-open only (no `multiple` mode, no array `defaultValue`); web source supports both.
- `Accordion` title weight stays `Inter-Regular` regardless of open state — color differentiates state instead of weight.
- `Tabs` highlight is selection-driven only (no hover); the `underline` type drops the source's `-mb-px` overlap trick.
- `Menu` is native-only: bundles trigger + anchored-popover (web) + bottom-sheet (mobile) behind a single API. Web source exposes `Dropdown` + `MenuItem` raw and leaves wiring to the consumer.
- `Select` is not yet refactored to consume the shared `Menu` presentation; keeps its inline copy for now.
- `Tooltip` web rendering uses `react-dom` `createPortal` (into `document.body`, `position: fixed`) rather than RN Modal; Modal triggers a scroll lock on web that causes flicker. Native iOS / Android still use RN Modal.
- `Tooltip` API takes the trigger as a `children` element wrapped in a measurement View — clearer than the source web's `cloneElement`-injected handlers.
- `DatePicker` ships only the `default` surface variant; the web source's `type='glass'` (backdrop-blur card) is omitted for this version.
- `DatePicker` does not yet ship the `SelectDatePicker` companion display widget (start / end pills + timeline). Tracking as a Phase 6 candidate.

## Validation State

Already validated:

- `pnpm --filter chilli-native typecheck`
- `pnpm --filter chilli-native-playground typecheck`
- `pnpm --filter chilli-native-playground exec expo export --platform web`
- one playground screen per primitive
- one profile-card assembly screen
- side-by-side visual audit against `chilli-docs`
- sanity import in an isolated consumer (`npm pack` → third-party tsconfig strict) against hub-aligned peer dep versions (Expo 54, RN 0.81.5, react-native-svg 15.12.1, expo-blur 15.0.8, expo-font 14.0.8, React 19.1) — all public primitives, `tokens`, `useLoadChilliFonts`, and `SelectOption` type resolve with zero errors

Still manual / pending:

- native iOS verification of real blur on glass buttons
- actual integration inside the hub app — blocked on adding `lucide-react-native` to hub's deps (peer dep of chilli-native, not currently present in hub/package.json)

## Roadmap

Phase 2 (form / navigation) shipped: `Input`, `Textarea`, `SearchBar`, `Select`.

Phase 3 (state controls) shipped: `Toggle`, `Radio`, `RadioGroup`, `Checkbox`.

Phase 4 (navigation) shipped: `AccordionGroup` / `AccordionItem`, `Tabs`, `Dropdown` / `MenuItem` (now public), `Menu`.

Phase 5 (feedback + advanced inputs) shipped: `ProgressBar`, `Tooltip`, `NumberInput`, `DatePicker`.

Phase 6 (form / auth / action helpers) shipped: `FormTitle`, `FlagIcon`, `SocialButton`, `SelectDatePicker`, `ActionInput`, `ActionTextarea`, `ActionNavigation`.

Phase 7 candidates (not yet scoped): `PageNavigation`, `BreakpointSwitch`, `ThinkingIndicator`, `CauseChip`, `DatePicker` `glass` variant, internal refactor pass to make `Select` consume the shared `Menu` presentation. Skipped (out-of-scope as primitives): `ActionCtaCard`, `CauseInput` (deprecated upstream).
