## ActionSheet Props

| Properties     | Type    | Default value                           | optional value          | required | Description                                 |
| -------------- | ------- | --------------------------------------- | ----------------------- | -------- | ------------------------------------------- |
| visible        | Boolean | false                                   | true/false              | N        | Whether to display.                         |
| title          | String  | ''                                      | -                       | N        | title.                                      |
| titleAlign     | String  | 'center'                                | 'left'/'center'/'right' | N        | Title alignment method.                     |
| actions        | Array   | []                                      | refer to Actions Props  | Y        | Menu options, array of Actions Props.       |
| popup          | Object  | {}                                      | refer to Popup Props    | N        | Popping layer parameters.                   |
| showCancel     | Boolean | false                                   | true/false              | N        | Whether to display the cancellation option. |
| cancelText     | String  | Current language actionSheet.cancelText | -                       | N        | Cancel the option text.                     |
| actionClosable | Boolean | true                                    | true/false              | N        | Click whether the option is closed.         |
| align          | String  | 'center'                                | 'left'/'center'/'right' | N        | Alignment.                                  |

## Actions Props

| Properties | Type    | Default value | Optional value                       | required | Description                  |
| ---------- | ------- | ------------- | ------------------------------------ | -------- | ---------------------------- |
| content    | String  | -             | -                                    | Y        | Option content.              |
| style      | String  | 'normal'      | 'normal'/'theme'/'danger'/'disabled' | N        | Option style.                |
| desc       | String  | ''            | -                                    | N        | Option description.          |
| showImg    | Boolean | false         | true/false                           | N        | Whether to display pictures. |
| imgRadius  | String  | 'full'        | 'none'/'base'/'full'/'lg'            | N        | Picture round corner.        |
| imgSrc     | String  | ''            | -                                    | N        | The map's address.           |

## ActionSheet Events

| Name        | Parameter                                                                                                                                                  | Description                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| open        | -                                                                                                                                                          | Triggered when opening.                                                                                        |
| close       | -                                                                                                                                                          | Triggered when closed.                                                                                         |
| cancel      | -                                                                                                                                                          | Click to trigger when cancel.                                                                                  |
| clickAction | event: Event object, where there are two parameters in Detail:<br />1. index: Currently click the index value;<br />2. item: Current click Options Props。 | Triggered when you click the option, even if you click the option, you will be triggered if it is not allowed. |
