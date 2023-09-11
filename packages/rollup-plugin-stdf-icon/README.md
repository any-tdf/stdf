[简体中文](https://github.com/dufu1991/stdf/blob/main/packages/rollup-plugin-stdf-icon/README_CN.md)

# Introduction

This is a Rollup plugin that combines all SVG files in specified folders (supports multiple) into a single [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) for use in [STDF](https://stdf.design) projects. It is compatible with Vite and can be used in Vue or React projects created with Vite.

For more information about the STDF Icon component, please refer to the [Icon Guide](https://stdf.design/#/components?nav=icon&tab=2).

# Installation

With BUN:

```bash
bun i rollup-plugin-stdf-icon -D
```

Using PNPM:

```bash
pnpm i rollup-plugin-stdf-icon -D
```

Using NPM:

```bash
npm i rollup-plugin-stdf-icon -D
```

# Usage

Configure the plugin in vite.config.js or vite.config.ts:

```js
// ...
import svgSprite from 'rollup-plugin-stdf-icon';

export default defineConfig({
	// ...
	plugins: [
		// ...
		svgSprite(),
		// ...
	],
	// ...
});
```

During development, simply place the SVG files you need in the specified input folder (default: `src/lib/icons`). The plugin will automatically combine them into a single SVG symbol file and output it to the specified output folder (default: `static/fonts`). After building with Vite, the files in the public folder will be copied to the dist folder. Therefore, after building, the combined SVG symbol file will be located in the dist/fonts folder. Please refer to the [Vite Asset Handling](https://vitejs.dev/guide/assets.html#the-public-directory) documentation.

> Default parameters are optimized for SvelteKit projects. If you need to adapt it for non-SvelteKit projects created with Vite, please modify the configuration in vite.config.js or vite.config.ts.

Generally, you can simply place the SVG files in the default input folder without the need for additional configuration.

If you need to modify the input/output folders and the filename of the combined file, or if you need to combine multiple folders, you can customize the configuration in vite.config.js or vite.config.ts:

```javascript
// ...
    svgSprite([
        { inFile: 'src/lib/svgs', outFile: 'static/fonts', fileName: 'symbol' },
        { inFile: 'src/lib/icons', outFile: 'static/fonts', fileName: 'icon' },
    ]),
// ...
```

This configuration will combine two symbols. **When using the STDF Icon component, please update the path to the corresponding `fonts/symbol.svg` or `fonts/icon.svg`**.

Note: **The parameter should be an array** representing the configuration for multiple folders. **Each folder configuration should be an object** with `inFile` as the folder where the SVG files to be combined are located, `outFile` as the output path for the combined SVG symbol file, and `fileName` as the filename of the combined SVG symbol file. Please ensure the correctness and avoid conflicts in paths and filenames.

In general, the use of symbols is to combine a series of small, single-color SVG files into one symbol. This allows for easy modification of attributes such as color, size, and opacity when using SVG in a project. Therefore, when default configuring rollup-plugin-stdf-icon, the color attributes of the SVG files themselves are removed. If you need to use multi-color SVG files and want to preserve the colors in the generated symbol, you just need to set the `simple` parameter to `false`.

# Configuration

| Parameter | Default         | Description                                                                                                   |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| inFile    | 'src/lib/icons' | The folder where all the SVG files to be merged are located.                                                  |
| outFile   | 'static/fonts'  | The output path for the merged SVG symbol file.                                                               |
| fileName  | 'symbol'        | The filename of the merged SVG symbol file.                                                                   |
| simple    | true            | Whether to use the simple mode, the simple mode will remove the color attributes of the SVG files themselves. |

# License

This project is licensed under the [MIT License](https://github.com/dufu1991/stdf/blob/main/LICENSE). Feel free to use and contribute to this open-source project.
