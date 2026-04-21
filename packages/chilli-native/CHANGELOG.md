# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [0.2.0] — Phase 2

### Added

- Primitives: `Input`, `Textarea`, `SearchBar`, `Select`.
- Internal primitives `_internal/Dropdown` and `_internal/MenuItem` (not exported publicly). Consumed by `Select`; kept internal for future reuse (context menus, filters, etc.), mirroring the `GlassSurface` pattern.
- `Select` presentation is platform-responsive: anchored popover on web (`Modal` + `measureInWindow`), bottom sheet on iOS/Android.
- Playground screens for each new primitive.

### Divergences from source web

- `Input`: adds `disabled` state styling that mirrors the web variant semantics; zero vertical padding on the underlying `TextInput` to prevent RN default paddings from shifting text baseline.
- `Textarea`: adds `error` and `disabled` states beyond the web demos (web only shows default/focused/filled/disabled via native HTML); native API is consistent with `Input` for form-field cohesion.
- `SearchBar`: mirrors strict source web (default + focused only, no label/helperText/error). Mobile-friendly defaults baked in (`returnKeyType="search"`, `autoCorrect=false`, `autoCapitalize="none"`, `clearButtonMode="never"`, `accessibilityRole="search"`), all overridable via props.
- `Select` (trigger): single trailing chevron. Web source renders two `<ChevronDown>` in the trigger JSX, which reads as a copy-paste artifact; native ships the corrected design.
- `Select` (trigger): adds `disabled` prop (absent from web source) for API consistency with `Input` / `Textarea`.
- `Select` (menu): dropdown/sheet presentation diverges from web. Web uses `createPortal` with fixed positioning; RN Web uses a transparent `Modal` + `measureInWindow` to produce the same visual outcome. iOS/Android receive a bottom-sheet presentation (idiomatic mobile pattern), not a popover.
- `Select` highlight behavior: web tracks hover to slide a highlight bar between items; native has no hover, so the highlight is initialized on the currently checked item and animates on tap before selection resolves.

## [0.1.0] — Phase 1

### Added

- Foundations: primitive tokens, semantic tokens, `tokens`, `pickStateful`, `resolveStateSlot`, `shadow()`, `useLoadChilliFonts()`.
- Primitives: `Text`, `Button`, `Icon`, `IconButton`, `Badge`, `Chip`, `Avatar`, `AvatarGroup`, `AvatarDuo`, `AvatarLabel`.
- Internal primitive `GlassSurface` (not exported publicly).
- Playground app with one screen per primitive plus a `profile-card` assembly screen.

### Sign-off still pending

- Native iOS verification of the glass blur effect is still pending.
- Phase 21 main-app integration sanity check is still pending.
- Phase 20 visual audit against `chilli-docs` was completed locally.
- Phase 21 main-app integration is currently deferred from this session because the main app repo is not accessible from the active workspace sandbox.

- Internal primitive `GlassSurface` (`primitives/_internal/GlassSurface/`) introduced. Not exported publicly in phase 1. Powered by `expo-blur`'s `BlurView`. Default intensity centralized as `DEFAULT_GLASS_INTENSITY = 50`. Button (Phase 10) and IconButton (Phase 12) will consume it internally for the `glass` prop.
- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Current mapping: bodyXs → 12/16/Inter-Regular, bodySm → 14/20/Inter-Regular, bodyMd → 16/24/Inter-Regular. Headings deferred until first needed.
- Two-layer convention for fonts in this design system:
  - `fontFamily.secondary = 'Inter'` is a **design token** (mirror of source `--font-family-secondary: Inter`). Preserved as-is for source fidelity.
  - `textStyles.fontFamily` values are **runtime family names** registered by `expo-font` (e.g., `'Inter-Regular'`, `'Inter-Medium'`). They match the per-weight registration pattern used in the main chilli app (`hub/src/components/custom_text/inter.tsx`).
  - The runtime layer is necessarily weight-explicit because `expo-font` resolves family names by exact key — there is no automatic weight-to-variant mapping.
  - Consequence: changing weight in a textStyle requires referencing a different runtime family key (`'Inter-Regular'`, `'Inter-SemiBold'`), not a `fontWeight` override.
- Body text styles were later adjusted from `Inter-Medium` to `Inter-Regular` as a deliberate design-system decision. This is a visual decision, not a runtime workaround.
- Retroactive correction applied to `typography.ts` after Task 2.3 was committed: `textStyles` originally used `fontFamily: fontFamily.secondary` (= `'Inter'`) + `fontWeight: '500'`. That pattern would have failed silently at runtime (system fallback) because the main app's `useFonts` does not register `'Inter'` as a key. Fix: per-weight runtime family names + remove `fontWeight`. Applied before Phase 5 execution to avoid carrying a known bug forward.
- `buttons.ghost` intentionally NOT defined in semantic tokens. Source design system does not define `--btn-ghost-*` variables. Web Button composes ghost variant from `--backgrounds-neutral-secondary-*` + `--text-base-secondary`. Phase 10 Button primitive must handle `variant === 'ghost'` as a special case (compose from `backgrounds.neutral.secondary` and `textColors.baseSecondary`), rather than via `tokens.buttons[variant]` lookup.
- `IconButton` intentionally reuses the native `ButtonVariant` model (`primary`, `secondary`, `brand`, `ghost`, `danger`, `danger-soft`) instead of mirroring the current web docs API (`primary`, `secondary`, `transparent`). This keeps the native primitive aligned with the rest of the phase-1 button system, but it is a documented divergence from the current web source surface.
- `IconButton` keeps square sizes limited to `sm` / `md` / `lg` in native phase 1. The web docs currently expose an additional `xsm` size; that smaller size is not shipped in the native primitive.
- `shadows.lighter` — color mirrored from source `--shadow-color-lighter` (`rgba(0, 0, 0, 0.56)`). Offset/blur are DERIVED from observation of source demos (source defines color-only for this token). To be re-tuned during Button implementation (Phase 10) by visual side-by-side comparison.
- `shadows.brandModerate` and `shadows.dangerModerate` — ALL fields mirrored from the source `.dark` block. Source stores these two shadows as full CSS box-shadow shorthand (`0 4px 14px -2px rgba(...)`), so offset/blur/spread are source-specified, NOT derived. Note: dark-block colors differ from the light `:root` block (alpha 0.20 vs 0.34; danger uses `rgba(244, 85, 85, ...)` in dark, `rgba(240, 68, 56, ...)` in light).
