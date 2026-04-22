import { Link } from 'expo-router';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { tokens } from 'chilli-native';

const PRIMITIVES = [
  { href: '/text', label: 'Text' },
  { href: '/button', label: 'Button' },
  { href: '/icon', label: 'Icon' },
  { href: '/icon-button', label: 'IconButton' },
  { href: '/input', label: 'Input' },
  { href: '/textarea', label: 'Textarea' },
  { href: '/search-bar', label: 'SearchBar' },
  { href: '/select', label: 'Select' },
  { href: '/toggle', label: 'Toggle' },
  { href: '/radio', label: 'Radio' },
  { href: '/checkbox', label: 'Checkbox' },
  { href: '/accordion', label: 'Accordion' },
  { href: '/tabs', label: 'Tabs' },
  { href: '/menu', label: 'Menu' },
  { href: '/progress-bar', label: 'ProgressBar' },
  { href: '/tooltip', label: 'Tooltip' },
  { href: '/number-input', label: 'NumberInput' },
  { href: '/date-picker', label: 'DatePicker' },
  { href: '/form-title', label: 'FormTitle' },
  { href: '/flag-icon', label: 'FlagIcon' },
  { href: '/social-button', label: 'SocialButton' },
  { href: '/select-date-picker', label: 'SelectDatePicker' },
  { href: '/action-input', label: 'ActionInput' },
  { href: '/action-textarea', label: 'ActionTextarea' },
  { href: '/badge', label: 'Badge' },
  { href: '/chip', label: 'Chip' },
  { href: '/avatar', label: 'Avatar' },
  { href: '/avatar-group', label: 'AvatarGroup' },
  { href: '/avatar-duo', label: 'AvatarDuo' },
  { href: '/avatar-label', label: 'AvatarLabel' },
  { href: '/profile-card', label: 'Profile card (assembly)' },
] as const;

export default function PlaygroundIndex() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Chilli Native — Playground</Text>
      {PRIMITIVES.map((p) => (
        <Link key={p.href} href={p.href as any} style={styles.link}>
          {p.label}
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.backgrounds.base },
  content: { padding: tokens.spacing[7], gap: tokens.spacing[5] },
  heading: { color: tokens.textColors.basePrimary, fontSize: tokens.fontSize.xl, marginBottom: tokens.spacing[6] },
  link: { color: tokens.textColors.brandPrimary, fontSize: tokens.fontSize.md, paddingVertical: tokens.spacing[4] },
});
