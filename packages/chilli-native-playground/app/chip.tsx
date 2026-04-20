import { Bell, Heart } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Icon, Text, tokens } from 'chilli-native';

const TYPES = ['fill', 'light'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

const FAKE_AVATAR = { uri: 'https://i.pravatar.cc/64?img=12' };

export default function ChipPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Type × Size (default variant)">
        {TYPES.map((type) => (
          <View key={type} style={styles.row}>
            {SIZES.map((size) => (
              <Chip key={`${type}-${size}`} type={type} size={size} label={`${type} ${size}`} />
            ))}
          </View>
        ))}
      </Section>

      <Section title="With avatar">
        <View style={styles.row}>
          {SIZES.map((size) => (
            <Chip
              key={size}
              variant="avatar"
              avatarSrc={FAKE_AVATAR}
              size={size}
              label={`Alex ${size}`}
            />
          ))}
        </View>
      </Section>

      <Section title="With social icon">
        <View style={styles.row}>
          <Chip
            variant="social"
            socialIcon={<Icon source={Heart} size={16} />}
            label="Favorites"
          />
          <Chip
            variant="social"
            socialIcon={<Icon source={Bell} size={16} />}
            label="Alerts"
          />
        </View>
      </Section>

      <Section title="With remove">
        <View style={styles.row}>
          <Chip label="Removable" onRemove={() => {}} />
          <Chip
            variant="avatar"
            avatarSrc={FAKE_AVATAR}
            label="Alex"
            onRemove={() => {}}
          />
        </View>
      </Section>

      <Section title="Interactive (onPress)">
        <View style={styles.row}>
          <Chip label="Tap me" onPress={() => {}} />
          <Chip type="light" label="Tap light" onPress={() => {}} />
        </View>
      </Section>

      <Section title="Edge cases">
        <Chip label="A very long chip label that probably wraps weirdly in tight layouts" />
      </Section>

      <Section title="Accessibility">
        <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
          Interactive chips expose accessibilityRole=button. Static chips are presentational.
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
  section: { gap: tokens.spacing[5] },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing[5],
    alignItems: 'center',
  },
});
