## Skeleton Props

| Property  | Type   | Default | Options                                                | Required | Description                                                                                                  |
| --------- | ------ | ------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| type      | String | 'div'   | 'div'/'p'/'img'/'video'/'code'/'qrcode'/'barcode'      | No       | The type of skeleton.                                                                                        |
| width     | String | '6'     | '2'/'4'/'6'/'8'/'12'/'16'/'24'/'32'/'48'/'64'/'96'     | No       | The width of skeleton.                                                                                       |
| height    | String | '6'     | '1'/'2'/'4'/'6'/'8'/'12'/'16'/'24'/'32'/'48'/'64'/'96' | No       | The height of skeleton.                                                                                      |
| radius    | String | 'base'  | 'none'/'base'/'md'/'xl'/'2xl'/'3xl'/'full'             | No       | The border radius style.                                                                                     |
| padding   | String | '1'     | '0.5'/'1'/'2'/'4'                                      | No       | The padding of skeleton.                                                                                     |
| lines     | Number | 3       | -                                                      | No       | The number of lines, only effective when the type is 'p'.                                                    |
| iconRatio | Number | 0.6     | 0-1                                                    | No       | The ratio of the internal icon, only effective when the type is 'img', 'video', 'code', 'qrcode', 'barcode'. |
