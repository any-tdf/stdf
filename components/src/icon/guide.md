## 背景

STDF 使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

## 内置说明

STDF 部分组件内使用的图标源自 [Remix Icon 图标库](https://remixicon.com)（[GitHub](https://github.com/Remix-Design/remixicon)），在此表示感谢 🙏🏻🙏🏻。

**如果使用这些组件，请确保项目的 symbol.svg 中包含了对应图标。**

具体使用如下：

| 图标名称                      | 所属组件         |
| ----------------------------- | ---------------- |
| ri-user-3-line                | Avatar           |
| ri-arrow-right-s-line         | Cell / NoticeBar |
| ri-checkbox-fill              | Checkbox         |
| ri-checkbox-line              | Checkbox         |
| ri-close-circle-fill          | Input            |
| ri-arrow-left-s-line          | NavBar           |
| ri-volume-down-line           | NoticeBar        |
| ri-close-line                 | NoticeBar        |
| ri-radio-button-line          | Radio            |
| ri-checkbox-blank-circle-line | Radio            |
| ri-star-fill                  | Rate             |
| ri-image-2-fill               | Skeleton         |
| ri-movie-2-fill               | Skeleton         |
| ri-code-box-fill              | Skeleton         |
| ri-qr-code-fill               | Skeleton         |
| ri-barcode-fill               | Skeleton         |
| ri-checkbox-circle-line       | Toast            |
| ri-close-circle-line          | Toast            |
| ri-error-warning-line         | Toast            |
| ri-information-line           | Toast            |

可到 `node_modules/stdf/assets/fonts/stdf.remixicon.symbol.svg` 查看由这些图标组成的 SVG Sprites。

可到 `node_modules/stdf/assets/svg_base/` 查看这些图标的 SVG 源文件。

目前前端打包工具无论是 Webpack 还是 Vite 或者 Rollup 都有对应的 SVG Sprites 合成插件，请自行选择或手动合成。

## 图标名称

name 为 'slot' 表示使用插槽渲染，其他字符如 'ri-home-line' 使用 symbol.svg 中对应的 SVG 图标渲染。

## 图标颜色

如果 theme 不传或传入 false，图标颜色将继承自父级文字颜色，传入 true 图标颜色会根据主题色变化（包含亮色与暗色模式）；如果要实现自定义颜色，而颜色又同时包含亮色与暗色，建议使用 CSS 注入或插槽渲染，在 injClass 或插槽中分别配置亮色与暗色，请查看示例。

## 颜色优先级

颜色优先级 slot > injClass > theme > 默认。

## 偏移量

欧洲和西亚文字排版中是有一条基准线的，东亚文字没有基线，参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/baseline)。但由于不同系统不同字体中的差异，可能导致图标与文字一起排列时上下无法对齐，可以通过偏移量来微调。或者某些图标由于视觉重心的差异，需要排版时给出偏移量来保持视觉平衡。

## CSS 注入

通过 injClass 参数可以向组件内部最外层元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性。因为 CSS 注入于最后，此时最外层元素若已有同属性 CSS 将会以 injClass 为准，这也是通过 injClass 实现自定义图标颜色的原因。

## 插槽

可放入任何元素（甚至 Icon 组件自身），当然主要用于自定义图标或自定义图标颜色，如将自定义 SVG 放入 Icon 组件，请注意 SVG 的 viewBox、height、width 关系与 display 属性。此时图标内容取决于传入的元素，Props 中的 name、size、theme 等参数都将失效。通过插槽将使组件内容有更多自定义可能性。
