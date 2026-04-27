import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FormTitle, Text, tokens } from 'chilli-native';

export default function FormTitlePlayground() {
  const [val, setVal] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <FormTitle placeholder="action title" value={val} onChangeText={setVal} />
      </Section>

      <Section title="States">
        <FormTitle placeholder="action title" />
        <FormTitle defaultValue="ClimateWalk" />
        <FormTitle placeholder="action title" error="add an action title to publish" />
        <FormTitle placeholder="action title" disabled />
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
