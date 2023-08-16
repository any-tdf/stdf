
[简体中文](https://github.com/dufu1991/stdf/blob/main/packages/rollup-plugin-stdf-icon/README_CN.md)

# Introduction

This is a Rollup plugin that combines all SVG files in specified folders (supports multiple) into a single [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) for use in [STDF](https://stdf.design) projects. It is compatible with Vite and can be used in Vue or React projects created with Vite.

For more information about the STDF Icon component, please refer to the [Icon Guide](https://stdf.design/#/components?nav=icon&tab=2).

# Installation

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
    plugins:[
        // ...
        svgSprite(),
        // ...
    ]
    // ...
})
```

During development, simply place the SVG files you need in the specified input folder (default: `src/assets/svgs`). The plugin will automatically combine them into a single SVG symbol file and output it to the specified output folder (default: `public/fonts`). After building with Vite, the files in the public folder will be copied to the dist folder. Therefore, after building, the combined SVG symbol file will be located in the dist/fonts folder. Please refer to the [Vite Asset Handling](https://vitejs.dev/guide/assets.html#the-public-directory) documentation.

Generally, you can simply place the SVG files in the default input folder without the need for additional configuration.

If you need to modify the input/output folders and the filename of the combined file, or if you need to combine multiple folders, you can customize the configuration in vite.config.js or vite.config.ts:

```js
// ...
    svgSprite([
        { inFile: 'src/assets/svgs', outFile: 'public/fonts', fileName: 'symbol' },
        { inFile: 'src/assets/icons', outFile: 'public/fonts', fileName: 'icon' },
    ]),
// ...
```

This configuration will combine two symbols. **When using the STDF Icon component, please update the path to the corresponding `fonts/symbol.svg` or `fonts/icon.svg`**.

Note: **The parameter should be an array** representing the configuration for multiple folders. **Each folder configuration should be an object** with `inFile` as the folder where the SVG files to be combined are located, `outFile` as the output path for the combined SVG symbol file, and `fileName` as the filename of the combined SVG symbol file. Please ensure the correctness and avoid conflicts in paths and filenames.

# Configuration

| Parameter | Default            | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| inFile    | src/assets/svgs   | The folder where all the SVG files to be merged are located. |
| outFile   | public/fonts      | The output path for the merged SVG symbol file. |
| fileName  | symbol             | The filename of the merged SVG symbol file.    |

# License

This project is licensed under the [MIT License](https://github.com/dufu1991/stdf/blob/main/LICENSE). Feel free to use and contribute to this open-source project.
