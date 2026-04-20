import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar';
import { tokens } from '../../foundations/theme';

export type AvatarGroupProps = {
  avatars: readonly AvatarProps[];
  size?: AvatarSize;
  /** If provided and avatars.length > max, renders a +N tile at the end. */
  max?: number;
  /** Pixel overlap between consecutive avatars. Defaults to size * 0.3. */
  overlap?: number;
  /** Stroke color around each avatar, typically the same as the parent background. */
  strokeColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({
  avatars,
  size = 32,
  max,
  overlap,
  strokeColor = tokens.backgrounds.base,
  style,
}: AvatarGroupProps) {
  const sizeNumeric = typeof size === 'number' ? size : 32;
  const computedOverlap = overlap ?? Math.round(sizeNumeric * 0.3);
  const visible = max != null && avatars.length > max ? avatars.slice(0, max) : avatars;
  const overflow = max != null ? Math.max(0, avatars.length - max) : 0;
  const strokeWidth = sizeNumeric <= 24 ? 1 : 2;

  return (
    <View style={[styles.row, style]}>
      {visible.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index === 0 ? 0 : -computedOverlap,
            borderWidth: strokeWidth,
            borderColor: strokeColor,
            borderRadius: sizeNumeric / 2,
          }}
        >
          <Avatar {...avatar} size={size} />
        </View>
      ))}
      {overflow > 0 ? (
        <View
          style={{
            marginLeft: -computedOverlap,
            borderWidth: strokeWidth,
            borderColor: strokeColor,
            borderRadius: sizeNumeric / 2,
          }}
        >
          <Avatar
            size={size}
            initials={`+${overflow}`}
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
