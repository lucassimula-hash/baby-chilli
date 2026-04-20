import { ScrollView, StyleSheet, View } from 'react-native';
import { AvatarGroup, Text, tokens } from 'chilli-native';

const PEOPLE = [
  { source: { uri: 'https://i.pravatar.cc/64?img=1' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=2' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=3' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=4' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=5' } },
  { initials: 'AB' },
  { initials: 'CD' },
] as const;

export default function AvatarGroupPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Default (no max)">
        <AvatarGroup avatars={PEOPLE.slice(0, 3)} />
      </Section>

      <Section title="With max (overflow → +N)">
        <AvatarGroup avatars={PEOPLE} max={4} />
      </Section>

      <Section title="Sizes">
        <View style={styles.section}>
          {[16, 24, 32, 48].map((size) => (
            <AvatarGroup key={size} size={size} avatars={PEOPLE.slice(0, 4)} />
          ))}
        </View>
      </Section>

      <Section title="Custom overlap">
        <View style={styles.section}>
          <AvatarGroup size={40} overlap={5} avatars={PEOPLE.slice(0, 4)} />
          <AvatarGroup size={40} overlap={20} avatars={PEOPLE.slice(0, 4)} />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.section}>
          <AvatarGroup avatars={[]} />
          <AvatarGroup avatars={[{ initials: 'Solo' }]} />
          <AvatarGroup avatars={PEOPLE} max={1} />
        </View>
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
