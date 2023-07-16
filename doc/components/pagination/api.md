## Pagination Props

| 属性             | 类型    | 默认值                                   | 可选值                              | 必传 | 说明                 |
| ---------------- | ------- | ---------------------------------------- | ----------------------------------- | ---- | -------------------- |
| total            | Number  | 0                                        | -                                   | Y    | 总条数。             |
| pageSize         | Number  | 10                                       | -                                   | N    | 每页条数。           |
| current          | Number  | 1                                        | -                                   | N    | 当前页。             |
| maxShowPage      | Number  | 7                                        | 5/7/9/11                            | N    | 最大显示页码数。     |
| radius           | String  | 'md'                                     | 'base'/'md'/'lg'/'xl'/'full'/'none' | N    | 圆角风格。           |
| type             | String  | 'bold'                                   | 'border'/'block'/'bold'             | N    | 高亮页码类型。       |
| pageCol          | Number  | 3                                        | -                                   | N    | 省略页码列数。       |
| showNextOmitPage | Boolean | false                                    | true/false                          | N    | 是否显示后省略页码。 |
| showPreOmitPage  | Boolean | false                                    | true/false                          | N    | 是否显示前省略页码。 |
| injClass         | String  | ''                                       | Class                               | N    | 注入 CSS 名称。。    |
| noDataText       | String  | 当前语言的 common.noData                 | -                                   | N    | 无数据显示文本。     |
| onePageText      | String  | 当前语言的 pagination.defaultOnlyOnePage | -                                   | N    | 仅一页显示文本。     |
| continuous       | Boolean | false                                    | true/false                          | N    | 是否是连续模式。     |

## Pagination Events

| 名称   | 参数                                      | 描述               |
| ------ | ----------------------------------------- | ------------------ |
| change | event：事件对象，其中 detail 为当前页码。 | 页码变化时触发。   |
| next   | event：事件对象，其中 detail 为当前页码。 | 点击下一页时触发。 |
| pre    | event：事件对象，其中 detail 为当前页码。 | 点击上一页时触发。 |
