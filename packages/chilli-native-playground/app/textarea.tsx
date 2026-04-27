import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Textarea, tokens } from 'chilli-native';

export default function TextareaPlayground() {
  const [value, setValue] = useState('user description');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <Textarea
          label="Label"
          placeholder="add email"
          helperText="Helper text"
          accessibilityLabel="Default textarea"
        />
      </Section>

      <Section title="States">
        <Textarea
          label="Placeholder"
          placeholder="add email"
          helperText="Helper text"
          accessibilityLabel="Placeholder textarea"
        />
        <Textarea
          label="Filled"
          value={value}
          onChangeText={setValue}
          helperText="Helper text"
          accessibilityLabel="Filled textarea"
        />
        <Textarea
          label="Error"
          value="user description"
          error="Description needs more detail."
          accessibilityLabel="Error textarea"
        />
        <Textarea
          label="Disabled"
          placeholder="add email"
          helperText="Helper text"
          disabled
          accessibilityLabel="Disabled textarea"
        />
      </Section>

      <Section title="With AI action">
        <Textarea
          label="Label"
          placeholder="add email"
          helperText="Helper text"
          actionButton={{ label: 'generate with AI', onPress: () => {} }}
          accessibilityLabel="AI textarea"
        />
        <Textarea
          label="Label"
          defaultValue="user description"
          helperText="Helper text"
          actionButton={{ label: 'generate with AI', onPress: () => {} }}
          accessibilityLabel="Filled AI textarea"
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
});
