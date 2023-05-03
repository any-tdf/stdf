## AsyncPicker Props

| Properties   | Type    | Default value                           | Optional value          | required | Description                           |
| ------------ | ------- | --------------------------------------- | ----------------------- | ----------- | ------------------------------------- |
| visible      | Boolean | false                                   | true/false              | N           | Whether to display.                   |
| data         | Array   | []                                      | -                       | Y           | Column data.                          |
| lastLevel    | Boolean | false                                   | true/false              | N           | Whether it is the last level.         |
| firstLevel   | Boolean | false                                   | true/false              | N           | Whether it is the first level.        |
| showRow      | Number  | 5                                       | 3/5/7                   | N           | Line display rows.                    |
| labelKey     | String  | 'label'                                 | -                       | N           | Custom Label's key.                   |
| align        | String  | 'center'                                | 'left'/'center'/'right' | N           | Alignment.                            |
| cancelText   | String  | Current language picker.defaultCancel   | -                       | N           | Cancel the option text.               |
| confirmText  | String  | Current language picker.defaultConfirm  | -                       | N           | Determine the option text.            |
| title        | String  | Current language picker.defaultTitle    | -                       | N           | The middle title text.                |
| nextText     | String  | Current language picker.defaultNext     | -                       | N           | Next text.                            |
| prevText     | String  | Current language picker.defaultPrev     | -                       | N           | Previous text.                        |
| showSelected | Boolean | false                                   | true/false              | N           | Whether to display the option.        |
| selectedText | String  | Current language picker.defaultSelected | -                       | N           | Selected text.                        |
| popup        | Object  | {}                                      | refer to Popup Props    | N           | Popping layer parameters.             |
| loading      | Object  | {}                                      | refer to Loading Props  | N           | Loading parameters when loading data. |

## AsyncPicker Events

| Name    | Parameter                                                                                                                                                                                                    | Description                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| open    | -                                                                                                                                                                                                            | Triggered when opening.                                      |
| close   | -                                                                                                                                                                                                            | Triggered when closed.                                       |
| cancel  | -                                                                                                                                                                                                            | Click on the left to be triggered.                           |
| prev    | -                                                                                                                                                                                                            | Trip -triggered when you click on the left side of the left. |
| next    | event: Event object, where there is a parameter INDEX in Detail, the index listed in the current selection item.                                                                                             | Triggered when clicking the next level on the right.         |
| confirm | event: Event object, where there are two parameters in Detail: <br /> 1. times: Select the array composed of multiple columns of data; <br /> 2. indexs: Select the array of multiple lines of data indexes. | Click on the right side to trigger.                          |
