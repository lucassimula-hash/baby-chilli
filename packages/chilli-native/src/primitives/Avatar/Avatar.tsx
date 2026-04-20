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
  const initialsFontSize = pickInitialsFontSize(size);

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
          style={{
            fontSize: initialsFontSize,
            lineHeight: initialsFontSize * 1.2,
          }}
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
