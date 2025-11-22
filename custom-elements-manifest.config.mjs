/**
 * This file is used to configure the Custom Elements Manifest Analyzer.
 * @see https://custom-elements-manifest.open-wc.org/analyzer/config/
 */

export default {
  globs: ['src/**/*.ts'],
  exclude: ['**/*.test.ts'],
  litelement: true,
  outdir: 'dist',
}
