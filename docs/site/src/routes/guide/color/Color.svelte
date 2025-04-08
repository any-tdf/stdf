<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ColorCard from '$lib/colorCard/ColorCard.svelte';
	import ModeSwitch from '$lib/modeSwitch/ModeSwitch.svelte';
	import ThemeSwitch from '$lib/themeSwitch/ThemeSwitch.svelte';
	import themes from '../../../data/themes';
	import { currentColorStore, isWideScreenStore } from '../../../store';
	import { colorConvertFunc, colorObjToArr, getOklchOpacity } from '../../../utils';
	import hljs from 'highlight.js';
	import { type ThemeProps, type PrimaryAndDarkColor } from 'stdf/theme';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const colorGrayList = [
		{ key: 'gray-50', color: 'oklch(0.961 0 0)' },
		{ key: 'gray-100', color: 'oklch(0.925 0 0)' },
		{ key: 'gray-200', color: 'oklch(0.845 0 0)' },
		{ key: 'gray-300', color: 'oklch(0.767 0 0)' },
		{ key: 'gray-400', color: 'oklch(0.683 0 0)' },
		{ key: 'gray-500', color: 'oklch(0.6 0 0)' },
		{ key: 'gray-600', color: 'oklch(0.51 0 0)' },
		{ key: 'gray-700', color: 'oklch(0.42 0 0)' },
		{ key: 'gray-800', color: 'oklch(0.321 0 0)' },
		{ key: 'gray-900', color: 'oklch(0.218 0 0)' },
		{ key: 'gray-950', color: 'oklch(0.159 0 0)' }
	];
	onMount(() => hljs.highlightAll());

	let currentColorObj: ThemeProps | undefined = undefined;
	let primaryColors: PrimaryAndDarkColor | undefined = $state(undefined);
	// primaryColors 转为数组，且 default 在第 6 项
	let primaryColorsList = $derived(colorObjToArr(primaryColors ?? {}));
	let darkColors: PrimaryAndDarkColor | undefined = $state(undefined);
	let darkColorsList = $derived(colorObjToArr(darkColors ?? {}));
	let themeBlack: { primary: string; dark: string } | undefined = $state(undefined);
	let themeWhite: { primary: string; dark: string } | undefined = $state(undefined);
	let stateColor: { success: string; warning: string; error: string; info: string } | undefined = $state(undefined);
	let extendList: { color: string; alias: string }[] | undefined = $state(undefined);

	const unsubscribe = currentColorStore.subscribe((value) => {
		// 根据 $currentColorStore 从 themes 中获取对应的颜色对象
		currentColorObj = themes.find((item) => item.name === value)?.theme;
		// 传入数组，按照 Tailwind 规则生成颜色列表
		const createTWColorFunc = (colorList: string[]) => {
			if (colorList.length !== 11) {
				console.error('颜色列表长度必须为 11');
				return;
			}
			const colorArr: { n: number; hex: string; rgb: string; hsl: string }[] = [];
			colorList.forEach((item, index) => {
				// 第 0 项和最后一项的 key 为 50 和 950，其他项为 100-900，颜色有 hex、rgb、hsl 三种格式，注意 hsl 保留整数
				let colorObj: { n: number; hex: string; rgb: string; hsl: string; oklch: string } = {
					n: 0,
					hex: '',
					rgb: '',
					hsl: '',
					oklch: ''
				};
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
		if (!currentColorObj) return;
		primaryColors = currentColorObj.color.primary;
		darkColors = currentColorObj.color.dark;

		// 根据主题色生成主题黑和白
		themeBlack = { primary: currentColorObj.color.primaryBlack, dark: currentColorObj.color.darkBlack };
		themeWhite = { primary: currentColorObj.color.primaryWhite, dark: currentColorObj.color.darkWhite };
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
		{isZh
			? 'STDF 跟随 Tailwind CSS v4 推荐使用 oklch 颜色模式。'
			: 'STDF follows Tailwind CSS v4 recommendation to use the oklch color mode.'}
	</blockquote>
	<div class="mb-4 text-xs">
		{#if isZh}
			切换亮暗模式，选择下列内置主题可查看配色。到<a href="/guide/generator" target="_blank">主题生成器</a
			>可快速配置颜色系统并生成配置文件。具体使用方法请参考<a href="/guide/theme" target="_blank">主题配置</a>。
		{:else}
			Switch the light and dark mode, select the built-in theme to view the color. To <a href="/guide/generator" target="_blank"
				>Theme Generator</a
			>
			quickly configure the color system and generate the configuration file. For specific usage methods, please refer to
			<a href="/guide/theme" target="_blank">Theme Configuration</a>.
		{/if}
	</div>
	<div class="inline-flex items-center gap-4">
		<ModeSwitch />
	</div>
	<div class="flex items-center gap-4">
		<ThemeSwitch />
	</div>
	<h2>{isZh ? '概述' : 'Overview'}</h2>
	<p>
		{isZh
			? '使用合理的颜色系统，可以使整个应用配色更加统一和美观。借助 Tailwind 的配置，可以更加方便地实现这一功能，当然也包括暗模式。'
			: "Use a reasonable color system to make the entire application more unified and beautiful. With Tailwind's configuration, this function can be implemented more conveniently, including the dark mode."}
	</p>
	{#if isZh}
		<p>
			STDF 颜色系统包含主题色、功能色、中性色、扩展色四个部分。其中<strong>主题色和功能色是必须的</strong
			>；中性色一般使用默认配置即可；扩展色，也叫辅助色或装饰色，非必需，可根据实际情况自行添加。你可能需要根据你的应用修改成自己的颜色系统。
		</p>
	{:else}
		<p>
			STDF color system includes four parts: theme color, functional color, neutral color, and extended color. Among them, <strong
				>theme color and functional color are required</strong
			>；neutral color generally uses the default configuration; extended color, also called auxiliary color or decorative color, is not
			required, and can be added according to actual circumstances. You may need to modify it to your own color system according to your
			application.
		</p>
	{/if}
	<blockquote>
		{isZh
			? '颜色有别于技术，是一种主观、感性、难量化的事物，所以颜色的搭配没有好坏之分，只有适合不适合。'
			: 'Color is different from technology, it is a subjective, emotional, and difficult to quantify thing, so there is no good or bad in color combination, only whether it is suitable or not.'}
	</blockquote>
	<h2>{isZh ? '主题色' : 'Theme Color'}</h2>
	<p>
		{isZh
			? '主题色是应用中最核心、最高频使用的颜色，它可能用于任何地方，比如强调信息、引导操作，并在很大程度上决定了应用整体的颜色基调和配色风格。'
			: 'Theme color is the most core and frequently used color in the application. It may be used anywhere, such as emphasizing information, guiding operations, and largely determining the color tone and color scheme of the application.'}
	</p>
	{#if isZh}
		<p>
			一般情况，会使用区别于主色的另一种颜色适配暗模式，一种做法是不改变色相，只是将主色变浅提亮使其突出显现在暗背景下；另一种做法是完全取另一种色相，STDF
			推荐使用后者，以便暗模式下的主色更加明显。所以 STDF
			内置的主题色分为亮暗模式。当然，如果你需要将亮暗模式都设置为相同色相也是可以的，STDF 提供的<a href="/guide/generator" target="_blank">
				主题生成器
			</a>支持随意配置。
		</p>
	{:else}
		<p>
			Generally, a different color from the main color is used to adapt to the dark mode. One approach is to keep the same hue but make the
			main color lighter to stand out in the dark background; the other approach is to completely take another hue, STDF recommends the
			latter, so that the main color in the dark mode is more obvious. Therefore, STDF provides two sets of theme colors: one for the light
			mode and one for the dark mode. Of course, if you need to set both the light and dark modes to the same hue, the <a
				href="/guide/generator"
				target="_blank">Theme Generator</a
			> supports arbitrary configuration.
		</p>
	{/if}
	<div class="justify-between md:flex md:space-x-8">
		<div class="flex h-32 flex-1 flex-col justify-between rounded-sm p-4 text-white" style="background-color: {primaryColors?.default};">
			<div class="text-xl font-bold">{isZh ? 'primary（亮模式）' : 'primary (Light Mode)'}</div>
			<div>{primaryColors?.default}</div>
		</div>
		<div
			class="mt-4 flex h-32 flex-1 flex-col justify-between rounded-sm p-4 text-black md:mt-0"
			style="background-color: {darkColors?.default};"
		>
			<div class="text-xl font-bold">{isZh ? 'dark（暗模式）' : 'dark (Dark Mode)'}</div>
			<div>{darkColors?.default}</div>
		</div>
	</div>
	<h3>{isZh ? '梯度色板' : 'Gradient Color Palette'}</h3>
	{#if isZh}
		<p>
			Tailwind 内置了一套 <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank">调色板</a
			>，但这并不能满足自定义的主题色，STDF 参照 Tailwind 的调色板命名规则，使用一套内置算法动态地将主题色计算出 11 种颜色组成梯度色板。其中
			600 号色作为默认颜色【省略 600 编号】，实际业务中使用淡颜色的场景会多一些，故淡颜色会多一些选择。
		</p>
	{:else}
		<p>
			Tailwind provides a <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank">color palette</a>, but it cannot meet
			the custom theme color, STDF refers to Tailwind's color palette naming rules and uses a set of built-in algorithms to calculate the
			theme color into 11 colors to form a gradient color palette. The 600th color is the default color [omitting the 600 number], and in
			actual business, the scene of using light colors is more common, so there are more choices for light colors.
		</p>
	{/if}
	<div class="justify-between space-y-8 md:flex md:space-x-8 md:space-y-0">
		<div class="flex flex-1 flex-col justify-between rounded-sm bg-white text-sm">
			{#each primaryColorsList as item, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded-sm {index >= 6 ? 'text-white' : 'text-black'}"
					style="background-color: {item.value};"
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 text-left font-bold">primary{index === 6 ? '' : `-${item.key}`}</div>
						<div class="text-right">
							<div>{item.value}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-1 flex-col justify-between rounded-sm bg-white text-sm">
			{#each darkColorsList as item, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded-sm {index >= 7 ? 'text-white' : 'text-black'}"
					style="background-color: {item.value};"
				>
					<div class="flex items-center justify-between">
						<div class="flex-1 text-left font-bold">dark{index === 6 ? '' : `-${item.key}`}</div>
						<div class="text-right">
							<div>{item.value}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>{isZh ? '透明度' : 'Opacity'}</h3>
	<p>
		{isZh
			? '某些应用场景中，需要使用到主题色的透明度。注意这与上述梯度色板的差异。'
			: 'In some application scenarios, you need to use the opacity of the theme color. Note the difference from the above gradient color palette.'}
	</p>
	<div class="transparent-background justify-between space-y-8 md:flex md:space-x-8 md:space-y-0">
		<div class="flex flex-1 flex-col justify-between rounded-sm text-black">
			{#each [0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95] as color}
				<div
					class="p-2 transition hover:scale-105 hover:rounded-sm"
					style="background-color: {getOklchOpacity(primaryColors?.default ?? '', color)};"
				>
					<div class="flex items-center justify-between text-sm">
						<div class="rounded-sm bg-white px-2 py-1">primary/{color * 100}</div>
						<div class="rounded-sm bg-white px-2 py-1 text-right">
							<div>{getOklchOpacity(primaryColors?.default ?? '', color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-1 flex-col justify-between rounded-sm text-black">
			{#each [0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95] as color}
				<div
					class="p-2 transition hover:scale-105 hover:rounded-sm"
					style="background-color: {getOklchOpacity(darkColors?.default ?? '', color)};"
				>
					<div class="flex items-center justify-between text-sm">
						<div class="rounded-sm bg-white px-2 py-1">dark/{color * 100}</div>
						<div class="rounded-sm bg-white px-2 py-1 text-right">
							<div>{getOklchOpacity(darkColors?.default ?? '', color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>{isZh ? '主题黑白色' : 'Theme Black and White'}</h3>
	<p>
		{isZh
			? '通常情况下，设计中应避免大面积使用纯黑色 oklch(0 0 0)，使用接近纯黑的颜色。同时 STDF 会根据算法计算出两个接近纯黑但是带有主题色的黑色，方便设计搭配。同样也会计算出两个接近纯白但是带有主题色的白色。一般可用于多套主题搭配时的文字颜色，亮暗背景颜色等场景。'
			: 'In most cases, designers should avoid using pure black oklch(0 0 0) on a large scale, and use a color close to pure black. At the same time, STDF will calculate two black colors close to pure black but with a theme color for design. Similarly, it will calculate two white colors close to pure white but with a theme color. Generally, it can be used in the text color of multiple theme combinations, the light and dark background color, etc.'}
	</p>
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		{#each [themeBlack?.primary, themeBlack?.dark, themeWhite?.primary, themeWhite?.dark] as item, i}
			<div
				class="flex h-24 flex-1 flex-col justify-between rounded-sm border p-2 {i === 0 || i === 1
					? 'border-gray-700 text-white'
					: 'border-gray-300 text-black'}"
				style="background-color: {item};"
			>
				<div class="font-bold">
					{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}
				</div>
				<div class="text-sm">{item}</div>
			</div>
		{/each}
	</div>
	<h2>{isZh ? '功能色' : 'Functional Color'}</h2>
	<p>
		{isZh
			? '功能色是指用于特定场景、特定状态等特殊语义的颜色，通常包含成功、警告、错误、信息四种。当然也都支持类似主题色的透明度写法。'
			: 'Functional color is a color used for specific scenarios, specific states, etc. It usually includes four types: success, warning, error, and information. Of course, it also supports the transparent writing method similar to the theme color.'}
	</p>
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		{#each [stateColor?.success, stateColor?.warning, stateColor?.error, stateColor?.info] as item, i}
			<div class="flex h-24 flex-1 flex-col justify-between rounded-sm p-2 text-white" style="background-color: {item};">
				<div class="font-bold">{i === 0 ? 'success' : i === 1 ? 'warning' : i === 2 ? 'error' : 'info'}</div>
				<div class="text-sm">{item}</div>
			</div>
		{/each}
	</div>
	<h2>{isZh ? '中性色' : 'Neutral Color'}</h2>
	<p>
		{isZh
			? '中性色包含一系列带透明度的黑白色和不同程度的灰色，用于配置亮色与暗模式不同背景、文字、分割线等颜色。'
			: 'Neutral color includes a series of black and white colors with different degrees of transparency and different degrees of gray, used to configure different background, text, and split line colors in the light and dark modes.'}
	</p>
	<p class="text-xs">
		{isZh
			? '注：当下层为纯色时，带透明度的黑白色与灰色可能看起来一样但实际不一样，请注意区分使用。虽然灰色也可以使用透明度，但是需要透明度的地方一般通过黑白色配合透明度值使用。'
			: 'Note: When the lower layer is a pure color, the black and white colors with transparency may look the same but are actually different, please pay attention to the difference in use. Although gray can also use transparency, but the places that need transparency usually use the black and white colors with transparency.'}
	</p>
	<div class="justify-between space-y-8 text-black md:flex md:space-x-8 md:space-y-0">
		<div class="transparent-background flex flex-1 flex-col justify-between rounded-sm text-sm">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-2 transition hover:scale-105 hover:rounded-sm" style="background-color: oklch(0 0 0 / {color / 10});">
					<div class="flex items-center justify-between">
						<div class="rounded-sm bg-white px-2 py-1 text-left">
							black{`/${color * 10}`}
						</div>
						<div class="rounded-sm bg-white px-2 py-1">
							<div class="flex-1 text-right">oklch(0 0 0 / {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
			<div class="p-2 transition hover:scale-105 hover:rounded-sm" style="background-color: oklch(0 0 0);">
				<div class="flex items-center justify-between">
					<div class="rounded-sm bg-white px-2 py-1 text-left">black</div>
					<div class="rounded-sm bg-white px-2 py-1">
						<div class="flex-1 text-right">oklch(0 0 0)</div>
					</div>
				</div>
			</div>
		</div>
		<div class="transparent-background flex flex-1 flex-col justify-between rounded text-sm">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-2 transition hover:scale-105 hover:rounded-sm" style="background-color: oklch(1 0 0 / {color / 10});">
					<div class="flex items-center justify-between">
						<div class="rounded-sm bg-white px-2 py-1 text-left">
							white{`/${color * 10}`}
						</div>
						<div class="rounded-sm bg-white px-2 py-1">
							<div class="flex-1 text-right">oklch(1 0 0 / {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
			<div class="p-2 transition hover:scale-105 hover:rounded-sm" style="background-color: oklch(1 0 0);">
				<div class="flex items-center justify-between">
					<div class="rounded-sm bg-white px-2 py-1 text-left">white</div>
					<div class="rounded-sm bg-white px-2 py-1">
						<div class="flex-1 text-right">oklch(1 0 0)</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col justify-between rounded-sm">
			<ColorCard colorList={colorGrayList} />
		</div>
	</div>
	<h2>{isZh ? '扩展色' : 'Extended Color'}</h2>
	{#if isZh}
		<p>
			扩展色是一些区分功能色与主题色的非必需装饰性颜色，主要是在需要多个颜色搭配的界面时使用。统一配置可以使全局搭配颜色更加协调，通过
			Tailwind 配置之后写起来也更加方便。数量不限，使用方式不限，使用规则不限。但请注意使用<strong
				>多主题时，不同主题的扩展色数量应保持一致。</strong
			>STDF 内置主题都提供了三种扩展色，请根据你的实际配色方案搭配。当然也都支持类似主题色的透明度写法。
		</p>
		<p>
			写扩展色类名时使用 extend0、extend1...
			这种方式不方便记忆，推荐使用颜色的别名。别名的命名规则不限，如颜色名称、品牌、情绪、场景、编号、关联事物......皆可。如下面的
			extend0、extend1、extend2 分别对应当前主题【{themes.find((item) => item.name === $currentColorStore)?.name_CN}】的三个扩展色。STDF
			提供的<a href="/guide/generator" target="_blank"> 主题生成器 </a>也支持配置别名。
		</p>
	{:else}
		<p>
			Extended color is some non-essential decorative colors that are not required to distinguish between functional colors and theme
			colors. Mainly used in interfaces that need multiple color combinations. Unifying the configuration can make the global color more
			harmonious, and writing it is also more convenient after Tailwind configuration. The number is unlimited, the usage is unlimited, and
			the usage rules are unlimited. But please note that when using multiple themes, the number of extended colors in different themes
			should be kept consistent. STDF provides three extended colors for the built-in themes, please match according to your actual color
			scheme. Of course, it also supports the transparent writing method similar to the theme color.
		</p>
		<p>
			When writing the class name of the extended color, use extend0, extend1..., this method is not convenient to remember, it is
			recommended to use the alias of the color. The naming rules of the alias are unlimited, such as the color name, brand, emotion, scene,
			number, related things... Such as the following extend0, extend1, extend2, which correspond to the three extended colors of the
			current theme [{themes.find((item) => item.name === $currentColorStore)?.name}]. STDF's
			<a href="/guide/generator" target="_blank">Theme Generator</a> also supports configuration aliases.
		</p>
	{/if}
	<div class="flex-wrap justify-around space-y-4 md:flex md:space-x-4 md:space-y-0">
		{#each extendList ?? [] as extend}
			<div class="flex h-24 flex-1 flex-col justify-between rounded-sm p-2 text-white" style="background-color: {extend.color};">
				<div class="font-bold">{extend.alias}</div>
				<div>{extend.color}</div>
			</div>
		{/each}
	</div>
</article>
