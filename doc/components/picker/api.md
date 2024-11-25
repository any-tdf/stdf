## Picker Props

| 名称               | 类型                                                        | 默认值                           | 必传 | 说明                                       |
| ------------------ | ----------------------------------------------------------- | -------------------------------- | ---- | ------------------------------------------ |
| visible            | `boolean`                                                   | `false`                          | N    | 是否显示。                                 |
| datas              | `PickerDatas[]\|PickerDataChild[]`                          | `[]`                             | Y    | 所有列数据，参考 Picker datas Props。      |
| autoScrollToLast   | `boolean`                                                   | `true`                           | N    | 是否自动滚动到上次的选中项。               |
| cancelText         | `string`                                                    | 当前语言的 picker.defaultCancel  | N    | 取消选项文本。                             |
| confirmText        | `string`                                                    | 当前语言的 picker.defaultConfirm | N    | 确定选项文本。                             |
| title              | `string`                                                    | 当前语言的 picker.defaultTitle   | N    | 中间标题文本。                             |
| isLinkage          | `boolean`                                                   | `false`                          | N    | 是否多级联动。                             |
| linkageInitIndexs  | `number[]`                                                  | `[]`                             | N    | 多级联动时，设置初始选中项。               |
| linkageShowRows    | `number[]`                                                  | `[]`                             | N    | 多级联动时，设置每列显示行数。             |
| linkageFlexs       | `number[]`                                                  | `[]`                             | N    | 多级联动时，设置每列的宽度。               |
| linkageAligns      | `('left'\|'center'\|'right')[]`                             | `[]`                             | N    | 多级联动时，设置每列的对齐方式。           |
| linkageLabelKeys   | `string[]`                                                  | `[]`                             | N    | 多级联动时，自定义每列 label 的 Key。      |
| linkageChildrenKey | `string`                                                    | `'children'`                     | N    | 多级联动时，自定义上下级 children 的 key。 |
| popup              | [`Popup`](https://stdf.design/#/components?nav=popup&tab=1) | `{}`                             | N    | 弹出层参数。                               |

## Picker Events

| 名称      | 类型                                                             | 参数                                                                        | 描述                 |
| --------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------- |
| onclose   | `() => void`                                                     |                                                                             | 关闭时触发。         |
| oncancel  | `() => void`                                                     |                                                                             | 点击左侧取消时触发。 |
| onconfirm | `(items: { [key: string]: string }[], indexs: number[]) => void` | items - 选定多列数据组成的数组；<br />indexs - 选定多列数据索引组成的数组。 | 点击右侧确定时触发。 |

## PickerDatas Props

| 名称         | 类型                          | 默认值     | 必传 | 说明                  |
| ------------ | ----------------------------- | ---------- | ---- | --------------------- |
| data         | `{ [key: string]: string }[]` | `[]`       | Y    | 列数据。              |
| showRow      | `3`\|`5`\|`7`                 | `5`        | N    | 列显示行数。          |
| initIndex    | `number`                      | `0`        | N    | 列初始选中项。        |
| useAnimation | `boolean`                     | `true`     | N    | 滚动是否使用动画。    |
| labelKey     | `string`                      | `'label'`  | N    | 自定义 label 的 key。 |
| flex         | `number`                      | `1`        | N    | 多列时此列宽度。      |
| align        | `'left'\|'center'\|'right'`   | `'center'` | N    | 多列时此列对齐方式。  |

## PickerDataChild Props

| 名称          | 类型                                   | 默认值    | 必传 | 说明                  |
| ------------- | -------------------------------------- | --------- | ---- | --------------------- |
| children      | `PickerDatas[]`                        | `[]`      | Y    | 子数据。              |
| [key: string] | `string\|PickerDataChild[]\|undefined` | `'label'` | N    | 自定义 label 的 key。 |
|               |
