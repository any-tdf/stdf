## Picker Props

| Property           | Type    | Default Value                                 | Optional Values      | Required | Description                                                                          |
| ------------------ | ------- | --------------------------------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------ |
| visible            | Boolean | false                                         | true/false           | N        | Whether the component is visible.                                                    |
| datas              | Array   | []                                            | -                    | Y        | Data for all columns, refer to Picker datas Props.                                   |
| autoScrollToLast   | Boolean | true                                          | true/false           | N        | Whether it automatically scrolls to the last selected item.                          |
| cancelText         | String  | picker.defaultCancel in the current language  | -                    | N        | Text for the cancel button.                                                          |
| confirmText        | String  | picker.defaultConfirm in the current language | -                    | N        | Text for the confirm button.                                                         |
| title              | String  | picker.defaultTitle in the current language   | -                    | N        | Text for the title in the middle.                                                    |
| isLinkage          | Boolean | false                                         | true/false           | N        | Whether it's a multi-level linkage.                                                  |
| linkageInitIndexs  | Array   | []                                            | -                    | N        | Set the initial selected items when it's a multi-level linkage.                      |
| linkageShowRows    | Array   | []                                            | -                    | N        | Set the number of rows displayed for each column in a multi-level linkage.           |
| linkageFlexs       | Array   | []                                            | -                    | N        | Set the width for each column in a multi-level linkage.                              |
| linkageAligns      | Array   | []                                            | -                    | N        | Set the alignment for each column in a multi-level linkage.                          |
| linkageLabelKeys   | Array   | []                                            | -                    | N        | Set the custom label key for each column in a multi-level linkage.                   |
| linkageChildrenKey | String  | 'children'                                    | -                    | N        | Set the key for the children of the upper and lower levels in a multi-level linkage. |
| popup              | Object  | {}                                            | Refer to Popup Props | N        | Popup parameters.                                                                    |

## Picker datas Props

| Property     | Type    | Default Value | Optional Values         | Required | Description                                              |
| ------------ | ------- | ------------- | ----------------------- | -------- | -------------------------------------------------------- |
| data         | Array   | []            | -                       | Y        | Data for the column.                                     |
| showRow      | Number  | 5             | 3/5/7                   | N        | Number of rows displayed for the column.                 |
| initIndex    | Number  | 0             | -                       | N        | Initial selected item for the column.                    |
| useAnimation | Boolean | true          | true/false              | N        | Whether to use animation for scrolling.                  |
| labelKey     | String  | 'label'       | -                       | N        | Custom label key.                                        |
| flex         | Number  | 1             | -                       | N        | Width of the column when there are multiple columns.     |
| align        | String  | 'center'      | 'left'/'center'/'right' | N        | Alignment of the column when there are multiple columns. |

## Picker Events

| Name    | Parameters                                                                                                                                                                  | Description                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| open    | -                                                                                                                                                                           | Triggered when the component is opened.       |
| close   | -                                                                                                                                                                           | Triggered when the component is closed.       |
| cancel  | -                                                                                                                                                                           | Triggered when the cancel button is clicked.  |
| confirm | event: event object, which has two parameters in detail:<br />1. items: an array of multiple selected data.<br />2. indexs: an array of indexes for multiple selected data. | Triggered when the confirm button is clicked. |
