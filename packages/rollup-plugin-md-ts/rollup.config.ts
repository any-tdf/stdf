import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const external = Object.keys(pkg.dependencies);

export default {
	input: 'src/index.ts',
	output: [
		{
			dir: 'dist',
			format: 'es',
			file: pkg['main'],
			sourcemap: true,
			compact: true
		}
	],
	external: external,
	plugins: [
		typescript({
			declaration: true,
			declarationDir: 'dist',
			rootDir: 'src',
			tsconfig: './tsconfig.json'
		}),
		json(),
		terser()
	]
};
