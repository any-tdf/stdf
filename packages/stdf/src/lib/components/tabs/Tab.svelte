<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { TabProps } from '../../types/index.js';

	let {
		labels = [],
		active = $bindable(0),
		lineType = false,
		radius = 'sm',
		duration = 'base',
		layout = 'h',
		love = false,
		injClass = '',
		tabInjClass = '',
		activeTabInjClass = '',
		activeInjClass = '',
		mx = '2',
		overflow = false,
		showNum = 3,
		autoScroll = true,
		onclickTab
	}: TabProps = $props();

	const radiusObj = { none: 'rounded-none', sm: 'rounded-sm', xl: 'rounded-xl', full: 'rounded-full' };
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
		'20': 'mx-20'
	};

	const clickTabFun = (i: number) => {
		active = i;
		onclickTab?.(i);
	};
	let tabW = $state(0);
	let tabH = $state(0);
	let activeW = $derived(layout === 'h' ? (tabW - 4) / labels.length : tabW - 4);
	let activeH = $derived(layout === 'h' ? tabH - 4 : (tabH - 4) / labels.length);
	let activeLeft = $derived(layout === 'h' ? 2 + active * ((tabW - 4) / labels.length) : 2);
	let activeTop = $derived(layout === 'h' ? (lineType ? tabH - 2 : 2) : 2 + active * ((tabH - 4) / labels.length));

	// 溢出模式下的变量
	// variables in overflow mode
	let ofTabW = $state(0);
	let ofTabH = $state(0);
	let itemW = $derived((ofTabW - 4) / (showNum + 0.5));
	let ofActiveW = $derived((ofTabW - 4) / (showNum + 0.5));
	let ofActiveH = $derived(ofTabH - 4);
	let ofActiveLeft = $derived(2 + active * ((ofTabW - 4) / (showNum + 0.5)));

	let ofDom = $state<HTMLDivElement | null>(null);
	let showIndexs = $state(new Array(showNum + 1).fill(0).map((item, index) => index));
	// 监听 active 变化，当 active 变化时，如果 active 不在可视区域内，则滚动 ofDom，使 active 显示在中间
	// listen to the change of active, when active changes, if active is not in the visible area, scroll ofDom to make active display in the middle
	$effect(() => {
		if (ofDom && active !== undefined && autoScroll) {
			// 如果 active >= showIndexs 的最后一个元素或 <= showIndexs 的第一个元素，则滚动 ofDom，滚动至 active*itemW
			// If active >= the last element of showIndexs or <= the first element of showIndexs, scroll ofDom to active*itemW
			if (active >= showIndexs[showIndexs.length - 1] || active <= showIndexs[0]) {
				ofDom.scrollLeft = (active - 1) * itemW;
				showIndexs = new Array(showNum + 1).fill(0).map((item, index) => index + active - 1);
			}
		}
	});
</script>

{#if overflow && layout === 'h'}
	<div
		bind:clientWidth={ofTabW}
		bind:clientHeight={ofTabH}
		bind:this={ofDom}
		class="{lineType ? '' : 'bg-black/5 dark:bg-white/10'} no-scrollbar relative overflow-auto scroll-smooth p-0.5 {radiusObj[radius] ||
			radiusObj.sm} {mxClass[mx] || mxClass['2']} {injClass}"
	>
		{#if lineType}
			<div class="absolute bottom-0 h-0.5 w-full bg-black/5 dark:bg-white/5" style="width: {itemW * labels.length}px"></div>
		{/if}
		<div
			class="{lineType ? '' : 'dark:shadow-xs shadow-sm dark:shadow-white/10'} absolute transition-all {durationObj[duration] ||
				durationObj.base} {radiusObj[radius] || radiusObj.sm} {lineType
				? 'bg-primary dark:bg-dark bottom-0'
				: 'bg-white dark:bg-gray-950'} {activeInjClass}"
			style="width: {ofActiveW}px;height: {lineType ? 2 : ofActiveH}px;left: {ofActiveLeft}px;"
		></div>
		<div class="relative flex whitespace-nowrap" style="width: {itemW * labels.length + 2}px;">
			{#each labels as label, i}
				<button
					class="flex shrink-0 justify-center overflow-hidden py-1 font-medium {love ? 'text-lg' : 'text-sm'} leading-6 {radiusObj[
						radius
					] || radiusObj.sm} {tabInjClass} {i === active ? activeTabInjClass : ''}"
					style="width: {itemW}px"
					onclick={() => clickTabFun(i)}
				>
					{#if label.icon}
						<div class="mr-0.5 {durationObj[duration] || durationObj.base}">
							<Icon {...label.icon} />
						</div>
					{/if}
					{#if label.text}
						<div class="transition-all {durationObj[duration] || durationObj.base}">{label.text}</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{:else}
	<div
		bind:clientWidth={tabW}
		bind:clientHeight={tabH}
		class="{lineType && layout !== 'v' ? '' : 'bg-black/5 dark:bg-white/10'} relative p-0.5 {radiusObj[radius] || radiusObj.sm} {mxClass[
			mx
		] || mxClass['2']} {injClass}"
	>
		{#if lineType && layout !== 'v'}
			<div class="absolute bottom-0 h-0.5 w-full bg-black/5 dark:bg-white/5" style="width: {tabW - 4}px"></div>
		{/if}
		<div
			class="{lineType && layout !== 'v' ? '' : 'dark:shadow-xs shadow-sm dark:shadow-white/10'} absolute transition-all {durationObj[
				duration
			] || durationObj.base} {radiusObj[radius] || radiusObj.sm} {lineType && layout !== 'v'
				? 'bg-primary dark:bg-dark bottom-0'
				: 'bg-white dark:bg-gray-950'} {activeInjClass}"
			style="width: {activeW}px;height: {lineType && layout !== 'v' ? 2 : activeH}px;left: {activeLeft}px;top: {activeTop}px"
		></div>
		<div class="relative {layout === 'h' ? 'flex justify-between' : 'whitespace-nowrap px-4'}">
			{#each labels as label, i}
				<button
					class="flex flex-1 justify-center {layout === 'h' ? 'py-1' : 'py-2'} overflow-hidden font-medium {love
						? 'text-lg'
						: 'text-sm'} leading-6 {radiusObj[radius] || radiusObj.sm} {tabInjClass} {i === active ? activeTabInjClass : ''}"
					onclick={() => clickTabFun(i)}
				>
					{#if label.icon}
						<div class="mr-0.5 {durationObj[duration] || durationObj.base}">
							<Icon {...label.icon} />
						</div>
					{/if}
					{#if label.text}
						<div class="transition-all {durationObj[duration] || durationObj.base}">{label.text}</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
