import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "COMPONENTS.md",
  "TOKENS.md",
  "REGISTRY.md",
  "AGENTS.md",
  "README.md",
  "components.manifest.json",
  "index.ts",
];

const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

let manifest;
try {
  manifest = JSON.parse(read("components.manifest.json"));
} catch (error) {
  errors.push(`Invalid components.manifest.json: ${error.message}`);
}

if (manifest) {
  if (!Array.isArray(manifest.components)) {
    errors.push("components.manifest.json must contain a components array.");
  }

  const indexSource = read("index.ts");
  const componentsDoc = read("COMPONENTS.md");
  const names = new Set();

  for (const component of manifest.components ?? []) {
    if (!component.name) {
      errors.push("Manifest component is missing name.");
      continue;
    }

    if (names.has(component.name)) {
      errors.push(`Duplicate manifest component: ${component.name}`);
    }
    names.add(component.name);

    if (!component.sourcePath || !exists(component.sourcePath)) {
      errors.push(`Missing sourcePath for ${component.name}: ${component.sourcePath}`);
    }

    if (component.status === "stable" && !componentsDoc.includes(`| ${component.name} |`)) {
      errors.push(`Stable component is missing from COMPONENTS.md inventory: ${component.name}`);
    }

    const exportPattern = new RegExp(`export\\s+(?:\\{[^}]*\\b${component.name}\\b|type\\s+\\{[^}]*\\b${component.name}\\b)`);
    if (!exportPattern.test(indexSource)) {
      errors.push(`Public component is missing from index.ts: ${component.name}`);
    }
  }

  const manifestNames = new Set((manifest.components ?? []).map((component) => component.name));
  const valueExports = [...indexSource.matchAll(/export\s+\{\s*([^}]+)\s*\}/g)]
    .flatMap((match) => match[1].split(","))
    .map((name) => name.trim().split(/\s+as\s+/).pop())
    .filter(Boolean);

  for (const exportName of valueExports) {
    if (!manifestNames.has(exportName)) {
      errors.push(`Public export is missing from components.manifest.json: ${exportName}`);
    }
  }
}

const examplesDir = path.join(root, "examples");
if (!fs.existsSync(examplesDir)) {
  errors.push("Missing examples directory.");
} else {
  const exampleFiles = fs
    .readdirSync(examplesDir)
    .filter((file) => file.endsWith(".tsx"));

  if (exampleFiles.length < 3) {
    errors.push("Expected at least 3 TSX examples.");
  }

  for (const file of exampleFiles) {
    const source = fs.readFileSync(path.join(examplesDir, file), "utf8");
    if (!source.includes('from "../index"')) {
      errors.push(`Example must import public components from ../index: examples/${file}`);
    }
    if (source.includes("@/components/ui/") || source.includes("components/ui/")) {
      errors.push(`Example imports component internals: examples/${file}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Documentation check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

process.stdout.write("Documentation check passed.\n");
