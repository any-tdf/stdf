## Input Props

| 属性              | 类型               | 默认值  | 可选值                                                                                        | 必传 | 说明                            |
| ----------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- | ---- | ------------------------------- |
| title             | String/slot        | ''      | -                                                                                             | N    | 标题内容。                      |
| placeholder       | String             | ''      | -                                                                                             | N    | 输入框提示文本。                |
| titlePosition     | String             | 'out'   | 'out'/'in'/'none'                                                                             | N    | 标题位置。                      |
| inputPosition     | String             | 'left'  | 'left'/'right'                                                                                | N    | 输入框文字位置。                |
| radius            | String             | 'base'  | 'none'/'base'/'xl'/'full'                                                                     | N    | 圆角风格。                      |
| inputStyle        | String             | 'block' | 'block'/'line'                                                                                | N    | 输入框风格。                    |
| py                | String             | '2'     | '0'/'0.5'/'1'/'2'/'3'/'4'/'6'                                                                 | N    | 垂直间距。                      |
| lineTransition    | String             | 'none'  | 'none'/'center'/'left'                                                                        | N    | 线性过渡位置。                  |
| duration          | String             | 'base'  | 'fast'/'base'/'slow'/'slower'                                                                 | N    | 过渡时间。                      |
| value             | String             | ''      | -                                                                                             | N    | 输入框值。                      |
| type              | String             | 'text'  | 'text'/'decimal'/'email'/'none'/'numeric'/'search'/'tel'/'url'/'password'/'number'/'textarea'/'negative' | N    | 输入框类型。                    |
| inputmode         | String             | ''      | 'text'/'decimal'/'email'/'none'/'numeric'/'search'/'tel'/'url'                                | N    | 指定输入的数据类型。            |
| state             | String             | 'theme' | 'theme'/'success'/'warning'/'error'/'info'                                                    | N    | 状态。                          |
| maxlength         | Number             | 24      | -                                                                                             | N    | 最多可输入文本长度。            |
| rows              | Number             | 2       | -                                                                                             | N    | textarea 时行数。               |
| autosize          | Boolean            | false   | true/false                                                                                    | N    | textarea 时是否自动调整高度。   |
| textareaMaxlength | Number             | 200     | -                                                                                             | N    | textarea 时最多可输入文本长度。 |
| clear             | Boolean            | false   | true/false                                                                                    | N    | 是否可清空。                    |
| autocomplete      | Boolean            | true    | true/false                                                                                    | N    | 是否开启自动填充功能。          |
| disabled          | Boolean            | false   | true/false                                                                                    | N    | 是否禁用。                      |
| label1            | String/Object/slot | ''      | ''/Icon Props/slot                                                                            | N    | 标签 1 内容。                   |
| label2            | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 标签 2 内容。                   |
| label3            | String/Object/slot | ''      | ''/Icon Props/slot                                                                            | N    | 标签 3 内容。                   |
| label4            | String/Object/slot | ''      | ''/Icon Props/slot                                                                            | N    | 标签 4 内容。                   |
| label5            | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 标签 5 内容。                   |
| label6            | String/Object/slot | ''      | ''/Icon Props/slot                                                                            | N    | 标签 6 内容。                   |
| tip               | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 提示信息内容。                  |
| data1             | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 数据项 1 内容。                 |
| data2             | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 数据项 2 内容。                 |
| data3             | String/slot        | ''      | ''/Any String/slot                                                                            | N    | 数据项 3 内容。                 |
| negative          | Boolean            | false   | true/false                                                                                    | N    | 是否允许负数。                  |

## Input Events

| 事件        | 参数                                              | 说明                     |
| ----------- | ------------------------------------------------- | ------------------------ |
| focus       | event：事件对象，其中 detail 表示当前 value。     | 获得焦点时触发。         |
| blur        | event：事件对象，其中 detail 表示当前 value。     | 失去焦点时触发。         |
| change      | event：事件对象，其中 detail 表示当前 value。     | 输入框值发生变化时触发。 |
| clear       | -                                                 | 清空按钮点击时触发。     |
| clicklabel1 | -                                                 | 点击标签 1 时触发。      |
| clicklabel2 | -                                                 | 点击标签 2 时触发。      |
| clicklabel3 | -                                                 | 点击标签 3 时触发。      |
| clicklabel4 | -                                                 | 点击标签 4 时触发。      |
| clicklabel5 | -                                                 | 点击标签 5 时触发。      |
| clicklabel6 | -                                                 | 点击标签 6 时触发。      |
| keydown     | event：事件对象，其中 detail 表示按下的按键 key。 | 按下键盘时触发。         |

## Input Slots

| 名称   | 说明                |
| ------ | ------------------- |
| title  | 标题插槽内容。      |
| data1  | 数据项 1 插槽内容。 |
| data2  | 数据项 2 插槽内容。 |
| data3  | 数据项 3 插槽内容。 |
| label1 | 标签 1 插槽内容。   |
| label2 | 标签 2 插槽内容。   |
| label3 | 标签 3 插槽内容。   |
| label4 | 标签 4 插槽内容。   |
| label5 | 标签 5 插槽内容。   |
| label6 | 标签 6 插槽内容。   |
| tip    | 提示信息插槽内容。  |
