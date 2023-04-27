## ActionSheet Props

| 属性           | 类型    | 默认值                            | 可选值                  | 必传 | 说明                                 |
| -------------- | ------- | --------------------------------- | ----------------------- | ---- | ------------------------------------ |
| visible        | Boolean | false                             | true/false              | N    | 是否显示。                           |
| title          | String  | ''                                | -                       | N    | 标题。                               |
| titleAlign     | String  | 'center'                          | 'left'/'center'/'right' | N    | 标题对齐方式。                       |
| actions        | Array   | []                                | 参考 Actions Props      | Y    | 菜单选项，Actions Props 组成的数组。 |
| popup          | Object  | {}                                | 参考 Popup Props        | N    | 弹出层参数。                         |
| showCancel     | Boolean | false                             | true/false              | N    | 是否显示取消选项。                   |
| cancelText     | String  | 当前语言的 actionSheet.cancelText | -                       | N    | 取消选项文本。                       |
| actionClosable | Boolean | true                              | true/false              | N    | 点击选项是否关闭。                   |
| align          | String  | 'center'                          | 'left'/'center'/'right' | N    | 对齐方式。                           |

## Actions Props

| 属性      | 类型    | 默认值   | 可选值                               | 必传 | 说明           |
| --------- | ------- | -------- | ------------------------------------ | ---- | -------------- |
| content   | String  | -        | -                                    | Y    | 选项内容。     |
| style     | String  | 'normal' | 'normal'/'theme'/'danger'/'disabled' | N    | 选项样式。     |
| desc      | String  | ''       | -                                    | N    | 选项描述。     |
| showImg   | Boolean | false    | true/false                           | N    | 是否显示图片。 |
| imgRadius | String  | 'full'   | 'none'/'base'/'full'/'lg'            | N    | 图片圆角。     |
| imgSrc    | String  | ''       | -                                    | N    | 图片地址。     |

## ActionSheet Events

| 名称        | 参数                                                                                                           | 描述                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| open        | -                                                                                                              | 打开时触发。                                     |
| close       | -                                                                                                              | 关闭时触发。                                     |
| cancel      | -                                                                                                              | 点击取消时触发。                                 |
| clickAction | event：事件对象，其中 detail 内有两个参数：<br />1. index：当前点击索引值；<br />2. item：当前点击选项 Props。 | 点击选项时触发，即使点击选项不允许关闭也会触发。 |
