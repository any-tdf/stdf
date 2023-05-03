## Badge Props

| 属性     | 类型    | 默认值 | 可选值                      | 必传 | 说明                                         |
| -------- | ------- | ------ | --------------------------- | ---- | -------------------------------------------- |
| text     | String  | ''     | -                           | N    | 徽标文案。                                   |
| radius   | String  | 'full' | 'full'/'base'/'none'/'leaf' | N    | 圆角风格。                                   |
| isShow   | Boolean | true   | true/false                  | N    | 是否显示。                                   |
| isInner  | Boolean | false  | true/false                  | N    | 是否位于内部。                               |
| isLeft   | Boolean | false  | true/false                  | N    | 是否位于左侧（仅 isInner 为 false 时生效）。 |
| offsetY  | Number  | 0      | -                           | N    | 上下偏移量（仅 isInner 为 false 时生效）。   |
| offsetX  | Number  | 0      | -                           | N    | 左右偏移量（仅 isInner 为 false 时生效）。   |
| injClass | String  | ''     | Class                       | N    | 注入 CSS 名称。                              |

## Badge Slots

| 名称 | 说 明                                          |
| ---- | ---------------------------------------------- |
| -    | isInner 为 false 时作为 Badge 相对位置的内容。 |
