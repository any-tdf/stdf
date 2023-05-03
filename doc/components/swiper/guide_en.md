## data

The internal `type` supported by the incoming `data` can be `img` or `component`. For the `img` type, the image URL needs to be passed in, and for the `component` type, a single file component needs to be passed in. Swiper will render the corresponding content according to the `type`.

## interval && duration

For ease of writing, note that the interval time is in seconds, and the transition time is in milliseconds, and that the transition time passed in must be less than the interval time.

## indicateStyle

This parameter configures the style of the indicator. When `longLine` is used, the active indicator will represent the interval progress during the time the Swiper stays, please refer to the example.

## indicateInjClass

This parameter can inject CSS class names (not limited to Tailwind CSS) into the indicator region. For example, in the example, the default gradient background with transparency is removed by injecting a class.

If the injected class doesn't work, add an exclamation mark before the class name to force it to take effect. You can refer to the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## aspectRatio && containerWidth && px && py

If `containerWidth` is not passed in or is 0, Swiper will use the page width as the width of the component area by default. The height of this area will be calculated based on `containerWidth` and `aspectRatio`.

Note that `aspectRatio` only determines the aspect ratio of the container, so the aspect ratio of the display area inside each container will only be the same as `aspectRatio` when `px` and `py` are the same.

## Inactive container offset and rotation

By setting the offset values in the X and Z directions and the rotation angles around the X, Y, and Z axes, the inactive container can be offset and rotated on the corresponding axes, achieving some special transition effects. Please refer to the example.

Note that the offset value is in pixels (px), while the rotation angle is in degrees (deg).

## activeInjClass && notActiveInjClass

By injecting classes into the active and inactive containers, containers in different states can have different styles.

## radius && innerInjClass

This is the setting of the rounded corners and injection classes for the internal region of the container. Please refer to the example.

## clickimg event

The click event only works when images are passed in. When components are passed in, the event is determined by the component passed in.

## lazyplay

Swiper has a series of transition animations when autoplaying. When there are a large number of transition effects on the page, considering device performance and animation frame rate issues, Swiper will enable lazy autoplay by default, which means that the Swiper component **will pause autoplay when it is not within the visible range**. Of course, you can also set this separately.

The following two images show the performance monitoring comparison of desktop browsers processing a large number of transition animations when there are 30+ Swipers autoplaying on the same page in extreme cases:

-   When lazy autoplay is not enabled and there are 30+ transition animations being performed at the same time:
    <img src="lazyplay_no.png" style="width: 100%;" alt="lazyplay_no" title="Performance monitoring image when lazy autoplay is not enabled">

-   When lazy autoplay is enabled and only 3-4 transition animations are being performed at the same time:
    <img src="lazyplay_yes.png" style="width: 100%;" alt="lazyplay_yes" title="Performance monitoring image when lazy autoplay is enabled">
