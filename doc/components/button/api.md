## Button Props

| 属性         | 类型    | 默认值  | 可选值                                                                | 必传 | 说明                           |
| ------------ | ------- | ------- | --------------------------------------------------------------------- | ---- | ------------------------------ |
| fill         | String  | 'base'  | 'base'/'line'/'lineLight'/'lineTheme'/'text'/'textTheme'/'colorLight' | N    | 填充模式。                     |
| state        | String  | 'theme' | 'theme'/'success'/'warning'/'error'/'info'                            | N    | 状态色，theme 表示跟随主题色。 |
| radius       | String  | 'base'  | 'none'/'base'/'xl'/'2xl'/'full'                                       | N    | 圆角风格。                     |
| size         | String  | 'big'   | 'full'/'big'/'md'/'sm'/'auto'                                         | N    | 尺寸。                         |
| line         | String  | 'solid' | 'solid'/'dashed'/'dotted'                                             | N    | 边框风格。                     |
| heightOut    | String  | '2'     | '0'/'1'/'2'/'3'/'4'                                                   | N    | 按钮外部高度。                 |
| heightIn     | String  | '3'     | '0'/'1'/'2'/'3'/'4'                                                   | N    | 按钮高度。                     |
| injClass     | String  | ''      | Class                                                                 | N    | 注入 CSS 名称。                |
| love         | Boolean | false   | true/false                                                            | N    | 是否开启关爱版。               |
| group        | Boolean | false   | true/false                                                            | N    | 是否使用按钮组。               |
| disabled     | Boolean | false   | true/false                                                            | N    | 是否禁用。                     |
| customSize   | Boolean | false   | true/false                                                            | N    | 是否自定义大小。               |
| customWidth  | Number  | 0       | -                                                                     | N    | 自定义宽度。                   |
| customHeight | Number  | 0       | -                                                                     | N    | 自定义高度。                   |

## Button Events

| 名称  | 参数 | 描述       |
| ----- | ---- | ---------- |
| click | -    | 点击触发。 |

## Button Slots

| 名称 | 说明       |
| ---- | ---------- |
| -    | 按钮内容。 |
