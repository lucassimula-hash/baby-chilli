import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ChevronDown, Clock, Lock, Share2, Star, Users } from 'lucide-react-native';
import { Button, Menu, Text, tokens, type MenuOption } from 'chilli-native';

const items: MenuOption[] = [
  { value: 'teamspaces', label: 'Teamspaces', icon: Users },
  { value: 'recents', label: 'Recents', icon: Clock },
  { value: 'favorites', label: 'Favorites', icon: Star },
  { value: 'shared', label: 'Shared', icon: Share2 },
  { value: 'private', label: 'Private', icon: Lock },
];

const plain: MenuOption[] = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
  { value: 'three', label: 'Option three' },
];

export default function MenuPlayground() {
  const [withIcons, setWithIcons] = useState<string | undefined>('favorites');
  const [plainVal, setPlainVal] = useState<string | undefined>(undefined);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="With Button trigger + icons">
        <Menu
          items={items}
          selectedValue={withIcons}
          onSelect={setWithIcons}
          trigger={({ onPress }) => (
            <Button onPress={onPress} rightIcon={ChevronDown}>
              {items.find((i) => i.value === withIcons)?.label ?? 'Pick category'}
            </Button>
          )}
        />
      </Section>

      <Section title="Plain options (no icons)">
        <Menu
          items={plain}
          selectedValue={plainVal}
          onSelect={setPlainVal}
          size="sm"
          trigger={({ onPress }) => (
            <Button onPress={onPress} variant="secondary" rightIcon={ChevronDown}>
              {plainVal ? plain.find((p) => p.value === plainVal)?.label : 'Choose'}
            </Button>
          )}
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
  section: { gap: tokens.spacing[5], alignItems: 'flex-start' },
});
