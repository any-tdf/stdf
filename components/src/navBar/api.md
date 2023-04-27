## NavBar Props

| 属性      | 类型    | 默认值                  | 可选值              | 必传 | 说明                                                                |
| --------- | ------- | ----------------------- | ------------------- | ---- | ------------------------------------------------------------------- |
| title     | String  | 当前语言的 navBar.title | -                   | N    | 标题。                                                              |
| titleSlot | Boolean | false                   | true/false          | N    | title 是否使用插槽。                                                |
| left      | String  | 'back'                  | 'back'/'customIcon' | N    | 左侧内容，默认为 'back' 返回图标，'customIcon' 时由 leftIcon 决定。 |
| leftIcon  | Object  | {}                      | 参考 Icon Props     | N    | 左侧内容为 'customIcon' 时，自定义图标。                            |
| leftSlot  | Boolean | false                   | true/false          | N    | left 是否使用插槽。                                                 |
| rights    | Array   | []                      | Icon Props Array    | N    | 右侧内容，Icon Props 组成的数组，建议不超过三个。                   |
| rightSlot | Boolean | false                   | true/false          | N    | rights 是否使用插槽。                                               |
| line      | Boolean | true                    | true/false          | N    | 是否显示底部分割线。                                                |
| injClass  | String  | ''                      | Class               | N    | 注入 CSS 名称。                                                     |
| love      | Boolean | false                   | true/false          | N    | 是否开启关爱版。                                                    |

## NavBar Events

| 事件       | 参数                                                | 说明               |
| ---------- | --------------------------------------------------- | ------------------ |
| clickleft  | -                                                   | 点击左侧图标触发。 |
| clickright | event：事件对象，其中 detail 表示点击图标的索引值。 | 点击右侧图标触发。 |

## NavBar Slots

| 名称  | 说明                               |
| ----- | ---------------------------------- |
| title | titleSlot 为 true 时标题区域内容。 |
| left  | leftSlot 为 true 时左侧内容。      |
| right | rightSlot 为 true 时右侧内容。     |
