#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const NATIVE_PRIMITIVES = join(ROOT, 'packages/chilli-native/src/primitives');
const NATIVE_INDEX = join(ROOT, 'packages/chilli-native/src/index.ts');
const PLAYGROUND_APP = join(ROOT, 'packages/chilli-native-playground/app');
const PLAYGROUND_INDEX = join(PLAYGROUND_APP, 'index.tsx');

function pascal(name) {
  return name
    .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

function kebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: pnpm scaffold:primitive <Name>');
  console.error('  Examples: pnpm scaffold:primitive Banner');
  console.error('            pnpm scaffold:primitive ProfileCard');
  process.exit(1);
}

const Name = pascal(raw);
const kebabName = kebab(Name);
const dir = join(NATIVE_PRIMITIVES, Name);

if (existsSync(dir)) {
  console.error(`✗ ${Name} already exists at ${dir}`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const typesContent = `import type { StyleProp, ViewStyle } from 'react-native';

export type ${Name}Props = {
  /** TODO: replace with the real props for ${Name}. */
  label?: string;
  style?: StyleProp<ViewStyle>;
};
`;

const componentContent = `import { StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { tokens } from '../../foundations/theme';
import type { ${Name}Props } from './${Name}.types';

export function ${Name}({ label = '${Name}', style }: ${Name}Props) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="bodyMd" color={tokens.textColors.basePrimary}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing[5],
    backgroundColor: tokens.backgrounds.neutral.primary.default,
    borderRadius: tokens.radius[6],
  },
});
`;

const indexContent = `export { ${Name} } from './${Name}';
export type { ${Name}Props } from './${Name}.types';
`;

writeFileSync(join(dir, `${Name}.types.ts`), typesContent);
writeFileSync(join(dir, `${Name}.tsx`), componentContent);
writeFileSync(join(dir, 'index.ts'), indexContent);
console.log(`✓ Created src/primitives/${Name}/{${Name}.tsx,${Name}.types.ts,index.ts}`);

// Append exports to chilli-native/src/index.ts
const exportLine = `export { ${Name} } from './primitives/${Name}';\nexport type { ${Name}Props } from './primitives/${Name}';\n`;
const idxSrc = readFileSync(NATIVE_INDEX, 'utf8');
if (!idxSrc.includes(`from './primitives/${Name}'`)) {
  const trailingMarker = '// Remaining primitives — added phase by phase as they land:';
  const next = idxSrc.includes(trailingMarker)
    ? idxSrc.replace(trailingMarker, exportLine + '\n' + trailingMarker)
    : idxSrc.trimEnd() + '\n' + exportLine;
  writeFileSync(NATIVE_INDEX, next);
  console.log(`✓ Appended exports to chilli-native/src/index.ts`);
} else {
  console.log(`• chilli-native/src/index.ts already exports ${Name} — skipped`);
}

// Create playground page
const playgroundFile = join(PLAYGROUND_APP, `${kebabName}.tsx`);
if (existsSync(playgroundFile)) {
  console.log(`• playground page ${kebabName}.tsx already exists — skipped`);
} else {
  const playgroundContent = `import { ScrollView, StyleSheet, View } from 'react-native';
import { ${Name}, Text, tokens } from 'chilli-native';

export default function ${Name}Playground() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>${Name}</Text>

      <Section title="Default">
        <${Name} />
      </Section>

      <Section title="With label">
        <${Name} label="Custom label" />
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
  content: { padding: tokens.spacing[7], gap: tokens.spacing[7] },
  heading: { color: tokens.textColors.basePrimary, fontSize: tokens.fontSize.xl, marginBottom: tokens.spacing[4] },
  section: { gap: tokens.spacing[4] },
});
`;
  writeFileSync(playgroundFile, playgroundContent);
  console.log(`✓ Created chilli-native-playground/app/${kebabName}.tsx`);
}

// Append link to playground index
const idxPg = readFileSync(PLAYGROUND_INDEX, 'utf8');
const linkLine = `  { href: '/${kebabName}', label: '${Name}' },`;
if (idxPg.includes(`href: '/${kebabName}'`)) {
  console.log(`• playground index already links /${kebabName} — skipped`);
} else {
  const arrayEnd = "] as const;";
  if (idxPg.includes(arrayEnd)) {
    const updated = idxPg.replace(arrayEnd, linkLine + '\n' + arrayEnd);
    writeFileSync(PLAYGROUND_INDEX, updated);
    console.log(`✓ Appended /${kebabName} link to playground index`);
  } else {
    console.log(`! Could not find array terminator in playground index — append manually:`);
    console.log(`  ${linkLine}`);
  }
}

console.log('');
console.log(`Done. Next steps:`);
console.log(`  1. Edit src/primitives/${Name}/${Name}.{tsx,types.ts}`);
console.log(`  2. Edit chilli-native-playground/app/${kebabName}.tsx`);
console.log(`  3. pnpm typecheck`);
console.log(`  4. pnpm playground:web  (and open /${kebabName})`);
