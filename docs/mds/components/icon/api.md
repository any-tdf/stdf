## Icon Props

| 名称     | 类型                                   | 默认值               | 必传 | 说明                                                             |
| -------- | -------------------------------------- | -------------------- | ---- | ---------------------------------------------------------------- |
| type     | `'iconify'\|'iconify-color'\|'symbol'` | `'symbol'`           | N    | 图标类型。                                                       |
| name     | `string`                               | `''`                 | N    | 图标名称。                                                       |
| size     | `number`                               | `24`                 | N    | 图标大小。                                                       |
| width    | `number`                               | `0`                  | N    | 图标宽度。                                                       |
| height   | `number`                               | `0`                  | N    | 图标高度。                                                       |
| theme    | `boolean`                              | `false`              | N    | 是否跟随主题色（包含亮暗模式），type 为 `iconify-color` 时无效。 |
| alpha    | `number`                               | `1`                  | N    | 图标透明度。                                                     |
| top      | `number`                               | `0`                  | N    | 上下偏移量。                                                     |
| injClass | `string`                               | `''`                 | N    | 注入 CSS 名称。                                                  |
| path     | `string`                               | `'fonts/symbol.svg'` | N    | 项目存放 symbol.svg 的路径。                                     |

## Icon Snippets

| 名称     | 类型                                                                | 参数 | 说明                                      |
| -------- | ------------------------------------------------------------------- | ---- | ----------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 自定义内容，一般是 Icon 组件或 SVG 元素。 |
