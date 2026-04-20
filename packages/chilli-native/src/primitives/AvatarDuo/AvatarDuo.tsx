import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar';
import { tokens } from '../../foundations/theme';

export type AvatarDuoProps = {
  primary: AvatarProps;
  secondary: AvatarProps;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
};

function getInnerSize(size: number): number {
  switch (size) {
    case 20:
      return 16;
    case 24:
      return 18;
    case 32:
      return 24;
    case 40:
      return 32;
    case 48:
      return 40;
    case 64:
      return 48;
    default:
      return Math.round(size * 0.8);
  }
}

function getBorderWidth(size: number): number {
  if (size <= 20) return 0.5;
  if (size <= 40) return 1;
  return 1;
}

// Layout mirrors the web source: primary avatar top-left, secondary avatar bottom-right, both inset inside a square frame.
export function AvatarDuo({ primary, secondary, size = 40, style }: AvatarDuoProps) {
  const containerSize = typeof size === 'number' ? size : 40;
  const innerSize = getInnerSize(containerSize);
  const borderWidth = getBorderWidth(containerSize);

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }, style]}>
      <View
        style={[
          styles.inner,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            borderWidth,
          },
        ]}
      >
        <Avatar {...secondary} size={innerSize} />
      </View>
      <View
        style={[
          styles.inner,
          styles.primary,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            borderWidth,
          },
        ]}
      >
        <Avatar {...primary} size={innerSize} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0,
  },
  inner: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderColor: tokens.borders.base,
  },
  primary: {
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
