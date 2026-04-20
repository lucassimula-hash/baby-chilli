import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type StyleProp,
  type View as ViewType,
  type ViewStyle,
} from 'react-native';
import {
  DEFAULT_GLASS_INTENSITY,
  GlassSurface,
} from '../_internal/GlassSurface';
import { pickStateful, shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { ButtonVariant } from '../Button/Button.types';
import type { IconButtonProps, IconButtonSize } from './IconButton.types';

type ButtonTokensKey =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'destructive'
  | 'destructiveSecondary';

type GlassButtonTokensKey = keyof typeof tokens.buttons.glass;

const VARIANT_TO_BUTTONS_KEY: Partial<Record<ButtonVariant, ButtonTokensKey>> = {
  primary: 'primary',
  secondary: 'secondary',
  brand: 'brand',
  danger: 'destructive',
  'danger-soft': 'destructiveSecondary',
};

const GLASS_VARIANT_TO_KEY: Partial<
  Record<ButtonVariant, GlassButtonTokensKey>
> = {
  primary: 'secondary',
  secondary: 'secondary',
  brand: 'primary',
  ghost: 'ghost',
};

const warnedUnsupportedGlassVariants = new Set<ButtonVariant>();

const SIZE_BOX: Record<IconButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const SIZE_ICON: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 20 };

function glassSupportsVariant(variant: ButtonVariant): boolean {
  return variant in GLASS_VARIANT_TO_KEY;
}

function getGhostBackground(state: {
  pressed: boolean;
  hovered?: boolean;
  focused?: boolean;
}) {
  return pickStateful(tokens.backgrounds.neutral.secondary, state);
}

function getGhostGlassBackground(state: {
  pressed: boolean;
  hovered?: boolean;
  focused?: boolean;
}) {
  return pickStateful(
    {
      default: tokens.buttons.glass.ghost.bg,
      hover: tokens.buttons.glass.ghost.bgHover,
    },
    state,
  );
}

function getGlassBackground(
  variant: Exclude<ButtonVariant, 'danger' | 'danger-soft'>,
  state: { pressed: boolean; hovered?: boolean; focused?: boolean },
) {
  if (variant === 'ghost') return getGhostGlassBackground(state);

  const glassKey = GLASS_VARIANT_TO_KEY[variant];
  if (!glassKey || glassKey === 'ghost') return getGhostGlassBackground(state);

  const glassTokens = tokens.buttons.glass[glassKey];
  return pickStateful(
    {
      default: glassTokens.bg,
      hover: glassTokens.bgHover,
      pressed: glassTokens.bgPressed,
    },
    state,
  );
}

function getIconColor(
  variant: ButtonVariant,
  isDisabled: boolean,
  isGlassActive: boolean,
) {
  if (isDisabled) return tokens.buttons.disabled.text;
  if (isGlassActive && variant === 'ghost') return tokens.buttons.glass.ghost.text;
  if (variant === 'ghost') return tokens.textColors.baseSecondary;
  const buttonsKey = VARIANT_TO_BUTTONS_KEY[variant];
  return buttonsKey ? tokens.buttons[buttonsKey].text : tokens.textColors.baseSecondary;
}

export const IconButton = forwardRef<ViewType, IconButtonProps>(function IconButton(
  {
    variant = 'primary',
    size = 'md',
    glass = false,
    loading = false,
    disabled,
    icon: IconCmp,
    accessibilityLabel,
    onPress,
    style,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const isGlassActive = glass && glassSupportsVariant(variant);

  if (
    glass &&
    !glassSupportsVariant(variant) &&
    __DEV__ &&
    !warnedUnsupportedGlassVariants.has(variant)
  ) {
    warnedUnsupportedGlassVariants.add(variant);
    console.warn(
      `[chilli-native] <IconButton glass> is not supported for variant="${variant}". Rendering as non-glass.`,
    );
  }

  const buttonsKey = VARIANT_TO_BUTTONS_KEY[variant];
  const variantTokens = buttonsKey ? tokens.buttons[buttonsKey] : null;
  const iconSize = SIZE_ICON[size];
  const iconColor = getIconColor(variant, isDisabled, isGlassActive);

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      style={(state) => {
        const composed: StyleProp<ViewStyle> = [
          styles.base,
          { width: SIZE_BOX[size], height: SIZE_BOX[size] },
          variant === 'brand' && !isDisabled ? shadow(tokens.shadows.brandModerate) : null,
        ];

        if (isDisabled) {
          composed.push({ backgroundColor: tokens.buttons.disabled.bg });
        } else if (variant === 'ghost') {
          if (!isGlassActive) {
            composed.push({ backgroundColor: getGhostBackground(state) });
          }
        } else if (!isGlassActive && variantTokens) {
          composed.push({
            backgroundColor: pickStateful(
              {
                default: variantTokens.bg,
                hover: variantTokens.bgHover,
                pressed: variantTokens.bgPressed,
              },
              state,
            ),
          });
        }

        composed.push(style);
        return composed;
      }}
      {...rest}
    >
      {(state) => (
        <>
          {isGlassActive && !isDisabled ? (
            <GlassSurface
              intensity={DEFAULT_GLASS_INTENSITY}
              tint="dark"
              borderRadius={tokens.radius.full}
              overlayColor={getGlassBackground(
                variant as Exclude<ButtonVariant, 'danger' | 'danger-soft'>,
                state,
              )}
            />
          ) : null}
          {loading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : (
            <IconCmp size={iconSize} color={iconColor} />
          )}
        </>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.full,
    overflow: 'visible',
  },
});
