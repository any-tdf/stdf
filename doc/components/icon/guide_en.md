## Background

STDF uses SVG Sprite technology for icons, which can reduce HTTP requests and improve page performance.

STDF's SVG Sprites use the [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) technique, which is similar in principle to the Sprite technique in CSS. The SVGs in the project are concatenated into one file, and the corresponding icons are displayed by using the `use` element in SVG.

Compatibility is not a problem either. Refer to [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility).

## Built-in Explanation

Icons used in some STDF components are sourced from the [Remix Icon Library](https://remixicon.com) ([GitHub](https://github.com/Remix-Design/remixicon)), and thanks for their contributions 🙏🏻🙏🏻.

**If you use these components, make sure that the corresponding icons are included in the `symbol.svg` file.**

Usage is as follows:

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

You can go to the `node_modules/stdf/assets/fonts/stdf.remixicon.symbol.svg` to view the SVG Sprites composed of these icons.

You can go to the `node_modules/stdf/assets/svg_base/` to view svg source file of these icons.

Currently, whether it is Webpack, Vite, or Rollup for front-end packaging tools, there are corresponding SVG Sprite synthesis plugins. You can choose one or combine it manually.

## Icon Name

If the `name` is `'slot'`, use a slot to render, otherwise use the corresponding SVG icon in `symbol.svg` to render.

## Icon Color

If `theme` is not passed or passed in as `false`, the icon color will inherit the parent's text color. If `true` is passed, the icon color will change according to the theme (including light and dark modes). If you want to achieve a custom color and the color includes both light and dark modes, it is recommended to use CSS injection or slot rendering, and configure the light and dark colors in `injClass` or slots separately. Please refer to the example.

## Color Priority

Color priority: slot > injClass > theme > default.

## Offset

In European and West Asian typesetting, there is a baseline, but there is no baseline in East Asian typesetting, refer to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/baseline). However, due to differences in fonts in different systems, it may cause misalignment when icons are arranged together with text. Adjust the offset to fine-tune these alignments. Or, for some icons, due to differences in visual gravity, an offset is required when laying out to maintain visual balance.

## CSS Injection

The `injClass` parameter can be used to inject a CSS class name (not limited to Tailwind CSS) into the outermost element of the component, which will give the component more customizability in terms of style. Because CSS injection comes last, if there are existing CSS properties on the outermost element, `injClass` will override them. This is also the reason for using `injClass` to customize the icon color.

## Slot

Any element can be inserted (even the Icon component itself), but mainly used for customizing icons or icon colors, such as inserting custom SVGs into the Icon component. Please note the relationship between the viewBox, height, and width of the SVG and the display property. The icon content depends on the element passed in. The parameters such as name, size, and theme in Props will be invalid. The slot will give the component more customizability in terms of content.
