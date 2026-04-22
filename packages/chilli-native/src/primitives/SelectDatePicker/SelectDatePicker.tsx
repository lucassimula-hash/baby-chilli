import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { shadow } from '../../foundations/platform';
import { tokens } from '../../foundations/theme';
import type { SelectDatePickerProps } from './SelectDatePicker.types';

function DateTimePill({ value, selected }: { value: string; selected: boolean }) {
  return (
    <View
      style={[
        styles.pill,
        selected ? styles.pillSelected : styles.pillDefault,
      ]}
    >
      <Text
        variant="bodySm"
        color={selected ? tokens.textColors.selected : tokens.textColors.basePrimary}
      >
        {value}
      </Text>
    </View>
  );
}

export function SelectDatePicker({
  startDate = 'nov 12, 2025',
  startTime = '5:30PM',
  endDate = 'nov 17, 2025',
  endTime,
  helperText,
  showHelperText = false,
  focused = false,
  onPress,
  style,
  accessibilityLabel,
}: SelectDatePickerProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? 'Select date'}
        style={[
          styles.container,
          focused
            ? [
                shadow(tokens.shadows.brandModerate),
                {
                  borderColor: tokens.borders.brand.default,
                },
              ]
            : {
                borderColor: tokens.borders.default,
                backgroundColor: tokens.backgrounds.neutral.secondary.default,
              },
        ]}
      >
        <View style={styles.row}>
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
                start
              </Text>
              <View style={styles.pillRow}>
                <DateTimePill value={startDate} selected={focused} />
                {startTime ? <DateTimePill value={startTime} selected={focused} /> : null}
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.sectionEnd}>
              <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
                end
              </Text>
              <View style={styles.pillRow}>
                <DateTimePill value={endDate} selected={false} />
                {endTime ? <DateTimePill value={endTime} selected={false} /> : null}
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      {showHelperText && helperText ? (
        <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 343,
    gap: tokens.spacing[4],
  },
  container: {
    width: '100%',
    borderRadius: tokens.radius[7],
    borderWidth: 1,
    overflow: 'hidden',
    padding: tokens.spacing[5],
  },
  row: {
    flexDirection: 'row',
    gap: tokens.spacing[5],
    alignItems: 'stretch',
  },
  timeline: {
    width: 8,
    alignItems: 'center',
    paddingVertical: tokens.spacing[7],
    gap: tokens.spacing[2],
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: tokens.textColors.baseSecondary,
    backgroundColor: 'transparent',
  },
  timelineLine: {
    flex: 1,
    minHeight: 48,
    width: 0,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderLeftColor: tokens.textColors.baseSecondary,
  },
  content: {
    flex: 1,
    minWidth: 0,
    gap: tokens.spacing[4],
  },
  section: {
    paddingBottom: tokens.spacing[4],
    gap: tokens.spacing[2],
  },
  sectionEnd: {
    gap: tokens.spacing[2],
  },
  divider: {
    height: 1,
    backgroundColor: tokens.borders.default,
    width: '100%',
  },
  pillRow: {
    flexDirection: 'row',
    gap: tokens.spacing[3],
    alignItems: 'flex-start',
  },
  pill: {
    paddingHorizontal: tokens.spacing[5],
    paddingVertical: tokens.spacing[2],
    borderRadius: tokens.radius.full,
    alignSelf: 'flex-start',
  },
  pillDefault: {
    backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
  },
  pillSelected: {
    backgroundColor: tokens.backgrounds.neutral.opacity.lighter,
    borderWidth: 0.5,
    borderColor: '#a6a6a6',
  },
});
