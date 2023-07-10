## Pagination Props

| Property         | Type    | Default Value                                  | Options                             | Required | Description                                                      |
| ---------------- | ------- | ---------------------------------------------- | ----------------------------------- | -------- | ---------------------------------------------------------------- |
| total            | Number  | 0                                              | -                                   | Y        | Total number of items.                                           |
| pageSize         | Number  | 10                                             | -                                   | N        | Number of items per page.                                        |
| current          | Number  | 1                                              | -                                   | N        | Current page number.                                             |
| maxShowPage      | Number  | 7                                              | 5/7/9/11                            | N        | Maximum number of page numbers to display.                       |
| radius           | String  | 'md'                                           | 'base'/'md'/'lg'/'xl'/'full'/'none' | N        | Style of pagination button corners.                              |
| type             | String  | 'bold'                                         | 'border'/'block'/'bold'             | N        | Style of highlighted page number.                                |
| pageCol          | Number  | 3                                              | -                                   | N        | Number of columns to display omitted page numbers.               |
| showNextOmitPage | Boolean | false                                          | true/false                          | N        | Whether to display omitted page numbers after the current page.  |
| showPreOmitPage  | Boolean | false                                          | true/false                          | N        | Whether to display omitted page numbers before the current page. |
| injClass         | String  | ''                                             | Class                               | N        | Injected CSS class name.                                         |
| noDataText       | String  | Current language common.noData                 | -                                   | N        | Text to display when there is no data.                           |
| onePageText      | String  | Current language pagination.defaultOnlyOnePage | -                                   | N        | Text to display when there is only one page.                     |

## Pagination Events

| Name   | Parameter(s)                                     | Description                                      |
| ------ | ------------------------------------------------ | ------------------------------------------------ |
| change | event: Event object, detail: current page number | Triggered when the page number is changed.       |
| next   | event: Event object, detail: current page number | Triggered when the "next" button is clicked.     |
| pre    | event: Event object, detail: current page number | Triggered when the "previous" button is clicked. |
