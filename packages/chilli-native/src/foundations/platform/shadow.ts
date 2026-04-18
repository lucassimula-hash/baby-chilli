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
