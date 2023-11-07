import fs from 'fs';
import path from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';

const packageJson = JSON.parse(
  fs.readFileSync('./package.json').toString('utf-8')
);

const styledSystemPath = [
  '@ui/styled-system/types',
  '@ui/styled-system/recipes',
];

export default [
  // Build cjs and esm
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'build/cjs',
        format: 'cjs',
        preserveModules: true,
      },
      {
        dir: 'build/esm',
        format: 'es',
        preserveModules: true,
      },
    ],
    external: [
      ...styledSystemPath,
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ],
    plugins: [commonjs(), externals(), resolve(), esbuild()],
  },
  // Build Types
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'build/types',
        format: 'es',
        preserveModules: true,
      },
    ],
    plugins: [
      dts({
        compilerOptions: {
          incremental: false,
        },
      }),
    ],
  },
  {
    input: 'src/preset/index.ts',
    output: [
      {
        dir: 'build/preset',
      },
    ],
    external: [
      ...styledSystemPath,
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ],
    plugins: [commonjs(), externals(), resolve(), esbuild()],
  },
];
