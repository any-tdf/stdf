## Rate Props

| 名称      | 类型                                                                         | 默认值      | 必传 | 说明                  |
| --------- | ---------------------------------------------------------------------------- | ----------- | ---- | --------------------- |
| value     | `number`                                                                     | `4`         | N    | 选定值。              |
| total     | `number`                                                                     | `5`         | N    | 总分。               |
| width     | `number`                                                                     | `24`        | N    | 单个内容宽度（px） 。 |
| height    | `number`                                                                     | `24`        | N    | 单个内容高度（px）。  |
| opacity   | `'0.05'\|'0.1'\|'0.2'\|'0.3'\|'0.4'\|'0.5'\|'0.6'\|'0.7'\|'0.8'\|'0.9'\|'1'` | `0.2`       | N    | 未选中内容透明度。   |
| space     | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                                               | `'3'`       | N    | 内容间距。            |
| half      | `boolean`                                                                    | `false`     | N    | 是否允许半选。        |
| zero      | `boolean`                                                                    | `false`     | N    | 是否允许 0 分。      |
| vertical  | `boolean`                                                                    | `false`     | N    | 是否垂直半选。       |
| disabled  | `boolean`                                                                    | `false`     | N    | 是否禁用。            |
| readonly  | `boolean`                                                                    | `false`     | N    | 是否只读。            |
| custom    | `boolean`                                                                    | `false`     | N    | 是否自定义内容。      |
| animation | `'current'\|'active'\|null`                                                  | `'current'` | N    | 点击动画类型。        |

## Rate Events

| 名称    | 类型                      | 参数               | 描述       |
| ------- | ------------------------- | ------------------ | ---------- |
| onclick | `(value: number) => void` | value - 当前 value | 点击触发。 |

## Rate Snippets

| 名称     | 类型                                                                | 参数 | 说明                     |
| -------- | ------------------------------------------------------------------- | ---- | ------------------------ |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 将作为 Rate 的单个内容。 |
