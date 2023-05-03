## Input Props

| Property Name     | Type               | Default Value | Optional Values                                                                    | Required | Description                                                   |
| ----------------- | ------------------ | ------------- | ---------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| title             | String/slot        | ''            | -                                                                                  | No       | The title content.                                            |
| placeholder       | String             | ''            | -                                                                                  | No       | The placeholder text for the input field.                     |
| titlePosition     | String             | 'out'         | 'out'/'in'/'none'                                                                  | No       | The position of the title.                                    |
| inputPosition     | String             | 'left'        | 'left'/'right'                                                                     | No       | The position of the input text.                               |
| radius            | String             | 'base'        | 'none'/'base'/'xl'/'full'                                                          | No       | The style of the corner radius.                               |
| inputStyle        | String             | 'block'       | 'block'/'line'                                                                     | No       | The style of the input field.                                 |
| py                | String             | '1'           | '0'/'0.5'/'1'/'2'/'4'                                                              | No       | The vertical spacing.                                         |
| lineTransition    | String             | 'none'        | 'none'/'center'/'left'                                                             | No       | The position of linear transition.                            |
| duration          | String             | 'base'        | 'fast'/'base'/'slow'/'slower'                                                      | No       | The transition duration.                                      |
| value             | String             | ''            | -                                                                                  | No       | The value of the input field.                                 |
| type              | String             | 'text'        | 'text'/'decimal'/'email'/'none'/'numeric'/'search'/'tel'/'url'/'password'/'number' | No       | The type of the input field.                                  |
| inputmode         | String             | ''            | 'text'/'decimal'/'email'/'none'/'numeric'/'search'/'tel'/'url'                     | No       | The data type to be entered.                                  |
| state             | String             | 'theme'       | 'theme'/'success'/'warning'/'error'/'info'                                         | No       | The state of the input field.                                 |
| maxlength         | Number             | 24            | -                                                                                  | No       | The maximum number of characters allowed.                     |
| rows              | Number             | 2             | -                                                                                  | No       | The number of rows when the input is a text area.             |
| autosize          | Boolean            | false         | true/false                                                                         | No       | Whether or not the text area automatically adjust its height. |
| textareaMaxlength | Number             | 200           | -                                                                                  | No       | The maximum number of characters allowed in the text area.    |
| clear             | Boolean            | false         | true/false                                                                         | No       | Whether or not it is possible to clear the input field.       |
| autocomplete      | Boolean            | true          | true/false                                                                         | No       | Whether or not to enable auto-fill functionality.             |
| disabled          | Boolean            | false         | true/false                                                                         | No       | Whether or not the input field is disabled.                   |
| label1            | String/Object/slot | ''            | ''/Icon Props/slot                                                                 | No       | The contents of label 1.                                      |
| label2            | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of label 2.                                      |
| label3            | String/Object/slot | ''            | ''/Icon Props/slot                                                                 | No       | The contents of label 3.                                      |
| label4            | String/Object/slot | ''            | ''/Icon Props/slot                                                                 | No       | The contents of label 4.                                      |
| label5            | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of label 5.                                      |
| label6            | String/Object/slot | ''            | ''/Icon Props/slot                                                                 | No       | The contents of label 6.                                      |
| tip               | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of the hint message.                             |
| data1             | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of data item 1.                                  |
| data2             | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of data item 2.                                  |
| data3             | String/slot        | ''            | ''/Any String/slot                                                                 | No       | The contents of data item 3.                                  |

## Input Events

| Event Name  | Parameters                                                      | Description                                             |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| focus       | event: event object, with 'detail' indicating the current value | Triggered when the input field receives focus.          |
| blur        | event: event object, with 'detail' indicating the current value | Triggered when the input field loses focus.             |
| change      | event: event object, with 'detail' indicating the current value | Triggered when the value of the input field is changed. |
| clear       | -                                                               | Triggered when the clear button is clicked.             |
| clicklabel1 | -                                                               | Triggered when label 1 is clicked.                      |
| clicklabel2 | -                                                               | Triggered when label 2 is clicked.                      |
| clicklabel3 | -                                                               | Triggered when label 3 is clicked.                      |
| clicklabel4 | -                                                               | Triggered when label 4 is clicked.                      |
| clicklabel5 | -                                                               | Triggered when label 5 is clicked.                      |
| clicklabel6 | -                                                               | Triggered when label 6 is clicked.                      |

## Input Slots

| Slot Name | Description                                      |
| --------- | ------------------------------------------------ |
| title     | Content of the title slot.                       |
| data1     | Content of data item 1 slot.                     |
| data2     | Content of data item 2 slot.                     |
| data3     | Content of data item 3 slot.                     |
| label1    | Content of label 1 slot.                         |
| label2    | Content of label 2 slot.                         |
| label3    | Content of label 3 slot.                         |
| label4    | Content of label 4 slot.                         |
| label5    | Content of label 5 slot.                         |
| label6    | Content of label 6 slot.                         |
| tip       | Content of the tip slot (informational message). |
