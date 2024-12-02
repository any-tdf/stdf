<script>
	import { onMount, onDestroy } from 'svelte';
	import ColorCard from '../../components/colorCard/ColorCard.svelte';
	import ModeSwitch from '../../components/modeSwitch/ModeSwitch.svelte';
	import ThemeSwitch from '../../components/themeSwitch/ThemeSwitch.svelte';
	import themes from '../../data/themes';
	import { currentColorStore, isWideScreenStore } from '../../store';
	import { generatePalette, generateThemeBlack, generateThemeWhite, colorConvertFunc } from '../../utils';

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
		{ key: 'gray-950', hex: '#0D0D0D' },
	];
	// @ts-ignore
	onMount(() => hljs.highlightAll());

	let currentColorObj = {};
	let primaryColors = [];
	let darkColors = [];
	let themeBlack = {};
	let themeWhite = {};
	let stateColor = {};
	let extendList = [];

	const unsubscribe = currentColorStore.subscribe(value => {
		// 根据 $currentColorStore 从 themes 中获取对应的颜色对象
		currentColorObj = themes.find(item => item.name === value).theme;
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
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<blockquote>
		切换亮暗模式，选择下列内置主题可查看配色。到<a href="#/guide/generator" target="_blank">主题生成器</a
		>可快速配置颜色系统并生成配置文件。具体使用方法请参考<a href="#/guide/theme" target="_blank">主题配置</a>。
	</blockquote>
	<div class="inline-flex gap-4 items-center">
		<ModeSwitch />
	</div>
	<div class="flex gap-4 items-center">
		<ThemeSwitch />
	</div>
	<h2>概述</h2>
	<p>使用合理的颜色系统，可以使整个应用配色更加统一和美观。借助 Tailwind 的配置文件，可以更加方便地实现这一功能，当然也包括暗模式。</p>
	<p>
		STDF 颜色系统包含主题色、功能色、中性色、扩展色四个部分。其中<strong>主题色和功能色是必须的</strong
		>；中性色一般使用默认配置即可；扩展色，也叫辅助色或装饰色，非必需，可根据实际情况自行添加。你可能需要根据你的应用修改成自己的颜色系统。
	</p>
	<blockquote>颜色有别于技术，是一种主观、感性、难量化的事物，所以颜色的搭配没有好坏之分，只有适合不适合。</blockquote>
	<h2>主题色</h2>
	<p>
		主题色是应用中最核心、最高频使用的颜色，它可能用于任何地方，比如强调信息、引导操作，并在很大程度上决定了应用整体的颜色基调和配色风格。
	</p>
	<p>
		一般情况，会使用区别于主色的另一种颜色适配暗模式，一种做法是不改变色相，只是将主色变浅提亮使其突出显现在暗背景下；另一种做法是完全取另一种色相，STDF
		推荐使用后者，以便暗模式下的主色更加明显。所以 STDF 内置的主题色分为亮暗模式。当然，如果你需要将亮暗模式都设置为相同色相也是可以的，STDF
		提供的<a href="#/guide/generator" target="_blank"> 主题生成器 </a>支持随意配置。
	</p>
	<div class="md:flex justify-between md:space-x-8">
		<div class="flex-1 h-40 p-4 rounded text-white flex flex-col justify-between" style="background-color: {primaryColors[6].hex};">
			<div class="font-bold">primary（亮模式）</div>
			<div class="text-sm">
				<div>{primaryColors[6].hex}</div>
				<div class="text-xs">{primaryColors[6].rgb}</div>
				<div class="text-xs">{primaryColors[6].hsl}</div>
			</div>
		</div>
		<div
			class="flex-1 mt-4 md:mt-0 h-40 p-4 rounded text-black flex flex-col justify-between"
			style="background-color: {darkColors[6].hex};"
		>
			<div class="font-bold">dark（暗模式）</div>
			<div class="text-sm">
				<div>{darkColors[6].hex}</div>
				<div class="text-xs">{darkColors[6].rgb}</div>
				<div class="text-xs">{darkColors[6].hsl}</div>
			</div>
		</div>
	</div>
	<h3>梯度色板</h3>
	<p>
		Tailwind 内置了一套 <a href="https://tailwindcss.com/docs/customizing-colors" target="_blank">调色板</a
		>，但这并不能满足自定义的主题色，STDF 参照 Tailwind 的调色板命名规则，使用一套内置算法动态地将主题色计算出 11 种颜色组成梯度色板。其中
		600 号色作为默认颜色【省略 600 编号】，实际业务中使用淡颜色的场景会多一些，故淡颜色会多一些选择。
	</p>
	<div class="md:flex justify-between md:space-x-8 space-y-8 md:space-y-0">
		<div class="flex-1 flex flex-col justify-between rounded text-sm bg-white">
			{#each primaryColors as color, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded {index >= 5 ? 'text-white' : 'text-black'}"
					style="background-color: {color.hex};"
				>
					<div class="flex justify-between items-center">
						<div class="flex-1 text-left font-bold">primary{index === 6 ? '' : `-${color.n}`}</div>
						<div class="text-xs text-right">
							<div>{color.hex}</div>
							<div>{color.rgb}</div>
							<div>{color.hsl}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-1 flex flex-col justify-between rounded text-sm bg-white">
			{#each darkColors as color, index}
				<div
					class="p-4 transition hover:scale-105 hover:rounded {index >= 7 ? 'text-white' : 'text-black'}"
					style="background-color: {color.hex};"
				>
					<div class="flex justify-between items-center">
						<div class="flex-1 text-left font-bold">dark{index === 6 ? '' : `-${color.n}`}</div>
						<div class="text-xs text-right">
							<div>{color.hex}</div>
							<div>{color.rgb}</div>
							<div>{color.hsl}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>透明度</h3>
	<p>某些应用场景中，需要使用到主题色的透明度。注意这与上述梯度色板的差异。</p>
	<div class="md:flex justify-between md:space-x-8 space-y-8 md:space-y-0 transparent-background">
		<div class="flex-1 rounded flex flex-col justify-between text-black">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: {rgbaFunc(primaryColors[6].rgb, color)};">
					<div class="flex justify-between items-center text-sm">
						<div class="bg-white py-1 px-2 rounded">primary/{color * 10}</div>
						<div class="bg-white py-1 px-2 rounded text-xs text-right">
							<div>{rgbaFunc(primaryColors[6].rgb, color)}</div>
							<div>{hslaFunc(primaryColors[6].hsl, color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-1 rounded flex flex-col justify-between text-black">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: {rgbaFunc(darkColors[6].rgb, color)};">
					<div class="flex justify-between text-sm items-center">
						<div class="bg-white py-1 px-2 rounded">dark/{color * 10}</div>
						<div class="bg-white py-1 px-2 rounded text-xs text-right">
							<div>{rgbaFunc(darkColors[6].rgb, color)}</div>
							<div>{hslaFunc(darkColors[6].hsl, color)}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<h3>主题黑白色</h3>
	<p>
		通常情况下，设计中应避免大面积使用纯黑色【#000000】，使用接近纯黑的颜色。同时 STDF
		会根据算法计算出两个接近纯黑但是带有主题色的黑色，方便设计搭配。同样也会计算出两个接近纯白但是带有主题色的白色。一般可用于多套主题搭配时的文字颜色，亮暗背景颜色等场景。
	</p>
	<div class="md:flex flex-wrap justify-around md:space-x-4 space-y-4 md:space-y-0">
		{#each [themeBlack.primary, themeBlack.dark, themeWhite.primary, themeWhite.dark] as item, i}
			<div
				class="h-32 p-4 rounded flex flex-col justify-between flex-1 border {i === 0 || i === 1
					? 'text-white border-gray-700'
					: 'text-black border-gray-300'}"
				style="background-color: {item.hex};"
			>
				<div class="font-bold">{i === 0 ? 'primaryBlack' : i === 1 ? 'darkBlack' : i === 2 ? 'primaryWhite' : 'darkWhite'}</div>
				<div class="text-xs">
					<div>{item.hex}</div>
					<div>{item.rgb}</div>
					<div>{item.hsl}</div>
				</div>
			</div>
		{/each}
	</div>

	<h2>功能色</h2>
	<p>功能色是指用于特定场景、特定状态等特殊语义的颜色，通常包含成功、警告、错误、信息四种。当然也都支持类似主题色的透明度写法。</p>
	<div class="md:flex flex-wrap justify-around md:space-x-4 space-y-4 md:space-y-0">
		<div class="h-32 p-4 rounded text-white flex flex-col justify-between flex-1 bg-success">
			<div class="font-bold">success</div>
			<div class="text-xs">
				<div>{stateColor.success}</div>
				<div>{colorConvertFunc(stateColor.success).rgb}</div>
				<div>{colorConvertFunc(stateColor.success).hsl}</div>
			</div>
		</div>
		<div class="h-32 p-4 rounded text-white flex flex-col justify-between flex-1 bg-warning">
			<div class="font-bold">warning</div>
			<div class="text-xs">
				<div>{stateColor.warning}</div>
				<div>{colorConvertFunc(stateColor.warning).rgb}</div>
				<div>{colorConvertFunc(stateColor.warning).hsl}</div>
			</div>
		</div>
		<div class="h-32 p-4 rounded text-white flex flex-col justify-between flex-1 bg-error">
			<div class="font-bold">error</div>
			<div class="text-xs">
				<div>{stateColor.error}</div>
				<div>{colorConvertFunc(stateColor.error).rgb}</div>
				<div>{colorConvertFunc(stateColor.error).hsl}</div>
			</div>
		</div>
		<div class="h-32 p-4 rounded text-white flex flex-col justify-between flex-1 bg-info">
			<div class="font-bold">info</div>
			<div class="text-xs">
				<div>{stateColor.info}</div>
				<div>{colorConvertFunc(stateColor.info).rgb}</div>
				<div>{colorConvertFunc(stateColor.info).hsl}</div>
			</div>
		</div>
	</div>

	<h2>中性色</h2>
	<p>中性色包含一系列带透明度的黑白色和不同程度的灰色，用于配置亮色与暗模式不同背景、文字、分割线等颜色。</p>
	<p class="text-xs">
		注：当下层为纯色时，带透明度的黑白色与灰色可能看起来一样但实际不一样，请注意区分使用。虽然灰色也可以使用透明度，但是需要透明度的地方一般通过黑白色配合透明度值使用。
	</p>
	<div class="md:flex justify-between md:space-x-8 space-y-8 md:space-y-0 text-black">
		<div class="flex-1 flex flex-col justify-between rounded text-sm transparent-background">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5, 10] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: rgba(0, 0, 0, {color / 10});">
					<div class="flex justify-between items-center">
						<div class="text-left bg-white py-1 px-2 rounded">black{color === 10 ? '' : `/${color * 10}`}</div>
						<div class="bg-white py-1 px-2 rounded text-xs">
							<div class="flex-1 text-right">rgba(0, 0, 0, {color / 10})</div>
							<div class="flex-1 text-right">hsla(0, 0%, 0%, {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-1 flex flex-col justify-between rounded text-sm transparent-background">
			{#each [0.5, 1, 2, 2.5, 3, 4, 5, 6, 7, 7.5, 8, 9, 9.5, 10] as color}
				<div class="p-4 transition hover:scale-105 hover:rounded" style="background-color: rgba(255, 255, 255, {color / 10});">
					<div class="flex justify-between items-center">
						<div class="text-left bg-white py-1 px-2 rounded">white{color === 10 ? '' : `/${color * 10}`}</div>
						<div class="bg-white py-1 px-2 rounded text-xs">
							<div class="flex-1 text-right">rgba(255, 255, 255, {color / 10})</div>
							<div class="flex-1 text-right">hsla(0, 100%, 0%, {color / 10})</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-1 flex flex-col justify-between rounded">
			<ColorCard colorList={colorGrayList} />
		</div>
	</div>

	<h2>扩展色</h2>
	<p>
		扩展色是一些区分功能色与主题色的非必需装饰性颜色，主要是在需要多个颜色搭配的界面时使用。统一配置可以使全局搭配颜色更加协调，通过
		Tailwind 配置之后写起来也更加方便。数量不限，使用方式不限，使用规则不限。但请注意使用<strong
			>多主题时，不同主题的扩展色数量应保持一致。</strong
		>STDF 内置主题都提供了三种扩展色，请根据你的实际配色方案搭配。当然也都支持类似主题色的透明度写法。
	</p>
	<p>
		写扩展色类名时使用 extend0、extend1...
		这种方式不方便记忆，推荐使用颜色的别名。别名的命名规则不限，如颜色名称、品牌、情绪、场景、编号、关联事物......皆可。如下面的
		extend0、extend1、extend2 分别对应当前主题【{themes.find(item => item.name === $currentColorStore).name_CN}】的三个扩展色。STDF 提供的<a
			href="#/guide/generator"
			target="_blank"
		>
			主题生成器
		</a>也支持配置别名。
	</p>
	<div class="md:flex flex-wrap justify-around md:space-x-4 space-y-4 md:space-y-0">
		{#each extendList as extend}
			<div class="h-32 p-4 rounded text-white flex flex-col justify-between flex-1" style="background-color: {extend.color};">
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
