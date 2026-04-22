import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox, Text, tokens } from 'chilli-native';

export default function CheckboxPlayground() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <Row>
          <Checkbox checked={a} onCheckedChange={setA} accessibilityLabel="off" />
          <Checkbox checked={b} onCheckedChange={setB} accessibilityLabel="on" />
          <Checkbox indeterminate accessibilityLabel="indeterminate" />
          <Checkbox number={1} accessibilityLabel="number 1" />
          <Checkbox number={3} accessibilityLabel="number 3" />
        </Row>
      </Section>

      <Section title="Sizes">
        <Row>
          <Checkbox size="sm" />
          <Checkbox size="sm" checked />
          <Checkbox size="sm" number={1} />
          <Checkbox size="md" />
          <Checkbox size="md" checked />
          <Checkbox size="md" number={1} />
        </Row>
      </Section>

      <Section title="States">
        <Row>
          <Checkbox checked={false} />
          <Checkbox checked />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox checked disabled />
        </Row>
      </Section>

      <Section title="With description">
        <Checkbox
          checked={c1}
          onCheckedChange={setC1}
          label="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
        />
        <Checkbox
          checked={c2}
          onCheckedChange={setC2}
          label="Enable notifications"
          description="Receive email notifications for new activity."
        />
        <Checkbox
          checked={c3}
          onCheckedChange={setC3}
          label="Disabled option"
          description="This option is not available."
          disabled
        />
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
