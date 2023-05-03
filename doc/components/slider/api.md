## Slider Props

| 属性         | 类型      | 默认值     | 可选值                       | 必传  | 说明         |
|------------|---------|---------|---------------------------|-----|------------|
| value      | Number  | 40      | -                         | N   | 当前值。       |
| step       | Number  | 1       | -                         | N   | 步长。        |
| minRange   | Number  | 0       | -                         | N   | 可选最小值。     |
| maxRange   | Number  | 100     | -                         | N   | 可选最大值。     |
| isRange    | Boolean | false   | true/false                | N   | 是否为区间选择。   |
| startValue | Number  | 20      | -                         | N   | 区间选择开始值。   |
| endValue   | Number  | 60      | -                         | N   | 区间选择结束值。   |
| showTip    | String  | 'touch' | 'always'/'never'/'touch'  | N   | 提示显示方式。    |
| radius     | String  | 'full'  | 'none'/'base'/'xl'/'full' | N   | 圆角风格。      |
| lineBlock  | Boolean | false   | true/false                | N   | 滑块是否为线框。   |
| disabled   | Boolean | false   | true/false                | N   | 是否禁用。      |
| readonly   | Boolean | false   | true/false                | N   | 是否只读。      |
| useSlot    | Boolean | false   | true/false                | N   | 是否使用 Slot。 |

## Slider Events

| 名称     | 参数                                                | 描述       |
|--------|---------------------------------------------------|----------|
| change | event：事件对象，其中 detail 表示当前取值（区间选择时表示开始值与结束值组成的数组）。 | 点击或滑动触发。 |

## Slider Slots

| 名称  | 说明                       |
|-----|--------------------------|
| -   | useSlot 为 true 时的进度区域内容。 |
