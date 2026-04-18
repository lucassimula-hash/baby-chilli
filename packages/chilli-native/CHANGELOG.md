# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [Unreleased]

- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Mapping: bodyXs → 12/16/Inter/500, bodySm → 14/20/Inter/500, bodyMd → 16/24/Inter/500. Headings deferred until first needed.
- `buttons.ghost` intentionally NOT defined in semantic tokens. Source design system does not define `--btn-ghost-*` variables. Web Button composes ghost variant from `--backgrounds-neutral-secondary-*` + `--text-base-secondary`. Phase 10 Button primitive must handle `variant === 'ghost'` as a special case (compose from `backgrounds.neutral.secondary` and `textColors.baseSecondary`), rather than via `tokens.buttons[variant]` lookup.
