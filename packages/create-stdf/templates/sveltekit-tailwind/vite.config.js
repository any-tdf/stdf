import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svgSprite from 'rollup-plugin-stdf-icon';

export default defineConfig({
    plugins: [
        sveltekit({}),
        // 一般来说，一个应用的所有 svg 都放在一个文件夹下，合并为一个 symbol 即可。
        // 此处只是为了演示不同文件夹下的图标如何合并为不同的 symbol。
        // Generally speaking, all of an application svg are placed in a folder and merged into one symbol.
        // Here is just to show how icons in different folders are merged into different symbols.
        svgSprite([
            { inFile: 'src/lib/svgs/Heroicons', outFile: 'static/symbols', fileName: 'Heroicons' },
            { inFile: 'src/lib/svgs/IconPark', outFile: 'static/symbols', fileName: 'IconPark' },
            { inFile: 'src/lib/svgs/Remix', outFile: 'static/symbols', fileName: 'Remix' },
            // 单独为 Cell 与 NavBar 用到的图标创建一个 symbol。详见：https://stdf.design/#/guide?nav=icon
            // Create a symbol for the icons used by Cell and NavBar. See: https://stdf.design/#/guide?nav=icon
            { inFile: 'src/lib/icons', outFile: 'static/fonts', fileName: 'symbol' },
        ]),
    ],
});
