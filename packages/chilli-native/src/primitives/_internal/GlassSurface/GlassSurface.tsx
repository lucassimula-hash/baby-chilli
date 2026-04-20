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
        StyleSheet.absoluteFill,
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
