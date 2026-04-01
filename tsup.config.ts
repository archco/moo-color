import { defineConfig } from 'tsup';

export default defineConfig([
  // ESM + CJS — 타입 선언 포함, 트리 쉐이킹 활성화
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    target: ['es2022', 'node18'],
    outDir: 'dist',
    splitting: false,
    treeshake: true,
  },
  // IIFE — 브라우저 직접 삽입용 (UMD 대체),  전역 변수명: MooColor
  {
    entry: { 'moo-color': 'src/index.iife.ts' },
    format: ['iife'],
    globalName: 'MooColor',
    dts: false,
    clean: false,
    sourcemap: true,
    minify: true,
    target: ['es2022', 'chrome110', 'safari16', 'firefox115'],
    outDir: 'dist',
    splitting: false,
    treeshake: true,
    outExtension: () => ({ js: '.global.js' }),
  },
]);
