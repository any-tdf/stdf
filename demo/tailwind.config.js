/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', '../packages/stdf/**/*.svelte'],
	theme: {
		colors: {
			// 主题色
			// Theme Color
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

			// 功能色
			// Functional Color
			success: 'rgba(var(--theme-color-functional-success), <alpha-value>)',
			warning: 'rgba(var(--theme-color-functional-warning), <alpha-value>)',
			error: 'rgba(var(--theme-color-functional-error), <alpha-value>)',
			info: 'rgba(var(--theme-color-functional-info), <alpha-value>)',

			// 扩展色
			// Extended Color
			extend0: 'rgba(var(--theme-color-extend0), <alpha-value>)',
			extend1: 'rgba(var(--theme-color-extend1), <alpha-value>)',
			extend2: 'rgba(var(--theme-color-extend2), <alpha-value>)',

			// 中性色
			// Neutral Color
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
		},
		extend: {
			// 自定义字体
			// Custom Font
			fontFamily: {
				Trueno: 'Trueno',
			},
		},
	},
	darkMode: 'class',
	plugins: [],
};
