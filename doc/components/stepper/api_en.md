## Stepper Props

| Prop Name       | Type    | Default | Optional Values           | Required | Description                                         |
| --------------- | ------- | ------- | ------------------------- | -------- | --------------------------------------------------- |
| value           | Number  | 10      | -                         | N        | Current value.                                      |
| min             | Number  | 0       | -                         | N        | Minimum value.                                      |
| max             | Number  | 100     | -                         | N        | Maximum value.                                      |
| step            | Number  | 1       | -                         | N        | Step.                                               |
| vertical        | Boolean | false   | -                         | N        | Whether to be vertical.                             |
| numberHighlight | Boolean | false   | -                         | N        | Whether to highlight the number area.               |
| theme           | Boolean | true    | -                         | N        | Whether the highlighted area is the theme color.    |
| radius          | String  | 'base'  | 'none'/'base'/'xl'/'full' | N        | Corner style.                                       |
| decimal         | Number  | 0       | -                         | N        | Number of decimal places for internal display.      |
| async           | Boolean | false   | -                         | N        | Whether to be asynchronous.                         |
| asyncLoading    | Boolean | false   | -                         | N        | Whether to show internal Loading when asynchronous. |
| loading         | Object  | {}      | 参考 Loading Props        | N        | Loading parameters when asynchronous.               |
| padding         | Boolean | true    | -                         | N        | Whether there is padding outside.                   |
| injClassOut     | String  | ''      | Class                     | N        | Class for outside.                                  |
| injClassBtn     | String  | ''      | Class                     | N        | Class for button area.                              |
| injClassNum     | String  | ''      | Class                     | N        | Class for number area.                              |

## Stepper Events

| Name     | Parameters                                             | Description                          |
| -------- | ------------------------------------------------------ | ------------------------------------ |
| change   | event：event object, where value is the current value. | Current value.                       |
| decrease | -                                                      | Triggered when clicking to decrease. |
| increase | -                                                      | Triggered when clicking to increase. |
