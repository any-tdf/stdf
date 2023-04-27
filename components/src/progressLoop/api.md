## ProgressLoop Props

| 属性            | 类型      | 默认值   | 可选值                            | 必传  | 说明                |  
|---------------|---------|-------|--------------------------------|-----|-------------------|
| percent       | Number  | 66    | 0-100                          | N   | 百分比。              |   
| strokeWidth   | Number  | 2     | 0-12                           | N   | 圆环宽度。             |  
| butt          | Boolean | false | true/false                     | N   | 端点是否直角。           |   
| reverse       | Boolean | false | true/false                     | N   | 是否反向（逆时针）。        |   
| duration      | String  | '300' | '150'/'300'/'500'/'700'/'1000' | N   | 动画过渡时间。           |   
| gradient      | Array   | []    | -                              | N   | 渐变色，开始色与结束色组成的数组。 |   
| useSlot       | Boolean | false | true/false                     | N   | 百分比文字是否使用 slot。   |   
| injClass      | String  | ''    | -                              | N   | 激活进度环注入 Class 名称。 |   
| trackInjClass | String  | ''    | -                              | N   | 轨道环注入 Class 名称。   |   

## ProgressLoop Slots

| 名称  | 说 明                         |     
|-----|-----------------------------|
| -   | 当 useSlot 为 true 时百分比文字内容 。 |          