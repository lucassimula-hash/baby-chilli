import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Avatar, type AvatarProps, type AvatarSize } from '../Avatar';
import { tokens } from '../../foundations/theme';

export type AvatarGroupProps = {
  avatars: readonly AvatarProps[];
  size?: AvatarSize;
  /** If provided and avatars.length > max, renders a +N tile at the end. */
  max?: number;
  /** Pixel overlap between consecutive avatars. Defaults to size * 0.5. */
  overlap?: number;
  /** Stroke color around each avatar, typically the same as the parent background. */
  strokeColor?: string;
  /** When true, appends a round "+" button after the avatar stack. */
  showAddButton?: boolean;
  /** Called when the add button is pressed. */
  onAddPress?: () => void;
  /** a11y label for the add button. Defaults to "Add avatar". */
  addButtonAccessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function AvatarGroup({
  avatars,
  size = 32,
  max,
  overlap,
  strokeColor = tokens.borders.base,
  showAddButton = false,
  onAddPress,
  addButtonAccessibilityLabel = 'Add avatar',
  style,
}: AvatarGroupProps) {
  const sizeNumeric = typeof size === 'number' ? size : 32;
  const computedOverlap = overlap ?? Math.round(sizeNumeric * 0.5);
  const visible = max != null && avatars.length > max ? avatars.slice(0, max) : avatars;
  const overflow = max != null ? Math.max(0, avatars.length - max) : 0;
  const strokeWidth = sizeNumeric <= 24 ? 1 : sizeNumeric >= 64 ? 2.5 : 2;
  const actionIconSize = sizeNumeric <= 24 ? 12 : sizeNumeric <= 32 ? 16 : 20;
  const gapBetweenStackAndAction = sizeNumeric <= 32 ? tokens.spacing[2] : tokens.spacing[4];

  return (
    <View
      style={[
        styles.row,
        showAddButton ? { gap: gapBetweenStackAndAction } : null,
        style,
      ]}
    >
      <View style={styles.row}>
        {visible.map((avatar, index) => (
          <View
            key={index}
            style={{
              marginLeft: index === 0 ? 0 : -computedOverlap,
              borderWidth: strokeWidth,
              borderColor: strokeColor,
              borderRadius: sizeNumeric / 2,
              zIndex: visible.length - index + (overflow > 0 ? 1 : 0),
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
              zIndex: 0,
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
      {showAddButton ? (
        <Pressable
          onPress={onAddPress}
          accessibilityRole="button"
          accessibilityLabel={addButtonAccessibilityLabel}
          style={({ pressed }) => [
            styles.addButton,
            {
              width: sizeNumeric,
              height: sizeNumeric,
              borderRadius: sizeNumeric / 2,
              backgroundColor: pressed
                ? tokens.backgrounds.neutral.primary.default
                : tokens.backgrounds.neutral.secondary.default,
            },
          ]}
        >
          <Plus size={actionIconSize} color={tokens.textColors.basePrimary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
