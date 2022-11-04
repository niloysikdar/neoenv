// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');

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
