import { ScrollView, StyleSheet, View } from 'react-native';
import { FlagIcon, Text, tokens, type FlagCode } from 'chilli-native';

const SHOWCASE: FlagCode[] = ['FR', 'US', 'JP', 'BR', 'IN', 'CA', 'DE', 'IT', 'ZA', 'AU'];

export default function FlagIconPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (24px)">
        <Row>
          {SHOWCASE.map((code) => (
            <FlagIcon key={code} code={code} />
          ))}
        </Row>
      </Section>

      <Section title="Sizes">
        <Row>
          <FlagIcon code="FR" size={16} />
          <FlagIcon code="FR" size={24} />
          <FlagIcon code="FR" size={32} />
          <FlagIcon code="FR" size={48} />
          <FlagIcon code="FR" size={64} />
        </Row>
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

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', gap: tokens.spacing[5], alignItems: 'center', flexWrap: 'wrap' },
});
