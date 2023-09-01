## RadioGroup Props

| 属性       | 类型    | 默认值 | 可选值     | 必传 | 说明                                     |
| ---------- | ------- | ------ | ---------- | ---- | ---------------------------------------- |
| value      | String  | ''     | -          | Y    | 选定的 value，对应 Radio Props 的 name。 |
| horizontal | Boolean | false  | true/false | N    | 是否水平排列。                           |

## RadioGroup Events

| 名称   | 参数                                                   | 描述                                                     |
| ------ | ------------------------------------------------------ | -------------------------------------------------------- |
| change | event：事件对象，其中 detail 表示选中的 Radio 标识符。 | 点击 Radio（即 RadioGroup Props 的 value 变化） 时触发。 |

## RadioGroup Slots

| 名称 | 说明                                  |
| ---- | ------------------------------------- |
| -    | RadioGroup 内部插槽一般为多条 Radio。 |

## Radio Props

| 属性         | 类型          | 默认值    | 可选值                      | 必传 | 说明                                     |
| ------------ | ------------- | --------- | --------------------------- | ---- | ---------------------------------------- |
| name         | String        | ''        | -                           | Y    | 标识符，对应 RadioGroup Props 的 value。 |
| textPosition | String        | 'r'       | 't'/'b'/'l'/'r'             | N    | 选项内容区域位置。                       |
| icon         | String/Object | 'default' | 'default'/'none'/Icon Props | N    | 未选中选项图标区域内容。                 |
| iconChecked  | String/Object | 'default' | 'default'/'none'/Icon Props | N    | 选中选项图标区域内容。                   |

## Radio Slots

| 名称 | 说明           |
| ---- | -------------- |
| -    | 选项区域内容。 |
