## NavBar Props

| Name     | Type                 | Default                       | Required | Description                                                                                                                                   |
| -------- | -------------------- | ----------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| title    | `string`             | Current language navBar.title | N        | Title text.                                                                                                                                   |
| left     | `'back'\|null\|Icon` | `'back'`                      | N        | Left content, `'back'` for back icon, `null` for no content, otherwise renders [Icon Props](https://stdf.design/#/components?nav=icon&tab=1). |
| rights   | `Icon[]`             | `[]`                          | N        | Right content array of [Icon Props](https://stdf.design/#/components?nav=icon&tab=1), recommend no more than 3 icons.                         |
| line     | `boolean`            | `true`                        | N        | Whether to show bottom divider line.                                                                                                          |
| injClass | `string`             | `''`                          | N        | Inject CSS class name.                                                                                                                        |
| love     | `boolean`            | `false`                       | N        | Whether to enable care version.                                                                                                               |

## NavBar Events

| Name         | Type                      | Parameters                 | Description                         |
| ------------ | ------------------------- | -------------------------- | ----------------------------------- |
| onclickLeft  | `() => void`              | -                          | Triggered when clicking left icon.  |
| onclickRight | `(index: number) => void` | index - Clicked icon index | Triggered when clicking right icon. |

## NavBar Snippets

| Name       | Description                     |
| ---------- | ------------------------------- |
| titleChild | Renders title area when passed. |
| leftChild  | Renders left area when passed.  |
| rightChild | Renders right area when passed. |
