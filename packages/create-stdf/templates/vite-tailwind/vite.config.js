import postcss from './postcss.config.js';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            onwarn(warning, defaultHandler) {
                const ignoredWarnings = [
                    'a11y-distracting-elements',
                    'a11y-no-static-element-interactions',
                    'a11y-click-events-have-key-events',
                    'a11y-no-noninteractive-element-interactions',
                ];
                const { code } = warning;
                // don't warn on <marquee> elements, cos they're cool
                if (ignoredWarnings.includes(code)) return;

                // handle all other warnings normally
                defaultHandler(warning);
            },
        }),
        // 一般来说，一个应用的所有 svg 都放在一个文件夹下，合并为一个 symbol 即可。
        // 如默认配置的 src/assets/svgs 内，合并之后 symbol 会放置于 public/fonts/symbol.svg 下。
        // 此处只是为了演示不同文件夹下的图标如何合并为不同的 symbol。
        // Generally speaking, all of an application svg are placed in a folder and merged into one symbol.
        // As in the default configuration of src/assets/svgs, the merged symbol will be placed under public/fonts/symbol.svg.
        // Here is just to show how icons in different folders are merged into different symbols.
        svgSprite([
            { inFile: 'src/assets/Heroicons', outFile: 'public/fonts', fileName: 'Heroicons' },
            { inFile: 'src/assets/IconPark', outFile: 'public/fonts', fileName: 'IconPark' },
            { inFile: 'src/assets/Remix', outFile: 'public/fonts', fileName: 'Remix' },
        ]),
    ],
    css: { postcss },
});
