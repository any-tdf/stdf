import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';

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
                ];
                const { code } = warning;
                // don't warn on <marquee> elements, cos they're cool
                if (ignoredWarnings.includes(code)) return;

                // handle all other warnings normally
                defaultHandler(warning);
            },
        }),
    ],
});
