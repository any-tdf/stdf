## Q: Why isn't there a rasterization component?

A: Using CSS Flexbox directly can easily and quickly achieve rasterization layout. There is no need to introduce additional components to achieve rasterization layout. Moreover, using Tailwind CSS to write will be very concise.

## Q: Some components require props to be of type string, but passing number types is completely normal?

A: Because these props are used as keys in the object within the component, strictly speaking, they should be of type string. If you pass a number, it will be converted to string, so passing a number or string type is possible. Choose according to personal preference.