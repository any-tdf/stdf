import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgSprite from 'rollup-plugin-stdf-icon';

export default defineConfig({
	plugins: [
		// @ts-ignore
		sveltekit({}),
		// 一般来说，一个应用的的 svg 不多时都放在一个文件夹下，合并为一个 symbol 即可。此处演示了不同文件夹下的图标如何合并为不同的 symbol。
		// Generally speaking, when the svg of an application is not much, it is placed in a folder and merged into one symbol. This example shows how the icons in different folders are merged into different symbols.
		svgSprite([
			{ inFile: 'src/lib/svgs/Heroicons', outFile: 'static/symbols' },
			{ inFile: 'src/lib/svgs/IconPark', outFile: 'static/symbols' },
			{ inFile: 'src/lib/svgs/Remix', outFile: 'static/symbols' },
			// 单独为 Cell 与 NavBar 用到的图标创建一个 symbol。详见：https://stdf.design/#/guide/icon
			// Create a symbol for the icons used by Cell and NavBar. See: https://stdf.design/#/guide/icon
			{ inFile: 'src/lib/symbol', outFile: 'static/fonts' },
		]),
	],
});
