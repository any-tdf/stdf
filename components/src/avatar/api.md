## Avatar Props

| 属性       | 类型     | 默认值                                               | 可选值                                   | 必传  | 说明                  |
|----------|--------|---------------------------------------------------|---------------------------------------|-----|---------------------|
| image    | String | ''                                                | -                                     | N   | 图片路径。               |
| alt      | String | ''                                                | -                                     | N   | 替换文本，建议单字。          |
| icon     | Object | { name: 'ri-user-3-line', theme: true, size: 32 } | Icon Props                            | N   | 替换图标，传入 Icon Props。 |
| altSize  | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N   | 替换文本大小。             |
| radius   | String | 'base'                                            | 'none'/'base'/'xl'/'2xl'/'3xl'/'full' | N   | 圆角风格。               |
| size     | String | 'md'                                              | 'xs'/'sm'/'md'/'lg'/'xl'              | N   | 头像框大小。              |
| imgSize  | String | 'l'                                               | 's'/'m'/'l'                           | N   | 头像图片大小。             |
| line     | String | 'none'                                            | 'none'/'solid'/'dashed'/'dotted'      | N   | 边框风格。               |
| injClass | String | ''                                                | Class                                 | N   | 注入 CSS 名称。          |

## Avatar Events

| 名称    | 参数  | 描述    |
|-------|-----|-------|
| click | -   | 点击触发。 |
