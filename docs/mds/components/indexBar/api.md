## IndexBar Props

| 名称          | 类型                       | 默认值     | 必传 | 说明                             |
| ------------- | -------------------------- | ---------- | ---- | -------------------------------- |
| data          | `IndexBarItem[]`           | `[]`       | Y    | 索引数据组成的数组。             |
| current       | `number`                   | `0`        | N    | 当前激活的索引值。               |
| top           | `number`                   | `0`        | N    | 索引内容区域距离文档顶部的距离。 |
| height        | `number`                   | `100`      | Y    | 索引内容区域高度。               |
| radius        | `'none'\|'middle'\|'full'` | `'middle'` | N    | 圆角风格。                       |
| scrollAlign   | `boolean`                  | `true`     | N    | 是否开启滚动自动对齐。           |
| titleInjClass | `string`                   | `''`       | N    | 索引组标题注入 CSS。             |
| textInjClass  | `string`                   | `''`       | N    | 索引项文本注入 CSS。             |

## IndexBar Events

| 名称         | 类型                                                                              | 参数                                                                                                                | 描述               |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------ |
| onclickChild | `(index: number, group: IndexBarItem, childIndex: number, child: string) => void` | index - 点击项的父级组索引值<br />group - 点击项的父级组内容<br />childIndex - 点击项索引值<br />child - 点击项内容 | 点击索引项时触发。 |

## IndexBarItem Props

| 名称   | 类型       | 默认值 | 必传 | 说明             |
| ------ | ---------- | ------ | ---- | ---------------- |
| index  | `string`   | `''`   | Y    | 索引值。         |
| title  | `string`   | `''`   | Y    | 标题。           |
| child  | `string[]` | `[]`   | Y    | 子项组成的数组。 |
| height | `number`   | `0`    | N    | 子项高度。       |
