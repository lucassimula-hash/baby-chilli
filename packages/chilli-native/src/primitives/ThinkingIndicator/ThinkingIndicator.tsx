import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { ThinkingIndicatorProps } from './ThinkingIndicator.types';

// Each frame is 26 numbers ordered as: M(2) + C(6) + C(6) + C(6) + C(6).
// All four frames share that exact structure, so we can lerp pair-wise.
const KEYFRAMES: number[][] = [
  // circleA
  [12, 8, 14.21, 8, 16, 9.79, 16, 12, 16, 14.21, 14.21, 16, 12, 16, 9.79, 16, 8, 14.21, 8, 12, 8, 9.79, 9.79, 8, 12, 8],
  // infinity
  [12, 12, 14, 8.5, 19, 8.5, 19, 12, 19, 15.5, 14, 15.5, 12, 12, 10, 8.5, 5, 8.5, 5, 12, 5, 15.5, 10, 15.5, 12, 12],
  // circleB
  [12, 16, 14.21, 16, 16, 14.21, 16, 12, 16, 9.79, 14.21, 8, 12, 8, 9.79, 8, 8, 9.79, 8, 12, 8, 14.21, 9.79, 16, 12, 16],
  // infinity (same as frame 1, returning to circleA next)
  [12, 12, 14, 8.5, 19, 8.5, 19, 12, 19, 15.5, 14, 15.5, 12, 12, 10, 8.5, 5, 8.5, 5, 12, 5, 15.5, 10, 15.5, 12, 12],
];

const PATH_DURATION_MS = 6000;
const TEXT_HEIGHT = 18;

const DEFAULT_WORDS = ['Thinking', 'Moonwalking', 'Planning', 'Refining'];

function formatPath(n: number[]): string {
  return (
    `M ${n[0]} ${n[1]} ` +
    `C ${n[2]} ${n[3]} ${n[4]} ${n[5]} ${n[6]} ${n[7]} ` +
    `C ${n[8]} ${n[9]} ${n[10]} ${n[11]} ${n[12]} ${n[13]} ` +
    `C ${n[14]} ${n[15]} ${n[16]} ${n[17]} ${n[18]} ${n[19]} ` +
    `C ${n[20]} ${n[21]} ${n[22]} ${n[23]} ${n[24]} ${n[25]} Z`
  );
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(from: number[], to: number[], t: number): number[] {
  const out = new Array(from.length);
  for (let i = 0; i < from.length; i++) {
    out[i] = from[i] + (to[i] - from[i]) * t;
  }
  return out;
}

export function ThinkingIndicator({
  words = DEFAULT_WORDS,
  interval = 4000,
  style,
}: ThinkingIndicatorProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const pathRef = useRef<Path>(null);
  const progress = useRef(new Animated.Value(0)).current;

  // Cycle word
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Continuously animate the path via setNativeProps (no React re-render).
  useEffect(() => {
    const sub = progress.addListener(({ value }) => {
      const v = value % 1; // wrap into [0,1)
      const scaled = v * KEYFRAMES.length;
      const segment = Math.floor(scaled) % KEYFRAMES.length;
      const next = (segment + 1) % KEYFRAMES.length;
      const localT = easeInOut(scaled - Math.floor(scaled));
      const blended = lerp(KEYFRAMES[segment], KEYFRAMES[next], localT);
      pathRef.current?.setNativeProps({ d: formatPath(blended) });
    });

    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: PATH_DURATION_MS,
        useNativeDriver: true,
      }),
    );
    loop.start();

    return () => {
      progress.removeListener(sub);
      loop.stop();
    };
  }, [progress]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={words[wordIndex]}
      style={[styles.row, style]}
    >
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path
          ref={pathRef}
          d={formatPath(KEYFRAMES[0])}
          stroke={tokens.textColors.baseSecondary}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      <View style={styles.textWrap}>
        <Text variant="bodySm" style={styles.spacer}>
          {longest}
        </Text>
        <SwapLabel value={words[wordIndex]} />
      </View>
    </View>
  );
}

function SwapLabel({ value }: { value: string }) {
  const [outgoing, setOutgoing] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string>(value);

  useEffect(() => {
    if (value !== previous) {
      setOutgoing(previous);
      setPrevious(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <SlidingText key={`in-${value}`} text={value} direction="in" />
      {outgoing ? (
        <SlidingText
          key={`out-${outgoing}`}
          text={outgoing}
          direction="out"
          onDone={() => setOutgoing(null)}
        />
      ) : null}
    </>
  );
}

function SlidingText({
  text,
  direction,
  onDone,
}: {
  text: string;
  direction: 'in' | 'out';
  onDone?: () => void;
}) {
  const translateY = useRef(new Animated.Value(direction === 'in' ? TEXT_HEIGHT * 0.8 : 0)).current;
  const opacity = useRef(new Animated.Value(direction === 'in' ? 0 : 1)).current;

  useEffect(() => {
    if (direction === 'in') {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 240, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -TEXT_HEIGHT * 0.8,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start(() => onDone?.());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.absoluteText, { opacity, transform: [{ translateY }] }]}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary} style={styles.label}>
        {text}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[5],
    paddingVertical: tokens.spacing[4],
  },
  textWrap: {
    position: 'relative',
    height: TEXT_HEIGHT,
    overflow: 'hidden',
  },
  spacer: {
    opacity: 0,
    fontFamily: 'Inter-Medium',
    fontSize: 13,
  },
  absoluteText: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
  },
});
