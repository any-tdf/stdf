## Picker Props

| 属性               | 类型    | 默认值                           | 可选值           | 必传 | 说明                                       |
| ------------------ | ------- | -------------------------------- | ---------------- | ---- | ------------------------------------------ |
| visible            | Boolean | false                            | true/false       | N    | 是否显示。                                 |
| datas              | Array   | []                               | -                | Y    | 所有列数据，参考 Picker datas Props。      |
| autoScrollToLast   | Boolean | true                             | true/false       | N    | 是否自动滚动到上次的选中项。               |
| cancelText         | String  | 当前语言的 picker.defaultCancel  | -                | N    | 取消选项文本。                             |
| confirmText        | String  | 当前语言的 picker.defaultConfirm | -                | N    | 确定选项文本。                             |
| title              | String  | 当前语言的 picker.defaultTitle   | -                | N    | 中间标题文本。                             |
| isLinkage          | Boolean | false                            | true/false       | N    | 是否多级联动。                             |
| linkageInitIndexs  | Array   | []                               | -                | N    | 多级联动时，设置初始选中项。               |
| linkageShowRows    | Array   | []                               | -                | N    | 多级联动时，设置每列显示行数。             |
| linkageFlexs       | Array   | []                               | -                | N    | 多级联动时，设置每列的宽度。               |
| linkageAligns      | Array   | []                               | -                | N    | 多级联动时，设置每列的对齐方式。           |
| linkageLabelKeys   | Array   | []                               | -                | N    | 多级联动时，自定义每列 label 的 Key。      |
| linkageChildrenKey | String  | 'children'                       | -                | N    | 多级联动时，自定义上下级 children 的 key。 |
| popup              | Object  | {}                               | 参考 Popup Props | N    | 弹出层参数。                               |

## Picker datas Props

| 属性         | 类型    | 默认值   | 可选值                  | 必传 | 说明                  |
| ------------ | ------- | -------- | ----------------------- | ---- | --------------------- |
| data         | Array   | []       | -                       | Y    | 列数据。              |
| showRow      | Number  | 5        | 3/5/7                   | N    | 列显示行数。          |
| initIndex    | Number  | 0        | -                       | N    | 列初始选中项。        |
| useAnimation | Boolean | true     | true/false              | N    | 滚动是否使用动画。    |
| labelKey     | String  | 'label'  | -                       | N    | 自定义 label 的 key。 |
| flex         | Number  | 1        | -                       | N    | 多列时此列宽度。      |
| align        | String  | 'center' | 'left'/'center'/'right' | N    | 多列时此列对齐方式。  |

## Picker Events

| 名称    | 参数                                                                                                                             | 描述                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| open    | -                                                                                                                                | 打开时触发。         |
| close   | -                                                                                                                                | 关闭时触发。         |
| cancel  | -                                                                                                                                | 点击左侧取消时触发。 |
| confirm | event：事件对象，其中 detail 内有两个参数：<br />1. items：选定多列数据组成的数组；<br />2. indexs：选定多列数据索引组成的数组。 | 点击右侧确定时触发。 |
