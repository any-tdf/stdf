[English](https://github.com/dufu1991/stdf/blob/main/packages/rollup-plugin-stdf-icon/README.md)

# 介绍

将指定文件夹内的所有 SVG 组合为一个 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，以在 [STDF](https://stdf.design) 项目中使用的 Rollup 插件，当然也支持在 Vite 项目中使用。也支持基于 Vite 创建的 Vue 和 React 项目。

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

开发过程中只需要将用到的 svg 文件放到指定的入口文件夹（默认 `src/assets/svgs`），插件会自动将其合并为一个 SVG symbol 文件，输出到指定的输出文件夹（默认 `public/fonts`）。Vite 构建之后 public 文件夹下的文件会被复制到 dist 文件夹下，所以在构建之后，合并的 SVG symbol 文件会出现在 dist/fonts 文件夹下。请参考 [Vite 配置](https://cn.vitejs.dev/guide/assets.html#the-public-directory)。

如果需要修改输入输出文件夹以及合并的文件名，可以在 vite.config.js 或 vite.config.ts 中修改配置：

```js
// ...
symbol({
    inFile: 'src/assets/icons',
    outFile: 'public/icons',
    fileName: 'sprite'
}),
// ...
```

合并的 sprite.svg 文件将输出到 public/icons/sprite.svg。**此时请修改 STDF Icon Props 的 path 为对应的 `/icons/sprite.svg`**


# 配置

| 参数     | 默认            | 描述                                    |
| -------- | --------------- | --------------------------------------- |
| inFile   | src/assets/svgs | 将要被合并的所有 SVG 文件所在的文件夹。 |
| outFile  | public/fonts    | 合并后的 SVG symbol 文件的输出路径。    |
| fileName | symbol          | 合并后的 SVG symbol 文件的文件名。      |

# 许可证

本项目基于 [MIT 许可证](https://github.com/dufu1991/stdf/blob/main/LICENSE)。请随意享受并贡献给这个开源项目。