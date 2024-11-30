## Q: Why isn't there a rasterization component?

A: Using CSS Flexbox directly can easily and quickly achieve rasterization layout. There is no need to introduce additional components to achieve rasterization layout. Moreover, using Tailwind CSS to write will be very concise.

## Q: Some components require props to be of type string, but passing number types is completely normal?

A: Because these Props inside the component are used as keys of an Object, strictly speaking, they should be passed in as String type. If a number is passed in, it will also be converted to String. Therefore, passing in Number or String types are both acceptable. When type checking is enabled, there will be a type error. Although it can still function normally, it is recommended to pass in the specified types.
