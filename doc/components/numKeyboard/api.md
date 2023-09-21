## NumKeyboard Props

| 属性         | 类型    | 默认值                 | 可选值                                          | 必传 | 说明                 |
| ------------ | ------- | ---------------------- | ----------------------------------------------- | ---- | -------------------- |
| type         | String  | 'button'               | 'button'/'block'                                | N    | 键盘样式类型。       |
| visible      | Boolean | false                  | true/false                                      | N    | 是否显示键盘。       |
| height       | String  | '12'                   | '8'/'10'/'12'/'14'/'16'/'20'                    | N    | 按键高度。           |
| gap          | String  | '2'                    | '0'/'1'/'2'/'3'/'4'                             | N    | 按键间距。           |
| p            | String  | '2'                    | '0'/'1'/'2'/'3'/'4'                             | N    | 键盘内边距。         |
| reverse      | Boolean | false                  | true/false                                      | N    | 数字是否上下反向。   |
| done         | Boolean | true                   | true/false                                      | N    | 是否显示完成按钮。   |
| dot          | Boolean | true                   | true/false                                      | N    | 是否显示小数点。     |
| close        | Boolean | false                  | true/false                                      | N    | 是否显示关闭按钮。   |
| doneText     | String  | 当前语言的 common.done | -                                               | N    | 完成按钮文案。       |
| doneDisabled | Boolean | false                  | true/false                                      | N    | 完成按钮是否禁用。   |
| radius       | String  | 'base'                 | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl'/'full' | N    | 按键圆角。           |
| panelClass   | String  | ''                     | Class                                           | N    | 键盘面板注入 Class。 |
| keyClass     | String  | ''                     | Class                                           | N    | 按键注入 Class。     |
| doneClass    | String  | ''                     | Class                                           | N    | 完成按键注入 Class。 |
| popup        | Object  | {}                     | 参考 Popup Props                                | N    | 弹出层配置项。       |

## NumKeyboard Events

| 名称  | 参数                                                                                                               | 描述                   |
| ----- | ------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| click | event：事件对象，其中 detail 内有两个参数：<br />1. numStr：输入的数字字符内容；<br />2. key：本次点击的键盘 key。 | 每次点击任意按键触发。 |
| open  | event：事件对象，其中 detail 内有一个参数 keyboardHeight，键盘高度。                                               | 键盘打开时触发。       |
| close | -                                                                                                                  | 键盘关闭时触发。       |
