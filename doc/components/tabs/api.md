## Tabs Props

| 属性       | 类型    | 默认值 | 可选值                        | 必传 | 说明                                     |
| ---------- | ------- | ------ | ----------------------------- | ---- | ---------------------------------------- |
| tab        | Object  | {}     | Tab Props                     | Y    | 传入 Tab Props，作用于内部 Tab 组件。    |
| active     | Number  | 0      | -                             | N    | 激活的选项卡索引值。                     |
| duration   | String  | 'base' | 'fast'/'base'/'slow'/'slower' | N    | 过渡动画快慢。                           |
| position   | String  | 't'    | 't'/'b'/'l'/'r'               | N    | 选项卡位置，对应 Tab Props 的 duration。 |
| transition | Boolean | true   | true/false                    | N    | 是否使用过渡动画。                       |

## Tabs Events

| 名称   | 参数                                                  | 描述                         |
| ------ | ----------------------------------------------------- | ---------------------------- |
| change | event：事件对象，其中 detail 表示激活的选项卡索引值。 | 激活的选项卡发生变化时触发。 |

## Tabs Slots

| 名称 | 说明            |
| ---- | --------------- |
| -    | Tabs 主体内容。 |

## Tab Props

| 属性              | 类型    | 默认值 | 可选值                                     | 必传 | 说明                                          |
| ----------------- | ------- | ------ | ------------------------------------------ | ---- | --------------------------------------------- |
| labels            | Array   | []     | -                                          | Y    | 选项卡内容组，由 text 和 Icon Props 组成。    |
| active            | Number  | 0      | -                                          | N    | 激活的选项卡索引值。                          |
| lineType          | Boolean | false  | true/false                                 | N    | 是否使用线性风格。                            |
| radius            | String  | 'base' | 'none'/'base'/'xl'/'full'                  | N    | 圆角风格。                                    |
| mx                | String  | '2'    | '0'/'1'/'2'/'3'/'4'/'6'/'8'/'12'/'16'/'20' | N    | 左右间距。                                    |
| duration          | String  | 'base' | 'fast'/'base'/'slow'/'slower'              | N    | 过渡动画快慢。                                |
| layout            | String  | 'h'    | 'h'/'v'                                    | N    | 水平或垂直布局，对应 Tabs Props 的 position。 |
| love              | Boolean | false  | true/false                                 | N    | 是否开启关爱版。                              |
| injClass          | String  | ''     | -                                          | N    | Tab 外层注入 CSS。                            |
| tabInjClass       | String  | ''     | -                                          | N    | 单项 Tab 注入 CSS。                           |
| activeTabInjClass | String  | ''     | -                                          | N    | 激活的 Tab 注入 CSS。                         |
| activeInjClass    | String  | ''     | -                                          | N    | 指示器注入 CSS。                              |
| overflow          | Boolean | false  | true/false                                 | N    | 是否开启溢出隐藏。                            |
| showNum           | Number  | 3      | -                                          | N    | 开启溢出隐藏时，完整显示 Tab 数。             |
| autoScroll        | Boolean | false  | true/false                                 | N    | 开启溢出隐藏时，是否开启自动滚动。            |

## Tab Events

| 名称     | 参数                                                  | 描述               |
| -------- | ----------------------------------------------------- | ------------------ |
| clicktab | event：事件对象，其中 detail 表示激活的选项卡索引值。 | 点击选项卡时触发。 |

## TabContent Props

| 属性 | 类型    | 默认值 | 可选值     | 必传 | 说明       |
| ---- | ------- | ------ | ---------- | ---- | ---------- |
| show | Boolean | true   | true/false | N    | 是否显示。 |

## TabContent Slots

| 名称 | 说明              |
| ---- | ----------------- |
| -    | TabContent 内容。 |
