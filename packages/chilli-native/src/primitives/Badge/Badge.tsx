import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';

export type BadgeVariant = 'neutral' | 'brand' | 'danger' | 'success' | 'warning';
export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeProps = {
  label: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
};

const SIZE_HEIGHT: Record<BadgeSize, number> = { sm: 20, md: 24, lg: 28 };
const SIZE_PADDING: Record<BadgeSize, number> = { sm: 6, md: 8, lg: 8 };
const SIZE_RADIUS: Record<BadgeSize, number> = { sm: 4, md: 6, lg: 8 };

const VARIANT_BG: Record<BadgeVariant, string> = {
  neutral: tokens.backgrounds.neutral.secondary.default,
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

export function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  style,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        {
          height: SIZE_HEIGHT[size],
          paddingHorizontal: SIZE_PADDING[size],
          borderRadius: SIZE_RADIUS[size],
          backgroundColor: VARIANT_BG[variant],
          borderWidth: tokens.borderWidth[2],
          borderColor: tokens.borders.default,
        },
        style,
      ]}
    >
      <Text variant="bodyXs" color={VARIANT_TEXT[variant]}>
        {String(label)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
