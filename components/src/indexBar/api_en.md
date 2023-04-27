## IndexBar Props

| Prop          | Type    | Default | Accepted Values      | Required | Description                                                                         |
| ------------- | ------- | ------- | -------------------- | -------- | ----------------------------------------------------------------------------------- |
| data          | Array   | []      | -                    | Y        | An array of index groups.                                                           |
| current       | Number  | 0       | -                    | N        | The index value of the currently active index.                                      |
| top           | Number  | 0       | -                    | N        | The distance between the top of the index content area and the top of the document. |
| height        | Number  | 100     | -                    | Y        | The height of the index content area.                                               |
| radius        | String  | 'base'  | 'none'/'base'/'full' | N        | The style of the border radius.                                                     |
| scrollAlign   | Boolean | true    | true/false           | N        | Whether to enable automatic scroll alignment.                                       |
| titleInjClass | String  | ''      | -                    | N        | Inject custom CSS into the title of the index group.                                |
| textInjClass  | String  | ''      | -                    | N        | Inject custom CSS into the text of the index item.                                  |

## IndexBar Events

| Event Name | Parameters                                                                                                                                                                                                                                                                                                       | Description                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| clickchild | event: Event object, which contains four parameters in the detail property: <br />1. index: The index value of the parent group of the clicked item. <br />2. group: The content of the parent group. <br />3. childIndex: The index value of the clicked item. <br />4. child: The content of the clicked item. | Triggered when an index item is clicked. |
