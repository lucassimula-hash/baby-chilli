import { ScrollView, StyleSheet, View } from 'react-native';
import { AvatarLabel, Text, tokens } from 'chilli-native';

const A = { source: { uri: 'https://i.pravatar.cc/64?img=15' } };

export default function AvatarLabelPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes">
        <AvatarLabel size="sm" avatar={A} title="Alex Carter" subtitle="Climate creator" />
        <AvatarLabel size="md" avatar={A} title="Alex Carter" subtitle="Climate creator" />
        <AvatarLabel size="lg" avatar={A} title="Alex Carter" subtitle="Climate creator" />
      </Section>

      <Section title="Title only (no subtitle)">
        <AvatarLabel avatar={A} title="No subtitle here" />
      </Section>

      <Section title="Initials avatar">
        <AvatarLabel avatar={{ initials: 'JD' }} title="Jane Doe" subtitle="Supporter" />
      </Section>

      <Section title="Edge cases">
        <AvatarLabel
          avatar={A}
          title="A very long title that might wrap or get clipped depending on the available width"
          subtitle="And a long subtitle too — does it wrap nicely?"
        />
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Presentational primitive — no interactive accessibility semantics.
        </Text>
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
  section: { gap: tokens.spacing[6] },
});
