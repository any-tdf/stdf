## NoticeBar Props

| Name      | Type          | Default                                          | Options                  | Required | Description                              |
| --------- | ------------- | ------------------------------------------------ | ------------------------ | -------- | ---------------------------------------- |
| textList  | Array         | []                                               | -                        | Y        | An array of announcement content.        |
| leftIcon  | Object/String | {name: 'ri-volume-down-line', size: 20, top: -1} | Icon Props/'slot'/'none' | N        | Left content.                            |
| rightIcon | String        | 'close'                                          | 'close'/'arrow'/'none'   | N        | Right content.                           |
| fontSize  | String        | 'sm'                                             | 'xs'/'sm'/'base'/'lg'    | N        | Font size of the announcement.           |
| space     | Number        | 100                                              | -                        | N        | Spacing between announcements (px).      |
| speed     | Number        | 30                                               | -                        | N        | Horizontal scrolling speed (px/s).       |
| vertical  | Boolean       | false                                            | true/false               | N        | Whether to vertically scroll.            |
| duration  | Number        | 500                                              | 100/300/500/700/1000     | N        | Vertical scrolling transition time (ms). |
| interval  | Number        | 4                                                | -                        | N        | Vertical scrolling interval time (s).    |
| injClass  | String        | ''                                               | Class                    | N        | Injected CSS class name.                 |

## NoticeBar Events

| Name       | Parameters | Description                             |
| ---------- | ---------- | --------------------------------------- |
| clickright | -          | Triggered when clicking the right area. |

## NoticeBar Slots

| Name | Description                                      |
| ---- | ------------------------------------------------ |
| -    | The left content when leftIcon is set to 'slot'. |
