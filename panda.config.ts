import { defineConfig } from '@pandacss/dev';
import { themePreset } from './src/preset/panda.preset';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: ['@pandacss/dev/presets', themePreset],

  // Where to look for your css declarations
  include: ['./src/components/**/*.{js,jsx,ts,tsx}'],

  emitPackage: true,
  outdir: '@ui/styled-system',
});
