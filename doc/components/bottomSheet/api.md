## BottomSheet Props

| 属性            | 类型    | 默认值                       | 可选值                             | 必传 | 说明                               |
| --------------- | ------- | ---------------------------- | ---------------------------------- | ---- | ---------------------------------- |
| visible         | Boolean | false                        | true/false                         | N    | 是否显示。                         |
| title           | String  | 当前语言的 bottomSheet.title | -                                  | N    | 标题。                             |
| titleAlign      | String  | 'left'                       | 'left'/'center'/'right'            | N    | 标题对齐方式。                     |
| showBackIcon    | Boolean | false                        | true/false                         | N    | 是否显示返回图标。                 |
| closeContent    | String  | 'downIcon'                   | 'downIcon'/'closeIcon'/''/任意文本 | N    | 关闭区域内容。                     |
| showDivider     | Boolean | true                         | true/false                         | N    | 是否显示分割线。                   |
| duration        | Number  | 450                          | -                                  | N    | 过渡动画出现时间，单位：ms。       |
| outDuration     | Number  | 240                          | -                                  | N    | 过渡动画退出时间，单位：ms。       |
| mask            | Object  | {}                           | 参考 Mask Props                    | N    | 遮罩层参数。                       |
| maskClosable    | Boolean | false                        | true/false                         | N    | 点击遮罩层是否关闭。               |
| zIndex          | Number  | 600                          | -                                  | N    | z-index。                          |
| stayHeightList  | Array   | [10, 50, 90]                 | -                                  | N    | 固定高度列表。                     |
| stayHeightIndex | Number  | 1                            | stayHeightList 的索引值            | N    | 初始固定高度索引。                 |
| closeHeight     | Number  | 0                            | 0-100                              | N    | 滑动结束时位置低于此高度自动关闭。 |
| radius          | String  | 'full'                       | 'none'/'base'/'full'               | N    | 圆角风格。                         |

## BottomSheet Events

| 名称         | 参数                                      | 描述                                                      |
| ------------ | ----------------------------------------- | --------------------------------------------------------- |
| close        | -                                         | 浮窗关闭时触发。                                          |
| clickMask    | -                                         | 点击浮窗遮罩时触发，即使 maskClosable 为 false 也会触发。 |
| back         | -                                         | 点击左侧返回图标时触发。                                  |
| heightChange | event：事件对象，其中 detail 为当前高度。 | 滑动结束时触发。                                          |

## BottomSheet Slots

| 名称 | 说明               |
| ---- | ------------------ |
| -    | BottomSheet 内容。 |
