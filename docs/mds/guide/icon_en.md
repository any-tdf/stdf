> Starting from v1.1.0, STDF supports using icons via [Iconify](https://iconify.design).

## SVG Sprites

The STDF icon component's `type` defaults to `symbol`, which uses SVG Sprites technology to display icons. This reduces HTTP requests and improves page performance.

STDF's SVG Sprites use [SVG symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol). The principle is similar to CSS Sprite technology, where SVG files in the project are concatenated into a single file, and the corresponding icon is displayed through the use element in SVG.

You can think of it as a font, except this font is composed of SVG and can be controlled for color, size, and other properties through CSS. Therefore, if you need to use large or complex icons with multiple colors, it's recommended to import SVG files separately rather than putting them in symbols.

Compatibility is also completely fine. Refer to [MDN symbol](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol#browser_compatibility).

STDF has developed a Rollup/Vite plugin for merging SVG files in projects into SVG Sprites. For specific usage, please refer to [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon). Due to the diversity of SVG formats, there may be cases where rollup-plugin-stdf-icon doesn't process accurately. Please submit an issue on [GitHub](https://github.com/any-tdf/stdf/issues) with specific details about the SVG file.

Alternatively, you can use other SVG Sprites synthesis tools or manual synthesis, or ask designers to provide corresponding SVG Sprites along with design materials. Or use icon libraries like [Remix Icon](https://remixicon.com), which allows you to directly download multiple selected icons as SVG Sprites.

## Iconify

STDF can also use icons via [Iconify](https://iconify.design) by setting `type` to `iconify` or `iconify-color`.

Iconify has many usage methods. STDF chooses the Tailwind 4 plugin approach, which has minimal code intrusion. Refer to [Iconify for Tailwind CSS](https://iconify.design/docs/usage/css/tailwind/tailwind4). The usage in STDF is as follows:

1. Install the Tailwind 4 plugin

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

2. Install the required open-source icon libraries

> Installing `@iconify/json` is strongly discouraged as the full icon library has a very large size.

Install icon libraries on demand. For example, use the following commands to install Solar and Carbon icon libraries:

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

3. Configure the plugin in your project's entry CSS file and set the icon library prefixes you need to use. Refer to [Clean selectors](https://iconify.design/docs/usage/css/tailwind/tailwind4/#clean-selectors).

```css
@plugin "@iconify/tailwind4" {
	prefixes: solar, carbon;
}
```

4. Use icons in components

```svelte
<Icon type="iconify" name="solar--cat-broken" />
```

The difference between using `iconify` and `iconify-color` is that `iconify` renders icons as mask images, where the icon color is the text color. Therefore, like using `symbol`, you can set the `theme` property to control the icon to follow the theme color, or set text color to customize the color. This is generally used for monochrome icons. While `iconify-color` renders icons as background images, you cannot set the `theme` property or customize colors with text color. This is generally used for multi-color icons, such as fluent-color icon libraries. Refer to [extra-class-name](https://iconify.design/docs/usage/css/tailwind/tailwind4/#extra-class-name).

## When to choose the symbol approach?

When the icons you use are designed by your team, or are not in iconify's open-source icon libraries, or you want to maintain icons manually, or the icons are already SVG Sprites, it's recommended to use the SVG Sprites approach.
