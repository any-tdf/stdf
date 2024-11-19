## 背景

STDF 使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

你可以把它类比看成是一种字体，只不过这种字体是由 SVG 组成的，而且可以通过 CSS 控制颜色、大小等属性。所以如果用到比较大或者有多种颜色等比较复杂的图标，建议单独引入 SVG 文件使用，不要放在 symbol 中。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

## rollup-plugin-stdf-icon

STDF 已经开发了一个 Rollup/Vite 插件，用于将项目中的 SVG 文件合并成 SVG Sprites，具体使用请参考 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon)，由于 svg 格式的多样性，可能存在 rollup-plugin-stdf-icon 处理不准确的情况，请到 [GitHub](https://github.com/any-tdf/stdf/issues) 提 issue，注明 svg 文件的具体情况。

或使用其他 SVG Sprites 合成工具或手动合成，也可以请设计师提供设计物料时一并提供对应的 SVG Sprites。或类似 Remix Icon 这样的图标库，可以直接将选定的多个图标下载为 SVG Sprites。

## 内置说明

STDF 部分组件内使用的图标源自 [Remix Icon 图标库](https://remixicon.com)（[GitHub](https://github.com/Remix-Design/remixicon)），在此表示感谢 🙏🏻🙏🏻。

**如果使用这些组件，请确保项目的 symbol.svg 中包含了对应图标。**

具体请参考 [STDF-指南-图标](https://stdf.design/#/guide/icon)。

可到 `node_modules/stdf/assets/svg_base/` 查看这些图标的 SVG 源文件。

## 图标名称

name 为 'slot' 表示使用插槽渲染，其他字符如 'ri-home-line' 使用 symbol.svg 中对应的 SVG 图标渲染。

## 图标颜色

如果 theme 不传或传入 false，图标颜色将继承自父级文字颜色，传入 true 图标颜色会根据主题色变化（包含亮暗模式）；如果要实现自定义颜色，而颜色又同时包含亮暗模式，建议使用 CSS 注入或插槽渲染，在 injClass 或插槽中分别配置亮暗模式，请查看示例。

## 颜色优先级

颜色优先级 slot > injClass > theme > 默认。

## 偏移量

欧洲和西亚文字排版中是有一条基准线的，东亚文字没有基线，参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/baseline)。但由于不同系统不同字体中的差异，可能导致图标与文字一起排列时上下无法对齐，可以通过偏移量来微调。或者某些图标由于视觉重心的差异，需要排版时给出偏移量来保持视觉平衡。

## CSS 注入

通过 injClass 参数可以向组件内部最外层元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性。因为 CSS 注入于最后，此时最外层元素若已有同属性 CSS 将会以 injClass 为准，这也是通过 injClass 实现自定义图标颜色的原因。

## 插槽

可放入任何元素（甚至 Icon 组件自身），当然主要用于自定义图标或自定义图标颜色，如将自定义 SVG 放入 Icon 组件，请注意 SVG 的 viewBox、height、width 关系与 display 属性。此时图标内容取决于传入的元素，Props 中的 name、size、theme 等参数都将失效。通过插槽将使组件内容有更多自定义可能性。

## 全局注入图标 svg 路径

STDF Icon 组件使用 Svg 文件路径配置，适用于一次性配置全局 SVG symbol 路径，或应用部署在服务器非根路径下。一般在应用的入口如 `App.svelte` 或 `+layout.svelte` 中配置 Context，例如：

```svelte
<!-- App.svelte/+layout.svelte -->
<script>
	import { setContext } from 'svelte'; // 引入 setContext

	setContext('STDF-global-icon-svg-path', 'webapps/svelte_demo/fonts/symbol.svg'); // 设置 svg 文件路径
</script>
```
