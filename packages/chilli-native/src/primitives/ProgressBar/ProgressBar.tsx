import { StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { ProgressBarProps, ProgressBarSize } from './ProgressBar.types';

const SEGMENT_HEIGHT: Record<ProgressBarSize, number> = {
  sm: 4,
  md: 6,
  lg: 8,
};

const SEGMENT_RADIUS = tokens.radius[2];

export function ProgressBar({
  value = 0,
  segments = 5,
  size = 'md',
  labelPosition = 'none',
  formatLabel,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const activeCount = Math.round((clamped / 100) * segments);
  const label = formatLabel ? formatLabel(clamped) : `${clamped}%`;
  const height = SEGMENT_HEIGHT[size];

  const bar = (
    <View style={[styles.bar, { height }]}>
      {Array.from({ length: segments }).map((_, i) => {
        const isFirst = i === 0;
        const isLast = i === segments - 1;
        const isActive = i < activeCount;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: isActive
                  ? tokens.backgrounds.brand.strong.default
                  : tokens.backgrounds.neutral.secondary.default,
                borderTopLeftRadius: isFirst ? SEGMENT_RADIUS : 0,
                borderBottomLeftRadius: isFirst ? SEGMENT_RADIUS : 0,
                borderTopRightRadius: isLast ? SEGMENT_RADIUS : 0,
                borderBottomRightRadius: isLast ? SEGMENT_RADIUS : 0,
              },
            ]}
          />
        );
      })}
    </View>
  );

  if (labelPosition === 'right') {
    return (
      <View
        style={[styles.rowContainer, style]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
      >
        {bar}
        <Text variant="bodySm" color={tokens.textColors.baseSecondary} numberOfLines={1}>
          {label}
        </Text>
      </View>
    );
  }

  if (labelPosition === 'bottom') {
    return (
      <View
        style={[styles.columnContainer, style]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
      >
        {bar}
        <Text
          variant="bodySm"
          color={tokens.textColors.baseSecondary}
          style={styles.labelRight}
        >
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.barOnly, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
    >
      {bar}
    </View>
  );
}

const styles = StyleSheet.create({
  barOnly: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[5],
    width: '100%',
  },
  columnContainer: {
    flexDirection: 'column',
    gap: tokens.spacing[4],
    width: '100%',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    height: '100%',
    minWidth: 0,
  },
  labelRight: {
    textAlign: 'right',
  },
});
