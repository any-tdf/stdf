import type { ThemeProps } from './types.js';

/**
 * 给 HTML 元素设置 CSS 变量，用于切换主题
 * Let the HTML element set the CSS variable for switching themes
 * @example
 * setPropertyFunc('--primary', '#000000');
 */
const setPropertyFunc: (name: string, value: string) => void = (name, value) => {
	document.documentElement.style.setProperty(name, value);
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
		setPropertyFunc(key === 'default' ? '--color-primary' : `--color-primary-${key}`, value);
	}
	for (const [key, value] of Object.entries(color.dark)) {
		setPropertyFunc(key === 'default' ? '--color-dark' : `--color-dark-${key}`, value);
	}
	setPropertyFunc('--color-success', color.functional.success);
	setPropertyFunc('--color-warning', color.functional.warning);
	setPropertyFunc('--color-error', color.functional.error);
	setPropertyFunc('--color-info', color.functional.info);
	setPropertyFunc('--color-primaryBlack', color.primaryBlack);
	setPropertyFunc('--color-primaryWhite', color.primaryWhite);
	setPropertyFunc('--color-darkBlack', color.darkBlack);
	setPropertyFunc('--color-darkWhite', color.darkWhite);
	if (color.extend.length > 0) {
		color.extend.forEach((item, i) => {
			if ('color' in item) {
				setPropertyFunc(`--color-extend${i}`, item.color);
				setPropertyFunc(`--color-${item.alias}`, item.color);
			}
		});
	}
};

export default switchTheme;
