## NoticeBar Props

| 属性      | 类型          | 默认值                                           | 可选值                   | 必传 | 说明                        |
| --------- | ------------- | ------------------------------------------------ | ------------------------ | ---- | --------------------------- |
| textList  | Array         | []                                               | -                        | Y    | 通告内容组成的数组。        |
| leftIcon  | Object/String | {name: 'ri-volume-down-line', size: 20, top: -1} | Icon Props/'slot'/'none' | N    | 左侧内容。                  |
| rightIcon | String        | 'close'                                          | 'close'/'arrow'/'none'   | N    | 右侧内容。                  |
| fontSize  | String        | 'sm'                                             | 'xs'/'sm'/'base'/'lg'    | N    | 通告字体大小。              |
| space     | Number        | 100                                              | -                        | N    | 通告间距。                  |
| speed     | Number        | 30                                               | -                        | N    | 横向滚动速度，单位是 px/s。 |
| vertical  | Boolean       | false                                            | true/false               | N    | 是否垂直滚动。              |
| duration  | Number        | 500                                              | 100/300/500/700/1000     | N    | 垂直滚动过渡时间。          |
| interval  | Number        | 4                                                | -                        | N    | 垂直滚动间隔时间。          |
| injClass  | String        | ''                                               | Class                    | N    | 注入 CSS 名称。             |

## NoticeBar Events

| 名称       | 参数 | 描述               |
| ---------- | ---- | ------------------ |
| clickright | -    | 点击右侧区域触发。 |

## NoticeBar Slots

| 名称 | 说 明                                 |
| ---- | ------------------------------------- |
| -    | 当 leftIcon 为 'slot' 时的左侧内容 。 |
