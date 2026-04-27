import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ProgressBar, Text, tokens } from 'chilli-native';

export default function ProgressBarPlayground() {
  const [value, setValue] = useState(40);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (5 segments, md)">
        <View style={styles.stack}>
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <ProgressBar key={v} value={v} />
          ))}
        </View>
      </Section>

      <Section title="Sizes">
        <View style={styles.stack}>
          <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
            Small (4px)
          </Text>
          <ProgressBar value={60} size="sm" />
          <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
            Medium (6px)
          </Text>
          <ProgressBar value={60} size="md" />
          <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
            Large (8px)
          </Text>
          <ProgressBar value={60} size="lg" />
        </View>
      </Section>

      <Section title="With label (right)">
        <View style={styles.stack}>
          <ProgressBar value={20} labelPosition="right" />
          <ProgressBar value={60} labelPosition="right" />
          <ProgressBar value={100} labelPosition="right" />
        </View>
      </Section>

      <Section title="With label (bottom)">
        <View style={styles.stack}>
          <ProgressBar value={40} labelPosition="bottom" />
          <ProgressBar value={80} labelPosition="bottom" />
        </View>
      </Section>

      <Section title="Interactive (tap to change)">
        <ProgressBar value={value} labelPosition="right" />
        <View style={styles.row}>
          {[0, 20, 40, 60, 80, 100].map((v) => (
            <Pressable key={v} onPress={() => setValue(v)} style={styles.chip}>
              <Text variant="bodySm" color={tokens.textColors.basePrimary}>
                {v}
              </Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <Section title="Custom segments + formatLabel">
        <View style={styles.stack}>
          <ProgressBar value={40} segments={4} labelPosition="right" formatLabel={(v) => `${Math.round((v / 100) * 4)}/4`} />
          <ProgressBar value={75} segments={8} labelPosition="right" formatLabel={(v) => `${Math.round((v / 100) * 8)}/8`} />
        </View>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  stack: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', gap: tokens.spacing[3], flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.backgrounds.neutral.secondary.default,
  },
});
