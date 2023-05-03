## Mask Props

| 属性           | 类型      | 默认值    | 可选值                                           | 必传  | 说明              |
|--------------|---------|--------|-----------------------------------------------|-----|-----------------|
| visible      | Boolean | false  | true/false                                    | N   | 是否显示。           |
| opacity      | Number  | 0.5    | 0-1                                           | N   | 遮罩透明度。          |
| duration     | Number  | 150    | -                                             | N   | 出现动画过渡时长，单位：ms。 |
| outDuration  | Number  | 0      | -                                             | N   | 消失动画过渡时长，单位：ms。 |
| inverse      | Boolean | false  | true/false                                    | N   | 遮罩背景是否反色。       |
| clickable    | Boolean | false  | true/false                                    | N   | 遮罩是否可点击穿透。      |
| backdropBlur | String  | 'none' | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl' | N   | 背景模糊度。          |
| zIndex       | Number  | 500    | -                                             | N   | z-index。        |

## Mask Events

| 名称        | 参数  | 描述                                 |
|-----------|-----|------------------------------------|
| clickMask | -   | 点击遮罩时触发，注意 clickable 为 true 时不会触发。 |