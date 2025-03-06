## Switch Props

| 名称     | 类型                                                            | 默认值     | 必传 | 说明                                            |
| -------- | --------------------------------------------------------------- | ---------- | ---- | ----------------------------------------------- |
| active   | `boolean`                                                       | `false`    | N    | 开关状态。                                      |
| radius   | `'none'\|'middle'\|'full'`                                      | `'middle'` | N    | 圆角风格。                                      |
| inside   | `'state'\|'loading'\|[string,string]\|null`                     | `null`     | N    | 开关内部内容。                                  |
| injClass | `string`                                                        | `''`       | N    | 注入 CSS 名称。                                 |
| disabled | `boolean`                                                       | `false`    | N    | 是否禁用。                                      |
| async    | `boolean`                                                       | `false`    | N    | 是否异步。                                      |
| loading  | [`Loading`](https://stdf.design/#/components?nav=loading&tab=1) | `{}`       | N    | 加载组件参数，仅 inside 为 `'loading'` 时生效。 |

## Switch Events

| 名称     | 类型                        | 参数                    | 描述                 |
| -------- | --------------------------- | ----------------------- | -------------------- |
| onclick  | `() => void`                | -                       | 点击触发。           |
| onchange | `(active: boolean) => void` | active - 当前开关状态。 | 开关状态变化时触发。 |

## Switch Snippets

| 名称       | 类型                                                                | 参数 | 说明                       |
| ---------- | ------------------------------------------------------------------- | ---- | -------------------------- |
| trueChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 状态为开启时开关内部内容。 |
| falseChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 状态为关闭时开关内部内容。 |
