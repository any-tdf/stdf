## Dialog Props

| 属性            | 类型    | 默认值                          | 可选值                        | 必传 | 说明                      |
| --------------- | ------- | ------------------------------- | ----------------------------- | ---- | ------------------------- |
| visible         | Boolean | false                           | true/false                    | N    | 是否显示。                |
| title           | String  | 当前语言的 dialog.title         | -                             | N    | 标题。                    |
| titleAlign      | String  | 'center'                        | 'left'/'center'/'right'       | N    | 标题对齐方式。            |
| content         | String  | 当前语言的 dialog.content       | -                             | N    | 内容。                    |
| contentSlot     | Boolean | false                           | true/false                    | N    | 内容是否使用 slot。       |
| popup           | Object  | {}                              | 参考 Popup Props              | N    | 弹出层参数。              |
| showIcon        | Boolean | false                           | true/false                    | N    | 是否显示图标。            |
| icon            | Object  | {}                              | 参考 Icon Props               | N    | 图标参数。                |
| btnStyle        | String  | 'button'                        | 'button'/'text'/'textLine'    | N    | 按钮样式。                |
| primaryText     | String  | 当前语言的 dialog.primaryText   | -                             | N    | 主按钮文字。              |
| primarySlot     | Boolean | false                           | true/false                    | N    | 主按钮内部是否使用 slot。 |
| primaryButton   | Object  | {}                              | 参考 Button Props             | N    | 主按钮参数。              |
| secondaryText   | String  | 当前语言的 dialog.secondaryText | -                             | N    | 次按钮文字。              |
| secondaryButton | Object  | {}                              | 参考 Button Props             | N    | 次按钮参数。              |
| btnRatio        | Array   | [1, 1]                          | -                             | N    | 主次按钮大小比例。        |
| btnReverse      | Boolean | false                           | true/false                    | N    | 主次按钮位置是否反转。    |
| secondaryClose  | Boolean | true                            | true/false                    | N    | 次按钮是否关闭弹窗。      |
| btnGap          | String  | '2'                             | '0'/'1'/'2'/'4'/'8'/'12'/'16' | N    | 按钮间距。                |

## Dialog Events

| 名称      | 参数 | 描述               |
| --------- | ---- | ------------------ |
| open      | -    | 对话框打开时触发。 |
| close     | -    | 对话框关闭时触发。 |
| primary   | -    | 点击主按钮时触发。 |
| secondary | -    | 点击次按钮时触发。 |

## Dialog Slots

| 名称    | 描述                                    |
| ------- | --------------------------------------- |
| content | contentSlot 为 true 时的 content 内容。 |
| primary | primarySlot 为 true 时主按钮内容。      |
