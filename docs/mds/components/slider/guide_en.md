## value, startValue, endValue, minRange, maxRange

When passing in value, startValue, and endValue, please make sure it is between minRange and maxRange.

## step

When passing in step, please try to ensure that (maxRange - minRange) / step is an integer, and consider the accuracy of each step. The step size is too small may cause the slider unable to slide to the required value quickly, thus affecting the user experience.

## Layout

The Slider component does not set external margins, please set it yourself when laying out the page.

## Snippet

When passing in Snippet, the area representing the progress of the Slider will render using Snippet, refer to the example.
