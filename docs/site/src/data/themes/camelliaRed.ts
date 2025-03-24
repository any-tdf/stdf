import type { ThemeProps } from 'stdf/theme';

const CamelliaRed: ThemeProps = {
	name: 'CamelliaRed',
	color: {
		primary: {
			50: 'oklch(0.98 0.01 25.073)', // #FFF6F5 hsl(6, 100%, 98%)
			100: 'oklch(0.953 0.023 24.126)', // #FFEAE8 hsl(5, 100%, 96%)
			200: 'oklch(0.876 0.061 22.144)', // #FCC7C4 hsl(3, 90%, 88%)
			300: 'oklch(0.799 0.101 20.296)', // #F8A3A2 hsl(1, 86%, 80%)
			400: 'oklch(0.732 0.143 20.141)', // #F58082 hsl(359, 85%, 73%)
			500: 'oklch(0.675 0.18 20.489)', // #F15F66 hsl(357, 84%, 66%)
			default: 'oklch(0.632 0.21 21.584)', // #EE3F4D hsl(355, 84%, 59%)
			700: 'oklch(0.54 0.193 20.999)', // #C6273A hsl(353, 67%, 47%)
			800: 'oklch(0.449 0.168 20.933)', // #9D1529 hsl(351, 76%, 35%)
			900: 'oklch(0.36 0.138 20.161)', // #75081C hsl(349, 87%, 25%)
			950: 'oklch(0.266 0.107 17.45)' // #4D0011 hsl(347, 100%, 15%)
		},
		dark: {
			50: 'oklch(0.99 0.008 319.447)', // #FEFAFF hsl(288, 100%, 99%)
			100: 'oklch(0.953 0.037 320.346)', // #FBE8FF hsl(290, 100%, 96%)
			200: 'oklch(0.915 0.065 318.761)', // #F6D6FF hsl(287, 100%, 92%)
			300: 'oklch(0.877 0.092 317.423)', // #F0C4FF hsl(285, 100%, 88%)
			400: 'oklch(0.841 0.118 315.933)', // #E9B3FF hsl(283, 100%, 85%)
			500: 'oklch(0.803 0.145 314.514)', // #E1A1FF hsl(281, 100%, 82%)
			default: 'oklch(0.765 0.171 312.957)', // #D88FFF hsl(279, 100%, 78%)
			700: 'oklch(0.602 0.188 310.729)', // #A458D2 hsl(277, 58%, 58%)
			800: 'oklch(0.461 0.184 307.198)', // #742EA6 hsl(275, 57%, 42%)
			900: 'oklch(0.339 0.159 303.074)', // #4A1179 hsl(273, 75%, 27%)
			950: 'oklch(0.231 0.124 299.616)' // #28004D hsl(271, 100%, 15%)
		},
		primaryBlack: 'oklch(0.139 0.05 18.003)', // #190103 hsl(355, 95%, 5%)
		primaryWhite: 'oklch(0.962 0.001 17.178)', // #F3F2F2 hsl(355, 5%, 95%)
		darkBlack: 'oklch(0.134 0.06 312.473)', // #100119 hsl(279, 95%, 5%)
		darkWhite: 'oklch(0.961 0.001 286.375)', // #F2F2F3 hsl(279, 5%, 95%)
		functional: {
			success: 'oklch(0.726 0.218 138.487)', // #52c41a hsl(100, 77%, 44%)
			warning: 'oklch(0.802 0.165 76.001)', // #faad14 hsl(40, 96%, 53%)
			error: 'oklch(0.673 0.214 24.465)', // #ff4d4f hsl(359, 100%, 65%)
			info: 'oklch(0.599 0.219 259.04)' // #1677ff hsl(215, 100%, 54%)
		},
		extend: [
			{
				color: 'oklch(0.472 0.108 263.58)', // #3b5998 hsl(221, 44%, 41%)
				alias: 'Facebook'
			},
			{
				color: 'oklch(0.602 0.236 28.928)', // #ed1c16 hsl(2, 86%, 51%)
				alias: 'CocaCola'
			},
			{
				color: 'oklch(0.51 0.145 250.251)', // #0068b5 hsl(206, 100%, 36%)
				alias: 'Intel'
			}
		]
	}
};

export default CamelliaRed;
