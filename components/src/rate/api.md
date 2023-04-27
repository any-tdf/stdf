## Rate Props

| 属性      | 类型    | 默认值    | 可选值                    | 必传 | 说明                  |
| --------- | ------- | --------- | ------------------------- | ---- | --------------------- |
| value     | Number  | 4         | -                         | N    | 选定值。              |
| total     | Number  | 5         | -                         | N    | 总分 。               |
| width     | Number  | 24        | -                         | N    | 单个内容宽度（px） 。 |
| height    | Number  | 24        | -                         | N    | 单个内容高度（px）。  |
| opacity   | Number  | 0.2       | 0-1                       | N    | 未选中内容透明度 。   |
| space     | String  | '3'       | '0'/'1'/'2'/'3'/'4'/'8'   | N    | 内容间距。            |
| half      | Boolean | false     | true/false                | N    | 是否允许半选。        |
| zero      | Boolean | false     | true/false                | N    | 是否允许 0 分 。      |
| vertical  | Boolean | false     | true/false                | N    | 是否垂直半选 。       |
| disabled  | Boolean | false     | true/false                | N    | 是否禁用。            |
| readonly  | Boolean | false     | true/false                | N    | 是否只读。            |
| custom    | Boolean | false     | true/false                | N    | 是否自定义内容。      |
| animation | String  | 'current' | 'current'/'active'/'none' | N    | 点击动画类型。        |

## Rate Events

| 名称  | 参数                                          | 描述       |
| ----- | --------------------------------------------- | ---------- |
| click | event：事件对象，其中 detail 表示当前 value。 | 点击触发。 |

## Rate Slots

| 名称 | 说明                     |
| ---- | ------------------------ |
| -    | 将作为 Rate 的单个内容。 |
