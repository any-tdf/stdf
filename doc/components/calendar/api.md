## Calendar Props

| 属性            | 类型         | 默认值                               | 可选值                                    | 必传 | 说明                                         |
| --------------- | ------------ | ------------------------------------ | ----------------------------------------- | ---- | -------------------------------------------- |
| visible         | Boolean      | false                                | true/false                                | N    | 是否显示。                                   |
| startMonth      | String       | 当前月份前第 6 个月                  | 年月日组成的 YYYYMM 格式字符串。          | N    | 开始月份。                                   |
| endMonth        | String       | 当前月份后第 6 个月                  | 年月日组成的 YYYYMM 格式字符串。          | N    | 结束月份。                                   |
| initMonth       | String       | 当前月份                             | 年月日组成的 YYYYMM 格式字符串。          | N    | 初始化时显示月份。                           |
| mode            | String       | 'single'                             | 'single'/'multiple'/'range'               | N    | 选择模式。                                   |
| startSunday     | Boolean      | false                                | true/false                                | N    | 是否从周日开始。                             |
| weekendRed      | Boolean      | false                                | true/false                                | N    | 是否周末红色。                               |
| monthCard       | Boolean      | true                                 | true/false                                | N    | 月数据是否使用卡片样式。                     |
| monthMark       | Boolean      | false                                | true/false                                | N    | 是否显示月份水印。                           |
| monthMarkSize   | String       | '7xl'                                | '3xl'/'4xl'/'5xl'/'6xl'/'7xl'/'8xl'/'9xl' | N    | 月份水印文字大小。                           |
| height          | Number       | 50                                   | 0-100                                     | N    | 显示高度占页面高度百分比。                   |
| infoDates       | Array        | []                                   | 参考 infoDates Props 。                   | N    | 需要显示信息的日期。                         |
| disabledDates   | Array        | []                                   | 由年月日 YYYYMMDD 格式组成的数组。        | N    | 不可选的日期。                               |
| radius          | String       | 'xl'                                 | 'none'/'base'/'xl'/'2xl'                  | N    | 选定日期的圆角风格。                         |
| showSelectedDay | Boolean      | true                                 | true/false                                | N    | 多选和范围选择时确定按钮是否显示已选天数。   |
| confirmText     | String       | 当前语言的 calendarLang.confirmText  | -                                         | N    | 确定按钮文案。                               |
| selectedText    | String       | 当前语言的 calendarLang.selectedText | -                                         | N    | showSelectedDay 为 true 时确定按钮部分文案。 |
| dayText         | String       | 当前语言的 calendarLang.dayText      | -                                         | N    | showSelectedDay 为 true 时确定按钮部分文案。 |
| quickSelects    | Array/Number | []                                   | 'week'/'month'/'quarter'/正整数/负整数    | N    | 快捷选择配置参数。                           |
| includeToday    | Boolean      | false                                | true/false                                | N    | 快速选择天数时是否包含今天。                 |
| highlightToday  | Boolean      | true                                 | true/false                                | N    | 是否高亮今天。                               |
| useAnimation    | Boolean      | true                                 | true/false                                | N    | 自动滚动到指定月份时是否使用动画。           |
| outFormat       | String       | 'YMD'                                | 包含 Y M D 组合的字符。                   | N    | 返回日期数据格式。                           |
| popup           | Object       | {}                                   | 参考 Popup Props                          | N    | 弹出层参数。                                 |
| button          | Object       | {}                                   | 参考 Button Props                         | N    | 确定按钮参数。                               |

## Calendar Events

| 名称    | 参数                                                                                      | 描述                 |
| ------- | ----------------------------------------------------------------------------------------- | -------------------- |
| open    | -                                                                                         | 打开时触发。         |
| close   | -                                                                                         | 关闭时触发。         |
| confirm | event：事件对象，其中 detail 内有一个参数 dates：所有格式化后的选定日期字符串组成的数组。 | 点击确定按钮时触发。 |

## infoDates Props

| 属性 | 类型   | 默认值 | 可选值                           | 必传 | 说明       |
| ---- | ------ | ------ | -------------------------------- | ---- | ---------- |
| date | String | -      | 由年月日 YYYYMMDD 格式组成的数组 | Y    | 日期。     |
| info | String | -      | -                                | Y    | 信息内容。 |
