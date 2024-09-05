import Color from 'color';
import codeGroupSvgData from './code-group-svg-data';

/**
 * 节流，每 n 毫秒执行一次
 * @param {function} func - 需要节流的函数
 * @param {number} wait - 节流的时间间隔
 * @returns {function} - 返回节流后的函数
 * @example
 * const throttleFunc = throttle(() => console.log(123), 1000)
 */
export const throttle = (func, wait = 100) => {
	let timer = null;
	return function () {
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			func.apply(this, arguments);
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
const htmlFilter = text => {
	// 抽离成可配置的匹配列表
	const matchList = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&#34;': '"', '&quot;': '"', '&#39;': "'" };
	let regStr = '(' + Object.keys(matchList).toString() + ')';
	// ↑ ------------【*提取匹配列表key值*】.【组数转字符串】
	regStr = regStr.replace(/,/g, ')|(');
	// ↑ 通过匹配将其更新为正则的字符串类型
	const regExp = new RegExp(regStr, 'g');
	// ↑ ------- 字符串 转 正则 方法
	return text.replace(regExp, match => matchList[match]);
	// ↑ ------ 替换方法 (正则, 当前key => 返回当前被匹配的key值)
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
const replacePart = (str, findText, replaceText) => {
	return str.replace(findText, replaceText);
};

/**
 * 将 Markdown 文档中的 code 标签高亮
 * @param {string} mdText - 需要处理的 Markdown 文本
 * @returns {string} - 返回处理后的 Markdown 文本
 * @example
 * mdTextToHljs('```js\nconsole.log(123)\n```') // <code class="hljs language-js"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">123</span>)</code>
 */
export const mdTextToHljs = mdText => {
	if (mdText.indexOf('<code class="') > 0) {
		let apiText = mdText.indexOf('<code class="') > 0 ? htmlFilter(mdText).replace(/<code class="/g, '<code class="hljs ') : mdText;
		const codeTexts = apiText.match(/<code[\s\S]*?<\/code>/g);
		for (let t = 0; t < codeTexts.length; t++) {
			// return
			const language = codeTexts[t].match(/<code class="hljs language-(.*?)">/)
				? codeTexts[t].match(/<code class="hljs language-(.*?)">/)[1]
				: ''; //语言
			const code = codeTexts[t].match(/<code[\s\S]*?>([\s\S]*?)<\/code>/)[1];
			const highlightedCode = language
				? // @ts-ignore
				  hljs.highlight(code, {
						language,
						ignoreIllegals: true,
				  }).value
				: // @ts-ignore
				  hljs.highlightAuto(code).value;
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
export const groupIconMdPlugin = md => {
	// 找出自字符中所有的 ::: code-group 与  ::: 之间的字符组成数组
	const codeGroupStrListAll = md.match(/<!-- :::code-groups -->[\s\S]*?<!-- ::: -->/g);
	if (!codeGroupStrListAll) {
		return md;
	}
	const codeGroupStrList = codeGroupStrListAll.map(item =>
		item
			.replace(/<!-- :::code-groups -->/g, '')
			.replace(/<!-- ::: -->/g, '')
			.split('<!-- :: -->'),
	);
	const codeGroupList = codeGroupStrList.map(item =>
		item.map(subItem => {
			return { tab: subItem.match(/<!-- (.*?) -->/)[1], code: subItem.replace(/<!-- (.*?) -->/, '') };
		}),
	);

	const codeGroupHtmlList = codeGroupList.map((item, index) => {
		const arr = [];
		item.forEach((subItem, subIndex) => {
			const label = `
			<input id="tab-${index + '-' + subIndex}" type="radio" name="tab-${index}" class="peer/tab-${index + '-' + subIndex} opacity-0" ${
				subIndex === 0 ? 'checked' : ''
			} />
				<label
					for="tab-${index + '-' + subIndex}"
					class="border-b-2 border-transparent peer-checked/tab-${index + '-' + subIndex}:border-primary dark:peer-checked/tab-${
						index + '-' + subIndex
					}:border-dark transition duration-300 cursor-pointer py-2 px-4 inline-flex items-center gap-2 text-xs"
				>
					${codeGroupSvgData.find(icon => icon.name === subItem.tab).svg}${subItem.tab}
				</label>
			`;
			const code = `<div class="hidden peer-checked/tab-${index + '-' + subIndex}:block w-full">${subItem.code}</div>`;
			arr.push({ label, code });
		});
		return `
			<section class="flex flex-row flex-wrap bg-black/5 dark:bg-[#202020] rounded mb-4">
				${arr.map(item => item.label).join('')}
				${arr.map(item => item.code).join('')}
			</section>
			`;
	});
	const replaceCodeGroups = (inputString, replacements) => {
		// 定义正则表达式匹配 <!-- :::code-groups --> 与 <!-- ::: --> 之间的内容
		const regex = /<!--\s*:::code-groups\s*-->(.*?)<!--\s*:::\s*-->/gs;

		let match;
		let index = 0;

		// 替换匹配到的部分
		inputString = inputString.replace(regex, (match, p1) => {
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
 * 去除url最后一项的?方法
 * @param {string} url - 需要处理的url
 * @returns {string} - 返回处理后的url
 * @example
 * delLastParamsUrl('http://www.baidu.com?') // http://www.baidu.com
 */
const delLastParamsUrl = url => {
	if (url.lastIndexOf('?') === url.length - 1) {
		url = url.substring(0, url.length - 1);
	}
	return url;
};

/**
 * 去除url中指定参数的方法
 * @param {string} url - 需要处理的url
 * @param {string} name - 需要去除的参数名
 * @returns {string} - 返回处理后的url
 * @example
 * delParamsUrl('http://www.baidu.com?name=1&age=2', 'name') // http://www.baidu.com?age=2
 */
export const delParamsUrl = (url, name) => {
	const baseUrl = url.split('?')[0] + '?';
	const query = url.split('?')[1];
	if (query.indexOf(name) > -1) {
		const obj = {};
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

const formats = ['hex', 'rgb', 'hsl'];
/**
 * 获取颜色格式
 */
const getFormat = format => {
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
const getColorString = (color, format) => {
	const innerFormat = getFormat(format);

	if (innerFormat === 'hex') {
		return color[innerFormat]();
	}
	return color[innerFormat]().round().string();
};

/**
 * 动态梯度算法
 * @param {string} originColor - 颜色值
 * @param {number} i - 中间值
 * @param {string} format - 颜色格式
 * @returns {string} - 返回颜色字符串
 */
const colorPalette = (originColor, i, format) => {
	const color = Color(originColor);
	const h = color.hue();
	const s = color.saturationv();
	const v = color.value();

	const hueStep = 2;
	const maxSaturationStep = 100;
	const minSaturationStep = 9;

	const maxValue = 100;
	const minValue = 30;

	function getNewHue(isLight, i) {
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
	}

	function getNewSaturation(isLight, i) {
		let newSaturation;

		if (isLight) {
			newSaturation = s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
		} else {
			newSaturation = s + ((maxSaturationStep - s) / 4) * i;
		}
		return newSaturation;
	}

	function getNewValue(isLight, i) {
		return isLight ? v + ((maxValue - v) / 5) * i : v <= minValue ? v : v - ((v - minValue) / 4) * i;
	}

	const isLight = i < 6;
	const index = isLight ? 6 - i : i - 6;
	const retColor =
		i === 6
			? color
			: Color({
					h: getNewHue(isLight, index),
					s: getNewSaturation(isLight, index) < 0 ? 4 : getNewSaturation(isLight, index),
					v: getNewValue(isLight, index),
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
export const generatePalette = (color, options = { list: true, index: 6, format: 'hex' }) => {
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
 * @return {object} - 返回两项主题黑，包含 hex、rgb、hsl 三种格式的颜色值
 * @example
 * generateThemeBlack('#0B24FB')
 */
export const generateThemeBlack = color => {
	// 将 hex 颜色转换成 hsl 格式
	const colorHsl = Color(color).hsl().round().string();
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
	// 返回主题黑
	return { hex: blackHex, rgb: blackRgb, hsl: blackHsl };
};

/**
 * 根据给定颜色计算出主题白
 * @param {string} color - 颜色值 hex 格式
 * @return {object} - 返回两项主题白，包含 hex、rgb、hsl 三种格式的颜色值
 * @example
 * generateThemeWhite('#0B24FB')
 */
export const generateThemeWhite = color => {
	// 将 hex 颜色转换成 hsl 格式
	const colorHsl = Color(color).hsl().round().string();
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
	return { hex: whiteHex, rgb: whiteRgb, hsl: whiteHsl };
};

/**
 * 颜色转换函数
 * @param {string} str - 颜色值
 * @returns {object} - 返回 hex、rgb、hsl 三种格式的颜色值
 * @example
 * colorConvertFunc('#000') // {hex: '#000000', rgb: 'rgb(0,0,0)', hsl: {h: 0, s: 0, l: 0}}
 */
export const colorConvertFunc = (str = '#000') => {
	// 传入 hsl(222, 100%, 98%) 这种字符，将其中的数字四舍五入取整后返回字符
	const getHslFunc = str => {
		const arr = str.split(',');
		const h = Math.round(Number(arr[0].split('(')[1]));
		const s = Math.round(Number(arr[1].split('%')[0]));
		const l = Math.round(Number(arr[2].split('%')[0]));
		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	const colorObj = Color(str);
	return {
		hex: colorObj.hex(),
		rgb: colorObj.rgb().string(),
		hsl: getHslFunc(colorObj.hsl().string()),
		// @ts-ignore
		rgbStr: colorObj.rgb().color.join(', '),
	};
};

/**
 * 传入 hex 格式的颜色值，将其中所有颜色值转换成 rgb 格式
 * @param {string} str - 颜色值
 * @returns {string} - 返回 rgb 格式的颜色值
 * @example
 * hexToRgb('#000') // ‘0,0,0’
 */
export const hexToRgb = str => {
	// @ts-ignore
	return Color(str).rgb().color.join(', ');
};
