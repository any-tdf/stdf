[English](https://github.com/any-tdf/stdf/blob/next/packages/rollup-plugin-md-ts/README.md)

## 介绍

一款 Rollup/Vite 插件，功能是将 Markdown 文件转换为 HTML 字符串，基于 [marked](https://github.com/markedjs/marked) 。

实现思路参考 [rollup-plugin-md](https://github.com/xiaofuzi/rollup-plugin-md) ，增加了 TypeScript 并兼容 Vite 的插件类型。

STDF 新站点 <https://next.stdf.design> 使用了此插件。

## 参数

| 参数     | 类型 | 默认             | 描述                                                                           |
| -------- | ---- | ---------------- | ------------------------------------------------------------------------------ |
| marked   | `MarkedOptions` | `{}`   | [marked](https://github.com/markedjs/marked) 的配置。                       |
| include  | `string[]`      | `['**/*.md']`      | 要包含的 Markdown 文件路径。                                                 |
| exclude  | `string[]`      | `[]`               | 要排除的 Markdown 文件路径。                                                 |

其中 include 和 exclude 是相对项目根目录（一般就是 vite.config.js 或 vite.config.ts 所在目录）的相对路径。

## 安装

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i rollup-plugin-md-ts -D
```
<!-- :: -->
<!-- npm -->
```sh
npm i rollup-plugin-md-ts -D
```
<!-- :: -->
<!-- bun -->
```sh
bun add rollup-plugin-md-ts -D
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add rollup-plugin-md-ts -D
```
<!-- ::: -->

## 使用

在 vite.config.js 或 vite.config.ts 中配置：

```javascript
import md from 'rollup-plugin-md-ts';

export default defineConfig({
    // ...
	plugins: [
		// ...
		md({
			marked: {},
			include: [ './src/**/*.md']
		})
		// ...
	],
	// ...
});
```

## 为何创建

其实市面上已经有很多能实现类似功能的插件，比如 [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown) ，这些基于 [markdown-it](https://www.npmjs.com/package/markdown-it) 的插件在转换待办事项列表时，并不会转换以下字符，而这个正好是 [STDF](https://stdf.design) 中需要用到的功能。

```md
- [ ] 待办事项
- [x] 已完成事项
```

## 许可证

本项目基于 [MIT 许可证](https://github.com/any-tdf/stdf/blob/main/LICENSE)。请随意享受并贡献给这个开源项目。
