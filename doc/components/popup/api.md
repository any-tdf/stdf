## Popup Props

| 属性               | 类型    | 默认值     | 可选值                                                                                         | 必传 | 说明                                         |
| ------------------ | ------- | ---------- | ---------------------------------------------------------------------------------------------- | ---- | -------------------------------------------- |
| visible            | Boolean | false      | true/false                                                                                     | N    | 是否显示。                                   |
| size               | Number  | 40         | 0-100                                                                                          | N    | 弹出层大小，值为 0 时由内部元素决定。        |
| position           | String  | 'bottom'   | 'center'/'top'/'bottom'/'left'/'right'                                                         | N    | 显示位置。                                   |
| duration           | Number  | 450        | -                                                                                              | N    | 出现动画过渡时间，单位：ms。                 |
| outDuration        | Number  | 240        | -                                                                                              | N    | 退出动画过渡时间，单位：ms。                 |
| easeType           | String  | 'cubicOut' | 支持 31 种效果，具体数值参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)。 | N    | 出现动画类型。                               |
| easeOutType        | String  | 'cubicOut' | 支持 31 种效果，具体数值参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)。 | N    | 退出动画类型。                               |
| px                 | String  | '0'        | '0'/'1'/'2'/'3'/'4'/'5'/'6'/'8'/'10'/'12'/'16'/'20'                                            | N    | 左右间距。                                   |
| py                 | String  | '0'        | '0'/'1'/'2'/'3'/'4'/'5'/'6'/'8'/'10'/'12'/'16'/'24'/'32'/'48'/'64'                             | N    | 上下间距。                                   |
| mask               | Object  | {}         | 参考 Mask Props                                                                                | N    | 遮罩层参数。                                 |
| maskClosable       | Boolean | true       | true/false                                                                                     | N    | 点击遮罩层是否关闭。                         |
| radiusPosition     | String  | 'top'      | 'all'/'top'/'bottom'/'left'/'right'                                                            | N    | 圆角位置。                                   |
| radius             | String  | 'none'     | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl'/'full'                                                | N    | 圆角大小。                                   |
| transitionDistance | Number  | 0          | -                                                                                              | N    | 动画距离，当弹出层大小由内部元素决定时生效。 |
| transparent        | Boolean | false      | true/false                                                                                     | N    | 背景是否透明。                               |
| allowBodyScroll    | Boolean | true       | true/false                                                                                     | N    | 弹出层显示时是否允许 body 滚动。             |
| zIndex             | Number  | 600        | -                                                                                              | N    | z-index。                                    |
| dynamicFixed       | Boolean | true       | true/false                                                                                     | N    | 是否动态固定。                               |
| hideScrollbar      | Boolean | false      | true/false                                                                                     | N    | 是否隐藏滚动区域滚动条。                     |

## Popup Events

| 名称      | 参数 | 描述                                                        |
| --------- | ---- | ----------------------------------------------------------- |
| open      | -    | 弹出层打开时触发。                                          |
| clickMask | -    | 点击弹出层遮罩时触发，即使 maskClosable 为 false 也会触发。 |
| close     | -    | 弹出层关闭时触发。                                          |

## Popup Slots

| 名称 | 说明         |
| ---- | ------------ |
| -    | Popup 内容。 |
