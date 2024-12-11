import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,svelte}', '../../packages/stdf/**/*.svelte'],
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
				950: 'rgba(var(--theme-color-primary-950), <alpha-value>)'
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
				950: 'rgba(var(--theme-color-dark-950), <alpha-value>)'
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
				950: '#0D0D0D'
			},
			transparent: 'transparent',
			bug1: '#DC2828',
			bug2: '#F09614',
			bug3: '#FAE600',
			bug4: '#37C7FF',
			tailwind: '#60bbf2',
			svelte: '#ff6937'
		},
		extend: {
			spacing: {
				13: '3.25rem',
				17: '4.25rem',
				21: '5.25rem',
				25: '6.25rem',
				33: '8.25rem',
				37: '9.25rem',
				40: '10rem',
				41: '10.25rem',
				49: '12.25rem',
				61: '15.25rem',
				62: '15.5rem',
				65: '16.25rem',
				66: '16.5rem',
				78: '19.5rem',
				81: '20.25rem',
				82: '20.5rem',
				86: '21.5rem',
				92: '23rem',
				98: '24.5rem',
				102: '25.5rem',
				106: '26.5rem'
			},
			keyframes: {
				shake: {
					'10%, 9%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
				},
				lightning: {
					'0%': { opacity: '0' },
					'10%': { opacity: '1' },
					'20%': { opacity: '0' },
					'30%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				path: {
					'0%': { 'stroke-dashoffset': '400', fill: 'transparent' },
					'31%': { 'stroke-dashoffset': '0', fill: 'transparent' },
					'32%': { 'stroke-dashoffset': '0', fill: 'currentColor', opacity: '1' },
					'33%': { opacity: '0' },
					'35%': { opacity: '1' },
					'37%': { opacity: '0' },
					'39%': { opacity: '1' },
					'41%': { opacity: '0' },
					'43%': { opacity: '1' },
					'44%': { 'stroke-dashoffset': '0', fill: 'currentColor' },
					'99%': { 'stroke-dashoffset': '0', fill: 'currentColor' },
					'100%': { 'stroke-dashoffset': '400', fill: 'transparent' }
				},
				dynamicsBg: {
					'0%': { transform: 'rotate(360deg)', height: '14rem', width: '14rem' },
					'50%': { height: '7rem', width: '7rem' },
					'100%': { transform: 'rotate(0deg)', height: '14rem', width: '14rem' }
				},
				cloudMove: {
					'0%': { transform: 'translateX(20%) translateY(-20%)' },
					'50%': { transform: 'translateX(-100%) translateY(-20%)' },
					'100%': { transform: 'translateX(20%) translateY(-20%)' }
				},
				starTwinkle: {
					// 带一点点缩放和透明度变化的闪烁
					'0%': { opacity: '1' },
					'40%': { opacity: '1' },
					'50%': { opacity: '0' },
					'60%': { opacity: '1' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both', // 抖动动画
				lightning: 'lightning 1s linear infinite', // 闪电动画
				path: 'path 3s linear infinite', // 路径动画
				dynamicsBg: 'dynamicsBg 8s linear infinite', // 动态背景动画
				cloudMove: 'cloudMove 40s linear infinite', // 云移动动画
				starTwinkle: 'starTwinkle 8s linear infinite', // 星星闪烁动画
				starTwinkle2: 'starTwinkle 3s linear infinite', // 星星闪烁动画
				starTwinkle3: 'starTwinkle 6s linear infinite', // 星星闪烁动画
				starTwinkle4: 'starTwinkle 4s linear infinite' // 星星闪烁动画
			},
			typography: {
				DEFAULT: {
					css: {
						pre: {
							backgroundColor: 'transparent',
							padding: '0'
						}
					}
				}
			}
		}
	},
	darkMode: 'class',
	plugins: [typography]
} satisfies Config;
