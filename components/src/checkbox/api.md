## CheckboxGroup Props

| 属性     | 类型     | 默认值 | 可选值              | 必传  | 说明                        |
|--------|--------|-----|------------------|-----|---------------------------|
| layout | String | 'v' | 'v'/'h'/'inline' | N   | 排列方式，h-水平，v-垂直，inline-行内。 |

## CheckboxGroup Events

| 名称     | 参数                                  | 描述               |
|--------|-------------------------------------|------------------|
| change | event：事件对象，其中 detail 表示选定项标识符组成的数组。 | 点击 Checkbox 时触发。 |

## CheckboxGroup Slots

| 名称  | 说明                                |
|-----|-----------------------------------|
| -   | CheckboxGroup 内部插槽一般为多条 Checkbox。 |

## Checkbox Props

| 属性           | 类型            | 默认值       | 可选值                         | 必传  | 说明                                         |
|--------------|---------------|-----------|-----------------------------|-----|--------------------------------------------|
| name         | String        | ''        | -                           | Y   | 标识符。                                       |
| checkeds     | Array         | []        | -                           | N   | Checkbox 所在的 CheckboxGroup 内所有选定项标识符组成的数组。 |
| textPosition | String        | 'r'       | 't'/'b'/'l'/'r'             | N   | 选项内容区域位置。                                  |
| icon         | String/Object | 'default' | 'default'/'none'/Icon Props | N   | 未选中选项图标区域内容。                               |
| iconChecked  | String/Object | 'default' | 'default'/'none'/Icon Props | N   | 选中选项图标区域内容。                                |
| outControl   | Boolean       | false     | true/false                  | N   | 选中状态是否由外部控制。                               |

## Checkbox Slots

| 名称  | 说明      |
|-----|---------|
| -   | 选项区域内容。 |
