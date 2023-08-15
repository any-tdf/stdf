
[简体中文](https://github.com/dufu1991/stdf/blob/main/packages/rollup-plugin-stdf-icon/README_CN.md)

# Introduction

This is a Rollup plugin for [STDF](https://stdf.design) project that combines all SVG files in a specified folder into a single [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol). It can be used in both Rollup and Vite projects, including Vue and React projects created with Vite.

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
import symbol from 'rollup-plugin-stdf-icon';

export default defineConfig({
    // ...
    plugins:[
        // ...
        symbol(),
        // ...
    ]
    // ...
})
```

During development, simply place the SVG files you need in the specified input folder (default: `src/assets/svgs`). The plugin will automatically combine them into a single SVG symbol file and output it to the specified output folder (default: `public/fonts`). After building with Vite, the files in the public folder will be copied to the dist folder. Therefore, after building, the combined SVG symbol file will be located in the dist/fonts folder. Please refer to the [Vite Asset Handling](https://vitejs.dev/guide/assets.html#the-public-directory) documentation.

If you need to modify the input/output folders and the filename of the combined file, you can customize the configuration in vite.config.js or vite.config.ts:

```js
// ...
symbol({
    inFile: 'src/assets/icons',
    outFile: 'public/icons',
    fileName: 'sprite'
}),
// ...
```

The combined sprite.svg file will be outputted to public/icons/sprite.svg. **In this case, please update the path in the STDF Icon Props to `/icons/sprite.svg`**


# Configuration

| Parameter | Default         | Description                                                  |
| --------- | --------------- | ------------------------------------------------------------ |
| inFile    | src/assets/svgs | The folder where all the SVG files to be merged are located. |
| outFile   | public/fonts    | The output path for the merged SVG symbol file.              |
| fileName  | symbol          | The filename of the merged SVG symbol file.                  |

# License

This project is licensed under the [MIT License](https://github.com/dufu1991/stdf/blob/main/LICENSE). Feel free to use and contribute to this open-source project.
