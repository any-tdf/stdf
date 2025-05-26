> 从 v1.1.0 开始，STDF 支持 [Iconify](https://iconify.design) 方式使用图标。

## SVG Sprites

STDF 图标组件的 `type` 默认为 `symbol`，即使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

你可以把它类比看成是一种字体，只不过这种字体是由 SVG 组成的，而且可以通过 CSS 控制颜色、大小等属性。所以如果用到比较大或者有多种颜色等比较复杂的图标，建议单独引入 SVG 文件使用，不要放在 symbol 中。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

STDF 开发了一个 Rollup/Vite 插件，用于将项目中的 SVG 文件合并成 SVG Sprites，具体使用请参考 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon)，由于 svg 格式的多样性，可能存在 rollup-plugin-stdf-icon 处理不准确的情况，请到 [GitHub](https://github.com/any-tdf/stdf/issues) 提 issue，注明 svg 文件的具体情况。

或使用其他 SVG Sprites 合成工具或手动合成，也可以请设计师提供设计物料时一并提供对应的 SVG Sprites。或类似 [Remix Icon](https://remixicon.com) 这样的图标库，可以直接将选定的多个图标下载为 SVG Sprites。

## Iconify

STDF 也可以通过设置 `type` 为 `iconify` 或 `iconify-color` 使用 [Iconify](https://iconify.design) 方式使用图标。

Iconify 有很多种使用方式，STDF 选择的是 Tailwind 4 插件的方式，这样对代码的侵入性最小，可参考 [Iconify for Tailwind CSS](https://iconify.design/docs/usage/css/tailwind/tailwind4)。在 STDF 中使用方式如下：

1. 安装 Tailwind 4 插件

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i -D @iconify/tailwind4
```
<!-- :: -->
<!-- npm -->
```sh
npm i -D @iconify/tailwind4
```
<!-- :: -->
<!-- bun -->
```sh
bun i -D @iconify/tailwind4
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add @iconify/tailwind4
```
<!-- ::: -->

2. 安装所需的开源图标库

> 非常不推荐安装 `@iconify/json`，这样全量图标库的体积非常大。

按需安装图标库，如使用以下命令安装 Solar 和 Carbon 图标库：

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i -D @iconify-json/solar
```
<!-- :: -->
<!-- npm -->
```sh
npm i -D @iconify-json/solar
```
<!-- :: -->
<!-- bun -->
```sh
bun i -D @iconify-json/solar
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add @iconify-json/solar
```
<!-- ::: -->

<!-- :::code-groups -->
<!-- pnpm -->
```sh
pnpm i -D @iconify-json/carbon
```
<!-- :: -->
<!-- npm -->
```sh
npm i -D @iconify-json/carbon
```
<!-- :: -->
<!-- bun -->
```sh
bun i -D @iconify-json/carbon
```
<!-- :: -->
<!-- yarn -->
```sh
yarn add @iconify-json/carbon
```
<!-- ::: -->

3. 项目的入口 CSS 文件中配置插件，并设置需要使用的图标库前缀，参考 [Clean selectors](https://iconify.design/docs/usage/css/tailwind/tailwind4/#clean-selectors)。

```css
@plugin "@iconify/tailwind4" {
	prefixes: solar, carbon;
}
```

4. 在组件中使用图标

```svelte
<Icon type="iconify" name="solar--cat-broken" />
```

使用 `iconify` 与 `iconify-color` 的区别在于，`iconify` 将图标渲染为蒙版图像，图标颜色为文本颜色，因此与使用 `symbol` 一样，可以设置 `theme` 属性控制图标跟随主题色，或者设置文本颜色自定义颜色，一般用于纯色图标。而 `iconify-color` 将图标渲染为背景图像，将无法设置 `theme` 属性，也无法设置文本颜色自定义颜色，一般用于多色图标，如 fluent-color 图标库，参考 [extra-class-name](https://iconify.design/docs/usage/css/tailwind/tailwind4/#extra-class-name)。

## 何时选择 symbol 方式？

当你使用的图标是团队自行设计，或不在 iconify 的开源图标库内，或者希望图标由自己手动维护，或图标已经是 SVG Sprites 时，建议使用 SVG Sprites 方式。
