## Input Props

| 名称              | 类型                                                                                                      | 默认值    | 必传 | 说明                            |
| ----------------- | --------------------------------------------------------------------------------------------------------- | --------- | ---- | ------------------------------- |
| title             | `string`                                                                                                  | `''`      | N    | 标题内容。                      |
| titlePosition     | `'in'\|'out'\|null`                                                                                       | `'out'`   | N    | 标题位置。                      |
| inputPosition     | `'left'\|'right'`                                                                                         | `'left'`  | N    | 输入框文字位置。                |
| placeholder       | `string`                                                                                                  | `''`      | N    | 输入框提示文本。                |
| radius            | `'none'\|'base'\|'xl'\|'full'`                                                                            | `'base'`  | N    | 圆角风格。                      |
| inputStyle        | `'block'\|'line'`                                                                                         | `'block'` | N    | 输入框风格。                    |
| lineTransition    | `string`                                                                                                  | `'none'`  | N    | 线性过渡位置。                  |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                                                                        | `'base'`  | N    | 过渡时间。                      |
| autocomplete      | `boolean`                                                                                                 | `true`    | N    | 是否开启自动填充功能。          |
| py                | `'0'\|'0.5'\|'1'\|'2'\|'3'\|'4'\|'6'`                                                                     | `'2'`     | N    | 垂直间距。                      |
| disabled          | `boolean`                                                                                                 | `false`   | N    | 是否禁用。                      |
| state             | `'theme'\|'success'\|'warning'\|'error'\|'info'`                                                          | `'theme'` | N    | 状态。                          |
| type              | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|'password'\|'number'\|'textarea'` | `'text'`  | N    | 输入框类型。                    |
| inputmode         | `'text'\|'decimal'\|'email'\|'none'\|'numeric'\|'search'\|'tel'\|'url'\|''`                               | `''`      | N    | 指定输入的数据类型。            |
| maxlength         | `number`                                                                                                  | `24`      | N    | 最多可输入文本长度。            |
| textareaMaxlength | `number`                                                                                                  | `200`     | N    | textarea 时最多可输入文本长度。 |
| rows              | `number`                                                                                                  | `2`       | N    | textarea 时行数。               |
| autosize          | `boolean`                                                                                                 | `false`   | N    | textarea 时是否自动调整高度。   |
| label1            | `Icon\|null`                                                                                              | `null`    | N    | 标签 1 内容。                   |
| label2            | `string\|null`                                                                                            | `null`    | N    | 标签 2 内容。                   |
| label3            | `Icon\|null`                                                                                              | `null`    | N    | 标签 3 内容。                   |
| label4            | `Icon\|null`                                                                                              | `null`    | N    | 标签 4 内容。                   |
| label5            | `string\|null`                                                                                            | `null`    | N    | 标签 5 内容。                   |
| label6            | `Icon\|null`                                                                                              | `null`    | N    | 标签 6 内容。                   |
| tip               | `string\|null`                                                                                            | `null`    | N    | 提示信息内容。                  |
| data1             | `string\|null`                                                                                            | `null`    | N    | 数据项 1 内容。                 |
| data2             | `string\|null`                                                                                            | `null`    | N    | 数据项 2 内容。                 |
| data3             | `string\|null`                                                                                            | `null`    | N    | 数据项 3 内容。                 |
| value             | `string`                                                                                                  | `''`      | N    | 输入框值。                      |
| clear             | `boolean`                                                                                                 | `false`   | N    | 是否可清空。                    |

## Input Events

| 名称          | 类型                      | 参数                 | 说明                     |
| ------------- | ------------------------- | -------------------- | ------------------------ |
| onfocus       | `(value: string) => void` | value - 当前 value   | 获得焦点时触发。         |
| onblur        | `(value: string) => void` | value - 当前 value   | 失去焦点时触发。         |
| onchange      | `(value: string) => void` | value - 当前 value   | 输入框值发生变化时触发。 |
| onclear       | `() => void`              | -                    | 清空按钮点击时触发。     |
| onclickLabel1 | `() => void`              | -                    | 点击标签 1 时触发。      |
| onclickLabel2 | `() => void`              | -                    | 点击标签 2 时触发。      |
| onclickLabel3 | `() => void`              | -                    | 点击标签 3 时触发。      |
| onclickLabel4 | `() => void`              | -                    | 点击标签 4 时触发。      |
| onclickLabel5 | `() => void`              | -                    | 点击标签 5 时触发。      |
| onclickLabel6 | `() => void`              | -                    | 点击标签 6 时触发。      |
| onkeydown     | `(key: string) => void`   | key - 按下的按键 key | 按下键盘时触发。         |

## Input Snippets

| 名称        | 类型      | 参数 | 说明                |
| ----------- | --------- | ---- | ------------------- |
| titleChild  | `Snippet` | -    | 标题插槽内容。      |
| data1Child  | `Snippet` | -    | 数据项 1 插槽内容。 |
| data2Child  | `Snippet` | -    | 数据项 2 插槽内容。 |
| data3Child  | `Snippet` | -    | 数据项 3 插槽内容。 |
| label1Child | `Snippet` | -    | 标签 1 插槽内容。   |
| label2Child | `Snippet` | -    | 标签 2 插槽内容。   |
| label3Child | `Snippet` | -    | 标签 3 插槽内容。   |
| label4Child | `Snippet` | -    | 标签 4 插槽内容。   |
| label5Child | `Snippet` | -    | 标签 5 插槽内容。   |
| label6Child | `Snippet` | -    | 标签 6 插槽内容。   |
| tipChild    | `Snippet` | -    | 提示信息插槽内容。  |
