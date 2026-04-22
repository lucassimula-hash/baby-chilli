import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { ActionInput, Text, tokens } from 'chilli-native';

export default function ActionInputPlayground() {
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default">
        <ActionInput
          label="Label"
          placeholder="placeholder"
          helperText="helper text"
          leftIcon={MapPin}
          value={val}
          onChangeText={setVal}
        />
      </Section>

      <Section title="States">
        <ActionInput label="Placeholder" placeholder="placeholder" helperText="helper text" leftIcon={MapPin} />
        <ActionInput label="Filled" defaultValue="user text" helperText="helper text" leftIcon={MapPin} />
        <ActionInput label="Error" defaultValue="user text" error="helper text" leftIcon={MapPin} />
        <ActionInput label="Disabled" defaultValue="user text" helperText="helper text" leftIcon={MapPin} disabled />
      </Section>

      <Section title="With toggle">
        <ActionInput
          label="Label"
          placeholder="placeholder"
          helperText="helper text"
          leftIcon={MapPin}
          showToggle
          toggleChecked={toggle}
          onToggleChange={setToggle}
        />
      </Section>

      <Section title="With avatar">
        <ActionInput
          label="Label"
          placeholder="placeholder"
          helperText="helper text"
          showAvatar
          avatarSrc={{ uri: 'https://i.pravatar.cc/40?u=1' }}
        />
        <ActionInput
          label="Label"
          defaultValue="user text"
          helperText="helper text"
          showAvatar
          avatarSrc={{ uri: 'https://i.pravatar.cc/40?u=1' }}
        />
      </Section>

      <Section title="No right icon">
        <ActionInput
          label="Label"
          placeholder="placeholder"
          leftIcon={MapPin}
          rightIcon={null}
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
