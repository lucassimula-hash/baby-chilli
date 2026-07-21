# Chilli Component Inventory

This file is the main entry point for agents and contributors. It lists the public components that can be imported from the local public entry point.

Recommended local import while this repository remains a private docs app:

```tsx
import { Button } from "../index";
```

If this design system becomes a published package, replace `../index` with the package import path configured in `package.json`.

## Inventory

| Component | Category | Purpose | Variants | Status | Import |
|---|---|---|---|---|---|
| AccordionGroup | Disclosure | Controls accordion item expansion. | single, multiple | Stable | `import { AccordionGroup } from "../index";` |
| AccordionItem | Disclosure | Shows one collapsible section. | defaultOpen, grouped | Stable | `import { AccordionItem } from "../index";` |
| ActionCtaCard | Campaign | Shows a campaign action card. | send-email, instagram, google-maps, phone-call, question, external-link, action | Stable | `import { ActionCtaCard } from "../index";` |
| ActionInput | Form | Glass input for action forms. | default, focused, error, disabled, toggle, avatar | Stable | `import { ActionInput } from "../index";` |
| ActionNavigation | Navigation | Header for action screens. | default, with button, icon states | Stable | `import { ActionNavigation } from "../index";` |
| ActionTextArea | Form | Prompted textarea for action forms. | default, glass, focused, error, disabled | Stable | `import { ActionTextArea } from "../index";` |
| Avatar | Identity | Shows one profile image or fallback. | xxsm to 5xl | Stable | `import { Avatar } from "../index";` |
| AvatarDuo | Identity | Shows two overlapping avatars. | sm, md, lg, xl | Stable | `import { AvatarDuo } from "../index";` |
| AvatarGroup | Identity | Shows a group of overlapping avatars. | xxsm to 2xl, max, add button | Stable | `import { AvatarGroup } from "../index";` |
| AvatarLabel | Identity | Shows avatar, name and supporting text. | sm, md, lg | Stable | `import { AvatarLabel } from "../index";` |
| Badge | Status | Shows compact metadata. | fill, ghost, sizes, dot, icons | Stable | `import { Badge } from "../index";` |
| Button | Action | Triggers a user command. | brand, primary, secondary, ghost, danger, danger-soft, sizes, glass, loading | Stable | `import { Button } from "../index";` |
| CampaignCard | Campaign | Shows a campaign in feed or carousel contexts. | default, minus, supporter progress | Stable | `import { CampaignCard } from "../index";` |
| CampaignPage | Campaign | Composes a campaign detail surface. | default | Experimental | `import { CampaignPage } from "../index";` |
| CauseChip | Status | Shows a cause label with approved cause colors. | cause colors, sizes, glass | Stable | `import { CauseChip } from "../index";` |
| CauseInput | Form | Input specialized for cause values. | default, focused, error, disabled | Stable | `import { CauseInput } from "../index";` |
| Checkbox | Form | Selects one or more options. | sizes, checked, disabled, error | Stable | `import { Checkbox } from "../index";` |
| Chip | Status | Shows tags, filters or selected items. | fill, light, avatar, social, removable, sizes | Stable | `import { Chip } from "../index";` |
| CtaCard | Campaign | Shows a compact CTA card with channel chip, title, CTA and social proof. | buttons, arrow, email, instagram, linkedin, x, google-maps, external-link, question, phone-call, petition, secondary CTA optional | Stable | `import { CtaCard } from "../index";` |
| DatePicker | Form | Chooses a calendar date. | default, interactive, min/max | Stable | `import { DatePicker } from "../index";` |
| Dropdown | Overlay | Shows a floating menu. | sm, md, lg | Stable | `import { Dropdown } from "../index";` |
| MenuItem | Overlay | Shows a selectable dropdown row. | sm, md, lg, checked | Stable | `import { MenuItem } from "../index";` |
| FormTitle | Form | Pill input for an action title. | default, filled, focused, error | Stable | `import { FormTitle } from "../index";` |
| HeaderApp | Navigation | Mobile app-level header. | home, notification, search, profile | Stable | `import { HeaderApp } from "../index";` |
| IconButton | Action | Triggers an icon-only command. | primary, secondary, transparent, sizes, glass, loading | Stable | `import { IconButton } from "../index";` |
| Input | Form | Collects one line of text. | default, focused, error, disabled, clearable, icons | Stable | `import { Input } from "../index";` |
| NumberInput | Form | Collects verification codes. | default, error, disabled, length | Stable | `import { NumberInput } from "../index";` |
| PageNavigation | Navigation | Header for normal pages. | default, states, custom actions | Stable | `import { PageNavigation } from "../index";` |
| ProgressBar | Feedback | Shows segmented completion progress. | sm, md, lg, labels | Stable | `import { ProgressBar } from "../index";` |
| Radio | Form | Selects one option from a group. | sizes, checked, disabled, error | Stable | `import { Radio } from "../index";` |
| RadioGroup | Form | Provides grouped radio state. | controlled group | Stable | `import { RadioGroup } from "../index";` |
| SearchBar | Form | Searches or filters content. | default, focused, filled | Stable | `import { SearchBar } from "../index";` |
| Select | Form | Chooses one option from a menu. | default, avatar, borderless, sm, md | Stable | `import { Select } from "../index";` |
| SelectDatePicker | Form | Chooses a date range. | default, focused, helper, interactive | Stable | `import { SelectDatePicker } from "../index";` |
| Tabs | Navigation | Switches between related panels. | underline, pill, segmented, sizes | Stable | `import { Tabs } from "../index";` |
| TextArea | Form | Collects multiline text. | default, focused, error, disabled, AI button | Stable | `import { TextArea } from "../index";` |
| ThinkingIndicator | Feedback | Shows thinking or AI loading state. | default, custom | Stable | `import { ThinkingIndicator } from "../index";` |
| Toggle | Form | Switches a binary setting. | sm, md, checked, disabled, label | Stable | `import { Toggle } from "../index";` |
| Tooltip | Overlay | Shows contextual help. | placement, rich content, delay | Stable | `import { Tooltip } from "../index";` |

## Component Categories

### Primitives

Use these for base UI controls and small reusable pieces: `Button`, `IconButton`, `Input`, `TextArea`, `Checkbox`, `Radio`, `Toggle`, `Select`, `SearchBar`, `Badge`, `Chip`, `Avatar`, `Tooltip`, `Tabs`, `ProgressBar`.

### Composed components

Use these for product-level Chilli patterns: `CampaignCard`, `CampaignPage`, `ActionCtaCard`, `CtaCard`, `HeaderApp`, `ActionNavigation`, `PageNavigation`, `ActionInput`, `ActionTextArea`, `FormTitle`, `NumberInput`, `CauseInput`, `CauseChip`.

### Internal implementation

The following files exist but should not be imported directly by consumers: `components/docs/*`, `components/demos/*`, `components/layout/*`, `components/showcase/*`, `components/ui/animated-*`, `components/ui/aurora-shader.tsx`, `components/ui/breakpoint-switch.tsx`, `components/ui/resizable-container.tsx`, and helpers in `lib/*`.

## Similar Components

### Button vs IconButton

Use `Button` when the action needs visible text. Use `IconButton` only when the icon is enough or when a tooltip/label exists nearby.

### Input vs ActionInput vs CauseInput

Use `Input` for standard one-line text. Use `ActionInput` inside action creation or action execution forms. Use `CauseInput` when the value is specifically a cause.

### TextArea vs ActionTextArea

Use `TextArea` for generic long text. Use `ActionTextArea` when the field is driven by a question or prompt in an action flow.

### Badge vs Chip vs CauseChip

Use `Badge` for non-interactive metadata. Use `Chip` for tags, filters or selected values. Use `CauseChip` only for cause labels using the approved cause color palette.

### PageNavigation vs ActionNavigation vs HeaderApp

Use `PageNavigation` for normal pages. Use `ActionNavigation` for focused action screens. Use `HeaderApp` for the 375px mobile app header variants.

### CampaignCard vs CampaignPage

Use `CampaignCard` in feeds, lists and related campaign rails. Use `CampaignPage` for a composed campaign detail surface.

### ProgressBar vs Toggle

Use `ProgressBar` to display completion. Use `Toggle` to change a binary setting.

## Component Details

### Button

**Purpose**

Triggers a clear user action.

**Use when**

- The user can submit, continue, save, open or confirm.
- The label must be visible.

**Do not use when**

- The action is icon-only. Use `IconButton`.
- The surface is an action card. Use `ActionCtaCard` or `CtaCard`.

**Import**

```tsx
import { Button } from "../index";
```

**Variants**

- `variant`: `brand`, `primary`, `secondary`, `ghost`, `danger`, `danger-soft`.
- `size`: `xsm`, `sm`, `md`, `lg`.
- `glass`: enables the glass visual treatment.
- `loading`: disables the button and shows a spinner.

**Important props**

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| children | ReactNode | Yes | - | Button label. |
| variant | string | No | `primary` | Visual style. |
| size | string | No | `md` | Button size. |
| loading | boolean | No | `false` | Shows loading spinner and disables click. |
| leftIcon | ComponentType | No | - | Icon before the label. |
| rightIcon | ComponentType | No | - | Icon after the label. |
| disabled | boolean | No | `false` | Disables interaction. |

**Basic example**

```tsx
<Button>Continue</Button>
```

**Realistic example**

```tsx
<Button variant="brand" size="lg" loading={isSubmitting}>
  Start action
</Button>
```

**Related components**

`IconButton`, `ActionCtaCard`, `CtaCard`.

**Accessibility**

Use a clear text label. Do not rely only on color to communicate danger or loading.

**Source**

- Component: `components/ui/button.tsx`
- Demo: `components/demos/button-demos.tsx`
- Registry: `lib/registry.ts` with slug `button`

### CampaignCard

**Purpose**

Displays a campaign preview with full-bleed media, title, supporter proof and CTA state.

**Use when**

- Showing campaigns in feeds.
- Showing compact related campaigns with `type="minus"`.

**Do not use when**

- Rendering the full campaign detail page. Use `CampaignPage`.

**Import**

```tsx
import { CampaignCard } from "../index";
```

**Variants**

- `type="default"` renders the full mobile feed card.
- `type="minus"` renders the compact mini card.
- `supporter` changes the footer from social proof to progress.
- `creatorOnCard` controls the creator row inside the image card.
- `state="hover"` forces the hover visual state for docs and controlled previews.

**Important props**

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| campaignId | string | Yes | - | Stable ID used for shared-element layout. |
| image | string | Yes | - | Hero image URL. |
| creator | object | Yes | - | Creator name, avatar and optional verification. |
| title | string | Yes | - | Campaign title. |
| body | string | No | - | Supporting text. |
| supporters | object | No | - | Count and avatar social proof. |
| creatorOnCard | boolean | No | `true` | Shows the creator row inside the image card. |
| state | `"default" \| "hover"` | No | `"default"` | Forces the visual state for docs and controlled previews. |
| supporter | boolean | No | `false` | Enables supporter progress mode. |
| progress | object | No | - | Done and total action count. |
| onOpen | function | No | - | Called when opening the card. |
| onCta | function | No | - | Called when pressing the CTA. |

**Basic example**

```tsx
<CampaignCard
  campaignId="einar-buyout-fraud"
  image="/campaign-card/hero-einar-gustafsson.jpg"
  creator={{ name: "@seaspiracy", avatar: "/campaign-card/creator-seaspiracy.png", verified: true }}
  title="Tell Einar Gustafsson: Your Buyout Bid Is Now Tied to Catch Fraud"
/>
```

**Realistic example**

```tsx
<CampaignCard
  campaignId="einar-buyout-fraud"
  image="/campaign-card/hero-einar-gustafsson.jpg"
  creator={{ name: "@seaspiracy", avatar: "/campaign-card/creator-seaspiracy.png", verified: true }}
  title="Tell Einar Gustafsson: Your Buyout Bid Is Now Tied to Catch Fraud"
  supporters={{ count: 3400, avatars: ["/campaign-card/avatar-1.png", "/campaign-card/avatar-2.png"] }}
  commentCount={12}
/>
```

**Related components**

`CampaignPage`, `AvatarGroup`, `ProgressBar`.

**Accessibility**

Provide meaningful media context around the card. Keep title text concise enough for the clamped layout.

**Source**

- Component: `components/ui/campaign-card.tsx`
- Types: `CampaignCardProps`, `CampaignCreator`
- Demo: `components/demos/campaign-card-demos.tsx`
- Registry: `lib/registry.ts` with slug `campaign-card`

### ActionCtaCard

**Purpose**

Displays a campaign action card for one concrete action type.

**Use when**

- Showing email, Instagram, Google Maps, phone, question, external-link or generic action tasks.
- Showing pinned, completed or top-supporter states.

**Do not use when**

- A smaller action option is enough. Use `CtaCard`.

**Import**

```tsx
import { ActionCtaCard } from "../index";
```

**Variants**

Action type variants include `send-email`, `instagram`, `google-maps`, `phone-call`, `question`, `external-link`, and `action`.

**Important props**

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| type | string | Yes | - | Action type. |
| title | string | Yes | - | Main action title. |
| description | string | No | - | Supporting text, when supported by the type. |
| completed | boolean | No | `false` | Shows completed treatment. |
| pinned | boolean | No | `false` | Shows pinned treatment. |
| onClick | function | No | - | Opens or starts the action. |

**Basic example**

```tsx
<ActionCtaCard type="send-email" title="Email the minister" />
```

**Realistic example**

```tsx
<ActionCtaCard
  type="google-maps"
  title="Leave a public review"
  completed={false}
  onClick={() => undefined}
/>
```

**Related components**

`CtaCard`, `ActionNavigation`, `ProgressBar`.

**Accessibility**

The title must explain the action without relying on the icon alone.

**Source**

- Component: `components/ui/action-cta-card.tsx`
- Types: `ActionCtaCardProps`
- Demo: `components/demos/action-cta-card-demos.tsx`

### CtaCard

**Purpose**

Displays a compact CTA card for one campaign action, with a channel chip, clamped title, optional preview text, social proof and either full-width text CTAs or a round arrow CTA.

**Use when**

- Showing a single recommended email, social, maps, link, question, call or petition action inside a campaign or action list.
- The action needs a compact dark card, not the larger pinned/completed treatment.
- Social proof should sit close to the CTA.

**Do not use when**

- The action needs pinned, completed or top-supporter states. Use `ActionCtaCard`.
- The CTA is a standalone page button. Use `Button`.

**Import**

```tsx
import { CtaCard } from "../index";
```

**Important props**

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| variant | `"buttons" \| "arrow"` | No | `buttons` | `buttons` renders full-width text CTAs. `arrow` renders social proof with a round chevron CTA. |
| type | `"email" \| "instagram" \| "linkedin" \| "x" \| "google-maps" \| "external-link" \| "question" \| "phone-call" \| "petition"` | No | `email` | Preset that fills chip, icon, copy, media and CTA label. |
| title | string | No | preset title | Main action title, clamped to three lines. |
| body | string | No | preset body | Optional preview text below the title. Media presets clamp this to three lines. |
| channel | string | No | preset channel | Optional label override inside the medium chip. |
| channelIcon | ReactNode | No | preset icon | Optional leading icon override inside the chip. |
| mediaSrc / mediaAlt | string | No | preset media | Optional 80×80 media preview used by social and maps variants. |
| primaryLabel | string | No | preset label | Primary full-width CTA label. The buttons variant renders an edit icon before the label. |
| secondaryLabel | string | No | `skip for now` | Tertiary CTA label rendered below the primary CTA with a trailing arrow. |
| socialProof | string | No | `34 people did this` | Centered proof text under the CTA group. |
| onPrimaryClick | function | No | - | Fires when pressing the primary CTA. |
| onSecondaryClick | function | No | - | Fires when pressing the optional secondary CTA. |
| primaryLoading / secondaryLoading | boolean | No | `false` | Shows loading state and disables the matching CTA. |

**Basic example**

```tsx
<CtaCard
  title="Federal Wildlife Oversight Needed: Idaho Commissioner Charged with Poaching on Federal Land"
  body="Dear U.S. Fish & Wildlife Service, I am writing..."
/>
```

```tsx
<CtaCard type="instagram" />
```

**Related components**

`ActionCtaCard`, `Button`, `Chip`.

**Accessibility**

The title must describe the action without relying on the channel icon. Keep CTA labels short and explicit.

**Source**

- Component: `components/ui/cta-card.tsx`
- Types: `CtaCardProps`
- Demo: `components/demos/cta-card-demos.tsx`

### Forms

`Input`, `ActionInput`, `CauseInput`, `TextArea`, `ActionTextArea`, `FormTitle`, `NumberInput`, `Checkbox`, `Radio`, `Toggle`, `Select`, `SelectDatePicker`, and `DatePicker` are public form components.

**Use when**

- The component matches the input type and product context.
- Existing error, disabled, helper and focused states cover the need.

**Do not use when**

- You need a new primitive only to restyle a current one.
- The component already has a documented variant for the case.

**Import**

```tsx
import { Input, TextArea, Select, Toggle } from "../index";
```

**Important props**

| Component | Important props |
|---|---|
| Input | `label`, `helperText`, `error`, `leftIcon`, `rightIcon`, `clearable`, `actionButton`, `disabled` |
| ActionInput | `label`, `helperText`, `error`, `leftIcon`, `rightIcon`, `showAvatar`, `showToggle`, `disabled` |
| TextArea | `label`, `helperText`, `error`, `showAiButton`, `onAiGenerate`, `disabled` |
| ActionTextArea | `question`, `helperText`, `error`, `variant`, `disabled` |
| NumberInput | `value`, `onChange`, `length`, `error`, `disabled` |
| Select | `options`, `value`, `onChange`, `placeholder`, `size`, `variant` |
| Toggle | `checked`, `onCheckedChange`, `size`, `label`, `description`, `disabled` |

**Basic example**

```tsx
<Input label="Campaign title" placeholder="Protect the reef" />
```

**Realistic example**

```tsx
<ActionInput
  label="Target"
  placeholder="@ministry"
  helperText="Use the public account handle."
/>
```

**Related components**

`Button`, `ActionNavigation`, `Badge`.

**Accessibility**

Always provide labels or equivalent accessible names. Error text should be visible and programmatically associated when the component supports it.

**Source**

- Components: `components/ui/input.tsx`, `components/ui/action-input.tsx`, `components/ui/textarea.tsx`, `components/ui/action-textarea.tsx`, `components/ui/number-input.tsx`, `components/ui/select.tsx`, `components/ui/toggle.tsx`
- Demos: `components/demos/*`

### Identity Components

`Avatar`, `AvatarGroup`, `AvatarDuo`, and `AvatarLabel` represent people, creators and supporters.

**Use when**

- Displaying identity, social proof or profile context.

**Do not use when**

- The image is campaign media. Use the relevant campaign component.

**Import**

```tsx
import { Avatar, AvatarGroup, AvatarLabel } from "../index";
```

**Variants**

Avatar components share size variants. `AvatarGroup` also supports `max`, custom `spacing`, and an add button.

**Important props**

| Component | Important props |
|---|---|
| Avatar | `src`, `alt`, `fallback`, `size` |
| AvatarGroup | `avatars`, `size`, `max`, `spacing`, `showAddButton`, `onAddClick` |
| AvatarDuo | `primarySrc`, `secondarySrc`, `size` |
| AvatarLabel | `src`, `name`, `supportingText`, `size` |

**Basic example**

```tsx
<Avatar src="/campaign-card/avatar-1.png" alt="Supporter" fallback="S" />
```

**Realistic example**

```tsx
<AvatarGroup
  avatars={[
    { src: "/campaign-card/avatar-1.png", alt: "Supporter 1" },
    { src: "/campaign-card/avatar-2.png", alt: "Supporter 2" }
  ]}
  max={2}
/>
```

**Related components**

`CampaignCard`, `HeaderApp`, `Chip`.

**Accessibility**

Use meaningful `alt` text for identity images. Decorative grouped avatars can use empty alt text when surrounding text already describes the group.

**Source**

- Components: `components/ui/avatar.tsx`, `components/ui/avatar-group.tsx`, `components/ui/avatar-duo.tsx`, `components/ui/avatar-label.tsx`
- Demo: `components/demos/avatar-demos.tsx`

### Navigation Components

`HeaderApp`, `PageNavigation`, `ActionNavigation`, and `Tabs` cover navigation patterns.

**Use when**

- The navigation pattern matches the surface: app header, page header, action header or panel switcher.

**Do not use when**

- A simple command button would be clearer.

**Import**

```tsx
import { HeaderApp, PageNavigation, ActionNavigation, Tabs } from "../index";
```

**Important props**

| Component | Important props |
|---|---|
| HeaderApp | `type`, `title`, `avatarSrc`, `onBack`, `onSearchClick`, `onSettingsClick` |
| PageNavigation | `title`, `onBack`, `actions` |
| ActionNavigation | `title`, `onClose`, `actions`, `actionButton` |
| Tabs | `items`, `value`, `onValueChange`, `type`, `size` |

**Basic example**

```tsx
<HeaderApp type="notification" title="Notifications" onBack={() => history.back()} />
```

**Realistic example**

```tsx
<Tabs
  type="segmented"
  value="actions"
  onValueChange={setTab}
  items={[
    { label: "Actions", value: "actions" },
    { label: "Supporters", value: "supporters" }
  ]}
/>
```

**Related components**

`Button`, `IconButton`, `Tooltip`.

**Accessibility**

Navigation buttons need labels. Tabs use `role="tab"` internally; consumers should keep labels short and distinct.

**Source**

- Components: `components/ui/header-app.tsx`, `components/ui/page-navigation.tsx`, `components/ui/action-navigation.tsx`, `components/ui/tabs.tsx`
- Demos: `components/demos/header-app-demos.tsx`, `components/demos/page-navigation-demos.tsx`, `components/demos/action-navigation-demos.tsx`, `components/demos/tabs-demos.tsx`

## Missing or Incomplete Documentation

- No Storybook files are present in this repository.
- Several components rely on inferred props instead of exported prop types.
- `lib/registry.ts` documents many components, but it is not machine-readable enough for external automation.
- The repository is private and named `chilli-docs`; a published package name is not configured.
