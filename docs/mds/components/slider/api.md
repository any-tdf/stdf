## Slider Props

| 名称       | 类型                        | 默认值    | 必传 | 说明             |
| ---------- | --------------------------- | --------- | ---- | ---------------- |
| value      | `number`                    | `40`      | N    | 当前值。         |
| step       | `number`                    | `1`       | N    | 步长。           |
| minRange   | `number`                    | `0`       | N    | 可选最小值。     |
| maxRange   | `number`                    | `100`     | N    | 可选最大值。     |
| isRange    | `boolean`                   | `false`   | N    | 是否为区间选择。 |
| startValue | `number`                    | `20`      | N    | 区间选择开始值。 |
| endValue   | `number`                    | `60`      | N    | 区间选择结束值。 |
| showTip    | `'always'\|'never'\|'touch'` | `'touch'` | N    | 提示显示方式。   |
| radius     | `'none'\|'sm'\|'xl'\|'full'` | `'full'`  | N    | 圆角风格。       |
| lineBlock  | `boolean`                   | `false`   | N    | 滑块是否为线框。 |
| disabled   | `boolean`                   | `false`   | N    | 是否禁用。       |
| readonly   | `boolean`                   | `false`   | N    | 是否只读。       |

## Slider Events

| 名称     | 类型                                  | 参数                                      | 描述             |
| -------- | ------------------------------------- | ----------------------------------------- | ---------------- |
| onchange | `(values: [number, number?]) => void` | values - 当前取值数组（区间选择时两项）。 | 取值变化时触发。 |

## Slider Snippets

| 名称     | 类型                                                                | 参数 | 说明                     |
| -------- | ------------------------------------------------------------------- | ---- | ------------------------ |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入将渲染进度区域内容。 |
