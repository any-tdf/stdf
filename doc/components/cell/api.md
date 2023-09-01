## Cell Props

| 属性      | 类型                                | 默认值  | 可选值                                        | 必传 | 说明                 |
| --------- | ----------------------------------- | ------- | --------------------------------------------- | ---- | -------------------- |
| title     | String                              | ''      | -                                             | Y    | 标题。               |
| detail    | String/slot                         | ''      | 任何字符/'slot'                               | N    | 右侧详情。           |
| left      | String/Icon Props/slot              | ''      | ''/Icon Props/'slot'                          | N    | 最左侧内容。         |
| right     | String/Icon Props/Switch Props/slot | 'arrow' | 'none'/'arrow'/Switch Props/Icon Props/'slot' | N    | 最右侧内容。         |
| subTitle  | String                              | ''      | -                                             | N    | 左侧次级标题。       |
| info      | String                              | ''      | -                                             | N    | 右侧次级信息。       |
| line      | Boolean                             | false   | true/false                                    | N    | 是否显示底部分割线。 |
| my        | String                              | '4'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'                   | N    | 上下间距。           |
| mx        | String                              | '2'     | '0'/'1'/'2'/'3'/'4'/'6'/'8'                   | N    | 左右间距。           |
| radius    | String                              | 'lg'    | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'full'     | N    | 圆角风格。           |
| shadow    | String                              | 'sm'    | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'       | N    | 阴影风格。           |
| switcheck | Boolean                             | false   | true/false                                    | N    | 开关状态。           |
| injClass  | String                              | ''      | Class                                         | N    | 注入 CSS 名称。      |
| love      | Boolean                             | false   | true/false                                    | N    | 是否开启关爱版。     |

## Cell Events

| 名称  | 参数 | 描述     |
| ----- | ---- | -------- |
| click | -    | 点击触发 |

## Cell Slots

| 名称   | 说明          |
| ------ | ------------- |
| left   | 最左侧内容。  |
| right  | 最右侧内容。  |
| detail | Detail 内容。 |

## CellGroup Props

| 属性   | 类型   | 默认值 | 可选值                                    | 必传 | 说明       |
| ------ | ------ | ------ | ----------------------------------------- | ---- | ---------- |
| my     | String | '4'    | '0'/'1'/'2'/'3'/'4'/'6'/'8'               | N    | 上下间距。 |
| mx     | String | '2'    | '0'/'1'/'2'/'3'/'4'/'6'/'8'               | N    | 左右间距。 |
| radius | String | 'lg'   | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'full' | N    | 圆角风格。 |
| shadow | String | 'sm'   | 'none'/'sm'/'base'/'md'/'lg'/'xl'/'2xl'   | N    | 阴影风格。 |

## CellGroup Slots

| 名称 | 说明                               |
| ---- | ---------------------------------- |
| -    | Cell Group 内容，一般是多个 Cell。 |
