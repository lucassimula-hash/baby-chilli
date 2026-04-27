import { ScrollView, StyleSheet, View } from 'react-native';
import { ActionTextarea, Text, tokens } from 'chilli-native';

export default function ActionTextareaPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <ActionTextarea placeholder="tap to add" />
      </Section>

      <Section title="States">
        <ActionTextarea placeholder="tap to add" />
        <ActionTextarea defaultValue="user description" />
        <ActionTextarea defaultValue="user description" error />
        <ActionTextarea placeholder="tap to add" disabled />
      </Section>

      <Section title="Glass">
        <ActionTextarea placeholder="tap to add" glass />
        <ActionTextarea defaultValue="user description" glass />
        <ActionTextarea defaultValue="user description" glass error />
        <ActionTextarea placeholder="tap to add" glass disabled />
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
