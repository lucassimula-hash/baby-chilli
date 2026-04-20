import { ScrollView, StyleSheet, View } from 'react-native';
import { Badge, Text, tokens } from 'chilli-native';

const VARIANTS = ['neutral', 'brand', 'danger', 'success', 'warning'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export default function BadgePlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Variants × Sizes">
        {VARIANTS.map((variant) => (
          <View key={variant} style={styles.row}>
            {SIZES.map((size) => (
              <Badge
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                label={`${variant} ${size}`}
              />
            ))}
          </View>
        ))}
      </Section>

      <Section title="Numeric labels">
        <View style={styles.row}>
          <Badge label={1} variant="brand" />
          <Badge label={42} variant="danger" />
          <Badge label={999} variant="success" />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.row}>
          <Badge
            label="A very long badge text that should still center its baseline"
            variant="neutral"
          />
        </View>
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Presentational primitive — no interactive a11y semantics exposed.
        </Text>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing[5],
    alignItems: 'center',
  },
});
