import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Clock, Lock, Share2, Star, Users } from 'lucide-react-native';
import { Select, Text, tokens, type SelectOption } from 'chilli-native';

const creatorOptions: SelectOption[] = [
  { value: 'all', label: 'All creators' },
  { value: 'john', label: 'john_doe' },
  { value: 'jane', label: 'jane_smith' },
  { value: 'alex', label: 'alex_design' },
  { value: 'maria', label: 'maria_dev' },
];

const categoryOptions: SelectOption[] = [
  { value: 'teamspaces', label: 'Teamspaces', icon: Users },
  { value: 'recents', label: 'Recents', icon: Clock },
  { value: 'favorites', label: 'Favorites', icon: Star },
  { value: 'shared', label: 'Shared', icon: Share2 },
  { value: 'private', label: 'Private', icon: Lock },
];

export default function SelectPlayground() {
  const [basic, setBasic] = useState<string | undefined>(undefined);
  const [withIcons, setWithIcons] = useState<string | undefined>('favorites');
  const [avatar, setAvatar] = useState<string | undefined>('jane');
  const [borderless, setBorderless] = useState<string | undefined>(undefined);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Basic">
        <Row>
          <Select
            options={creatorOptions}
            value={basic}
            onChange={setBasic}
            placeholder="creator"
            size="sm"
          />
          <Select
            options={creatorOptions}
            value={basic}
            onChange={setBasic}
            placeholder="creator"
            size="md"
          />
        </Row>
      </Section>

      <Section title="With icons">
        <Row>
          <Select
            options={categoryOptions}
            value={withIcons}
            onChange={setWithIcons}
            placeholder="Category"
            size="sm"
          />
          <Select
            options={categoryOptions}
            value={withIcons}
            onChange={setWithIcons}
            placeholder="Category"
            size="md"
          />
        </Row>
      </Section>

      <Section title="Avatar">
        <Row>
          <Select
            options={creatorOptions}
            value={avatar}
            onChange={setAvatar}
            placeholder="creator"
            variant="avatar"
            avatarSrc={{ uri: 'https://i.pravatar.cc/40' }}
            size="sm"
          />
          <Select
            options={creatorOptions}
            value={avatar}
            onChange={setAvatar}
            placeholder="creator"
            variant="avatar"
            avatarSrc={{ uri: 'https://i.pravatar.cc/40' }}
            size="md"
          />
        </Row>
      </Section>

      <Section title="Borderless">
        <Row>
          <Select
            options={creatorOptions}
            value={borderless}
            onChange={setBorderless}
            placeholder="creator"
            variant="borderless"
            size="sm"
          />
          <Select
            options={creatorOptions}
            value={borderless}
            onChange={setBorderless}
            placeholder="creator"
            variant="borderless"
            size="md"
          />
        </Row>
      </Section>

      <Section title="Disabled">
        <Row>
          <Select
            options={creatorOptions}
            placeholder="disabled"
            size="md"
            disabled
          />
        </Row>
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

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[8] },
  section: { gap: tokens.spacing[5] },
  row: { flexDirection: 'row', gap: tokens.spacing[5], flexWrap: 'wrap' },
});
