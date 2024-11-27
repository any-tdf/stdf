## Background

STDF uses SVG Sprites technology for icons, which reduces HTTP requests and improves page performance.

STDF's SVG Sprites uses [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol), with a principle similar to CSS Sprite technology - combining project SVG files into one file and displaying icons through the SVG use element.

You can think of it as a font, except it's composed of SVGs and can be styled with CSS properties like color and size. For large or complex icons with multiple colors, it's recommended to import SVG files separately rather than including them in the symbol.

Browser compatibility is not an issue. See [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility).

## rollup-plugin-stdf-icon

STDF has developed a Rollup/Vite plugin to merge SVG files into SVG Sprites. For usage details, see [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon). Due to SVG format variations, if you encounter any issues with rollup-plugin-stdf-icon processing, please submit an issue on [GitHub](https://github.com/any-tdf/stdf/issues) with specific SVG file details.

You can also use other SVG Sprites generation tools, manual compilation, or request SVG Sprites from designers along with design assets. Icon libraries like Remix Icon allow direct download of selected icons as SVG Sprites.

## Built-in Icons

Some STDF components use icons from [Remix Icon](https://remixicon.com) ([GitHub](https://github.com/Remix-Design/remixicon)). We express our gratitude 🙏🏻🙏🏻.

**When using these components, ensure your project's symbol.svg includes the corresponding icons.**

For details, refer to [STDF-Guide-Icon](https://stdf.design/#/guide/icon).

You can find SVG source files in `node_modules/stdf/assets/svg_base/`.

## Icon Names

When a Snippet is passed, the icon renders using the passed element. Other strings like 'ri-home-line' render the corresponding SVG icon from symbol.svg.

## Icon Colors

Without theme prop or when set to false, icons inherit parent text color. When true, icons follow theme colors (including light/dark modes). For custom colors with light/dark mode support, use CSS injection or Snippet rendering with injClass or Snippet configured for both modes. See examples.

## Color Priority

Color priority: Snippet > injClass > theme > default.

## Vertical Offset

European and West Asian typography has a baseline, while East Asian text doesn't. See [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/baseline). Due to differences in system fonts, icons may misalign with text. Use the offset to fine-tune alignment or balance visual weight of icons.

## CSS Injection

The injClass parameter injects CSS classes (not limited to Tailwind CSS) into the component's outer element, enabling more style customization. Since CSS injection occurs last, any existing CSS properties on the outer element will be overridden by injClass, which enables custom icon colors.

## Snippet

Can contain any element (even Icon component itself), primarily used for custom icons or colors. When placing custom SVGs in Icon component, note the relationships between SVG viewBox, height, width, and display property. Icon content depends on the passed element, and Props like name, size, theme become ineffective. Snippets enable more customization possibilities for component content.

## Global Injection Icon SVG Path

STDF Icon component uses SVG file path configuration, which is suitable for a one-time configuration of the global SVG symbol path or the application being deployed on a non-root server path. Usually, the Context is configured in the entry of the application, such as `App.svelte` or `+layout.svelte`, for example:

```svelte
<!-- App.svelte/+layout.svelte -->
<script>
	import { setContext } from 'svelte'; // Import setContext

	setContext('STDF-global-icon-svg-path', 'webapps/svelte_demo/fonts/symbol.svg'); // Set the SVG file path
</script>
```
