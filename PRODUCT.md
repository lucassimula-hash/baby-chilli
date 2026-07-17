# Product

## Register

product

## Platform

web

## Users

The primary users are code agents such as Codex. They use this repository to understand which Chilli components exist, when to use them, how to import them, which props and variants are available, and which tokens are allowed.

Human designers and developers may read the same documentation, but the source of truth is optimized first for agents that need exact, factual, reusable component guidance.

## Product Purpose

This repository is the Chilli design system documentation and local component library. It exists to make component adoption simple, incremental and safe across Chilli product surfaces.

Success means an agent can inspect the repository, select an existing component instead of recreating one, use the correct public import, reuse the available tokens, and add new components progressively without changing the visual system by accident.

The design system will be updated regularly and should remain the source of truth for Chilli components.

## Positioning

Chilli Design System is the operational source of truth that lets agents add product UI from real components and real tokens without reinventing the interface.

## Brand Personality

Simple, strict and actionable.

The tone should be direct, factual and implementation-ready. Documentation should prefer short sentences, exact file paths, explicit imports, real props and practical examples over theory.

## Anti-references

This should not become generic documentation, a theoretical design system essay, or a visual redesign project.

Avoid invented tokens, duplicated components, undocumented visual values, fake variants, arbitrary styling, unnecessary UI libraries, and visual refactors that were not explicitly requested.

## Design Principles

1. Reuse before creating. Check the component inventory before adding any new UI.
2. Tokens are the contract. Use existing CSS custom properties instead of arbitrary values whenever an equivalent token exists.
3. Documentation must be factual. Every prop, variant, import and example should be derived from the code.
4. Adoption should be progressive. Add components one by one and verify them in real Chilli flows before expanding usage.
5. Keep the source of truth current. Update documentation, manifests, examples and registry notes when public components change.

## Accessibility & Inclusion

Components should keep clear text labels, semantic roles, visible focus states, disabled states, error states and sufficient contrast. Motion should remain restrained and should not be required to understand or complete a task.
