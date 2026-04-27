import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';

export type BadgeType = 'fill' | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeProps = {
  label: string | number;
  type?: BadgeType;
  size?: BadgeSize;
  /** Renders a colored 6 px round dot before the label. */
  dot?: boolean;
  /** Color for the dot. Defaults to brand strong. */
  dotColor?: string;
  /** Optional 12 px element rendered before the label (icon component or node). */
  leftIcon?: ReactNode;
  /** Optional 12 px element rendered after the label. */
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type SizeConfig = {
  height: number;
  paddingHorizontal: number;
  radius: number;
  fontSize: number;
  lineHeight: number;
  gap: number;
};

const SIZES: Record<BadgeSize, SizeConfig> = {
  sm: { height: 20, paddingHorizontal: 6, radius: 4, fontSize: 12, lineHeight: 16, gap: 2 },
  md: { height: 24, paddingHorizontal: 8, radius: 6, fontSize: 12, lineHeight: 16, gap: 4 },
  lg: { height: 28, paddingHorizontal: 8, radius: 8, fontSize: 14, lineHeight: 20, gap: 4 },
};

export function Badge({
  label,
  type = 'fill',
  size = 'sm',
  dot,
  dotColor,
  leftIcon,
  rightIcon,
  style,
}: BadgeProps) {
  const cfg = SIZES[size];

  return (
    <View
      style={[
        styles.base,
        {
          height: cfg.height,
          paddingHorizontal: cfg.paddingHorizontal,
          borderRadius: cfg.radius,
          backgroundColor:
            type === 'fill' ? tokens.backgrounds.neutral.secondary.default : 'transparent',
          gap: cfg.gap,
        },
        style,
      ]}
    >
      {leftIcon ? <View style={styles.iconSlot}>{leftIcon}</View> : null}
      {dot ? (
        <View
          style={[
            styles.dot,
            { backgroundColor: dotColor ?? tokens.backgrounds.brand.strong.default },
          ]}
        />
      ) : null}
      <Text
        color={tokens.textColors.basePrimary}
        style={{ fontSize: cfg.fontSize, lineHeight: cfg.lineHeight, fontFamily: 'Inter-Medium' }}
      >
        {String(label)}
      </Text>
      {rightIcon ? <View style={styles.iconSlot}>{rightIcon}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: tokens.borders.default,
  },
  iconSlot: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
