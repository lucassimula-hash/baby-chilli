import { ScrollView, StyleSheet, View } from 'react-native';
import { AvatarDuo, Text, tokens } from 'chilli-native';

const A = { source: { uri: 'https://i.pravatar.cc/64?img=8' } };
const B = { source: { uri: 'https://i.pravatar.cc/64?img=9' } };
const INITIALS = { initials: 'JD' };

export default function AvatarDuoPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes">
        <View style={styles.row}>
          {[20, 24, 32, 40, 48, 64].map((size) => (
            <AvatarDuo key={size} primary={A} secondary={B} size={size} />
          ))}
        </View>
      </Section>

      <Section title="Mixed (image + initials)">
        <View style={styles.row}>
          <AvatarDuo primary={A} secondary={INITIALS} size={64} />
          <AvatarDuo primary={INITIALS} secondary={A} size={64} />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.row}>
          <AvatarDuo primary={INITIALS} secondary={{ initials: 'AB' }} size={32} />
          <AvatarDuo primary={A} secondary={B} size={96} />
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
  section: { gap: tokens.spacing[8] },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: tokens.spacing[6] },
});
