import type { ThemeProps } from './types.js';

const STDFTheme: ThemeProps = {
	name: 'STDF',
	color: {
		primary: {
			50: '245, 248, 255',
			100: '232, 238, 255',
			200: '187, 203, 254',
			300: '143, 165, 253',
			400: '99, 124, 253',
			500: '55, 81, 252',
			default: '11, 36, 251',
			700: '7, 20, 207',
			800: '4, 9, 164',
			900: '1, 1, 120',
			950: '3, 0, 77'
		},
		dark: {
			50: '255, 254, 245',
			100: '255, 251, 232',
			200: '255, 244, 199',
			300: '255, 234, 166',
			400: '255, 222, 133',
			500: '255, 209, 100',
			default: '255, 192, 67',
			700: '210, 148, 41',
			800: '166, 108, 22',
			900: '121, 72, 8',
			950: '77, 41, 0'
		},
		primaryBlack: '1, 3, 25',
		primaryWhite: '242, 242, 243',
		darkBlack: '25, 17, 1',
		darkWhite: '243, 242, 242',
		functional: {
			success: '17, 187, 141',
			warning: '185, 80, 0',
			error: '218, 20, 20',
			info: '46, 90, 172'
		},
		extend: [
			{ color: '0, 172, 238', alias: 'Twitter' },
			{ color: '255, 105, 55', alias: 'Svelte' },
			{ color: '0, 112, 74', alias: 'Starbucks' }
		]
	}
};

export default STDFTheme;
