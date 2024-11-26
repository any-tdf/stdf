## Avatar Props

| 属性     | 类型                                                      | 默认值   | 必传 | 说明                 |
| -------- | --------------------------------------------------------- | -------- | ---- | -------------------- |
| image    | `string`                                                  | `''`     | N    | 图片路径。           |
| alt      | `string`                                                  | `''`     | N    | 替换文本，建议单字。 |
| icon     | [`Icon`](https://stdf.design/#/components?nav=icon&tab=1) | `{}`     | N    | 替换图标。           |
| altSize  | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                            | `'md'`   | N    | 替换文本大小。       |
| radius   | `'none'\|'base'\|'xl'\|'2xl'\|'3xl'\|'full'`              | `'base'` | N    | 圆角风格。           |
| size     | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`   | N    | 头像框大小。         |
| imgSize  | `'s'\|'m'\|'l'`                                           | `'l'`    | N    | 头像图片大小。       |
| line     | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'none'` | N    | 边框风格。           |
| injClass | `string`                                                  | `''`     | N    | 注入 CSS 名称。      |

## Avatar Events

| 名称    | 类型         | 参数 | 描述       |
| ------- | ------------ | ---- | ---------- |
| onclick | `() => void` | -    | 点击触发。 |

## Avatars Props

| 名称      | 类型                                                                                        | 默认值    | 必传 | 说明                             |
| --------- | ------------------------------------------------------------------------------------------- | --------- | ---- | -------------------------------- |
| data      | `Avatar[]`                                                                                  | `[]`      | N    | 由 Avatar Props 组成的头像数据。 |
| radius    | `'none'\|'base'\|'xl'\|'2xl'\|'3xl'\|'full'`                                                | `'full'`  | N    | 圆角风格。                       |
| size      | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`                                               | `'md'`    | N    | 头像框大小。                     |
| compact   | `number`                                                                                    | `5`       | N    | 紧凑程度，越大越紧凑。           |
| lineWidth | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                                                              | `'3'`     | N    | 边框粗细。                       |
| reverse   | `boolean`                                                                                   | `false`   | N    | 是否反向。                       |
| max       | `number`                                                                                    | `10`      | N    | 最大最大显示数量。               |
| top       | `'totle'\|'add'\|null`\|[`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | `'totle'` | N    | 顶层内容。                       |
| injClass  | `string`                                                                                    | `''`      | N    | 注入 CSS 名称。                  |

## Avatars Events

| 名称    | 类型         | 参数 | 描述             |
| ------- | ------------ | ---- | ---------------- |
| onclick | `() => void` | -    | 点击头像组触发。 |
