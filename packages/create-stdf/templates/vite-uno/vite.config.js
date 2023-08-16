import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        UnoCSS({
            extractors: [extractorSvelte()],
        }),
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
        svgSprite([
            { inFile: 'src/assets/Heroicons', outFile: 'public/fonts', fileName: 'Heroicons' },
            { inFile: 'src/assets/IconPark', outFile: 'public/fonts', fileName: 'IconPark' },
            { inFile: 'src/assets/Remix', outFile: 'public/fonts', fileName: 'Remix' },
        ]),
    ],
});
