const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so the playground sees source changes in `chilli-native`.
config.watchFolders = [monorepoRoot];

// Resolve modules from both the playground and the monorepo root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Disable hierarchical lookup so pnpm symlinks resolve consistently.
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
