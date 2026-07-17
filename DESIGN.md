---
name: Chilli Design System
description: Source of truth for Chilli components, tokens and agent-ready usage guidance.
colors:
  base-dark: "#140f14"
  base-light: "#f5f5f5"
  brand-magenta: "#ff4beb"
  brand-magenta-hover: "#e544d6"
  neutral-850: "#26232a"
  neutral-900: "#211d23"
  neutral-950: "#140f14"
  danger: "#f04438"
  success: "#17b26a"
  warning: "#f79009"
  link: "#155dfc"
typography:
  display:
    fontFamily: "SF Pro Display, Inter, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: "54px"
    letterSpacing: "0"
  headline:
    fontFamily: "SF Pro Display, Inter, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "0"
  title:
    fontFamily: "SF Pro Display, Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "0"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.base-light}"
    textColor: "{colors.base-dark}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-brand:
    backgroundColor: "{colors.brand-magenta}"
    textColor: "{colors.base-dark}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  surface-base:
    backgroundColor: "{colors.base-dark}"
    textColor: "{colors.base-light}"
    rounded: "{rounded.xl}"
---

# Design System: Chilli Design System

## 1. Overview

**Creative North Star: "Operational Source of Truth"**

The Chilli design system is a precise product UI system for agents that need to choose, install and reuse components without guessing. It should feel strict, current and directly usable.

The current docs app runs in dark mode. Its surfaces use semantic CSS variables from `app/globals.css`, a dark neutral base, Chilli magenta as the main brand accent, and restrained borders instead of decorative effects.

**Key Characteristics:**

- Dark mode is the active Chilli documentation theme.
- Components and docs should use semantic tokens, not arbitrary values.
- Public guidance should be short, factual and copied from real code behavior.
- Visual changes should be scoped and intentional.

## 2. Colors

The palette is a dark neutral product palette with a rare Chilli magenta accent.

### Primary

- **Chilli Magenta** (`#ff4beb`): primary brand accent. Use for brand actions, selected states and high-signal highlights.
- **Chilli Magenta Hover** (`#e544d6`): hover and pressed state for brand actions.

### Neutral

- **Chilli Black** (`#140f14`): dark base, dark text in light contexts and the current docs background.
- **Neutral 900** (`#211d23`): raised dark surfaces and hover backgrounds.
- **Neutral 850** (`#26232a`): secondary dark surfaces.
- **Soft White** (`#f5f5f5`): primary text and high-contrast controls in dark mode.

### Status

- **Danger** (`#f04438`): destructive and error states only.
- **Success** (`#17b26a`): success states only.
- **Warning** (`#f79009`): warning states only.
- **Link** (`#155dfc`): links and navigational affordances.

### Named Rules

**The Semantic Token Rule.** Use `--backgrounds-*`, `--text-*`, `--borders-*`, `--icon-*` and component tokens before primitive `--color-*` values.

**The Magenta Rarity Rule.** Chilli magenta should mark important actions or identity moments, not decorate every surface.

## 3. Typography

**Display Font:** SF Pro Display with Inter fallback.
**Body Font:** Inter.
**Label/Mono Font:** Inter for labels, browser monospace for command blocks.

**Character:** Typography should be compact, readable and utilitarian. The docs prioritize scanning component names, install commands, props and examples.

### Hierarchy

- **Display** (600, 48px, 54px): high-emphasis docs titles when a page needs a large heading.
- **Headline** (600, 24px, 32px): section or component family titles.
- **Title** (600, 16px, 24px): component page section headings and compact panel titles.
- **Body** (400, 14px, 20px): documentation paragraphs and supporting explanations.
- **Label** (500, 12px, 16px): small metadata, table labels and compact controls.

### Named Rules

**The Copy-First Rule.** Documentation text should be short and specific enough for an agent to act on.

## 4. Elevation

The system uses borders, tonal layering and dark-mode shadow tokens. Surfaces should remain flat by default; elevation is used to separate overlays, previews and highly interactive surfaces.

### Shadow Vocabulary

- **Surface 1 to Surface 8** (`--shadow-1` to `--shadow-8`): progressive surface elevation utilities defined in `app/globals.css`.
- **Brand Moderate** (`--shadow-brand-moderate`): brand-tinted emphasis shadow. Use sparingly.
- **Danger Moderate** (`--shadow-danger-moderate`): destructive or error emphasis shadow. Use only with danger states.

### Named Rules

**The Flat-First Rule.** Prefer semantic background, border and spacing before adding shadow.

## 5. Components

### Buttons

- **Shape:** standard rounded controls use `--radius-4` or `--radius-5` depending on size.
- **Primary:** dark mode primary buttons use a light fill with dark text via button tokens.
- **Brand:** brand buttons use Chilli magenta and documented button tokens.
- **Hover / Focus:** states should come from existing tokenized hover, pressed and disabled values.

### Cards / Containers

- **Corner Style:** small repeated cards use 8px to 16px radii.
- **Background:** use `--backgrounds-base`, `--backgrounds-elevated` and neutral semantic tokens.
- **Border:** use `--borders-default` for separation.
- **Internal Padding:** use the spacing scale from `--space-5` through `--space-10` depending on density.

### Inputs / Fields

- **Style:** use existing `Input`, `ActionInput`, `TextArea`, `ActionTextArea`, `CauseInput` and `NumberInput` components before creating new fields.
- **Focus:** use existing component focus styles and border tokens.
- **Error / Disabled:** use existing danger and disabled tokens, not custom opacity-only treatments.

### Navigation

- **Style:** docs navigation is sidebar-led with a fixed header, semantic backgrounds and compact text.
- **Active state:** use existing selected and brand tokens.
- **Mobile:** keep the sidebar collapsible and preserve search access.

### Signature Components

- **CampaignCard**, **CampaignPage**, **ActionCtaCard** and **CtaCard** are Chilli-specific composed components. Prefer them for campaign and action flows instead of rebuilding cards from primitives.

## 6. Do's and Don'ts

### Do:

- **Do** inspect `COMPONENTS.md` before creating a component.
- **Do** use `components.manifest.json` for machine-readable component inventory.
- **Do** use tokens documented in `TOKENS.md` and defined in `app/globals.css`.
- **Do** update docs, manifest, examples and registry notes when public components change.
- **Do** keep adoption incremental by installing or introducing one component at a time.

### Don't:

- **Don't** invent tokens when an equivalent token exists.
- **Don't** duplicate an existing component or variant.
- **Don't** introduce another UI library.
- **Don't** create generic or theoretical docs that are not derived from the code.
- **Don't** visually refactor components unless that change is explicitly requested.
