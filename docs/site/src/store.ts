import { writable } from 'svelte/store';

// 是否显示导航
export const isShowNavStore = writable(false);
// 文档 theme 模式，dark、light、auto。
export const themeStore = writable(localStorage.getItem('theme') || 'auto');
// 系统 theme 模式，dark、light
export const sysThemeStore = writable(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// 当前 theme 模式，dark、light
const currentTheme =
	(localStorage.getItem('theme') || 'auto') === 'auto'
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: localStorage.getItem('theme') || 'auto';
export const currentThemeStore = writable(currentTheme);
// 是否开启 cmdK
export const isCmdKStore = writable(false);
// 是否显示赞赏
export const isShowFundStore = writable(false);
// 当前主题色
export const currentColorStore = writable(localStorage.getItem('theme_color') || 'STDF');
// 显示主题色选择器
export const showThemeSwitchStore = writable(false);
// 宽屏显示还是窄屏显示
export const isWideScreenStore = writable(localStorage.getItem('isFull') && localStorage.getItem('isFull') === 'full');
