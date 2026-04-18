# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [Unreleased]

- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Mapping: bodyXs → 12/16/Inter-Medium, bodySm → 14/20/Inter-Medium, bodyMd → 16/24/Inter-Medium. Headings deferred until first needed.
- Two-layer convention for fonts in this design system:
  - `fontFamily.secondary = 'Inter'` is a **design token** (mirror of source `--font-family-secondary: Inter`). Preserved as-is for source fidelity.
  - `textStyles.fontFamily` values are **runtime family names** registered by `expo-font` (e.g., `'Inter-Medium'`). They match the per-weight registration pattern used in the main chilli app (`hub/src/components/custom_text/inter.tsx`).
  - The runtime layer is necessarily weight-explicit because `expo-font` resolves family names by exact key — there is no automatic weight-to-variant mapping. So `'Inter-Medium'` in `textStyles` is not an arbitrary divergence from the design token; it is the runtime address of the same Inter family at weight 500.
  - Consequence: changing weight in a textStyle requires referencing a different runtime family key (`'Inter-Regular'`, `'Inter-SemiBold'`), not a `fontWeight` override.
- Retroactive correction applied to `typography.ts` after Task 2.3 was committed: `textStyles` originally used `fontFamily: fontFamily.secondary` (= `'Inter'`) + `fontWeight: '500'`. That pattern would have failed silently at runtime (system fallback) because the main app's `useFonts` does not register `'Inter'` as a key. Fix: per-weight runtime family names + remove `fontWeight`. Applied before Phase 5 execution to avoid carrying a known bug forward.
- `buttons.ghost` intentionally NOT defined in semantic tokens. Source design system does not define `--btn-ghost-*` variables. Web Button composes ghost variant from `--backgrounds-neutral-secondary-*` + `--text-base-secondary`. Phase 10 Button primitive must handle `variant === 'ghost'` as a special case (compose from `backgrounds.neutral.secondary` and `textColors.baseSecondary`), rather than via `tokens.buttons[variant]` lookup.
- `shadows.lighter` — color mirrored from source `--shadow-color-lighter` (`rgba(0, 0, 0, 0.56)`). Offset/blur are DERIVED from observation of source demos (source defines color-only for this token). To be re-tuned during Button implementation (Phase 10) by visual side-by-side comparison.
- `shadows.brandModerate` and `shadows.dangerModerate` — ALL fields mirrored from the source `.dark` block. Source stores these two shadows as full CSS box-shadow shorthand (`0 4px 14px -2px rgba(...)`), so offset/blur/spread are source-specified, NOT derived. Note: dark-block colors differ from the light `:root` block (alpha 0.20 vs 0.34; danger uses `rgba(244, 85, 85, ...)` in dark, `rgba(240, 68, 56, ...)` in light).
