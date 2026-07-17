# Chilli Design Tokens

Tokens live in `app/globals.css`. They are CSS custom properties generated from the Figma variables export.

Consumers should use existing design tokens instead of arbitrary visual values whenever an equivalent token exists.

## Architecture

The current file follows a practical three-layer structure:

1. Primitive tokens: raw scales such as `--color-brand-800`, `--space-6`, `--radius-4`.
2. Semantic tokens: purpose-based aliases such as `--backgrounds-base`, `--text-base-primary`, `--borders-default`.
3. Component tokens: component-specific aliases such as `--btn-primary-bg`, `--btn-brand-text`, `--btn-disabled-bg`.

## Usage

Use tokens through CSS variables:

```tsx
<div className="bg-[var(--backgrounds-base)] text-[var(--text-base-primary)]" />
```

Do not hardcode equivalent visual values:

```tsx
// Avoid this when a token exists.
<div className="bg-[#ffffff] text-[#140f14]" />
```

## Colors

| Family | Token examples | Usage | Avoid |
|---|---|---|---|
| Base | `--color-white`, `--color-black` | Primitive color references. | Direct product styling when semantic tokens exist. |
| Neutral | `--color-neutral-50` to `--color-neutral-950` | Primitive neutral scale. | Choosing raw neutrals for UI states. |
| Brand | `--color-brand-50` to `--color-brand-950` | Primitive Chilli magenta scale. | Directly applying brand colors when `--backgrounds-brand-*`, `--text-brand-*`, or `--borders-brand-*` exist. |
| Success | `--color-success-50` to `--color-success-950` | Primitive success scale. | Using success for non-status decoration. |
| Danger | `--color-danger-50` to `--color-danger-950` | Primitive danger scale. | Using danger outside destructive or error states. |
| Warning | `--color-warning-50` to `--color-warning-950` | Primitive warning scale. | Using warning for generic emphasis. |
| Link | `--color-link-50` to `--color-link-950` | Primitive link scale. | Non-link decorative color. |
| Other | `--color-other-*-lighter`, `--color-other-*-strong` | Cause and accent color pairs. | New arbitrary cause colors. |

## Semantic Color Tokens

| Token family | Examples | Usage | Avoid |
|---|---|---|---|
| Backgrounds | `--backgrounds-base`, `--backgrounds-elevated`, `--backgrounds-neutral-primary-default`, `--backgrounds-brand-strong-default` | Page, surface, hover, pressed and brand backgrounds. | Raw `--color-*` values for surfaces. |
| Text | `--text-base-primary`, `--text-base-secondary`, `--text-brand-primary`, `--text-danger-primary`, `--text-glass-primary` | Text hierarchy and status text. | Opacity classes for semantic text states. |
| Borders | `--borders-default`, `--borders-selected`, `--borders-brand-default`, `--borders-danger-default`, `--borders-glass-*` | Borders, focus rings and selected states. | Hardcoded border colors. |
| Icons | `--icon-neutral-primary`, `--icon-brand-primary`, `--icon-danger-primary`, `--icon-glass-primary` | Icon color hierarchy. | Reusing text tokens for icons when icon tokens exist. |
| Links | `--link-primary`, `--link-hover`, `--link-pressed`, `--link-visited` | Link states. | Brand tokens for navigational links. |

## Component Tokens

| Component | Token examples | Usage | Avoid |
|---|---|---|---|
| Button | `--btn-primary-bg`, `--btn-primary-text`, `--btn-brand-bg`, `--btn-disabled-bg`, `--btn-glass-secondary-bg` | Button backgrounds, text and disabled states. | Styling buttons with raw background or text values. |
| Shadows | `--shadow-color-lighter`, `--shadow-brand-moderate`, `--shadow-danger-moderate` | Existing shadow colors. | Creating unrelated shadow colors. |
| Layout | `--sidebar-width`, `--header-height` | Documentation shell layout sizes. | Reusing these as product spacing tokens. |

## Spacing

| Token | Value | Usage | Avoid |
|---|---:|---|---|
| `--space-0` | `0px` | No spacing. | - |
| `--space-1` | `2px` | Hairline gaps and tiny offsets. | Main layout spacing. |
| `--space-2` | `4px` | Tight icon or label gaps. | Large component padding. |
| `--space-3` | `6px` | Tight component internals. | Page spacing. |
| `--space-4` | `8px` | Small gaps and compact padding. | Large sections. |
| `--space-5` | `12px` | Component padding. | Dense icon-only spacing when smaller tokens exist. |
| `--space-6` | `16px` | Standard component spacing. | Very tight UI. |
| `--space-7` | `20px` | Medium spacing. | Replacing `--space-6` without need. |
| `--space-8` | `24px` | Section rhythm and larger gaps. | Tiny controls. |
| `--space-9` | `32px` | Large group separation. | Form field internals. |
| `--space-10` | `40px` | Page-level gaps. | Compact controls. |
| `--space-11` | `48px` | Large page spacing. | Dense lists. |
| `--space-12` | `64px` | Major section spacing. | Component internals. |
| `--space-13` | `80px` | Large section spacing. | Component internals. |
| `--space-14` | `96px` | Large hero or page spacing. | Component internals. |
| `--space-15` | `160px` | Extra large layout spacing. | Normal UI spacing. |
| `--space-16` | `260px` | Fixed large layout size. | Normal UI spacing. |

## Radii

| Token | Value | Usage | Avoid |
|---|---:|---|---|
| `--radius-0` | `0px` | Square surfaces. | Rounded controls. |
| `--radius-1` | `2px` | Tiny rounding. | Pills. |
| `--radius-2` | `4px` | Small components. | Large cards. |
| `--radius-3` | `6px` | Compact controls. | Pill controls. |
| `--radius-4` | `8px` | Standard small cards and controls. | Fully rounded controls. |
| `--radius-5` | `12px` | Medium cards. | Tiny badges. |
| `--radius-6` | `16px` | Inputs and large cards. | Tiny controls. |
| `--radius-7` | `24px` | Large mobile cards. | Dense tables. |
| `--radius-8` | `32px` | High-emphasis rounded surfaces. | Small repeated items. |
| `--radius-full` | `9999px` | Pills and circular controls. | Rectangular panels. |

## Typography

| Token family | Examples | Usage | Avoid |
|---|---|---|---|
| Font family | `--font-family-primary`, `--font-family-secondary` | SF Pro Display and Inter usage. | Hardcoded `font-family` values. |
| Font size | `--font-size-2xs` to `--font-size-9xl` | Type scale. | Viewport-scaled font sizes. |
| Line height | `--line-height-2xs` to `--line-height-9xl` | Matching line heights. | Arbitrary line heights when scale values fit. |
| Letter spacing | `--letter-spacing-xs` to `--letter-spacing-xl` | Display or compact text treatments already present in the system. | New negative tracking values. |

## Sizes and Borders

| Token family | Examples | Usage | Avoid |
|---|---|---|---|
| Size | `--size-1` to `--size-16` | Icons, avatars, fixed controls. | Page spacing when `--space-*` fits. |
| Border width | `--border-width-0` to `--border-width-7` | Border thickness. | Arbitrary pixel borders. |

## Breakpoints

| Token | Value | Usage |
|---|---:|---|
| `--breakpoint-xs` | `375px` | Mobile baseline. |
| `--breakpoint-sm` | `440px` | Larger mobile. |
| `--breakpoint-md` | `768px` | Tablet. |
| `--breakpoint-lg` | `1024px` | Desktop. |
| `--breakpoint-xl` | `1280px` | Wide desktop. |

## Motion and Z-Index

No global motion duration, easing or z-index token family is currently defined in `app/globals.css`. Components use local transitions and occasional hardcoded z-index values. Add token families before standardizing new motion or layering behavior.

## Dark Mode

Dark theme overrides are defined under `.dark` in `app/globals.css`. Consumers should use semantic tokens so light and dark themes inherit the right values.
