## 背景

STDF 使用 SVG Sprites 技术使用图标，这样可以减少 HTTP 请求，提高页面性能。

STDF 的 SVG Sprites 是使用 [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)，大致原理类似于 CSS 中的 Sprite 技术，将项目中的 SVG 拼接在一个文件内，通过 SVG 中的 use 元素找到对应的图标来显示。

你可以把它类比看成是一种字体，只不过这种字体是由 SVG 组成的，而且可以通过 CSS 控制颜色、大小等属性。所以如果用到比较大或者有多种颜色等比较复杂的图标，建议单独引入 SVG 文件使用，不要放在 symbol 中。

兼容性方面也完全没问题。参考 [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility)。

## rollup-plugin-stdf-icon

STDF 已经开发了一个 Rollup/Vite 插件，用于将项目中的 SVG 文件合并成 SVG Sprites，具体使用请参考 [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon)，由于 svg 格式的多样性，可能存在 rollup-plugin-stdf-icon 处理不准确的情况，请到 [GitHub](https://github.com/dufu1991/stdf/issues) 提 issue，注明 svg 文件的具体情况。

或使用其他 SVG Sprites 合成工具或手动合成，也可以请设计师提供设计物料时一并提供对应的 SVG Sprites。或类似 Remix Icon 这样的图标库，可以直接将选定的多个图标下载为 SVG Sprites。

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
| ri-delete-back-2-line         | NumKeyboard      |
| ri-skip-down-line             | NumKeyboard      |
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

可到 `node_modules/stdf/assets/fonts/stdf.remixicon.symbol.svg` 查看由这些图标组成的 SVG Sprites。

可到 `node_modules/stdf/assets/svg_base/` 查看这些图标的 SVG 源文件。
