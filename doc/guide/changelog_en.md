## 0.5.1 <font size=1>2024-10-02</font>

- Optimized Button component, please see [Button](https://stdf.design/#/components?nav=button&tab=4).
- Optimized BottomSheet component, please see [BottomSheet](https://stdf.design/#/components?nav=bottomSheet&tab=4).
- Optimized IndexBar component, please see [IndexBar](https://stdf.design/#/components?nav=indexBar&tab=4).
- Fixed Avatar component, please see [Avatar](https://stdf.design/#/components?nav=avatar&tab=4).

## 0.5.0 <font size=1>2024-09-09</font>

- Added Stepper component, please see [Stepper](https://stdf.design/#/components?nav=stepper&tab=0).

## 0.4.7 <font size=1>2024-08-12</font>

- Fixed Pagination component, please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).
- Optimized Loading component, please see [Loading](https://stdf.design/#/components?nav=loading&tab=4).
- Optimized Slider component, please see [Slider](https://stdf.design/#/components?nav=slider&tab=4).

## 0.4.6 <font size=1>2024-03-31</font>

- Add Loading type, For more information, please see [Loading](https://stdf.design/#/components?nav=loading&tab=4).

## 0.4.5 <font size=1>2024-03-28</font>

- Fixed the Pagination component, please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).

## 0.4.4 <font size=1>2023-12-13</font>

- Enhanced Tabs components, please see [Tabs](https://stdf.design/#/components?nav=tabs&tab=4).

## 0.4.3 <font size=1>2023-12-11</font>

- Modify the Tabs component, please see [Tabs](https://stdf.design/#/components?nav=tabs&tab=4).

## 0.4.2 <font size=1>2023-11-21</font>

- Component source code Props adds type annotation according to JSDoc specification, and you will get better IDE prompts when using the component. You can turn on checkJs detection or use TypeScript for type detection.

## 0.4.1 <font size=1>2023-11-13</font>

- The repository has been migrated from dufu1991/stdf to any-tdf/stdf.

## 0.4.0 <font size=1>2023-11-03</font>

- Added support for multi-theme configuration, please refer to [Theme Configuration](https://stdf.design/#/guide/theme), [Color](https://stdf.design/#/guide/color), [Theme Generator](https://stdf.design/#/guide/generator).
- In accordance with the Tailwind naming rules, the gray color has been uniformly changed from `gray5` to `gray-500` writing method. Please note that the writing method should be changed after the upgrade. See [Color](https://stdf.design/#/guide/color) for details.
- The Avatar component adds the usage of the avatar group, please see [Avatar](https://stdf.design/#/components/avatar&tab=4).

## 0.3.2 <font size=1>2023-10-11</font>

- Fix Input, please see [Input](https://stdf.design/#/components?nav=input&tab=4).

## 0.3.1 <font size=1>2023-10-11</font>

- Enhanced the Input component. For details, see [Input](https://stdf.design/#/components?nav=input&tab=4).

## 0.3.0 <font size=1>2023-09-20</font>

- Add NumKeyboard component, please see [NumKeyboard](https://stdf.design/#/components?nav=numKeyboard&tab=0).

## 0.2.11 <font size=1>2023-09-15</font>

- Fix Cell, please see [Cell](https://stdf.design/#/components?nav=cell&tab=4).
- Fix Icon, please see [Icon](https://stdf.design/#/components?nav=icon&tab=4).
- Fix Skeleton, please see [Skeleton](https://stdf.design/#/components?nav=skeleton&tab=4).

## 0.2.10 <font size=1>2023-09-11</font>

- Enhanced the Cell component. For details, see [Cell](https://stdf.design/#/components?nav=cell&tab=4).

## 0.2.9 <font size=1>2023-08-31</font>

- Fixed missing files in NPM package.

## 0.2.8 <font size=1>2023-08-31</font>

- Removed unnecessary code from some components.
- Formatted component code to facilitate consistent code style among other contributors in the future.
- Considering that the size of the component code itself is not large, we decided to directly include the component source code in the NPM package. This makes it easier for users to view the source code directly and avoids the hassle of having to view the source code on GitHub.
- Reverted the language import path back to `stdf/lang/xx_XX`, as described in the [Internationalization](https://stdf.design/#/guide/internation) section.

## 0.2.7 <font size=1>2023-08-26</font>

- 0.2.6 ~ 0.2.7 Added `svelte` to STDF package, allowing it to be directly imported and used in SvelteKit. Related [Issues](https://github.com/any-tdf/stdf/issues/9). [!issue|edhub|]

## 0.2.5 <font size=1>2023-08-16</font>

- The default value of `path` in the Icon component has been modified. Please refer to the [Icon](https://stdf.design/#/components?nav=icon&tab=4) section for more details.
- A new plugin called `rollup-plugin-stdf-icon` has been added. It combines all SVG files in a specified folder into an SVG symbol for the convenience of using the Icon component in STDF. Please see [rollup-plugin-stdf-icon](https://www.npmjs.com/package/rollup-plugin-stdf-icon) for more information.
- The `create-stdf` project has been updated to work with `rollup-plugin-stdf-icon`.

## 0.2.4 <font size=1>2023-08-14</font>

- 0.2.2 ~ 0.2.4 Optimized file structure and reduced NPM package size. Say no to bloated `node_modules` and dependency black holes!
- Updated the language import path from `stdf/lang/xx_XX` to `stdf/dist/lang/xx_XX`. For more details, please refer to the [Internation](https://stdf.design/#/guide/internation).

## 0.2.1 <font size=1>2023-07-26</font>

- Added `create-stdf` to quickly create a project using STDF. (beta version, may have issues)

## 0.2.0 <font size=1>2023-07-23</font>

- Adapted for Svelte 4 while remaining compatible with Svelte 3. Currently, only one item needs to be adapted, which is to upgrade the transition animation of some components. Refer to the Svelte 4 migration guide - [Transitions are local by default](https://svelte.dev/docs/v4-migration-guide#transitions-are-local-by-default).
- Enhanced the Swiper component. For details, see [Swiper](https://stdf.design/#/components?nav=swiper&tab=4).

## 0.1.5 <font size=1>2023-07-19</font>

- Modify the touch events in the components to pointer events, enabling support for various input methods such as mouse, stylus, and touch. The components include BottomSheet, IndexBar, Slider, and Swiper. Related to [Issues](https://github.com/any-tdf/stdf/issues/5). [!issue|shenliqing|]

## 0.1.4 <font size=1>2023-07-16</font>

- Update NPM README.

## 0.1.3 <font size=1>2023-07-16</font>

- Pagination add Props. Please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).

## 0.1.2 <font size=1>2023-07-11</font>

- Pagination fine-tuning. Please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=4).

## 0.1.1 <font size=1>2023-07-10</font>

- Fix Pagination.

## 0.1.0 <font size=1>2023-07-10</font>

- Add Pagination component, please see [Pagination](https://stdf.design/#/components?nav=pagination&tab=0).

## 0.0.27 <font size=1>2023-06-29</font>

- 0.0.12 ~ 0.0.27 versions have no substantial updates, only for testing GitHub Action.

## 0.0.11 <font size=1>2023-06-19</font>

- Optimize Input, please see [Input](https://stdf.design/#/components?nav=input&tab=4).

## 0.0.10 <font size=1>2023-06-17</font>

- Optimize Cell, please see [Cell](https://stdf.design/#/components?nav=cell&tab=4).

## 0.0.9

- Fix AsyncPicker file path.

## 0.0.8

- Fix Calendar, please see [Calendar](https://stdf.design/#/components?nav=calendar&tab=4).

## 0.0.7

- The value of the Context for the multilingual package has been changed from "lang" to "STDF_lang" to avoid conflicts with the names of other language packages within the project.
- Improve the instructions for quickly configuring Tailwind CSS in the site, link to [Issues](https://github.com/any-tdf/stdf/issues/1).[!issue|gavinning|][!contribute|yuedanlabs|]

## 0.0.6

- Add Loading type, For more information, please see [Loading](https://stdf.design/#/components?nav=loading&tab=4).

## 0.0.1 <font size=1>2023-04-27</font>

- Online now.
