# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [Unreleased]

- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Mapping: bodyXs → 12/16/Inter/500, bodySm → 14/20/Inter/500, bodyMd → 16/24/Inter/500. Headings deferred until first needed.
