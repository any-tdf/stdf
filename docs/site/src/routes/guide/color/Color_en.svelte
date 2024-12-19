<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ColorCard from '$lib/colorCard/ColorCard.svelte';
	import ModeSwitch from '$lib/modeSwitch/ModeSwitch.svelte';
	import ThemeSwitch from '$lib/themeSwitch/ThemeSwitch.svelte';
	import themes from '../../../data/themes';
	import { currentColorStore, isWideScreenStore } from '../../../store';
	import { generatePalette, generateThemeBlack, generateThemeWhite, colorConvertFunc } from '../../../utils';
	import hljs from 'highlight.js';
	import { type ThemeProps } from 'stdf/theme';

	const colorGrayList = [
		{ key: 'gray-50', hex: '#f2f2f2' },
		{ key: 'gray-100', hex: '#e6e6e6' },
		{ key: 'gray-200', hex: '#cccccc' },
		{ key: 'gray-300', hex: '#b3b3b3' },
		{ key: 'gray-400', hex: '#999999' },
		{ key: 'gray-500', hex: '#808080' },
		{ key: 'gray-600', hex: '#666666' },
		{ key: 'gray-700', hex: '#4D4D4D' },
		{ key: 'gray-800', hex: '#333333' },
		{ key: 'gray-900', hex: '#1A1A1A' },
		{ key: 'gray-950', hex: '#0D0D0D' }
	];
	onMount(() => hljs.highlightAll());

	let currentColorObj: ThemeProps | undefined = undefined;
	let primaryColors: { n: number; hex: string; rgb: string; hsl: string }[] | undefined = undefined;
	let darkColors: { n: number; hex: string; rgb: string; hsl: string }[] | undefined = undefined;
	let themeBlack:
		| {
				primary: { hex: string; rgb: string; hsl: string };
				dark: { hex: string; rgb: string; hsl: string };
		  }
		| undefined = undefined;
	let themeWhite:
		| {
				primary: { hex: string; rgb: string; hsl: string };
				dark: { hex: string; rgb: string; hsl: string };
		  }
		| undefined = undefined;
	let stateColor: { success: string; warning: string; error: string; info: string } | undefined = undefined;
	let extendList: { color: string; alias: string }[] | undefined = undefined;

	const unsubscribe = currentColorStore.subscribe((value) => {
		// 根据 $currentColorStore 从 themes 中获取对应的颜色对象
		currentColorObj = themes.find((item) => item.name === value)?.theme;
		// 传入数组，按照 Tailwind 规则生成颜色列表
		const createTWColorFunc = (colorList: string[]) => {
			if (colorList.length !== 11) {
				console.error('Coloe list length must be 11');
				return;
			}
			const colorArr: { n: number; hex: string; rgb: string; hsl: string }[] = [];
			colorList.forEach((item, index) => {
				// 第 0 项和最后一项的 key 为 50 和 950，其他项为 100-900，颜色有 hex、rgb、hsl 三种格式，注意 hsl 保留整数
				let colorObj: { n: number; hex: string; rgb: string; hsl: string } = {
					n: 0,
					hex: '',
					rgb: '',
					hsl: ''
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
		if (!currentColorObj) return;
		const primaryColorList = generatePalette(currentColorObj.color.primary.default);
		const darkColorList = generatePalette(currentColorObj.color.dark.default);
		primaryColors = createTWColorFunc(primaryColorList as string[]);
		darkColors = createTWColorFunc(darkColorList as string[]);
		// 根据主题色生成主题黑和白
		const primaryColorB = generateThemeBlack(currentColorObj.color.primary.default);
		const darkColorB = generateThemeBlack(currentColorObj.color.dark.default);
		themeBlack = { primary: primaryColorB, dark: darkColorB };
		const primaryColorW = generateThemeWhite(currentColorObj.color.primary.default);
		const darkColorW = generateThemeWhite(currentColorObj.color.dark.default);
		themeWhite = { primary: primaryColorW, dark: darkColorW };
		stateColor = currentColorObj.color.functional;
		extendList = currentColorObj.color.extend;
	});
	// svelte 组件销毁时取消订阅
	onDestroy(() => {
		unsubscribe();
	});
	// 传入 rgb(0, 98, 57) 这种格式与透明度，返回 rgba(0, 98, 57, 0.1) 这种格式
	const rgbaFunc = (str = '#000', n = 0.1) => {
		const arr = str.split(',');
		const r = arr[0].split('(')[1];
		const g = arr[1];
		const b = arr[2].split(')')[0];
		return `rgba(${r}, ${g}, ${b}, ${n / 10})`;
	};
	// 传入 hsl(157, 100%, 15%) 这种格式与透明度，返回 hsla(157, 100%, 15%, 0.1) 这种格式
	const hslaFunc = (str = 'hsl(157, 100%, 15%)', n = 0.1) => {
		const arr = str.split(',');
		const h = arr[0].split('(')[1];
		const s = arr[1];
		const l = arr[2].split(')')[0];
		return `hsla(${h}, ${s}, ${l}, ${n / 10})`;
	};
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<blockquote>
		Switch light and dark mode, select the following built-in themes to view the color matching. You can quickly configure the color system
		and generate a configuration file at <a href="/guide/generator" target="_blank">Theme Generator</a>. Please refer to
		<a href="/guide/theme" target="_blank">Theme Configuration</a> for specific usage.
	</blockquote>
	<div class="inline-flex items-center gap-4">
		<ModeSwitch />
	</div>
	<div class="flex items-center gap-4">
		<ThemeSwitch />
	</div>
	<h2>Overview</h2>
	<p>
		Using a reasonable color system can make the entire application color matching more unified and beautiful. With the help of Tailwind's
		configuration file, this function can be more convenient to achieve, including dark mode.
	</p>
	<p>
		STDF's color system includes four parts: theme color, functional color, neutral color, and extended color. Among them,
		<strong>theme color and functional color are required</strong>; neutral color generally uses the default configuration; extended color,
		also called auxiliary color or decorative color, is not required, and can be added according to the actual situation. You may need to
		modify your own color system according to your application.
	</p>
	<blockquote>
		Colors are different from technology. They are subjective, perceptual, and difficult to quantify. Therefore, there is no good or bad in
		color matching, only suitable or not.
	</blockquote>
	<h2>Theme Color</h2>
	<p>
		The theme color is the most core and high-frequency color used in the application. It may be used anywhere, such as emphasizing
		information, guiding operations, and largely determining the overall color tone and color matching style of the application.
	</p>
	<p>
		In general, another color that is different from the main color is used to adapt to the dark mode. One approach is not to change the
		hue, but to make the main color lighter and brighter to make it stand out on the dark background; the other approach is to completely
		take another hue. STDF recommends the latter, so that the main color in the dark color is more obvious. Therefore, the built-in theme
		color of STDF is divided into light and dark colors. Of course, if you need to set the light and dark modes to the same hue, it is also
		possible. STDF provides a <a href="/guide/generator" target="_blank">Theme Generator</a> that supports arbitrary configuration.
	</p>
	<div class="justify-between md:flex md:space-x-8">
		<div class="flex h-40 flex-1 flex-col justify-between rounded p-4 text-white" style="background-color: {primaryColors?.[6]?.hex};">
			<div class="font-bold">primary(Light mode)</div>
			<div class="text-sm">
				<div>{primaryColors?.[6]?.hex}</div>
				<div class="text-xs">{primaryColors?.[6]?.rgb}</div>
				<div class="text-xs">{primaryColors?.[6]?.hsl}</div>
			</div>
		</div>
		<div
			class="mt-4 flex h-40 flex-1 flex-col justify-between rounded p-4 text-black md:mt-0"
			style="background-color: {darkColors?.[6]?.hex};"
		>
			<div class="font-bold">dark(Dark mode)</div>
			<div class="text-sm">
				<div>{darkColors?.[6]?.hex}</div>
				<div class="text-xs">{darkColors?.[6]?.rgb}</div>
				<div class="text-xs">{darkColors?.[6]?.hsl}</div>
			</div>
		</div>
	</div>
	<h3>Gradient Color Palette</h3>
	<p>
		Tailwind has built-in a <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank">color palette</a>, but this cannot
		meet the custom theme color. STDF refers to Tailwind's color palette naming rules, and uses a built-in algorithm to dynamically
		calculate 11 colors of the theme color to form a gradient color palette. Among them, the 600 color is used as the default color
		[omitting the 600 number]. In actual business, there will be more scenarios using light colors, so there will be more choices for light
		colors.
	</p>
	<div class="justify-between space-y-8 md:flex md:space-x-8 md:space-y-0">
		<div class="flex flex-1 flex-col justify-between rounded bg-white text-sm">
			{#each primaryColors ?? [] as color, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded {index >= 5 ? 'text-white' : 'text-black'}"
					style="background-color: {color.hex};"
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 text-left font-bold">primary{index === 6 ? '' : `-${color.n}`}</div>
						<div class="text-right text-xs">
							<div>{color.hex}</div>
							<div>{color.rgb}</div>
							<div>{color.hsl}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-1 flex-col justify-between rounded bg-white text-sm">
			{#each darkColors ?? [] as color, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded {index >= 7 ? 'text-white' : 'text-black'}"
					style="background-color: {color.hex};"
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 text-left font-bold">dark{index === 6 ? '' : `-${color.n}`}</div>
						<div class="text-right text-xs">
							<div>{color.hex}</div>
							<div>{color.rgb}</div>
							<div>{color.hsl}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>Transparency</h3>
	<p>
		In some application scenarios, the transparency of the theme color is required. Note the difference from the gradient color palette.
	</p>
	<div class="transparent-background justify-between space-y-8 md:flex md:space-x-8 md:space-y-0">
		<div class="flex flex-1 flex-col justify-between rounded text-black">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: {rgbaFunc(primaryColors?.[6]?.rgb, color)};">
					<div class="flex items-center justify-between text-sm">
						<div class="rounded bg-white px-2 py-1">primary/{color * 10}</div>
						<div class="rounded bg-white px-2 py-1 text-right text-xs">
							<div>{rgbaFunc(primaryColors?.[6]?.rgb, color)}</div>
							<div>{hslaFunc(primaryColors?.[6]?.hsl, color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-1 flex-col justify-between rounded text-black">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: {rgbaFunc(darkColors?.[6]?.rgb, color)};">
					<div class="flex items-center justify-between text-sm">
						<div class="rounded bg-white px-2 py-1">dark/{color * 10}</div>
						<div class="rounded bg-white px-2 py-1 text-right text-xs">
							<div>{rgbaFunc(darkColors?.[6]?.rgb, color)}</div>
							<div>{hslaFunc(darkColors?.[6]?.hsl, color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>Theme Black and White</h3>
	<p>
		In general, pure black [#000000] should be avoided in the design, and colors close to pure black should be used. At the same time, STDF
		will calculate two black colors close to pure black but with theme colors according to the algorithm, which is convenient for design
		matching. Similarly, two white colors close to pure white but with theme colors will also be calculated. Generally, it can be used in
		scenarios such as text color, light and dark background color when matching multiple themes.
	</p>
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		{#each [themeBlack?.primary, themeBlack?.dark, themeWhite?.primary, themeWhite?.dark] as item, i}
			<div
				class="flex h-32 flex-1 flex-col justify-between rounded border p-4 {i === 0 || i === 1
					? 'border-gray-700 text-white'
					: 'border-gray-300 text-black'}"
				style="background-color: {item?.hex};"
			>
				<div class="font-bold">
					{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}
				</div>
				<div class="text-xs">
					<div>{item?.hex}</div>
					<div>{item?.rgb}</div>
					<div>{item?.hsl}</div>
				</div>
			</div>
		{/each}
	</div>

	<h2>Functional Color</h2>
	<p>
		The functional color refers to the color with specific semantics used in specific scenarios, specific states, etc., usually including
		four types: success, warning, error, and information. Of course, it also supports the transparency writing method similar to the theme
		color.
	</p>
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		<div class="bg-success flex h-32 flex-1 flex-col justify-between rounded p-4 text-white">
			<div class="font-bold">success</div>
			<div class="text-xs">
				<div>{stateColor?.success}</div>
				<div>{colorConvertFunc(stateColor?.success).rgb}</div>
				<div>{colorConvertFunc(stateColor?.success).hsl}</div>
			</div>
		</div>
		<div class="bg-warning flex h-32 flex-1 flex-col justify-between rounded p-4 text-white">
			<div class="font-bold">warning</div>
			<div class="text-xs">
				<div>{stateColor?.warning}</div>
				<div>{colorConvertFunc(stateColor?.warning).rgb}</div>
				<div>{colorConvertFunc(stateColor?.warning).hsl}</div>
			</div>
		</div>
		<div class="bg-error flex h-32 flex-1 flex-col justify-between rounded p-4 text-white">
			<div class="font-bold">error</div>
			<div class="text-xs">
				<div>{stateColor?.error}</div>
				<div>{colorConvertFunc(stateColor?.error).rgb}</div>
				<div>{colorConvertFunc(stateColor?.error).hsl}</div>
			</div>
		</div>
		<div class="bg-info flex h-32 flex-1 flex-col justify-between rounded p-4 text-white">
			<div class="font-bold">info</div>
			<div class="text-xs">
				<div>{stateColor?.info}</div>
				<div>{colorConvertFunc(stateColor?.info).rgb}</div>
				<div>{colorConvertFunc(stateColor?.info).hsl}</div>
			</div>
		</div>
	</div>

	<h2>Neutral Color</h2>
	<p>
		The neutral color contains a series of black and white colors with transparency and different degrees of gray, which are used to
		configure the background, text, dividing line, etc. of different light and dark modes.
	</p>
	<p class="text-xs">
		Note: When the lower layer is a solid color, the black and white colors with transparency and gray may look the same but are actually
	</p>
	<div class="justify-between space-y-8 text-black md:flex md:space-x-8 md:space-y-0">
		<div class="transparent-background flex flex-1 flex-col justify-between rounded text-sm">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5, 10] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: rgba(0, 0, 0, {color / 10});">
					<div class="flex items-center justify-between">
						<div class="rounded bg-white px-2 py-1 text-left">
							black{color === 10 ? '' : `/${color * 10}`}
						</div>
						<div class="rounded bg-white px-2 py-1 text-xs">
							<div class="flex-1 text-right">rgba(0, 0, 0, {color / 10})</div>
							<div class="flex-1 text-right">hsla(0, 0%, 0%, {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="transparent-background flex flex-1 flex-col justify-between rounded text-sm">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5, 10] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: rgba(255, 255, 255, {color / 10});">
					<div class="flex items-center justify-between">
						<div class="rounded bg-white px-2 py-1 text-left">
							white{color === 10 ? '' : `/${color * 10}`}
						</div>
						<div class="rounded bg-white px-2 py-1 text-xs">
							<div class="flex-1 text-right">rgba(255, 255, 255, {color / 10})</div>
							<div class="flex-1 text-right">hsla(0, 100%, 0%, {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-1 flex-col justify-between rounded">
			<ColorCard colorList={colorGrayList} />
		</div>
	</div>

	<h2>Extended Color</h2>
	<p>
		The extended color is a non-essential decorative color that distinguishes between functional color and theme color. It is mainly used
		when multiple colors need to be matched on the interface. Unified configuration can make the global matching color more coordinated, and
		it is more convenient to write after configuring through Tailwind. The number is unlimited, the usage is unlimited, and the rules of use
		are unlimited. But please note that when using <strong
			>multiple themes, the number of extended colors of different themes should be consistent.</strong
		> STDF's built-in themes provide three extended colors, please match according to your actual color scheme. Of course, it also supports the
		transparency writing method similar to the theme color.
	</p>
	<p>
		When writing the extended color class name, use extend0, extend1... This method is not convenient to remember, it is recommended to use
		the alias of the color. The naming rules of the alias are not limited, such as color name, brand, emotion, scene, number, associated
		things... are all available. As the following extend0, extend1, extend2 correspond to the three extended colors of the current theme [{themes?.find(
			(item) => item.name === $currentColorStore
		)?.name}]. STDF provides a <a href="/guide/generator" target="_blank"> Theme Generator </a> also supports configuration aliases.
	</p>
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		{#each extendList ?? [] as extend}
			<div class="flex h-32 flex-1 flex-col justify-between rounded p-4 text-white" style="background-color: {extend.color};">
				<div class="font-bold">{extend.alias}</div>
				<div class="text-xs">
					<div>{extend.color}</div>
					<div>{colorConvertFunc(extend.color).rgb}</div>
					<div>{colorConvertFunc(extend.color).hsl}</div>
				</div>
			</div>
		{/each}
	</div>
</article>
