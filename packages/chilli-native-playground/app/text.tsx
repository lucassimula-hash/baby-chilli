import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, tokens } from 'chilli-native';

export default function TextPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants">
        <Text variant="bodyXs">bodyXs — The quick brown fox</Text>
        <Text variant="bodySm">bodySm — The quick brown fox</Text>
        <Text variant="bodyMd">bodyMd — The quick brown fox</Text>
      </Section>

      <Section title="Colors">
        <Text>default (basePrimary)</Text>
        <Text color={tokens.textColors.baseSecondary}>baseSecondary</Text>
        <Text color={tokens.textColors.brandPrimary}>brandPrimary</Text>
        <Text color={tokens.textColors.dangerPrimary}>dangerPrimary</Text>
      </Section>

      <Section title="Alignment">
        <Text align="left">left</Text>
        <Text align="center">center</Text>
        <Text align="right">right</Text>
      </Section>

      <Section title="Edge cases">
        <Text>{Array(50).fill('Long text. ').join('')}</Text>
        <Text numberOfLines={2}>
          {Array(50).fill('Truncated to two lines. ').join('')}
        </Text>
      </Section>

      <Section title="Accessibility">
        <Text accessibilityLabel="Accessible body text">Visible label is the same as a11y label.</Text>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="bodySm" color={tokens.textColors.baseSecondary}>{title}</Text>
      <View style={styles.cases}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  cases: { gap: tokens.spacing[4] },
});
