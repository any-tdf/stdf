## 亮暗模式

### 配置

使用 Tailwind CSS 的暗模式配置，请在项目入口 CSS 文件中做如下 `@custom-variant` 配置，参考 [Dark Mode](https://tailwindcss.com/docs/dark-mode)。

```css
@custom-variant dark (&:where(.dark, .dark *))
```

### 切换

STDF 将切换亮暗模式的方法置于 STDF 的 NPM 包中，本质上是直接给 `html` 标签添加或删除 `dark` 类名。

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

STDF 支持多主题切换，主题暂支持切换[颜色系统](/guide/color)，后续考虑字体、间距、文字大小等配置也可跟随主题切换。本质原理是将一些属性设置为 CSS 变量，通过修改这些变量实现主题切换。

### 配置

请参考主题生成器生成的主题配置格式配置好主题，主题配置须包含 name 与 color 两个属性，name 为主题名称，color 为此主题搭配的颜色。

> 可到<a href="/guide/generator" target="_blank">主题生成器</a>快速配置颜色系统并生成配置文件。

默认主题配置如下：

```javascript
{
	name: 'STDF',
	color: {
		primary: {
			50: 'oklch(0.979 0.01 267.36)', // #F5F8FF hsl(222, 100%, 98%)
			100: 'oklch(0.95 0.024 270.343)', // #E8EEFF hsl(224, 100%, 96%)
			200: 'oklch(0.847 0.074 271.188)', // #BBCBFE hsl(226, 97%, 87%)
			300: 'oklch(0.741 0.13 272.232)', // #8FA5FD hsl(228, 97%, 78%)
			400: 'oklch(0.634 0.193 271.595)', // #637CFD hsl(230, 98%, 69%)
			500: 'oklch(0.536 0.252 268.66)', // #3751FC hsl(232, 97%, 60%)
			default: 'oklch(0.467 0.296 264.886)', // #0B24FB hsl(234, 97%, 51%)
			700: 'oklch(0.397 0.26 264.877)', // #0714CF hsl(236, 94%, 42%)
			800: 'oklch(0.331 0.221 264.833)', // #0409A4 hsl(238, 95%, 33%)
			900: 'oklch(0.26 0.178 264.428)', // #010178 hsl(240, 98%, 24%)
			950: 'oklch(0.192 0.13 266.64)' // #03004D hsl(242, 100%, 15%)
		},
		dark: {
			50: 'oklch(0.995 0.012 101.474)', // #FFFEF5 hsl(54, 100%, 98%)
			100: 'oklch(0.986 0.025 97.107)', // #FFFBE8 hsl(50, 100%, 96%)
			200: 'oklch(0.965 0.059 95.884)', // #FFF4C7 hsl(48, 100%, 89%)
			300: 'oklch(0.938 0.089 92.952)', // #FFEAA6 hsl(46, 100%, 83%)
			400: 'oklch(0.91 0.114 89.711)', // #FFDE85 hsl(44, 100%, 76%)
			500: 'oklch(0.88 0.136 86.375)', // #FFD164 hsl(42, 100%, 70%)
			default: 'oklch(0.845 0.153 80.597)', // #FFC043 hsl(40, 100%, 63%)
			700: 'oklch(0.71 0.137 75.734)', // #D29429 hsl(38, 67%, 49%)
			800: 'oklch(0.58 0.118 70.166)', // #A66C16 hsl(36, 77%, 37%)
			900: 'oklch(0.449 0.097 65.209)', // #794808 hsl(34, 88%, 25%)
			950: 'oklch(0.321 0.074 62.379)' // #4D2900 hsl(32, 100%, 15%)
		},
		primaryBlack: 'oklch(0.116 0.054 267.087)', // #010319 hsl(234, 95%, 5%)
		primaryWhite: 'oklch(0.961 0.001 286.375)', // #F2F2F3 hsl(234, 5%, 95%)
		darkBlack: 'oklch(0.183 0.035 86.634)', // #191101 hsl(40, 95%, 5%)
		darkWhite: 'oklch(0.962 0.001 17.178)', // #F3F2F2 hsl(40, 5%, 95%)
		functional: {
			success: 'oklch(0.704 0.142 167.084)', // #11bb8d hsl(164, 83%, 40%)
			warning: 'oklch(0.558 0.154 47.186)', // #b95000 hsl(26, 100%, 36%)
			error: 'oklch(0.564 0.223 28.46)', // #da1414 hsl(0, 83%, 47%)
			info: 'oklch(0.482 0.14 261.518)' // #2e5aac hsl(219, 58%, 43%)
		},
		extend: [
			{
				color: 'oklch(0.703 0.149 235.059)', // #00acee hsl(197, 100%, 47%)
				alias: 'Twitter'
			},
			{
				color: 'oklch(0.702 0.194 38.137)', // #ff6937 hsl(15, 100%, 61%)
				alias: 'Svelte'
			},
			{
				color: 'oklch(0.482 0.107 161.212)', // #00704a hsl(160, 100%, 22%)
				alias: 'Starbucks'
			}
		]
	}
}
```

Tailwind v4 推荐使用 oklch 颜色模式，参考 [Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)。

按照颜色系统的配色，加上基础的黑、白、灰、透明，默认配色在入口 CSS 文件中至少包含以下内容：

```css
@theme {
	/* 主题色 */
	--color-primary-50: oklch(0.979 0.01 267.36);
	--color-primary-100: oklch(0.95 0.024 270.343);
	--color-primary-200: oklch(0.847 0.074 271.188);
	--color-primary-300: oklch(0.741 0.13 272.232);
	--color-primary-400: oklch(0.634 0.193 271.595);
	--color-primary-500: oklch(0.536 0.252 268.66);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.397 0.26 264.877);
	--color-primary-800: oklch(0.331 0.221 264.833);
	--color-primary-900: oklch(0.26 0.178 264.428);
	--color-primary-950: oklch(0.192 0.13 266.64);

	--color-dark-50: oklch(0.995 0.012 101.474);
	--color-dark-100: oklch(0.986 0.025 97.107);
	--color-dark-200: oklch(0.965 0.059 95.884);
	--color-dark-300: oklch(0.938 0.089 92.952);
	--color-dark-400: oklch(0.91 0.114 89.711);
	--color-dark-500: oklch(0.88 0.136 86.375);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.71 0.137 75.734);
	--color-dark-800: oklch(0.58 0.118 70.166);
	--color-dark-900: oklch(0.449 0.097 65.209);
	--color-dark-950: oklch(0.321 0.074 62.379);

	--color-primaryBlack: oklch(0.116 0.054 267.087);
	--color-primaryWhite: oklch(0.961 0.001 286.375);
	--color-darkBlack: oklch(0.183 0.035 86.634);
	--color-darkWhite: oklch(0.962 0.001 17.178);

	/* 功能色 */
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);

	/* 扩展色 */
	--color-extend0: oklch(0.703 0.149 235.059);
	--color-Twitter: oklch(0.703 0.149 235.059);
	--color-extend1: oklch(0.702 0.194 38.137);
	--color-Svelte: oklch(0.702 0.194 38.137);
	--color-extend2: oklch(0.482 0.107 161.212);
	--color-Starbucks: oklch(0.482 0.107 161.212);

 	/* 中性色 */
	--color-black: oklch(0 0 0);
	--color-white: oklch(1 0 0);
	--color-gray-50: oklch(0.961 0 0);
	--color-gray-100: oklch(0.925 0 0);
	--color-gray-200: oklch(0.845 0 0);
	--color-gray-300: oklch(0.767 0 0);
	--color-gray-400: oklch(0.683 0 0);
	--color-gray-500: oklch(0.6 0 0);
	--color-gray-600: oklch(0.51 0 0);
	--color-gray-700: oklch(0.42 0 0);
	--color-gray-800: oklch(0.321 0 0);
	--color-gray-900: oklch(0.218 0 0);
	--color-gray-950: oklch(0.159 0 0);
	--color-transparent: transparent;
	/* ... */
}
```

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

1. 在入口 CSS 文件内配置默认主题 CSS 变量，如 `src/app.css`。
2. 到主题生成器中配置颜色系统并生成主题配置文件。
3. 在需要切换主题的地方引入主题配置文件和切换主题方法，调用切换主题方法。

> 当然，如果你不需要切换主题，只需要配置初始 CSS 变量即可。
