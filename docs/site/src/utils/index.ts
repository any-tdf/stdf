import Color from 'color';
import { oklch, parse, formatHex } from 'culori';
import codeGroupSvgData from './code-group-svg-data';
import hljs from 'highlight.js';
// @ts-expect-error - highlightjs-svelte 缺少类型定义
import hljs_svelte from 'highlightjs-svelte';

hljs_svelte(hljs);

/**
 * 节流，每 n 毫秒执行一次
 * @param {function} func - 需要节流的函数
 * @param {number} wait - 节流的时间间隔
 * @returns {function} - 返回节流后的函数
 * @example
 * const throttleFunc = throttle(() => console.log(123), 1000)
 */
export const throttle = <T extends (...args: unknown[]) => void>(func: T, wait: number = 100) => {
	let timer: null | NodeJS.Timeout = null;
	return function (...args: Parameters<T>) {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			func(...args);
			timer = null;
		}, wait);
	};
};

/**
 * 字符过滤器，防止 HTML 的特殊字符如 <、>、& 等被转义
 * @param {string} text - 需要处理的字符串
 * @returns {string} - 返回处理后的字符串
 * @example
 * htmlFilter('<div>123</div>') // <div>123</div>
 */
const htmlFilter = (text: string) => {
	// 抽离成可配置的匹配列表
	const matchList = {
		'&lt;': '<',
		'&gt;': '>',
		'&amp;': '&',
		'&#34;': '"',
		'&quot;': '"',
		'&#39;': "'"
	};
	let regStr = '(' + Object.keys(matchList).toString() + ')';
	// ↑ ------------【*提取匹配列表 key 值*】.【组数转字符串】
	regStr = regStr.replace(/,/g, ')|(');
	// ↑ 通过匹配将其更新为正则的字符串类型
	const regExp = new RegExp(regStr, 'g');
	// ↑ ------- 字符串 转 正则 方法
	return text.replace(regExp, (match) => matchList[match as keyof typeof matchList]);
	// ↑ ------ 替换方法 (正则，当前 key => 返回当前被匹配的 key 值)
};

/**
 * 将字符串中的一部分替换成另一部分
 * @param {string} str - 需要处理的字符串
 * @param {string} findText - 需要被替换的部分
 * @param {string} replaceText - 需要替换成的部分
 * @returns {string} - 返回处理后的字符串
 * @example
 * replacePart('http://www.baidu.com?name=1&age=2', 'name=1', 'name=2') // http://www.baidu.com?name=2&age=2
 */
const replacePart = (str: string, findText: string, replaceText: string) => {
	return str.replace(findText, replaceText);
};

/**
 * 将 Markdown 文档中的 code 标签高亮
 * @param {string} mdText - 需要处理的 Markdown 文本
 * @returns {string} - 返回处理后的 Markdown 文本
 * @example
 * mdTextToHljs('```js\nconsole.log(123)\n```') // <code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">123</span>)</code>
 */
export const mdTextToHljs = (mdText: string, language: string = '') => {
	// 将所有 <td><code> 标签替换为 <td><code class="hljs language-typescript">
	mdText = mdText.replace(/<td><code>/g, `<td><code class="${language ? 'language-' + language : ''}">`);
	if (mdText.indexOf('<code class="') > 0) {
		let apiText = mdText.indexOf('<code class="') > 0 ? htmlFilter(mdText).replace(/<code class="/g, '<code class="hljs ') : mdText;
		const codeTexts = apiText.match(/<code[\s\S]*?<\/code>/g);
		if (!codeTexts) return apiText;
		for (let t = 0; t < codeTexts.length; t++) {
			const languageMatch = codeTexts[t].match(/<code class="hljs language-(.*?)">/);
			const language = languageMatch ? languageMatch[1] : ''; //语言
			const codeMatch = codeTexts[t].match(/<code[\s\S]*?>([\s\S]*?)<\/code>/);
			const code = codeMatch ? codeMatch[1] : '';
			const highlightedCode = language
				? hljs.highlight(code, {
						language,
						ignoreIllegals: true
					}).value
				: hljs.highlightAuto(code).value;
			// 将高亮代码替换原代码
			const newCode = codeTexts[t].replace(code, highlightedCode);
			apiText = replacePart(apiText, codeTexts[t], newCode);
		}

		return apiText;
	} else {
		return mdText;
	}
};

/**
 * 传入解析出来的 md 文档字符，找到其中  ::: code-group 与  ::: 之间的代码块，并将其分组，实现代码块的 tab 分组显示，
 * 其中 label 标签中的内容为 tab 标签的标题，并在文字前面增加一个 icon 标签，icon 标签的 class 内容为 iconfont 的类名
 * @param {string} md - 解析出来的 md 文档字符
 * @returns {string} - 返回处理后的 md 文档字符
 */
export const groupIconMdPlugin = (md: string) => {
	// 找出自字符中所有的 ::: code-group 与  ::: 之间的字符组成数组
	const codeGroupStrListAll = md.match(/<!-- :::code-groups -->[\s\S]*?<!-- ::: -->/g);
	if (!codeGroupStrListAll) {
		return md;
	}
	const codeGroupStrList = codeGroupStrListAll.map((item) =>
		item
			.replace(/<!-- :::code-groups -->/g, '')
			.replace(/<!-- ::: -->/g, '')
			.split('<!-- :: -->')
	);
	const codeGroupList = codeGroupStrList.map((item) =>
		item.map((subItem) => {
			return {
				tab: subItem.match(/<!-- (.*?) -->/)?.[1],
				code: subItem.replace(/<!-- (.*?) -->/, '')
			};
		})
	);

	const codeGroupHtmlList = codeGroupList.map((item, index) => {
		const arr: { label: string; code: string }[] = [];
		item.forEach((subItem, subIndex) => {
			const label = `
			<input id="tab-${index + '-' + subIndex}" type="radio" name="tab-${index}" class="peer/tab-${index + '-' + subIndex} w-0 hidden" ${
				subIndex === 0 ? 'checked' : ''
			} />
				<label
					for="tab-${index + '-' + subIndex}"
					class="border-b-2 border-black/10 dark:border-white/10 peer-checked/tab-${index + '-' + subIndex}:border-primary dark:peer-checked/tab-${
						index + '-' + subIndex
					}:border-dark transition duration-300 cursor-pointer py-2 px-3 inline-flex items-center gap-1 text-xs"
				>
					${codeGroupSvgData.find((icon) => icon.name === subItem.tab)?.svg}${subItem.tab}
				</label>
			`;
			const code = `<div class="hidden peer-checked/tab-${index + '-' + subIndex}:block w-full">${subItem.code}</div>`;
			arr.push({ label, code });
		});
		return `
			<section class="flex flex-row flex-wrap bg-black/5 dark:bg-[#202020] rounded-sm mb-4">
				${arr.map((item) => item.label).join('')}
				${arr.map((item) => item.code).join('')}
			</section>
			`;
	});
	const replaceCodeGroups = (inputString: string, replacements: string[]) => {
		// 定义正则表达式匹配 <!-- :::code-groups --> 与 <!-- ::: --> 之间的内容
		const regex = /<!--\s*:::code-groups\s*-->(.*?)<!--\s*:::\s*-->/gs;

		let index = 0;
		// 替换匹配到的部分
		inputString = inputString.replace(regex, () => {
			if (index < replacements.length) {
				return replacements[index++];
			}
			return '';
		});

		return inputString;
	};
	return replaceCodeGroups(md, codeGroupHtmlList).replace(/w-full">\n\n<pre>/g, 'w-full">\n\n<pre style="margin: 0;">');
};

/**
 * 去除 url 最后一项的？方法
 * @param {string} url - 需要处理的 url
 * @returns {string} - 返回处理后的 url
 * @example
 * delLastParamsUrl('http://www.baidu.com?') // http://www.baidu.com
 */
const delLastParamsUrl = (url: string) => {
	if (url.lastIndexOf('?') === url.length - 1) {
		url = url.substring(0, url.length - 1);
	}
	return url;
};

/**
 * 去除 url 中指定参数的方法
 * @param {string} url - 需要处理的 url
 * @param {string} name - 需要去除的参数名
 * @returns {string} - 返回处理后的 url
 * @example
 * delParamsUrl('http://www.baidu.com?name=1&age=2', 'name') // http://www.baidu.com?age=2
 */
export const delParamsUrl = (url: string, name: string) => {
	const baseUrl = url.split('?')[0] + '?';
	const query = url.split('?')[1];
	if (query.indexOf(name) > -1) {
		const obj: Record<string, string> = {};
		const arr = query.split('&');
		for (let i = 0; i < arr.length; i++) {
			const key = arr[i].split('=')[0];
			obj[key] = arr[i].split('=')[1];
		}
		delete obj[name];
		url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&');
		return delLastParamsUrl(url);
	} else {
		return delLastParamsUrl(url);
	}
};

/**
 * 传入 hex 格式的颜色值，将其转换成 oklch 格式，oklch(l c h),其中 lch 为 0-1 之间的值，保留三位小数
 * @param {string} str - 颜色值
 * @returns {string} - 返回 oklch 格式的颜色值
 * @example
 * getOklchFunc('#000') // 'oklch(0 0 0)'
 */
export const getOklchFunc = (str: string) => {
	const l = oklch(parse(str))?.l || 0;
	const c = oklch(parse(str))?.c || 0;
	const h = oklch(parse(str))?.h || 0;
	return `oklch(${parseFloat(l.toFixed(3))} ${parseFloat(c.toFixed(3))} ${parseFloat(h.toFixed(3))})`;
};

/**
 * 传入 oklch 格式色值，将其转为成 hex 格式
 * @param {string} str - 颜色值
 * @returns {string} - 返回 hex 格式的颜色值
 * @example
 * getHexFunc('oklch(0 0 0)') // '#000000'
 */
export const getHexFunc = (oklchString: string) => {
	// 解析字符串，提取 l, c, h 值
	const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (match) {
		const [_, l, c, h] = match.map(Number); // 转换为数字
		// 创建 OKLCH 对象
		const oklchColor = { mode: 'oklch' as const, l, c, h };
		// 转换为 HEX
		const hexColor = formatHex(oklchColor);
		return hexColor;
	} else {
		return oklchString;
	}
};

const formats = ['hex', 'rgb', 'hsl'];
/**
 * 获取颜色格式
 * @param {string} format - 颜色格式
 * @returns {string} - 返回颜色格式
 * @example
 * getFormat('hex') // hex
 */
const getFormat = (format: string) => {
	if (!format || formats.indexOf(format) < 0) {
		return 'hex';
	}
	return format;
};

/**
 * 获取颜色字符串
 * @param {object} color - 颜色对象
 * @param {string} format - 颜色格式
 * @returns {string} - 返回颜色字符串
 * @example
 * getColorString(Color('#fff'),'rgb') // rgb(255,255,255)
 */
const getColorString = (color: Color, format: string) => {
	const innerFormat = getFormat(format);

	if (innerFormat === 'hex') {
		return color[innerFormat as 'hex']();
	}
	return color[innerFormat as 'rgb' | 'hsl']().round().string();
};

/**
 * 动态梯度算法
 * @param {string} originColor - 颜色值
 * @param {number} i - 中间值
 * @param {string} format - 颜色格式
 * @returns {string} - 返回颜色字符串
 */
const colorPalette = (originColor: string, i: number, format: string) => {
	const color = Color(originColor.indexOf('#') > -1 ? originColor : getHexFunc(originColor));
	const h = color.hue();
	const s = color.saturationv();
	const v = color.value();

	const hueStep = 2;
	const maxSaturationStep = 100;
	const minSaturationStep = 9;

	const maxValue = 100;
	const minValue = 30;

	const getNewHue = (isLight: boolean, i: number) => {
		let hue;
		if (h >= 60 && h <= 240) {
			hue = isLight ? h - hueStep * i : h + hueStep * i;
		} else {
			hue = isLight ? h + hueStep * i : h - hueStep * i;
		}
		if (hue < 0) {
			hue += 360;
		} else if (hue >= 360) {
			hue -= 360;
		}
		return Math.round(hue);
	};

	const getNewSaturation = (isLight: boolean, i: number) => {
		let newSaturation;
		if (isLight) {
			newSaturation = s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
		} else {
			newSaturation = s + ((maxSaturationStep - s) / 4) * i;
		}
		return newSaturation;
	};

	const getNewValue = (isLight: boolean, i: number) => {
		return isLight ? v + ((maxValue - v) / 5) * i : v <= minValue ? v : v - ((v - minValue) / 4) * i;
	};

	const isLight = i < 6;
	const index = isLight ? 6 - i : i - 6;
	const retColor =
		i === 6
			? color
			: Color({
					h: getNewHue(isLight, index),
					s: getNewSaturation(isLight, index) < 0 ? 4 : getNewSaturation(isLight, index),
					v: getNewValue(isLight, index)
				});

	return getColorString(retColor, format);
};

/**
 * 根据给定颜色通过算法生成指定包含十一个颜色的梯度色板
 * @param {string} color - 颜色值
 * @param {Object} options - 配置项
 * @param {number} options.index - 指定生成的颜色在梯度色板中的位置，取值范围为 1-10，默认为 6
 * @param {boolean} options.list - 是否生成包含十个颜色的梯度色板
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 * @return string | string[]
 * @example
 * generatePalette('#0B24FB' { index: 1 }) // '#E8EEFF'
 */
export const generatePalette = (
	color: string,
	options: { list: boolean; index: number; format: string } = {
		list: true,
		index: 6,
		format: 'hex'
	}
) => {
	const { list, index, format } = options;
	if (list) {
		const list = [];
		for (let i = 0; i <= 10; i++) {
			list.push(colorPalette(color, i, format));
		}
		return list;
	}
	return colorPalette(color, index, format);
};

/**
 * 根据给定颜色计算出主题黑
 * @param {string} color - 颜色值 hex 格式
 * @return {object} - 返回两项主题黑，包含 hex、rgb、hsl、oklch 四种格式的颜色值
 * @example
 * generateThemeBlack('#0B24FB')
 */
export const generateThemeBlack = (color: string) => {
	// 将 hex 颜色转换成 hsl 格式
	const colorHsl = Color(color.indexOf('#') > -1 ? color : getHexFunc(color))
		.hsl()
		.round()
		.string();

	// 将 hsl 格式的颜色值转换成数组
	const colorHslArr = colorHsl.split(',');
	// 将 colorHslArr 的 s 和 l 值分别改为 95% 和 5% 生成主题黑
	colorHslArr[1] = ' 95%';
	colorHslArr[2] = ' 5%)';
	// 将 colorHslArr 转换成 hsl 格式
	const blackHsl = colorHslArr.join(',');
	// 将 hsl 格式的颜色值转换成 hex 格式和 rgb 格式
	const blackHex = Color(blackHsl).hex();
	const blackRgb = Color(blackHsl).rgb().round().string();
	// 将 hex 格式转换成 oklch 格式
	const colorOklch = getOklchFunc(blackHex);
	// 返回颜色值
	return { hex: blackHex, rgb: blackRgb, hsl: blackHsl, oklch: colorOklch };
};

/**
 * 根据给定颜色计算出主题白
 * @param {string} color - 颜色值 hex 格式
 * @return {object} - 返回两项主题白，包含 hex、rgb、hsl 三种格式的颜色值
 * @example
 * generateThemeWhite('#0B24FB')
 */
export const generateThemeWhite = (color: string) => {
	// 将 hex 颜色转换成 hsl 格式
	const colorHsl = Color(color.indexOf('#') > -1 ? color : getHexFunc(color))
		.hsl()
		.round()
		.string();
	// 将 hsl 格式的颜色值转换成数组
	const colorHslArr = colorHsl.split(',');
	// 将 colorHslArr 的 s 和 l 值分别改为 95% 和 5% 生成主题黑
	colorHslArr[1] = ' 5%';
	colorHslArr[2] = ' 95%)';
	// 将 colorHslArr 转换成 hsl 格式
	const whiteHsl = colorHslArr.join(',');
	// 将 hsl 格式的颜色值转换成 hex 格式和 rgb 格式
	const whiteHex = Color(whiteHsl).hex();
	const whiteRgb = Color(whiteHsl).rgb().round().string();
	// 返回主题白
	return { hex: whiteHex, rgb: whiteRgb, hsl: whiteHsl, oklch: getOklchFunc(whiteHex) };
};

/**
 * 颜色转换函数
 * @param {string} str - 颜色值
 * @returns {object} - 返回 hex、rgb、hsl、oklch 四种格式的颜色值
 * @example
 * colorConvertFunc('#000') // {hex: '#000000', rgb: 'rgb(0,0,0)', hsl: {h: 0, s: 0, l: 0}, oklch: 'oklch(0 0 0)'}
 */
export const colorConvertFunc = (str: string = '#000') => {
	// 传入 hsl(222, 100%, 98%) 这种字符，将其中的数字四舍五入取整后返回字符
	const getHslFunc = (str: string) => {
		const arr = str.split(',');
		const h = Math.round(Number(arr[0].split('(')[1]));
		const s = Math.round(Number(arr[1].split('%')[0]));
		const l = Math.round(Number(arr[2].split('%')[0]));
		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	const colorObj = Color(str.indexOf('#') > -1 ? str : getHexFunc(str));

	return {
		hex: colorObj.hex(),
		rgb: colorObj.rgb().string(),
		hsl: getHslFunc(colorObj.hsl().string()),
		rgbStr: colorObj.rgb().array().join(', '),
		oklch: getOklchFunc(colorObj.hex())
	};
};

/**
 * 传入 hex 格式的颜色值，将其中所有颜色值转换成 rgb 格式
 * @param {string} str - 颜色值
 * @returns {string} - 返回 rgb 格式的颜色值
 * @example
 * hexToRgb('#000') // '0,0,0'
 */
export const hexToRgb = (str: string) => {
	return Color(str).rgb().array().join(', ');
};

/**
 * 将传入的对象转为数组，且 default 在第 6 项
 * @param {object} obj - 需要转换的对象
 * @returns {array} - 返回转换后的数组
 * @example
 * colorObjToArr({ 50: '#50', 100: '#100', 200: '#200', 300: '#300', 400: '#400', 500: '#500', 700: '#700', 800: '#800', 900: '#900', default: '#000' })
 * [{key: '50', value: '#50'}, {key: '100', value: '#100'}, {key: '200', value: '#200'}, {key: '300', value: '#300'}, {key: '400', value: '#400'}, {key: '500', value: '#500'},{key: 'default', value: '#000'},{key: '700', value: '#700'},{key: '800', value: '#800'},{key: '900', value: '#900'}]
 */
export const colorObjToArr = (obj: Record<string, string>) => {
	// 将 obj 转为数组
	const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));
	// 将最后一项移动到第 6 项
	const lastItem = arr.pop();
	if (lastItem) {
		arr.splice(6, 0, lastItem);
	}
	return arr;
};

/**
 * 传入 oklch 格式的颜色值与透明度，返回带透明度的 oklch 格式
 * @param {string} str - 颜色值
 * @param {number} opacity - 透明度
 * @returns {string} - 返回带透明度的 oklch 格式
 * @example
 * getOklchOpacity('oklch(0.5 0.5 0)', 0.5) // 'oklch(0.5 0.5 0 / 0.5)'
 */
export const getOklchOpacity = (str: string, opacity: number) => {
	// 将最后一个 ) 替换为【/ 透明度】
	return str.replace(/\)$/, ` / ${opacity})`);
};
