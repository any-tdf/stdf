## Modal Props

| 属性        | 类型    | 默认值                   | 可选值                  | 必传 | 说明                |
| ----------- | ------- | ------------------------ | ----------------------- | ---- | ------------------- |
| visible     | Boolean | false                    | true/false              | N    | 是否显示。          |
| title       | String  | 当前语言的 modal.title   | -                       | N    | 标题。              |
| titleAlign  | String  | 'center'                 | 'left'/'center'/'right' | N    | 标题对齐方式。      |
| content     | String  | 当前语言的 modal.content | -                       | N    | 内容。              |
| contentSlot | Boolean | false                    | true/false              | N    | 内容是否使用 slot。 |
| showIcon    | Boolean | false                    | true/false              | N    | 是否显示图标。      |
| icon        | Object  | {}                       | 参考 Icon Props         | N    | 图标参数。          |
| showBtn     | Boolean | true                     | true/false              | N    | 是否显示按钮。      |
| btnText     | String  | 当前语言的 modal.btnText | -                       | N    | 按钮文字。          |
| button      | Object  | {}                       | 参考 Button Props       | N    | 按钮参数。          |
| popup       | Object  | {}                       | 参考 Popup Props        | N    | 弹出层参数。        |

## Modal Events

| 名称  | 参数 | 描述             |
| ----- | ---- | ---------------- |
| open  | -    | 弹框打开时触发。 |
| close | -    | 弹框关闭时触发。 |

## Modal Slots

| 名称 | 描述                                    |
| ---- | --------------------------------------- |
| -    | contentSlot 为 true 时的 content 内容。 |
