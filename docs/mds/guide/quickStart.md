
> Tip：所有代码或命令可以双击选定词，三击选定行。

## 1. [create-stdf](https://www.npmjs.com/package/create-stdf)（推荐）

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm create stdf@latest
```
<!-- :: -->
<!-- npm -->
```sh
npm create stdf@latest
# 或
npm init stdf@latest
# 或
npx create-stdf@latest
```
<!-- :: -->
<!-- bun -->
```sh
bun create stdf@latest
```
<!-- :: -->
<!-- yarn -->
```sh
yarn create stdf@latest
```
<!-- ::: -->

## 2. 自行搭建

2.1 使用 [Svelte CLI](https://svelte.dev/docs/cli/sv-create) 创建工程

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm dlx sv create
```
<!-- :: -->
<!-- npm -->
```sh
npx sv create
```
<!-- :: -->
<!-- bun -->
```sh
bunx sv create
```
<!-- :: -->
<!-- yarn -->
```sh
yarn dlx sv create
```
<!-- ::: -->

2.2 安装 Tailwind CSS 与 Vite 插件。

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/guides/vite#svelte) 配置 Tailwind CSS。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i tailwindcss @tailwindcss/vite -D
```
<!-- :: -->
<!-- npm -->
```sh
npm i tailwindcss @tailwindcss/vite -D
```
<!-- :: -->
<!-- bun -->
```sh
bun add tailwindcss @tailwindcss/vite -D
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add tailwindcss @tailwindcss/vite -D
```
<!-- ::: -->

2.3 在项目的入口 CSS 文件中引入 Tailwind CSS，设置暗黑模式，添加初始颜色变量，**使用 `@source` 指令指定 Tailwind 自动检测 STDF 组件**。

以下为 STDF 默认主题色，请根据自己的需要进行修改。可参考 [STDF 指南 - 色彩](/guide/color)。

```css
/* app.css */
@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));
@theme {
	/* 主题色 */
	--color-primary-50: oklch(0.979 0.01 267.36);
	--color-primary-100: oklch(0.95 0.024 270.343);
	--color-primary-200: oklch(0.847 0.074 271.188);
	--color-primary-300: oklch(0.741 0.13 272.232);
	--color-primary-400: oklch(0.634 0.193 271.595);
	--color-primary-500: oklch(0.536 0.252 268.66);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.397 0.26 264.877);
	--color-primary-800: oklch(0.331 0.221 264.833);
	--color-primary-900: oklch(0.26 0.178 264.428);
	--color-primary-950: oklch(0.192 0.13 266.64);

	--color-dark-50: oklch(0.995 0.012 101.474);
	--color-dark-100: oklch(0.986 0.025 97.107);
	--color-dark-200: oklch(0.965 0.059 95.884);
	--color-dark-300: oklch(0.938 0.089 92.952);
	--color-dark-400: oklch(0.91 0.114 89.711);
	--color-dark-500: oklch(0.88 0.136 86.375);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.71 0.137 75.734);
	--color-dark-800: oklch(0.58 0.118 70.166);
	--color-dark-900: oklch(0.449 0.097 65.209);
	--color-dark-950: oklch(0.321 0.074 62.379);

	--color-primaryBlack: oklch(0.116 0.054 267.087);
	--color-primaryWhite: oklch(0.961 0.001 286.375);
	--color-darkBlack: oklch(0.183 0.035 86.634);
	--color-darkWhite: oklch(0.962 0.001 17.178);

	/* 功能色 */
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);

	/* 扩展色 */
	--color-extend0: oklch(0.703 0.149 235.059);
	--color-Twitter: oklch(0.703 0.149 235.059);
	--color-extend1: oklch(0.702 0.194 38.137);
	--color-Svelte: oklch(0.702 0.194 38.137);
	--color-extend2: oklch(0.482 0.107 161.212);
	--color-Starbucks: oklch(0.482 0.107 161.212);

	/* 中性色 */
	--color-black: oklch(0 0 0);
	--color-white: oklch(1 0 0);
	--color-gray-50: oklch(0.961 0 0);
	--color-gray-100: oklch(0.925 0 0);
	--color-gray-200: oklch(0.845 0 0);
	--color-gray-300: oklch(0.767 0 0);
	--color-gray-400: oklch(0.683 0 0);
	--color-gray-500: oklch(0.6 0 0);
	--color-gray-600: oklch(0.51 0 0);
	--color-gray-700: oklch(0.42 0 0);
	--color-gray-800: oklch(0.321 0 0);
	--color-gray-900: oklch(0.218 0 0);
	--color-gray-950: oklch(0.159 0 0);
	--color-transparent: transparent;
}
@source "../node_modules/stdf/**/*.svelte";
```

2.4 在 Svelte 文件中引入并使用。

```svelte
<script lang="ts">
	import { Button } from 'stdf';
</script>

<Button>点击我</Button>
```

2.5 启动项目。

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm dev
```
<!-- :: -->
<!-- npm -->
```sh
npm run dev
```
<!-- :: -->
<!-- bun -->
```sh
bun dev
```
<!-- :: -->
<!-- yarn -->
```sh
yarn dev
```
<!-- ::: -->