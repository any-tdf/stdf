import postcss from './postcss.config.cjs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
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
        svgSprite(),
    ],
    css: { postcss },
    server: {
        hmr: true,
        host: '0.0.0.0',
        port: 8888,
        https: false,
    },
    build: { assetsDir: 'build' },
});
