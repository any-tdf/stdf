## TimePicker Props

| 属性        | 类型    | 默认值                               | 可选值                                   | 必传 | 说明               |
| ----------- | ------- | ------------------------------------ | ---------------------------------------- | ---- | ------------------ |
| visible     | Boolean | false                                | true/false                               | N    | 是否显示。         |
| type        | String  | 'YMDhms'                             | 由 Y M D h m s 组合，共 13 种。          | N    | 时间类型。         |
| yearProps   | Object  | {}                                   | 参考 yearProps                           | N    | 年份列参数。       |
| monthProps  | Object  | {}                                   | 参考 monthProps                          | N    | 月份列参数。       |
| dayProps    | Object  | {}                                   | 参考 dayProps                            | N    | 日期列参数。       |
| hourProps   | Object  | {}                                   | 参考 hourProps                           | N    | 小时列参数。       |
| minuteProps | Object  | {}                                   | 参考 minuteProps                         | N    | 分钟列参数。       |
| secondProps | Object  | {}                                   | 参考 secondProps                         | N    | 秒钟列参数。       |
| initYear    | String  | ''                                   | -                                        | N    | 初始选定的年份。   |
| initMonth   | String  | ''                                   | -                                        | N    | 初始选定的月份。   |
| initDay     | String  | ''                                   | -                                        | N    | 初始选定的日期。   |
| initHour    | String  | ''                                   | -                                        | N    | 初始选定的小时。   |
| initMinute  | String  | ''                                   | -                                        | N    | 初始选定的分钟。   |
| initSecond  | String  | ''                                   | -                                        | N    | 初始选定的秒钟。   |
| minuteStep  | Number  | 1                                    | -                                        | N    | 分钟步长。         |
| secondStep  | Number  | 1                                    | -                                        | N    | 秒钟步长。         |
| yearRange   | Array   | []                                   | -                                        | N    | 年份范围。         |
| monthRange  | Array   | [1, 12]                              | -                                        | N    | 月份范围。         |
| hourRange   | Array   | [0, 23]                              | -                                        | N    | 小时范围。         |
| minuteRange | Array   | [0, 59]                              | -                                        | N    | 分钟范围。         |
| secondRange | Array   | [0, 59]                              | -                                        | N    | 秒钟范围。         |
| showTips    | Boolean | true                                 | true/false                               | N    | 是否显示提示信息。 |
| cancelText  | String  | 当前语言的 timePicker.defaultCancel  | -                                        | N    | 取消选项文本。     |
| confirmText | String  | 当前语言的 timePicker.defaultConfirm | -                                        | N    | 确定选项文本。     |
| title       | String  | 当前语言的 timePicker.defaultTitle   | -                                        | N    | 中间标题文本。     |
| yearText    | String  | 当前语言的 timePicker.defaultYear    | -                                        | N    | 年份列提示文本。   |
| monthText   | String  | 当前语言的 timePicker.defaultMonth   | -                                        | N    | 月份列提示文本。   |
| dayText     | String  | 当前语言的 timePicker.defaultDay     | -                                        | N    | 日期列提示文本。   |
| hourText    | String  | 当前语言的 timePicker.defaultHour    | -                                        | N    | 小时列提示文本。   |
| minuteText  | String  | 当前语言的 timePicker.defaultMinute  | -                                        | N    | 分钟列提示文本。   |
| secondText  | String  | 当前语言的 timePicker.defaultSecond  | -                                        | N    | 秒钟列提示文本。   |
| outFormat   | String  | ''                                   | 'object' 或包含 Y M D h m s 组合的字符。 | N    | 返回数据格式。     |
| popup       | Object  | {}                                   | 参考 Popup Props                         | N    | 弹出层参数。       |

## TimePicker Events

| 名称    | 参数                                                                                            | 描述                 |
| ------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| open    | -                                                                                               | 打开时触发。         |
| close   | -                                                                                               | 关闭时触发。         |
| cancel  | -                                                                                               | 点击左侧取消时触发。 |
| confirm | event：事件对象，其中 detail 内有一个参数 times：选定时间之后返回的格式化时间字符串或时间对象。 | 点击右侧确定时触发。 |

## yearProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 年数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 年数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 年数据列对齐方式。       |

## monthProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 月数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 月数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 月数据列对齐方式。       |

## dayProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 日数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 日数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 日数据列对齐方式。       |

## hourProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 时数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 时数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 时数据列对齐方式。       |

## minuteProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 分数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 分数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 分数据列对齐方式。       |

## secondProps

| 属性    | 类型   | 默认值   | 可选值                  | 必传 | 说明                     |
| ------- | ------ | -------- | ----------------------- | ---- | ------------------------ |
| flex    | Number | 1        | -                       | N    | 秒数据列所占的宽度比例。 |
| showRow | Number | 5        | 3/5/7                   | N    | 秒数据列可见行数。       |
| align   | String | 'center' | 'left'/'center'/'right' | N    | 秒数据列对齐方式。       |
