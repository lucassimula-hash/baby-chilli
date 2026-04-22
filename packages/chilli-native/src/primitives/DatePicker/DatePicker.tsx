import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { DatePickerProps } from './DatePicker.types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

type CalendarCell = {
  day: number;
  inMonth: boolean;
  date: Date;
};

function buildCalendar(viewYear: number, viewMonth: number): CalendarCell[] {
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, inMonth: false, date: new Date(viewYear, viewMonth - 1, d) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(viewYear, viewMonth, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false, date: new Date(viewYear, viewMonth + 1, d) });
  }
  const rows = cells.length > 35 ? 6 : 5;
  return cells.slice(0, rows * 7);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function DatePicker({ value, onChange, minDate, maxDate, style }: DatePickerProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(value ?? today);
  const viewMonth = viewDate.getMonth();
  const viewYear = viewDate.getFullYear();

  const cells = buildCalendar(viewYear, viewMonth);

  const goPrev = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const goNext = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <View style={[styles.container, style]} accessibilityLabel="Date picker">
      <View style={styles.header}>
        <Text variant="bodyMd" color={tokens.textColors.basePrimary}>
          {MONTHS[viewMonth]}
        </Text>
        <View style={styles.headerNav}>
          <Pressable
            onPress={goPrev}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
            style={({ pressed }) => [
              styles.navButton,
              pressed ? styles.navButtonPressed : null,
            ]}
          >
            <ChevronLeft size={20} color={tokens.textColors.basePrimary} />
          </Pressable>
          <Pressable
            onPress={goNext}
            accessibilityRole="button"
            accessibilityLabel="Next month"
            style={({ pressed }) => [
              styles.navButton,
              pressed ? styles.navButtonPressed : null,
            ]}
          >
            <ChevronRight size={20} color={tokens.textColors.basePrimary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.weekRow}>
        {DAYS.map((day) => (
          <View key={day} style={styles.weekCell}>
            <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell, i) => {
          const todayFlag = isSameDay(cell.date, today);
          const selected = value ? isSameDay(cell.date, value) : false;
          const disabled = !cell.inMonth || isDisabled(cell.date);

          const cellBgPressed = !disabled && !selected;

          return (
            <Pressable
              key={i}
              disabled={disabled}
              onPress={() => onChange?.(cell.date)}
              accessibilityRole="button"
              accessibilityState={{ disabled, selected }}
              style={({ pressed }) => [
                styles.dayCell,
                selected ? styles.dayCellSelected : null,
                pressed && cellBgPressed ? styles.dayCellPressed : null,
              ]}
            >
              <Text
                variant="bodyMd"
                color={getDayColor(disabled, selected, todayFlag)}
              >
                {cell.day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function getDayColor(disabled: boolean, selected: boolean, today: boolean): string {
  if (disabled) return tokens.textColors.disabled;
  if (selected) return tokens.textColors.basePrimary;
  if (today) return tokens.textColors.brandPrimary;
  return tokens.textColors.basePrimary;
}

const CELL_SIZE = 40;
const NAV_BUTTON = 32;
const CONTAINER_WIDTH = 310;

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: tokens.spacing[6],
    borderRadius: tokens.radius[7],
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderWidth: 1,
    borderColor: tokens.borders.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.spacing[6],
  },
  headerNav: {
    flexDirection: 'row',
    gap: tokens.spacing[2],
  },
  navButton: {
    width: NAV_BUTTON,
    height: NAV_BUTTON,
    borderRadius: tokens.radius[4],
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonPressed: {
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: tokens.spacing[2],
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: tokens.spacing[2],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: tokens.spacing[2],
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: tokens.backgrounds.neutral.secondary.hover,
  },
  dayCellPressed: {
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
});
