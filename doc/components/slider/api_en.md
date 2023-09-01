## Slider Props

| Properties | Type    | Default value | optional value            | required | Description                             |
| ---------- | ------- | ------------- | ------------------------- | -------- | --------------------------------------- |
| value      | Number  | 40            | -                         | N        | The current value.                      |
| step       | Number  | 1             | -                         | N        | Step.                                   |
| minRange   | Number  | 0             | -                         | N        | Optional minimum value.                 |
| maxRange   | Number  | 100           | -                         | N        | The maximum value is available.         |
| isRange    | Boolean | false         | true/false                | N        | Whether it is a interval selection.     |
| startValue | Number  | 20            | -                         | N        | Select the start value of the interval. |
| endValue   | Number  | 60            | -                         | N        | Select the end value of the interval.   |
| showTip    | String  | 'touch'       | 'always'/'never'/'touch'  | N        | Prompt the display method.              |
| radius     | String  | 'full'        | 'none'/'base'/'xl'/'full' | N        | Round -corner style.                    |
| lineBlock  | Boolean | false         | true/false                | N        | Whether the slider is a wire frame.     |
| disabled   | Boolean | false         | true/false                | N        | Whether to disable.                     |
| readonly   | Boolean | false         | true/false                | N        | Whether to read only.                   |
| useSlot    | Boolean | false         | true/false                | N        | Whether to use slot。                   |

## Slider Events

| Name   | Parameters                                                                                                                                         | Description                |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| change | Event: Event object, where default represents the current value (the array of the starting value and the end value when the interval is selected). | Click or slide to trigger. |

## Slider Slots

| Name | Description                                     |
| ---- | ----------------------------------------------- |
| -    | useSlot is the schedule area content when True. |
