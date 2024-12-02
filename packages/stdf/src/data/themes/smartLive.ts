import type { ThemeProps } from '../../lib/theme/types.js';

const SmartLive: ThemeProps = {
	name: 'SmartLive',
	color: {
		primary: {
			50: '252, 245, 255', // #FCF5FF
			100: '248, 232, 255', // #F8E8FF
			200: '205, 174, 222', // #CDAEDE
			300: '165, 125, 189', // #A57DBD
			400: '126, 84, 157', // #7E549D
			500: '91, 51, 124', // #5B337C
			default: '60, 26, 91', // #3C1A5B
			700: '52, 19, 87', // #341357
			800: '44, 12, 84', // #2C0C54
			900: '37, 6, 80', // #250650
			950: '29, 0, 77' // #1D004D
		},
		dark: {
			50: '253, 255, 245', // #FDFFF5
			100: '252, 255, 232', // #FCFFE8
			200: '250, 255, 200', // #FAFFC8
			300: '251, 255, 168', // #FBFFA8
			400: '253, 255, 136', // #FDFF88
			500: '255, 252, 104', // #FFFC68
			default: '255, 247, 72', // #FFF748
			700: '210, 197, 45', // #D2C52D
			800: '166, 149, 23', // #A69517
			900: '121, 104, 9', // #796809
			950: '77, 62, 0' // #4D3E00
		},
		primaryBlack: '13, 1, 25', // #0D0119
		primaryWhite: '242, 242, 243', // #F2F2F3
		darkBlack: '25, 24, 1', // #191801
		darkWhite: '243, 243, 242', // #F3F3F2
		functional: {
			success: '21, 91, 54', // #155b36
			warning: '208, 126, 11', // #d07e0b
			error: '218, 20, 20', // #da1414
			info: '99, 176, 227' // #63b0e3
		},
		extend: [
			{ color: '118, 185, 0', alias: 'NVIDIA' }, // #76b900
			{ color: '251, 114, 153', alias: 'bilibili' }, // #fb7299
			{ color: '22, 119, 255', alias: 'AliPay' } // #1677ff
		]
	}
};

export default SmartLive;
