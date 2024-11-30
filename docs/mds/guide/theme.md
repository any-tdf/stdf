> 从 0.4.0 版本开始，STDF 支持多主题切换。

## 亮暗模式

### 配置

使用 Tailwind CSS 的暗模式配置，请在 `tailwind.config.js` 配置 `darkMode: 'class'`，参考 [Dark Mode](https://tailwindcss.com/docs/dark-mode)。

### 切换

从 0.4.0 版本开始，STDF 将切换亮暗模式的方法置于 STDF 的 NPM 包中，本质上是直接给 `html` 标签添加或删除 `dark` 类名。

```javascript
// 引入 darkMode，传入 false 切换为亮模式，不传参或传入 true 切换为暗模式。
import { darkMode } from 'stdf/theme';

// 切换为亮模式
darkMode(false);

// 切换为暗模式
darkMode();
```

## 多主题模式

### 介绍

从 0.4.0 版本开始，STDF 支持多主题切换，主题暂支持切换[颜色系统](/#/guide/color)，后续考虑字体、间距、文字大小等配置也可跟随主题切换。本质原理是将一些属性设置为 CSS 变量，通过修改这些变量实现主题切换。

### 配置

请参考主题生成器生成的主题配置格式配置好主题，主题配置须包含 name 与 color 两个属性，name 为主题名称，color 为此主题搭配的颜色。默认主题配置如下：

> 可到<a href="#/guide/generator" target="_blank">主题生成器</a>快速配置颜色系统并生成配置文件。

```javascript
{
	name: 'STDF',
	color: {
		primary: {
			50: '245, 248, 255', // #F5F8FF
			100: '232, 238, 255', // #E8EEFF
			200: '187, 203, 254', // #BBCBFE
			300: '143, 165, 253', // #8FA5FD
			400: '99, 124, 253', // #637CFD
			500: '55, 81, 252', // #3751FC
			default: '11, 36, 251', // #0B24FB
			700: '7, 20, 207', // #0714CF
			800: '4, 9, 164', // #0409A4
			900: '1, 1, 120', // #010178
			950: '3, 0, 77', // #03004D
		},
		dark: {
			50: '255, 254, 245', // #FFFEF5
			100: '255, 251, 232', // #FFFBE8
			200: '255, 244, 199', // #FFF4C7
			300: '255, 234, 166', // #FFEAA6
			400: '255, 222, 133', // #FFDE85
			500: '255, 209, 100', // #FFD164
			default: '255, 192, 67', // #FFC043
			700: '210, 148, 41', // #D29429
			800: '166, 108, 22', // #A66C16
			900: '121, 72, 8', // #794808
			950: '77, 41, 0', // #4D2900
		},
		primaryBlack: '1, 3, 25', // #010319
		primaryWhite: '242, 242, 243', // #F2F2F3
		darkBlack: '25, 17, 1', // #191101
		darkWhite: '243, 242, 242', // #F3F2F2
		functional: {
			success: '17, 187, 141', // #11bb8d
			warning: '185, 80, 0', // #b95000
			error: '218, 20, 20', // #da1414
			info: '46, 90, 172', // #2e5aac
		},
		extend: [
			{ color: '0, 172, 238', alias: "Twitter" }, // #00acee
			{ color: '255, 105, 55', alias: "Svelte" }, // #ff6937
			{ color: '0, 112, 74', alias: "Starbucks" }, // #00704a
		],
	},
}
```

按照 Tailwind 的规定，使用 CSS 变量同时支持 `primary/50` 这种透明度写法，在 `tailwind.config.js` 中配置 `theme.extend.colors` 时不能使用十六进制，必须使用带有 alpha 通道写法，STDF 统一采用 rgba 写法。需要**特别注意初始 CSS 变量时只需要将 rgb 的三个值列举出来**，参考 [Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)。

```css
/* ✅ ✅ 这种写法是对的 */
:root {
	--color-primary: 255 115 179;
	--color-dark: 111 114 185;
}
```

```css
/* ❌ ❌ 这种写法是错的 */
:root {
	--color-primary: rgb(255 115 179);
	--color-secondary: rgb(111 114 185);
}
```

按照颜色系统的配色，加上基础的黑、白、灰、透明，在 `tailwind.config.js` 中配置 `theme.extend.colors` 时至少包含以下内容：

```javascript
/** @type {import('tailwindcss').Config} */
// ...
module.exports = {
	// ...
	theme: {
		colors: {
			primary: {
				50: 'rgba(var(--theme-color-primary-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-primary-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-primary-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-primary-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-primary-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-primary-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-primary), <alpha-value>)',
				700: 'rgba(var(--theme-color-primary-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-primary-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-primary-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-primary-950), <alpha-value>)',
			},
			dark: {
				50: 'rgba(var(--theme-color-dark-50), <alpha-value>)',
				100: 'rgba(var(--theme-color-dark-100), <alpha-value>)',
				200: 'rgba(var(--theme-color-dark-200), <alpha-value>)',
				300: 'rgba(var(--theme-color-dark-300), <alpha-value>)',
				400: 'rgba(var(--theme-color-dark-400), <alpha-value>)',
				500: 'rgba(var(--theme-color-dark-500), <alpha-value>)',
				DEFAULT: 'rgba(var(--theme-color-dark), <alpha-value>)',
				700: 'rgba(var(--theme-color-dark-700), <alpha-value>)',
				800: 'rgba(var(--theme-color-dark-800), <alpha-value>)',
				900: 'rgba(var(--theme-color-dark-900), <alpha-value>)',
				950: 'rgba(var(--theme-color-dark-950), <alpha-value>)',
			},
			primaryBlack: 'rgba(var(--theme-color-primaryBlack), <alpha-value>)',
			primaryWhite: 'rgba(var(--theme-color-primaryWhite), <alpha-value>)',
			darkBlack: 'rgba(var(--theme-color-darkBlack), <alpha-value>)',
			darkWhite: 'rgba(var(--theme-color-darkWhite), <alpha-value>)',
			success: 'rgba(var(--theme-color-functional-success), <alpha-value>)',
			warning: 'rgba(var(--theme-color-functional-warning), <alpha-value>)',
			error: 'rgba(var(--theme-color-functional-error), <alpha-value>)',
			info: 'rgba(var(--theme-color-functional-info), <alpha-value>)',
			extend0: 'rgba(var(--theme-color-extend0), <alpha-value>)',
			extend1: 'rgba(var(--theme-color-extend1), <alpha-value>)',
			extend2: 'rgba(var(--theme-color-extend2), <alpha-value>)',
			black: '#000000',
			white: '#ffffff',
			gray: {
				50: '#f2f2f2',
				100: '#e6e6e6',
				200: '#cccccc',
				300: '#b3b3b3',
				400: '#999999',
				500: '#808080',
				600: '#666666',
				700: '#4D4D4D',
				800: '#333333',
				900: '#1A1A1A',
				950: '#0D0D0D',
			},
			transparent: 'transparent',
			// ...
		},
		// ...
	},
	darkMode: 'class',
	// ...
};
```

最后在全局样式增加初始主题的 CSS 变量，如在 `src/app.css` 中配置如下：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--theme-color-primary-50: 245, 248, 255;
		--theme-color-primary-100: 232, 238, 255;
		--theme-color-primary-200: 187, 203, 254;
		--theme-color-primary-300: 143, 165, 253;
		--theme-color-primary-400: 99, 124, 253;
		--theme-color-primary-500: 55, 81, 252;
		--theme-color-primary: 11, 36, 251;
		--theme-color-primary-700: 7, 20, 207;
		--theme-color-primary-800: 4, 9, 164;
		--theme-color-primary-900: 1, 1, 120;
		--theme-color-primary-950: 3, 0, 77;
		--theme-color-dark-50: 255, 254, 245;
		--theme-color-dark-100: 255, 251, 232;
		--theme-color-dark-200: 255, 244, 199;
		--theme-color-dark-300: 255, 234, 166;
		--theme-color-dark-400: 255, 222, 133;
		--theme-color-dark-500: 255, 209, 100;
		--theme-color-dark: 255, 192, 67;
		--theme-color-dark-700: 210, 148, 41;
		--theme-color-dark-800: 166, 108, 22;
		--theme-color-dark-900: 121, 72, 8;
		--theme-color-dark-950: 77, 41, 0;
		--theme-color-primaryBlack: 1, 3, 25;
		--theme-color-primaryWhite: 242, 242, 243;
		--theme-color-darkBlack: 25, 17, 1;
		--theme-color-darkWhite: 243, 242, 242;
		--theme-color-functional-success: 17, 187, 141;
		--theme-color-functional-warning: 185, 80, 0;
		--theme-color-functional-error: 218, 20, 20;
		--theme-color-functional-info: 46, 90, 172;
		--theme-color-extend0: 0, 172, 238;
		--theme-color-extend1: 255, 105, 55;
		--theme-color-extend2: 0, 112, 74;
	}
}
```

> 请注意，这里的 CSS 变量名必须与 `tailwind.config.js` 中的颜色系统配置一致，否则无法切换主题。extend 数量不限，但不同主题的 extend 数量必须一致。

### 切换

引入 NPM 包中的 switchTheme 方法切换主题，传入主题文件对象即可。

```javascript
// 引入 STDF 主题配置文件和切换主题方法（stdf 的 NPM 包中包含一个 stdf 主题配置文件）
import { stdfTheme, switchTheme } from 'stdf/theme';
// 引入自定义主题配置文件，假定 customTheme 为自定义主题配置文件
import customTheme from './customTheme';

// 切换主题为 STDF 主题
switchTheme(stdfTheme);

// 切换主题为自定义主题
switchTheme(customTheme);
```

详细使用方式可参考 [STDF Demo](https://github.com/any-tdf/demo-stdf)。

## 总结

### 亮暗模式

直接使用 STDF 的 NPM 包中的 darkMode 方法即可。

### 多主题模式

1. 在入口 CSS 文件内配置主题 CSS 变量，如 `src/app.css`。
2. 在 `tailwind.config.js` 中配置主题颜色系统。
3. 到主题生成器中配置颜色系统并生成主题配置文件。
4. 在需要切换主题的地方引入主题配置文件和切换主题方法，调用切换主题方法。

> 当然，如果你不需要切换主题，只需要配置初始 CSS 变量并在 `tailwind.config.js` 中配置颜色系统即可。
