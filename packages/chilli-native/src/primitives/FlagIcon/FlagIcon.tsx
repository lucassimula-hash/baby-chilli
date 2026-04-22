import { Image, StyleSheet, View } from 'react-native';
import { tokens } from '../../foundations/theme';
import { FLAG_URLS } from './flags.generated';
import type { FlagIconProps } from './FlagIcon.types';

export function FlagIcon({ code, size = 24, accessibilityLabel, style }: FlagIconProps) {
  const url = FLAG_URLS[code];

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Image
        source={{ uri: url }}
        accessibilityLabel={accessibilityLabel ?? `${code} flag`}
        accessibilityIgnoresInvertColors
        style={[styles.image, { width: size, height: size }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: tokens.backgrounds.neutral.tertiary.default,
  },
  image: {
    resizeMode: 'cover',
  },
});
