## Background

STDF uses SVG Sprites technology for icons, which helps reduce HTTP requests and improve page performance.

STDF's SVG Sprites use [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol), which is similar to CSS Sprite technique. It combines SVG files in the project into a single file and uses the `<use>` element in SVG to display the corresponding icons.

You can think of it as a type of font, except that it is composed of SVG and can be styled using CSS properties such as color and size. Therefore, for larger or more complex icons with multiple colors, it is recommended to use individual SVG files instead of placing them in the symbol.

Compatibility is not an issue. Refer to [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility) for more information.

## rollup-plugin-stdf-icon

STDF has developed a Rollup/Vite plugin called rollup-plugin-stdf-icon, which combines SVG files in the project into SVG Sprites. Please refer to [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon) for specific usage. Due to the diversity of SVG formats, there may be cases where rollup-plugin-stdf-icon does not handle them accurately. In such cases, please raise an issue on [GitHub](https://github.com/any-tdf/stdf/issues) and provide details about the SVG file.

Alternatively, you can use other SVG Sprites synthesis tools or manually combine them. You can also ask the designer to provide the corresponding SVG Sprites along with the design materials.Or, for icon libraries like Remix Icon, you can directly download a selection of multiple icons as SVG Sprites.

## Built-in Icons

Some of the icons used in STDF components are sourced from [Remix Icon Library](https://remixicon.com) ([GitHub](https://github.com/Remix-Design/remixicon)). Many thanks to them! 🙏🏻🙏🏻

**If you are using these components, please make sure that the `symbol.svg` file in your project includes the corresponding icons.**

Here are the icons and their corresponding components:

| Icon Name                     | Component        |
| ----------------------------- | ---------------- |
| ri-user-3-line                | Avatar           |
| ri-user-add-line              | Avatars          |
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
| ri-add-line                   | Stepper          |
| ri-subtract-line              | Stepper          |
| ri-checkbox-circle-line       | Toast            |
| ri-close-circle-line          | Toast            |
| ri-error-warning-line         | Toast            |
| ri-information-line           | Toast            |

You can find the SVG source files for these icons in `node_modules/stdf/assets/svg_base/`.
