## Pagination Props

| 名称             | 类型                                       | 默认值                                   | 必传 | 说明                 |
| ---------------- | ------------------------------------------ | ---------------------------------------- | ---- | -------------------- |
| total            | `number`                                   | `0`                                      | Y    | 总条数。             |
| pageSize         | `number`                                   | `10`                                     | N    | 每页条数。           |
| current          | `number`                                   | `1`                                      | N    | 当前页。             |
| maxShowPage      | `5\|7\|9\|11`                              | `7`                                      | N    | 最大显示页码数。     |
| radius           | `'none'\|'base'\|'md'\|'lg'\|'xl'\|'full'` | `'md'`                                   | N    | 圆角风格。           |
| type             | `'border'\|'block'\|'bold'`                | `'bold'`                                 | N    | 高亮页码类型。       |
| pageCol          | `number`                                   | `3`                                      | N    | 省略页码列数。       |
| showNextOmitPage | `boolean`                                  | `false`                                  | N    | 是否显示后省略页码。 |
| showPreOmitPage  | `boolean`                                  | `false`                                  | N    | 是否显示前省略页码。 |
| injClass         | `string`                                   | `''`                                     | N    | 注入 CSS 名称。。    |
| noDataText       | `string`                                   | 当前语言的 common.noData                 | N    | 无数据显示文本。     |
| onePageText      | `string`                                   | 当前语言的 pagination.defaultOnlyOnePage | N    | 仅一页显示文本。     |
| continuous       | `boolean`                                  | `false`                                  | N    | 是否是连续模式。     |

## Pagination Events

| 名称     | 类型                        | 参数               | 描述               |
| -------- | --------------------------- | ------------------ | ------------------ |
| onchange | `(current: number) => void` | current - 当前页码 | 页码变化时触发。   |
| onnext   | `(current: number) => void` | current - 当前页码 | 点击下一页时触发。 |
| onpre    | `(current: number) => void` | current - 当前页码 | 点击上一页时触发。 |
