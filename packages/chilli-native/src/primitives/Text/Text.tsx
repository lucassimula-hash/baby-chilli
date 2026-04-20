import { Text as RNText, type TextProps as RNTextProps, type StyleProp, type TextStyle } from 'react-native';
import { textStyles, textColors, type TextStyleVariant } from '../../foundations/tokens';

export type TextProps = RNTextProps & {
  /** One of the pre-baked textStyles. Default: 'bodyMd'. */
  variant?: TextStyleVariant;
  /** Color override. Default: tokens.textColors.basePrimary. */
  color?: string;
  /** Horizontal alignment. */
  align?: 'left' | 'center' | 'right';
};

/**
 * Typography primitive. Wraps RN <Text> with chilli-native textStyles.
 * Always pass `style` last in your override chain — it merges over the variant style.
 */
export function Text({
  variant = 'bodyMd',
  color = textColors.basePrimary,
  align,
  style,
  children,
  ...rest
}: TextProps) {
  const variantStyle = textStyles[variant];
  const composed: StyleProp<TextStyle> = [
    variantStyle,
    { color },
    align ? { textAlign: align } : null,
    style,
  ];
  return (
    <RNText style={composed} {...rest}>
      {children}
    </RNText>
  );
}
