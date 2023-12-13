<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	/**
	 * 选项卡
	 * label
	 * @typedef {Object} Label
	 * @property {string} [text] - 选项卡文字
	 * @property {Object} [icon] - 选项卡图标
	 */

	/**
	 * 选项卡组
	 * label group
	 * @type {Label[]}
	 * @default []
	 */
	export let labels = [];

	/**
	 * 当前选中的选项卡索引
	 * index of active tab
	 * @type {number}
	 * @range 0 - labels.length - 1
	 * @default 0
	 */
	export let active = 0;

	/**
	 * 是否使用线性风格，layout 为 v 时失效
	 * whether to use linear style, invalid when layout is v
	 * @type {boolean}
	 * @default false
	 */
	export let lineType = false;

	/**
	 * 圆角风格
	 * radius style
	 * @type {'none'|'base'|'xl'|'full'}
	 * @default 'base'
	 */
	export let radius = 'base';

	/**
	 * 过渡时间
	 * transition time
	 * @type {'fast'|'base'|'slow'|'slower'}
	 * @default 'base'
	 */
	export let duration = 'base';

	/**
	 * 布局，h/v，对应 tabs 的 position
	 * layout, h/v, corresponding to position of tabs
	 * @type {'h'|'v'}
	 * @default 'h'
	 */
	export let layout = 'h';

	/**
	 * 是否开启关爱版
	 * whether to open love version
	 * @type {boolean}
	 * @default false
	 */
	export let love = false;

	/**
	 * Tab 最外层注入 CSS
	 * Tab outermost layer injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	/**
	 * Tab 注入 CSS
	 * Tab injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let tabInjClass = '';

	/**
	 * 选中 tab 注入 CSS
	 * selected tab injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let activeTabInjClass = '';

	/**
	 * 指示器注入 CSS
	 * indicator injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let activeInjClass = '';

	/**
	 * 左右间距
	 * left and right spacing
	 * @type {'0'|'1'|'2'|'3'|'4'|'6'|'8'|'12'|'16'|'20'}
	 * @default '2'
	 */
	export let mx = '2';

	/**
	 * 溢出模式
	 * overflow mode
	 * @type {Boolean}
	 * @default false
	 */
	export let overflow = false;

	/**
	 * 完整显示 Tab 数
	 * number of completely visible tabs
	 * @type {number}
	 * @default 3
	 */
	export let showNum = 3;

	/**
	 * 溢出模式是否开启自动滚动
	 * whether to open automatic scrolling in overflow mode
	 * @type {Boolean}
	 * @default true
	 */
	export let autoScroll = true;

	const radiusObj = { none: 'rounded-none', base: 'rounded', xl: 'rounded-xl', full: 'rounded-full' };
	const durationObj = { fast: 'duration-150', base: 'duration-300', slow: 'duration-500', slower: 'duration-1000' };
	const mxClass = {
		'0': 'mx-0',
		'1': 'mx-1',
		'2': 'mx-2',
		'3': 'mx-3',
		'4': 'mx-4',
		'6': 'mx-6',
		'8': 'mx-8',
		'12': 'mx-12',
		'16': 'mx-16',
		'20': 'mx-20',
	};
	const dispatch = createEventDispatcher(); //事件派发器  event dispatcher

	const clickTabFun = i => {
		active = i;
		//派发Tab点击事件，i表示点击的Tab索引值，即labels索引值
		// dispatch Tab click event,i represents the index value of the clicked Tab, that is, the index value of labels
		dispatch('clicktab', i);
	};
	let tabW = 0;
	let tabH = 0;
	$: activeW = layout === 'h' ? (tabW - 4) / labels.length : tabW - 4;
	$: activeH = layout === 'h' ? tabH - 4 : (tabH - 4) / labels.length;
	$: activeLeft = layout === 'h' ? 2 + active * ((tabW - 4) / labels.length) : 2;
	$: activeTop = layout === 'h' ? (lineType ? tabH - 2 : 2) : 2 + active * ((tabH - 4) / labels.length);

	// 溢出模式下的变量
	// variables in overflow mode
	let ofTabW = 0;
	let ofTabH = 0;
	$: itemW = (ofTabW - 4) / (showNum + 0.5);
	$: ofActiveW = (ofTabW - 4) / (showNum + 0.5);
	$: ofActiveH = ofTabH - 4;
	$: ofActiveLeft = 2 + active * ((ofTabW - 4) / (showNum + 0.5));

	let ofDom = null;
	let showIndexs = new Array(showNum + 1).fill(0).map((item, index) => index);
	// 监听 active 变化，当 active 变化时，如果 active 不在可视区域内，则滚动 ofDom，使 active 显示在中间
	// listen to the change of active, when active changes, if active is not in the visible area, scroll ofDom to make active display in the middle
	$: if (ofDom && active !== undefined && autoScroll) {
		// 如果 active >= showIndexs 的最后一个元素或 <= showIndexs 的第一个元素 ，则滚动 ofDom，滚动至 active*itemW
		// If active >= the last element of showIndexs or <= the first element of showIndexs, scroll ofDom to active*itemW
		if (active >= showIndexs[showIndexs.length - 1] || active <= showIndexs[0]) {
			ofDom.scrollLeft = (active - 1) * itemW;
			showIndexs = new Array(showNum + 1).fill(0).map((item, index) => index + active - 1);
		}
	}
</script>

{#if overflow && layout === 'h'}
	<div
		bind:clientWidth={ofTabW}
		bind:clientHeight={ofTabH}
		bind:this={ofDom}
		class="{lineType ? '' : 'bg-black/5 dark:bg-white/10'} p-0.5 relative overflow-auto scroll-smooth no-scrollbar {radiusObj[radius] ||
			radiusObj.base} {mxClass[mx] || mxClass['2']} {injClass}"
	>
		{#if lineType}
			<div class="absolute h-0.5 bg-black/5 dark:bg-white/5 w-full bottom-0" style="width: {itemW * labels.length}px" />
		{/if}
		<div
			class="{lineType ? '' : 'shadow dark:shadow-sm dark:shadow-white/10'} absolute transition-all {durationObj[duration] ||
				durationObj.base} {radiusObj[radius] || radiusObj.base} {lineType
				? 'bottom-0 bg-primary dark:bg-dark'
				: 'bg-white dark:bg-gray-950'} {activeInjClass}"
			style="width: {ofActiveW}px;height: {lineType ? 2 : ofActiveH}px;left: {ofActiveLeft}px;"
		/>
		<div class="relative flex whitespace-nowrap" style="width: {itemW * labels.length + 2}px;">
			{#each labels as label, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="shrink-0 cursor-pointer flex justify-center py-1 font-medium overflow-hidden {love
						? 'text-lg'
						: 'text-sm'} leading-6 {radiusObj[radius] || radiusObj.base} {tabInjClass} {i === active ? activeTabInjClass : ''}"
					style="width: {itemW}px"
					on:click={() => clickTabFun(i)}
				>
					{#if label.icon}
						<div class="mr-0.5 {durationObj[duration] || durationObj.base}">
							<Icon {...label.icon} />
						</div>
					{/if}
					{#if label.text}
						<div class="transition-all {durationObj[duration] || durationObj.base}">{label.text}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div
		bind:clientWidth={tabW}
		bind:clientHeight={tabH}
		class="{lineType && layout !== 'v' ? '' : 'bg-black/5 dark:bg-white/10'} p-0.5 relative {radiusObj[radius] || radiusObj.base} {mxClass[
			mx
		] || mxClass['2']} {injClass}"
	>
		{#if lineType && layout !== 'v'}
			<div class="absolute h-0.5 bg-black/5 dark:bg-white/5 w-full bottom-0" style="width: {tabW - 4}px" />
		{/if}
		<div
			class="{lineType && layout !== 'v' ? '' : 'shadow dark:shadow-sm dark:shadow-white/10'} absolute transition-all {durationObj[
				duration
			] || durationObj.base} {radiusObj[radius] || radiusObj.base} {lineType && layout !== 'v'
				? 'bottom-0 bg-primary dark:bg-dark'
				: 'bg-white dark:bg-gray-950'} {activeInjClass}"
			style="width: {activeW}px;height: {lineType && layout !== 'v' ? 2 : activeH}px;left: {activeLeft}px;top: {activeTop}px"
		/>
		<div class="relative {layout === 'h' ? 'flex justify-between' : 'px-4 whitespace-nowrap'}">
			{#each labels as label, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="cursor-pointer flex-1 flex justify-center {layout === 'h' ? 'py-1' : 'py-2'} font-medium overflow-hidden {love
						? 'text-lg'
						: 'text-sm'} leading-6 {radiusObj[radius] || radiusObj.base} {tabInjClass} {i === active ? activeTabInjClass : ''}"
					on:click={() => clickTabFun(i)}
				>
					{#if label.icon}
						<div class="mr-0.5 {durationObj[duration] || durationObj.base}">
							<Icon {...label.icon} />
						</div>
					{/if}
					{#if label.text}
						<div class="transition-all {durationObj[duration] || durationObj.base}">{label.text}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
