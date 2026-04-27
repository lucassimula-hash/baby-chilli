import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { tokens } from '../../foundations/theme';
import type { CauseChipProps, CauseChipSize } from './CauseChip.types';

type SizeConfig = {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
  lineHeight: number;
};

const SIZES: Record<CauseChipSize, SizeConfig> = {
  xs: { height: 20, paddingHorizontal: 8, paddingVertical: 2, fontSize: 12, lineHeight: 16 },
  md: { height: 24, paddingHorizontal: 8, paddingVertical: 4, fontSize: 12, lineHeight: 16 },
  lg: { height: 28, paddingHorizontal: 12, paddingVertical: 4, fontSize: 14, lineHeight: 20 },
};

export function CauseChip({
  label,
  color,
  size = 'md',
  type = 'default',
  style,
}: CauseChipProps) {
  const cfg = SIZES[size];
  const palette = tokens.causeColors[color];
  const isGlass = type === 'glass';

  return (
    <View
      style={[
        styles.chip,
        {
          height: cfg.height,
          paddingHorizontal: cfg.paddingHorizontal,
          paddingVertical: cfg.paddingVertical,
          backgroundColor: isGlass ? 'transparent' : palette.lighter,
        },
        isGlass ? { borderWidth: StyleSheet.hairlineWidth, borderColor: palette.lighter } : null,
        style,
      ]}
    >
      {isGlass ? (
        <>
          <BlurView
            intensity={20}
            tint="dark"
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, styles.blur]}
          />
          <View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, styles.blur, { backgroundColor: palette.lighter }]}
          />
        </>
      ) : null}
      <Text
        numberOfLines={1}
        style={[
          styles.label,
          { color: palette.strong, fontSize: cfg.fontSize, lineHeight: cfg.lineHeight },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
  },
  blur: {
    borderRadius: tokens.radius.full,
  },
  label: {
    fontFamily: 'Inter-Medium',
  },
});
