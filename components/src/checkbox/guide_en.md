Translation:

## Description

Due to limited space for horizontal display on mobile devices, CheckboxGroup is set to vertical layout by default. Horizontal layout should only be used for simple usage. When there are many options, long content, or much display content, vertical layout is recommended. When a checkbox is clicked, CheckboxGroup can obtain an array of names of all currently selected checkboxes through the change event.

## icon and iconChecked

The default value of the icon prop of Checkbox props is 'default', which will render as an Icon component according to ri-checkbox-line of Remix Icon. Passing the character 'none' means that the unselected option icon area does not display content. You can also pass the Icon props, and the unselected option icon area will be rendered as an Icon component according to the passed parameters.

The logic of iconChecked is the same as that of icon, which corresponds to the content of the selected option icon area.

## Checkbox Slots

The slot of Checkbox will be rendered in the content area of each Checkbox, and you can design the selected and unselected effects freely by combining with the checkeds obtained from the CheckboxGroup change event.

Note: Although it is convenient to write styles with Tailwind, too much customization will lose the meaning of using the component library.

## Click area optimization

To optimize the experience, the entire area of the CheckboxGroup can be clicked, which will activate the corresponding Checkbox, not just the text or icon area of the Checkbox.

## checkeds and outControl

Checkbox controls whether all options inside the CheckboxGroup are selected by passing in a set of values through checkeds.

When performing operations such as select all, deselect all, or reverse selection, outControl needs to be passed in. Because whether an individual option is selected is not determined by clicking the individual option itself, but by external events, outControl is needed to notify Checkbox of whether the visual effect is controlled by external or self-clicking. Although the Checkbox state can be controlled externally, the individual Checkbox can also be selected and canceled by clicking. Therefore, outControl is needed as a dynamic value to notify Checkbox of whether the visual effect is controlled by external or self-clicking. Refer to the example for specific usage.
