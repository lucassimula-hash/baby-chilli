import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Toggle, tokens } from 'chilli-native';

export default function TogglePlayground() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  const [d, setD] = useState(true);
  const [e, setE] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes">
        <Row>
          <Toggle size="sm" checked={a} onCheckedChange={setA} accessibilityLabel="sm off" />
          <Toggle size="sm" checked={b} onCheckedChange={setB} accessibilityLabel="sm on" />
          <Toggle size="md" checked={c} onCheckedChange={setC} accessibilityLabel="md off" />
          <Toggle size="md" checked={d} onCheckedChange={setD} accessibilityLabel="md on" />
        </Row>
      </Section>

      <Section title="With label">
        <Toggle
          size="md"
          checked={e}
          onCheckedChange={setE}
          label="Notifications"
          description="Receive push alerts when someone interacts with your campaign."
        />
      </Section>

      <Section title="Disabled">
        <Row>
          <Toggle size="md" checked={false} disabled label="Off" />
          <Toggle size="md" checked={true} disabled label="On" />
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
  row: { flexDirection: 'row', gap: tokens.spacing[6], flexWrap: 'wrap', alignItems: 'center' },
});
