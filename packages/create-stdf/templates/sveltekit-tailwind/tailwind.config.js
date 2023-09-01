/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/stdf/**/*.svelte'],
	theme: {
		colors: {
			// 主题色
			primary: '#0B24FB',
			dark: '#FFC043',
			blue: '#0B24FB', // primary 别名
			yellow: '#FFC043', // dark 别名

			// 扩展色
			purple: '#7356BF',
			green: '#05944F',
			orange: '#FF6937',

			// 功能色
			success: '#11BB8D',
			warning: '#B95000',
			error: '#DA1414',
			info: '#2E5AAC',

			// 中性色
			black: '#000000',
			white: '#fff',
			gray1: '#23262B',
			gray2: '#2A2B2F',
			gray3: '#303239',
			gray4: '#373940',
			gray5: '#414249',
			gray6: '#747B84',
			gray7: '#DADEE3',
			gray8: '#EBEEF2',
			gray9: '#F4F6F9',
			gray10: '#FAFAFB',
			transparent: 'transparent',
		},
		extend: {},
	},
	darkMode: 'class',
	plugins: [],
};
