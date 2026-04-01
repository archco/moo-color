import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: ['es2022', 'node18'],
  outDir: 'dist',
  splitting: false,
  treeshake: true,
});
