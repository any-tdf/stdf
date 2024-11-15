## IndexBar Props

| Name          | Type                     | Default  | Required | Description                                       |
| ------------- | ------------------------ | -------- | -------- | ------------------------------------------------- |
| data          | `IndexBarItem[]`         | `[]`     | Y        | Array of index data.                              |
| current       | `number`                 | `0`      | N        | Currently active index value.                     |
| top           | `number`                 | `0`      | N        | Distance from index content area to document top. |
| height        | `number`                 | `100`    | Y        | Height of index content area.                     |
| radius        | `'none'\|'base'\|'full'` | `'base'` | N        | Border radius style.                              |
| scrollAlign   | `boolean`                | `true`   | N        | Whether to enable scroll auto-alignment.          |
| titleInjClass | `string`                 | `''`     | N        | Inject CSS for index group title.                 |
| textInjClass  | `string`                 | `''`     | N        | Inject CSS for index item text.                   |

## IndexBar Events

| Name         | Type                                                                              | Parameters                                                                                                                                                                | Description                            |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| onclickChild | `(index: number, group: IndexBarItem, childIndex: number, child: string) => void` | index - Parent group index of clicked item<br />group - Parent group content of clicked item<br />childIndex - Index of clicked item<br />child - Content of clicked item | Triggered when clicking an index item. |

## IndexBarItem Props

| Name   | Type       | Default | Required | Description            |
| ------ | ---------- | ------- | -------- | ---------------------- |
| index  | `string`   | `''`    | Y        | Index value.           |
| title  | `string`   | `''`    | Y        | Title.                 |
| child  | `string[]` | `[]`    | Y        | Array of child items.  |
| height | `number`   | `0`     | N        | Height of child items. |
