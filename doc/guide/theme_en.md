> Starting from version 0.4.0, STDF supports switching between multiple themes.

## Light and dark modes

### Configuration

To use the dark mode configuration of Tailwind CSS, please configure `darkMode: 'class'` in `tailwind.config.js`, refer to [Dark Mode](https://tailwindcss.com/docs/dark-mode).

### Switching

Starting from version 0.4.0, STDF puts the method of switching between light and dark modes in the STDF NPM package, which is essentially to add or remove the `dark` class name to the `html` tag.

```javascript
// Import darkMode, pass false to switch to light mode, pass no parameters or pass true to switch to dark mode.
import { darkMode } from 'stdf/theme';

// Switch to light mode
darkMode(false);

// Switch to dark mode
darkMode();
```

## Multiple themes

### Introduction

Starting from version 0.4.0, STDF supports switching between multiple themes. The theme currently supports switching [color systems](/#/guide?nav=color), and it is considered that font, spacing, text size and other configurations can also follow the theme switching. The essential principle is to set some attributes as CSS variables, and modify these variables to achieve theme switching.

### Configuration

Please refer to the theme generator to generate the theme configuration format and configure the theme. The theme configuration must include the `name` and `color` attributes. The `name` is the theme name, and the `color` is the color matching of this theme. The default theme configuration is as follows:

> You can go to the <a href="#/guide?nav=generator" target="_blank">Theme Generator</a> to quickly configure the color system and generate the configuration file.

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

According to the Tailwind rules, the `primary/50` this kind of transparency writing method is supported by using CSS variables at the same time. When configuring `theme.extend.colors` in `tailwind.config.js`, hexadecimal cannot be used, and the writing method with alpha channel must be used. STDF uniformly adopts the rgba writing method. You need to **pay special attention to the initial CSS variables, you only need to list the three values ​​of rgb**, refer to [Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables).

```css
/* ✅ ✅ This writing method is correct */
:root {
	--color-primary: 255 115 179;
	--color-dark: 111 114 185;
}
```

```css
/* ❌ ❌ This writing method is wrong */
:root {
	--color-primary: rgb(255 115 179);
	--color-secondary: rgb(111 114 185);
}
```

According to the color system's color matching, plus the basic black, white, gray, and transparency, when configuring `theme.extend.colors` in `tailwind.config.js`, at least the following contents must be included:

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

Finally, add the initial theme CSS variables in the global style, such as `src/app.css`:

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

> Please note that the CSS variable names here must be consistent with the color system configuration in `tailwind.config.js`, otherwise the theme cannot be switched.

### Switching

Import the theme configuration file and the switchTheme method in the NPM package of STDF to switch the theme, and pass in the theme file object.

```javascript
// Import STDF theme configuration file and switch theme method (stdf NPM package contains a stdf theme configuration file)
import { stdfTheme, switchTheme } from 'stdf/theme';
// Import custom theme configuration file, assuming customTheme is a custom theme configuration file
import customTheme from './customTheme';

// Switch theme to STDF theme
switchTheme(stdfTheme);

// Switch theme to custom theme
switchTheme(customTheme);
```

For detailed usage, please refer to [STDF Demo](https://github.com/dufu1991/demo-stdf).

## Summary

### Light and dark modes

Use the darkMode method in the STDF NPM package directly.

### Multiple themes

1. Configure the theme CSS variables in the entry CSS file, such as `src/app.css`.
2. Configure the theme color system in `tailwind.config.js`.
3. Go to the theme generator to configure the color system and generate the theme configuration file.
4. Import the theme configuration file and the switch theme method where you need to switch the theme, and call the switch theme method.

> Of course, if you don’t need to switch themes, you only need to configure the initial CSS variables and configure the color system in `tailwind.config.js`.
