import { stdfTheme } from '../../../../packages/stdf/theme';
import chameleonTheme from './chameleon';
import AzurePink from './AzurePink';
import SmartLive from './SmartLive';
import CamelliaRed from './CamelliaRed';
import Nintendo from './Nintendo';

/**
 * 传入 rgb 格式 255, 255, 255 的颜色值，返回 hex 格式的颜色值
 * Pass in the color value of rgb format 255, 255, 255 and return the color value of hex format
 * @param {string} rgb
 * @returns {string}
 */
const rgbToHex = rgb => {
	// 如果传入的是 hex 格式的颜色值，直接返回
	// If the color value passed in is in hex format, return directly
	if (rgb.includes('#')) {
		return rgb;
	}
	const rgbArr = rgb.split(',');
	let hex = '#';
	rgbArr.forEach(item => {
		const num = parseInt(item);
		hex += num.toString(16).padStart(2, '0');
	});
	return hex;
};

/**
 * 将 theme 对象中所有的 rgb 格式 255, 255, 255 转换为 hex 格式 #ffffff
 * Let all rgb formats 255, 255, 255 in the theme object be converted to hex format #ffffff
 * @param {Object} theme
 * @returns {Object}
 */
const rgbToHexFunc = theme => {
	const obj = theme.color;
	const primary = obj.primary;
	for (const key in primary) {
		if (Object.hasOwnProperty.call(primary, key)) {
			const element = primary[key];
			if (typeof element === 'string' && element.includes(',')) {
				primary[key] = rgbToHex(element);
			}
		}
	}
	const dark = obj.dark;
	for (const key in dark) {
		if (Object.hasOwnProperty.call(dark, key)) {
			const element = dark[key];
			if (typeof element === 'string' && element.includes(',')) {
				dark[key] = rgbToHex(element);
			}
		}
	}
	obj.functional.success = rgbToHex(obj.functional.success);
	obj.functional.warning = rgbToHex(obj.functional.warning);
	obj.functional.error = rgbToHex(obj.functional.error);
	obj.functional.info = rgbToHex(obj.functional.info);
	const extend = obj.extend;
	extend.forEach(item => {
		item.color = rgbToHex(item.color);
	});
	obj.primaryBlack = rgbToHex(obj.primaryBlack);
	obj.primaryWhite = rgbToHex(obj.primaryWhite);
	obj.darkBlack = rgbToHex(obj.darkBlack);
	obj.darkWhite = rgbToHex(obj.darkWhite);
	theme.color = obj;
	return theme;
};

export default [
	{ name_CN: 'STDF', name: stdfTheme.name, theme: rgbToHexFunc(stdfTheme) },
	{ name_CN: '任天堂', name: Nintendo.name, theme: rgbToHexFunc(Nintendo) },
	{ name_CN: '蔚蓝粉', name: AzurePink.name, theme: rgbToHexFunc(AzurePink) },
	{ name_CN: '变色龙', name: chameleonTheme.name, theme: rgbToHexFunc(chameleonTheme) },
	{ name_CN: '慧活力', name: SmartLive.name, theme: rgbToHexFunc(SmartLive) },
	{ name_CN: '山茶红', name: CamelliaRed.name, theme: rgbToHexFunc(CamelliaRed) },
];
