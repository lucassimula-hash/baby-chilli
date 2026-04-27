import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, ThinkingIndicator, tokens } from 'chilli-native';

export default function ThinkingIndicatorPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <ThinkingIndicator />
      </Section>

      <Section title="Custom words">
        <ThinkingIndicator words={['Loading', 'Crunching', 'Almost there']} />
      </Section>

      <Section title="Faster cycle (1.5s)">
        <ThinkingIndicator interval={1500} />
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
  section: { gap: tokens.spacing[4], alignItems: 'flex-start' },
});
