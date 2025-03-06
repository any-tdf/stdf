## Button Props

| 名称            | 类型                                                                          | 默认值    | 必传 | 说明                           |
| --------------- | ----------------------------------------------------------------------------- | --------- | ---- | ------------------------------ |
| fill            | `'base'\|'line'\|'lineLight'\|'lineTheme'\|'text'\|'textTheme'\|'colorLight'` | `'base'`  | N    | 填充模式。                     |
| state           | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N    | 状态色，theme 表示跟随主题色。 |
| radius          | `'none'\|'sm'\|'xl'\|'2xl'\|'full'`                                           | `'sm'`    | N    | 圆角风格。                     |
| size            | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N    | 尺寸。                         |
| line            | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N    | 边框风格。                     |
| heightOut       | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N    | 按钮外部高度。                 |
| heightIn        | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N    | 按钮高度。                     |
| injClass        | `string`                                                                      | `''`      | N    | 注入 CSS 名称。                |
| love            | `boolean`                                                                     | `false`   | N    | 是否开启关爱版。               |
| group           | `boolean`                                                                     | `false`   | N    | 是否使用按钮组。               |
| disabled        | `boolean`                                                                     | `false`   | N    | 是否禁用。                     |
| customSize      | `boolean`                                                                     | `false`   | N    | 是否自定义大小。               |
| customWidth     | `number`                                                                      | `0`       | N    | 自定义宽度。                   |
| customHeight    | `number`                                                                      | `0`       | N    | 自定义高度。                   |
| icon            | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1)\|`null`             | `null`    | N    | 图标参数。                     |
| loading         | [`Loading`](https://stdf.design/#/components?nav=loading&tab=1)\|`null`       | `null`    | N    | 加载参数。                     |
| disabledLoading | `boolean`                                                                     | `false`   | N    | 加载时是否禁用。               |

## Button Events

| 名称    | 类型         | 参数 | 描述       |
| ------- | ------------ | ---- | ---------- |
| onclick | `() => void` | -    | 点击触发。 |

## Button Snippets

| 名称     | 类型                                                                | 参数 | 说明       |
| -------- | ------------------------------------------------------------------- | ---- | ---------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 按钮内容。 |
