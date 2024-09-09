> Input uses the icon ri-close-circle-fill, please ensure that the symbol.svg file in your project includes this icon. For details, please refer to [STDF-Guide-Icon](https://stdf.design/#/guide/icon).

## title and placeholder

If the title is passed in but the placeholder is not, the Input component will use "Please enter + title" as the default placeholder. Both title and placeholder should be passed in at least one.

## type and inputmode

Please refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) for inputmode.

Considering mobile interaction characteristics, the Input component is mainly used for text input. Other components support or interact with input tags with type values ​​such as file, radio, and date. At the same time, type and inputmode have high overlappingness. The optional values ​​of type add password and number on the basis of inputmode. Generally, only type needs to be entered. Of course, you can also set inputmode separately.

Because some processing is done on the input content inside the component, except for password, type will be converted to text when rendering the final input on the page. If needed, please convert the type yourself.

## Listening for Key Events

The Input component internally listens for keyboard key events. When any key is pressed, the keydown event is triggered. The detail property in the event object represents the key that was pressed (Note: keyCode is deprecated, refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)). You can use this value to perform special actions. Please refer to the example.

## Configurable Items

The location of all configurable items of the Input component is shown in the following figure.

<img src="input.jpg" alt="input config" title="输入框配置项">

Normally, Icon Props is used for label1, label3, label4, and label6, and text is used for label2 and label5.

Of course, if these configuration items cannot meet the requirements, they also support rendering with slots. Please refer to the example.

## Textarea

The three parameters textareaMaxlength, rows, and autosize only take effect when the type is "textarea", and rows will be invalid when autosize is true.

## Input Optimization

During the input process of various texts containing "select word" links such as Chinese, Japanese, and Korean, the component verifies the input length and content information only after it is displayed on the screen.
