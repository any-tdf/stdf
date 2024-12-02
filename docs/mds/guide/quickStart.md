<!-- main -> next -->

> Tip：所有代码或命令可以双击选定词，三击选定行。

## 😉 已有工程

### 安装

已有配置好 Svelte 与 Tailwind 的工程，直接安装。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i stdf@next -D
```
<!-- :: -->
<!-- npm -->
```sh
npm i stdf@next -D
```
<!-- :: -->
<!-- bun -->
```sh
bun add stdf@next -D
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add stdf@next -D
```
<!-- ::: -->

### 在 Svelte 中使用

```svelte
<!-- Button Demo -->
<script>
	import { Button } from 'stdf';
</script>

<Button>默认</Button>
```

## 😓 无工程

### 使用 create-stdf

可以尝试使用 [create-stdf](https://www.npmjs.com/package/create-stdf) 快速创建工程。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm create stdf@next
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@next
# 或
npm init stdf@next
# 或
npx create-stdf@next
```
<!-- :: -->
<!-- bun -->
```sh
bun create stdf@next
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@next
```
<!-- ::: -->

### 自行搭建工程

此处用 Vite 示例创建工程，参考 [Vite 文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm create vite
```
<!-- :: -->
<!-- npm -->
```sh
npm create vite@latest
```
<!-- :: -->
<!-- bun -->
```sh
bun create vite
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create vite
```
<!-- ::: -->

按照提示操作创建工程。

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/guides/vite#svelte) 配置 Tailwind CSS。

1. 安装 Tailwind CSS 和其他依赖，然后生成 `tailwind.config.js` 和 `postcss.config.js` 文件。

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. 在 `tailwind.config.js` 文件内添加模板文件。注意 content 内添加`./node_modules/stdf/**/*.svelte`，这是 STDF 的组件位置。其中 theme 的 colors 可以根据自己的需要进行修改。可参考 [STDF 指南 - 色彩](/#/guide/color)。

注意：Tailwind 配置文件中的 content 即表示所有可能用到 Tailwind 的文件，请不要遗漏。darkMode 请设置为 'class'，这是为了配合 STDF 的暗黑模式。

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	// ...
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/stdf/**/*.svelte'],
	theme: {
		colors: {
			// 主题色
			primary: {
				50: 'rgba(var(--theme-color-primary-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-primary-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-primary-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-primary-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-primary-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-primary-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-primary), <alpha-value>)',
				700: 'rgba(var(--theme-color-primary-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-primary-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-primary-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-primary-950), <alpha-value>)',
			},
			dark: {
				50: 'rgba(var(--theme-color-dark-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-dark-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-dark-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-dark-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-dark-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-dark-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-dark), <alpha-value>)',
				700: 'rgba(var(--theme-color-dark-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-dark-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-dark-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-dark-950), <alpha-value>)',
			},
			primaryBlack: 'rgba(var(--theme-color-primaryBlack), <alpha-value>)',
			primaryWhite: 'rgba(var(--theme-color-primaryWhite), <alpha-value>)',
			darkBlack: 'rgba(var(--theme-color-darkBlack), <alpha-value>)',
			darkWhite: 'rgba(var(--theme-color-darkWhite), <alpha-value>)',

			// 功能色
			success: 'rgba(var(--theme-color-functional-success), <alpha-value>)',
			warning: 'rgba(var(--theme-color-functional-warning), <alpha-value>)',
			error: 'rgba(var(--theme-color-functional-error), <alpha-value>)',
			info: 'rgba(var(--theme-color-functional-info), <alpha-value>)',

			// 扩展色
			extend0: 'rgba(var(--theme-color-extend0), <alpha-value>)',
			extend1: 'rgba(var(--theme-color-extend1), <alpha-value>)',
			extend2: 'rgba(var(--theme-color-extend2), <alpha-value>)',

			// 中性色
			black: '#000000',
			white: '#ffffff',
			gray: {
				50: '#f2f2f2',
				100: '#e6e6e6',
				200: '#cccccc',
				300: '#b3b3b3',
				400: '#999999',
				500: '#808080',
				600: '#666666',
				700: '#4D4D4D',
				800: '#333333',
				900: '#1A1A1A',
				950: '#0D0D0D',
			},
			transparent: 'transparent',
		},
		// ...
	},
	darkMode: 'class',
	// ...
};
```

3. 将 Tailwind CSS 添加到入口 CSS 文件中，如 `./src/index.css`，并在入口文件 main.js 中引入这个 CSS 文件。

4. 启动项目。

```sh
npm run dev
# or
bun dev
```
