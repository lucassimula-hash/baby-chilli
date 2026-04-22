import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NumberInput, Text, tokens } from 'chilli-native';

export default function NumberInputPlayground() {
  const [val, setVal] = useState('');
  const [val4, setVal4] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (6 cells)">
        <NumberInput value={val} onChange={setVal} />
      </Section>

      <Section title="States">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Default
        </Text>
        <NumberInput value="" onChange={() => {}} />

        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Filled
        </Text>
        <NumberInput value="333333" onChange={() => {}} />

        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Error
        </Text>
        <NumberInput value="333333" error onChange={() => {}} />

        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Disabled
        </Text>
        <NumberInput value="" disabled onChange={() => {}} />
      </Section>

      <Section title="Lengths">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          4 digits
        </Text>
        <NumberInput value={val4} onChange={setVal4} length={4} />

        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          6 digits (default)
        </Text>
        <NumberInput value={val} onChange={setVal} length={6} />
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
});
