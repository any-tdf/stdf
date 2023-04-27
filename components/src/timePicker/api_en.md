## TimePicker Props

| Property    | Type    | Default Value                                       | Optional Values                           | Required | Description                         |
| ----------- | ------- | --------------------------------------------------- | ----------------------------------------- | -------- | ----------------------------------- |
| visible     | Boolean | false                                               | true/false                                | No       | Whether to show.                    |
| type        | String  | 'YMDhms'                                            | Combination of Y M D h m s, totalling 13  | No       | Type of time.                       |
| yearProps   | Object  | {}                                                  | Refer to yearProps                        | No       | Year column params.                 |
| monthProps  | Object  | {}                                                  | Refer to monthProps                       | No       | Month column params.                |
| dayProps    | Object  | {}                                                  | Refer to dayProps                         | No       | Day column params.                  |
| hourProps   | Object  | {}                                                  | Refer to hourProps                        | No       | Hour column params.                 |
| minuteProps | Object  | {}                                                  | Refer to minuteProps                      | No       | Minute column params.               |
| secondProps | Object  | {}                                                  | Refer to secondProps                      | No       | Second column params.               |
| initYear    | String  | ''                                                  | -                                         | No       | Initial selected year.              |
| initMonth   | String  | ''                                                  | -                                         | No       | Initial selected month.             |
| initDay     | String  | ''                                                  | -                                         | No       | Initial selected date.              |
| initHour    | String  | ''                                                  | -                                         | No       | Initial selected hour.              |
| initMinute  | String  | ''                                                  | -                                         | No       | Initial selected minute.            |
| initSecond  | String  | ''                                                  | -                                         | No       | Initial selected second.            |
| minuteStep  | Number  | 1                                                   | -                                         | N        | The step size for minutes.          |
| secondStep  | Number  | 1                                                   | -                                         | N        | The step size for seconds.          |
| yearRange   | Array   | []                                                  | -                                         | N        | The range of years.                 |
| monthRange  | Array   | [1, 12]                                             | -                                         | N        | The range of months.                |
| hourRange   | Array   | [0, 23]                                             | -                                         | N        | The range of hours.                 |
| minuteRange | Array   | [0, 59]                                             | -                                         | N        | The range of minutes.               |
| secondRange | Array   | [0, 59]                                             | -                                         | N        | The range of seconds.               |
| showTips    | Boolean | true                                                | true/false                                | N        | Whether to show the tips.           |
| cancelText  | String  | The default cancel text in the current language     | -                                         | N        | The text for cancel option.         |
| confirmText | String  | `timePicker.defaultConfirm` in the current language | -                                         | N        | The text for the confirm option.    |
| title       | String  | `timePicker.defaultTitle` in the current language   | -                                         | N        | The text for the middle title.      |
| yearText    | String  | `timePicker.defaultYear` in the current language    | -                                         | N        | The text for the year column tip.   |
| monthText   | String  | `timePicker.defaultMonth` in the current language   | -                                         | N        | The text for the month column tip.  |
| dayText     | String  | `timePicker.defaultDay` in the current language     | -                                         | N        | The text for the day column tip.    |
| hourText    | String  | `timePicker.defaultHour` in the current language    | -                                         | N        | The text for the hour column tip.   |
| minuteText  | String  | `timePicker.defaultMinute` in the current language  | -                                         | N        | The text for the minute column tip. |
| secondText  | String  | `timePicker.defaultSecond` in the current language  | -                                         | N        | The text for the second column tip. |
| outFormat   | String  | ''                                                  | 'object' or a combination of Y M D h m s. | N        | The data output format.             |
| popup       | Object  | {}                                                  | Refer to Popup Props                      | N        | The parameters for the popup layer. |

## TimePicker Events

| Name    | Parameters                                                                                                                         | Description                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| open    | -                                                                                                                                  | Triggered when the time picker opens.                             |
| close   | -                                                                                                                                  | Triggered when the time picker closes.                            |
| cancel  | -                                                                                                                                  | Triggered when the "cancel" option on the left side is clicked.   |
| confirm | event: Event Object, which contains a parameter times: the formatted time string or time object returned after selecting the time. | Triggered when the "confirm" option on the right side is clicked. |

## yearProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                         |
| -------- | ------ | ------------- | ----------------------- | -------- | --------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the year data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the year data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the year data column.              |

## monthProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                          |
| -------- | ------ | ------------- | ----------------------- | -------- | ---------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the month data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the month data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the month data column.              |

## dayProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                        |
| -------- | ------ | ------------- | ----------------------- | -------- | -------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the day data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the day data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the day data column.              |

## hourProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                         |
| -------- | ------ | ------------- | ----------------------- | -------- | --------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the hour data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the hour data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the hour data column.              |

## minuteProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                           |
| -------- | ------ | ------------- | ----------------------- | -------- | ----------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the minute data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the minute data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the minute data column.              |

## secondProps

| Property | Type   | Default Value | Optional Values         | Required | Description                                           |
| -------- | ------ | ------------- | ----------------------- | -------- | ----------------------------------------------------- |
| flex     | Number | 1             | -                       | N        | The width proportion of the second data column.       |
| showRow  | Number | 5             | 3/5/7                   | N        | The number of visible rows in the second data column. |
| align    | String | 'center'      | 'left'/'center'/'right' | N        | The alignment of the second data column.              |
