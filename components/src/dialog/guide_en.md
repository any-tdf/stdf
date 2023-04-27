## Usage

Dialog is generally used to display content or steps that need to be explicitly known by the user, and can also perform some simple interactive operations. To avoid accidental touches, the click mask will not close by default. It is more powerful than the Modal component that is generally only used for display.

## Description

Dialog is an encapsulated component based on Popup, which achieves different effects by predefining some of Popup's Props. For example, in the example, a different easing effect was achieved by setting the easeType of Popup.

Inside Dialog, Icon and Button components are used, and different effects can be achieved by passing in the Props of Icon and Button. For example, in the example, the radius of the button was customized by setting the radius of the Button.

## Content

The content of the Dialog can be passed in through the content property. When complex content needs to be displayed, the contentSlot can be set to true, and the content can be passed in through the slot. At this time, the content property will be invalid.

## btnRatio

The buttons in the Dialog are of primary and secondary importance, and the size ratio of the main and secondary buttons can be set through btnRatio. For example, when btnRatio is [2:1], the width of the main button is twice that of the secondary button.

## Close

By default, Dialog will not close automatically. It can be closed by clicking the secondary button inside or by changing the visible property outside. Of course, these parameters can be controlled by the Props passed in.
