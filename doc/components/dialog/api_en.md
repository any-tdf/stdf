Translation:

## Dialog Props

| Prop            | Type    | Default Value                            | Optional Values               | Required | Description                                                              |
| --------------- | ------- | ---------------------------------------- | ----------------------------- | -------- | ------------------------------------------------------------------------ |
| visible         | Boolean | false                                    | true/false                    | No       | Whether the dialog box is displayed.                                     |
| title           | String  | dialog.title in the current lang         | -                             | No       | The title of the dialog box.                                             |
| titleAlign      | String  | 'center'                                 | 'left'/'center'/'right'       | No       | The alignment of the title.                                              |
| content         | String  | dialog.content in the current lang       | -                             | No       | The content of the dialog box.                                           |
| contentSlot     | Boolean | false                                    | true/false                    | No       | Whether the content uses a slot.                                         |
| popup           | Object  | {}                                       | Refer to Popup props          | No       | The parameters of the pop-up layer.                                      |
| showIcon        | Boolean | false                                    | true/false                    | No       | Whether to show icon.                                                    |
| icon            | Object  | {}                                       | Refer to Icon props           | No       | Icon parameters.                                                         |
| btnStyle        | String  | 'button'                                 | 'button'/'text'/'textLine'    | No       | Button style.                                                            |
| primaryText     | String  | dialog.primaryText in the current lang   | -                             | No       | The text of the primary button.                                          |
| primarySlot     | Boolean | false                                    | true/false                    | No       | Whether the primary button uses a slot.                                  |
| primaryButton   | Object  | {}                                       | Refer to Button props         | No       | Primary button parameters.                                               |
| secondaryText   | String  | dialog.secondaryText in the current lang | -                             | No       | The text of the secondary button.                                        |
| secondaryButton | Object  | {}                                       | Refer to Button props         | No       | Secondary button parameters.                                             |
| btnRatio        | Array   | [1, 1]                                   | -                             | No       | The size ratio of the primary and secondary buttons.                     |
| btnReverse      | Boolean | false                                    | true/false                    | No       | Whether the positions of the primary and secondary buttons are reversed. |
| secondaryClose  | Boolean | true                                     | true/false                    | No       | Whether the secondary button closes the dialog box.                      |
| btnGap          | String  | '2'                                      | '0'/'1'/'2'/'4'/'8'/'12'/'16' | No       | The spacing between the buttons.                                         |

## Dialog Events

| Name      | Parameters | Description                                     |
| --------- | ---------- | ----------------------------------------------- |
| open      | -          | Triggered when the dialog box is opened.        |
| close     | -          | Triggered when the dialog box is closed.        |
| primary   | -          | Triggered when the primary button is clicked.   |
| secondary | -          | Triggered when the secondary button is clicked. |

## Dialog Slots

| Name    | Description                                                 |
| ------- | ----------------------------------------------------------- |
| content | The content when contentSlot is set to true.                |
| primary | The content of the primary button when primarySlot is true. |
