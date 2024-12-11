<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ClipboardJS from 'clipboard';
	import ModeSwitch from '$lib/modeSwitch/ModeSwitch.svelte';
	import { currentColorStore } from '../../../store';
	import themes, { type ThemeItem } from '../../../data/themes';
	import { generatePalette, generateThemeBlack, generateThemeWhite, colorConvertFunc, throttle, hexToRgb } from '../../../utils';
	import colorList from '../../../data/color';
	import GeneratorPreview from './GeneratorPreview.svelte';
	import hljs from 'highlight.js';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showTip = $state(true);
	let windowWidth = $state(0);
	let windowHeight = $state(0);
	const initTheme = themes.find((item) => item.name === $currentColorStore) as ThemeItem;

	const setPropertyFunc = (name: string, value: string) => {
		const rgbStr = hexToRgb(value);
		document.documentElement.style.setProperty(name, rgbStr);
	};
	// 使用 extendList 返回 extendListStr
	const extendListStrFunc = (extendList: { color: string; alias: string }[]) => {
		let extendListStr = '	{';
		extendList.forEach((item) => {
			extendListStr += `
			color: '${hexToRgb(item.color)}', // ${item.color} ${colorConvertFunc(item.color).hsl}
			alias: "${item.alias}",
		},`;
			extendListStr += `
		{`;
		});
		// 如果 extendListStr 最后一个是换行符，则删除换行
		extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
		// extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf(',') + 1);
		return extendListStr;
	};
	// 使用 extendList 返回 extendListStr2
	const extendListStrFunc2 = (extendList: { color: string; alias: string }[]) => {
		let extendListStr = '';
		extendList.forEach((item, index) => {
			extendListStr += `--theme-color-extend${index}: ${hexToRgb(item.color)};
`;
		});
		// 如果 extendListStr 最后一个是换行符，则删除换行
		extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf('\n'));
		// extendListStr = extendListStr.slice(0, extendListStr.lastIndexOf(',') + 1);
		return extendListStr;
	};
	const numbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	let colors = $state([
		{ type: 'primary', color: initTheme.theme.color.primary.default },
		{ type: 'dark', color: initTheme.theme.color.dark.default },
		{ type: 'success', color: initTheme.theme.color.functional.success },
		{ type: 'warning', color: initTheme.theme.color.functional.warning },
		{ type: 'error', color: initTheme.theme.color.functional.error },
		{ type: 'info', color: initTheme.theme.color.functional.info }
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
	let primaryColors: { hex: string; hsl: string; n: number; rgb: string }[] = $state([]);
	let darkColors: { hex: string; hsl: string; n: number; rgb: string }[] = $state([]);
	let themeBlack = $state({
		primary: { hex: '', hsl: '', rgb: '' },
		dark: { hex: '', hsl: '', rgb: '' }
	});
	let themeWhite = $state({
		primary: { hex: '', hsl: '', rgb: '' },
		dark: { hex: '', hsl: '', rgb: '' }
	});
	let stateColor = $state({ success: '', warning: '', error: '', info: '' });
	let extendList: { color: string; alias: string }[] = $state(initTheme.theme.color.extend);
	let name = $state(initTheme.name);
	let showCopyTip = $state(false);
	let showCopyTip2 = $state(false);
	let extendListStr;
	$effect(() => {
		extendListStr = extendListStrFunc(extendList);
	});
	let extendListStr2 = $derived(extendListStrFunc2(extendList));

	let configStr = $derived(
		hljs.highlight(
			`// ${isZh ? '主题配置' : 'Theme configuration'}
name: '${name}',
color: {
	primary: {
		50: '${hexToRgb(primaryColors[0].hex)}', // ${primaryColors[0].hex} ${primaryColors[0].hsl}
		100: '${hexToRgb(primaryColors[1].hex)}', // ${primaryColors[1].hex} ${primaryColors[1].hsl}
		200: '${hexToRgb(primaryColors[2].hex)}', // ${primaryColors[2].hex} ${primaryColors[2].hsl}
		300: '${hexToRgb(primaryColors[3].hex)}', // ${primaryColors[3].hex} ${primaryColors[3].hsl}
		400: '${hexToRgb(primaryColors[4].hex)}', // ${primaryColors[4].hex} ${primaryColors[4].hsl}
		500: '${hexToRgb(primaryColors[5].hex)}', // ${primaryColors[5].hex} ${primaryColors[5].hsl}
		default: '${hexToRgb(primaryColors[6].hex)}', // ${primaryColors[6].hex} ${primaryColors[6].hsl}
		700: '${hexToRgb(primaryColors[7].hex)}', // ${primaryColors[7].hex} ${primaryColors[7].hsl}
		800: '${hexToRgb(primaryColors[8].hex)}', // ${primaryColors[8].hex} ${primaryColors[8].hsl}
		900: '${hexToRgb(primaryColors[9].hex)}', // ${primaryColors[9].hex} ${primaryColors[9].hsl}
		950: '${hexToRgb(primaryColors[10].hex)}', // ${primaryColors[10].hex} ${primaryColors[10].hsl}
	},
	dark: {
		50: '${hexToRgb(darkColors[0].hex)}', // ${darkColors[0].hex} ${darkColors[0].hsl}
		100: '${hexToRgb(darkColors[1].hex)}', // ${darkColors[1].hex} ${darkColors[1].hsl}
		200: '${hexToRgb(darkColors[2].hex)}', // ${darkColors[2].hex} ${darkColors[2].hsl}
		300: '${hexToRgb(darkColors[3].hex)}', // ${darkColors[3].hex} ${darkColors[3].hsl}
		400: '${hexToRgb(darkColors[4].hex)}', // ${darkColors[4].hex} ${darkColors[4].hsl}
		500: '${hexToRgb(darkColors[5].hex)}', // ${darkColors[5].hex} ${darkColors[5].hsl}
		default: '${hexToRgb(darkColors[6].hex)}', // ${darkColors[6].hex} ${darkColors[6].hsl}
		700: '${hexToRgb(darkColors[7].hex)}', // ${darkColors[7].hex} ${darkColors[7].hsl}
		800: '${hexToRgb(darkColors[8].hex)}', // ${darkColors[8].hex} ${darkColors[8].hsl}
		900: '${hexToRgb(darkColors[9].hex)}', // ${darkColors[9].hex} ${darkColors[9].hsl}
		950: '${hexToRgb(darkColors[10].hex)}', // ${darkColors[10].hex} ${darkColors[10].hsl}
	},
	primaryBlack: '${hexToRgb(themeBlack.primary.hex)}', // ${themeBlack.primary.hex} ${themeBlack.primary.hsl}
	primaryWhite: '${hexToRgb(themeWhite.primary.hex)}', // ${themeWhite.primary.hex} ${themeWhite.primary.hsl}
	darkBlack: '${hexToRgb(themeBlack.dark.hex)}', // ${themeBlack.dark.hex} ${themeBlack.dark.hsl}
	darkWhite: '${hexToRgb(themeWhite.dark.hex)}', // ${themeWhite.dark.hex} ${themeWhite.dark.hsl}
	functional: {
		success: '${hexToRgb(stateColor.success)}', // ${stateColor.success} ${colorConvertFunc(stateColor.success).hsl}
		warning: '${hexToRgb(stateColor.warning)}', // ${stateColor.warning} ${colorConvertFunc(stateColor.warning).hsl}
		error: '${hexToRgb(stateColor.error)}', // ${stateColor.error} ${colorConvertFunc(stateColor.error).hsl}
		info: '${hexToRgb(stateColor.info)}', // ${stateColor.info} ${colorConvertFunc(stateColor.info).hsl}
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
			`/* ${isZh ? '初始 CSS 变量' : 'Initial CSS variables'} */
--theme-color-primary-50: ${hexToRgb(primaryColors[0].hex)};
--theme-color-primary-100: ${hexToRgb(primaryColors[1].hex)};
--theme-color-primary-200: ${hexToRgb(primaryColors[2].hex)};
--theme-color-primary-300: ${hexToRgb(primaryColors[3].hex)};
--theme-color-primary-400: ${hexToRgb(primaryColors[4].hex)};
--theme-color-primary-500: ${hexToRgb(primaryColors[5].hex)};
--theme-color-primary: ${hexToRgb(primaryColors[6].hex)};
--theme-color-primary-700: ${hexToRgb(primaryColors[7].hex)};
--theme-color-primary-800: ${hexToRgb(primaryColors[8].hex)};
--theme-color-primary-900: ${hexToRgb(primaryColors[9].hex)};
--theme-color-primary-950: ${hexToRgb(primaryColors[10].hex)};
--theme-color-dark-50: ${hexToRgb(darkColors[0].hex)};
--theme-color-dark-100: ${hexToRgb(darkColors[1].hex)};
--theme-color-dark-200: ${hexToRgb(darkColors[2].hex)};
--theme-color-dark-300: ${hexToRgb(darkColors[3].hex)};
--theme-color-dark-400: ${hexToRgb(darkColors[4].hex)};
--theme-color-dark-500: ${hexToRgb(darkColors[5].hex)};
--theme-color-dark: ${hexToRgb(darkColors[6].hex)};
--theme-color-dark-700: ${hexToRgb(darkColors[7].hex)};
--theme-color-dark-800: ${hexToRgb(darkColors[8].hex)};
--theme-color-dark-900: ${hexToRgb(darkColors[9].hex)};
--theme-color-dark-950: ${hexToRgb(darkColors[10].hex)};
--theme-color-primaryBlack: ${hexToRgb(themeBlack.primary.hex)};
--theme-color-primaryWhite: ${hexToRgb(themeWhite.primary.hex)};
--theme-color-darkBlack: ${hexToRgb(themeBlack.dark.hex)};
--theme-color-darkWhite: ${hexToRgb(themeWhite.dark.hex)};
--theme-color-functional-success: ${hexToRgb(stateColor.success)};
--theme-color-functional-warning: ${hexToRgb(stateColor.warning)};
--theme-color-functional-error: ${hexToRgb(stateColor.error)};
--theme-color-functional-info: ${hexToRgb(stateColor.info)};
${extendListStr2}`,
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
			const colorArr: { hex: string; hsl: string; n: number; rgb: string }[] = [];
			colorList.forEach((item, index) => {
				// 第 0 项和最后一项的 key 为 50 和 950，其他项为 100-900，颜色有 hex、rgb、hsl 三种格式，注意 hsl 保留整数
				let colorObj: { hex: string; hsl: string; n: number; rgb: string } = {
					hex: '',
					hsl: '',
					n: 0,
					rgb: ''
				};
				if (index === 0) {
					colorObj = {
						n: 50,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl
					};
				} else if (index === 10) {
					colorObj = {
						n: 950,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl
					};
				} else {
					colorObj = {
						n: 100 * index,
						hex: item,
						rgb: colorConvertFunc(item).rgb,
						hsl: colorConvertFunc(item).hsl
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
		}[];

		darkColors = createTWColorFunc(darkColorList) as {
			hex: string;
			hsl: string;
			n: number;
			rgb: string;
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

		primaryColorList.forEach((item, i) => {
			setPropertyFunc(i === 6 ? '--theme-color-primary' : `--theme-color-primary-${i === 0 ? '50' : i === 10 ? '950' : i + '00'}`, item);
		});
		darkColorList.forEach((item, i) => {
			setPropertyFunc(i === 6 ? '--theme-color-dark' : `--theme-color-dark-${i === 0 ? '50' : i === 10 ? '950' : i + '00'}`, item);
		});
		setPropertyFunc('--theme-color-primaryBlack', primaryColorB.hex);
		setPropertyFunc('--theme-color-primaryWhite', primaryColorW.hex);
		setPropertyFunc('--theme-color-darkBlack', darkColorB.hex);
		setPropertyFunc('--theme-color-darkWhite', darkColorW.hex);
	};
	const changeFunc = (type = 'primary', e: null | Event, value: string) => {
		const colorValue = e ? (e.target as HTMLInputElement).value : value;
		const primaryObj = currentColorObj.color.primary;
		const darkObj = currentColorObj.color.dark;
		const functionalObj = currentColorObj.color.functional;
		const newColors = [...colors];
		const item = newColors.find((item) => item.type === type);
		if (item) {
			item.color = colorValue;
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
			setPropertyFunc(`--theme-color-functional-${type}`, colorValue);
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
			} else if (item.type === 'dark') {
				item.color = currentColorObj.color.dark.default;
			} else {
				// 确保 item.type 是 functional 对象中的有效键
				if (item.type in currentColorObj.color.functional) {
					item.color = currentColorObj.color.functional[item.type as keyof typeof currentColorObj.color.functional];
				}
			}
		});
		colors = newColors;
		name = currentColorObj.name;
		extendList = currentColorObj.color.extend;
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
			return { color: item.hex, alias: item.name };
		});
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
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
		extendListStr = extendListStrFunc(extendList);
	};
	// 选择 extendList 的颜色
	const changeExtendFunc = (e: Event, i: number) => {
		const colorValue = (e.target as HTMLInputElement).value;
		let newExtendList = [...extendList];
		newExtendList[i].color = colorValue;
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
	};
	// 输入 extendList 的别名
	const inputExtendFunc = (e: Event, i: number) => {
		const aliasValue = (e.target as HTMLInputElement).value;
		let newExtendList = [...extendList];
		newExtendList[i].alias = aliasValue;
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
	};
	// 新增扩展色
	const addExtendFunc = () => {
		let newExtendList = [...extendList];
		newExtendList.push({ color: '#000000', alias: '' });
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
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
					class="w-full rounded-sm bg-transparent px-1 py-1 text-sm outline outline-1 outline-black/10 focus:outline-none focus:outline-primary dark:outline-white/20 dark:focus:outline-dark"
					type="text"
					bind:value={name}
					placeholder={isZh ? '请输入主题名称' : 'Please enter theme name'}
				/>
			</div>
		</div>
		<div class="mt-4 flex gap-2">
			<div class="flex flex-col gap-4 text-center">
				<!-- 输入框 -->
				{#each colors as item, i}
					<div class="flex justify-end gap-2 {i === 2 ? 'mt-6' : 'mt-0'} relative">
						<div class="flex-1 text-right">{item.type}</div>
						<input
							type="color"
							bind:value={item.color}
							oninput={(e) => throttle(() => changeFunc(item.type, e, item.color), 100)()}
							class="h-6 w-6 flex-none cursor-pointer"
							style="background-color: {item.color};"
							onclick={() => (showTip = false)}
						/>
						<div class="w-20 flex-none overflow-hidden text-left text-sm leading-6">
							{item.color}
						</div>
						{#if i === 0 && showTip}
							<div class="pointer-events-none absolute right-[4.4rem] rotate-[135deg]">
								<div class="animate-bounce text-3xl">👇</div>
							</div>
						{/if}
					</div>
				{/each}
				<div class="mt-6 flex flex-col gap-4 overflow-y-auto p-1" style="height: {windowHeight - 480}px;">
					{#each extendList as item, i}
						<div class="flex flex-col gap-2">
							<div class="flex justify-end gap-2">
								<div class="flex-1 text-right">extend{i}</div>
								<input
									type="color"
									bind:value={item.color}
									class="h-6 w-6 flex-none"
									style="background-color: {item.color};"
									oninput={(e) => throttle(() => changeExtendFunc(e, i))}
								/>
								<div class="w-16 flex-none overflow-hidden text-left text-sm leading-6">
									{item.color}
								</div>
								<button aria-label="delete" class="rounded bg-black/5 px-1 dark:bg-white/10" onclick={() => deleteFunc(i)}>
									<svg class="h-4 w-6 transition-all hover:scale-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											class="fill-error"
											d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
										>
										</path>
									</svg>
								</button>
							</div>
							<div class="flex">
								<input
									class="h-6 w-full rounded-sm bg-transparent px-1 py-1 text-xs outline outline-1 outline-black/10 focus:outline-none focus:outline-primary dark:outline-white/20 dark:focus:outline-dark"
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
							class="items-centers flex w-full justify-center gap-2 rounded border border-primary py-1.5 text-sm text-black dark:border-dark dark:text-white"
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
						class="h-12 rounded {index >= 5 ? 'text-primaryWhite' : 'text-primaryBlack'}"
						style="background-color: {color.hex};flex: {index === 6 ? '2' : '1'}"
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
						class="h-12 rounded {index <= 6 ? 'text-darkBlack' : 'text-darkWhite'}"
						style="background-color: {color.hex};flex: {index === 6 ? '2' : '1'};"
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
					class="h-12 flex-1 rounded border pt-4 {i === 0 || i === 1 ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}"
					style="background-color: {item.hex};"
				>
					<div>
						{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}
					</div>
				</div>
			{/each}
		</div>
		<!-- 功能色 -->
		<div class="mt-1 flex justify-between gap-1 px-4 text-center text-xs text-white">
			<div class="h-12 flex-1 rounded pt-4" style="background-color: {stateColor.success};">success</div>
			<div class="h-12 flex-1 rounded pt-4" style="background-color: {stateColor.warning};">warning</div>
			<div class="h-12 flex-1 rounded pt-4" style="background-color: {stateColor.error};">error</div>
			<div class="h-12 flex-1 rounded pt-4" style="background-color: {stateColor.info};">info</div>
		</div>
		<!-- 扩展色 -->
		<div class="mt-1 flex h-12 justify-between gap-1 px-4 text-center text-xs text-white">
			{#if extendList}
				{#each extendList as item, i}
					<div class="flex h-12 flex-1 flex-col justify-center gap-1 rounded py-1" style="background-color: {item.color};">
						<div class="text-xs">extend{i}</div>
						<div>{item.alias}</div>
					</div>
				{/each}
			{/if}
		</div>
		<!-- 配置文件 -->
		<div class="mx-4 mt-1 flex" style="height:{windowHeight - 388}px;width:{windowWidth - 858}px">
			<div class="bg-codeLight dark:bg-codeDark relative mr-1 grow">
				<div class="overflow-auto rounded" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 3 - 6}px">
					<article class="prose max-w-none text-xs dark:prose-invert">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<pre><code class="hljs" id="myCodeBlock">{@html configStr}</code></pre>
					</article>
				</div>
				<button
					aria-label="copy"
					class="absolute right-0 top-0 rounded-bl bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
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
				<div class="overflow-auto rounded" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 2 + 4}px">
					<article class="prose max-w-none text-xs dark:prose-invert">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<pre><code class="hljs" id="myCodeBlock2">{@html configStr2}</code></pre>
					</article>
				</div>
				<button
					aria-label="copy"
					class="absolute right-0 top-0 rounded-bl bg-black/5 px-3 py-2 text-sm hover:opacity-80 dark:bg-white/10"
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
						class="rounded bg-primary px-4 py-2 text-xs text-white hover:opacity-90 dark:bg-dark dark:text-black"
						onclick={randomFunc}
					>
						{isZh ? '随机主题' : 'Random theme'}
					</button>
					<button
						class="ml-2 rounded border border-primary px-4 py-2 text-xs text-black hover:opacity-90 dark:border-dark dark:text-white"
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
				class="h-96 w-[392px] overflow-auto border border-primary/20 bg-primaryWhite dark:border-dark/20 dark:border-gray-700 dark:bg-darkBlack"
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
