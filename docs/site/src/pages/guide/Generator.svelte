<script>
	// @ts-nocheck
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import ClipboardJS from 'clipboard';
	import ModeSwitch from '../../components/modeSwitch/ModeSwitch.svelte';
	// import SwitchSite from '../../components/switch/Index.svelte';
	import { currentColorStore } from '../../store';
	import themes from '../../data/themes';
	import { generatePalette, generateThemeBlack, generateThemeWhite, colorConvertFunc, throttle, hexToRgb } from '../../utils';
	import colorList from '../../data/color';
	import GeneratorPreview from './GeneratorPreview.svelte';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showTip = true;
	let windowWidth = 0;
	let windowHeight = 0;
	const initTheme = themes.find(item => item.name === $currentColorStore);

	const setPropertyFunc = (name, value) => {
		const rgbStr = hexToRgb(value);
		document.documentElement.style.setProperty(name, rgbStr);
	};
	// 使用 extendList 返回 extendListStr
	const extendListStrFunc = extendList => {
		let extendListStr = '	{';
		extendList.forEach(item => {
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
	const extendListStrFunc2 = extendList => {
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
	let colors = [
		{ type: 'primary', color: initTheme.theme.color.primary.default },
		{ type: 'dark', color: initTheme.theme.color.dark.default },
		{ type: 'success', color: initTheme.theme.color.functional.success },
		{ type: 'warning', color: initTheme.theme.color.functional.warning },
		{ type: 'error', color: initTheme.theme.color.functional.error },
		{ type: 'info', color: initTheme.theme.color.functional.info },
	];
	let currentColorObj = {};
	let primaryColors = [];
	let darkColors = [];
	let themeBlack = {};
	let themeWhite = {};
	let stateColor = {};
	let extendList = initTheme.theme.color.extend;
	let name = initTheme.name;
	let showCopyTip = false;
	let showCopyTip2 = false;
	$: extendListStr = extendListStrFunc(extendList);
	$: extendListStr2 = extendListStrFunc2(extendList);

	// @ts-ignore
	$: configStr = hljs.highlight(
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
		{ language: 'javascript', ignoreIllegals: true },
	).value;

	// @ts-ignore
	$: configStr2 = hljs.highlight(
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
		{ language: 'css', ignoreIllegals: true },
	).value;

	// 统一生成颜色
	const generateFunc = () => {
		// 传入数组，按照 Tailwind 规则生成颜色列表
		const createTWColorFunc = colorList => {
			if (colorList.length !== 11) {
				console.error('颜色列表长度必须为11');
				return;
			}
			const colorArr = [];
			colorList.forEach((item, index) => {
				// 第 0 项和最后一项的 key 为 50 和 950 ，其他项为 100-900，颜色有 hex、rgb、hsl 三种格式，注意 hsl 保留整数
				let colorObj = {};
				if (index === 0) {
					colorObj = { n: 50, hex: item, rgb: colorConvertFunc(item).rgb, hsl: colorConvertFunc(item).hsl };
				} else if (index === 10) {
					colorObj = { n: 950, hex: item, rgb: colorConvertFunc(item).rgb, hsl: colorConvertFunc(item).hsl };
				} else {
					colorObj = { n: 100 * index, hex: item, rgb: colorConvertFunc(item).rgb, hsl: colorConvertFunc(item).hsl };
				}
				colorArr.push(colorObj);
			});
			return colorArr;
		};
		const primaryColorList = generatePalette(currentColorObj.color.primary.default);
		const darkColorList = generatePalette(currentColorObj.color.dark.default);
		primaryColors = createTWColorFunc(primaryColorList);
		darkColors = createTWColorFunc(darkColorList);

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
	const changeFunc = (type = 'primary', e, value) => {
		const colorValue = e ? e.target.value : value;
		const primaryObj = currentColorObj.color.primary;
		const darkObj = currentColorObj.color.dark;
		const functionalObj = currentColorObj.color.functional;
		const newColors = [...colors];
		newColors.find(item => item.type === type).color = colorValue;
		colors = newColors;
		if (type === 'primary') {
			numbers.forEach(item => {
				primaryObj[item === 600 ? 'default' : item] = colorValue;
			});
		} else if (type === 'dark') {
			numbers.forEach(item => {
				darkObj[item === 600 ? 'default' : item] = colorValue;
			});
		} else {
			setPropertyFunc(`--theme-color-functional-${type}`, colorValue);
			functionalObj[type] = colorValue;
		}
		currentColorObj = {
			color: { primary: primaryObj, dark: darkObj, functional: functionalObj },
		};
		generateFunc();
	};
	const unsubscribe = currentColorStore.subscribe(value => {
		// 根据 $currentColorStore 从 themes 中获取对应的颜色对象
		currentColorObj = themes.find(item => item.name === value).theme;
		generateFunc();

		// 根据 currentColorObj 设置 colors
		const newColors = [...colors];
		newColors.forEach(item => {
			if (item.type === 'primary') {
				item.color = currentColorObj.color.primary.default;
			} else if (item.type === 'dark') {
				item.color = currentColorObj.color.dark.default;
			} else {
				item.color = currentColorObj.color.functional[item.type];
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
		// 从 colorList 中随机取出一个 mode 为dark的颜色，再随机取出一个 mode 为 light 的颜色
		const randomDarkColor = colorList.filter(item => item.mode === 'dark')[
			Math.floor(Math.random() * colorList.filter(item => item.mode === 'dark').length)
		];
		const randomLightColor = colorList.filter(item => item.mode === 'light')[
			Math.floor(Math.random() * colorList.filter(item => item.mode === 'light').length)
		];
		name = `${randomDarkColor.name}/${randomLightColor.name}`;
		// 根据随机颜色生成主题
		changeFunc('primary', null, randomDarkColor.hex);
		changeFunc('dark', null, randomLightColor.hex);
		// 获取当前 extendList 的长度
		const extendListLength = extendList.length;
		// 从 colorList 中随机取出 extendListLength 个 mode 为dark的颜色，作为扩展色
		const randomExtendList = colorList
			.filter(item => item.mode === 'dark')
			.sort(() => Math.random() - 0.5)
			.slice(0, extendListLength);
		let newExtendList = [];
		newExtendList = randomExtendList.map(item => {
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
	const deleteFunc = i => {
		let newExtendList = [...extendList];
		newExtendList.splice(i, 1);
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
	};
	// 选择 extendList 的颜色
	const changeExtendFunc = (e, i) => {
		const colorValue = e.target.value;
		let newExtendList = [...extendList];
		newExtendList[i].color = colorValue;
		extendList = newExtendList;
		extendListStr = extendListStrFunc(extendList);
	};
	// 输入 extendList 的别名
	const inputExtendFunc = (e, i) => {
		const aliasValue = e.target.value;
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
			target: function (trigger) {
				return document.querySelector('#myCodeBlock');
			},
		});
		clipboard.on('success', function (e) {
			showCopyTip = true;
			setTimeout(() => {
				showCopyTip = false;
			}, 2000);
		});
		clipboard.on('error', function (e) {
			console.error('无法将内容复制到剪贴板');
		});

		// 复制
		const clipboard2 = new ClipboardJS('#copyButton2', {
			target: function (trigger) {
				return document.querySelector('#myCodeBlock2');
			},
		});
		clipboard2.on('success', function (e) {
			showCopyTip2 = true;
			setTimeout(() => {
				showCopyTip2 = false;
			}, 2000);
		});
		clipboard2.on('error', function (e) {
			console.error('无法将内容复制到剪贴板');
		});
	});
	onDestroy(() => {
		window.removeEventListener('resize', windowResizeFun);
	});
</script>

<div class="block md:hidden">{isZh ? '请在桌面端使用！' : 'Please use it on the desktop!'}</div>
<div class="hidden md:flex justify-between">
	<div>
		<div class="text-center mb-2 font-bold">{isZh ? '配置' : 'Configure'}</div>
		<div class="text-center flex flex-col gap-1">
			<div class="text-left">{isZh ? '主题名称' : 'Theme name'}</div>
			<div class="flex-1">
				<input
					class="bg-transparent w-full outline outline-1 outline-black/10 dark:outline-white/20 rounded-sm text-sm px-1 py-1 focus:outline-primary dark:focus:outline-dark focus:outline-none"
					type="text"
					bind:value={name}
					placeholder={isZh ? '请输入主题名称' : 'Please enter theme name'}
				/>
			</div>
		</div>
		<div class="flex gap-2 mt-4">
			<div class="flex flex-col gap-4 text-center">
				<!-- 输入框 -->
				{#each colors as item, i}
					<div class="flex gap-2 justify-end {i === 2 ? 'mt-6' : 'mt-0'} relative">
						<div class="flex-1 text-right">{item.type}</div>
						<input
							type="color"
							bind:value={item.color}
							on:input={e => throttle(changeFunc(item.type, e))}
							class="w-6 h-6 flex-none cursor-pointer"
							style="background-color: {item.color};"
							on:click={() => (showTip = false)}
						/>
						<div class="text-left text-sm leading-6 w-20 flex-none overflow-hidden">{item.color}</div>
						{#if i === 0 && showTip}
							<div class="absolute right-[4.4rem] rotate-[135deg] pointer-events-none">
								<div class="animate-bounce text-3xl">👇</div>
							</div>
						{/if}
					</div>
				{/each}
				<div class="flex flex-col gap-4 overflow-y-auto p-1 mt-6" style="height: {windowHeight - 480}px;">
					{#each extendList as item, i}
						<div class="flex flex-col gap-2">
							<div class="flex gap-2 justify-end">
								<div class="flex-1 text-right">extend{i}</div>
								<input
									type="color"
									bind:value={item.color}
									class="w-6 h-6 flex-none"
									style="background-color: {item.color};"
									on:input={e => throttle(changeExtendFunc(e, i))}
								/>
								<div class="text-left text-sm leading-6 w-16 flex-none overflow-hidden">{item.color}</div>
								<button class="bg-black/5 dark:bg-white/10 px-1 rounded" on:click={() => deleteFunc(i)}>
									<svg class="w-6 h-4 hover:scale-90 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
									class="h-6 w-full bg-transparent outline outline-1 outline-black/10 dark:outline-white/20 rounded-sm text-xs px-1 py-1 focus:outline-primary dark:focus:outline-dark focus:outline-none"
									type="text"
									bind:value={item.alias}
									placeholder={isZh ? `请输入 extend${i} 别名` : `Please enter extend${i} alias`}
									on:input={e => throttle(inputExtendFunc(e, i))}
								/>
							</div>
						</div>
					{/each}
					<div>
						<button
							class="border border-primary dark:border-dark w-full dark:text-white text-black py-1.5 rounded text-sm flex justify-center gap-2 items-centers"
							on:click={addExtendFunc}
						>
							<span>
								<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
		<div class="text-center mb-4 font-bold">{isZh ? '色板 & 配置文件' : 'Palette & Profiles'}</div>
		<div class="flex flex-col px-4 text-xs text-center">
			<div class="flex-1 flex justify-between gap-1 mb-1">
				{#each primaryColors as color, index}
					<div
						class="h-12 rounded {index >= 5 ? 'text-primaryWhite' : 'text-primaryBlack'}"
						style="background-color: {color.hex};flex: {index === 6 ? '2' : '1'}"
					>
						<div class="flex flex-col justify-between items-center">
							<div class="flex-1 leading-10 mt-1{index === 6 ? ' text-xl font-bold' : ''}">{index === 6 ? 'primary' : `${color.n}`}</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="flex-1 flex justify-between gap-1">
				{#each darkColors as color, index}
					<div
						class="h-12 rounded {index <= 6 ? 'text-darkBlack' : 'text-darkWhite'}"
						style="background-color: {color.hex};flex: {index === 6 ? '2' : '1'};"
					>
						<div class="flex justify-between items-center">
							<div class="flex-1 leading-10 mt-1{index === 6 ? ' text-xl font-bold' : ''}">{index === 6 ? 'dark' : `${color.n}`}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex justify-between gap-1 px-4 mt-1 text-xs text-center">
			{#each [themeBlack.primary, themeBlack.dark, themeWhite.primary, themeWhite.dark] as item, i}
				<div
					class="flex-1 h-12 rounded pt-4 border {i === 0 || i === 1 ? 'text-white border-gray-700' : 'text-black border-gray-300'}"
					style="background-color: {item.hex};"
				>
					<div>{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}</div>
				</div>
			{/each}
		</div>
		<!-- 功能色 -->
		<div class="flex justify-between gap-1 px-4 mt-1 text-center text-white text-xs">
			<div class="flex-1 h-12 rounded pt-4" style="background-color: {stateColor.success};">success</div>
			<div class="flex-1 h-12 rounded pt-4" style="background-color: {stateColor.warning};">warning</div>
			<div class="flex-1 h-12 rounded pt-4" style="background-color: {stateColor.error};">error</div>
			<div class="flex-1 h-12 rounded pt-4" style="background-color: {stateColor.info};">info</div>
		</div>
		<!-- 扩展色 -->
		<div class="flex justify-between gap-1 px-4 mt-1 h-12 text-center text-white text-xs">
			{#if extendList}
				{#each extendList as item, i}
					<div class="flex-1 h-12 py-1 rounded flex flex-col justify-center gap-1" style="background-color: {item.color};">
						<div class="text-xs">extend{i}</div>
						<div>{item.alias}</div>
					</div>
				{/each}
			{/if}
		</div>
		<!-- 配置文件 -->
		<div class="flex mx-4 mt-1" style="height:{windowHeight - 388}px;width:{windowWidth - 858}px">
			<div class="grow bg-codeLight dark:bg-codeDark relative mr-1">
				<div class="overflow-auto rounded" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 3 - 6}px">
					<article class="prose dark:prose-invert max-w-none text-xs">
						<pre><code class="hljs" id="myCodeBlock">{@html configStr}</code></pre>
					</article>
				</div>
				<button class="absolute right-0 top-0 py-2 px-3 rounded-bl bg-black/5 dark:bg-white/10 text-sm hover:opacity-80" id="copyButton">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-gray-700 dark:fill-gray-300"
							d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
						></path>
					</svg>
				</button>
				{#if showCopyTip}
					<div in:fly={{ x: 50, duration: 500 }} out:fly={{ x: 50, duration: 300 }} class="absolute top-1 text-sm right-14">
						{isZh ? '已复制！' : 'Copied!'}
					</div>
				{/if}
			</div>
			<div class="grow bg-codeLight dark:bg-codeDark relative">
				<div class="overflow-auto rounded" style="height:{windowHeight - 388}px;width:{((windowWidth - 858) / 5) * 2 + 4}px">
					<article class="prose dark:prose-invert max-w-none text-xs">
						<pre><code class="hljs" id="myCodeBlock2">{@html configStr2}</code></pre>
					</article>
				</div>
				<button class="absolute right-0 top-0 py-2 px-3 rounded-bl bg-black/5 dark:bg-white/10 text-sm hover:opacity-80" id="copyButton2">
					<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							class="fill-gray-700 dark:fill-gray-300"
							d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
						></path>
					</svg>
				</button>
				{#if showCopyTip2}
					<div in:fly={{ x: 50, duration: 500 }} out:fly={{ x: 50, duration: 300 }} class="absolute top-1 text-sm right-14">
						{isZh ? '已复制！' : 'Copied!'}
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex gap-4 w-[390px]">
		<div>
			<div class="flex w-full justify-between pb-2">
				<div>
					<button
						class="bg-primary dark:bg-dark text-white dark:text-black rounded px-4 py-2 text-xs hover:opacity-90"
						on:click={randomFunc}
					>
						{isZh ? '随机主题' : 'Random theme'}
					</button>
					<button
						class="border border-primary dark:border-dark dark:text-white text-black rounded px-4 py-2 text-xs hover:opacity-90 ml-2"
						on:click={resetFunc}
					>
						{isZh ? '重置' : 'Reset'}
					</button>
				</div>
				<div>
					<ModeSwitch />
				</div>
			</div>
			<div
				class="bg-primaryWhite dark:bg-darkBlack border border-primary/20 dark:border-dark/20 w-[392px] dark:border-gray-700 h-96 overflow-auto"
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
