import { ScrollView, StyleSheet, View } from 'react-native';
import { Check, Star } from 'lucide-react-native';
import { Badge, Icon, Text, tokens } from 'chilli-native';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function BadgePlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Type × Size">
        {(['fill', 'ghost'] as const).map((type) => (
          <View key={type} style={styles.row}>
            {SIZES.map((size) => (
              <Badge key={`${type}-${size}`} type={type} size={size} label={`${type} ${size}`} />
            ))}
          </View>
        ))}
      </Section>

      <Section title="With dot">
        <View style={styles.row}>
          <Badge label="Live" dot />
          <Badge label="Pending" dot dotColor={tokens.backgrounds.warning.strong.default} />
          <Badge label="Error" dot dotColor={tokens.backgrounds.danger.strong.default} />
          <Badge label="Success" dot dotColor={tokens.backgrounds.success.strong.default} />
        </View>
      </Section>

      <Section title="With icons">
        <View style={styles.row}>
          <Badge label="Verified" leftIcon={<Icon source={Check} size={12} />} />
          <Badge label="Featured" rightIcon={<Icon source={Star} size={12} />} />
        </View>
      </Section>

      <Section title="Numeric labels">
        <View style={styles.row}>
          <Badge label={1} />
          <Badge label={42} />
          <Badge label={999} />
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
