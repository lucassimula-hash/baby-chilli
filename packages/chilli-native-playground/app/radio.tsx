import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Radio, RadioGroup, Text, tokens } from 'chilli-native';

export default function RadioPlayground() {
  const [defaultValue, setDefaultValue] = useState('option1');
  const [horizontal, setHorizontal] = useState('a');
  const [text, setText] = useState('email');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (vertical group)">
        <RadioGroup value={defaultValue} onValueChange={setDefaultValue}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      </Section>

      <Section title="Sizes">
        <Row>
          <Radio size="sm" checked={false} accessibilityLabel="sm off" />
          <Radio size="sm" checked accessibilityLabel="sm on" />
          <Radio size="md" checked={false} accessibilityLabel="md off" />
          <Radio size="md" checked accessibilityLabel="md on" />
        </Row>
      </Section>

      <Section title="States">
        <Row>
          <Radio checked={false} accessibilityLabel="unchecked" />
          <Radio checked accessibilityLabel="checked" />
          <Radio disabled accessibilityLabel="disabled" />
          <Radio checked disabled accessibilityLabel="checked disabled" />
        </Row>
      </Section>

      <Section title="Horizontal group">
        <RadioGroup value={horizontal} onValueChange={setHorizontal} orientation="horizontal">
          <Radio value="a" label="Daily" />
          <Radio value="b" label="Weekly" />
          <Radio value="c" label="Monthly" />
        </RadioGroup>
      </Section>

      <Section title="With description">
        <RadioGroup value={text} onValueChange={setText}>
          <Radio
            value="email"
            label="Email notifications"
            description="Receive updates via email."
          />
          <Radio
            value="sms"
            label="SMS notifications"
            description="Receive updates via text message."
          />
          <Radio
            value="none"
            label="No notifications"
            description="You won't receive any notifications."
            disabled
          />
        </RadioGroup>
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
