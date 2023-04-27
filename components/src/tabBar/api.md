## TabBar Props

| 属性              | 类型    | 默认值 | 可选值     | 必传 | 说明                                       |
| ----------------- | ------- | ------ | ---------- | ---- | ------------------------------------------ |
| labels            | Array   | []     | -          | Y    | 选项卡内容组，由 text 和 Icon Props 组成。 |
| active            | Number  | 0      | -          | N    | 激活的选项卡索引值。                       |
| line              | Boolean | false  | true/false | N    | 底部是否显示线条。                         |
| lineW             | Number  | 4      | -          | N    | 线条占当前 Tab 宽度的比例。                |
| love              | Boolean | false  | true/false | N    | 是否开启关爱版。                           |
| injClass          | String  | ''     | -          | N    | TabBar 外层注入 CSS。                      |
| tabInjClass       | String  | ''     | -          | N    | 单项 Tab 注入 CSS。                        |
| activeTabInjClass | String  | ''     | -          | N    | 激活的 Tab 注入 CSS。                      |
| activeInjClass    | String  | ''     | -          | N    | 底部线条注入 CSS。                         |

## TabBar Events

| 名称   | 参数                                                    | 描述                 |
| ------ | ------------------------------------------------------- | -------------------- |
| change | event：事件对象，其中 detail 表示激活的 TabBar 索引值。 | 点击 TabBar 时触发。 |
