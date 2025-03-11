import type { ThemeProps } from '../../lib/theme/types.js';

const SmartLive: ThemeProps = {
	name: 'SmartLive',
	color: {
		primary: {
			50: 'oklch(0.978 0.015 315.966)', // #FCF5FF hsl(282, 100%, 98%)
			100: 'oklch(0.95 0.035 315.73)', // #F8E8FF hsl(282, 100%, 96%)
			200: 'oklch(0.794 0.075 313.533)', // #CDAEDE hsl(279, 42%, 78%)
			300: 'oklch(0.652 0.103 312.25)', // #A57DBD hsl(278, 33%, 62%)
			400: 'oklch(0.522 0.119 309.358)', // #7E549D hsl(275, 30%, 47%)
			500: 'oklch(0.406 0.122 307.073)', // #5B337C hsl(273, 42%, 34%)
			default: 'oklch(0.304 0.112 304.532)', // #3C1A5B hsl(271, 56%, 23%)
			700: 'oklch(0.28 0.115 301.336)', // #341357 hsl(269, 64%, 21%)
			800: 'oklch(0.258 0.119 297.251)', // #2C0C54 hsl(267, 75%, 19%)
			900: 'oklch(0.238 0.12 293.937)', // #250650 hsl(265, 86%, 17%)
			950: 'oklch(0.216 0.123 289.042)' // #1D004D hsl(263, 100%, 15%)
		},
		dark: {
			50: 'oklch(0.98 0.01 25.073)', // #FFF6F5 hsl(6, 100%, 98%)
			100: 'oklch(0.953 0.023 24.126)', // #FFEAE8 hsl(5, 100%, 96%)
			200: 'oklch(0.902 0.051 19.634)', // #FFD2D1 hsl(1, 100%, 91%)
			300: 'oklch(0.853 0.08 18.86)', // #FFBABA hsl(0, 100%, 87%)
			400: 'oklch(0.806 0.111 17.023)', // #FFA2A6 hsl(357, 100%, 82%)
			500: 'oklch(0.765 0.14 16.578)', // #FF8B93 hsl(356, 100%, 77%)
			default: 'oklch(0.728 0.169 15.672)', // #FF7483 hsl(354, 100%, 73%)
			700: 'oklch(0.597 0.173 16.54)', // #D2485A hsl(352, 61%, 55%)
			800: 'oklch(0.482 0.163 17.177)', // #A6263B hsl(350, 63%, 40%)
			900: 'oklch(0.373 0.138 17.973)', // #790E23 hsl(348, 79%, 27%)
			950: 'oklch(0.267 0.107 16.66)' // #4D0012 hsl(346, 100%, 15%)
		},
		primaryBlack: 'oklch(0.129 0.059 306.37)', // #0D0119 hsl(271, 95%, 5%)
		primaryWhite: 'oklch(0.961 0.001 286.375)', // #F2F2F3 hsl(271, 5%, 95%)
		darkBlack: 'oklch(0.139 0.05 18.003)', // #190103 hsl(354, 95%, 5%)
		darkWhite: 'oklch(0.962 0.001 17.178)', // #F3F2F2 hsl(354, 5%, 95%)
		functional: {
			success: 'oklch(0.419 0.092 155.284)', // #155b36 hsl(148, 63%, 22%)
			warning: 'oklch(0.666 0.147 65.222)', // #d07e0b hsl(35, 90%, 43%)
			error: 'oklch(0.564 0.223 28.46)', // #da1414 hsl(0, 83%, 47%)
			info: 'oklch(0.728 0.107 239.498)' // #63b0e3 hsl(204, 70%, 64%)
		},
		extend: [
			{
				color: 'oklch(0.713 0.194 130.802)', // #76b900 hsl(82, 100%, 36%)
				alias: 'NVIDIA'
			},
			{
				color: 'oklch(0.726 0.171 4.454)', // #fb7299 hsl(343, 95%, 72%)
				alias: 'bilibili'
			},
			{
				color: 'oklch(0.599 0.219 259.04)', // #1677ff hsl(215, 100%, 54%)
				alias: 'AliPay'
			}
		]
	}
};

export default SmartLive;
