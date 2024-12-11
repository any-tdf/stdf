import type { ThemeProps } from 'stdf/theme';

const Chameleon: ThemeProps = {
	name: 'Chameleon',
	color: {
		primary: {
			50: '245, 255, 248', // #F5FFF8
			100: '232, 255, 239', // #E8FFEF
			200: '173, 236, 195', // #ADECC3
			300: '120, 218, 157', // #78DA9D
			400: '74, 199, 126', // #4AC77E
			500: '35, 181, 100', // #23B564
			default: '2, 162, 78', // #02A24E
			700: '1, 141, 73', // #018D49
			800: '1, 119, 66', // #017742
			900: '0, 98, 57', // #006239
			950: '0, 77, 47' // #004D2F
		},
		dark: {
			50: '255, 245, 252', // #FFF5FC
			100: '255, 232, 250', // #FFE8FA
			200: '250, 204, 241', // #FACCF1
			300: '246, 177, 234', // #F6B1EA
			400: '241, 151, 229', // #F197E5
			500: '237, 126, 226', // #ED7EE2
			default: '232, 102, 223', // #E866DF
			700: '193, 64, 189', // #C140BD
			800: '154, 34, 154', // #9A229A
			900: '112, 13, 115', // #700D73
			950: '71, 0, 77' // #47004D
		},
		primaryBlack: '1, 25, 12', // #01190C
		primaryWhite: '242, 243, 242', // #F2F3F2
		darkBlack: '25, 1, 23', // #190117
		darkWhite: '243, 242, 243', // #F3F2F3
		functional: {
			success: '103, 194, 58', // #67c23a
			warning: '230, 162, 60', // #e6a23c
			error: '245, 108, 108', // #f56c6c
			info: '144, 147, 153' // #909399
		},
		extend: [
			{ color: '56, 189, 248', alias: 'Tailwind' }, // #38bdf8
			{ color: '194, 12, 12', alias: 'NetEaseCloudMusic' }, // #c20c0c
			{ color: '65, 95, 255', alias: 'vivo' } // #415fff
		]
	}
};

export default Chameleon;
