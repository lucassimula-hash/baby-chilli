# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [0.9.0] — Brand primitives (HeaderApp + ChilliLogo)

### Added

- `HeaderApp`: mobile app-level header (width 375) with four types — `home` (logo + bell with brand dot + search IconButton + avatar), `notification` (back + centered title + settings spacer kept for layout balance), `search` (back + decoy search bar in focused-looking state — brand border + brand-moderate shadow, typically navigates to a search screen on tap), `profile` (back + centered title + settings). Based on Figma node 34341:161172.
- `ChilliLogo`: brand mark primitive with three types (`symbol` 120×120, `favicon` 64×64, `logo` 200×171.574 with wordmark) × three colors (`brand` #FF4BEB, `black` #140F14, `white` #F5F5F5). SVG paths inlined via `react-native-svg` (paths sourced directly from Figma components 31271:66312–66329). Aspect ratio preserved from the longest dimension (`size` prop). `fill` prop can override the palette color for custom contexts.

### Divergences from source web

- `HeaderApp`: drops the Figma source's `@` color override (in dark mode, `text-base-primary` and `#f5f5f5` resolve to the same value, so the distinction has no visible effect).
- `HeaderApp` `notification`: the Figma source keeps a 40×40 settings icon container with `opacity-0` for layout balance. Native substitutes an explicit 40×40 spacer `View` (same visual footprint, cleaner semantics).
- `ChilliLogo`: the Figma source renders remote SVG assets (`<img src=...>`). Native embeds the SVG paths directly in TS to avoid a dependency on an asset CDN or bundled SVG loader. Paths are byte-equivalent to the Figma exports.

## [0.8.0] — Audit visual pass 1 (Phase 1 → 5 alignment)

### Breaking

- `Badge`: API refonte pour coller à la source web. `variant` (neutral / brand / danger / success / warning) → `type` (fill / ghost). Les quatre variants colorés (brand / danger / success / warning) sont retirés : le DS web ne les définit pas sur `Badge`. Consumers utilisant `<Badge variant="brand" />` doivent passer à `<Badge dot dotColor={tokens.backgrounds.brand.strong.default} />` ou rendre une couleur via le slot `leftIcon`.
- `Badge`: nouveaux slots `dot`, `dotColor`, `leftIcon`, `rightIcon` (présents dans la source web, oubliés dans le port initial).
- `Badge`: `lg` passe de 12/16 à 14/20 (match source web).

### Fixed

- `Avatar`: fallback background par défaut passe de `backgrounds.neutral.tertiary.default` (gris) à `backgrounds.brand.strong.default` (match source web).
- `AvatarGroup`: overlap par défaut passe de `size * 0.3` à `size * 0.5` (les avatars se chevauchent plus, cohérent avec la source web). Border color par défaut passe de `backgrounds.base` à `borders.base` (valeurs identiques mais token sémantiquement correct).
- `AvatarGroup`: ajoute le slot `showAddButton` (+ `onAddPress`, `addButtonAccessibilityLabel`) — bouton `Plus` round trailing manquant dans le port initial.
- `AvatarLabel`: ajoute la taille `xl` (avatar 40 / title 16 / subtitle 14) — manquait vs source web.
- `Chip`: type `fill` utilisait `backgrounds.neutral.secondary.default` (neutral-850) au lieu de `backgrounds.neutral.primary.default` (neutral-900). Le chip rempli est maintenant plus contrasté avec le bg, comme sur le web.
- `Checkbox`: radius passe de (sm 2 / md 4) à (sm 4 / md 6), match `rounded` / `rounded-md` de la source.
- `Toggle`: gap de la row passe de `spacing[5]` (12) à `10`, match `gap-2.5` de la source.
- `NumberInput`: `length` par défaut passe de 6 à 4, match la source web (la longueur reste configurable via prop).

## [0.7.0] — Phase 7 (chrome + cause)

### Added

- Primitives: `ThinkingIndicator`, `PageNavigation`, `CauseChip`.
- Tokens: `causeColors` — 20 cause palettes (`lighter` / `strong` pairs) added under `tokens.causeColors`. Dark-mode values mirror the `--backgrounds-other-*` CSS variables from `chilli-docs/app/globals.css`.
- `ThinkingIndicator`: animated single-path SVG morphing between 4 keyframes (4 control points × 26 numbers each). Uses `Animated.Value` with `addListener` + `setNativeProps` on the `Path` ref to drive point-to-point linear interpolation with an ease-in-out pass — smooth at 60 fps without a reanimated dep.
- `PageNavigation`: page-level header with leading `ChevronLeft` back button, centered title, and trailing actions (default: `Upload` + `Settings` ghost IconButtons). Two variants (`mobile` 56 / `desktop` 72). When `scrolled=true`, an absolutely-positioned `BlurView` (expo-blur, intensity 20, dark tint) renders behind the contents (same pattern as `ActionNavigation`).
- `CauseChip`: pill chip in `xs` (h 20) / `md` (h 24) / `lg` (h 28) sizes. Two surface types: `default` (flat lighter bg) and `glass` (transparent bg with hairline border + `BlurView` backdrop). Label uses the matching `strong` color from the palette.

### Skipped

- `BreakpointSwitch` (chilli-docs): web docs–internal utility for swapping mobile/desktop renderers through Tailwind `md:` breakpoints. Native consumers control variants explicitly via component props (`variant="mobile"` / `"desktop"`), so no equivalent primitive is needed.

### Divergences from source web

- `causeColors`: only the dark-mode palette is shipped (native is dark-only). The 20 colors are exposed as a flat object keyed by color slug (`'neon-pink'`, `'caribbean-green'`, …); no kebab-case-to-camelCase normalization to keep parity with `CAUSE_COLORS` from the source.
- `CauseChip`: the source uses `backdrop-blur-[8px]` on glass type — RN equivalent is `expo-blur` `BlurView` at intensity 20 (same intensity as `ActionNavigation` / `PageNavigation` for visual consistency). A second translucent `lighter` overlay is layered on top of the blur to keep the cause tint readable.
- `PageNavigation`: drops the source's `auto` responsive variant (Tailwind `md:` breakpoints). Native consumers explicitly choose `mobile` or `desktop`.
- `ThinkingIndicator`: the source uses an SVG morph driven by CSS keyframes; native version uses `Animated.Value` + `setNativeProps` on a `react-native-svg` `Path` to morph 26 control numbers between 4 keyframes with ease-in-out interpolation. Avoids depending on `react-native-reanimated`.

## [0.6.0] — Phase 6 (form / auth / action helpers)

### Added

- Primitives: `FormTitle`, `FlagIcon`, `SocialButton`, `SelectDatePicker`, `ActionInput`, `ActionTextarea`, `ActionNavigation`.
- `FormTitle`: large 24/32 SF Pro Display Semibold (iOS native, Inter-SemiBold fallback) centered title input. Five states (default / filled / focused / error / disabled) with glass-style opacity-based bgs.
- `FlagIcon`: circular country flag rendered from `FLAG_URLS` (Figma S3 CDN, same source as web). 200+ ISO 3166-1 alpha-2 codes via the `FlagCode` union. Re-exports `FLAG_URLS` and `FLAG_OPTIONS` for country-picker consumers.
- `SocialButton`: pill auth button for `apple`, `google`, `facebook`, `apple-pay`. Each provider has a built-in 24px brand SVG (rendered via `react-native-svg`) and default label / variant. Press scale 0.98 via native-driver Animated.spring.
- `SelectDatePicker`: 343 px display card with a left timeline (2 outlined dots + dashed line) and right start / end sections (label + date / time pills). Focused state swaps to brand border + brandModerate shadow.
- `ActionInput`: glass-bg rounded-3xl card with the label sitting inside the bordered container above the input row. Supports left icon, optional 20px round avatar, and a right side that defaults to `ChevronRight` but can be overridden, suppressed (`rightIcon={null}`), or replaced with a small `Toggle` (`showToggle`).
- `ActionTextarea`: rounded-3xl card with a medium-weight prompt above a multiline textarea. Two surface modes (non-glass / glass) and four states each.
- `ActionNavigation`: modal/screen header with leading close, centered title, trailing actions or primary pill button. Two variants (`mobile` 56 / `desktop` 72). When `scrolled=true`, an absolutely-positioned `BlurView` (expo-blur, intensity 20, dark tint) renders behind the contents.

### Skipped

- `ActionCtaCard` (chilli-docs ~700 lines): scope is closer to a domain-specific feature assembly than a primitive — 7 types × 3-4 states with custom image assets (Google Maps basemap, comment avatars, gradients) and per-type content renderers. Documented as out-of-scope; consumers can compose it from existing primitives.
- `cause-input` (chilli-docs): per the user, this primitive is being deprecated on the web side — not ported.

### Divergences from source web

- `FormTitle`: the canonical source is the Figma "ActionFormTitle" component (node 31315:9335 in the Foundations & Components file), NOT `chilli-docs/components/ui/form-title.tsx`. The chilli-docs source is treated as out of date for this primitive.
- `FormTitle`: SF Pro Display Semibold lands on iOS via the system font; Android / web fall back to Inter-SemiBold. The two fonts have very close metrics at 24/32 but rendering will differ slightly.
- `SocialButton`: brand SVGs are inlined via `react-native-svg` (same paths as the source) — no separate asset file.
- `ActionInput` / `ActionTextarea`: the source's true backdrop-blur on focused-glass states is dropped. Translucent bg colors (`neutral.opacity.faint` / `lighter` / `medium`) carry the glass look; inner shadows and ring effects from the focused-glass state are omitted because they don't translate cleanly across iOS / Android / RN Web.
- `ActionNavigation`: trailing IconButtons drop the source's `glass` prop. On RN with a flat dark base background, `BlurView` at icon scale renders nearly opaque and hides the lucide stroke. Plain secondary IconButtons keep the icons readable. The header itself still uses `BlurView` in `scrolled` state — that area is large enough for the blur to render correctly.
- `ActionNavigation`: drops the source's `auto` responsive variant (which used `md:` Tailwind breakpoints). Native consumers explicitly choose `mobile` or `desktop`.

## [0.5.0] — Phase 5 (feedback + advanced inputs)

### Added

- Primitives: `ProgressBar`, `Tooltip`, `NumberInput`, `DatePicker`.
- `ProgressBar`: segmented bar (default 5 segments), three heights (sm 4 / md 6 / lg 8), optional label rendered to the right or below; custom `formatLabel` overrides the default percentage.
- `Tooltip`: wraps any trigger child, four placements (top / bottom / left / right) with rotated-square arrow, viewport-clamped position. Web rendering uses `react-dom`'s `createPortal` directly into `document.body` (`position: fixed`); iOS / Android use RN `Modal`. Hover (web) and long-press (mobile) gestures, with a debounced 80ms hide to avoid flicker on brief mouse exits.
- `NumberInput`: multi-cell OTP / verification-code input. N cells (default 6), one digit per cell, auto-advance on entry, backspace-rewind on empty cell, paste distributes across cells. States: default, focused (with pulsing dot), filled, error (digit text in danger color), disabled.
- `DatePicker`: single-month calendar view. Month-name header + prev / next chevron navigation, 7-column day-of-week header, 5-6 row day grid with 40px round cells. Today highlighted in brand color; selected day in neutral-secondary background; out-of-month and out-of-bounds days disabled.

### Divergences from source web

- `Tooltip` rendering on web uses `react-dom` `createPortal` directly instead of RN `Modal`. RN Modal on web triggers a body-scroll lock that shifts layout, causing a hover/leave loop and visible flicker. The portal approach renders into `document.body` with `position: fixed`, mirroring the source web behavior more closely.
- `Tooltip` API takes the trigger as a single `children` element rather than the source web's `cloneElement`-injected handlers — clearer surface, no fragile DOM-prop injection. Inner trigger keeps its own `onPress`.
- `NumberInput` cells are slightly bigger on web because of the `caretHidden` overlay pattern (TextInput at opacity 0 covers the entire cell). Visual rendering matches source — cell width 34px, height 56px.
- `DatePicker` ships only the `default` surface variant. The web source's `type='glass'` (backdrop-blur card) is omitted for this version; can be added later via the internal `GlassSurface`.
- `DatePicker` does not yet ship the `SelectDatePicker` companion display widget (start / end pills + timeline). Tracking it as a Phase 6 candidate if a real consumer needs it.

## [0.4.0] — Phase 4 (navigation)

### Added

- Primitives: `AccordionGroup`, `AccordionItem`, `Tabs`, `Dropdown`, `MenuItem`, `Menu`.
- `Dropdown` and `MenuItem` graduate from `_internal/` to the public API surface (used previously only by `Select`). The `_internal/` folder is now empty and removed.
- New `Menu` primitive: render-prop trigger + platform-responsive presentation (anchored popover on web via `Modal` + `measureInWindow`; bottom sheet on iOS / Android). Reuses the public `Dropdown` + `MenuItem` internally.
- `Accordion` supports standalone mode (`AccordionItem` with `defaultOpen`) or grouped mode (`AccordionGroup` with `defaultValue`). Animated height (200ms layout-driver) measured from inner content; chevron rotation 0→90° via native-driver `Animated.timing`.
- `Tabs` ships three visual types (`pill`, `underline`, `segmented`) and three sizes (sm 28 / md 32 / lg 40). Sliding highlight tracks the active tab via measured layouts; `translateX` + `width` animated together (200ms ease).

### Divergences from source web

- `AccordionGroup`: dropped the `multiple` open mode (and array `defaultValue`). Native API is single-open only — opening any item closes the previously open one. This matches the intended product behavior; users that need multi-open can compose multiple standalone `AccordionItem`s.
- `Accordion` title weight stays `Inter-Regular` (no `Inter-Medium` swap on open). Open / closed state is differentiated by color only (`basePrimary` / `baseSecondary`).
- `Tabs`: hover-driven highlight is omitted (no hover model on touch). The `underline` type drops the source's `-mb-px` overlap trick (RN borders do not compound the same way as CSS).
- `Menu` is a new primitive with no direct web counterpart — it bundles the `createPortal`-style anchored popover (web) and a bottom-sheet presentation (iOS / Android) behind a single render-prop trigger. The web `chilli-docs` source exposes `Dropdown` + `MenuItem` as public primitives; the consumer wires up the trigger and modal themselves. Native consolidates that wiring.
- `Select` is not yet refactored to use the shared `Menu` presentation. It keeps its own inline `Modal` / sheet copy. Internal refactor is queued for a later phase to avoid risky churn now.

## [0.3.0] — Phase 3 (state controls)

### Added

- Primitives: `Toggle`, `Radio`, `RadioGroup`, `Checkbox`.
- `Toggle` supports tap and pointer drag (via `PanResponder`) with midpoint-snap on release. Press-extend animation uses `transform: scaleX/scaleY` on the thumb (native driver, 60fps) instead of source web's animated `width`/`height`. Track color crossfade is implemented as two stacked layers fading via opacity (native driver compatible).
- `Radio` works standalone (`checked` / `onCheckedChange`) or inside a `RadioGroup` (shared `value` / `onValueChange`, `orientation: 'vertical' | 'horizontal'`).
- `Checkbox` exposes four visual states: unchecked, checked (lucide `Check`), indeterminate (lucide `Minus`), and `number` badge (1-9 with 9px / 11px text inside the brand-filled box).
- Playground screens for each new primitive.

### Divergences from source web

- `Toggle`, `Radio`, `Checkbox`: label and description always render in `bodySm` (P3, `Inter-Regular` 14/20). Source web uses `font-medium` labels with size-scaled text (sm = 14, md = 16) and 12px descriptions. Native unifies on P3 for cohesion across the form-controls family.
- `Toggle` press-extend: implemented via `transform: scaleX / scaleY` (native driver) rather than animating `width` / `height`. Visually equivalent, but layout-driver-free for guaranteed 60fps under JS load.
- `Toggle` track color transition: implemented as two stacked layers with opacity crossfade rather than a single animated `backgroundColor`, because RN `Animated` cannot interpolate colors with the native driver.
- `Toggle` hover-state pill extension (web `PILL_EXTEND = 2`) is omitted on native — there is no hover model on touch.
- `Radio` and `Checkbox`: focus-visible ring (web `focus-visible:shadow-[0_0_0_2px_var(...)]`) is omitted on native.
- `Checkbox` `number` text uses raw 9/11 px font sizes (not in the design-token scale) to mirror the source web `text-[9px]` / `text-[11px]` literals.

## [0.2.0] — Phase 2

### Validated

- Sanity import against an isolated consumer project (tarball via `npm pack`) using hub-aligned peer dep versions (Expo 54, RN 0.81.5, react-native-svg 15.12.1, expo-blur 15.0.8, expo-font 14.0.8, React 19.1). All public primitives, `tokens`, `useLoadChilliFonts`, and exported types (e.g. `SelectOption`) resolve under `strict: true` with `moduleResolution: bundler`. Zero type errors.
- Integration into the hub app itself still requires hub to add `lucide-react-native` to its `package.json` (peer dep of chilli-native, not currently present in hub).

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
