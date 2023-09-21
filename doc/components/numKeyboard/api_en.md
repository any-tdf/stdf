## NumKeyboard Props

| Property     | Type    | Default                                 | Options                                         | Required | Description                                    |
| ------------ | ------- | --------------------------------------- | ----------------------------------------------- | -------- | ---------------------------------------------- |
| type         | String  | 'button'                                | 'button'/'block'                                | No       | The style type of the keyboard.                |
| visible      | Boolean | false                                   | true/false                                      | No       | Whether the keyboard is visible.               |
| height       | String  | '12'                                    | '8'/'10'/'12'/'14'/'16'/'20'                    | No       | The height of the keys.                        |
| gap          | String  | '2'                                     | '0'/'1'/'2'/'3'/'4'                             | No       | The gap between keys.                          |
| p            | String  | '2'                                     | '0'/'1'/'2'/'3'/'4'                             | No       | The padding inside the keyboard.               |
| reverse      | Boolean | false                                   | true/false                                      | No       | Whether the numbers are reversed.              |
| done         | Boolean | true                                    | true/false                                      | No       | Whether to show the done button.               |
| dot          | Boolean | true                                    | true/false                                      | No       | Whether to show the decimal point.             |
| close        | Boolean | false                                   | true/false                                      | No       | Whether to show the close button.              |
| doneText     | String  | The common.done of the current language | -                                               | No       | The text of the done button.                   |
| doneDisabled | Boolean | false                                   | true/false                                      | No       | Whether the done button is disabled.           |
| radius       | String  | 'base'                                  | 'none'/'base'/'md'/'lg'/'xl'/'2xl'/'3xl'/'full' | No       | The border radius of the keys.                 |
| panelClass   | String  | ''                                      | Class                                           | No       | The injected class for the keyboard panel.     |
| keyClass     | String  | ''                                      | Class                                           | No       | The injected class for the keys.               |
| doneClass    | String  | ''                                      | Class                                           | No       | The injected class for the done button.        |
| popup        | Object  | {}                                      | Refer to Popup Props                            | No       | The configuration options for the popup layer. |

## NumKeyboard Events

| Name  | Parameters                                                                                                                                              | Description                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| click | event: event object, with two parameters in the detail property: <br />1. numStr: the input number as a string; <br />2. key: the key that was clicked. | Triggered when any key is clicked.     |
| open  | event: event object, with the keyboardHeight property in the detail property indicating the height of the keyboard.                                     | Triggered when the keyboard is opened. |
| close | -                                                                                                                                                       | Triggered when the keyboard is closed. |

–
