import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, AvatarDuo, AvatarGroup, AvatarLabel, Text, tokens } from 'chilli-native';

const SIZES = [16, 20, 24, 32, 40, 48, 56, 64] as const;
const FAKE_AVATAR = { uri: 'https://i.pravatar.cc/128?img=20' };
const BAD_URI = { uri: 'https://invalid.example.com/missing.png' };

export default function AvatarPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Sizes (with image)">
        <View style={styles.row}>
          {SIZES.map((size) => (
            <Avatar key={size} size={size} source={FAKE_AVATAR} />
          ))}
        </View>
      </Section>

      <Section title="Sizes (initials fallback)">
        <View style={styles.row}>
          {SIZES.map((size) => (
            <Avatar key={size} size={size} initials="AC" />
          ))}
        </View>
      </Section>

      <Section title="Ring (overlap-friendly)">
        <View style={styles.row}>
          <Avatar size={48} source={FAKE_AVATAR} ring />
          <Avatar size={48} initials="JD" ring />
        </View>
      </Section>

      <Section title="Custom background (initials)">
        <View style={styles.row}>
          <Avatar
            size={48}
            initials="LS"
            backgroundColor={tokens.backgrounds.brand.strong.default}
          />
          <Avatar
            size={48}
            initials="MK"
            backgroundColor={tokens.backgrounds.danger.strong.default}
          />
        </View>
      </Section>

      <Section title="Edge cases">
        <View style={styles.row}>
          <Avatar size={48} initials="" />
          <Avatar size={48} initials="VeryLongName" />
          <Avatar size={48} source={BAD_URI} initials="FB" />
        </View>
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          {
            'Above: empty initials (renders empty), long name (truncated to 2), broken image URL (falls back to initials).'
          }
        </Text>
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          accessibilityRole=image set on every avatar.
        </Text>
      </Section>

      <Section title="Composed variants">
        <View style={styles.row}>
          <AvatarGroup
            size={24}
            max={4}
            avatars={[
              { source: FAKE_AVATAR },
              { initials: 'JD' },
              { source: { uri: 'https://i.pravatar.cc/128?img=21' } },
              { initials: 'AB' },
              { initials: 'CD' },
            ]}
          />
          <AvatarDuo
            size={48}
            primary={{ source: FAKE_AVATAR }}
            secondary={{ source: { uri: 'https://i.pravatar.cc/128?img=22' } }}
          />
          <AvatarLabel
            avatar={{ source: FAKE_AVATAR }}
            title="Alex Carter"
            subtitle="Climate creator"
          />
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing[5],
    alignItems: 'flex-end',
  },
});
