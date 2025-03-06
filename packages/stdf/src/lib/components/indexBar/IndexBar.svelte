<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF } from '../utils/index.js';
	import type { IndexBarProps } from '../../types/index.js';

	let {
		data = [],
		current = $bindable(0),
		top = 0,
		height = 100,
		radius = 'middle',
		scrollAlign = true,
		titleInjClass = '',
		textInjClass = '',
		onclickChild
	}: IndexBarProps = $props();

	// 用于绑定 bar 的高度
	// Used to bind the height of the bar
	let barHeight = $state(0);

	// 主体内容高度累计，用于监听滑动
	// The cumulative height of the main content is used to listen to the slide
	let longSumList: number[] = [];

	// 当前滑动的索引
	// Current sliding index
	let currentTouch = $state(-1);

	// 主体内容元素
	// Main body content element
	let bodyDom: HTMLElement | null = $state(null);

	// Bar 外层距离顶部的距离
	// Bar outside the distance from the top
	let barToTop = 0;

	// bar 元素
	// bar element
	let barDom: HTMLDivElement | null = $state(null);

	let isDown = false; //是否按下 is down

	// 每一个的高度
	// Height of each
	let itemHeight = $derived(barHeight / data.length);

	// 圆角风格样式
	// Rounded style style
	const radiusObj = { none: 'rounded-none', middle: 'rounded-sm', full: 'rounded-full' };

	onMount(() => {
		if (bodyDom) {
			bodyDom.scrollTop = 0;
		}
		for (let t = 0; t < data.length + 1; t++) {
			const long = data.slice(0, t).reduce((sum, current) => {
				return sum + (current?.height ?? 0);
			}, 0);
			longSumList.push(long);
		}
		//如果索引内容区域高度不够，中英文报错
		//If the index content area height is not enough, Chinese and English errors
		if (height < barHeight) {
			console.error('[STDF IndexBar error]注意：索引内容区域高度不够。(Note: The height of the index content area is not enough.)');
		}
		barToTop = top + (height - barHeight) / 2;
	});

	//bar区域滑动开始
	//Bar area sliding start
	const touchBoxStart = (e: PointerEvent) => {
		isDown = true;
		const clientY = e.clientY;
		currentTouch = Math.floor((clientY - barToTop) / itemHeight);
		current = Math.floor((clientY - barToTop) / itemHeight);
		if (bodyDom) {
			bodyDom.scrollTop = data.slice(0, current).reduce((sum, current) => {
				return sum + (current?.height ?? 0);
			}, 0);
		}
	};

	// bar 区域滑动中
	// bar area sliding in the middle
	const touchBoxMove = (e: PointerEvent) => {
		if (!isDown) {
			return;
		}
		if (barDom) {
			barDom.setPointerCapture(e.pointerId);
		}
		const clientY = e.clientY;
		currentTouch = Math.floor((clientY - barToTop) / itemHeight);
		current = Math.floor((clientY - barToTop) / itemHeight);
		if (clientY < barToTop) {
			currentTouch = 0;
			current = 0;
		}
		if (clientY > barHeight + barToTop) {
			currentTouch = data.length - 1;
			current = data.length - 1;
		}
		if (bodyDom) {
			bodyDom.scrollTop = data.slice(0, current).reduce((sum, current) => {
				return sum + (current?.height ?? 0);
			}, 0);
		}
	};

	// bar 区域滑动结束
	// bar area sliding end
	const touchBoxEnd = () => {
		currentTouch = -1;
		isDown = false;
	};

	//监听主体内容滚动
	//Listen to the main content scroll
	const scrollBody = () => {
		if (!bodyDom) {
			return;
		}
		const scrollTop = bodyDom.scrollTop + top;
		for (let w = 0; w < longSumList.length; w++) {
			if (scrollTop - top >= longSumList[w] && scrollTop - top < longSumList[w + 1]) {
				current = w;
			}
		}
	};
</script>

<div bind:this={bodyDom} class="overflow-y-auto {scrollAlign && 'snap-y'}" onscroll={scrollBody} style="height:{height}px;">
	{#each data as group, index}
		<div class="snap-start px-4 pt-8" bind:clientHeight={group.height}>
			<div class="text-primary dark:text-dark text-sm {titleInjClass}">{group.title}</div>
			{#each group.child as child, childIndex}
				<button class="w-full py-2 text-left {textInjClass}" onclick={() => onclickChild && onclickChild(index, group, childIndex, child)}>
					{child}
				</button>
				<div class="h-px bg-black/5 dark:bg-white/5"></div>
			{/each}
		</div>
	{/each}
</div>
<div
	onpointerdown={touchBoxStart}
	onpointermove={(e) => throttleWithRAF(touchBoxMove)(e)}
	onpointerup={touchBoxEnd}
	bind:clientHeight={barHeight}
	bind:this={barDom}
	class="fixed right-5 flex w-7 cursor-move touch-none select-none flex-col justify-around bg-black/5 p-1 dark:bg-white/5 {radiusObj[
		radius
	] || radiusObj.middle}"
	style="top:{top + (height - barHeight) / 2}px;min-height:{height / 4}px;"
>
	{#each data as group, i}
		<div class="relative flex flex-1 flex-col justify-center">
			<div
				class="h-5 w-5 text-center text-xs leading-5 transition-all {current === i
					? 'bg-primary dark:bg-dark text-white dark:text-black'
					: 'text-gray-600 dark:text-gray-400'} {radiusObj[radius] || radiusObj.middle}"
			>
				{group.index}
			</div>
			{#if currentTouch === i}
				<div
					class="border-primary text-primary dark:border-dark dark:text-dark absolute -left-24 top-1/2 h-14 w-14 -translate-y-2/4 border text-center text-3xl leading-[3.5rem] {radiusObj[
						radius
					] || radiusObj.middle}"
					transition:fly={{ x: 38, duration: 300 }}
				>
					{group.index}
				</div>
			{/if}
		</div>
	{/each}
</div>
