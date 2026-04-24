import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { NumberInputProps } from './NumberInput.types';

type CellState = 'default' | 'focused' | 'filled' | 'error' | 'disabled';

function getCellState(
  digit: string | undefined,
  isFocused: boolean,
  error: boolean,
  disabled: boolean,
): CellState {
  if (disabled) return 'disabled';
  if (error && digit) return 'error';
  if (isFocused) return 'focused';
  if (digit) return 'filled';
  return 'default';
}

export function NumberInput({
  value = '',
  onChange,
  length = 4,
  error = false,
  disabled = false,
  style,
  accessibilityLabel,
}: NumberInputProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const sanitized = value.replace(/\D/g, '').slice(0, length);
  const digits = sanitized.split('');

  const focusCell = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, text: string) => {
    if (disabled) return;
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length === 0) return;

    if (cleaned.length > 1) {
      // Treat as paste — distribute starting at this index.
      const next = (sanitized.slice(0, index) + cleaned).slice(0, length);
      onChange?.(next);
      const cursor = Math.min(next.length, length - 1);
      requestAnimationFrame(() => focusCell(cursor));
      return;
    }

    const char = cleaned.slice(-1);
    const arr = digits.slice();
    while (arr.length <= index) arr.push('');
    arr[index] = char;
    onChange?.(arr.join(''));

    if (index < length - 1) {
      requestAnimationFrame(() => focusCell(index + 1));
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (disabled) return;
    if (event.nativeEvent.key !== 'Backspace') return;
    const arr = digits.slice();
    if (arr[index]) {
      arr[index] = '';
      onChange?.(arr.join(''));
    } else if (index > 0) {
      arr[index - 1] = '';
      onChange?.(arr.join(''));
      requestAnimationFrame(() => focusCell(index - 1));
    }
  };

  return (
    <View style={[styles.row, style]} accessibilityLabel={accessibilityLabel}>
      {Array.from({ length }).map((_, i) => {
        const digit = digits[i];
        const isFocused = focusedIndex === i;
        const state = getCellState(digit, isFocused, error, disabled);
        return (
          <Cell
            key={i}
            state={state}
            digit={digit}
            isFocused={isFocused}
            onPress={() => !disabled && focusCell(i)}
          >
            <TextInput
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={digit ?? ''}
              keyboardType="number-pad"
              inputMode="numeric"
              maxLength={2}
              editable={!disabled}
              caretHidden
              selectTextOnFocus
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex((current) => (current === i ? null : current))}
              onChangeText={(text) => handleChange(i, text)}
              onKeyPress={(event) => handleKeyPress(i, event)}
              style={styles.hiddenInput}
              accessibilityLabel={`Digit ${i + 1}`}
            />
          </Cell>
        );
      })}
    </View>
  );
}

type CellProps = {
  state: CellState;
  digit: string | undefined;
  isFocused: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

function Cell({ state, digit, isFocused, onPress, children }: CellProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isFocused || digit) {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [isFocused, digit, pulse]);

  const visualStyle = getCellVisualStyle(state);
  const textColor = getCellTextColor(state);

  return (
    <Pressable onPress={onPress} style={styles.cellWrapper}>
      <View style={[styles.cell, visualStyle]}>
        {digit ? (
          <Text variant="bodyMd" color={textColor} style={styles.digit}>
            {digit}
          </Text>
        ) : (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: isFocused
                  ? tokens.textColors.basePrimary
                  : tokens.textColors.baseSecondary,
                opacity: isFocused ? pulse : 1,
              },
            ]}
          />
        )}
      </View>
      {children}
    </Pressable>
  );
}

function getCellVisualStyle(state: CellState) {
  switch (state) {
    case 'focused':
      return [
        shadow(tokens.shadows.brandModerate),
        {
          backgroundColor: tokens.backgrounds.neutral.secondary.default,
          borderColor: tokens.borders.brand.default,
        },
      ];
    case 'disabled':
      return {
        backgroundColor: tokens.backgrounds.disabled,
        borderColor: tokens.borders.disabled,
        opacity: 0.5,
      };
    case 'filled':
    case 'error':
    case 'default':
    default:
      return {
        backgroundColor: tokens.backgrounds.neutral.secondary.default,
        borderColor: tokens.borders.default,
      };
  }
}

function getCellTextColor(state: CellState) {
  if (state === 'error') return tokens.textColors.dangerPrimary;
  if (state === 'disabled') return tokens.textColors.baseDisabled;
  return tokens.textColors.basePrimary;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
  },
  cellWrapper: {
    position: 'relative',
    width: 34,
    height: 56,
  },
  cell: {
    width: '100%',
    height: '100%',
    borderRadius: tokens.radius[5],
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing[4],
  },
  digit: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -1,
    textAlign: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    color: 'transparent',
    fontSize: 24,
    textAlign: 'center',
  },
});
