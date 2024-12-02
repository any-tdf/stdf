import type { ThemeProps } from './types.js';

/**
 * 传入 hex 格式的颜色值，返回 rgb '255, 255, 255' 格式的字符串
 * Pass in the color value of hex format and return the string of rgb '255, 255, 255' format
 * @example
 * hexToRgb('#ffffff') // '255, 255, 255'
 */
const hexToRgb = (hex: string): string => {
	if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(hex)) {
		return hex;
	}
	hex = hex.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return r + ', ' + g + ', ' + b;
};

/**
 * 给 HTML 元素设置 CSS 变量，用于切换主题
 * Let the HTML element set the CSS variable for switching themes
 * @example
 * setPropertyFunc('--theme-primary', '#000000');
 */
const setPropertyFunc: (name: string, value: string) => void = (name, value) => {
	// 防止传入的是 hex 格式，做一下处理 hexToRgb
	// Prevent passing in hex format and do some processing hexToRgb
	document.documentElement.style.setProperty(name, hexToRgb(value));
};

/**
 * 切换主题
 * Switch theme
 * @example
 * import { stdfTheme } from 'stdf/theme';
 * switchTheme(stdfTheme);
 */
const switchTheme = (theme: ThemeProps): void => {
	const { color } = theme;
	for (const [key, value] of Object.entries(color.primary)) {
		setPropertyFunc(key === 'default' ? '--theme-color-primary' : `--theme-color-primary-${key}`, value);
	}
	for (const [key, value] of Object.entries(color.dark)) {
		setPropertyFunc(key === 'default' ? '--theme-color-dark' : `--theme-color-dark-${key}`, value);
	}
	setPropertyFunc('--theme-color-functional-success', color.functional.success);
	setPropertyFunc('--theme-color-functional-warning', color.functional.warning);
	setPropertyFunc('--theme-color-functional-error', color.functional.error);
	setPropertyFunc('--theme-color-functional-info', color.functional.info);
	setPropertyFunc('--theme-color-primaryBlack', color.primaryBlack);
	setPropertyFunc('--theme-color-primaryWhite', color.primaryWhite);
	setPropertyFunc('--theme-color-darkBlack', color.darkBlack);
	setPropertyFunc('--theme-color-darkWhite', color.darkWhite);
	if (color.extend.length > 0) {
		color.extend.forEach((item, i) => {
			if ('color' in item) {
				setPropertyFunc(`--theme-color-extend${i}`, item.color);
			}
		});
	}
};

export default switchTheme;
