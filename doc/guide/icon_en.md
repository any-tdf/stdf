## Background

STDF uses SVG Sprites technology to display icons, which reduces HTTP requests and improves page performance.

STDF's SVG Sprites uses [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol), which is similar to CSS Sprite technology. STDF combines SVG files into one file and uses the `use` element in SVG to display the corresponding icon.

Compatibility is not an issue either. Please refer to [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility).

## Built-in

Some icons used within STDF components are sourced from [Remix Icon Library](https://remixicon.com) ([GitHub](https://github.com/Remix-Design/remixicon)). Thanks to them 🙏🏻🙏🏻.

**If you use these components, please ensure that your `symbol.svg` file contains the corresponding icon.**

You can use them as follows:

| Icon Name                     | Component        |
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

Currently, most front-end build tools, such as Webpack, Vite, or Rollup, have corresponding SVG Sprite plugins. Please choose one or manually combine them.
