import postcss from './postcss.config.js';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
	// @ts-ignore
	plugins: [
		svelte({
			onwarn(warning, defaultHandler) {
				if (warning.code.startsWith('a11y-')) {
					return;
				}
				// handle all other warnings normally
				defaultHandler(warning);
			},
		}),
		// 一般来说，一个应用的的 svg 不多时都放在一个文件夹下，合并为一个 symbol 即可。此处演示了不同文件夹下的图标如何合并为不同的 symbol。
		// Generally speaking, when the svg of an application is not much, it is placed in a folder and merged into one symbol. This example shows how the icons in different folders are merged into different symbols.
		svgSprite([
			{ inFile: 'src/assets/Heroicons', outFile: 'public/fonts' },
			{ inFile: 'src/assets/IconPark', outFile: 'public/fonts' },
			{ inFile: 'src/assets/Remix', outFile: 'public/fonts' },
		]),
	],
	// @ts-ignore
	css: { postcss },
});
