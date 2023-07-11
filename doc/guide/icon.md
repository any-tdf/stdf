## 背景

STDF 使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

## 内置

STDF 部分组件内使用的图标源自 [Remix Icon 图标库](https://remixicon.com)（[GitHub](https://github.com/Remix-Design/remixicon)），在此表示感谢 🙏🏻🙏🏻。

**如果使用这些组件，请确保项目的 symbol.svg 中包含了对应图标。**

具体使用如下：

| 名称                          | 所属组件         |
| ----------------------------- | ---------------- |
| ri-user-3-line                | Avatar           |
| ri-arrow-right-s-line         | Cell / NoticeBar |
| ri-checkbox-fill              | Checkbox         |
| ri-checkbox-line              | Checkbox         |
| ri-close-circle-fill          | Input            |
| ri-arrow-left-s-line          | NavBar           |
| ri-volume-down-line           | NoticeBar        |
| ri-close-line                 | NoticeBar        |
| ri-more-line                  | Pagination       |
| ri-more-fill                  | Pagination       |
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

目前前端打包工具无论是 Webpack 还是 Vite 或者 Rollup 都有对应的 SVG Sprites 合成插件，请自行选择或手动合成。
