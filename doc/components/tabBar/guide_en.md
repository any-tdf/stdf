## Description

TabBar passes the index value of the currently active Tab through the bound `change` event.

## Labels

This parameter determines the content of the TabBar options, supporting free combinations of icons and text. The data type is an array of objects, and the internal objects are composed of `text`, `icon`, and `activeIcon`. `icon` and `activeIcon` are rendered using the Icon component, where `activeIcon` represents the Icon when the TabBar is active. For specific parameters, please refer to the Icon API.

## Bottom Line

When `line` is set to `true`, a line is displayed at the bottom of the active TabBar. `lineW` and `activeInjClass` only take effect when `line` is set to `true`.

## CSS Injection

TabBar has a relatively complex structure. In order to support more flexible custom styles, it supports the injection of CSS in four places internally. `injClass` applies to the outermost element of TabBar; `tabInjClass` applies to the internal single Tab; `activeTabInjClass` applies to the currently active Tab; and `activeInjClass` applies to the line at the bottom of TabBar.

If the injected class is not effective, please add "!" before the injected class name, as shown in the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## Simplicity

Compared to other components, the TabBar component is used less frequently in applications, usually only one per application, and generally has a proprietary UI/UX design for its own brand, with low reusability. Therefore, the TabBar component is relatively simple in API design.
