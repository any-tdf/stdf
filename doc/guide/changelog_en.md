## 0.2.11

- Fix Cell, please see [Cell](https://stdf.design/#/components?nav=cell&tab=4).
- Fix Icon, please see [Icon](https://stdf.design/#/components?nav=icon&tab=4).
- Fix Skeleton, please see [Skeleton](https://stdf.design/#/components?nav=skeleton&tab=4).

## 0.2.10

- Enhanced the Cell component. For details, see [Cell](https://stdf.design/#/components?nav=cell&tab=4).

## 0.2.9

- Fixed missing files in NPM package.

## 0.2.8

- Removed unnecessary code from some components.
- Formatted component code to facilitate consistent code style among other contributors in the future.
- Considering that the size of the component code itself is not large, we decided to directly include the component source code in the NPM package. This makes it easier for users to view the source code directly and avoids the hassle of having to view the source code on GitHub.
- Reverted the language import path back to `stdf/lang/xx_XX`, as described in the [Internationalization](https://stdf.design/#/guide?nav=internation) section.

## 0.2.7

- 0.2.6 ~ 0.2.7 Added `svelte` to STDF package, allowing it to be directly imported and used in SvelteKit. Related [Issues](https://github.com/dufu1991/stdf/issues/9). [!issue|edhub|]

## 0.2.5

- The default value of `path` in the Icon component has been modified. Please refer to the [Icon](https://stdf.design/#/components?nav=icon&tab=4) section for more details.
- A new plugin called `rollup-plugin-stdf-icon` has been added. It combines all SVG files in a specified folder into an SVG symbol for the convenience of using the Icon component in STDF. Please see [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon) for more information.
- The `create-stdf` project has been updated to work with `rollup-plugin-stdf-icon`.

## 0.2.4

- 0.2.2 ~ 0.2.4 Optimized file structure and reduced NPM package size. Say no to bloated `node_modules` and dependency black holes!
- Updated the language import path from `stdf/lang/xx_XX` to `stdf/dist/lang/xx_XX`. For more details, please refer to the [Internation](https://stdf.design/#/guide?nav=internation).

## 0.2.1

- Added `create-stdf` to quickly create a project using STDF. (beta version, may have issues)

## 0.2.0

- Adapted for Svelte 4 while remaining compatible with Svelte 3. Currently, only one item needs to be adapted, which is to upgrade the transition animation of some components. Refer to the Svelte 4 migration guide - [Transitions are local by default](https://svelte.dev/docs/v4-migration-guide#transitions-are-local-by-default).
- Enhanced the Swiper component. For details, see [Swiper](https://stdf.design/#/components?nav=swiper&tab=4).

## 0.1.5

- Modify the touch events in the components to pointer events, enabling support for various input methods such as mouse, stylus, and touch. The components include BottomSheet, IndexBar, Slider, and Swiper. Related to [Issues](https://github.com/dufu1991/stdf/issues/5). [!issue|shenliqing|]

## 0.1.4

- Update NPM README.

## 0.1.3

- Pagination add Props. Please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).

## 0.1.2

- Pagination fine-tuning. Please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).

## 0.1.1

- Fix Pagination.

## 0.1.0

- Add Pagination component, please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=0).

## 0.0.27

- 0.0.12 ~ 0.0.27 versions have no substantial updates, only for testing GitHub Action.

## 0.0.11

- Optimize Input, please see [Input](https://stdf.design/#/components?nav=input&tab=4).

## 0.0.10

- Optimize Cell, please see [Cell](https://stdf.design/#/components?nav=cell&tab=4).

## 0.0.9

- Fix AsyncPicker file path.

## 0.0.8

- Fix Calendar, please see [Calendar](https://stdf.design/#/components?nav=calendar&tab=4).

## 0.0.7

- The value of the Context for the multilingual package has been changed from "lang" to "STDF_lang" to avoid conflicts with the names of other language packages within the project.
- Improve the instructions for quickly configuring Tailwind CSS in the site, link to [Issues](https://github.com/dufu1991/stdf/issues/1).[!issue|gavinning|][!contribute|yuedanlabs|]

## 0.0.6

- Add Loading type, For more information, please see [Loading](https://stdf.design/#/components?nav=loading&tab=4).

## 0.0.1

- Online now.
