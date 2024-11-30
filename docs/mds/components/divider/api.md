## Divider Props

| 名称     | 类型                          | 默认值     | 必传 | 说明                        |
| -------- | ----------------------------- | ---------- | ---- | --------------------------- |
| layout   | `'h'\|'v'`                    | `'h'`      | N    | 分隔线类型，水平 h/垂直 v。 |
| px       | `'0'\|'4'\|'8'\|'16'\|'36'`   | `'0'`      | N    | 左右留白（仅水平有效）。    |
| py       | `'0'\|'4'\|'8'`               | `'4'`      | N    | 高度（仅水平有效）。        |
| text     | `string`                      | `''`       | N    | 文本内容（仅水平有效）。    |
| align    | `'left'\|'center'\|'right'`   | `'center'` | N    | 文本位置（仅水平有效）。    |
| line     | `'solid'\|'dashed'\|'dotted'` | `'solid'`  | N    | 线条风格。                  |
| weight   | `'1'\|'2'\|'4'`               | `'1'`      | N    | 线条粗细。                  |
| mx       | `'1'\|'2'\|'4'`               | `'1'`      | N    | 左右间距（仅垂直有效）。    |
| injClass | `string`                      | `''`       | N    | 注入 CSS 名称。             |