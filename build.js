/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const { createMinifier } = require('dts-minify');
const ts = require('typescript');
const path = require('path');
const fs = require('fs');

// Build for ESM
esbuild
  .build({
    logLevel: 'info',
    entryPoints: ['src/index.ts'],
    outdir: 'dist/esm',
    platform: 'node',
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: true,
    format: 'esm',
    target: ['ESNext'],
  })
  .catch(() => process.exit(1));

// Build for CJS
esbuild
  .build({
    logLevel: 'info',
    entryPoints: ['src/index.ts', 'src/generate.ts'],
    outdir: 'dist/cjs',
    platform: 'node',
    bundle: true,
    sourcemap: false,
    minify: true,
    format: 'cjs',
  })
  .catch(() => process.exit(1));

// Minify types files
const minifier = createMinifier(ts);

// load .d.ts files from /dist/types
const files = fs.readdirSync(path.resolve(__dirname, 'dist/types'));

files.forEach((file) => {
  const filePath = path.resolve(__dirname, 'dist/types', file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const minified = minifier.minify(fileContent, { keepJsDocs: true });

  // write minified content to the same file
  fs.writeFileSync(filePath, minified);
});
