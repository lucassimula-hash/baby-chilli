import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '../../foundations/theme';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioGroupProps } from './Radio.types';

export function RadioGroup({
  value,
  onValueChange,
  orientation = 'vertical',
  children,
  style,
}: RadioGroupProps) {
  const ctxValue = useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

  return (
    <RadioGroupContext.Provider value={ctxValue}>
      <View
        accessibilityRole="radiogroup"
        style={[
          orientation === 'vertical' ? styles.vertical : styles.horizontal,
          style,
        ]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    gap: tokens.spacing[5],
  },
  horizontal: {
    flexDirection: 'row',
    gap: tokens.spacing[6],
    flexWrap: 'wrap',
  },
});
