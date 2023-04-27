## Toast Props

| 属性             | 类型    | 默认值   | 可选值                                                                       | 必传 | 说明                                                                  |     |
| ---------------- | ------- | -------- | ---------------------------------------------------------------------------- | ---- | --------------------------------------------------------------------- | :-- |
| message          | String  | ''       | -                                                                            | N    | 提示内容。                                                            |     |
| visible          | Boolean | false    | true/false                                                                   | N    | 是否显示。                                                            |     |
| duration         | Number  | 2000     | -                                                                            | N    | 显示时长，为 0 时提示不会自动关闭，单位：ms。                         |     |
| position         | String  | 'center' | 'center'/'top'/'bottom'                                                      | N    | 显示位置。                                                            |     |
| py               | String  | '20      | '0'/'10'/'20'/'40'/'60'/'80'                                                 | N    | 顶部和底部显示时距离顶部或底部的距离，position 为 'center' 时不生效。 |     |
| radius           | String  | 'base    | 'base'/'full'/'none'/'sm'/'md'/'lg'/'xl'/'2xl'                               | N    | 圆角风格。                                                            |     |
| useSlot          | Boolean | false    | true/false                                                                   | N    | 是否使用 slot。                                                       |     |
| transitionType   | String  | 'scale'  | 'fade'/'fly'/'scale'/'slide'/'none'                                          | N    | 动画类型。                                                            |     |
| transitionParams | Object  | {}       | 参考 [svelte/transition](https://svelte.dev/docs#run-time-svelte-transition) | N    | 动画参数，其中 duration 默认 300。                                    |     |
| outDuration      | Number  | 0        | -                                                                            | N    | 退出动画时间，单位：ms。                                              |     |
| mask             | Object  | {}       | 参考 Mask Props                                                              | N    | 遮罩层参数。                                                          |     |
| type             | String  | ''       | ''/'success'/'error'/'warning'/'info'/'loading'/Remix name                   | N    | 提示类型。                                                            |     |
| loading          | Object  | {}       | 参考 Loading Props                                                           | N    | 加载组件参数，仅 type 为 'loading' 时生效。                           |     |
| icon             | Object  | {}       | 参考 Icon Props                                                              | N    | 图标组件参数，type 非 '' 且非 'loading' 时生效。                      |     |
| zIndex           | Number  | 1000     | -                                                                            | N    | z-index。                                                             |
| clickable        | Boolean | false    | true/false                                                                   | N    | 是否允许点击穿透。                                                    |
| dynamicFixed     | Boolean | true     | true/false                                                                   | N    | 是否动态固定。                                                        |

## Toast Events

| 名称  | 参数 | 描述             |
| ----- | ---- | ---------------- |
| close | -    | 提示关闭时触发。 |
| open  | -    | 提示打开时触发。 |

## Toast Slots

| 名称 | 说明                              |
| ---- | --------------------------------- |
| -    | 当 useSlot 为 true 时的提示内容。 |
