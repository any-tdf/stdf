## Calendar Props

| Property        | Type         | Default Value                        | Optional Values                                             | Required | Description                                                       |
| --------------- | ------------ | ------------------------------------ | ----------------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| visible         | Boolean      | false                                | true/false                                                  | N        | Whether the calendar is visible.                                  |
| startMonth      | String       | 6 months ago from current month      | A YYYYMM formatted string representing a date.              | N        | The starting month.                                               |
| endMonth        | String       | 6 months after current month         | A YYYYMM formatted string representing a date.              | N        | The ending month.                                                 |
| initMonth       | String       | Current month                        | A YYYYMM formatted string representing a date.              | N        | The initial month to display.                                     |
| mode            | String       | 'single'                             | 'single'/'multiple'/'range'                                 | N        | The selection mode.                                               |
| startSunday     | Boolean      | false                                | true/false                                                  | N        | Whether the week starts on Sunday.                                |
| weekendRed      | Boolean      | false                                | true/false                                                  | N        | Whether weekends are displayed in red.                            |
| monthCard       | Boolean      | true                                 | true/false                                                  | N        | Whether to use card style for month data.                         |
| monthMark       | Boolean      | false                                | true/false                                                  | N        | Whether to display the month watermark.                           |
| monthMarkSize   | String       | '7xl'                                | '3xl'/'4xl'/'5xl'/'6xl'/'7xl'/'8xl'/'9xl'                   | N        | The size of the month watermark text.                             |
| height          | Number       | 50                                   | A number representing the percentage of height.             | N        | The height of the calendar as a percentage.                       |
| infoDates       | Array        | []                                   | Refer to infoDates Props.                                   | Y        | Dates that need to display information.                           |
| disabledDates   | Array        | []                                   | Array of dates in YYYYMMDD format.                          | Y        | Dates that are not selectable.                                    |
| radius          | String       | 'xl'                                 | 'none'/'base'/'xl'/'2xl'                                    | Y        | The style of rounded corners on selected dates.                   |
| showSelectedDay | Boolean      | true                                 | true/false                                                  | Y        | Whether to show the number of selected days.                      |
| confirmText     | String       | The current language's confirm text  | -                                                           | Y        | The text shown on the confirm button.                             |
| selectedText    | String       | The current language's selected text | -                                                           | Y        | Part of the text shown on the confirm button.                     |
| dayText         | String       | The current language's day text      | -                                                           | Y        | Part of the text shown on the confirm button.                     |
| quickSelects    | Array/Number | []                                   | 'week'/'month'/'quarter'/positive integer/ negative integer | Y        | Configuration parameters for quick date selection.                |
| includeToday    | Boolean      | false                                | true/false                                                  | Y        | Whether to include today in quick date selection.                 |
| highlightToday  | Boolean      | true                                 | true/false                                                  | Y        | Whether to highlight today.                                       |
| useAnimation    | Boolean      | true                                 | true/false                                                  | Y        | Whether to use animation when auto-scrolling to specified months. |
| outFormat       | String       | 'YMD'                                | A combination of characters including Y M D.                | Y        | The format of the returned date data.                             |
| popup           | Object       | {}                                   | Refer to Popup Props.                                       | Y        | Parameters for the popup component.                               |
| button          | Object       | {}                                   | Refer to Button Props.                                      | Y        | Parameters for the confirm button.                                |

## Calendar Events

| Name    | Parameter                                                                                 | Description                                   |
| ------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- |
| open    | -                                                                                         | Triggered when the calendar is opened.        |
| close   | -                                                                                         | Triggered when the calendar is closed.        |
| confirm | event: the event object, which includes a parameter `dates`: an array of formatted dates. | Triggered when the Confirm button is clicked. |

## infoDates Props

| Property | Type   | Default Value | Optional Values                | Required | Description  |
| -------- | ------ | ------------- | ------------------------------ | -------- | ------------ |
| date     | String | -             | An array of dates in YYYYMMDD. | Y        | The date.    |
| info     | String | -             | -                              | Y        | Information. |
