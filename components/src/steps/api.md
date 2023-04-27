## Steps Props

| 属性      | 类型    | 默认值 | 可选值                    | 必传 | 说明                                  |
| --------- | ------- | ------ | ------------------------- | ---- | ------------------------------------- |
| steps     | Array   | []     | -                         | Y    | step 或 finishStep Props 组成的数组。 |
| current   | Number  | 1      | -                         | N    | 当前进行的步骤序号。                  |
| radius    | String  | 'base' | 'none'/'base'/'xl'/'full' | N    | 圆角风格。                            |
| barBorder | Boolean | true   | true/false                | N    | 图标是否带边框。                      |
| vertical  | Boolean | false  | true/false                | N    | 是否纵向布局。                        |

## step Props

| 属性         | 类型          | 默认值 | 可选值           | 必传 | 说明               |
| ------------ | ------------- | ------ | ---------------- | ---- | ------------------ |
| title        | String        | -      | -                | Y    | 步骤标题。         |
| bar          | String/Object | -      | String/Object    | N    | 步骤图标区域内容。 |
| desc         | String        | -      | -                | N    | 步骤描述。         |
| injComponent | Component     | -      | Svelte Component | N    | Svelte 组件。      |

## finishStep Props

同 step Props，表示已完成步骤参数。
