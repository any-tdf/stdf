[简体中文](https://github.com/any-tdf/stdf/blob/main/packages/rollup-plugin-md-ts/README_CN.md)

## Introduction

This is a Rollup/Vite plugin that converts Markdown files to HTML strings, based on [marked](https://github.com/markedjs/marked).

The implementation idea is based on [rollup-plugin-md](https://github.com/xiaofuzi/rollup-plugin-md), adding TypeScript and compatible with Vite's plugin type.

The STDF doc site <https://stdf.design> uses this plugin.

## Parameters

| Parameter | Type | Default | Description                                                                           |
| --------- | ---- | -------- | ------------------------------------------------------------------------------ |
| marked    | `MarkedOptions` | `{}`   | [marked](https://github.com/markedjs/marked) options.                       |
| include  | `string[]`      | `['**/*.md']`      | The path of the Markdown file to include.                                                 |
| exclude  | `string[]`      | `[]`               | The path of the Markdown file to exclude.                                                 |

The `include` and `exclude` parameters are relative to the project root directory (usually the directory where vite.config.js or vite.config.ts is located).

## Installation

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

## Usage

Configure in vite.config.js or vite.config.ts:

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

## Why Create

There are already many plugins that can implement similar functions, such as [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown), which do not convert the following characters when converting to-do lists, which is exactly the function needed in [STDF](https://stdf.design).

```md
- [ ] TODO
- [x] DONE
```

## License

This project is licensed under the [MIT License](https://github.com/any-tdf/stdf/blob/main/LICENSE).
