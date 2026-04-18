import { useFonts } from 'expo-font';

/**
 * Font assets bundled by the design system. Mirrors the main chilli app's registration
 * pattern (`hub/src/components/custom_text/inter.tsx`): per-weight family keys
 * (`'Inter-Regular'`, `'Inter-Medium'`, `'Inter-SemiBold'`), not a generic `'Inter'`.
 *
 * Consumers (playground or main app) load these via `useLoadChilliFonts()` and gate their
 * app entry on the result.
 *
 * SF Pro Display is intentionally NOT bundled (strategy 3B from the spec): on iOS it resolves
 * via system; on web it falls back through the chain configured by `fontFamily.primary`.
 *
 * Bold is NOT in the set — the main app does not currently ship it. Adding Bold requires
 * adding it to the main app first; DO NOT fabricate.
 */
export const fontAssets = {
  'Inter-Regular': require('../../assets/fonts/Inter/Inter-Regular.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter/Inter-SemiBold.ttf'),
} as const;

/**
 * Returns `[loaded, error]` from expo-font's useFonts hook, scoped to the 3 Inter weights
 * mirrored from the main chilli app.
 */
export function useLoadChilliFonts(): [boolean, Error | null] {
  return useFonts(fontAssets);
}
