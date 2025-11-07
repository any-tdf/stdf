## Overview

The Form component is used to quickly build complete form pages, supporting various form item types. Configure the `form` array to define form items.

## Supported Form Item Types

The Form component supports the following 11 form item types:

1. **input** - Text input
2. **numKeyboard** - Number keyboard
3. **timePicker** - Time picker
4. **actionSheet** - Action sheet
5. **calendar** - Date picker
6. **picker** - Picker
7. **checkbox** - Checkbox group
8. **radio** - Radio group
9. **slider** - Slider
10. **switch** - Switch
11. **stepper** - Stepper

## Card Layout

- **radius**: Border radius size
- **shadow**: Shadow effect
- **mx**、**px**: Margins
- **space**: Spacing between form items

## Button Configuration

- **submitText** / **resetText**: Custom button text
- **submitButton** / **resetButton**: Custom button styles
- **submitChildren** / **resetChildren**: Custom button content
- **resetText={null}**: Hide reset button

## Events

- **onchange**: Triggered when form item value changes
- **onsubmit**: Triggered on submit
- **onreset**: Triggered on reset

## Notes

1. **name Uniqueness**: Each form item's `name` must be unique
2. **Required Flag**: `required: true` displays a red asterisk, but the component does not include validation logic
3. **Initial Value**: `initValue` must match the correct type for each form item
4. **Sub-component Configuration**: Sub-components can be customized through configuration objects like `input`, `picker`, etc.
5. **Return Value Types**: Different form items return different types of data
