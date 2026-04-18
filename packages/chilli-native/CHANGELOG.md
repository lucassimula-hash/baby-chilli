# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [Unreleased]

- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Mapping: bodyXs → 12/16/Inter/500, bodySm → 14/20/Inter/500, bodyMd → 16/24/Inter/500. Headings deferred until first needed.
- `buttons.ghost` intentionally NOT defined in semantic tokens. Source design system does not define `--btn-ghost-*` variables. Web Button composes ghost variant from `--backgrounds-neutral-secondary-*` + `--text-base-secondary`. Phase 10 Button primitive must handle `variant === 'ghost'` as a special case (compose from `backgrounds.neutral.secondary` and `textColors.baseSecondary`), rather than via `tokens.buttons[variant]` lookup.
- `shadows.lighter` — color mirrored from source `--shadow-color-lighter` (`rgba(0, 0, 0, 0.56)`). Offset/blur are DERIVED from observation of source demos (source defines color-only for this token). To be re-tuned during Button implementation (Phase 10) by visual side-by-side comparison.
- `shadows.brandModerate` and `shadows.dangerModerate` — ALL fields mirrored from the source `.dark` block. Source stores these two shadows as full CSS box-shadow shorthand (`0 4px 14px -2px rgba(...)`), so offset/blur/spread are source-specified, NOT derived. Note: dark-block colors differ from the light `:root` block (alpha 0.20 vs 0.34; danger uses `rgba(244, 85, 85, ...)` in dark, `rgba(240, 68, 56, ...)` in light).
