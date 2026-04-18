# Chilli Native Design System — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `packages/chilli-native/` (foundations + 10 primitives, dark only, iOS + RN Web) and `packages/chilli-native-playground/` for visual validation, aligned on Expo SDK 54.

**Architecture:** pnpm workspaces monorepo. Package exports raw TypeScript (`"main": "src/index.ts"`); transpilation handled by Metro/Expo at the consumer side. Foundations contain no JSX; primitives import only foundations; an internal `GlassSurface` primitive (not exported) is the basis for the glass effect, powered by `expo-blur`.

**Tech Stack:** React Native + Expo SDK 54, pnpm workspaces, TypeScript strict, expo-router (playground), expo-blur, expo-font, react-native-svg, lucide-react-native, react-native-web.

**Source of truth:** `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md`. Do not deviate; if a question arises that the spec does not answer, log it as an open question and ask before proceeding.

---

## Build / validation conventions (resolves spec ambiguity)

The spec mentions both "package exports source TypeScript directly" and a "build... produces no warnings" Done criterion. To prevent confusion during execution, this plan defines:

- **`chilli-native` "build"** = TypeScript type-check, no emit. Command: `pnpm --filter chilli-native typecheck` → runs `tsc --noEmit -p .`. The package is **never** bundled in phase 1; consumers (playground, main app) transpile on demand via Metro/Expo.
- **`chilli-native-playground` "build"** = type-check + Expo bundle.
  - Type-check: `pnpm --filter chilli-native-playground typecheck` → `tsc --noEmit -p .`.
  - iOS bundle: `pnpm --filter chilli-native-playground exec expo start` (Metro must boot, no red box, primitives render).
  - Web bundle: `pnpm --filter chilli-native-playground exec expo export --platform web` (must complete, no warnings).
- **"No warnings"** in the Done criteria refers to the two commands above. Warnings emitted from `chilli-docs/` or other parts of the monorepo are out of scope.

There is no Jest, no Vitest, no test runner in phase 1. The "test" surface is:

1. Type-check passes (compile-time test).
2. Playground screen renders without errors (runtime smoke test).
3. Manual visual comparison vs `chilli-docs` demos (acceptance test).

The TDD pattern in this plan is adapted to that reality: the "failing test" step is typically writing the playground usage that will fail to compile or render, then implementing the component until it works.

---

## File structure (phase 1 deliverables)

```
chilli-components/
├── pnpm-workspace.yaml                        # NEW
├── package.json                               # NEW (root, private)
├── .npmrc                                     # NEW (pnpm config)
├── chilli-docs/                               # UNCHANGED
├── docs/superpowers/
│   ├── specs/2026-04-17-chilli-native-phase-1-design.md   # EXISTING
│   └── plans/2026-04-17-chilli-native-phase-1-plan.md     # THIS FILE
└── packages/
    ├── chilli-native/                         # NEW
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── README.md
    │   ├── CHANGELOG.md
    │   ├── assets/fonts/                      # Inter .ttf files
    │   └── src/
    │       ├── index.ts                       # public barrel
    │       ├── foundations/
    │       │   ├── tokens/
    │       │   │   ├── colors.ts
    │       │   │   ├── spacing.ts
    │       │   │   ├── radius.ts
    │       │   │   ├── borderWidth.ts
    │       │   │   ├── size.ts
    │       │   │   ├── typography.ts
    │       │   │   ├── backgrounds.ts
    │       │   │   ├── textColors.ts
    │       │   │   ├── borders.ts
    │       │   │   ├── iconColors.ts
    │       │   │   ├── buttons.ts
    │       │   │   ├── links.ts
    │       │   │   ├── shadows.ts
    │       │   │   └── index.ts
    │       │   ├── theme.ts                   # exports `tokens`, `Tokens`
    │       │   ├── fonts.ts                   # useLoadChilliFonts, fontAssets
    │       │   └── platform/
    │       │       ├── pressable.ts
    │       │       ├── shadow.ts
    │       │       └── index.ts
    │       └── primitives/
    │           ├── _internal/
    │           │   └── GlassSurface/
    │           │       ├── GlassSurface.tsx
    │           │       └── index.ts
    │           ├── Text/
    │           │   ├── Text.tsx
    │           │   └── index.ts
    │           ├── Button/
    │           │   ├── Button.tsx
    │           │   ├── Button.types.ts
    │           │   └── index.ts
    │           ├── Icon/
    │           │   ├── Icon.tsx
    │           │   ├── Icon.types.ts          # IconComponent type, used by Button etc.
    │           │   └── index.ts
    │           ├── IconButton/
    │           │   ├── IconButton.tsx
    │           │   ├── IconButton.types.ts
    │           │   └── index.ts
    │           ├── Badge/
    │           │   ├── Badge.tsx
    │           │   └── index.ts
    │           ├── Chip/
    │           │   ├── Chip.tsx
    │           │   ├── Chip.types.ts
    │           │   └── index.ts
    │           ├── Avatar/
    │           │   ├── Avatar.tsx
    │           │   ├── Avatar.types.ts
    │           │   └── index.ts
    │           ├── AvatarGroup/
    │           │   ├── AvatarGroup.tsx
    │           │   └── index.ts
    │           ├── AvatarDuo/
    │           │   ├── AvatarDuo.tsx
    │           │   └── index.ts
    │           └── AvatarLabel/
    │               ├── AvatarLabel.tsx
    │               └── index.ts
    └── chilli-native-playground/              # NEW
        ├── package.json
        ├── tsconfig.json
        ├── app.json
        ├── babel.config.js
        ├── metro.config.js                    # symlink + workspace resolution
        ├── index.ts                           # expo-router entry
        └── app/
            ├── _layout.tsx                    # Stack + useLoadChilliFonts gate
            ├── index.tsx                      # primitive index/links
            ├── text.tsx
            ├── button.tsx
            ├── icon.tsx
            ├── icon-button.tsx
            ├── badge.tsx
            ├── chip.tsx
            ├── avatar.tsx
            ├── avatar-group.tsx
            ├── avatar-duo.tsx
            ├── avatar-label.tsx
            └── profile-card.tsx               # final assembly screen
```

---

## Critical path summary

```
Phase 0  Workspace setup             ──┐
Phase 1  Package skeleton              │  (no dependents — done in sequence early)
Phase 2  Primitive tokens              │
Phase 3  Semantic tokens + theme       │
Phase 4  Platform helpers              │
Phase 5  Fonts                         │
Phase 6  Initial public exports        │
Phase 7  Playground setup            ──┤
Phase 8  GlassSurface (internal)       │  (required for Button glass)
Phase 9  Text  ──────────────────────┐ │
Phase 10 Button (consumes GlassSurface, IconComponent type)
Phase 11 Icon  ──────────────────────┤
Phase 12 IconButton (consumes GlassSurface, IconComponent)
Phase 13 Badge
Phase 14 Chip
Phase 15 Avatar
Phase 16 AvatarGroup (consumes Avatar)
Phase 17 AvatarDuo (consumes Avatar)
Phase 18 AvatarLabel (consumes Avatar + Text)
Phase 19 Profile-card assembly screen
Phase 20 Visual comparison vs chilli-docs (full audit)
Phase 21 Main-app integration check (highly desirable, non-blocking)
Phase 22 README + CHANGELOG + divergences finalization → Done
```

The intended primitive priority (Text, Button, Icon, IconButton, Badge, Chip, Avatar, AvatarGroup, AvatarDuo, AvatarLabel) is preserved.

**Why this order reduces risk:**

- **Text first** — exercises typography tokens (`textStyles`, `fontSize`, `lineHeight`, `fontFamily`). If `textStyles` are wrong or font loading fails, every later primitive will inherit the bug. Catching it on the simplest primitive is cheapest.
- **Button second** — exercises every type of token (background state slots, borderRadius, sizing scale, shadows, glass via GlassSurface). The richest primitive; if it works, foundations are largely validated.
- **Icon third** — Button declares `leftIcon`/`rightIcon` typed as `IconComponent`. The type is created during Phase 10 (Button) in `primitives/Icon/Icon.types.ts`, but the runtime component is built here. This staggers the work without re-ordering the priority.
- **IconButton fourth** — composes Button + Icon. Validates that the two earlier primitives compose cleanly.
- **Badge fifth** — first purely visual primitive after the interactive ones. Validates that the API conventions still hold for non-interactive components.
- **Chip sixth** — combines text + optional avatar/icon + remove button. Internal-only `Image` for the avatar variant (Avatar primitive doesn't exist yet, intentional to respect priority).
- **Avatar seventh** — image + initials fallback. Foundation for the next three.
- **AvatarGroup, AvatarDuo, AvatarLabel** — composers on top of Avatar (and Text for AvatarLabel). Cheap once Avatar is solid.

---

## Discipline checks (run at the end of every primitive phase)

Before committing any primitive, the engineer verifies in this exact order:

1. **No invented tokens.** Every color, spacing, radius, font value used in the primitive maps to an existing entry in `tokens.*`. If a token seems missing, re-check the source `chilli-docs/app/globals.css` first; only add to `foundations/tokens/` if the source has the value too. Never invent.
2. **No hex literals in `.tsx`.** Run `rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/<Name>/` — must return nothing (color-token strings already passed through `tokens.*`).
3. **No `Platform.select` in `primitives/`.** Run `rg -n "Platform\\.(select|OS)" packages/chilli-native/src/primitives/` — must return nothing.
4. **Accessibility defaults present.** Interactive primitives expose `accessibilityRole` by default and accept `accessibilityLabel`. Presentational primitives do not expose interactive a11y semantics.
5. **Style prop accepted last.** Searching for `style` in the component file confirms the consumer override merges last.
6. **CHANGELOG entry.** If any token, helper, or convention changed during this primitive's work, log it under "## Unreleased" with a one-line entry.

These six checks are enumerated in every primitive phase's Done criteria.

---

## Phase 0 — Monorepo workspace setup

**Objective:** Convert `chilli-components/` into a working pnpm workspace without disturbing `chilli-docs/`.

**Files to create/edit:**
- Create: `pnpm-workspace.yaml`
- Create: `package.json` (root)
- Create: `.npmrc`
- Create: `.gitignore` (extend existing)

**Prerequisites:**
- pnpm >= 9 installed locally (`pnpm --version`).
- Node >= 20.
- `chilli-components/` is the working directory.

**Tasks**

### Task 0.1: Create root `pnpm-workspace.yaml`

- [ ] **Step 1: Create the file.**

```yaml
# pnpm-workspace.yaml
packages:
  - "packages/*"
```

Note: `chilli-docs/` is intentionally NOT in the workspace. It stays as a stand-alone Next.js app.

- [ ] **Step 2: Commit.**

```bash
git add pnpm-workspace.yaml
git commit -m "chore: introduce pnpm workspace at monorepo root"
```

### Task 0.2: Create root `package.json`

- [ ] **Step 1: Create the file.**

```json
{
  "name": "chilli-components-monorepo",
  "private": true,
  "version": "0.0.0",
  "engines": {
    "node": ">=20",
    "pnpm": ">=9"
  },
  "scripts": {
    "typecheck": "pnpm -r --filter \"./packages/*\" typecheck",
    "playground:ios": "pnpm --filter chilli-native-playground exec expo start --ios",
    "playground:web": "pnpm --filter chilli-native-playground exec expo start --web",
    "playground:export-web": "pnpm --filter chilli-native-playground exec expo export --platform web"
  }
}
```

- [ ] **Step 2: Commit.**

```bash
git add package.json
git commit -m "chore: add root package.json with workspace scripts"
```

### Task 0.3: Create `.npmrc` for hoisting compatibility with Expo

- [ ] **Step 1: Create the file.**

```
# .npmrc
node-linker=hoisted
strict-peer-dependencies=false
auto-install-peers=true
```

Rationale: Expo and Metro behave best with hoisted node_modules. Strict peer deps off prevents friction with React Native's loose peer constraints.

- [ ] **Step 2: Commit.**

```bash
git add .npmrc
git commit -m "chore: configure pnpm for Expo compatibility (hoisted linker)"
```

### Task 0.4: Extend `.gitignore`

- [ ] **Step 1: Append the following block to the existing `.gitignore` at repo root.**

```
# pnpm
node_modules/
.pnpm-store/

# Expo
**/.expo/
**/dist/
**/web-build/

# OS
.DS_Store

# IDE
.idea/
*.swp
```

- [ ] **Step 2: Commit.**

```bash
git add .gitignore
git commit -m "chore: extend .gitignore for monorepo + Expo artifacts"
```

### Task 0.5: Verify workspace boots

- [ ] **Step 1: Run pnpm install (creates lockfile, no packages yet).**

Run: `pnpm install`
Expected: completes without error, creates `pnpm-lock.yaml`. No packages discovered yet (packages/ is empty).

- [ ] **Step 2: Verify workspace recognized.**

Run: `pnpm -r --filter "./packages/*" exec pwd`
Expected: prints nothing (no packages yet) but exits with code 0.

- [ ] **Step 3: Commit lockfile.**

```bash
git add pnpm-lock.yaml
git commit -m "chore: add initial pnpm lockfile"
```

**Phase 0 Definition of Done**

- [ ] `pnpm-workspace.yaml`, root `package.json`, `.npmrc`, extended `.gitignore`, `pnpm-lock.yaml` all committed.
- [ ] `chilli-docs/` builds untouched (sanity check: `cd chilli-docs && pnpm run dev` boots if it did before — not required to actually run, but must not have been modified).
- [ ] `pnpm install` succeeds at repo root.

**Risks / blockers**

- pnpm version mismatch with lockfile format. Mitigation: pin `engines.pnpm: ">=9"` in root `package.json`.
- Existing `node_modules/` inside `chilli-docs/` may confuse pnpm if the user runs install at root. Mitigation: leave `chilli-docs` outside the workspace (already done) and let it keep its own npm-managed install.

---

## Phase 1 — `chilli-native` package skeleton

**Objective:** Create an empty, type-checkable, publishable-shaped package with no source content yet.

**Files to create:**
- `packages/chilli-native/package.json`
- `packages/chilli-native/tsconfig.json`
- `packages/chilli-native/README.md`
- `packages/chilli-native/CHANGELOG.md`
- `packages/chilli-native/src/index.ts`

**Prerequisites:** Phase 0 complete.

### Task 1.1: Create the package directory and `package.json`

- [ ] **Step 1: Create directory.**

```bash
mkdir -p packages/chilli-native/src
```

- [ ] **Step 2: Create `packages/chilli-native/package.json`.**

```json
{
  "name": "chilli-native",
  "version": "0.0.0",
  "private": true,
  "description": "Chilli design system for React Native + Expo (phase 1: foundations + primitives, dark only).",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "react-native": "src/index.ts",
  "sideEffects": false,
  "scripts": {
    "typecheck": "tsc --noEmit -p ."
  },
  "peerDependencies": {
    "react": "*",
    "react-native": "*",
    "expo": "*",
    "expo-blur": "*",
    "expo-font": "*",
    "react-native-svg": "*",
    "lucide-react-native": "*"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "~18.3.0"
  }
}
```

Rationale:
- `"main": "src/index.ts"` — Metro/Expo will transpile via Babel preset; no bundler needed.
- All runtime libs listed as `peerDependencies` so the consumer (playground, main app) provides them. This avoids version drift.
- `"private": true` — not published to npm in phase 1.

- [ ] **Step 3: Install dev deps.**

Run: `pnpm install`
Expected: installs `typescript` and `@types/react` in `packages/chilli-native/node_modules` (or hoisted to root depending on pnpm settings).

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native/package.json pnpm-lock.yaml
git commit -m "feat(native): add chilli-native package skeleton"
```

### Task 1.2: Create `tsconfig.json`

- [ ] **Step 1: Create `packages/chilli-native/tsconfig.json`.**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-native",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["react-native"]
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 2: Informational typecheck (TS18003 is expected at this stage).**

TypeScript 5.x fails with `error TS18003: No inputs were found in config file ...` when the `include` glob matches zero files. Since `src/` is still empty at this point, this error is **expected and accepted**. Run the typecheck informationally to confirm TS18003 is the ONLY error (no unknown option, no missing type definitions, no other real problem):

```bash
pnpm --filter chilli-native typecheck || echo "EXPECTED-TS18003"
```

Expected output: `error TS18003` followed by the `EXPECTED-TS18003` marker. Any other error (TS5053 for unknown option, TS2688 for missing type definitions, TS6053 for file not found, etc.) is a real problem — stop and report.

**Actual typecheck validation for this package** moves to Task 1.3 Step 4, once `src/index.ts` exists.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/tsconfig.json
git commit -m "chore(native): add strict tsconfig for chilli-native"
```

### Task 1.3: Create initial `src/index.ts` and stub docs

- [ ] **Step 1: Create `packages/chilli-native/src/index.ts`.**

```ts
// Public exports for chilli-native (filled in as foundations and primitives land).
export {};
```

- [ ] **Step 2: Create `packages/chilli-native/README.md`.**

```markdown
# chilli-native

React Native + Expo design system for Chilli. Phase 1: foundations + 10 primitives, dark mode only, iOS + RN Web.

See `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md` (in the monorepo root) for the full design.

## Status

In active development. Public API is not stable until phase 1 is closed.

## Install (consumer side)

This package is consumed via local pnpm workspace link:

```json
{
  "dependencies": {
    "chilli-native": "workspace:*"
  }
}
```

It expects the consumer to provide:

- `react`, `react-native`, `expo` (SDK 54)
- `expo-blur`, `expo-font`
- `react-native-svg`
- `lucide-react-native`

## Conventions

- Foundations contain no JSX (tokens + helpers only).
- Primitives import only from foundations.
- All platform branching lives in `foundations/platform/`. No `Platform.select` in primitives.
- Dark mode only in phase 1.
```

- [ ] **Step 3: Create `packages/chilli-native/CHANGELOG.md`.**

```markdown
# Changelog

All notable token-level, helper-level, and convention-level decisions are recorded here as they happen during phase 1.

## [Unreleased]
```

- [ ] **Step 4: Type-check (first real validation gate for the package).**

Now that `src/index.ts` exists, the `include: ["src/**/*"]` glob resolves to one file and TypeScript no longer errors with TS18003. This is the **first actual typecheck validation** for the chilli-native package (Task 1.2 Step 2 was informational only, see the deviation note there).

Run: `pnpm --filter chilli-native typecheck`
Expected: exit 0, no errors.

- [ ] **Step 5: Commit.**

```bash
git add packages/chilli-native/src packages/chilli-native/README.md packages/chilli-native/CHANGELOG.md
git commit -m "docs(native): add README, CHANGELOG, and empty index barrel"
```

**Phase 1 Definition of Done**

- [ ] `chilli-native` package exists, installs cleanly, and type-checks.
- [ ] Empty `src/index.ts` is exported.
- [ ] README and CHANGELOG present.

**Risks / blockers**

- React Native types via `"types": ["react-native"]` may not resolve before Phase 7 installs `react-native` as a dev/peer dep at the workspace level. Mitigation: if `tsc` complains about missing `react-native` types, install it as a workspace devDependency at root (`pnpm add -Dw react-native@<sdk-54-version>`) — this is acceptable monorepo hygiene and does not violate the spec's no-web-only-deps rule.

---

## Phase 2 — Foundations: primitive tokens

**Objective:** Port every primitive token from `chilli-docs/app/globals.css` `:root` block to typed TS, dark only. No semantic tokens yet.

**Files to create:**
- `packages/chilli-native/src/foundations/tokens/colors.ts`
- `packages/chilli-native/src/foundations/tokens/spacing.ts`
- `packages/chilli-native/src/foundations/tokens/radius.ts`
- `packages/chilli-native/src/foundations/tokens/borderWidth.ts`
- `packages/chilli-native/src/foundations/tokens/size.ts`
- `packages/chilli-native/src/foundations/tokens/typography.ts`
- `packages/chilli-native/src/foundations/tokens/index.ts`

**Prerequisites:** Phase 1.

**Conversion rules (apply consistently):**

1. `--color-brand-800` → `colors.brand[800]`. Numeric scale stays numeric, used as bracket-key.
2. `--color-other-neon-pink-lighter` → `colors.other.neonPink.lighter`. kebab → camelCase, dashes between scope and name preserved as nested object.
3. `--space-6` → `spacing[6]` (number value in px).
4. `--font-family-primary` → `fontFamily.primary` (string value).
5. Light-mode CSS variables (the `:root` block past line ~284) are **ignored**; dark only.
6. All tokens declared `as const` so `Tokens` derives a discriminated literal type.

**Reference for token values:** `chilli-docs/app/globals.css`. The engineer reads the file once and copies values mechanically. No invention.

### Task 2.1: Port `colors.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/colors.ts`.**

Read `chilli-docs/app/globals.css` lines 12–172 for the `:root` color section. Convert per the rules above. The file structure must be:

```ts
export const colors = {
  white: '#ffffff',
  black: '#140f14',

  neutral: {
    50: '#f5f5f5',
    100: '#efefef',
    200: '#e5e5e5',
    300: '#cfcecf',
    400: '#a3a3a3',
    500: '#737373',
    600: '#545454',
    700: '#424242',
    800: '#2c2c2c',
    850: '#26232a',
    900: '#211d23',
    950: '#140f14',
  },

  brand: {
    50: '#fff6fe',
    100: '#ffedfd',
    200: '#ffe3fc',
    300: '#ffc9f9',
    400: '#ffb0f6',
    500: '#ff96f4',
    600: '#ff92f4',
    700: '#ff6ef1',
    800: '#ff4beb',
    900: '#e544d6',
    950: '#661e5f',
  },

  success: {
    50: '#f6fef9',
    100: '#ecfdf3',
    200: '#dcfae6',
    300: '#a9efc5',
    400: '#75e0a7',
    500: '#47cd89',
    600: '#17b26a',
    700: '#079455',
    800: '#067647',
    900: '#085d3a',
    950: '#074d31',
  },

  danger: {
    50: '#fffbfa',
    100: '#fef3f2',
    200: '#fee4e2',
    300: '#fecdca',
    400: '#fda29b',
    500: '#f97066',
    600: '#f04438',
    700: '#d92d20',
    800: '#b42318',
    900: '#912018',
    950: '#7a271a',
  },

  warning: {
    50: '#fffcf5',
    100: '#fffaeb',
    200: '#fef0c7',
    300: '#fedf89',
    400: '#fec84b',
    500: '#fdb022',
    600: '#f79009',
    700: '#dc6803',
    800: '#b54708',
    900: '#93370d',
    950: '#7a2e0e',
  },

  link: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bedbff',
    300: '#8ec5ff',
    400: '#51a2ff',
    500: '#2b7fff',
    600: '#155dfc',
    700: '#1447e6',
    800: '#193cb8',
    900: '#1c398e',
    950: '#162456',
  },

  opacity: {
    neutral: {
      50: 'rgba(245, 245, 245, 0.02)',
      100: 'rgba(245, 245, 245, 0.03)',
      200: 'rgba(245, 245, 245, 0.06)',
      300: 'rgba(245, 245, 245, 0.08)',
      400: 'rgba(245, 245, 245, 0.13)',
      500: 'rgba(245, 245, 245, 0.21)',
      600: 'rgba(245, 245, 245, 0.34)',
      700: 'rgba(245, 245, 245, 0.55)',
      800: 'rgba(245, 245, 245, 0.78)',
      900: '#f5f5f5',
    },
    inverse: {
      50: 'rgba(20, 15, 20, 0.02)',
      100: 'rgba(20, 15, 20, 0.03)',
      200: 'rgba(20, 15, 20, 0.05)',
      300: 'rgba(20, 15, 20, 0.08)',
      400: 'rgba(20, 15, 20, 0.24)',
      500: 'rgba(20, 15, 20, 0.32)',
      600: 'rgba(20, 15, 20, 0.56)',
      700: 'rgba(20, 15, 20, 0.64)',
      800: 'rgba(20, 15, 20, 0.8)',
      900: '#140f14',
    },
    brand: {
      50: 'rgba(255, 75, 235, 0.02)',
      100: 'rgba(255, 75, 235, 0.03)',
      200: 'rgba(255, 75, 235, 0.05)',
      300: 'rgba(255, 75, 235, 0.08)',
      400: 'rgba(255, 75, 235, 0.13)',
      500: 'rgba(255, 75, 235, 0.21)',
      600: 'rgba(255, 75, 235, 0.34)',
      700: 'rgba(255, 75, 235, 0.55)',
      800: 'rgba(255, 75, 235, 0.89)',
      900: '#ff4beb',
    },
  },

  other: {
    neonPink:        { lighter: '#ffebf1', strong: '#ff2a6b' },
    brightPink:      { lighter: '#ffebf5', strong: '#ff329f' },
    electricMagenta: { lighter: '#faecfb', strong: '#f133fb' },
    purple:          { lighter: '#f4ebff', strong: '#a350ff' },
    ultraBlue:       { lighter: '#eeecfb', strong: '#5b47fb' },
    blue:            { lighter: '#ebf5ff', strong: '#0283ff' },
    cyanBlue:        { lighter: '#e5eff4', strong: '#00a8f4' },
    liquidBlue:      { lighter: '#ebf9ff', strong: '#00b4ff' },
    brightCyan:      { lighter: '#e8fafc', strong: '#06bacd' },
    caribbeanGreen:  { lighter: '#e8fcf6', strong: '#01b980' },
    limeGreen:       { lighter: '#e8fcf0', strong: '#00c849' },
    lime:            { lighter: '#f5ffeb', strong: '#6ccf00' },
    yellow:          { lighter: '#f6f2e7', strong: '#f6b101' },
    amberOrange:     { lighter: '#fef6ea', strong: '#fe9a01' },
    orange:          { lighter: '#fef2ea', strong: '#fe6702' },
    red:             { lighter: '#ffebec', strong: '#ff2a3b' },
    antiqueGold:     { lighter: '#fffbf0', strong: '#d6b44d' },
    desertOrange:    { lighter: '#fff4eb', strong: '#d1894b' },
    grey:            { lighter: '#f9fafb', strong: '#344054' },
    midnightBlue:    { lighter: '#ebf4ff', strong: '#02346b' },
  },
} as const;

export type Colors = typeof colors;
```

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/colors.ts
git commit -m "feat(native): port primitive color tokens (dark, mirror of source)"
```

### Task 2.2: Port `spacing.ts`, `radius.ts`, `borderWidth.ts`, `size.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/spacing.ts`.**

```ts
export const spacing = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 20,
  8: 24,
  9: 32,
  10: 40,
  11: 48,
  12: 64,
  13: 80,
  14: 96,
  15: 160,
  16: 260,
} as const;

export type Spacing = typeof spacing;
```

- [ ] **Step 2: Create `packages/chilli-native/src/foundations/tokens/radius.ts`.**

```ts
export const radius = {
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 12,
  6: 16,
  7: 24,
  8: 32,
  full: 9999,
} as const;

export type Radius = typeof radius;
```

- [ ] **Step 3: Create `packages/chilli-native/src/foundations/tokens/borderWidth.ts`.**

```ts
export const borderWidth = {
  0: 0,
  1: 0.5,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 6,
  7: 8,
} as const;

export type BorderWidth = typeof borderWidth;
```

- [ ] **Step 4: Create `packages/chilli-native/src/foundations/tokens/size.ts`.**

```ts
export const size = {
  1: 4,
  2: 6,
  3: 8,
  4: 12,
  5: 16,
  6: 20,
  7: 24,
  8: 32,
  9: 40,
  10: 48,
  11: 56,
  12: 64,
  13: 72,
  14: 80,
  15: 96,
  16: 128,
} as const;

export type Size = typeof size;
```

- [ ] **Step 5: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 6: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/{spacing,radius,borderWidth,size}.ts
git commit -m "feat(native): port spacing/radius/borderWidth/size primitive tokens"
```

### Task 2.3: Port `typography.ts` (scales + initial textStyles)

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/typography.ts`.**

```ts
import type { TextStyle } from 'react-native';

export const fontSize = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
} as const;

export const lineHeight = {
  '2xs': 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 46,
  '5xl': 54,
  '6xl': 66,
  '7xl': 78,
  '8xl': 106,
  '9xl': 136,
} as const;

export const letterSpacing = {
  xs: -2,
  sm: -1,
  md: 0,
  lg: 1,
  xl: 2,
} as const;

export const fontFamily = {
  primary: 'SF Pro Display',
  secondary: 'Inter',
} as const;

/**
 * Pre-baked text styles. Derived/interpreted from observed usage in `chilli-docs/components/`.
 * NOT a 1:1 mirror of source CSS variables — see CHANGELOG and spec section 6.5.
 *
 * Initial set covers body sizes used by the phase 1 primitives. Headings are added when a
 * primitive (or playground assembly) requires them.
 */
export const textStyles = {
  bodyXs: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontFamily: fontFamily.secondary,
    fontWeight: '500',
    letterSpacing: letterSpacing.md,
  },
  bodySm: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontFamily: fontFamily.secondary,
    fontWeight: '500',
    letterSpacing: letterSpacing.md,
  },
  bodyMd: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontFamily: fontFamily.secondary,
    fontWeight: '500',
    letterSpacing: letterSpacing.md,
  },
} as const satisfies Record<string, TextStyle>;

export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type FontFamily = typeof fontFamily;
export type TextStyles = typeof textStyles;
export type TextStyleVariant = keyof typeof textStyles;
```

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass. If `react-native` types are not resolved at this point, install it at root: `pnpm add -Dw react-native@~0.74.0` (the version aligned with Expo SDK 54).

- [ ] **Step 3: Add CHANGELOG entry.**

Append under `## [Unreleased]` in `packages/chilli-native/CHANGELOG.md`:

```markdown
- `textStyles.bodyXs|bodySm|bodyMd` introduced as a derived/interpreted layer on top of the source `fontSize` / `lineHeight` / `fontFamily` primitives. Mapping: bodyXs → 12/16/Inter/500, bodySm → 14/20/Inter/500, bodyMd → 16/24/Inter/500. Headings deferred until first needed.
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/typography.ts packages/chilli-native/CHANGELOG.md
git commit -m "feat(native): port typography primitives + initial textStyles"
```

### Task 2.4: Create `tokens/index.ts` barrel for primitives

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/index.ts` (primitives only for now).**

```ts
export { colors } from './colors';
export type { Colors } from './colors';
export { spacing } from './spacing';
export type { Spacing } from './spacing';
export { radius } from './radius';
export type { Radius } from './radius';
export { borderWidth } from './borderWidth';
export type { BorderWidth } from './borderWidth';
export { size } from './size';
export type { Size } from './size';
export {
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
} from './typography';
export type {
  FontSize,
  LineHeight,
  LetterSpacing,
  FontFamily,
  TextStyles,
  TextStyleVariant,
} from './typography';
```

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/index.ts
git commit -m "feat(native): add primitive tokens barrel"
```

**Phase 2 Definition of Done**

- [ ] `colors.ts` mirrors source `:root` color block (white, black, neutral, brand, success, danger, warning, link, opacity { neutral, inverse, brand }, other { 20 named pairs }).
- [ ] `spacing.ts`, `radius.ts`, `borderWidth.ts`, `size.ts` match source numeric scales.
- [ ] `typography.ts` exposes scales + initial `textStyles` (bodyXs/Sm/Md) with CHANGELOG entry documenting their derived nature.
- [ ] `tokens/index.ts` re-exports all primitive tokens.
- [ ] `pnpm --filter chilli-native typecheck` passes.

**Risks / blockers**

- Numeric keys on a string-key object (`fontSize['2xs']`) — TypeScript is fine with it; consumers must use bracket access for non-identifier keys. Documented by example in the textStyles file.
- `react-native` types not installed → `TextStyle` import fails. Mitigation: install `react-native` as workspace devDep (see Task 2.3 step 2).
- Engineer mistypes a hex value during conversion. Mitigation: after Phase 3, run a one-off `diff` review between extracted token values and the source CSS — see Phase 3 Done checklist.

---

## Phase 3 — Foundations: semantic tokens + theme aggregate

**Objective:** Port every semantic token from the source `dark` block (`.dark { ... }` in `chilli-docs/app/globals.css`, lines ~516 onward) into the seven semantic files, then aggregate everything into a typed `tokens` object.

**Files to create:**
- `packages/chilli-native/src/foundations/tokens/backgrounds.ts`
- `packages/chilli-native/src/foundations/tokens/textColors.ts`
- `packages/chilli-native/src/foundations/tokens/borders.ts`
- `packages/chilli-native/src/foundations/tokens/iconColors.ts`
- `packages/chilli-native/src/foundations/tokens/buttons.ts`
- `packages/chilli-native/src/foundations/tokens/links.ts`
- `packages/chilli-native/src/foundations/tokens/shadows.ts`
- `packages/chilli-native/src/foundations/theme.ts`

**Files to edit:**
- `packages/chilli-native/src/foundations/tokens/index.ts` (extend barrel)

**Conversion rules (semantic-specific):**

1. `--backgrounds-neutral-primary-default` → `backgrounds.neutral.primary.default`. The dash between scope words becomes nesting; the trailing `-default`/`-hover`/`-pressed` becomes the leaf state.
2. `--text-base-primary` → `textColors.basePrimary`. The CSS namespace `text` becomes module name `textColors` to avoid runtime conflict with the `Text` component. Within the module, use camelCase.
3. `--btn-brand-bg-hover` → `buttons.brand.bgHover`. State suffix becomes camelCased property (`bg`, `bgHover`, `bgPressed`, `bgDisabled`, `text`).
4. `--icon-neutral-primary` → `iconColors.neutralPrimary`.
5. `--link-primary` → `links.primary`.
6. `--shadow-brand-moderate` → `shadows.brandModerate`. Shadow tokens carry `{ color, offsetX, offsetY, blur, spread? }` per the `ShadowToken` type. Source CSS only specifies color; offsets/blur are derived from observed demo usage and must be tuned during Phase 10 (Button). For now, use the placeholder values listed in Task 3.7.
7. Where the source semantic value points to a primitive (e.g., `--backgrounds-base: #140f14`), reference the primitive token in TS (`colors.black`) instead of duplicating the literal — except where the value uses an `rgba(...)` overlay, which is inlined as a string.
8. **Skip these source tokens** — not needed in phase 1 (no equivalent on RN, or out of scope):
   - `--sidebar-width`, `--header-height` (web layout only)
   - `--root-color-*` (legacy compat)
   - `--breakpoint-*` (no responsive helpers in phase 1)

### Task 3.1: Port `backgrounds.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/backgrounds.ts`.**

```ts
import { colors } from './colors';

export const backgrounds = {
  base: colors.black,
  elevated: colors.black,
  selected: colors.brand[950],
  fixed: colors.neutral[900],
  disabled: 'rgba(245, 245, 245, 0.08)',

  neutral: {
    primary: {
      default: colors.neutral[900],
      hover: colors.neutral[800],
      pressed: colors.neutral[800],
    },
    secondary: {
      default: colors.neutral[850],
      hover: colors.neutral[800],
      pressed: colors.neutral[800],
    },
    tertiary: {
      default: colors.neutral[700],
      hover: colors.neutral[600],
      pressed: colors.neutral[600],
    },
    inverse: {
      default: colors.neutral[50],
      hover: colors.neutral[300],
      pressed: colors.neutral[300],
    },
    glass: {
      default: 'rgba(245, 245, 245, 0.78)',
      hover: 'rgba(245, 245, 245, 0.55)',
      pressed: 'rgba(245, 245, 245, 0.78)',
    },
    opacity: {
      faint: 'rgba(245, 245, 245, 0.06)',
      lighter: 'rgba(245, 245, 245, 0.08)',
      medium: 'rgba(245, 245, 245, 0.13)',
      moderate: 'rgba(245, 245, 245, 0.34)',
      bolder: 'rgba(245, 245, 245, 0.55)',
      strong: 'rgba(245, 245, 245, 0.78)',
    },
  },

  brand: {
    lighter: {
      default: 'rgba(255, 75, 235, 0.08)',
      hover: 'rgba(255, 75, 235, 0.13)',
      pressed: 'rgba(255, 75, 235, 0.13)',
    },
    strong: {
      default: colors.brand[800],
      hover: colors.brand[900],
      pressed: colors.brand[900],
    },
  },

  danger: {
    lighter: {
      default: colors.danger[900],
      hover: colors.danger[800],
      pressed: colors.danger[800],
    },
    strong: {
      default: colors.danger[600],
      hover: colors.danger[600],
      pressed: colors.danger[600],
    },
  },

  success: {
    lighter: {
      default: colors.success[900],
      hover: colors.success[800],
      pressed: colors.success[800],
    },
    strong: {
      default: colors.success[500],
      hover: colors.success[600],
      pressed: colors.success[600],
    },
  },

  warning: {
    lighter: {
      default: colors.warning[900],
      hover: colors.warning[800],
      pressed: colors.warning[800],
    },
    strong: {
      default: colors.warning[500],
      hover: colors.warning[600],
      pressed: colors.warning[600],
    },
  },

  // Source dark "other" backgrounds use opacity-based lighter variants and a strong tint.
  // Mirror exactly what's in chilli-docs/app/globals.css under the .dark block (lines ~576+).
  other: {
    neonPink:        { lighter: 'rgba(224, 32, 85, 0.2)',   strong: '#ffd6e1' },
    brightPink:      { lighter: 'rgba(208, 33, 133, 0.2)',  strong: '#ffdbf0' },
    electricMagenta: { lighter: 'rgba(192, 16, 232, 0.2)',  strong: '#f4c4ff' },
    purple:          { lighter: 'rgba(123, 31, 255, 0.2)',  strong: '#d5b8ff' },
    ultraBlue:       { lighter: 'rgba(63, 48, 255, 0.2)',   strong: '#63a7ff' },
    blue:            { lighter: 'rgba(1, 96, 204, 0.2)',    strong: '#33b4ff' },
    cyanBlue:        { lighter: 'rgba(0, 134, 196, 0.2)',   strong: '#33beff' },
    liquidBlue:      { lighter: 'rgba(0, 150, 224, 0.2)',   strong: '#4dc4ff' },
    brightCyan:      { lighter: 'rgba(4, 144, 163, 0.2)',   strong: '#06e1ff' },
    caribbeanGreen:  { lighter: 'rgba(1, 153, 102, 0.2)',   strong: '#02ffaa' },
    limeGreen:       { lighter: 'rgba(0, 167, 56, 0.2)',    strong: '#00ff56' },
    lime:            { lighter: 'rgba(83, 164, 0, 0.2)',    strong: '#81ff00' },
    yellow:          { lighter: 'rgba(196, 138, 0, 0.2)',   strong: '#ffc333' },
    amberOrange:     { lighter: 'rgba(204, 118, 0, 0.2)',   strong: '#ffa933' },
    orange:          { lighter: 'rgba(204, 78, 0, 0.2)',    strong: '#ff8133' },
    red:             { lighter: 'rgba(208, 32, 46, 0.2)',   strong: '#ff6672' },
    antiqueGold:     { lighter: 'rgba(163, 130, 56, 0.2)',  strong: '#ffc033' },
    desertOrange:    { lighter: 'rgba(160, 102, 54, 0.2)',  strong: '#ff8f33' },
    grey:            { lighter: 'rgba(245, 245, 245, 0.02)', strong: '#ffffff' },
    midnightBlue:    { lighter: 'rgba(4, 81, 154, 0.2)',    strong: '#54acff' },
  },
} as const;

export type Backgrounds = typeof backgrounds;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 518–616) during Phase 3 Task 3.1 execution. Notable correction from the plan's initial draft: `lime.strong` is `#81ff00` (source), not `#aaff00` (initial plan guess). The `grey.strong = #ffffff` entry is intentional in source — preserved verbatim.

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/backgrounds.ts
git commit -m "feat(native): port semantic background tokens (dark)"
```

### Task 3.2: Port `textColors.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/textColors.ts`.**

Read source `.dark { ... }` `--text-*`, `--text-selected`, etc. Convert as kebab → camelCase.

```ts
import { colors } from './colors';

export const textColors = {
  basePrimary: colors.neutral[50],
  baseSecondary: colors.neutral[400],
  baseAlternate: colors.neutral[950],
  baseDisabled: colors.neutral[500],
  baseLink: colors.link[500],
  baseLinkFocus: colors.link[400],
  selected: colors.brand[800],
  disabled: 'rgba(245, 245, 245, 0.08)',
  fixed: colors.white,
  inverse: colors.neutral[950],
  brandPrimary: colors.brand[800],
  brandSecondary: colors.brand[600],
  dangerPrimary: colors.danger[600],
  dangerSecondary: colors.danger[400],
  warningPrimary: colors.warning[500],
  warningSecondary: colors.warning[400],
  successPrimary: colors.success[500],
  successSecondary: colors.success[400],
  glassPrimary: 'rgba(245, 245, 245, 0.78)',
  glassSubtle: 'rgba(245, 245, 245, 0.34)',
} as const;

export type TextColors = typeof textColors;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 619–638) during Phase 3 Task 3.2 execution. Notable corrections from the plan's initial draft:
- `baseAlternate`: `neutral[900]` → `neutral[950]` (source `#140f14`).
- `baseLink` / `baseLinkFocus`: swap — source `--text-base-link=#2b7fff` is `link[500]`, `--text-base-link-focus=#51a2ff` is `link[400]`.
- `disabled`: `neutral[500]` → inline `'rgba(245, 245, 245, 0.08)'` (source is an opacity token, not a neutral hex).
- `fixed`: `neutral[50]` → `colors.white` (source `#ffffff`, not `#f5f5f5`).
- `dangerPrimary` / `dangerSecondary`, `warningPrimary` / `warningSecondary`, `successPrimary` / `successSecondary`: all three pairs were swapped in the plan — in dark mode, "primary" text uses the more saturated `[500]/[600]` shade and "secondary" uses the lighter `[400]` shade.

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/textColors.ts
git commit -m "feat(native): port semantic text color tokens (dark)"
```

### Task 3.3: Port `borders.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/borders.ts`.**

```ts
import { colors } from './colors';

export const borders = {
  base: colors.black,
  default: 'rgba(245, 245, 245, 0.08)',
  selected: colors.brand[800],
  divider: 'rgba(20, 15, 20, 0.08)',
  disabled: 'rgba(20, 15, 20, 0.03)',
  neutral: {
    default: colors.neutral[800],
    moderate: colors.neutral[700],
    bolder: colors.neutral[600],
  },
  brand: {
    default: colors.brand[800],
    lighter: colors.brand[600],
  },
  danger: {
    default: colors.danger[500],
    lighter: colors.danger[400],
  },
  warning: {
    default: colors.warning[500],
    lighter: colors.warning[400],
  },
  success: {
    default: colors.success[500],
    lighter: colors.success[400],
  },
  glass: {
    lighter: 'rgba(245, 245, 245, 0.06)',
    medium: 'rgba(245, 245, 245, 0.13)',
    strong: 'rgba(245, 245, 245, 0.78)',
  },
} as const;

export type Borders = typeof borders;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 647–665) during Phase 3 Task 3.3 execution. 17 of 19 entries matched the initial plan draft; 2 required correction:
- `divider`: `'rgba(245, 245, 245, 0.08)'` → `'rgba(20, 15, 20, 0.08)'` (source line 650 uses the inverse overlay, not the neutral one).
- `disabled`: `'rgba(245, 245, 245, 0.03)'` → `'rgba(20, 15, 20, 0.03)'` (source line 651, same reason).

Semantic pairs (`brand`/`danger`/`warning`/`success` with `{default, lighter}`) and the neutral `{default, moderate, bolder}` scale all matched source with no swaps needed — different from Task 3.2 which had multiple pair inversions. Borders have no state slots in source.

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/borders.ts
git commit -m "feat(native): port semantic border tokens (dark)"
```

### Task 3.4: Port `iconColors.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/iconColors.ts`.**

```ts
import { colors } from './colors';

export const iconColors = {
  neutralPrimary: colors.neutral[50],
  neutralSecondary: colors.neutral[400],
  neutralAlternate: colors.neutral[950],
  neutralDisabled: colors.neutral[600],
  brandPrimary: colors.brand[800],
  brandSecondary: colors.brand[600],
  dangerPrimary: colors.danger[600],
  dangerSecondary: colors.danger[400],
  warningPrimary: colors.warning[500],
  warningSecondary: colors.warning[400],
  successPrimary: colors.success[500],
  successSecondary: colors.success[400],
  linkDefault: colors.link[500],
  linkHover: colors.link[600],
  glassPrimary: 'rgba(245, 245, 245, 0.78)',
  glassSubtle: 'rgba(245, 245, 245, 0.34)',
} as const;

export type IconColors = typeof iconColors;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 668–683) during Phase 3 Task 3.4 execution. 10 of 16 entries required correction from the plan's initial draft:
- `neutralAlternate`: `neutral[800]` → `neutral[950]` (source `#140f14`).
- `neutralDisabled`: `neutral[500]` → `neutral[600]` (source `#545454`, not `#737373`).
- `dangerPrimary` / `dangerSecondary`, `warningPrimary` / `warningSecondary`, `successPrimary` / `successSecondary`: all three pairs swapped (source convention — consistent with Task 3.2 textColors: primary = saturated, secondary = lighter).
- `linkDefault`: `link[400]` → `link[500]` (source `#2b7fff`).
- `linkHover`: `link[300]` → `link[600]` (source `#155dfc`; note: NOT a simple swap like the base/focus pair in textColors — icon hover goes DARKER than default, not to a neighboring shade).
- `glassPrimary` / `glassSubtle`: kept as inline rgba strings (sibling consistency with `backgrounds.ts`, `textColors.ts`, `borders.ts`).

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/iconColors.ts
git commit -m "feat(native): port semantic icon color tokens (dark)"
```

### Task 3.5: Port `buttons.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/buttons.ts`.**

```ts
import { colors } from './colors';

export const buttons = {
  primary: {
    bg: colors.neutral[50],
    bgHover: colors.neutral[300],
    bgPressed: colors.neutral[300],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[950],
  },
  secondary: {
    bg: colors.neutral[850],
    bgHover: colors.neutral[800],
    bgPressed: colors.neutral[800],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[50],
  },
  brand: {
    bg: colors.brand[800],
    bgHover: colors.brand[900],
    bgPressed: colors.brand[900],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[950],
  },
  destructive: {
    bg: colors.danger[600],
    bgHover: colors.danger[600],
    bgPressed: colors.danger[600],
    bgDisabled: 'rgba(245, 245, 245, 0.08)',
    text: colors.white,
  },
  destructiveSecondary: {
    bg: 'rgba(240, 68, 56, 0.12)',
    bgHover: 'rgba(240, 68, 56, 0.2)',
    bgPressed: 'rgba(240, 68, 56, 0.2)',
    text: colors.danger[500],
  },
  glass: {
    primary: {
      bg: 'rgba(255, 75, 235, 0.89)',
      bgHover: 'rgba(255, 75, 235, 0.89)',
      bgPressed: 'rgba(255, 75, 235, 0.89)',
    },
    secondary: {
      bg: 'rgba(245, 245, 245, 0.06)',
      bgHover: 'rgba(245, 245, 245, 0.12)',
      bgPressed: 'rgba(245, 245, 245, 0.12)',
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'rgba(245, 245, 245, 0.06)',
      text: colors.neutral[50],
    },
  },
  disabled: {
    bg: 'rgba(245, 245, 245, 0.08)',
    text: colors.neutral[600],
  },
} as const;

export type Buttons = typeof buttons;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 686–725) during Phase 3 Task 3.5 execution. 15 mismatches found between the plan's initial draft and source; all corrected above. Major corrections:

- **`ghost` variant removed entirely**: source defines NO `--btn-ghost-*` variables (neither in light nor dark block). The web Button source composes its ghost variant from `--backgrounds-neutral-secondary-*` + `--text-base-secondary`, not from dedicated `--btn-*` tokens. This has a downstream implication for Phase 10 — see the note below the buttons definition.
- **`brand.text`**: `colors.white` → `colors.neutral[950]` (source `#140f14`). Dark text on bright magenta background.
- **`destructive.bgHover` / `bgPressed`**: both `danger[700]` → `danger[600]` (same as bg). Source keeps the destructive hover/pressed at the same hue in dark mode — unusual but source-specified.
- **`destructiveSecondary`**: all values changed. Source uses danger-red rgba overlays (rgba(240, 68, 56, 0.12/0.20)), not solid `danger[900]`/`danger[800]`/`danger[300]` shades. Inline rgba strings (no `colors.opacity.danger.*` primitive exists). `text` is `danger[500]` (`#f97066`), not `danger[300]`.
- **`glass.secondary` alpha values**: 0.21/0.13/0.13 → 0.06/0.12/0.12. Source is much more subtle than the plan assumed.
- **`glass.ghost`**: structure changed — removed `bgPressed` (absent from source), added `text: colors.neutral[50]` (source defines `--btn-glass-ghost-text: #f5f5f5`), bgHover 0.05 → 0.06.
- **`disabled.text`**: `colors.neutral[500]` → `colors.neutral[600]` (source `#545454`).

**Downstream implication for Phase 10 Button (note for execution)**: the `VARIANT_TO_BUTTONS_KEY` mapping in the Button primitive implementation currently includes `ghost: 'ghost'`, which no longer type-checks because `buttons.ghost` doesn't exist. When Phase 10 is reached, the implementer must:
1. Remove `ghost` from `VARIANT_TO_BUTTONS_KEY` (make it a partial Record).
2. Handle `variant === 'ghost'` as a special case in Button: use `backgrounds.neutral.secondary.default` for hover bg and `textColors.baseSecondary` for default text color (hover to `textColors.basePrimary`), matching the web Button composition pattern.
3. For `glass` + `ghost`, use `buttons.glass.ghost` (which now includes `text`).
Document this composition decision in the CHANGELOG under Task 3.5.

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/buttons.ts
git commit -m "feat(native): port semantic button tokens (dark)"
```

### Task 3.6: Port `links.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/links.ts`.**

```ts
import { colors } from './colors';

export const links = {
  primary: colors.link[500],
  hover: colors.link[600],
  pressed: colors.link[600],
  visited: colors.link[600],
} as const;

export type Links = typeof links;
```

Values cross-checked against `chilli-docs/app/globals.css` `.dark` block (lines 641–644) during Phase 3 Task 3.6 execution. All 4 entries required correction from the plan's initial draft — the plan assumed dark-mode hover/pressed/visited go *lighter* than primary (`link[300]` = `#8ec5ff`), but source goes *darker* (`link[600]` = `#155dfc`). Consistent with Task 3.4 `iconColors.linkHover` which also went darker on hover.

- `primary`: `link[400]` → `link[500]` (source `#2b7fff`). Note: `--link-primary` has the same value in both light and dark blocks — only the hover/pressed/visited states differ.
- `hover` / `pressed` / `visited`: all `link[300]` → `link[600]` (source `#155dfc`).
- `visited` is present in the source dark block (line 644) — kept in TS. Structure remains symmetric because source is symmetric.

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/links.ts
git commit -m "feat(native): port semantic link tokens (dark)"
```

### Task 3.7: Port `shadows.ts` (with placeholder offsets/blur)

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/tokens/shadows.ts`.**

```ts
/**
 * Source CSS structure is asymmetric across light/dark blocks:
 * - `--shadow-color-lighter`: color-only in both blocks. Offset/blur derived.
 * - `--shadow-brand-moderate` and `--shadow-danger-moderate`: full CSS box-shadow
 *   shorthand in the `.dark` block (`0 4px 14px -2px rgba(...)`) — offset/blur/spread
 *   come from the source shorthand and are NOT derived. The light block stores these
 *   as color-only, but we're dark-only in phase 1.
 *
 * Any adjustment for Phase 10 (Button) will only affect `shadows.lighter` — the other
 * two are source-pinned and change only if the source CSS changes.
 */
export type ShadowToken = {
  color: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
};

export const shadows = {
  lighter: {
    color: 'rgba(0, 0, 0, 0.56)',
    offsetX: 0,
    offsetY: 2,
    blur: 12,
  },
  brandModerate: {
    color: 'rgba(255, 75, 235, 0.2)',
    offsetX: 0,
    offsetY: 4,
    blur: 14,
    spread: -2,
  },
  dangerModerate: {
    color: 'rgba(244, 85, 85, 0.2)',
    offsetX: 0,
    offsetY: 4,
    blur: 14,
    spread: -2,
  },
} as const satisfies Record<string, ShadowToken>;

export type Shadows = typeof shadows;
```

- [ ] **Step 2: Add CHANGELOG entry.**

Append to `packages/chilli-native/CHANGELOG.md` under `## [Unreleased]`:

```markdown
- `shadows.lighter` — color mirrored from source `--shadow-color-lighter` (`rgba(0, 0, 0, 0.56)`). Offset/blur are DERIVED from observation of source demos (source defines color-only for this token). To be re-tuned during Button implementation (Phase 10) by visual side-by-side comparison.
- `shadows.brandModerate` and `shadows.dangerModerate` — ALL fields mirrored from the source `.dark` block. Source stores these two shadows as full CSS box-shadow shorthand (`0 4px 14px -2px rgba(...)`), so offset/blur/spread are source-specified, NOT derived. Note: dark-block colors differ from the light `:root` block (alpha 0.20 vs 0.34; danger uses `rgba(244, 85, 85, ...)` in dark, `rgba(240, 68, 56, ...)` in light).
```

- [ ] **Step 3: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/tokens/shadows.ts packages/chilli-native/CHANGELOG.md
git commit -m "feat(native): port semantic shadow tokens with derivation note"
```

### Task 3.8: Update `tokens/index.ts` and create `theme.ts`

- [ ] **Step 1: Replace `packages/chilli-native/src/foundations/tokens/index.ts` with the full barrel.**

```ts
export { colors } from './colors';
export type { Colors } from './colors';
export { spacing } from './spacing';
export type { Spacing } from './spacing';
export { radius } from './radius';
export type { Radius } from './radius';
export { borderWidth } from './borderWidth';
export type { BorderWidth } from './borderWidth';
export { size } from './size';
export type { Size } from './size';
export {
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
} from './typography';
export type {
  FontSize,
  LineHeight,
  LetterSpacing,
  FontFamily,
  TextStyles,
  TextStyleVariant,
} from './typography';
export { backgrounds } from './backgrounds';
export type { Backgrounds } from './backgrounds';
export { textColors } from './textColors';
export type { TextColors } from './textColors';
export { borders } from './borders';
export type { Borders } from './borders';
export { iconColors } from './iconColors';
export type { IconColors } from './iconColors';
export { buttons } from './buttons';
export type { Buttons } from './buttons';
export { links } from './links';
export type { Links } from './links';
export { shadows } from './shadows';
export type { Shadows, ShadowToken } from './shadows';
```

- [ ] **Step 2: Create `packages/chilli-native/src/foundations/theme.ts`.**

```ts
import {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
  backgrounds,
  textColors,
  borders,
  iconColors,
  buttons,
  links,
  shadows,
} from './tokens';

export const tokens = {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
  backgrounds,
  textColors,
  borders,
  iconColors,
  buttons,
  links,
  shadows,
} as const;

export type Tokens = typeof tokens;
```

- [ ] **Step 3: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 4: Cross-check token completeness against source.**

Manual review: open `chilli-docs/app/globals.css`, walk through each `.dark { ... }` declaration, verify each one is represented in `backgrounds.ts`, `textColors.ts`, `borders.ts`, `iconColors.ts`, `buttons.ts`, `links.ts`, or `shadows.ts`. Skip the explicitly-out-of-scope ones (sidebar/header/breakpoints/legacy-compat). Document any source token that has no clean home — do NOT invent a target file.

- [ ] **Step 5: Commit.**

```bash
git add packages/chilli-native/src/foundations/tokens/index.ts packages/chilli-native/src/foundations/theme.ts
git commit -m "feat(native): aggregate all tokens into typed `tokens` object"
```

**Phase 3 Definition of Done**

- [ ] All seven semantic token files committed and type-check passes.
- [ ] `theme.ts` exports `tokens` and `Tokens` type.
- [ ] Manual cross-check confirms every relevant `.dark` source CSS variable has a TS counterpart.
- [ ] CHANGELOG notes shadow derivation.

**Risks / blockers**

- Source `.dark` block may differ from the structural inversions written above. Mitigation: cross-check task is mandatory — the engineer must look at the actual CSS, not trust the plan's assumed values.
- Some `--backgrounds-other-*` dark variants may not be in the source. If so, document the gap; do not invent.

---

## Phase 4 — Foundations: platform helpers

**Objective:** Implement `pickStateful` / `resolveStateSlot` (state-aware token resolution) and `shadow()` (cross-platform shadow). All `Platform` references confined here.

**Files to create:**
- `packages/chilli-native/src/foundations/platform/pressable.ts`
- `packages/chilli-native/src/foundations/platform/shadow.ts`
- `packages/chilli-native/src/foundations/platform/index.ts`

**Prerequisites:** Phase 3 (needs `ShadowToken` type).

### Task 4.1: Create `pressable.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/platform/pressable.ts`.**

```ts
import { Platform } from 'react-native';

/**
 * Snapshot of a Pressable's interaction state, as exposed by RN's render-prop child.
 * Matches RN's `PressableStateCallbackType`:
 * - `pressed` is always a boolean.
 * - `hovered` / `focused` are optional — undefined on iOS/native, boolean on Web (RN Web).
 *
 * Treat `undefined` as `false` at consumption time.
 */
export type InteractionState = {
  pressed: boolean;
  hovered?: boolean;
  focused?: boolean;
};

export type StateSlot = 'default' | 'hover' | 'pressed';

/**
 * Resolves which token slot to use for the given interaction state.
 * - `pressed` always wins.
 * - `hover` only applies on web AND when hovered/focused is explicitly true.
 * - falls back to `default`.
 */
export function resolveStateSlot(state: InteractionState): StateSlot {
  if (state.pressed) return 'pressed';
  if (Platform.OS === 'web' && (state.hovered === true || state.focused === true)) return 'hover';
  return 'default';
}

/**
 * Picks the stateful value matching the current interaction state.
 * If the requested slot is undefined on `values`, falls back to `default`.
 */
export function pickStateful<T>(
  values: { default: T; hover?: T; pressed?: T },
  state: InteractionState,
): T {
  const slot = resolveStateSlot(state);
  return values[slot] ?? values.default;
}
```

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/platform/pressable.ts
git commit -m "feat(native): add interaction-state helpers (resolveStateSlot, pickStateful)"
```

### Task 4.2: Create `shadow.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/platform/shadow.ts`.**

```ts
import { Platform, type ViewStyle } from 'react-native';
import type { ShadowToken } from '../tokens/shadows';

/**
 * Converts a ShadowToken into a platform-appropriate ViewStyle.
 * - iOS: native shadow* props. The token color carries its alpha; we fix shadowOpacity to 1
 *   and approximate iOS blur as `blur / 2` (CSS blur ≈ 2x iOS shadowRadius perceptually).
 * - Web (RN Web): CSS boxShadow. spread defaults to 0 if not provided.
 */
export function shadow(token: ShadowToken): ViewStyle {
  if (Platform.OS === 'web') {
    const spread = token.spread ?? 0;
    // RN Web accepts boxShadow on style; the type cast is needed because ViewStyle does not
    // include boxShadow in the upstream RN types.
    return {
      boxShadow: `${token.offsetX}px ${token.offsetY}px ${token.blur}px ${spread}px ${token.color}`,
    } as unknown as ViewStyle;
  }
  return {
    shadowColor: token.color,
    shadowOffset: { width: token.offsetX, height: token.offsetY },
    shadowOpacity: 1,
    shadowRadius: token.blur / 2,
  };
}
```

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/platform/shadow.ts
git commit -m "feat(native): add cross-platform shadow() helper"
```

### Task 4.3: Create `platform/index.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/platform/index.ts`.**

```ts
export {
  resolveStateSlot,
  pickStateful,
} from './pressable';
export type { InteractionState, StateSlot } from './pressable';
export { shadow } from './shadow';
```

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/foundations/platform/index.ts
git commit -m "feat(native): add platform helpers barrel"
```

**Phase 4 Definition of Done**

- [ ] `pressable.ts` exports `InteractionState`, `StateSlot`, `resolveStateSlot`, `pickStateful`.
- [ ] `shadow.ts` exports `shadow()`, branching iOS vs Web.
- [ ] No other file in the package references `Platform.OS` or `Platform.select` (verified by grep at next checkpoint).
- [ ] Type-check passes.

**Risks / blockers**

- RN Web `boxShadow` may render differently than iOS native shadows (especially perceived blur). Mitigation: visual side-by-side comparison during Button implementation. Adjust the `blur / 2` heuristic if necessary; document in CHANGELOG.

---

## Phase 5 — Foundations: fonts

**Objective:** Provide `useLoadChilliFonts()` to load Inter weights via `expo-font`. SF Pro Display stays system-fallback per spec strategy 3B.

**Files to create:**
- `packages/chilli-native/assets/fonts/Inter-Regular.ttf`
- `packages/chilli-native/assets/fonts/Inter-Medium.ttf`
- `packages/chilli-native/assets/fonts/Inter-SemiBold.ttf`
- `packages/chilli-native/assets/fonts/Inter-Bold.ttf`
- `packages/chilli-native/src/foundations/fonts.ts`

### Task 5.1: Acquire and place Inter font files

- [ ] **Step 1: Download Inter font files.**

Visit https://fonts.google.com/specimen/Inter (or copy from the main Chilli app's existing assets if available — confirms exact same files end up in both projects). Required weights: Regular (400), Medium (500), SemiBold (600), Bold (700). Italics deferred per spec.

- [ ] **Step 2: Create the assets directory and place the files.**

```bash
mkdir -p packages/chilli-native/assets/fonts
# Copy or move the four .ttf files into packages/chilli-native/assets/fonts/
# Final names (must match exactly):
#   Inter-Regular.ttf
#   Inter-Medium.ttf
#   Inter-SemiBold.ttf
#   Inter-Bold.ttf
ls packages/chilli-native/assets/fonts
```

Expected: lists the four files.

- [ ] **Step 3: Commit the font binaries.**

```bash
git add packages/chilli-native/assets/fonts
git commit -m "chore(native): add Inter font weights (Regular/Medium/SemiBold/Bold)"
```

### Task 5.2: Create `fonts.ts`

- [ ] **Step 1: Create `packages/chilli-native/src/foundations/fonts.ts`.**

```ts
import { useFonts } from 'expo-font';

/**
 * Font assets bundled by the design system. Consumers (playground or main app) load these
 * via `useLoadChilliFonts()` and gate their app entry on the result.
 *
 * SF Pro Display is intentionally NOT bundled (strategy 3B from the spec): on iOS it resolves
 * via system; on web, it falls back through the chain `'SF Pro Display, -apple-system, system-ui'`
 * configured in textStyles.fontFamily.primary (consumed as-is — RN/RN Web treat the string as
 * a single family name on iOS and a font-family list on web).
 */
export const fontAssets = {
  Inter: require('../../assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
} as const;

/**
 * Returns `[loaded, error]` from expo-font's useFonts hook, scoped to the four Inter weights
 * required by phase 1 textStyles.
 */
export function useLoadChilliFonts(): [boolean, Error | null] {
  return useFonts(fontAssets);
}
```

NOTE: the keys (`'Inter'`, `'Inter-Medium'`, etc.) are the family names that RN/RN Web will resolve when a TextStyle uses `fontFamily: 'Inter'` or via fontWeight mapping. The textStyles file uses `fontFamily: 'Inter'` and `fontWeight: '500'` etc. — Expo's font system maps weight to the closest family variant when configured this way; the engineer must verify this on iOS during Phase 9 (Text). If weight mapping is unreliable, switch the textStyles to explicitly reference family names (`fontFamily: 'Inter-Medium'`) and remove the `fontWeight` field. Document the chosen approach in CHANGELOG.

- [ ] **Step 2: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass. If `expo-font` is not yet installed at root, install it: `pnpm add -Dw expo-font`.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/src/foundations/fonts.ts
git commit -m "feat(native): add useLoadChilliFonts hook (Inter assets)"
```

**Phase 5 Definition of Done**

- [ ] Four Inter `.ttf` files in `packages/chilli-native/assets/fonts/`.
- [ ] `fonts.ts` exports `fontAssets` and `useLoadChilliFonts()`.
- [ ] Type-check passes.
- [ ] CHANGELOG entry noting strategy 3B and the weight-vs-family-name approach.

**Risks / blockers**

- Inter font weight resolution behaves differently on iOS vs Web. Mitigation: validated during Phase 9 (Text). Fallback documented above.
- Binary files in git inflate repo size. Mitigation: acceptable for four ~300KB files; if larger weight set is needed later, consider a font-fetching approach.

---

## Phase 6 — Initial public exports

**Objective:** Expose foundations through the package barrel so the playground can consume them.

**Files to edit:**
- `packages/chilli-native/src/index.ts`

### Task 6.1: Update the root barrel

- [ ] **Step 1: Replace `packages/chilli-native/src/index.ts`.**

```ts
// Foundations
export { tokens } from './foundations/theme';
export type { Tokens } from './foundations/theme';

// Re-export individual token groups for convenience
export {
  colors,
  spacing,
  radius,
  borderWidth,
  size,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  textStyles,
  backgrounds,
  textColors,
  borders,
  iconColors,
  buttons,
  links,
  shadows,
} from './foundations/tokens';

export type {
  Colors,
  Spacing,
  Radius,
  BorderWidth,
  Size,
  FontSize,
  LineHeight,
  LetterSpacing,
  FontFamily,
  TextStyles,
  TextStyleVariant,
  Backgrounds,
  TextColors,
  Borders,
  IconColors,
  Buttons,
  Links,
  Shadows,
  ShadowToken,
} from './foundations/tokens';

// Platform helpers
export { resolveStateSlot, pickStateful, shadow } from './foundations/platform';
export type { InteractionState, StateSlot } from './foundations/platform';

// Fonts
export { useLoadChilliFonts, fontAssets } from './foundations/fonts';

// Primitives — added phase by phase as they land:
// export { Text } from './primitives/Text';
// export { Button } from './primitives/Button';
// ... etc.
```

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/index.ts
git commit -m "feat(native): expose foundations through public barrel"
```

**Phase 6 Definition of Done**

- [ ] `chilli-native` exports `tokens`, all token groups, platform helpers, and font hook.
- [ ] Type-check passes.

---

## Phase 7 — `chilli-native-playground` setup

**Objective:** Bootstrap an Expo SDK 54 app with `expo-router`, configured to consume the workspace package via pnpm symlinks. Boots successfully on iOS and Web. Includes a root layout that gates on `useLoadChilliFonts()` and an index screen that links to per-primitive pages.

**Files to create:**
- `packages/chilli-native-playground/package.json`
- `packages/chilli-native-playground/tsconfig.json`
- `packages/chilli-native-playground/app.json`
- `packages/chilli-native-playground/babel.config.js`
- `packages/chilli-native-playground/metro.config.js`
- `packages/chilli-native-playground/index.ts`
- `packages/chilli-native-playground/app/_layout.tsx`
- `packages/chilli-native-playground/app/index.tsx`

### Task 7.1: Create `package.json`

- [ ] **Step 1: Create `packages/chilli-native-playground/package.json`.**

```json
{
  "name": "chilli-native-playground",
  "version": "0.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "typecheck": "tsc --noEmit -p .",
    "start": "expo start",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "export-web": "expo export --platform web"
  },
  "dependencies": {
    "chilli-native": "workspace:*",
    "expo": "^54.0.0"
  },
  "devDependencies": {
    "@types/react": "~18.3.0",
    "typescript": "^5.4.0"
  }
}
```

**Deliberate:** only `expo` + the workspace link are pinned in this first pass. All other runtime dependencies (`expo-router`, `expo-blur`, `expo-font`, `react`, `react-dom`, `react-native`, `react-native-svg`, `react-native-web`, `react-native-safe-area-context`, `react-native-screens`, `lucide-react-native`, `expo-linking`, `expo-constants`, `expo-status-bar`, `expo-splash-screen`) are added via `expo install` in Step 2 so the engineer gets the exact versions Expo prescribes for SDK 54 — no guessing.

- [ ] **Step 2: Add the remaining dependencies via `expo install` (authoritative version source).**

Run from the monorepo root:

```bash
cd packages/chilli-native-playground
pnpm install
pnpm dlx expo install \
  expo-router \
  expo-blur \
  expo-font \
  expo-linking \
  expo-constants \
  expo-status-bar \
  expo-splash-screen \
  react \
  react-dom \
  react-native \
  react-native-svg \
  react-native-web \
  react-native-safe-area-context \
  react-native-screens \
  lucide-react-native
```

Expected: `expo install` rewrites `package.json` with SDK-54-compatible versions and installs them. If `expo install` warns that `react`/`react-dom`/`react-native` should be a different version, accept its suggestion.

- [ ] **Step 3: Validate version alignment.**

Run: `pnpm dlx expo install --check`
Expected: output says "All dependencies are up to date" (or similar). If any package is flagged, run `pnpm dlx expo install --fix` and accept changes. Re-run until clean.

- [ ] **Step 4: Commit.**

```bash
cd ../..  # back to monorepo root
git add packages/chilli-native-playground/package.json pnpm-lock.yaml
git commit -m "feat(playground): add chilli-native-playground package.json with SDK 54 deps"
```

### Task 7.2: Create `tsconfig.json`

- [ ] **Step 1: Create `packages/chilli-native-playground/tsconfig.json`.**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "chilli-native": ["../chilli-native/src/index.ts"],
      "chilli-native/*": ["../chilli-native/src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- [ ] **Step 2: Commit.**

```bash
git add packages/chilli-native-playground/tsconfig.json
git commit -m "chore(playground): add tsconfig with chilli-native path mapping"
```

### Task 7.3: Create `app.json`

- [ ] **Step 1: Create `packages/chilli-native-playground/app.json`.**

```json
{
  "expo": {
    "name": "Chilli Native Playground",
    "slug": "chilli-native-playground",
    "version": "0.0.0",
    "scheme": "chilli-native-playground",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.chilli.native.playground"
    },
    "web": {
      "bundler": "metro",
      "output": "single"
    },
    "plugins": ["expo-router", "expo-font"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

NOTE: `newArchEnabled` is intentionally omitted. SDK 54's default applies. If a downstream issue surfaces (e.g., `expo-blur` misbehaving under the New Architecture), add `"newArchEnabled": false` explicitly and document the decision in CHANGELOG.

- [ ] **Step 2: Commit.**

```bash
git add packages/chilli-native-playground/app.json
git commit -m "chore(playground): add Expo app.json (iOS + Web, dark UI, expo-router)"
```

### Task 7.4: Create `babel.config.js` and `metro.config.js`

- [ ] **Step 1: Create `packages/chilli-native-playground/babel.config.js`.**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

- [ ] **Step 2: Create `packages/chilli-native-playground/metro.config.js`.**

```js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so the playground sees source changes in `chilli-native`.
config.watchFolders = [monorepoRoot];

// Resolve modules from both the playground and the monorepo root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Disable hierarchical lookup so pnpm symlinks resolve consistently.
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
```

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native-playground/babel.config.js packages/chilli-native-playground/metro.config.js
git commit -m "chore(playground): configure Babel and Metro for monorepo + pnpm"
```

### Task 7.5: Create entry files

- [ ] **Step 1: Create `packages/chilli-native-playground/index.ts`.**

```ts
import 'expo-router/entry';
```

(With expo-router 4 + the `"main": "expo-router/entry"` in package.json, this file is mostly a marker; expo-router takes over via the entry alias.)

- [ ] **Step 2: Create `packages/chilli-native-playground/app/_layout.tsx`.**

```tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useLoadChilliFonts, tokens } from 'chilli-native';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useLoadChilliFonts();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: tokens.backgrounds.base },
          headerTintColor: tokens.textColors.basePrimary,
          contentStyle: { backgroundColor: tokens.backgrounds.base },
        }}
      />
    </>
  );
}
```

- [ ] **Step 3: Create `packages/chilli-native-playground/app/index.tsx`.**

```tsx
import { Link } from 'expo-router';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { tokens } from 'chilli-native';

const PRIMITIVES = [
  { href: '/text', label: 'Text' },
  { href: '/button', label: 'Button' },
  { href: '/icon', label: 'Icon' },
  { href: '/icon-button', label: 'IconButton' },
  { href: '/badge', label: 'Badge' },
  { href: '/chip', label: 'Chip' },
  { href: '/avatar', label: 'Avatar' },
  { href: '/avatar-group', label: 'AvatarGroup' },
  { href: '/avatar-duo', label: 'AvatarDuo' },
  { href: '/avatar-label', label: 'AvatarLabel' },
  { href: '/profile-card', label: 'Profile card (assembly)' },
] as const;

export default function PlaygroundIndex() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Chilli Native — Playground</Text>
      {PRIMITIVES.map((p) => (
        <Link key={p.href} href={p.href as any} style={styles.link}>
          {p.label}
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[5] },
  heading: { color: tokens.textColors.basePrimary, fontSize: tokens.fontSize.xl, marginBottom: tokens.spacing[6] },
  link: { color: tokens.textColors.brandPrimary, fontSize: tokens.fontSize.md, paddingVertical: tokens.spacing[4] },
});
```

NOTE: this is the only place where `react-native`'s built-in `Text` is used directly in the playground. Per-primitive screens (created in later phases) will use `chilli-native`'s `Text` primitive.

- [ ] **Step 4: Verify the playground boots.**

Run: `pnpm --filter chilli-native-playground exec expo start --ios`
Expected: Metro starts, iOS simulator opens (or QR shown), index screen renders with the list of primitive links. Most links 404 — expected, screens not built yet.

Run separately: `pnpm --filter chilli-native-playground exec expo start --web`
Expected: browser opens, same index screen renders.

- [ ] **Step 5: Type-check.**

Run: `pnpm --filter chilli-native-playground typecheck`
Expected: pass.

- [ ] **Step 6: Commit.**

```bash
git add packages/chilli-native-playground/index.ts packages/chilli-native-playground/app
git commit -m "feat(playground): add expo-router root layout and primitive index screen"
```

**Phase 7 Definition of Done**

- [ ] Playground boots on iOS and Web.
- [ ] Root layout gates on `useLoadChilliFonts()`.
- [ ] Index screen lists all primitive links + profile-card.
- [ ] Type-check passes.

**Risks / blockers**

- pnpm + Metro symlink resolution can fail. Mitigation: the `metro.config.js` above is the canonical configuration; if issues persist, see https://docs.expo.dev/guides/monorepos/.
- Expo SDK 54 dependency versions may need adjustment via `expo install --check`. Run that command if Metro errors mention version mismatches.
- React Native version pin (`0.76.0`) may not match SDK 54 exactly; if so, run `pnpm dlx expo-doctor` to get the right version and update `package.json`. Re-commit lockfile.

---

## Phase 8 — Internal `GlassSurface` primitive

**Objective:** Build the internal blur+overlay surface that Button and IconButton compose when `glass=true`. Not exported from the public barrel in phase 1.

**Files to create:**
- `packages/chilli-native/src/primitives/_internal/GlassSurface/GlassSurface.tsx`
- `packages/chilli-native/src/primitives/_internal/GlassSurface/index.ts`

**Prerequisites:** Phase 6 (foundations exposed). `expo-blur` available as a peer dep (provided by playground in Phase 7).

### Task 8.1: Define the default-intensity constant

- [ ] **Step 1: Create the file with the constant + props type + component.**

`packages/chilli-native/src/primitives/_internal/GlassSurface/GlassSurface.tsx`:

```tsx
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

/**
 * Default blur strength used by glass-capable primitives unless overridden.
 * Centralized so we can tune it once if the visual identity drifts.
 */
export const DEFAULT_GLASS_INTENSITY = 50;

export type GlassSurfaceProps = {
  /** 0–100. Higher = blurrier. */
  intensity?: number;
  /** iOS native material tint. Defaults to 'dark' (consistent with dark-only theme). */
  tint?: 'light' | 'dark' | 'default';
  /** Color overlay rendered above the blur. Typically a glass token like `buttons.glass.primary.bg`. */
  overlayColor?: string;
  /** Required so the blur is clipped to the parent's rounded corners. */
  borderRadius?: number;
  /** Optional border drawn on top of the blur+overlay stack. */
  borderColor?: string;
  borderWidth?: number;
};

/**
 * Internal primitive — not exported publicly in phase 1.
 *
 * Renders an absolutely-positioned blur surface that fills its parent. The parent should:
 *  - own the layout box (width/height via padding/content)
 *  - own any shadow (so the parent's shadow is not clipped by GlassSurface's overflow:hidden)
 *  - render its content (text, icons) AFTER GlassSurface so they paint on top
 *
 * Intentionally non-interactive (`pointerEvents="none"`); the parent Pressable receives input.
 */
export function GlassSurface({
  intensity = DEFAULT_GLASS_INTENSITY,
  tint = 'dark',
  overlayColor,
  borderRadius = 0,
  borderColor,
  borderWidth = 0,
}: GlassSurfaceProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        styles.clip,
        { borderRadius, borderColor, borderWidth },
      ]}
    >
      <BlurView intensity={intensity} tint={tint} style={StyleSheet.absoluteFill} />
      {overlayColor ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/_internal/GlassSurface/index.ts`:

```ts
export { GlassSurface, DEFAULT_GLASS_INTENSITY } from './GlassSurface';
export type { GlassSurfaceProps } from './GlassSurface';
```

- [ ] **Step 3: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 4: Add CHANGELOG entry.**

Append to `## [Unreleased]`:

```markdown
- Internal primitive `GlassSurface` (`primitives/_internal/GlassSurface/`) introduced. Not exported publicly in phase 1. Powered by `expo-blur`'s `BlurView`. Default intensity centralized as `DEFAULT_GLASS_INTENSITY = 50`.
```

- [ ] **Step 5: Commit.**

```bash
git add packages/chilli-native/src/primitives/_internal packages/chilli-native/CHANGELOG.md
git commit -m "feat(native): add internal GlassSurface primitive (expo-blur, dark default)"
```

**Phase 8 Definition of Done**

- [ ] `GlassSurface.tsx` and `index.ts` committed.
- [ ] `DEFAULT_GLASS_INTENSITY = 50` exposed.
- [ ] Type-check passes.
- [ ] **Not** exported from `src/index.ts` (verified by inspection).

**Risks / blockers**

- `expo-blur` may need to be added to the package's `peerDependencies` (already done in Phase 1.1 package.json). Verify it's listed.
- Shadow + overflow: hidden interaction is verified visually in Phase 10 (Button glass). If shadow is clipped, the outer Pressable carries shadow; GlassSurface stays nested.

---

## Phase 9 — Primitive: `Text`

**Objective:** Wrap RN's `Text` to consume `textStyles`. Validates typography tokens and font loading end-to-end.

**Files to create:**
- `packages/chilli-native/src/primitives/Text/Text.tsx`
- `packages/chilli-native/src/primitives/Text/index.ts`
- `packages/chilli-native-playground/app/text.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts` (add Text export)

### Task 9.1: Implement `Text`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Text/Text.tsx`.**

```tsx
import { Text as RNText, type TextProps as RNTextProps, type StyleProp, type TextStyle } from 'react-native';
import { textStyles, textColors, type TextStyleVariant } from '../../foundations/tokens';

export type TextProps = RNTextProps & {
  /** One of the pre-baked textStyles. Default: 'bodyMd'. */
  variant?: TextStyleVariant;
  /** Color override. Default: tokens.textColors.basePrimary. */
  color?: string;
  /** Horizontal alignment. */
  align?: 'left' | 'center' | 'right';
};

/**
 * Typography primitive. Wraps RN <Text> with chilli-native textStyles.
 * Always pass `style` last in your override chain — it merges over the variant style.
 */
export function Text({
  variant = 'bodyMd',
  color = textColors.basePrimary,
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const variantStyle = textStyles[variant];
  const composed: StyleProp<TextStyle> = [
    variantStyle,
    { color },
    align ? { textAlign: align } : null,
    style,
  ];
  return (
    <RNText style={composed} {...rest}>
      {children}
    </RNText>
  );
}
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Text/index.ts`:

```ts
export { Text } from './Text';
export type { TextProps } from './Text';
```

- [ ] **Step 3: Wire into the public barrel.**

In `packages/chilli-native/src/index.ts`, replace the placeholder comment block with:

```ts
// Primitives
export { Text } from './primitives/Text';
export type { TextProps } from './primitives/Text';
```

- [ ] **Step 4: Type-check.**

Run: `pnpm --filter chilli-native typecheck`
Expected: pass.

- [ ] **Step 5: Commit.**

```bash
git add packages/chilli-native/src/primitives/Text packages/chilli-native/src/index.ts
git commit -m "feat(native): add Text primitive (textStyles consumer)"
```

### Task 9.2: Build the Text playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/text.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, tokens } from 'chilli-native';

export default function TextPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants">
        <Text variant="bodyXs">bodyXs — The quick brown fox</Text>
        <Text variant="bodySm">bodySm — The quick brown fox</Text>
        <Text variant="bodyMd">bodyMd — The quick brown fox</Text>
      </Section>

      <Section title="Colors">
        <Text>default (basePrimary)</Text>
        <Text color={tokens.textColors.baseSecondary}>baseSecondary</Text>
        <Text color={tokens.textColors.brandPrimary}>brandPrimary</Text>
        <Text color={tokens.textColors.dangerPrimary}>dangerPrimary</Text>
      </Section>

      <Section title="Alignment">
        <Text align="left">left</Text>
        <Text align="center">center</Text>
        <Text align="right">right</Text>
      </Section>

      <Section title="Edge cases">
        <Text>{Array(50).fill('Long text. ').join('')}</Text>
        <Text numberOfLines={2}>
          {Array(50).fill('Truncated to two lines. ').join('')}
        </Text>
      </Section>

      <Section title="Accessibility">
        <Text accessibilityLabel="Accessible body text">Visible label is the same as a11y label.</Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      <View style={styles.cases}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  cases: { gap: tokens.spacing[4] },
});
```

- [ ] **Step 2: Boot the playground and visually validate.**

Run: `pnpm --filter chilli-native-playground exec expo start --ios`
Then navigate to `/text`.
Expected: all variants render in Inter, distinct sizes/line-heights; colors render correctly; truncation works; long text wraps.

Run: `pnpm --filter chilli-native-playground exec expo start --web`
Then navigate to `/text`.
Expected: identical visual on web.

If Inter fonts appear as system default (e.g., -apple-system on iOS), it means `fontWeight` mapping to per-weight files failed. Switch the textStyles to explicitly reference the bundled family names:

```ts
// In typography.ts, replace fontWeight with fontFamily per variant:
bodyMd: {
  fontSize: fontSize.md,
  lineHeight: lineHeight.md,
  fontFamily: 'Inter-Medium',  // matches fontAssets key
  letterSpacing: letterSpacing.md,
},
```

Document the chosen approach in CHANGELOG.

- [ ] **Step 3: Run discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Text/    # must return nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Text/ # must return nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/text.tsx
git commit -m "feat(playground): add Text screen (variants × colors × alignment × edge cases)"
```

**Phase 9 Definition of Done**

- [ ] `Text` exported publicly.
- [ ] Playground screen `/text` renders correctly on iOS and Web.
- [ ] Inter font weights resolve correctly (or family-name fallback applied + CHANGELOG entry).
- [ ] Discipline checks pass: no hex literals, no `Platform.select`.
- [ ] Defaults match the spec: `variant="bodyMd"`, `color=tokens.textColors.basePrimary`.

**Risks / blockers**

- Font weight resolution issue (see Step 2 fallback). Resolved inline by switching to family-name addressing.
- RN Web font loading delay can produce a flash of fallback text on first paint. Acceptable; documented if it becomes a concern.

---

## Phase 10 — Primitive: `Button`

**Objective:** Build the most token-rich primitive. Validates background-state slots, sizes, shadows, glass composition, accessibility, and the IconComponent type contract.

**Files to create:**
- `packages/chilli-native/src/primitives/Icon/Icon.types.ts` (created here so Button can use it; the Icon component itself is built in Phase 11)
- `packages/chilli-native/src/primitives/Button/Button.types.ts`
- `packages/chilli-native/src/primitives/Button/Button.tsx`
- `packages/chilli-native/src/primitives/Button/index.ts`
- `packages/chilli-native-playground/app/button.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`
- `packages/chilli-native/src/foundations/tokens/shadows.ts` (tune offsets/blur if visual comparison demands)

**Prerequisites:** Phase 8 (GlassSurface), Phase 9 (Text used inside Button label).

### Task 10.1: Define `IconComponent` type

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Icon/Icon.types.ts`.**

```ts
import type { ComponentType } from 'react';

/**
 * Shape that any icon component (typically from `lucide-react-native`) must satisfy
 * to be passable as `leftIcon` / `rightIcon` / `icon` in this DS.
 * Compatible with all Lucide icons.
 */
export type IconComponent = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;
```

- [ ] **Step 2: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Icon/Icon.types.ts
git commit -m "feat(native): define IconComponent type (used by Button before Icon component lands)"
```

### Task 10.2: Define `ButtonProps`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Button/Button.types.ts`.**

```ts
import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'ghost'
  | 'danger'
  | 'danger-soft';

export type ButtonSize = 'xsm' | 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Activates the glass effect (real blur via expo-blur). Ignored on `danger` and `danger-soft`. */
  glass?: boolean;
  /** Replaces leftIcon with an ActivityIndicator. */
  loading?: boolean;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  children?: ReactNode;
  /** Merged last over computed styles. */
  style?: StyleProp<ViewStyle>;
};
```

### Task 10.3: Implement `Button`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Button/Button.tsx`.**

```tsx
import { forwardRef, useRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type View as ViewType,
} from 'react-native';
import { Text } from '../Text';
import { GlassSurface, DEFAULT_GLASS_INTENSITY } from '../_internal/GlassSurface';
import { tokens } from '../../foundations/theme';
import { pickStateful, shadow } from '../../foundations/platform';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const SIZE_HEIGHT: Record<ButtonSize, number> = { xsm: 28, sm: 32, md: 40, lg: 48 };
const SIZE_PADDING_X: Record<ButtonSize, number> = { xsm: 8, sm: 8, md: 16, lg: 16 };
const SIZE_GAP: Record<ButtonSize, number> = { xsm: 0, sm: 4, md: 4, lg: 4 };
const SIZE_ICON: Record<ButtonSize, number> = { xsm: 16, sm: 16, md: 20, lg: 20 };

const VARIANT_TO_BUTTONS_KEY: Record<ButtonVariant, keyof typeof tokens.buttons> = {
  primary: 'primary',
  secondary: 'secondary',
  brand: 'brand',
  ghost: 'ghost',
  danger: 'destructive',
  'danger-soft': 'destructiveSecondary',
};

const GLASS_VARIANT_TO_KEY: Partial<Record<ButtonVariant, keyof typeof tokens.buttons.glass>> = {
  primary: 'secondary',  // primary glass uses neutral glass per spec mapping
  secondary: 'secondary',
  brand: 'primary',
  ghost: 'ghost',
};

function glassSupportsVariant(variant: ButtonVariant): boolean {
  return variant in GLASS_VARIANT_TO_KEY;
}

const warnedGlassDanger = { current: false };

export const Button = forwardRef<ViewType, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    glass = false,
    loading = false,
    disabled,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onPress,
    children,
    style,
    accessibilityRole = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const isGlassActive = glass && glassSupportsVariant(variant);

  if (glass && !glassSupportsVariant(variant) && __DEV__ && !warnedGlassDanger.current) {
    warnedGlassDanger.current = true;
    console.warn(
      `[chilli-native] <Button glass> is not supported for variant="${variant}". ` +
        'Rendering as non-glass. (This warning is shown once.)',
    );
  }

  const buttonsKey = VARIANT_TO_BUTTONS_KEY[variant];
  const variantTokens = tokens.buttons[buttonsKey];
  const iconSize = SIZE_ICON[size];
  const iconColor = isDisabled
    ? tokens.buttons.disabled.text
    : (variantTokens as { text: string }).text;

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      style={(state) => {
        const baseStyle: any[] = [
          styles.base,
          { height: SIZE_HEIGHT[size], paddingHorizontal: SIZE_PADDING_X[size], gap: SIZE_GAP[size] },
        ];

        if (isDisabled) {
          baseStyle.push({ backgroundColor: tokens.buttons.disabled.bg });
        } else if (!isGlassActive) {
          const bg = pickStateful(
            {
              default: variantTokens.bg,
              hover: (variantTokens as any).bgHover ?? variantTokens.bg,
              pressed: (variantTokens as any).bgPressed ?? variantTokens.bg,
            },
            state,
          );
          baseStyle.push({ backgroundColor: bg });
        }

        if (variant === 'brand' && !isDisabled) {
          baseStyle.push(shadow(tokens.shadows.brandModerate));
        }

        if (style) baseStyle.push(style);
        return baseStyle;
      }}
      {...rest}
    >
      {(state) => {
        return (
          <>
            {isGlassActive && !isDisabled ? (
              <GlassSurface
                intensity={DEFAULT_GLASS_INTENSITY}
                tint="dark"
                borderRadius={tokens.radius.full}
                overlayColor={pickStateful(
                  {
                    default: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bg,
                    hover: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bgHover,
                    pressed: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bgPressed,
                  },
                  state,
                )}
              />
            ) : null}
            <ButtonContent
              loading={loading}
              LeftIcon={LeftIcon}
              RightIcon={RightIcon}
              iconSize={iconSize}
              iconColor={iconColor}
              size={size}
              textColor={isDisabled ? tokens.buttons.disabled.text : (variantTokens as any).text}
            >
              {children}
            </ButtonContent>
          </>
        );
      }}
    </Pressable>
  );
});

function ButtonContent({
  loading,
  LeftIcon,
  RightIcon,
  iconSize,
  iconColor,
  size,
  textColor,
  children,
}: {
  loading: boolean;
  LeftIcon?: ButtonProps['leftIcon'];
  RightIcon?: ButtonProps['rightIcon'];
  iconSize: number;
  iconColor: string;
  size: ButtonSize;
  textColor: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : LeftIcon ? (
        <LeftIcon size={iconSize} color={iconColor} />
      ) : null}
      {children != null && (
        <Text variant={size === 'xsm' || size === 'sm' ? 'bodySm' : 'bodyMd'} color={textColor}>
          {children as any}
        </Text>
      )}
      {RightIcon && !loading ? <RightIcon size={iconSize} color={iconColor} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
    overflow: 'visible',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Button/index.ts`:

```ts
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { Button } from './primitives/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './primitives/Button';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Button packages/chilli-native/src/index.ts
git commit -m "feat(native): add Button primitive (variants, sizes, glass, loading)"
```

### Task 10.4: Build the Button playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/button.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Heart, ArrowRight } from 'lucide-react-native';
import { Text, Button, tokens } from 'chilli-native';

const VARIANTS = ['primary', 'secondary', 'brand', 'ghost', 'danger', 'danger-soft'] as const;
const SIZES = ['xsm', 'sm', 'md', 'lg'] as const;

export default function ButtonPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((v) => (
          <View key={v} style={styles.row}>
            {SIZES.map((s) => (
              <Button key={`${v}-${s}`} variant={v} size={s} onPress={() => {}}>
                {`${v} ${s}`}
              </Button>
            ))}
          </View>
        ))}
      </Section>

      <Section title="With icons">
        <View style={styles.row}>
          <Button variant="primary" leftIcon={Heart} onPress={() => {}}>Like</Button>
          <Button variant="brand" rightIcon={ArrowRight} onPress={() => {}}>Continue</Button>
          <Button variant="secondary" leftIcon={Heart} rightIcon={ArrowRight} onPress={() => {}}>Both</Button>
        </View>
      </Section>

      <Section title="States">
        <View style={styles.row}>
          <Button variant="primary" onPress={() => {}}>default</Button>
          <Button variant="primary" disabled>disabled</Button>
          <Button variant="primary" loading>loading</Button>
        </View>
      </Section>

      <Section title="Glass (iOS native blur, web backdrop-filter)">
        <View style={[styles.row, styles.glassBg]}>
          <Button variant="primary" glass onPress={() => {}}>primary glass</Button>
          <Button variant="brand" glass onPress={() => {}}>brand glass</Button>
          <Button variant="secondary" glass onPress={() => {}}>secondary glass</Button>
          <Button variant="ghost" glass onPress={() => {}}>ghost glass</Button>
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          danger + glass logs a single dev warning and renders as non-glass:
        </Text>
        <View style={[styles.row, styles.glassBg]}>
          <Button variant="danger" glass onPress={() => {}}>danger glass</Button>
        </View>
      </Section>

      <Section title="Edge cases">
        <Button variant="primary" onPress={() => {}}>{'A very long label that might wrap inside the button'}</Button>
        <Button variant="ghost" onPress={() => {}}>ghost no icon</Button>
      </Section>

      <Section title="Accessibility">
        <Button variant="primary" accessibilityLabel="Submit the form" onPress={() => {}}>
          Submit
        </Button>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          accessibilityRole=button (default), accessibilityLabel="Submit the form".
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[5], alignItems: 'center' },
  glassBg: {
    padding: tokens.spacing[6],
    borderRadius: tokens.radius[6],
    // A vivid background reveals the blur effect:
    backgroundColor: tokens.colors.brand[800],
  },
});
```

- [ ] **Step 2: Boot and visually validate.**

Run: `pnpm --filter chilli-native-playground exec expo start --ios` then navigate to `/button`. Verify each variant/size renders, glass shows real blur (try moving the underlying brand-colored panel under the buttons by scrolling), pressed state darkens correctly, loading shows ActivityIndicator, disabled is muted.

Run: `pnpm --filter chilli-native-playground exec expo start --web` then `/button`. Verify hover state appears on web. Verify backdrop-filter blur visible on glass buttons.

- [ ] **Step 3: Tune shadow tokens if needed.**

If the brand-button shadow visually mismatches `chilli-docs/components/demos/` rendering, adjust `tokens.shadows.brandModerate.{offsetX,offsetY,blur}` in `shadows.ts`. Document the new values in CHANGELOG.

- [ ] **Step 4: Run discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Button/    # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Button/ # nothing
```

- [ ] **Step 5: Commit.**

```bash
git add packages/chilli-native-playground/app/button.tsx packages/chilli-native/src/foundations/tokens/shadows.ts packages/chilli-native/CHANGELOG.md
git commit -m "feat(playground): add Button screen and tune shadow tokens"
```

**Phase 10 Definition of Done**

- [ ] Button renders all 6 variants × 4 sizes correctly on iOS and Web.
- [ ] Glass works: real blur on iOS (UIBlurEffect), backdrop-filter on Web.
- [ ] Pressed/hover/disabled/loading states verified visually.
- [ ] Single dev warning fires for `glass` + `danger`/`danger-soft`; subsequent renders silent.
- [ ] Discipline checks pass.
- [ ] Shadow token offsets tuned (or kept) and CHANGELOG updated.

**Risks / blockers**

- `Pressable`'s `(state) => style` and `(state) => children` patterns can be tricky with nested render-props; if React complains, refactor into a single render-prop child returning a Fragment with style on a wrapping `View`.
- Glass + shadow stacking: if the iOS shadow is clipped, ensure the outer Pressable does NOT have `overflow: hidden` (only `GlassSurface` does, internally).

---

## Phase 11 — Primitive: `Icon`

**Objective:** Thin wrapper that standardizes size/color defaults for any Lucide icon component.

**Files to create:**
- `packages/chilli-native/src/primitives/Icon/Icon.tsx`
- `packages/chilli-native/src/primitives/Icon/index.ts`
- `packages/chilli-native-playground/app/icon.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

**Prerequisites:** Phase 10 (`Icon.types.ts` already exists from Task 10.1).

### Task 11.1: Implement `Icon`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Icon/Icon.tsx`.**

```tsx
import { iconColors } from '../../foundations/tokens';
import type { IconComponent } from './Icon.types';

export type IconProps = {
  /** The Lucide (or compatible) icon component to render. */
  source: IconComponent;
  /** Pixel size. Default: 20 (matches Button md icon). */
  size?: number;
  /** Stroke color. Default: tokens.iconColors.neutralPrimary. */
  color?: string;
  /** Stroke thickness. Default left to the underlying icon (Lucide default = 2). */
  strokeWidth?: number;
};

/**
 * Standardized wrapper around any IconComponent (typically a Lucide icon).
 * Use directly: `<Icon source={Heart} />` — no registry layer.
 */
export function Icon({ source: Component, size = 20, color = iconColors.neutralPrimary, strokeWidth }: IconProps) {
  return <Component size={size} color={color} strokeWidth={strokeWidth} />;
}
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Icon/index.ts`:

```ts
export { Icon } from './Icon';
export type { IconProps } from './Icon';
export type { IconComponent } from './Icon.types';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { Icon } from './primitives/Icon';
export type { IconProps, IconComponent } from './primitives/Icon';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Icon packages/chilli-native/src/index.ts
git commit -m "feat(native): add Icon primitive (wraps any IconComponent)"
```

### Task 11.2: Build the Icon playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/icon.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Heart, Star, Bell, Mail, ChevronRight, X } from 'lucide-react-native';
import { Text, Icon, tokens } from 'chilli-native';

const SIZES = [16, 20, 24, 32];
const COLORS = [
  { label: 'neutralPrimary', value: tokens.iconColors.neutralPrimary },
  { label: 'neutralSecondary', value: tokens.iconColors.neutralSecondary },
  { label: 'brandPrimary', value: tokens.iconColors.brandPrimary },
  { label: 'dangerPrimary', value: tokens.iconColors.dangerPrimary },
  { label: 'successPrimary', value: tokens.iconColors.successPrimary },
];

export default function IconPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes (Heart)">
        <View style={styles.row}>
          {SIZES.map((size) => (
            <View key={size} style={styles.cell}>
              <Icon source={Heart} size={size} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>{size}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Colors (Star, size 24)">
        <View style={styles.row}>
          {COLORS.map((c) => (
            <View key={c.label} style={styles.cell}>
              <Icon source={Star} size={24} color={c.value} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>{c.label}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Different sources">
        <View style={styles.row}>
          {[Bell, Mail, ChevronRight, X].map((SourceCmp, i) => (
            <Icon key={i} source={SourceCmp} size={24} />
          ))}
        </View>
      </Section>

      <Section title="Stroke width">
        <View style={styles.row}>
          {[1, 2, 3].map((sw) => (
            <View key={sw} style={styles.cell}>
              <Icon source={Heart} size={32} strokeWidth={sw} />
              <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>strokeWidth {sw}</Text>
            </View>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[7], alignItems: 'center' },
  cell: { alignItems: 'center', gap: tokens.spacing[3] },
});
```

- [ ] **Step 2: Boot iOS + Web, navigate to `/icon`, verify all sizes/colors/sources render.**

- [ ] **Step 3: Discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Icon/    # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Icon/ # nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/icon.tsx
git commit -m "feat(playground): add Icon screen (sizes × colors × sources × stroke)"
```

**Phase 11 Definition of Done**

- [ ] `Icon` exported and usable.
- [ ] Playground `/icon` screen passes visual check on iOS and Web.
- [ ] No interactive a11y semantics on this presentational primitive.
- [ ] Discipline checks pass.

**Risks / blockers** — None expected; trivial wrapper.

---

## Phase 12 — Primitive: `IconButton`

**Objective:** Square button with a single icon. Composes Button's variants and the IconComponent type. Requires `accessibilityLabel`.

**Files to create:**
- `packages/chilli-native/src/primitives/IconButton/IconButton.types.ts`
- `packages/chilli-native/src/primitives/IconButton/IconButton.tsx`
- `packages/chilli-native/src/primitives/IconButton/index.ts`
- `packages/chilli-native-playground/app/icon-button.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

**Prerequisites:** Phase 10 (Button), Phase 11 (Icon).

### Task 12.1: Define `IconButtonProps`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/IconButton/IconButton.types.ts`.**

```ts
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../Icon/Icon.types';
import type { ButtonVariant } from '../Button/Button.types';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  glass?: boolean;
  loading?: boolean;
  icon: IconComponent;
  /** Required: this primitive has no visible text, so a label is mandatory. */
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};
```

### Task 12.2: Implement `IconButton`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/IconButton/IconButton.tsx`.**

```tsx
import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type View as ViewType,
} from 'react-native';
import { GlassSurface, DEFAULT_GLASS_INTENSITY } from '../_internal/GlassSurface';
import { tokens } from '../../foundations/theme';
import { pickStateful, shadow } from '../../foundations/platform';
import type { IconButtonProps, IconButtonSize } from './IconButton.types';
import type { ButtonVariant } from '../Button/Button.types';

const SIZE_BOX: Record<IconButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const SIZE_ICON: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 20 };

const VARIANT_TO_BUTTONS_KEY: Record<ButtonVariant, keyof typeof tokens.buttons> = {
  primary: 'primary',
  secondary: 'secondary',
  brand: 'brand',
  ghost: 'ghost',
  danger: 'destructive',
  'danger-soft': 'destructiveSecondary',
};

const GLASS_VARIANT_TO_KEY: Partial<Record<ButtonVariant, keyof typeof tokens.buttons.glass>> = {
  primary: 'secondary',
  secondary: 'secondary',
  brand: 'primary',
  ghost: 'ghost',
};

function glassSupportsVariant(variant: ButtonVariant): boolean {
  return variant in GLASS_VARIANT_TO_KEY;
}

const warnedGlassDanger = { current: false };

export const IconButton = forwardRef<ViewType, IconButtonProps>(function IconButton(
  {
    variant = 'primary',
    size = 'md',
    glass = false,
    loading = false,
    disabled,
    icon: IconCmp,
    accessibilityLabel,
    onPress,
    style,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const isGlassActive = glass && glassSupportsVariant(variant);

  if (glass && !glassSupportsVariant(variant) && __DEV__ && !warnedGlassDanger.current) {
    warnedGlassDanger.current = true;
    console.warn(
      `[chilli-native] <IconButton glass> is not supported for variant="${variant}". ` +
        'Rendering as non-glass. (This warning is shown once.)',
    );
  }

  const variantTokens = tokens.buttons[VARIANT_TO_BUTTONS_KEY[variant]];
  const iconSize = SIZE_ICON[size];
  const iconColor = isDisabled
    ? tokens.buttons.disabled.text
    : (variantTokens as { text: string }).text;

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      style={(state) => {
        const baseStyle: any[] = [
          styles.base,
          { width: SIZE_BOX[size], height: SIZE_BOX[size] },
        ];
        if (isDisabled) {
          baseStyle.push({ backgroundColor: tokens.buttons.disabled.bg });
        } else if (!isGlassActive) {
          const bg = pickStateful(
            {
              default: variantTokens.bg,
              hover: (variantTokens as any).bgHover ?? variantTokens.bg,
              pressed: (variantTokens as any).bgPressed ?? variantTokens.bg,
            },
            state,
          );
          baseStyle.push({ backgroundColor: bg });
        }
        if (variant === 'brand' && !isDisabled) {
          baseStyle.push(shadow(tokens.shadows.brandModerate));
        }
        if (style) baseStyle.push(style);
        return baseStyle;
      }}
      {...rest}
    >
      {(state) => {
        return (
          <>
            {isGlassActive && !isDisabled ? (
              <GlassSurface
                intensity={DEFAULT_GLASS_INTENSITY}
                tint="dark"
                borderRadius={tokens.radius.full}
                overlayColor={pickStateful(
                  {
                    default: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bg,
                    hover: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bgHover,
                    pressed: tokens.buttons.glass[GLASS_VARIANT_TO_KEY[variant]!].bgPressed,
                  },
                  state,
                )}
              />
            ) : null}
            {loading ? (
              <ActivityIndicator size="small" color={iconColor} />
            ) : (
              <IconCmp size={iconSize} color={iconColor} />
            )}
          </>
        );
      }}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
    overflow: 'visible',
  },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/IconButton/index.ts`:

```ts
export { IconButton } from './IconButton';
export type { IconButtonProps, IconButtonSize } from './IconButton.types';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { IconButton } from './primitives/IconButton';
export type { IconButtonProps, IconButtonSize } from './primitives/IconButton';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/IconButton packages/chilli-native/src/index.ts
git commit -m "feat(native): add IconButton primitive (square, accessibilityLabel required)"
```

### Task 12.3: Build the IconButton playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/icon-button.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Heart, X, Bell, Settings } from 'lucide-react-native';
import { Text, IconButton, tokens } from 'chilli-native';

const VARIANTS = ['primary', 'secondary', 'brand', 'ghost', 'danger', 'danger-soft'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export default function IconButtonPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((v) => (
          <View key={v} style={styles.row}>
            {SIZES.map((s) => (
              <IconButton
                key={`${v}-${s}`}
                variant={v}
                size={s}
                icon={Heart}
                accessibilityLabel={`${v} ${s} like`}
                onPress={() => {}}
              />
            ))}
            <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>{v}</Text>
          </View>
        ))}
      </Section>

      <Section title="States">
        <View style={styles.row}>
          <IconButton variant="primary" icon={Bell} accessibilityLabel="default" onPress={() => {}} />
          <IconButton variant="primary" icon={Bell} accessibilityLabel="disabled" disabled />
          <IconButton variant="primary" icon={Bell} accessibilityLabel="loading" loading />
        </View>
      </Section>

      <Section title="Glass">
        <View style={[styles.row, styles.glassBg]}>
          <IconButton variant="primary" glass icon={Settings} accessibilityLabel="primary glass" onPress={() => {}} />
          <IconButton variant="brand" glass icon={Heart} accessibilityLabel="brand glass" onPress={() => {}} />
          <IconButton variant="secondary" glass icon={Bell} accessibilityLabel="secondary glass" onPress={() => {}} />
          <IconButton variant="ghost" glass icon={X} accessibilityLabel="ghost glass" onPress={() => {}} />
        </View>
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Every IconButton above has a required accessibilityLabel set.
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[5], alignItems: 'center' },
  glassBg: { padding: tokens.spacing[6], borderRadius: tokens.radius[6], backgroundColor: tokens.colors.brand[800] },
});
```

- [ ] **Step 2: Visual validation on iOS + Web at `/icon-button`.**

- [ ] **Step 3: Discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/IconButton/   # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/IconButton/  # nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/icon-button.tsx
git commit -m "feat(playground): add IconButton screen"
```

**Phase 12 Definition of Done**

- [ ] IconButton renders square at sm/md/lg, all variants.
- [ ] Glass works on iOS + Web.
- [ ] `accessibilityLabel` is type-required.
- [ ] Discipline checks pass.

**Risks / blockers**

- Duplication of glass-mapping logic between Button and IconButton is intentional per spec ("duplication minimale et acceptée"). Do NOT refactor into a shared helper unless a third primitive needs it.

---

## Phase 13 — Primitive: `Badge`

**Objective:** Static label pill. First purely visual primitive. Validates that the conventions hold for non-interactive components.

**Files to create:**
- `packages/chilli-native/src/primitives/Badge/Badge.tsx`
- `packages/chilli-native/src/primitives/Badge/index.ts`
- `packages/chilli-native-playground/app/badge.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

### Task 13.1: Implement `Badge`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Badge/Badge.tsx`.**

```tsx
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';

export type BadgeVariant = 'neutral' | 'brand' | 'danger' | 'success' | 'warning';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  label: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
};

const SIZE_HEIGHT: Record<BadgeSize, number> = { sm: 16, md: 20 };
const SIZE_PADDING: Record<BadgeSize, number> = { sm: 6, md: 8 };

const VARIANT_BG: Record<BadgeVariant, string> = {
  neutral: tokens.backgrounds.neutral.tertiary.default,
  brand: tokens.backgrounds.brand.strong.default,
  danger: tokens.backgrounds.danger.strong.default,
  success: tokens.backgrounds.success.strong.default,
  warning: tokens.backgrounds.warning.strong.default,
};

const VARIANT_TEXT: Record<BadgeVariant, string> = {
  neutral: tokens.textColors.basePrimary,
  brand: tokens.textColors.inverse,
  danger: tokens.textColors.inverse,
  success: tokens.textColors.inverse,
  warning: tokens.textColors.inverse,
};

export function Badge({ label, variant = 'neutral', size = 'md', style }: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        { height: SIZE_HEIGHT[size], paddingHorizontal: SIZE_PADDING[size], backgroundColor: VARIANT_BG[variant] },
        style,
      ]}
    >
      <Text variant="bodyXs" color={VARIANT_TEXT[variant]}>{String(label)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
  },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Badge/index.ts`:

```ts
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { Badge } from './primitives/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './primitives/Badge';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Badge packages/chilli-native/src/index.ts
git commit -m "feat(native): add Badge primitive (visual, no ref)"
```

### Task 13.2: Build the Badge playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/badge.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Badge, tokens } from 'chilli-native';

const VARIANTS = ['neutral', 'brand', 'danger', 'success', 'warning'] as const;
const SIZES = ['sm', 'md'] as const;

export default function BadgePlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((v) => (
          <View key={v} style={styles.row}>
            {SIZES.map((s) => (
              <Badge key={`${v}-${s}`} variant={v} size={s} label={`${v} ${s}`} />
            ))}
          </View>
        ))}
      </Section>

      <Section title="Numeric labels">
        <View style={styles.row}>
          <Badge label={1} variant="brand" />
          <Badge label={42} variant="danger" />
          <Badge label={999} variant="success" />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.row}>
          <Badge label="A very long badge text that should still center its baseline" variant="neutral" />
        </View>
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Presentational primitive — no interactive a11y semantics exposed.
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[5], alignItems: 'center' },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/badge`.**

- [ ] **Step 3: Discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Badge/   # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Badge/  # nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/badge.tsx
git commit -m "feat(playground): add Badge screen"
```

**Phase 13 Definition of Done**

- [ ] Badge renders all 5 variants × 2 sizes correctly.
- [ ] Numeric and string labels both work.
- [ ] No interactive a11y semantics exposed.
- [ ] Discipline checks pass.

---

## Phase 14 — Primitive: `Chip`

**Objective:** Pill with optional avatar/icon prefix and optional remove button. Interactive only when `onPress` or `onRemove` provided.

**Files to create:**
- `packages/chilli-native/src/primitives/Chip/Chip.types.ts`
- `packages/chilli-native/src/primitives/Chip/Chip.tsx`
- `packages/chilli-native/src/primitives/Chip/index.ts`
- `packages/chilli-native-playground/app/chip.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

**Note:** Chip's `variant="avatar"` uses an inline RN `Image`, NOT the `Avatar` primitive (which is implemented in Phase 15, after Chip per the spec's priority order). This is intentional and isolated.

### Task 14.1: Define `ChipProps`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Chip/Chip.types.ts`.**

```ts
import type { ReactNode } from 'react';
import type { ImageSourcePropType, PressableProps, StyleProp, ViewStyle } from 'react-native';

export type ChipType = 'fill' | 'light';
export type ChipSize = 'sm' | 'md' | 'lg' | 'xl';
export type ChipVariant = 'default' | 'avatar' | 'social';

export type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  type?: ChipType;
  size?: ChipSize;
  variant?: ChipVariant;
  /** Used when variant === 'avatar'. */
  avatarSrc?: ImageSourcePropType;
  /** Used when variant === 'social'. Any node — typically an Icon. */
  socialIcon?: ReactNode;
  /** When provided, renders a trailing close button. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
};
```

### Task 14.2: Implement `Chip`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Chip/Chip.tsx`.**

```tsx
import { forwardRef } from 'react';
import { Image, Pressable, StyleSheet, View, type View as ViewType } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import { pickStateful, type InteractionState } from '../../foundations/platform';
import type { ChipProps, ChipSize, ChipType } from './Chip.types';

const SIZE_HEIGHT: Record<ChipSize, number> = { sm: 20, md: 24, lg: 28, xl: 32 };
const SIZE_PAD_DEFAULT: Record<ChipSize, [number, number]> = {
  sm: [8, 2],
  md: [8, 4],
  lg: [12, 4],
  xl: [16, 6],
};
const SIZE_PAD_LEADING: Record<ChipSize, [number, number]> = {
  sm: [4, 2],
  md: [4, 4],
  lg: [4, 4],
  xl: [6, 6],
};
const SIZE_AVATAR: Record<ChipSize, number> = { sm: 16, md: 20, lg: 20, xl: 24 };
const SIZE_ICON: Record<ChipSize, number> = { sm: 16, md: 16, lg: 20, xl: 20 };
const SIZE_REMOVE: Record<ChipSize, number> = { sm: 12, md: 12, lg: 14, xl: 14 };
const SIZE_TEXT: Record<ChipSize, 'bodyXs' | 'bodySm'> = { sm: 'bodyXs', md: 'bodyXs', lg: 'bodySm', xl: 'bodySm' };

const TYPE_BG: Record<ChipType, { default: string; hover?: string; pressed?: string }> = {
  fill: {
    default: tokens.backgrounds.neutral.primary.default,
    hover: tokens.backgrounds.neutral.primary.hover,
    pressed: tokens.backgrounds.neutral.primary.pressed,
  },
  light: { default: 'transparent' },
};

export const Chip = forwardRef<ViewType, ChipProps>(function Chip(
  {
    label,
    type = 'fill',
    size = 'md',
    variant = 'default',
    avatarSrc,
    socialIcon,
    onRemove,
    onPress,
    style,
    ...rest
  },
  ref,
) {
  const hasLeading = variant === 'avatar' || variant === 'social';
  const [padX, padY] = hasLeading ? SIZE_PAD_LEADING[size] : SIZE_PAD_DEFAULT[size];
  const isInteractive = !!onPress || !!onRemove;

  const renderContent = (state: InteractionState) => {
    const bg = isInteractive
      ? pickStateful(TYPE_BG[type], state)
      : TYPE_BG[type].default;

    return (
      <View
        style={[
          styles.base,
          {
            height: SIZE_HEIGHT[size],
            paddingHorizontal: padX,
            paddingVertical: padY,
            backgroundColor: bg,
            borderColor: type === 'light' ? tokens.borders.default : 'transparent',
            borderWidth: type === 'light' ? 1 : 0,
          },
          style,
        ]}
      >
        {variant === 'avatar' && avatarSrc ? (
          <Image
            source={avatarSrc}
            style={{
              width: SIZE_AVATAR[size],
              height: SIZE_AVATAR[size],
              borderRadius: tokens.radius.full,
            }}
          />
        ) : null}
        {variant === 'social' && socialIcon ? (
          <View style={{ width: SIZE_ICON[size], height: SIZE_ICON[size], alignItems: 'center', justifyContent: 'center' }}>
            {socialIcon}
          </View>
        ) : null}
        <Text variant={SIZE_TEXT[size]}>{label}</Text>
        {onRemove ? (
          <Pressable
            onPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label}`}
            hitSlop={8}
          >
            <X size={SIZE_REMOVE[size]} color={tokens.textColors.baseSecondary} />
          </Pressable>
        ) : null}
      </View>
    );
  };

  if (!isInteractive) {
    return <View ref={ref}>{renderContent({ pressed: false })}</View>;
  }

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      accessibilityRole="button"
      {...rest}
    >
      {(state) => renderContent(state)}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: tokens.radius.full,
  },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Chip/index.ts`:

```ts
export { Chip } from './Chip';
export type { ChipProps, ChipType, ChipSize, ChipVariant } from './Chip.types';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { Chip } from './primitives/Chip';
export type { ChipProps, ChipType, ChipSize, ChipVariant } from './primitives/Chip';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Chip packages/chilli-native/src/index.ts
git commit -m "feat(native): add Chip primitive (default/avatar/social, optional remove)"
```

### Task 14.3: Build the Chip playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/chip.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Github, Twitter } from 'lucide-react-native';
import { Text, Chip, Icon, tokens } from 'chilli-native';

const TYPES = ['fill', 'light'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

const FAKE_AVATAR = { uri: 'https://i.pravatar.cc/64?img=12' };

export default function ChipPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Type × Size (default variant)">
        {TYPES.map((t) => (
          <View key={t} style={styles.row}>
            {SIZES.map((s) => (
              <Chip key={`${t}-${s}`} type={t} size={s} label={`${t} ${s}`} />
            ))}
          </View>
        ))}
      </Section>

      <Section title="With avatar">
        <View style={styles.row}>
          {SIZES.map((s) => (
            <Chip key={s} variant="avatar" avatarSrc={FAKE_AVATAR} size={s} label={`Alex ${s}`} />
          ))}
        </View>
      </Section>

      <Section title="With social icon">
        <View style={styles.row}>
          <Chip variant="social" socialIcon={<Icon source={Github} size={16} />} label="GitHub" />
          <Chip variant="social" socialIcon={<Icon source={Twitter} size={16} />} label="Twitter" />
        </View>
      </Section>

      <Section title="With remove">
        <View style={styles.row}>
          <Chip label="Removable" onRemove={() => {}} />
          <Chip variant="avatar" avatarSrc={FAKE_AVATAR} label="Alex" onRemove={() => {}} />
        </View>
      </Section>

      <Section title="Interactive (onPress)">
        <View style={styles.row}>
          <Chip label="Tap me" onPress={() => {}} />
          <Chip type="light" label="Tap light" onPress={() => {}} />
        </View>
      </Section>

      <Section title="Edge cases">
        <Chip label="A very long chip label that probably wraps weirdly in tight layouts" />
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Interactive chips expose accessibilityRole=button. Static chips are presentational.
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[5], alignItems: 'center' },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/chip`.**

- [ ] **Step 3: Discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Chip/   # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Chip/  # nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/chip.tsx
git commit -m "feat(playground): add Chip screen (type × size × variants × remove)"
```

**Phase 14 Definition of Done**

- [ ] Chip renders default/avatar/social variants correctly across all sizes.
- [ ] Static chips are wrapped in `View`, not `Pressable`.
- [ ] Remove button has its own a11y label.
- [ ] Discipline checks pass.

**Risks / blockers**

- Inline `Image` for avatar variant may visually differ from the (later) Avatar primitive. Acceptable for phase 1 per spec; can be unified in a phase-2 cleanup.

---

## Phase 15 — Primitive: `Avatar`

**Objective:** Circular image with initials fallback. Foundation for AvatarGroup, AvatarDuo, AvatarLabel.

**Files to create:**
- `packages/chilli-native/src/primitives/Avatar/Avatar.types.ts`
- `packages/chilli-native/src/primitives/Avatar/Avatar.tsx`
- `packages/chilli-native/src/primitives/Avatar/index.ts`
- `packages/chilli-native-playground/app/avatar.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

### Task 15.1: Define `AvatarProps`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Avatar/Avatar.types.ts`.**

```ts
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type AvatarSize = 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | number;

export type AvatarProps = {
  /** Image source. If absent or fails to load, initials are shown. */
  source?: ImageSourcePropType;
  /** Fallback when source is missing or fails. Truncated to first 2 chars. */
  initials?: string;
  /** Pixel diameter. Default: 32. */
  size?: AvatarSize;
  /** Adds a 2px white ring (useful for AvatarGroup overlap). */
  ring?: boolean;
  /** Background color used behind initials. Default: tokens.backgrounds.neutral.tertiary.default. */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};
```

### Task 15.2: Implement `Avatar`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/Avatar/Avatar.tsx`.**

```tsx
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { AvatarProps } from './Avatar.types';

const RING_WIDTH = 2;

function pickInitialsFontSize(diameter: number): number {
  if (diameter <= 16) return tokens.fontSize['2xs'];
  if (diameter <= 24) return tokens.fontSize.xs;
  if (diameter <= 40) return tokens.fontSize.sm;
  if (diameter <= 56) return tokens.fontSize.md;
  return tokens.fontSize.lg;
}

export function Avatar({
  source,
  initials,
  size = 32,
  ring = false,
  backgroundColor = tokens.backgrounds.neutral.tertiary.default,
  style,
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showInitials = !source || imageFailed;
  const truncatedInitials = (initials ?? '').slice(0, 2).toUpperCase();

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: showInitials ? backgroundColor : 'transparent',
          borderWidth: ring ? RING_WIDTH : 0,
          borderColor: ring ? tokens.colors.white : 'transparent',
        },
        style,
      ]}
      accessibilityRole="image"
    >
      {!showInitials ? (
        <Image
          source={source!}
          onError={() => setImageFailed(true)}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text
          variant="bodyXs"
          color={tokens.textColors.basePrimary}
          style={{ fontSize: pickInitialsFontSize(size), lineHeight: pickInitialsFontSize(size) * 1.2 }}
        >
          {truncatedInitials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
```

- [ ] **Step 2: Create the barrel.**

`packages/chilli-native/src/primitives/Avatar/index.ts`:

```ts
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarSize } from './Avatar.types';
```

- [ ] **Step 3: Wire into public barrel.**

Add to `packages/chilli-native/src/index.ts`:

```ts
export { Avatar } from './primitives/Avatar';
export type { AvatarProps, AvatarSize } from './primitives/Avatar';
```

- [ ] **Step 4: Type-check + commit.**

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/Avatar packages/chilli-native/src/index.ts
git commit -m "feat(native): add Avatar primitive (image + initials fallback)"
```

### Task 15.3: Build the Avatar playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/avatar.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Avatar, tokens } from 'chilli-native';

const SIZES = [16, 20, 24, 32, 40, 48, 56, 64];
const FAKE_AVATAR = { uri: 'https://i.pravatar.cc/128?img=20' };
const BAD_URI = { uri: 'https://invalid.example.com/missing.png' };

export default function AvatarPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes (with image)">
        <View style={styles.row}>
          {SIZES.map((s) => <Avatar key={s} size={s} source={FAKE_AVATAR} />)}
        </View>
      </Section>

      <Section title="Sizes (initials fallback)">
        <View style={styles.row}>
          {SIZES.map((s) => <Avatar key={s} size={s} initials="AC" />)}
        </View>
      </Section>

      <Section title="Ring (overlap-friendly)">
        <View style={styles.row}>
          <Avatar size={48} source={FAKE_AVATAR} ring />
          <Avatar size={48} initials="JD" ring />
        </View>
      </Section>

      <Section title="Custom background (initials)">
        <View style={styles.row}>
          <Avatar size={48} initials="LS" backgroundColor={tokens.backgrounds.brand.strong.default} />
          <Avatar size={48} initials="MK" backgroundColor={tokens.backgrounds.danger.strong.default} />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.row}>
          <Avatar size={48} initials="" />
          <Avatar size={48} initials="VeryLongName" />
          <Avatar size={48} source={BAD_URI} initials="FB" />
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Above: empty initials (renders empty), long name (truncated to 2), broken image URL (falls back to initials).
        </Text>
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          accessibilityRole=image set on every avatar.
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[5], alignItems: 'flex-end' },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/avatar`.**

- [ ] **Step 3: Discipline checks.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/Avatar/    # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/Avatar/  # nothing
```

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/avatar.tsx
git commit -m "feat(playground): add Avatar screen (sizes × image/fallback × ring × edge cases)"
```

**Phase 15 Definition of Done**

- [ ] Avatar renders image + initials fallback correctly.
- [ ] Image-load failure transparently falls back to initials.
- [ ] Ring renders without clipping the inner image.
- [ ] Discipline checks pass.

---

## Phase 16 — Primitive: `AvatarGroup`

**Objective:** Stack of overlapping avatars with `+N` overflow.

**Files to create:**
- `packages/chilli-native/src/primitives/AvatarGroup/AvatarGroup.tsx`
- `packages/chilli-native/src/primitives/AvatarGroup/index.ts`
- `packages/chilli-native-playground/app/avatar-group.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

**Prerequisites:** Phase 15 (Avatar).

### Task 16.1: Implement `AvatarGroup`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/AvatarGroup/AvatarGroup.tsx`.**

```tsx
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar';
import { tokens } from '../../foundations/theme';

export type AvatarGroupProps = {
  avatars: AvatarProps[];
  size?: AvatarSize;
  /** If provided and avatars.length > max, renders a +N tile at the end. */
  max?: number;
  /** Pixel overlap between consecutive avatars. Defaults to size * 0.3. */
  overlap?: number;
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({ avatars, size = 32, max, overlap, style }: AvatarGroupProps) {
  const sizeNumeric = typeof size === 'number' ? size : 32;
  const computedOverlap = overlap ?? Math.round(sizeNumeric * 0.3);
  const visible = max != null && avatars.length > max ? avatars.slice(0, max) : avatars;
  const overflow = max != null ? Math.max(0, avatars.length - max) : 0;

  return (
    <View style={[styles.row, style]}>
      {visible.map((a, i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : -computedOverlap }}>
          <Avatar {...a} size={size} ring />
        </View>
      ))}
      {overflow > 0 ? (
        <View style={{ marginLeft: -computedOverlap }}>
          <Avatar
            size={size}
            initials={`+${overflow}`}
            ring
            backgroundColor={tokens.backgrounds.neutral.secondary.default}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
```

- [ ] **Step 2: Create barrel + wire into public index + commit.**

`packages/chilli-native/src/primitives/AvatarGroup/index.ts`:

```ts
export { AvatarGroup } from './AvatarGroup';
export type { AvatarGroupProps } from './AvatarGroup';
```

Add to `packages/chilli-native/src/index.ts`:

```ts
export { AvatarGroup } from './primitives/AvatarGroup';
export type { AvatarGroupProps } from './primitives/AvatarGroup';
```

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/AvatarGroup packages/chilli-native/src/index.ts
git commit -m "feat(native): add AvatarGroup primitive (overlap + +N overflow)"
```

### Task 16.2: Build the AvatarGroup playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/avatar-group.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, AvatarGroup, tokens } from 'chilli-native';

const PEOPLE = [
  { source: { uri: 'https://i.pravatar.cc/64?img=1' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=2' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=3' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=4' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=5' } },
  { initials: 'AB' },
  { initials: 'CD' },
];

export default function AvatarGroupPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (no max)">
        <AvatarGroup avatars={PEOPLE.slice(0, 3)} />
      </Section>

      <Section title="With max (overflow → +N)">
        <AvatarGroup avatars={PEOPLE} max={4} />
      </Section>

      <Section title="Sizes">
        {[16, 24, 32, 48].map((s) => (
          <AvatarGroup key={s} size={s} avatars={PEOPLE.slice(0, 4)} />
        ))}
      </Section>

      <Section title="Custom overlap">
        <AvatarGroup size={40} overlap={5} avatars={PEOPLE.slice(0, 4)} />
        <AvatarGroup size={40} overlap={20} avatars={PEOPLE.slice(0, 4)} />
      </Section>

      <Section title="Edge cases">
        <AvatarGroup avatars={[]} />
        <AvatarGroup avatars={[{ initials: 'Solo' }]} />
        <AvatarGroup avatars={PEOPLE} max={1} />
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/avatar-group`.**

- [ ] **Step 3: Discipline checks + commit.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/AvatarGroup/   # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/AvatarGroup/ # nothing
git add packages/chilli-native-playground/app/avatar-group.tsx
git commit -m "feat(playground): add AvatarGroup screen"
```

**Phase 16 Definition of Done**

- [ ] AvatarGroup overlaps correctly with default + custom overlap.
- [ ] `+N` tile renders when max exceeded.
- [ ] Empty array, single avatar, max=1 edge cases handled.
- [ ] Discipline checks pass.

---

## Phase 17 — Primitive: `AvatarDuo`

**Objective:** Two avatars composed in a specific layout. Final layout matched to source `chilli-docs/components/ui/avatar-duo.tsx` during implementation.

**Files to create:**
- `packages/chilli-native/src/primitives/AvatarDuo/AvatarDuo.tsx`
- `packages/chilli-native/src/primitives/AvatarDuo/index.ts`
- `packages/chilli-native-playground/app/avatar-duo.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

**Prerequisites:** Phase 15 (Avatar).

### Task 17.1: Read the source

- [ ] **Step 1: Read `chilli-docs/components/ui/avatar-duo.tsx` and `chilli-docs/app/docs/avatar-duo/page.tsx` (or its demo).**

Note: layout pattern observed (e.g., primary avatar large, secondary smaller and bottom-right; or two avatars side-by-side with slight offset). Document the chosen pattern in a comment in `AvatarDuo.tsx`.

### Task 17.2: Implement `AvatarDuo`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/AvatarDuo/AvatarDuo.tsx`.**

The implementation depends on the source pattern. The skeleton below assumes the common "primary avatar with a secondary mini-avatar overlapping bottom-right" layout. Adjust if the source differs.

```tsx
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar';

export type AvatarDuoProps = {
  primary: AvatarProps;
  secondary: AvatarProps;
  /** Diameter of the primary avatar. Secondary is sized at ~40%. */
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
};

export function AvatarDuo({ primary, secondary, size = 48, style }: AvatarDuoProps) {
  const primarySize = typeof size === 'number' ? size : 48;
  const secondarySize = Math.round(primarySize * 0.4);

  return (
    <View style={[{ width: primarySize, height: primarySize }, style]}>
      <Avatar {...primary} size={primarySize} />
      <View
        style={[
          styles.secondaryWrapper,
          {
            right: -secondarySize * 0.2,
            bottom: -secondarySize * 0.2,
          },
        ]}
      >
        <Avatar {...secondary} size={secondarySize} ring />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  secondaryWrapper: {
    position: 'absolute',
  },
});
```

- [ ] **Step 2: Verify against source visual.**

If the source AvatarDuo uses a different composition (e.g., side-by-side, top-left badge, etc.), adjust the JSX/styles to match. Comment the file with a one-line description of the chosen layout. CHANGELOG entry if behavior diverges from the structural default above.

- [ ] **Step 3: Create barrel + public export + commit.**

`packages/chilli-native/src/primitives/AvatarDuo/index.ts`:

```ts
export { AvatarDuo } from './AvatarDuo';
export type { AvatarDuoProps } from './AvatarDuo';
```

In `src/index.ts`:

```ts
export { AvatarDuo } from './primitives/AvatarDuo';
export type { AvatarDuoProps } from './primitives/AvatarDuo';
```

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/AvatarDuo packages/chilli-native/src/index.ts
git commit -m "feat(native): add AvatarDuo primitive (composed avatars)"
```

### Task 17.3: Playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/avatar-duo.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, AvatarDuo, tokens } from 'chilli-native';

const A = { source: { uri: 'https://i.pravatar.cc/64?img=8' } };
const B = { source: { uri: 'https://i.pravatar.cc/64?img=9' } };
const INITIALS = { initials: 'JD' };

export default function AvatarDuoPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes">
        {[32, 48, 64, 96].map((s) => (
          <AvatarDuo key={s} primary={A} secondary={B} size={s} />
        ))}
      </Section>

      <Section title="Mixed (image + initials)">
        <AvatarDuo primary={A} secondary={INITIALS} size={64} />
        <AvatarDuo primary={INITIALS} secondary={A} size={64} />
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[8] },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/avatar-duo` + side-by-side compare with `chilli-docs` demo.**

- [ ] **Step 3: Discipline checks + commit.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/AvatarDuo/   # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/AvatarDuo/ # nothing
git add packages/chilli-native-playground/app/avatar-duo.tsx
git commit -m "feat(playground): add AvatarDuo screen"
```

**Phase 17 Definition of Done**

- [ ] AvatarDuo layout visually matches the source pattern.
- [ ] Discipline checks pass.

---

## Phase 18 — Primitive: `AvatarLabel`

**Objective:** Avatar + title (+ optional subtitle). Purely presentational.

**Files to create:**
- `packages/chilli-native/src/primitives/AvatarLabel/AvatarLabel.tsx`
- `packages/chilli-native/src/primitives/AvatarLabel/index.ts`
- `packages/chilli-native-playground/app/avatar-label.tsx`

**Files to edit:**
- `packages/chilli-native/src/index.ts`

### Task 18.1: Implement `AvatarLabel`

- [ ] **Step 1: Create `packages/chilli-native/src/primitives/AvatarLabel/AvatarLabel.tsx`.**

```tsx
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { Avatar, type AvatarProps } from '../Avatar';
import { tokens } from '../../foundations/theme';

export type AvatarLabelSize = 'sm' | 'md' | 'lg';

export type AvatarLabelProps = {
  avatar: AvatarProps;
  title: string;
  subtitle?: string;
  size?: AvatarLabelSize;
  style?: StyleProp<ViewStyle>;
};

const SIZE_AVATAR: Record<AvatarLabelSize, number> = { sm: 24, md: 32, lg: 48 };
const SIZE_TITLE: Record<AvatarLabelSize, 'bodyXs' | 'bodySm' | 'bodyMd'> = {
  sm: 'bodyXs',
  md: 'bodySm',
  lg: 'bodyMd',
};
const SIZE_SUBTITLE: Record<AvatarLabelSize, 'bodyXs' | 'bodySm'> = {
  sm: 'bodyXs',
  md: 'bodyXs',
  lg: 'bodySm',
};

export function AvatarLabel({ avatar, title, subtitle, size = 'md', style }: AvatarLabelProps) {
  return (
    <View style={[styles.row, style]}>
      <Avatar {...avatar} size={SIZE_AVATAR[size]} />
      <View style={styles.text}>
        <Text variant={SIZE_TITLE[size]} color={tokens.textColors.basePrimary}>{title}</Text>
        {subtitle ? (
          <Text variant={SIZE_SUBTITLE[size]} color={tokens.textColors.baseSecondary}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[5] },
  text: { gap: tokens.spacing[1] },
});
```

- [ ] **Step 2: Create barrel + public export + commit.**

`packages/chilli-native/src/primitives/AvatarLabel/index.ts`:

```ts
export { AvatarLabel } from './AvatarLabel';
export type { AvatarLabelProps, AvatarLabelSize } from './AvatarLabel';
```

In `src/index.ts`:

```ts
export { AvatarLabel } from './primitives/AvatarLabel';
export type { AvatarLabelProps, AvatarLabelSize } from './primitives/AvatarLabel';
```

```bash
pnpm --filter chilli-native typecheck
git add packages/chilli-native/src/primitives/AvatarLabel packages/chilli-native/src/index.ts
git commit -m "feat(native): add AvatarLabel primitive (avatar + title + optional subtitle)"
```

### Task 18.2: Playground screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/avatar-label.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, AvatarLabel, tokens } from 'chilli-native';

const A = { source: { uri: 'https://i.pravatar.cc/64?img=15' } };

export default function AvatarLabelPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes">
        <AvatarLabel size="sm" avatar={A} title="Alex Carter" subtitle="Climate creator" />
        <AvatarLabel size="md" avatar={A} title="Alex Carter" subtitle="Climate creator" />
        <AvatarLabel size="lg" avatar={A} title="Alex Carter" subtitle="Climate creator" />
      </Section>

      <Section title="Title only (no subtitle)">
        <AvatarLabel avatar={A} title="No subtitle here" />
      </Section>

      <Section title="Initials avatar">
        <AvatarLabel avatar={{ initials: 'JD' }} title="Jane Doe" subtitle="Supporter" />
      </Section>

      <Section title="Edge cases">
        <AvatarLabel
          avatar={A}
          title="A very long title that might wrap or get clipped depending on the available width"
          subtitle="And a long subtitle too — does it wrap nicely?"
        />
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Presentational primitive — no interactive a11y semantics.
        </Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/avatar-label`.**

- [ ] **Step 3: Discipline checks + commit.**

```bash
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/AvatarLabel/    # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/AvatarLabel/  # nothing
git add packages/chilli-native-playground/app/avatar-label.tsx
git commit -m "feat(playground): add AvatarLabel screen"
```

**Phase 18 Definition of Done**

- [ ] AvatarLabel renders all three sizes with title and optional subtitle.
- [ ] Long text wraps cleanly in the text column.
- [ ] No interactive a11y semantics exposed.
- [ ] Discipline checks pass.

---

## Phase 19 — Profile-card assembly screen

**Objective:** Compose Button + Chip + Avatar + AvatarLabel + Badge in a realistic layout. If the API is uncomfortable to write here, the public surface has a problem and must be fixed before closing phase 1.

**Files to create:**
- `packages/chilli-native-playground/app/profile-card.tsx`

### Task 19.1: Assembly screen

- [ ] **Step 1: Create `packages/chilli-native-playground/app/profile-card.tsx`.**

```tsx
import { ScrollView, View, StyleSheet } from 'react-native';
import { Heart, Share2, MessageCircle } from 'lucide-react-native';
import {
  Text,
  Button,
  IconButton,
  Badge,
  Chip,
  Avatar,
  AvatarLabel,
  AvatarGroup,
  tokens,
} from 'chilli-native';

export default function ProfileCardPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <AvatarLabel
            size="lg"
            avatar={{ source: { uri: 'https://i.pravatar.cc/128?img=33' } }}
            title="Alex Carter"
            subtitle="Climate creator · 12.4k supporters"
          />
          <Badge label="Verified" variant="brand" />
        </View>

        <Text variant="bodyMd">
          Pushing the next round of action emails to local representatives. Join in — every voice
          adds momentum.
        </Text>

        <View style={styles.chipsRow}>
          <Chip label="Climate" />
          <Chip label="Activism" />
          <Chip variant="social" label="Discord" socialIcon={<Heart size={16} color={tokens.iconColors.brandPrimary} />} />
        </View>

        <View style={styles.supportersRow}>
          <AvatarGroup
            size={24}
            max={4}
            avatars={[
              { source: { uri: 'https://i.pravatar.cc/64?img=1' } },
              { source: { uri: 'https://i.pravatar.cc/64?img=2' } },
              { source: { uri: 'https://i.pravatar.cc/64?img=3' } },
              { source: { uri: 'https://i.pravatar.cc/64?img=4' } },
              { initials: 'AB' },
              { initials: 'CD' },
            ]}
          />
          <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>+248 supporters today</Text>
        </View>

        <View style={styles.actionsRow}>
          <Button variant="brand" size="md" leftIcon={Heart} onPress={() => {}}>Support</Button>
          <IconButton variant="secondary" size="md" icon={MessageCircle} accessibilityLabel="Comment" onPress={() => {}} />
          <IconButton variant="secondary" size="md" icon={Share2} accessibilityLabel="Share" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7] },
  card: {
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderRadius: tokens.radius[6],
    padding: tokens.spacing[7],
    gap: tokens.spacing[6],
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[4] },
  supportersRow: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[5] },
  actionsRow: { flexDirection: 'row', gap: tokens.spacing[4], alignItems: 'center' },
});
```

- [ ] **Step 2: Visual validation iOS + Web at `/profile-card`.**

The card should feel cohesive: typography sizes balanced, spacing consistent, avatars properly aligned, buttons proportional. If something feels off, the issue is likely in foundations or in a primitive's defaults — fix at the source, not at the assembly.

- [ ] **Step 3: API ergonomics check.**

While writing the screen, did any of these happen?

- A type that should have been re-exported wasn't.
- A prop name felt awkward (e.g., `socialIcon` vs `prefix`).
- A default forced a workaround (e.g., having to pass `color` everywhere because the default doesn't fit dark mode).
- Composing two primitives required a wrapping `View` that probably shouldn't be needed.

For each: open an issue note in the CHANGELOG under `## [Unreleased]` (a one-line describe-the-irritation entry). If the friction is high enough to fail the spec's "If composition is uncomfortable... fix before closing", apply the fix in the relevant primitive and re-run that primitive's discipline checks before continuing.

- [ ] **Step 4: Commit.**

```bash
git add packages/chilli-native-playground/app/profile-card.tsx packages/chilli-native/CHANGELOG.md
git commit -m "feat(playground): add profile-card assembly screen (phase 1 acceptance)"
```

**Phase 19 Definition of Done**

- [ ] Profile card renders cleanly on iOS and Web.
- [ ] Any API ergonomics issues uncovered are either fixed or logged as deferred (with explicit rationale in CHANGELOG).
- [ ] Visual feel matches the spirit of `chilli-docs` demos (warm, expressive, mobile-native).

---

## Phase 20 — Visual comparison vs `chilli-docs` (full audit)

**Objective:** Side-by-side visual review of every primitive against its source demo. Detect drift that wasn't caught at single-primitive review time.

**No new files.** Output is documentation under `packages/chilli-native/CHANGELOG.md`.

### Task 20.1: Run the audit

- [ ] **Step 1: Boot both apps.**

In one terminal: `cd chilli-docs && pnpm run dev` (or whatever the existing command is).
In another: `pnpm --filter chilli-native-playground exec expo start --web`.

- [ ] **Step 2: Walk through every primitive.**

For each of Text, Button, Icon, IconButton, Badge, Chip, Avatar, AvatarGroup, AvatarDuo, AvatarLabel:

1. Open the corresponding `chilli-docs` demo URL (e.g., `/docs/avatar`).
2. Open the playground screen (e.g., `/avatar`) in the second browser.
3. Compare side-by-side:
   - Color exactness (hex match where applicable; visual match for opacity composites).
   - Sizing consistency (heights, paddings, gaps).
   - Typography (font weight, size, line-height — especially Inter rendering on both).
   - Shape (border-radius, especially `radius.full` pills).
   - Shadow (depth, blur, spread for Button brand).
   - Glass effect (real blur + tint matching).

For each delta noticed:
- If it's a token error (wrong value), fix the token. Re-test impacted primitives. Commit with `fix(native): tune <token> to match source demo`.
- If it's a primitive layout error, fix the primitive. Re-run its discipline checks. Commit similarly.
- If it's an intentional divergence (per spec section 6.5 of the design doc), document it under "Divergences vs web source" in CHANGELOG.

- [ ] **Step 3: Verify Glass on iOS.**

Plug or open an iOS simulator. Boot `expo start --ios`. On `/button` and `/icon-button`, confirm the glass effect uses the native `UIBlurEffect` (not just a translucent fill — the underlying view should be visibly blurred when scrolling something colorful behind it).

If the blur looks fake, check that `expo-blur` is installed in the playground (it should be from Phase 7) and that `BlurView` is rendered inside `GlassSurface`. Re-run.

- [ ] **Step 4: Commit any audit findings.**

```bash
# After all fixes:
git status
# If anything was changed, commit as needed (one logical commit per fix).
git add packages/chilli-native/CHANGELOG.md
git commit -m "docs(native): record visual-audit findings and divergences"
```

**Phase 20 Definition of Done**

- [ ] Every primitive has been compared side-by-side against its source demo.
- [ ] Token drift fixed or documented.
- [ ] Glass effect verified on iOS as native blur.
- [ ] CHANGELOG reflects all audit findings.

**Risks / blockers**

- The auditor is the same engineer who built the package — confirmation bias risk. Mitigation: have a second pair of eyes (designer or PM) confirm 2–3 critical primitives if available.
- Source demos may have been updated since the spec was written. Use the source as the reference; if a source change conflicts with phase 1 scope, log as phase-2 concern, do not silently absorb.

---

## Phase 21 — Main-app integration check (highly desirable, non-blocking)

**Objective:** Confirm `chilli-native` consumes cleanly inside the main Chilli app via local link. Catches packaging/path/peer-dep issues before phase 2 starts.

**No new files in this repo.** Changes happen in the main Chilli app's repo.

### Task 21.1: Local link

- [ ] **Step 1: In the main Chilli app's repo, add the workspace link.**

If the main app is a separate repo (not in this monorepo), use `pnpm link` from this repo:

```bash
# In chilli-components/packages/chilli-native:
pnpm link --global

# In the main Chilli app's repo:
pnpm link --global chilli-native
```

If the main app is brought into this monorepo at some point, swap to `"chilli-native": "workspace:*"` in its `package.json` and `pnpm install`.

### Task 21.2: Sanity import

- [ ] **Step 1: In the main app, pick an existing screen and add:**

```tsx
import { Button, Chip, tokens } from 'chilli-native';

// In the screen JSX:
<Button variant="brand" onPress={() => {}}>From the design system</Button>
<Chip label="hello" />
```

- [ ] **Step 2: Build the main app for iOS and (if applicable) Web.**

Verify:
- No "module not found" or peer-dep errors.
- Inter renders correctly (the main app already loads Inter — this is the chance to confirm the family names match).
- Button + Chip render with the expected dark-mode tokens.

If anything fails, capture the error in CHANGELOG under "Phase 21 — integration findings" and fix in `chilli-native`. Common issues:

- Peer dep version mismatch (e.g., main app on a different `expo-blur`). Bump the peer range.
- Metro can't resolve `chilli-native` source TS. Confirm the main app's `metro.config.js` includes a `watchFolders` entry covering this package.
- TypeScript path mapping needs adjustment in the main app's `tsconfig.json`.

### Task 21.3: Cleanup or commit

- [ ] **Step 1: Revert the test import in the main app** (it was a sanity check, not a permanent change).

- [ ] **Step 2: If `chilli-native` was changed, commit those changes.**

```bash
git add packages/chilli-native packages/chilli-native/CHANGELOG.md
git commit -m "fix(native): adjustments from main-app integration check"
```

**Phase 21 Definition of Done**

- [ ] `chilli-native` imports cleanly in the main Chilli app.
- [ ] Sanity import (Button + Chip) renders correctly on iOS + Web (whichever is buildable).
- [ ] Any blockers logged; non-blocking issues triaged for phase 2.

**If externally blocked** (main app not currently buildable, no access, etc.): skip this phase. Add a "Phase 21 deferred — first action of phase 2" note in CHANGELOG. Continue to Phase 22.

---

## Phase 22 — Documentation finalization

**Objective:** Bring README, CHANGELOG, and the divergences section to a state suitable for phase 1 sign-off.

**Files to edit:**
- `packages/chilli-native/README.md`
- `packages/chilli-native/CHANGELOG.md`

### Task 22.1: README

- [ ] **Step 1: Replace `packages/chilli-native/README.md` with the finalized version.**

```markdown
# chilli-native

React Native + Expo design system for Chilli. **Phase 1 status: shipping** — foundations + 10 primitives, dark mode only, iOS + RN Web.

> Spec: `docs/superpowers/specs/2026-04-17-chilli-native-phase-1-design.md` (monorepo root).
> Plan: `docs/superpowers/plans/2026-04-17-chilli-native-phase-1-plan.md`.

## Install (consumer side)

The package is consumed via local pnpm workspace link. From the main Chilli app:

```json
{
  "dependencies": {
    "chilli-native": "workspace:*"
  }
}
```

Required peer dependencies on the consumer side:

- `react`, `react-native`, `expo` (SDK 54)
- `expo-blur`, `expo-font`
- `react-native-svg`
- `lucide-react-native`

## Public API

### Foundations

- `tokens` — aggregated tokens (colors, spacing, radius, borderWidth, size, fontSize, lineHeight, letterSpacing, fontFamily, textStyles, backgrounds, textColors, borders, iconColors, buttons, links, shadows). Type: `Tokens`.
- Token groups individually exported for convenience (`colors`, `spacing`, ..., `shadows`).
- `useLoadChilliFonts()` — `expo-font` hook returning `[loaded, error]`. Loads Inter weights bundled in this package.
- `fontAssets` — raw asset map, in case the consumer wants to load fonts manually.
- `pickStateful(values, state)` — helper to pick `default` / `hover` / `pressed` token slot.
- `resolveStateSlot(state)` — same, but returns the slot key.
- `shadow(token)` — converts a `ShadowToken` to a platform-appropriate `ViewStyle`.

### Primitives

- `Text`, `Button`, `Icon`, `IconButton`, `Badge`, `Chip`, `Avatar`, `AvatarGroup`, `AvatarDuo`, `AvatarLabel`.

Each primitive's props type is exported as `<Name>Props` (e.g., `ButtonProps`).

## Conventions

- Foundations contain no JSX (tokens + helpers only).
- Primitives import only from foundations.
- `Platform.select` / `Platform.OS` only inside `foundations/platform/`.
- Dark mode only in phase 1.
- All hex literals live in `foundations/tokens/`.
- All variant/size names mirror the source web design system.

## Divergences vs web source

See `CHANGELOG.md` and the spec's section 6.5 for the full list. Key items:

- `textStyles` is a derived layer on top of source CSS scales, not a 1:1 mirror.
- Shadow `offsetX/offsetY/blur` values are observed from source demos (CSS only specifies color).
- Hover states are ignored on iOS (no equivalent input modality).
- Glass effect on `danger` and `danger-soft` button variants is unsupported.
- Backdrop blur is real (`expo-blur`) on both platforms.
- Web-only effects (`aurora-shader`, `animated-glow-card`, `animated-gradient-border`) are deferred until a real screen needs them.

## Roadmap

- **Phase 2 priority order:** `Input` → `Textarea` → `SearchBar` → `Select`. Each will get its own brainstorm → spec → plan cycle.
- Frozen until needed: web-only effects, business components (CampaignCard, CampaignPage, ActionCtaCard, SupportCreatorCard, CampaignShowcase).
```

- [ ] **Step 2: Commit.**

```bash
git add packages/chilli-native/README.md
git commit -m "docs(native): finalize README for phase 1 sign-off"
```

### Task 22.2: CHANGELOG cut

- [ ] **Step 1: Convert `## [Unreleased]` to `## [0.1.0] — YYYY-MM-DD` (use the actual date).**

In `packages/chilli-native/CHANGELOG.md`, the structure becomes:

```markdown
# Changelog

## [Unreleased]

## [0.1.0] — 2026-04-17  (← use the actual completion date)

### Added
- Foundations: `tokens` (primitive + semantic), `pickStateful`, `resolveStateSlot`, `shadow()`, `useLoadChilliFonts()`.
- Primitives: Text, Button, Icon, IconButton, Badge, Chip, Avatar, AvatarGroup, AvatarDuo, AvatarLabel.
- Internal: GlassSurface (not exported publicly).
- Playground app with one screen per primitive plus a profile-card assembly.

### Documented divergences from source web
- `textStyles` derived layer (not a CSS mirror).
- Shadow offset/blur observed from source demos.
- Hover ignored on iOS.
- Glass + danger / danger-soft unsupported (single dev warning + non-glass fallback).
- Real backdrop blur via `expo-blur`.

### Decisions logged during implementation
- (← every CHANGELOG entry accumulated during phases 2–20 lives here; do not summarize, keep them verbatim)
```

- [ ] **Step 2: Verify all logged decisions are present.**

Sanity grep for the categories the spec demanded be tracked:

```bash
grep -i "textStyles\|shadow\|glass\|hover\|font\|inter" packages/chilli-native/CHANGELOG.md
```

Expected: lines covering each item from the divergences list.

- [ ] **Step 3: Commit.**

```bash
git add packages/chilli-native/CHANGELOG.md
git commit -m "docs(native): cut CHANGELOG 0.1.0 for phase 1 completion"
```

### Task 22.3: Phase 1 Done verification

- [ ] **Step 1: Walk the spec's section 8 (Definition of Done) and check every box against the actual repo state.**

Run the global checks:

```bash
pnpm --filter chilli-native typecheck
pnpm --filter chilli-native-playground typecheck
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/    # nothing
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/  # nothing
```

If anything fails, fix it now and re-run. Phase 1 is closed only when all four commands return clean.

- [ ] **Step 2: Tag the commit (optional but recommended).**

```bash
git tag chilli-native-phase-1-done
```

**Phase 22 Definition of Done**

- [ ] README finalized.
- [ ] CHANGELOG cut at `0.1.0` with all decisions.
- [ ] Spec's section 8 walked and confirmed point-by-point.
- [ ] Discipline grep checks pass globally.
- [ ] (Optional) git tag set.

---

## Validation strategy (consolidated)

Repeated here as a single reference, since it's spread across phases:

| Layer | What it validates | How |
|---|---|---|
| **TypeScript type-check** | Tokens are typed, primitives consume tokens correctly, public API is consistent | `pnpm --filter chilli-native typecheck` and `pnpm --filter chilli-native-playground typecheck`. Run after every commit. |
| **iOS runtime** | Components render on iOS, fonts load, glass blur is native, pressables react | `pnpm --filter chilli-native-playground exec expo start --ios`. Walk every primitive screen + profile-card. |
| **Web runtime (RN Web)** | Components render on web, hover states work, backdrop-filter blur applies, fonts fall back correctly | `pnpm --filter chilli-native-playground exec expo start --web`. Same walkthrough. |
| **Web bundle** | Production bundle builds without errors/warnings | `pnpm --filter chilli-native-playground exec expo export --platform web`. Output should mention 0 errors and 0 warnings. |
| **Visual comparison** | Phase 1 primitives visually match source demos | Phase 20 audit: side-by-side `chilli-docs` vs playground per primitive. |
| **Composition** | Public API supports realistic assemblies | Phase 19 profile-card screen. |
| **Integration** | Package consumes cleanly in the main Chilli app | Phase 21 sanity import. Non-blocking. |
| **Discipline** | No invented tokens, no hex in `.tsx`, no `Platform.*` outside foundations | `rg` checks at end of every primitive phase + globally in Phase 22. |

There is no Jest, no Vitest, no test runner in phase 1.

---

## Design system discipline checks (consolidated)

Run at the end of every primitive phase **and** as the final step of Phase 22:

```bash
# 1. No hex literals in primitive .tsx files.
rg -n "#[0-9a-fA-F]{3,8}" packages/chilli-native/src/primitives/

# 2. No Platform.select or Platform.OS in primitives.
rg -n "Platform\.(select|OS)" packages/chilli-native/src/primitives/

# 3. Type-check.
pnpm --filter chilli-native typecheck
pnpm --filter chilli-native-playground typecheck
```

All three must produce zero output / zero errors. If any fails, the offending primitive must be fixed before moving on.

**What the hex grep does NOT flag (expected false-positives to ignore):**

- The string `'transparent'` is a valid CSS/RN color keyword, not a hex literal. It appears in `primitives/_internal/GlassSurface/GlassSurface.tsx` (as a default `borderColor`) and in `primitives/Chip/Chip.tsx` (as the `light`-type background, and as the border fallback on `fill`-type). These are intentional and the grep won't catch them. Do not "fix" them.
- Color values that come from `tokens.*` (e.g., `tokens.colors.white`) don't contain a `#` at the primitive call site — they resolve to hex at the token source. These are compliant.

If the grep returns any hit, the offending value must either (a) be replaced by a `tokens.*` reference, or (b) be moved into `foundations/tokens/` with a source justification.

Additional editorial checks (manual, per primitive):

- Did this primitive add a token to `foundations/tokens/`? If yes, was it because the source has the equivalent value? If no, this is an invented token — remove or move to phase 2 with explicit justification.
- Did this primitive set `accessibilityRole` and accept `accessibilityLabel` (interactive case) or correctly avoid interactive a11y semantics (presentational case)?
- Is the consumer's `style` prop merged last in the style array?
- Is there a CHANGELOG entry for any decision that wasn't in the spec?

---

## Open questions

The plan is intended to be fully executable. Any open question is an explicit risk to escalate before that phase begins:

1. **Inter font weight resolution on iOS vs Web.** The default approach uses RN's automatic weight-to-family mapping when the family is `'Inter'` and `fontWeight: '500'` etc. is set. If this fails (Phase 9 visual check), switch to explicit family names (`'Inter-Medium'`) and remove `fontWeight`. Document the chosen path. **Status:** verified at Phase 9 — no escalation needed unless visual check fails.

2. **Shadow offset/blur tuning.** Phase 3 ships placeholder values; Phase 10 audits and tunes via screenshot comparison. **Status:** scheduled, no escalation needed.

3. **AvatarDuo source layout.** The exact composition (overlay, side-by-side, etc.) is read from `chilli-docs/components/ui/avatar-duo.tsx` at Phase 17 implementation. The plan assumes "primary + bottom-right secondary" as a structural default. **Status:** read source at Phase 17 task 17.1; adjust if needed.

4. **Main-app integration cadence.** Phase 21 may be externally blocked. **Status:** non-blocking per spec; deferred-to-phase-2 fallback documented.

No other unresolved questions.

---

## Self-review (post-write)

Spec coverage: every requirement from the design spec is mapped to a phase or task — foundations (Phases 2–6), platform helpers (Phase 4), fonts (Phase 5), playground (Phase 7), GlassSurface (Phase 8), primitives in priority order (Phases 9–18), assembly check (Phase 19), visual audit (Phase 20), integration check (Phase 21), README + CHANGELOG (Phase 22). Definition of Done from spec section 8 mapped to Phase 22 task 22.3.

Placeholder scan: no "TBD", "TODO", "fill in later", "implement appropriate handling" present in any task body. The few "depends on source observation" items (AvatarDuo layout, shadow offset values, font weight resolution) are either deferred-with-explicit-instruction or verified at a specific phase.

Type/name consistency: `IconComponent` defined Phase 10 task 10.1 in `primitives/Icon/Icon.types.ts`, consumed by Button (Phase 10) and IconButton (Phase 12) and re-exported from Icon's barrel (Phase 11). `ButtonVariant` reused by IconButton. `AvatarProps` reused by AvatarGroup, AvatarDuo, AvatarLabel. `tokens` import path consistent (`from '../../foundations/theme'`) across primitives. `pickStateful`, `resolveStateSlot`, `shadow` imported from `../../foundations/platform`. `GlassSurface` import path consistent (`../_internal/GlassSurface`).

