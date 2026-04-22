import { forwardRef, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type View as ViewType,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { SocialButtonProps, SocialButtonVariant, SocialProvider } from './SocialButton.types';

type ProviderConfig = {
  defaultVariant: SocialButtonVariant;
  defaultLabel: string;
};

const PROVIDER_CONFIG: Record<SocialProvider, ProviderConfig> = {
  apple: { defaultVariant: 'primary', defaultLabel: 'Sign in with Apple' },
  google: { defaultVariant: 'secondary', defaultLabel: 'Sign in with Google' },
  facebook: { defaultVariant: 'secondary', defaultLabel: 'Sign in with Facebook' },
  'apple-pay': { defaultVariant: 'primary', defaultLabel: 'Pay with Apple Pay' },
};

function resolveColors(variant: SocialButtonVariant, disabled: boolean) {
  if (disabled) {
    return {
      bg: tokens.backgrounds.disabled,
      text: tokens.textColors.disabled,
    };
  }
  if (variant === 'primary') {
    return {
      bg: tokens.backgrounds.neutral.inverse.default,
      text: tokens.textColors.baseAlternate,
    };
  }
  return {
    bg: tokens.backgrounds.neutral.secondary.default,
    text: tokens.textColors.basePrimary,
  };
}

function ProviderIcon({ provider, color }: { provider: SocialProvider; color: string }) {
  if (provider === 'apple' || provider === 'apple-pay') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
          fill={color}
        />
      </Svg>
    );
  }
  if (provider === 'google') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <Path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <Path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <Path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </Svg>
    );
  }
  // facebook
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </Svg>
  );
}

export const SocialButton = forwardRef<ViewType, SocialButtonProps>(function SocialButton(
  { provider, variant: variantProp, label: labelProp, disabled = false, style, onPress, ...rest },
  ref,
) {
  const config = PROVIDER_CONFIG[provider];
  const variant = variantProp ?? config.defaultVariant;
  const label = labelProp ?? config.defaultLabel;
  const colors = resolveColors(variant, disabled);

  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 40 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        ref={ref}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        style={[styles.button, { backgroundColor: colors.bg }]}
        {...rest}
      >
        <View style={styles.iconWrap}>
          <ProviderIcon provider={provider} color={colors.text} />
        </View>
        <Text variant="bodyMd" color={colors.text} style={styles.label}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[4],
    height: 48,
    width: '100%',
    paddingHorizontal: tokens.spacing[5],
    borderRadius: tokens.radius.full,
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter-Medium',
  },
});
