[English](https://github.com/dufu1991/stdf/blob/main/packages/rollup-plugin-stdf-icon/README.md)

# 介绍

一个 Rolup 插件，将指定文件夹（支持多个）内的所有 SVG 组合为一个 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，以在 [STDF](https://stdf.design) 项目中使用。兼容 Vite，也可用于 Vite 创建的 Vue 或 React 项目。

关于 STDF 的 Icon 组件，请参考 [Icon 指南](https://stdf.design/#/components?nav=icon&tab=2)。

# 安装

使用 PNPM：

```bash
pnpm i rollup-plugin-stdf-icon -D
```

使用 NPM：

```bash
npm i rollup-plugin-stdf-icon -D
```

# 使用

在 vite.config.js 或 vite.config.ts 中配置：

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

开发过程中只需要将用到的 svg 文件放到指定的入口文件夹（默认 `src/assets/svgs`），插件会自动将其合并为一个 SVG symbol 文件，输出到指定的输出文件夹（默认 `public/fonts`）。Vite 构建之后 public 文件夹下的文件会被复制到 dist 文件夹下，所以在构建之后，合并的 SVG symbol 文件会出现在 dist/fonts 文件夹下。请参考 [Vite 配置](https://cn.vitejs.dev/guide/assets.html#the-public-directory)。

一般来说，按照默认配置将 svg 文件放到入口文件夹即可，无需过多配置。

如果需要修改输入输出文件夹以及合并的文件名，或者同时需要合并多个文件夹，可以在 vite.config.js 或 vite.config.ts 中修改配置：

```js
// ...
    svgSprite([
        { inFile: 'src/assets/svgs', outFile: 'public/fonts', fileName: 'symbol' },
        { inFile: 'src/assets/icons', outFile: 'public/fonts', fileName: 'icon' },
    ]),
// ...
```
此配置会合并两个 symbol。**此时使用 STDF 的 Icon 组件时，请配合修改 path 为对应的 `fonts/symbol.svg` 或 `fonts/icon.svg`**

注意：**传入参数为数组**，表示多个文件夹的配置。**每个文件夹的配置为一个对象**，对象中的 inFile 为将要被合并的 SVG 文件所在的文件夹，outFile 为合并后的 SVG symbol 文件的输出路径，fileName 为合并后的 SVG symbol 文件的文件名。请注意路径与文件名的正确性与冲突。

一般来说，使用 symbol 的场景是将一系列小的单色 svg 合并为一个 symbol，可以方便项目使用 svg 时修改颜色、大小、透明度等属性，所以默认配置下 rollup-plugin-stdf-icon 会去除掉 svg 本身的颜色属性。如果需要使用多色 svg，合成的 symbol 需要保留 svg 本身的颜色，只需要将 `simple` 参数设置为 `false`。

# 配置

| 参数     | 默认              | 描述                                                |
| -------- | ----------------- | --------------------------------------------------- |
| inFile   | 'src/assets/svgs' | 将要被合并的所有 SVG 文件所在的文件夹。             |
| outFile  | 'public/fonts'    | 合并后的 SVG symbol 文件的输出路径。                |
| fileName | 'symbol'          | 合并后的 SVG symbol 文件的文件名。                  |
| simple   | true              | 是否使用简单模式，简单模式会将 svg 自带的颜色去除。 |

# 许可证

本项目基于 [MIT 许可证](https://github.com/dufu1991/stdf/blob/main/LICENSE)。请随意享受并贡献给这个开源项目。