## Progress Props

| 属性            | 类型    | 默认值  | 可选值                         | 必传 | 说明                                                |
| --------------- | ------- | ------- | ------------------------------ | ---- | --------------------------------------------------- |
| percent         | Number  | 66      | 0-100                          | N    | 百分比。                                            |
| percentPosition | String  | 'right' | 'right'/'inner'/'block'/'none' | N    | 百分比位置。                                        |
| height          | String  | '2'     | '1'/'2'/'3'/'4'                | N    | 高度。                                              |
| radius          | String  | 'full'  | 'full'/'base'/'none'           | N    | 圆角风格。                                          |
| inactive        | Boolean | false   | true/false                     | N    | 是否置灰。                                          |
| useSlot         | Boolean | false   | true/false                     | N    | 百分比文字是否使用 slot。                           |
| overflowPercent | Number  | 10      | 0-100                          | N    | percentPosition 为 inner 时，百分比文字溢出的阀值。 |
| duration        | String  | '300'   | '150'/'300'/'500'/'700'/'1000' | N    | 动画过度时间（ms）。                                |
| injClass        | String  | ''      | -                              | N    | 激活进度条注入 Class 名称。                         |
| trackInjClass   | String  | ''      | -                              | N    | 轨道条注入 Class 名称。                             |

## Progress Slots

| 名称 | 说 明                                  |
| ---- | -------------------------------------- |
| -    | 当 useSlot 为 true 时百分比文字内容 。 |
