/**
 * 传入 hex 格式的颜色值，返回 rgb '255, 255, 255' 格式的字符串
 * Pass in the color value of hex format and return the string of rgb '255, 255, 255' format
 * @param {string} hex
 * @returns {string}
 */
const hexToRgb = hex => {
	if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(hex)) {
		return hex;
	}
	hex = hex.replace('#', '');
	var r = parseInt(hex.substring(0, 2), 16);
	var g = parseInt(hex.substring(2, 4), 16);
	var b = parseInt(hex.substring(4, 6), 16);
	return r + ', ' + g + ', ' + b;
};

/**
 * 给 HTML 元素设置 CSS 变量，用于切换主题
 * Let the HTML element set the CSS variable for switching themes
 * @param {string} name 变量名
 * @param {string} value 变量值
 * @returns {void}
 * @example
 * setPropertyFunc('--theme-primary', '#000000');
 */
const setPropertyFunc = (name, value) => {
	// 防止传入的是 hex 格式，做一下处理 hexToRgb
	// Prevent passing in hex format and do some processing hexToRgb
	document.documentElement.style.setProperty(name, hexToRgb(value));
};

/**
 * Primary and dark color object
 * 主色系和暗黑色系对象
 * @typedef {Object<string, string>} PrimaryAndDarkColor
 * @property {string} 50
 * @property {string} 100
 * @property {string} 200
 * @property {string} 300
 * @property {string} 400
 * @property {string} 500
 * @property {string} default
 * @property {string} 700
 * @property {string} 800
 * @property {string} 900
 * @property {string} 950
 */

/**
 * 主题对象
 * Theme object
 * @typedef {object} Theme
 * @property {string} name 主题名称 Theme name
 * @property {object} color 主题颜色 Theme color
 * @property {PrimaryAndDarkColor} color.primary 主色系 Primary color
 * @property {PrimaryAndDarkColor} color.dark 暗黑色系 Dark color
 * @property {string} color.primaryBlack 主色系黑色 Primary color black
 * @property {string} color.primaryWhite 主色系白色 Primary color white
 * @property {string} color.darkBlack 暗黑色系黑色 Dark color black
 * @property {string} color.darkWhite 暗黑色系白色 Dark color white
 * @property {object} color.functional 功能色系 Functional color
 * @property {string} color.functional.success 功能色系成功色 Functional color success
 * @property {string} color.functional.warning 功能色系警告色 Functional color warning
 * @property {string} color.functional.error 功能色系错误色 Functional color error
 * @property {string} color.functional.info 功能色系信息色 Functional color info
 * @property {Array<{color: string, alias: string}>|[]} color.extend 扩展色系 Extend color
 */

/**
 * 切换主题
 * Switch theme
 * @param {Theme} theme 主题对象 Theme object
 * @returns {void} void
 * @example
 * import { stdfTheme } from 'stdf/theme';
 * switchTheme(stdfTheme);
 */
export default theme => {
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
			setPropertyFunc(`--theme-color-extend${i}`, item?.color);
		});
	}
};
