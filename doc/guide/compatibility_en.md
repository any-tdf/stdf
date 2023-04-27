STDF's compatibility depends on Svelte and Tailwind CSS.

## Svelte

Most modern browsers on the market already support Svelte 3. Old versions of Internet Explorer may require polyfills, but since mobile devices generally do not use IE and Microsoft has also abandoned IE, we won't discuss it here.

## Tailwind CSS

According to [Browser Support](https://tailwindcss.com/docs/browser-support), the styles within the STDF component library already support modern browsers. If you encounter any issues, please refer to [Can I Use](https://caniuse.com).

## Special Considerations

-   The loading and swiper components implement lazy animation and lazy carousel for performance optimization using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If you need this feature, please make sure your browser supports IntersectionObserver. You can check compatibility at [Can I Use](https://caniuse.com/intersectionobserver).