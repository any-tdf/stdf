## Icon Props

| 属性       | 类型          | 默认值              | 可选值        | 必传  | 说明                             |
|----------|-------------|------------------|------------|-----|--------------------------------|
| name     | String/slot | ''               | Remix/slot | Y   | 图标名称。                          |
| size     | Number      | 24               | -          | N   | 图标大小。                          |
| theme    | Boolean     | false            | true/false | N   | 是否跟随主题色（包含亮色与暗色）。              |
| alpha    | Number      | 1                | 0 - 1      | N   | 图标透明度。                         |
| top      | Number      | -2               | -          | N   | 上下偏移量。                         |
| injClass | String      | ''               | Class      | N   | 注入 CSS 名称。                     |
| path     | String      | '/assets/fonts/symbol.svg' | -          | N   | 项目存放 symbol.svg 的路径。 |

## Icon Events

| 名称    | 参数  | 描述    |
|-------|-----|-------|
| click | -   | 点击触发。 |

## Icon Slots

| 名称  | 说明       |
|-----|----------|
| -   | 自定义 SVG。 |
