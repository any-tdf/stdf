## Usage Scenario

The TimePicker component is used to select time and supports single and multiple column selection. The default parameter selects the time ten years before and after, and the current time is selected by default.

## Time Types

The TimePicker component determines the selected time type based on the type parameter passed in, which is composed of Y, M, D, h, m, and s. Currently, a total of 13 types are supported, and types not listed here will use the default 'YMDhms' type.

- Y: Year
- M: Month
- h: Hour
- m: Minute
- s: Second
- YM: Year and month
- hm: Hour and minute
- ms: Minute and second
- YMD: Year, month, and day
- hms: Hour, minute, and second
- YMDh: Year, month, day, and hour
- YMDhm: Year, month, day, hour, and minute
- YMDhms: Year, month, day, hour, minute, and second

## Single Column Style

The columns for year, month, day, hour, minute, and second data can all be customized with three styles by passing in the corresponding props, which are flex, showRow, and align. Please refer to the example for specific usage.

## Limiting the Selection Range

Because the number of days per month will dynamically update based on the current year and month, except for the column for day data, all other column data can be limited to a selection range by passing in the corresponding range, which is an array consisting of the corresponding data. However, please ensure that the range array passed in has two items, **each of which is a number**, and the first item is less than the second item, otherwise the default range will be used. Please refer to the example for specific usage.

## Initial Value

By default, each column of data is initialized to the current time. It also supports passing in the corresponding initial value to customize the initial selection. However, it should be noted that the type of the initial value passed in is a character type, and **ensure that the initial values for months, days, hours, minutes, and seconds are padded to two digits if less than two digits**. Please refer to the example for specific usage.

## Minute and Second Step

Considering the actual usage, support for setting the step size for minute and second data is added. The step size is 1 by default, so each selection will increase by 1 minute or 1 second. Please refer to the example for specific usage.

## outFormat

By default, the outFormat of the TimePicker component is generated based on the type passed in, following the rule of "connecting with - between year, month, and day, connecting with : between hour, minute, and second, and connecting with a space between them", for example, YMD corresponds to Y-M-D, YMDh corresponds to Y-M-D h, and hms corresponds to h:m:s, etc. Of course, you can also customize the output format. Please refer to the example for specific usage.

Please note that if the outFormat passed in is an empty string, the selected time will not be formatted, but the time object will be returned directly, which is also convenient for developers to handle themselves.

## Description

The TimePicker is encapsulated based on the Popup, and is implemented by predefining some of the Popup Props. Therefore, different effects can be achieved by passing in the Popup attributes. For example, in the example, the radius of the popup is changed to change the rounded style.
