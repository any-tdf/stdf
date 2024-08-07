import postcss from './postcss.config.cjs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import md from 'rollup-plugin-md';
import svgSprite from 'rollup-plugin-stdf-icon';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/stdf/',
	plugins: [
		// @ts-ignore
		svelte(),
		// @ts-ignore
		md({
			// to disable marked set to false
			marked: {
				//marked options
			},
			include: ['../doc/**/*.md', './src/pages/guide/**/*.md'],
		}),
		svgSprite([{ inFile: 'src/assets/svgs', outFile: 'public/fonts', fileName: 'symbol' }]),
	],
	css: { postcss },
	server: {
		hmr: true,
		host: '0.0.0.0',
		port: 5555,
		// 是否开启 https
		https: false,
	},
	build: {
		assetsDir: 'build',
		rollupOptions: {
			manualChunks: id => {
				// 将 node_modules 中的包拆分到单独的 build/node_modules.js 文件中
				if (id.includes('node_modules')) {
					return 'vendor/index';
				}
				// 将 src/components/menu 中的包拆分到单独的 build/common/menu/index.js 文件中
				if (id.includes('site/src/components/menu')) {
					return 'common/menu/index';
				}
				// 将 src/pages/Home.svelte 单独拆分到 build/home/index.js 文件中
				if (id.includes('src/pages/Home.svelte')) {
					return 'home/index';
				}
				// 将 src/pages/guide/Guide.svelte 单独拆分到 build/guide/index.js 文件中
				if (id.includes('src/pages/guide/Guide.svelte')) {
					return 'guide/index';
				}
				const guide = [
					'QuickStart',
					'Theme',
					'Faq',
					'Color',
					'Color_en',
					'Icon',
					'Internation',
					'Compatibility',
					'Logo',
					'About',
					'Changelog',
					'Future',
					'Shortkey',
					'Contribution',
					'Milestone',
					'Vscode',
					'Generator',
				];
				// 循环遍历 guide 文件夹下的所有文件，将其单独拆分到 build/guide/xxx/index.js 文件中
				for (const item of guide) {
					if (id.includes(`src/pages/guide/${item}.svelte`)) {
						return `guide/${item}/index`;
					}
				}
				// 将 src/pages/components/Components.svelte 单独拆分到 build/components/index.js 文件中
				if (id.includes('src/pages/components/Components.svelte')) {
					return 'components/index';
				}
				const components = ['Api', 'Component', 'FAQ', 'Guide', 'Version'];
				// 循环遍历 components 文件夹下的所有文件，将其单独拆分到 build/components/xxx/index.js 文件中
				for (const item of components) {
					if (id.includes(`src/pages/components/${item}.svelte`)) {
						return `components/${item}/index`;
					}
				}
				// 如果 id 包含 doc/guide/xxx.md 则单独拆分到 build/doc/guide/xxx/index.js 文件中
				if (id.includes('doc/guide/')) {
					return 'doc/guide/' + id.match(/doc\/guide\/(.*)\.md/)[1] + '/index';
				}
				// 如果 id 包含 doc/components/xxx.md 则单独拆分到 build/doc/components/xxx/index.js 文件中
				if (id.includes('doc/components/')) {
					return 'doc/components/' + id.match(/doc\/components\/(.*)\.md/)[1] + '/index';
				}
			},
		},
	},
});
