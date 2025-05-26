> 从 v1.1.0 开始，STDF 支持 [Iconify](https://iconify.design) 方式使用图标。

## 使用方式

参考 [Icon](https://stdf.design/guide/icon)。

## 图标名称

当传入 Snippet 时表示图标内部使用传入的元素渲染，其他字符如 'ri-home-line' 使用 symbol.svg 中对应的 SVG 图标渲染；当使用 iconify 时，name 为 Iconify 的规则图标名称，如 'solar--cat-broken'。

## 图标颜色

如果 theme 不传或传入 false，图标颜色将继承自父级文字颜色，传入 true 图标颜色会根据主题色变化（包含亮暗模式）；如果要实现自定义颜色，可以使用 `iconify-color`，或者使用 CSS 注入或 Snippet 渲染，在 injClass 或 Snippet 中分别配置亮暗模式，请查看示例。

## 图标大小

图标默认大小为 24px，当传入 width 或 height 时，图标会根据传入的值设置宽高，否则使用 size 属性设置宽高，即 `size` 属性优先级低于 `width` 和 `height`。

## 颜色优先级

颜色优先级 Snippet > injClass > theme > 默认。

## 偏移量

欧洲和西亚文字排版中是有一条基准线的，东亚文字没有基线，参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/baseline)。但由于不同系统不同字体中的差异，可能导致图标与文字一起排列时上下无法对齐，可以通过偏移量来微调。或者某些图标由于视觉重心的差异，需要排版时给出偏移量来保持视觉平衡。

## CSS 注入

通过 injClass 参数可以向组件内部外层元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性。因为 CSS 注入于最后，此时最外层元素若已有同属性 CSS 将会以 injClass 为准，这也是通过 injClass 实现自定义图标颜色的原因。

## Snippet

可放入任何元素（甚至 Icon 组件自身），当然主要用于自定义图标或自定义图标颜色，如将自定义 SVG 放入 Icon 组件，请注意 SVG 的 viewBox、height、width 关系与 display 属性。此时图标内容取决于传入的元素，Props 中的 name、size、theme 等参数都将失效。通过 Snippet 将使组件内容有更多自定义可能性。

## 全局注入图标 svg 路径

STDF Icon 组件使用 Svg 文件路径配置，适用于一次性配置全局 SVG symbol 路径，或应用部署在服务器非根路径下。一般在应用的入口如 `App.svelte` 或 `+layout.svelte` 中配置 Context，例如：

```svelte
<!-- App.svelte/+layout.svelte -->
<script>
	import { setContext } from 'svelte'; // 引入 setContext

	setContext('STDF-global-icon-svg-path', 'webapps/svelte_demo/fonts/symbol.svg'); // 设置 svg 文件路径
</script>
```
