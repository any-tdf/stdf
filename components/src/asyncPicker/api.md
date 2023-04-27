## AsyncPicker Props

| 属性         | 类型    | 默认值                            | 可选值                  | 必传 | 说明                      |
| ------------ | ------- | --------------------------------- | ----------------------- | ---- | ------------------------- |
| visible      | Boolean | false                             | true/false              | N    | 是否显示。                |
| data         | Array   | []                                | -                       | Y    | 列数据。                  |
| lastLevel    | Boolean | false                             | true/false              | N    | 是否是最后一级。          |
| firstLevel   | Boolean | false                             | true/false              | N    | 是否是第一级。            |
| showRow      | Number  | 5                                 | 3/5/7                   | N    | 列显示行数。              |
| labelKey     | String  | 'label'                           | -                       | N    | 自定义 label 的 key。     |
| align        | String  | 'center'                          | 'left'/'center'/'right' | N    | 对齐方式。                |
| cancelText   | String  | 当前语言的 picker.defaultCancel   | -                       | N    | 取消选项文本。            |
| confirmText  | String  | 当前语言的 picker.defaultConfirm  | -                       | N    | 确定选项文本。            |
| title        | String  | 当前语言的 picker.defaultTitle    | -                       | N    | 中间标题文本。            |
| nextText     | String  | 当前语言的 picker.defaultNext     | -                       | N    | 下一级文本。              |
| prevText     | String  | 当前语言的 picker.defaultPrev     | -                       | N    | 上一级文本。              |
| showSelected | Boolean | false                             | true/false              | N    | 是否显示已选项。          |
| selectedText | String  | 当前语言的 picker.defaultSelected | -                       | N    | 已选文本。                |
| popup        | Object  | {}                                | 参考 Popup Props        | N    | 弹出层参数。              |
| loading      | Object  | {}                                | 参考 Loading Props      | N    | 加载数据时 Loading 参数。 |

## AsyncPicker Events

| 名称    | 参数                                                                                                                             | 描述                   |
| ------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| open    | -                                                                                                                                | 打开时触发。           |
| close   | -                                                                                                                                | 关闭时触发。           |
| cancel  | -                                                                                                                                | 点击左侧取消时触发。   |
| prev    | -                                                                                                                                | 点击左侧上一级时触发。 |
| next    | event：事件对象，其中 detail 内有一个参数 index，当前选定项在所在列的索引。                                                      | 点击右侧下一级时触发。 |
| confirm | event：事件对象，其中 detail 内有两个参数：<br />1. items：选定多列数据组成的数组；<br />2. indexs：选定多列数据索引组成的数组。 | 点击右侧确定时触发。   |
