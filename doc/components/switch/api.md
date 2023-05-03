## Switch Props

| 属性       | 类型                | 默认值    | 可选值                          | 必传  | 说明                               |
|----------|-------------------|--------|------------------------------|-----|----------------------------------|
| check    | Boolean           | false  | true/false                   | N   | 开关状态。                            |
| radius   | String            | 'base' | 'full'/'base'/'none'         | N   | 圆角风格。                            |
| inside   | Array/String/slot | []     | Array/'state'/'loading'/slot | N   | 开关内部内容。                          |
| injClass | String            | ''     | Class                        | N   | 注入 CSS 名称。                       |
| disabled | Boolean           | false  | true/false                   | N   | 是否禁用。                            |
| async    | Boolean           | false  | true/false                   | N   | 是否异步。                            |
| loading  | Object            | {}     | 参考 Loading Props             | N   | 加载组件参数，仅 inside 为 'loading' 时生效。 |

## Switch Events

| 名称     | 参数                             | 描述          |
|--------|--------------------------------|-------------|
| click  | -                              | 点击触发 。      |
| change | event：事件对象，其中 detail 表示当前开关状态。 | 开关状态变化时触发 。 |

## Switch Slots

| 名称    | 说明            |
|-------|---------------|
| true  | 状态为开启时开关内部内容。 |
| false | 状态为关闭时开关内部内容。 |
