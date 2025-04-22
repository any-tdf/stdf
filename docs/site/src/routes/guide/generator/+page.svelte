<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ClipboardJS from 'clipboard';
	import ModeSwitch from '$lib/modeSwitch/ModeSwitch.svelte';
	import { currentColorStore } from '../../../store';
	import themes, { type ThemeItem } from '../../../data/themes';
	import {
		generatePalette,
		generateThemeBlack,
		generateThemeWhite,
		colorConvertFunc,
		throttle,
		hexToRgb,
		getOklchFunc,
		getHexFunc
	} from '../../../utils';
	import colorList from '../../../data/color';
	import GeneratorPreview from './GeneratorPreview.svelte';
	import hljs from 'highlight.js';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showTip = $state(true);
	let windowWidth = $state(0);
	let windowHeight = $state(0);
	const initTheme = themes.find((item) => item.name === $currentColorStore) as ThemeItem;

	const setPropertyFunc = (name: string, value: string) => {
		const rgbStr = value.startsWith('oklch') ? value : hexToRgb(value);
		document.documentElement.style.setProperty(name, rgbStr);
	};
	// 使用 extendList 返回 extendListStr
	const extendListStrFunc = (extendList: { color: string; alias: string }[]) => {
		let extendListStr = '	{';
		extendList.forEach((item) => {
			extendListStr += `
			color: '${colorConvertFunc(item.color).oklch}', // ${item.color} ${colorConvertFunc(item.color).hsl}
			alias: "${item.alias}",
		},`;
			extendListStr += `
		{`;
		});
		// 如果 extendListStr 最后一个是换行符，则删除换行
		extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
		return extendListStr;
	};
	// 使用 extendList 返回 extendListStr2
	const extendListStrFunc2 = (extendList: { color: string; alias: string }[]) => {
		let extendListStr = '';
		extendList.forEach((item, index) => {
			extendListStr += `	--color-extend${index}: ${getOklchFunc(item.color)};
	--color-${item.alias}: ${getOklchFunc(item.color)};
`;
		});
		// 如果 extendListStr 最后一个是换行符，则删除换行
		extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
		return extendListStr;
	};
	const numbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	let colors = $state([
		{ type: 'primary', color: initTheme.theme.color.primary.default, hex: getHexFunc(initTheme.theme.color.primary.default) },
		{ type: 'dark', color: initTheme.theme.color.dark.default, hex: getHexFunc(initTheme.theme.color.dark.default) },
		{ type: 'success', color: initTheme.theme.color.functional.success, hex: getHexFunc(initTheme.theme.color.functional.success) },
		{ type: 'warning', color: initTheme.theme.color.functional.warning, hex: getHexFunc(initTheme.theme.color.functional.warning) },
		{ type: 'error', color: initTheme.theme.color.functional.error, hex: getHexFunc(initTheme.theme.color.functional.error) },
		{ type: 'info', color: initTheme.theme.color.functional.info, hex: getHexFunc(initTheme.theme.color.functional.info) }
	]);
	let currentColorObj = {
		name: '',
		color: {
			primary: { default: '' },
			dark: { default: '' },
			functional: { success: '', warning: '', error: '', info: '' },
			extend: [{ color: '', alias: '' }]
		}
	};
	let primaryColors: { hex: string; hsl: string; n: number; rgb: string; oklch: string }[] = $state([]);
	let darkColors: { hex: string; hsl: string; n: number; rgb: string; oklch: string }[] = $state([]);
	let themeBlack = $state({
		primary: { hex: '', hsl: '', rgb: '', oklch: '' },
		dark: { hex: '', hsl: '', rgb: '', oklch: '' }
	});
	let themeWhite = $state({
		primary: { hex: '', hsl: '', rgb: '', oklch: '' },
		dark: { hex: '', hsl: '', rgb: '', oklch: '' }
	});
	let stateColor = $state({ success: '', warning: '', error: '', info: '' });
	let extendList: { color: string; alias: string; hex: string }[] = $state(initTheme.theme.color.extend);

	let name = $state(initTheme.name);
	let showCopyTip = $state(false);
	let showCopyTip2 = $state(false);
	let extendListStr = $derived(extendListStrFunc(extendList));

	let extendListStr2 = $derived(extendListStrFunc2(extendList));

	let configStr = $derived(
		hljs.highlight(
			`// ${isZh ? '主题配置' : 'Theme configuration'}
name: '${name}',
color: {
	primary: {
		50: '${primaryColors[0].oklch}', // ${primaryColors[0].hex} ${primaryColors[0].hsl}
		100: '${primaryColors[1].oklch}', // ${primaryColors[1].hex} ${primaryColors[1].hsl}
		200: '${primaryColors[2].oklch}', // ${primaryColors[2].hex} ${primaryColors[2].hsl}
		300: '${primaryColors[3].oklch}', // ${primaryColors[3].hex} ${primaryColors[3].hsl}
		400: '${primaryColors[4].oklch}', // ${primaryColors[4].hex} ${primaryColors[4].hsl}
		500: '${primaryColors[5].oklch}', // ${primaryColors[5].hex} ${primaryColors[5].hsl}
		default: '${primaryColors[6].oklch}', // ${primaryColors[6].hex} ${primaryColors[6].hsl}
		700: '${primaryColors[7].oklch}', // ${primaryColors[7].hex} ${primaryColors[7].hsl}
		800: '${primaryColors[8].oklch}', // ${primaryColors[8].hex} ${primaryColors[8].hsl}
		900: '${primaryColors[9].oklch}', // ${primaryColors[9].hex} ${primaryColors[9].hsl}
		950: '${primaryColors[10].oklch}', // ${primaryColors[10].hex} ${primaryColors[10].hsl}
	},
	dark: {
		50: '${darkColors[0].oklch}', // ${darkColors[0].hex} ${darkColors[0].hsl}
		100: '${darkColors[1].oklch}', // ${darkColors[1].hex} ${darkColors[1].hsl}
		200: '${darkColors[2].oklch}', // ${darkColors[2].hex} ${darkColors[2].hsl}
		300: '${darkColors[3].oklch}', // ${darkColors[3].hex} ${darkColors[3].hsl}
		400: '${darkColors[4].oklch}', // ${darkColors[4].hex} ${darkColors[4].hsl}
		500: '${darkColors[5].oklch}', // ${darkColors[5].hex} ${darkColors[5].hsl}
		default: '${darkColors[6].oklch}', // ${darkColors[6].hex} ${darkColors[6].hsl}
		700: '${darkColors[7].oklch}', // ${darkColors[7].hex} ${darkColors[7].hsl}
		800: '${darkColors[8].oklch}', // ${darkColors[8].hex} ${darkColors[8].hsl}
		900: '${darkColors[9].oklch}', // ${darkColors[9].hex} ${darkColors[9].hsl}
		950: '${darkColors[10].oklch}', // ${darkColors[10].hex} ${darkColors[10].hsl}
	},
	primaryBlack: '${getOklchFunc(themeBlack.primary.hex)}', // ${themeBlack.primary.hex} ${themeBlack.primary.hsl}
	primaryWhite: '${getOklchFunc(themeWhite.primary.hex)}', // ${themeWhite.primary.hex} ${themeWhite.primary.hsl}
	darkBlack: '${getOklchFunc(themeBlack.dark.hex)}', // ${themeBlack.dark.hex} ${themeBlack.dark.hsl}
	darkWhite: '${getOklchFunc(themeWhite.dark.hex)}', // ${themeWhite.dark.hex} ${themeWhite.dark.hsl}
	functional: {
		success: '${getOklchFunc(stateColor.success)}', // ${stateColor.success} ${colorConvertFunc(stateColor.success).hsl}
		warning: '${getOklchFunc(stateColor.warning)}', // ${stateColor.warning} ${colorConvertFunc(stateColor.warning).hsl}
		error: '${getOklchFunc(stateColor.error)}', // ${stateColor.error} ${colorConvertFunc(stateColor.error).hsl}
		info: '${getOklchFunc(stateColor.info)}', // ${stateColor.info} ${colorConvertFunc(stateColor.info).hsl}
	},
	extend: [
	${extendListStr}
	],
},`,
			{ language: 'javascript', ignoreIllegals: true }
		).value
	);

	let configStr2 = $derived(
		hljs.highlight(
			`/* ${isZh ? '初始主题 CSS 变量' : 'Initial theme CSS variables'} */
@theme {
	--color-primary-50: ${primaryColors[0].oklch};
	--color-primary-100: ${primaryColors[1].oklch};
	--color-primary-200: ${primaryColors[2].oklch};
	--color-primary-300: ${primaryColors[3].oklch};
	--color-primary-400: ${primaryColors[4].oklch};
	--color-primary-500: ${primaryColors[5].oklch};
	--color-primary: ${primaryColors[6].oklch};
	--color-primary-700: ${primaryColors[7].oklch};
	--color-primary-800: ${primaryColors[8].oklch};
	--color-primary-900: ${primaryColors[9].oklch};
	--color-primary-950: ${primaryColors[10].oklch};

	--color-dark-50: ${darkColors[0].oklch};
	--color-dark-100: ${darkColors[1].oklch};
	--color-dark-200: ${darkColors[2].oklch};
	--color-dark-300: ${darkColors[3].oklch};
	--color-dark-400: ${darkColors[4].oklch};
	--color-dark-500: ${darkColors[5].oklch};
	--color-dark: ${darkColors[6].oklch};
	--color-dark-700: ${darkColors[7].oklch};
	--color-dark-800: ${darkColors[8].oklch};
	--color-dark-900: ${darkColors[9].oklch};
	--color-dark-950: ${darkColors[10].oklch};

	--color-primaryBlack: ${getOklchFunc(themeBlack.primary.hex)};
	--color-primaryWhite: ${getOklchFunc(themeWhite.primary.hex)};
	--color-darkBlack: ${getOklchFunc(themeBlack.dark.hex)};
	--color-darkWhite: ${getOklchFunc(themeWhite.dark.hex)};

	--color-success: ${getOklchFunc(stateColor.success)};
	--color-warning: ${getOklchFunc(stateColor.warning)};
	--color-error: ${getOklchFunc(stateColor.error)};
	--color-info: ${getOklchFunc(stateColor.info)};
	
${extendListStr2}

	--color-black: oklch(0 0 0);
	--color-white: oklch(1 0 0);
	--color-gray-50: oklch(0.961 0 0);
	--color-gray-100: oklch(0.925 0 0);
	--color-gray-200: oklch(0.845 0 0);
	--color-gray-300: oklch(0.767 0 0);
	--color-gray-400: oklch(0.683 0 0);
	--color-gray-500: oklch(0.6 0 0);
	--color-gray-600: oklch(0.51 0 0);
	--color-gray-700: oklch(0.42 0 0);
	--color-gray-800: oklch(0.321 0 0);
	--color-gray-900: oklch(0.218 0 0);
	--color-gray-950: oklch(0.159 0 0);
	--color-transparent: transparent;
}
`,
			{ language: 'css', ignoreIllegals: true }
		).value
	);

	// 统一生成颜色
	const generateFunc = () => {
		// 传入数组，按照 Tailwind 规则生成颜色列表
		const createTWColorFunc = (colorList: string[]) => {
			if (colorList.length !== 11) {
				console.error('颜色列表长度必须为 11');
				return;
			}
			const colorArr: { hex: string; hsl: string; n: number; rgb: string; oklch: string }[] = [];
			colorList.forEach((item, index) => {
				// 第 0 项和最后一项的 key 为 50 和 950，其他项为 100-900，颜色有 hex、rgb、hsl 三种格式，注意 hsl 保留整数
				let colorObj: { hex: string; hsl: string; n: number; rgb: string; oklch: string } = { hex: '', hsl: '', n: 0, rgb: '', oklch: '' };
				if (index === 0) {
					colorObj = {
						n: 50,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl,
						oklch: colorConvertFunc(item).oklch
					};
				} else if (index === 10) {
					colorObj = {
						n: 950,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl,
						oklch: colorConvertFunc(item).oklch
					};
				} else {
					colorObj = {
						n: 100 * index,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl,
						oklch: colorConvertFunc(item).oklch
					};
				}
				colorArr.push(colorObj);
			});
			return colorArr;
		};
		const primaryColorList = generatePalette(currentColorObj.color.primary.default) as string[];
		const darkColorList = generatePalette(currentColorObj.color.dark.default) as string[];
		primaryColors = createTWColorFunc(primaryColorList) as {
			hex: string;
			hsl: string;
			n: number;
			rgb: string;
			oklch: string;
		}[];

		darkColors = createTWColorFunc(darkColorList) as {
			hex: string;
			hsl: string;
			n: number;
			rgb: string;
			oklch: string;
		}[];

		// 根据主题色生成主题黑和白
		const primaryColorB = generateThemeBlack(currentColorObj.color.primary.default);
		const darkColorB = generateThemeBlack(currentColorObj.color.dark.default);
		// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: dark)"
		const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
		// 如果找到了，就修改它的 content 属性
		if (darkMeta) {
			darkMeta.setAttribute('content', darkColorB.hex);
		}
		themeBlack = { primary: primaryColorB, dark: darkColorB };

		const primaryColorW = generateThemeWhite(currentColorObj.color.primary.default);
		// 查找 meta 标签，name="theme-color" 且 media="(prefers-color-scheme: light)"
		const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
		// 如果找到了，就修改它的 content 属性
		if (lightMeta) {
			lightMeta.setAttribute('content', primaryColorW.hex);
		}
		const darkColorW = generateThemeWhite(currentColorObj.color.dark.default);
		themeWhite = { primary: primaryColorW, dark: darkColorW };
		stateColor = currentColorObj.color.functional;

		primaryColors.forEach((item) => {
			setPropertyFunc(item.n === 600 ? '--color-primary' : `--color-primary-${item.n}`, item.oklch);
		});
		darkColors.forEach((item) => {
			setPropertyFunc(item.n === 600 ? '--color-dark' : `--color-dark-${item.n}`, item.oklch);
		});
		setPropertyFunc('--color-primaryBlack', primaryColorB.oklch);
		setPropertyFunc('--color-primaryWhite', primaryColorW.oklch);
		setPropertyFunc('--color-darkBlack', darkColorB.oklch);
		setPropertyFunc('--color-darkWhite', darkColorW.oklch);
	};
	const changeFunc = (type = 'primary', e: null | Event, value: string) => {
		const colorValue = e ? (e.target as HTMLInputElement).value : value;
		const primaryObj = currentColorObj.color.primary;
		const darkObj = currentColorObj.color.dark;
		const functionalObj = currentColorObj.color.functional;
		const newColors = [...colors];
		const item = newColors.find((item) => item.type === type);
		if (item) {
			item.color = colorValue.indexOf('#') === 0 ? colorValue : getOklchFunc(colorValue);
			item.hex = colorValue.indexOf('#') === 0 ? colorValue : getHexFunc(colorValue);
		}
		colors = newColors;
		if (type === 'primary') {
			numbers.forEach((item) => {
				if (item === 600) {
					primaryObj['default'] = colorValue;
				} else {
					(primaryObj as unknown as Record<string, string>)[item] = colorValue;
				}
			});
		} else if (type === 'dark') {
			numbers.forEach((item) => {
				if (item === 600) {
					darkObj['default'] = colorValue;
				} else {
					(darkObj as unknown as Record<string, string>)[item] = colorValue;
				}
			});
		} else {
			setPropertyFunc(`--color-functional-${type}`, item?.color);
			(functionalObj as unknown as Record<string, string>)[type] = colorValue;
		}
		currentColorObj = {
			name: name,
			color: {
				primary: primaryObj,
				dark: darkObj,
				functional: functionalObj,
				extend: extendList
			}
		};
		generateFunc();
	};
	const unsubscribe = currentColorStore.subscribe((value) => {
		// 根据 $currentColorStore 从 themes 中获取对应的颜色对象
		const theme = themes.find((item) => item.name === value);
		if (!theme) {
			return;
		}
		currentColorObj = theme.theme;
		generateFunc();

		// 根据 currentColorObj 设置 colors
		const newColors = [...colors];
		newColors.forEach((item) => {
			if (item.type === 'primary') {
				item.color = currentColorObj.color.primary.default;
				item.hex = getHexFunc(currentColorObj.color.primary.default);
			} else if (item.type === 'dark') {
				item.color = currentColorObj.color.dark.default;
				item.hex = getHexFunc(currentColorObj.color.dark.default);
			} else {
				// 确保 item.type 是 functional 对象中的有效键
				if (item.type in currentColorObj.color.functional) {
					item.color = currentColorObj.color.functional[item.type as keyof typeof currentColorObj.color.functional];
					item.hex = getHexFunc(currentColorObj.color.functional[item.type as keyof typeof currentColorObj.color.functional]);
				}
			}
		});
		colors = newColors;
		name = currentColorObj.name;
		extendList = currentColorObj.color.extend.map((item) => ({ ...item, hex: getHexFunc(item.color) }));
	});
	// svelte 组件销毁时取消订阅
	onDestroy(() => {
		unsubscribe();
	});
	// 随机事件
	const randomFunc = () => {
		// 从 colorList 中随机取出一个 mode 为 dark 的颜色，再随机取出一个 mode 为 light 的颜色
		const randomDarkColor = colorList.filter((item) => item.mode === 'dark')[
			Math.floor(Math.random() * colorList.filter((item) => item.mode === 'dark').length)
		];
		const randomLightColor = colorList.filter((item) => item.mode === 'light')[
			Math.floor(Math.random() * colorList.filter((item) => item.mode === 'light').length)
		];
		name = `${randomDarkColor.name}/${randomLightColor.name}`;
		// 根据随机颜色生成主题
		changeFunc('primary', null, randomDarkColor.hex);
		changeFunc('dark', null, randomLightColor.hex);
		// 获取当前 extendList 的长度
		const extendListLength = extendList.length;
		// 从 colorList 中随机取出 extendListLength 个 mode 为 dark 的颜色，作为扩展色
		const randomExtendList = colorList
			.filter((item) => item.mode === 'dark')
			.sort(() => Math.random() - 0.5)
			.slice(0, extendListLength);
		let newExtendList = [];
		newExtendList = randomExtendList.map((item) => {
			return { color: item.hex, alias: item.name, hex: getHexFunc(item.hex) };
		});
		extendList = newExtendList;
	};
	// 重置事件
	const resetFunc = () => {
		// 刷新页面
		window.location.reload();
	};
	// 删除扩展色
	const deleteFunc = (i: number) => {
		let newExtendList = [...extendList];
		newExtendList.splice(i, 1);
		extendList = newExtendList;
	};
	// 选择 extendList 的颜色
	const changeExtendFunc = (e: Event, i: number) => {
		const colorValue = (e.target as HTMLInputElement).value;
		let newExtendList = [...extendList];
		newExtendList[i].color = colorValue;
		extendList = newExtendList;
	};
	// 输入 extendList 的别名
	const inputExtendFunc = (e: Event, i: number) => {
		const aliasValue = (e.target as HTMLInputElement).value;
		let newExtendList = [...extendList];
		newExtendList[i].alias = aliasValue;
		extendList = newExtendList;
	};
	// 新增扩展色
	const addExtendFunc = () => {
		let newExtendList = [...extendList];
		newExtendList.push({ color: '#000000', alias: '', hex: getHexFunc('#000000') });
		extendList = newExtendList;
	};
	// 监听窗口变化
	const windowResizeFun = () => {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	};
	onMount(() => {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
		window.addEventListener('resize', windowResizeFun);

		// 复制
		const clipboard = new ClipboardJS('#copyButton', {
			target: () => {
				return document.querySelector('#myCodeBlock')!;
			}
		});
		clipboard.on('success', function () {
			showCopyTip = true;
			setTimeout(() => {
				showCopyTip = false;
			}, 2000);
		});
		clipboard.on('error', function () {
			console.error('无法将内容复制到剪贴板');
		});

		// 复制
		const clipboard2 = new ClipboardJS('#copyButton2', {
			target: () => {
				return document.querySelector('#myCodeBlock2')!;
			}
		});
		clipboard2.on('success', function () {
			showCopyTip2 = true;
			setTimeout(() => {
				showCopyTip2 = false;
			}, 2000);
		});
		clipboard2.on('error', function () {
			console.error('无法将内容复制到剪贴板');
		});
	});
	onDestroy(() => {
		window.removeEventListener('resize', windowResizeFun);
	});
</script>

<div class="block md:hidden">{isZh ? '请在桌面端使用！' : 'Please use it on the desktop!'}</div>
<div class="hidden justify-between md:flex">
	<div>
		<div class="mb-2 text-center font-bold">{isZh ? '配置' : 'Configure'}</div>
		<div class="flex flex-col gap-1 text-center">
			<div class="text-left">{isZh ? '主题名称' : 'Theme name'}</div>
			<div class="flex-1">
				<input
					class="focus:outline-primary dark:focus:outline-dark rounded-xs focus:outline-hidden w-full bg-transparent px-1 py-1 text-sm outline outline-black/10 dark:outline-white/20"
					type="text"
					bind:value={name}
					placeholder={isZh ? '请输入主题名称' : 'Please enter theme name'}
				/>
			</div>
		</div>
		<div class="mt-4 flex gap-2">
			<div class="flex flex-col gap-4 text-center">
				<!-- 输入框 主题色与功能色 -->
				{#each colors as item, i}
					<div class="{i === 2 ? 'mt-6' : 'mt-0'} relative">
						<!-- <div class="mb-1 text-left text-xs">{getOklchFunc(item.color)}</div> -->
						<div class="flex items-center gap-2">
							<input
								type="color"
								bind:value={item.hex}
								oninput={(e) => throttle(() => changeFunc(item.type, e, item.color), 100)()}
								class="h-6 w-6 flex-none cursor-pointer"
								style="background-color: {item.color};"
								onclick={() => (showTip = false)}
							/>
							<span>{item.type}</span>
						</div>
						{#if i === 0 && showTip}
							<div class="pointer-events-none absolute left-2 top-0 rotate-[135deg]">
								<div class="animate-bounce text-3xl">👇</div>
							</div>
						{/if}
					</div>
				{/each}
				<!-- 扩展色 -->
				<div class="mt-6 flex flex-col gap-4 overflow-y-auto" style="height: {windowHeight - 480}px;">
					{#each extendList as item, i}
						<div class="flex flex-col gap-2">
							<div class="flex gap-2">
								<input
									type="color"
									bind:value={item.hex}
									class="h-6 w-6"
									style="background-color: {item.color};"
									oninput={(e) => throttle(() => changeExtendFunc(e, i), 100)()}
								/>
								<div>extend{i}</div>
								<!-- <div class="w-16 flex-none overflow-hidden text-left text-sm leading-6">
									{item.color}
								</div> -->
								<button aria-label="delete" class="rounded-sm bg-black/5 px-1 dark:bg-white/10" onclick={() => deleteFunc(i)}>
									<svg class="h-4 w-6 transition-all hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											class="fill-error"
											d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
										>
										</path>
									</svg>
								</button>
							</div>
							<div class="flex px-0.5">
								<input
									class="focus:outline-primary dark:focus:outline-dark rounded-xs focus:outline-hidden h-6 w-full bg-transparent px-1 py-1 text-xs outline outline-black/10 dark:outline-white/20"
									type="text"
									bind:value={item.alias}
									placeholder={isZh ? `请输入 extend${i} 别名` : `Please enter extend${i} alias`}
									oninput={(e) => throttle(() => inputExtendFunc(e, i))}
								/>
							</div>
						</div>
					{/each}
					<div>
						<button
							class="items-centers border-primary dark:border-dark flex w-full justify-center gap-2 rounded-sm border py-1.5 text-sm text-black dark:text-white"
							onclick={addExtendFunc}
						>
							<span>
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path class="fill-black dark:fill-white" d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
								</svg>
							</span>
							{isZh ? '新增' : 'Add'}</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex-1">
		<div class="mb-4 text-center font-bold">{isZh ? '色板 & 配置文件' : 'Palette & Profiles'}</div>
		<div class="flex flex-col px-4 text-center text-xs">
			<div class="mb-1 flex flex-1 justify-between gap-1">
				{#each primaryColors as color, index}
					<div
						class="h-12 rounded-sm {index >= 5 ? 'text-primaryWhite' : 'text-primaryBlack'}"
						style="background-color: {color.oklch};flex: {index === 6 ? '2' : '1'}"
					>
						<div class="flex flex-col items-center justify-between">
							<div class="flex-1 leading-10 mt-1{index === 6 ? ' text-xl font-bold' : ''}">
								{index === 6 ? 'primary' : `${color.n}`}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="flex flex-1 justify-between gap-1">
				{#each darkColors as color, index}
					<div
						class="h-12 rounded-sm {index <= 6 ? 'text-darkBlack' : 'text-darkWhite'}"
						style="background-color: {color.oklch};flex: {index === 6 ? '2' : '1'};"
					>
						<div class="flex items-center justify-between">
							<div class="flex-1 leading-10 mt-1{index === 6 ? ' text-xl font-bold' : ''}">
								{index === 6 ? 'dark' : `${color.n}`}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-1 flex justify-between gap-1 px-4 text-center text-xs">
			{#each [themeBlack.primary, themeBlack.dark, themeWhite.primary, themeWhite.dark] as item, i}
				<div
					class="h-12 flex-1 rounded-sm border pt-4 {i === 0 || i === 1 ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}"
					style="background-color: {item.oklch};"
				>
					<div>
						{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}
					</div>
				</div>
			{/each}
		</div>
		<!-- 功能色 -->
		<div class="mt-1 flex justify-between gap-1 px-4 text-center text-xs text-white">
			<div class="h-12 flex-1 rounded-sm pt-4" style="background-color: {stateColor.success};">success</div>
			<div class="h-12 flex-1 rounded-sm pt-4" style="background-color: {stateColor.warning};">warning</div>
			<div class="h-12 flex-1 rounded-sm pt-4" style="background-color: {stateColor.error};">error</div>
			<div class="h-12 flex-1 rounded-sm pt-4" style="background-color: {stateColor.info};">info</div>
		</div>
		<!-- 扩展色 -->
		<div class="mt-1 flex h-12 justify-between gap-1 px-4 text-center text-xs text-white">
			{#if extendList}
				{#each extendList as item, i}
					<div class="flex h-12 flex-1 flex-col justify-center gap-1 rounded-sm py-1" style="background-color: {item.color};">
						<div class="text-xs">extend{i}</div>
						<div>{item.alias}</div>
					</div>
				{/each}
			{/if}
		</div>
		<!-- 配置文件 -->
		<div class="mx-4 mt-1 flex" style="height:{windowHeight - 388}px;width:{windowWidth - 858 + 46}px">
			<div class="bg-codeLight dark:bg-codeDark relative mr-1 grow">
				<div class="overflow-auto rounded-sm" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 3 - 6 + 46}px">
					<article class="prose dark:prose-invert max-w-none text-xs">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<pre><code class="hljs" id="myCodeBlock">{@html configStr}</code></pre>
					</article>
				</div>
				<button
					aria-label="copy"
					class="absolute right-0 top-0 rounded-bl-sm bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
					id="copyButton"
				>
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-gray-700 dark:fill-gray-300"
							d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
						></path>
					</svg>
				</button>
				{#if showCopyTip}
					<div in:fly={{ x: 50, duration: 500 }} out:fly={{ x: 50, duration: 300 }} class="absolute right-14 top-1 text-sm">
						{isZh ? '已复制！' : 'Copied!'}
					</div>
				{/if}
			</div>
			<div class="bg-codeLight dark:bg-codeDark relative grow">
				<div class="overflow-auto rounded-sm" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 2 + 4}px">
					<article class="prose dark:prose-invert max-w-none text-xs">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<pre><code class="hljs" id="myCodeBlock2">{@html configStr2}</code></pre>
					</article>
				</div>
				<button
					aria-label="copy"
					class="absolute right-0 top-0 rounded-bl-sm bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
					id="copyButton2"
				>
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-gray-700 dark:fill-gray-300"
							d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
						></path>
					</svg>
				</button>
				{#if showCopyTip2}
					<div in:fly={{ x: 50, duration: 500 }} out:fly={{ x: 50, duration: 300 }} class="absolute right-14 top-1 text-sm">
						{isZh ? '已复制！' : 'Copied!'}
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex w-[390px] gap-4">
		<div>
			<div class="flex w-full justify-between pb-2">
				<div>
					<button
						class="bg-primary dark:bg-dark cursor-pointer rounded-sm px-4 py-2 text-xs text-white hover:opacity-90 dark:text-black"
						onclick={randomFunc}
					>
						{isZh ? '随机主题' : 'Random theme'}
					</button>
					<button
						class="border-primary dark:border-dark ml-2 cursor-pointer rounded-sm border px-4 py-2 text-xs text-black hover:opacity-90 dark:text-white"
						onclick={resetFunc}
					>
						{isZh ? '重置' : 'Reset'}
					</button>
				</div>
				<div>
					<ModeSwitch />
				</div>
			</div>
			<div
				class="border-primary/20 bg-primaryWhite dark:border-dark/20 dark:bg-darkBlack h-96 w-[392px] overflow-auto border dark:border-gray-700"
				style="height:{windowHeight - 130}px"
			>
				<GeneratorPreview />
			</div>
		</div>
	</div>
</div>

<style>
	input[type='color'] {
		-webkit-appearance: none;
		appearance: none;
		border: none;
		padding: 0;
		border-radius: 2px;
	}
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
		margin: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: 1px solid #666;
		border-radius: 2px;
	}
</style>
