## Stepper Props

| 属性            | 类型    | 默认值 | 可选值                    | 必传 | 说明                               |
| --------------- | ------- | ------ | ------------------------- | ---- | ---------------------------------- |
| value           | Number  | 10     | -                         | N    | 当前值。                           |
| min             | Number  | 0      | -                         | N    | 最小值。                           |
| max             | Number  | 100    | -                         | N    | 最大值。                           |
| step            | Number  | 1      | -                         | N    | 步长。                             |
| vertical        | Boolean | false  | -                         | N    | 是否纵向。                         |
| numberHighlight | Boolean | false  | -                         | N    | 是否强调数字区域。                 |
| theme           | Boolean | true   | -                         | N    | 强调区域是否是主题色。             |
| radius          | String  | 'base' | 'none'/'base'/'xl'/'full' | N    | 圆角风格。                         |
| decimal         | Number  | 0      | -                         | N    | 对内部显示数字保留小数位数。       |
| async           | Boolean | false  | -                         | N    | 是否异步状态。                     |
| asyncLoading    | Boolean | false  | -                         | N    | 异步状态时，是否显示内部 Loading。 |
| loading         | Object  | {}     | 参考 Loading Props        | N    | 异步状态时，Loading 参数。         |
| padding         | Boolean | true   | -                         | N    | 外部有无 padding。                 |
| injClassOut     | String  | ''     | Class                     | N    | 外部注入的类。                     |
| injClassBtn     | String  | ''     | Class                     | N    | 按钮区域注入的类。                 |
| injClassNum     | String  | ''     | Class                     | N    | 数字区域注入的类。                 |

## Stepper Events

| 名称     | 参数                                     | 描述             |
| -------- | ---------------------------------------- | ---------------- |
| change   | event：事件对象，其中 value 表示当前值。 | 当前值。         |
| decrease | -                                        | 点击减少时触发。 |
| increase | -                                        | 点击增加时触发。 |
