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
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({
  avatars,
  size = 32,
  max,
  overlap,
  style,
}: AvatarGroupProps) {
  const sizeNumeric = typeof size === 'number' ? size : 32;
  const computedOverlap = overlap ?? Math.round(sizeNumeric * 0.3);
  const visible = max != null && avatars.length > max ? avatars.slice(0, max) : avatars;
  const overflow = max != null ? Math.max(0, avatars.length - max) : 0;

  return (
    <View style={[styles.row, style]}>
      {visible.map((avatar, index) => (
        <View key={index} style={{ marginLeft: index === 0 ? 0 : -computedOverlap }}>
          <Avatar {...avatar} size={size} ring />
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
