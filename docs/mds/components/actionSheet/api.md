## ActionSheet Props

| 名称           | 类型                                                        | 默认值                            | 必传 | 说明                                |
| -------------- | ----------------------------------------------------------- | --------------------------------- | ---- | ----------------------------------- |
| visible        | `boolean`                                                   | `false`                           | N    | 是否显示。                          |
| title          | `string`                                                    | `''`                              | N    | 标题。                              |
| titleAlign     | `'left'\|'center'\|'right'`                                 | `'center'`                        | N    | 标题对齐方式。                      |
| actions        | `Action[]`                                                  | `[]`                              | N    | 菜单选项，Action Props 组成的数组。 |
| popup          | [`Popup`](https://stdf.design/#/components?nav=popup&tab=1) | `{}`                              | N    | 弹出层参数。                        |
| showCancel     | `boolean`                                                   | `false`                           | N    | 是否显示取消选项。                  |
| cancelText     | `string`                                                    | 当前语言的 actionSheet.cancelText | N    | 取消选项文本。                      |
| actionClosable | `boolean`                                                   | `true`                            | N    | 点击选项是否关闭。                  |
| align          | `'left'\|'center'\|'right'`                                 | `'center'`                        | N    | 对齐方式。                          |

## ActionSheet Events

| 名称          | 类型                                      | 参数                                          | 描述                                         |
| ------------- | ----------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| onclose       | `() => void`                              | -                                             | 关闭时触发。                                 |
| oncancel      | `() => void`                              | -                                             | 点击取消时触发。                             |
| onclickAction | `(index: number, action: Action) => void` | index - 点击索引值<br />action - 点击选项数据 | 点击选项时触发，即使点击选项不关闭也会触发。 |

## Action Props

| 名称      | 类型                                      | 默认值     | 必传 | 说明           |
| --------- | ----------------------------------------- | ---------- | ---- | -------------- |
| content   | `string`                                  | `''`       | Y    | 选项内容。     |
| style     | `'normal'\|'theme'\|'danger'\|'disabled'` | `'normal'` | N    | 选项样式。     |
| desc      | `string`                                  | `''`       | N    | 选项描述。     |
| showImg   | `boolean`                                 | `false`    | N    | 是否显示图片。 |
| imgRadius | `'none'\|'sm'\|'full'\|'lg'`              | `'full'`   | N    | 图片圆角。     |
| imgSrc    | `string`                                  | `''`       | N    | 图片地址。     |
