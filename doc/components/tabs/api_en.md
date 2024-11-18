## Tabs Props

| Name       | Type                               | Default  | Required | Description                        |
| ---------- | ---------------------------------- | -------- | -------- | ---------------------------------- |
| tab        | `Tab`                              | `{}`     | Y        | Internal Tab component.            |
| active     | `number`                           | `0`      | N        | Active tab index.                  |
| duration   | `'fast'\|'base'\|'slow'\|'slower'` | `'base'` | N        | Transition animation duration.     |
| position   | `'t'\|'b'\|'l'\|'r'`               | `'t'`    | N        | Tab position.                      |
| transition | `boolean`                          | `true`   | N        | Whether to use transition effects. |

## Tabs Events

| Name     | Type                       | Parameters                | Description                        |
| -------- | -------------------------- | ------------------------- | ---------------------------------- |
| onchange | `(active: number) => void` | active - Active tab index | Triggered when active tab changes. |

## Tabs Snippets

| Name     | Type                            | Parameters                | Description        |
| -------- | ------------------------------- | ------------------------- | ------------------ |
| children | `Snippet<[{ active: number }]>` | active - Active tab index | Tabs main content. |

## Tab Props

| Name              | Type                                                  | Default  | Required | Description                                      |
| ----------------- | ----------------------------------------------------- | -------- | -------- | ------------------------------------------------ |
| labels            | `TabLabel[]`                                          | `[]`     | Y        | Tab content group.                               |
| active            | `number`                                              | `0`      | N        | Active tab index.                                |
| lineType          | `boolean`                                             | `false`  | N        | Whether to use line style.                       |
| radius            | `'none'\|'base'\|'xl'\|'full'`                        | `'base'` | N        | Border radius style.                             |
| mx                | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'\|'12'\|'16'\|'20'` | `'2'`    | N        | Horizontal margin.                               |
| duration          | `'fast'\|'base'\|'slow'\|'slower'`                    | `'base'` | N        | Transition animation duration.                   |
| layout            | `'h'\|'v'`                                            | `'h'`    | N        | Horizontal or vertical layout.                   |
| love              | `boolean`                                             | `false`  | N        | Whether to enable care version.                  |
| injClass          | `string`                                              | `''`     | N        | Inject CSS to Tab wrapper.                       |
| tabInjClass       | `string`                                              | `''`     | N        | Inject CSS to single Tab.                        |
| activeTabInjClass | `string`                                              | `''`     | N        | Inject CSS to active Tab.                        |
| activeInjClass    | `string`                                              | `''`     | N        | Inject CSS to indicator.                         |
| overflow          | `boolean`                                             | `false`  | N        | Whether to enable overflow mode.                 |
| showNum           | `number`                                              | `3`      | N        | Number of fully displayed tabs in overflow mode. |
| autoScroll        | `boolean`                                             | `false`  | N        | Auto scroll in overflow mode.                    |

## Tab Events

| Name       | Type                       | Parameters                 | Description                    |
| ---------- | -------------------------- | -------------------------- | ------------------------------ |
| onclickTab | `(active: number) => void` | active - Active tab index. | Triggered when tab is clicked. |

## TabLabel Props

| Name | Type     | Default | Required | Description                                                               |
| ---- | -------- | ------- | -------- | ------------------------------------------------------------------------- |
| text | `string` | `''`    | N        | Label text.                                                               |
| icon | `Icon`   | `{}`    | N        | Label icon [Icon Props](https://stdf.design/#/components?nav=icon&tab=1). |

## TabContent Props

| Name | Type      | Default | Required | Description              |
| ---- | --------- | ------- | -------- | ------------------------ |
| show | `boolean` | `true`  | N        | Whether to show content. |

## TabContent Snippets

| Name     | Type      | Parameters | Description         |
| -------- | --------- | ---------- | ------------------- |
| children | `Snippet` | -          | TabContent content. |
