## 使用场景

Calendar 组件用于选择单个日期、多个日期或日期范围。

## 注意事项

传入的 startMonth、endMonth、initMonth 必须是 YYYYMM 格式的字符串，且 initMonth 必须在 startMonth 和 endMonth 之间。另外其他传入用到年月或年月日的属性时，请保证传入的数据格式都是 YYYYMM 或 YYYYMMDD，月和日如果不足两位数时，需要在前面补 0。

## 周开始

部分国家或地区在日常生活中习惯将周日作为一周的第一天，但是按照国际标准 [ISO 8601](https://wikipedia.org/wiki/ISO_8601) 规定，一周的第一天是周一。同时从「周末」这个词的含义来看，周六周日应该是一周的末尾，而不是开头。

所以 Calendar 组件默认周一作为一周的第一天，也建议大家尽量以此为标准。如果需要将周日作为一周的第一天，可以通过 startSunday 属性来设置。

## infoDates

Calendar 组件可以通过传入 infoDates 属性来显示某天的一些提示信息，建议传入的 info 信息长度尽量简短，否则可能造成日历显示不美观。

## disabledDates

Calendar 组件可以通过传入 disabledDates 属性来禁用某些日期，此时如果是范围选择模式，选择的日期中会自动过滤掉禁用的日期。

## 快捷选择

当处于范围选择模式时，Calendar 组件可以通过传入 quickSelects 这个数组属性来决定启用哪些快捷选择方式。

- 当传入的 quickSelects 包含 week 字符时，可以点击当前周快速选定一周的日期范围；当传入的 quickSelects 包含 month 字符时，可以点击当前月快速选定一个月的日期范围；当传入的 quickSelects 包含 quarter 字符时，可以点击当前季度快速选定一个季度的日期范围。
- 当传入的 quickSelects 包含正整数时，组件内部会显示对应的未来几天的快捷选择按钮，比如传入 [3, 7] 时，会显示未来 3 天、7 天的快捷选择按钮，点击后会自动选定对应的日期范围。
- 当传入的 quickSelects 包含负整数时，组件内部会显示对应的过去几天的快捷选择按钮，比如传入 [-3, -7] 时，会显示最近 3 天、7 天的快捷选择按钮，点击后会自动选定对应的日期范围。
- 当使用快捷选择指定天数时，默认是不包含当天的，可以通过修改 includeToday 的值来决定是否包含今天，请参考示例。

## 返回日期格式

当点击 Calendar 组件底部的确定按钮时，会触发 confirm 事件，此时会将当前选中的所有日期数据字符组成数组返回。每个日期的数据格式由 outFormat 决定，返回后的格式中的年与 outFormat 中的 Y 对应，月与 outFormat 中的 M 对应，日与 outFormat 中的 D 对应。请参考示例。

## 月份水印

Calendar 组件可以通过传入 monthMark 属性来决定是否在日历的每个月内显示月份文字的水印，考虑不同语言的月份文字长度不同，可以通过 monthMarkSize 属性来设置水印的字体大小。

## 说明

Calendar 是在 Popup 基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 的 radius 改变圆角风格。

Calendar 内底部的确定按钮使用了 Button 组件，可以通过传入 button 参数来自定义按钮的样式，请参考示例。
