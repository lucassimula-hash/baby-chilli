import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  AvatarGroup,
  AvatarLabel,
  Badge,
  Button,
  Chip,
  IconButton,
  Text,
  tokens,
} from 'chilli-native';

const SUPPORTERS = [
  { source: { uri: 'https://i.pravatar.cc/64?img=1' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=2' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=3' } },
  { source: { uri: 'https://i.pravatar.cc/64?img=4' } },
  { initials: 'AB' },
  { initials: 'CD' },
] as const;

export default function ProfileCardPlayground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <AvatarLabel
            size="lg"
            avatar={{ source: { uri: 'https://i.pravatar.cc/128?img=33' } }}
            title="Alex Carter"
            subtitle="Climate creator · 12.4k supporters"
            style={styles.headerLabel}
          />
          <Badge label="Verified" variant="brand" />
        </View>

        <Text variant="bodyMd">
          Pushing the next round of action emails to local representatives. Join in — every voice
          adds momentum.
        </Text>

        <View style={styles.chipsRow}>
          <Chip label="Climate" />
          <Chip label="Activism" />
          <Chip
            variant="social"
            label="Favorites"
            socialIcon={<Heart size={16} color={tokens.iconColors.brandPrimary} />}
          />
        </View>

        <View style={styles.supportersRow}>
          <AvatarGroup
            size={24}
            max={4}
            avatars={SUPPORTERS}
            strokeColor={tokens.backgrounds.neutral.primary.default}
          />
          <Text variant="bodyXs" color={tokens.textColors.baseSecondary}>
            +248 supporters today
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Button variant="brand" size="md" leftIcon={Heart} onPress={() => {}}>
            Support
          </Button>
          <IconButton
            variant="secondary"
            size="md"
            icon={MessageCircle}
            accessibilityLabel="Comment"
            onPress={() => {}}
          />
          <IconButton
            variant="secondary"
            size="md"
            icon={Share2}
            accessibilityLabel="Share"
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7] },
  card: {
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderRadius: tokens.radius[6],
    padding: tokens.spacing[7],
    gap: tokens.spacing[6],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacing[4],
  },
  headerLabel: { flex: 1 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing[4] },
  supportersRow: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[5] },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[4] },
});
