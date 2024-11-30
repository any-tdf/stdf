<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		data?: Record<string, string>[];
		showRow?: 3 | 5 | 7;
		initIndex?: number;
		labelKey?: string;
		autoScrollToLast?: boolean;
		useAnimation?: boolean;
		lastSelectedIndex?: number;
		align?: 'center' | 'left' | 'right';
		onscrollEnd?: (index: number, isTouch: boolean) => void;
	};
	let {
		data = [],
		showRow = 5,
		initIndex = 0,
		labelKey = 'label',
		autoScrollToLast = true,
		useAnimation = true,
		lastSelectedIndex = 0,
		align = 'center',
		onscrollEnd
	}: Props = $props();

	// 是否触摸
	// Whether to touch
	let isTouch = $state(false);

	// 对齐方式样式
	// Alignment style
	const alignClass = { center: 'text-center', left: 'text-left', right: 'text-right' };

	// 单条高度对象
	// Single height object
	const itemHeightObj = { '3': 4, '5': 3, '7': 2 };

	// 实际显示行数
	// Actual number of rows displayed
	const showRowsInner = showRow === 3 || showRow === 5 || showRow === 7 ? showRow : 5;

	// 单条高度
	// Single height
	const itemHeight = itemHeightObj[showRowsInner];

	// 定义空对象 emptyObj，当 showRowsInner 为 3 时，newData 前后各补足一条 emptyObj，当 showRowsInner 为 5 时，newData 前后各补足两条 emptyObj，当 showRowsInner 为 7 时，newData 前后各补足三条 emptyObj
	// Define empty object emptyObj, when showRowsInner is 3, newData is supplemented with one emptyObj at the front and back, when showRowsInner is 5, newData is supplemented with two emptyObj at the front and back, when showRowsInner is 7, newData is supplemented with three emptyObj at the front and back
	const emptyObj: Record<string, string> = {};
	emptyObj[labelKey] = '';
	const newData =
		showRowsInner === 3
			? [...[emptyObj], ...data, ...[emptyObj]]
			: showRowsInner === 5
				? [...[emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj]]
				: [...[emptyObj, emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj, emptyObj]];

	// 滚动元素
	// Scroll element
	let scrollElement = $state<HTMLDivElement | null>(null);

	// 当前选中项索引
	// Current selected item index
	let currentIndex = 0;
	onMount(() => {
		if (scrollElement) {
			// 监听 scrollElement 的滚动事件，同时考虑节流，滚动结束时，计算当前最中间的元素的索引
			// Listen to the scroll event of scrollElement, and consider throttling at the same time. The index of the element in the middle is calculated when the scroll ends
			let scrollTimer: ReturnType<typeof setTimeout>;
			scrollElement.addEventListener('scroll', (e: Event) => {
				if (scrollTimer) clearTimeout(scrollTimer);
				scrollTimer = setTimeout(() => {
					const scrollTop = (e.target as HTMLElement)?.scrollTop;
					currentIndex = Math.round(scrollTop / (itemHeight * 16));
					onscrollEnd?.(currentIndex, isTouch);
				});
			});
		}
	});
	$effect(() => {
		if (scrollElement) {
			if (autoScrollToLast) {
				scrollElement.scrollTop = lastSelectedIndex * itemHeight * 16;
			} else {
				scrollElement.scrollTop = initIndex * itemHeight * 16;
			}
		}
	});
</script>

<div class="picker-contents relative overflow-auto" style="height:{itemHeight * showRowsInner}rem;">
	<div
		class="picker-contents snap-y overflow-auto {useAnimation ? 'scroll-smooth' : 'scroll-auto'}"
		style="height:{itemHeight * showRowsInner}rem;"
		bind:this={scrollElement}
		onscroll={() => {
			isTouch = true;
		}}
	>
		{#each newData as item}
			<div class="{alignClass[align] || alignClass.center} flex snap-center flex-col justify-center px-2" style="height:{itemHeight}rem;">
				<div class="truncate">{item[labelKey]}</div>
			</div>
		{/each}
		<div
			class="pointer-events-none absolute inset-0 w-full border-b border-t border-white dark:border-black"
			style="height:{itemHeight * showRowsInner}rem"
		>
			<div
				class="border-b border-black/10 bg-gradient-to-b from-white to-white/60 dark:border-white/20 dark:from-black dark:to-black/60"
				style="height:{itemHeight * ((showRowsInner - 1) / 2)}rem;"
			></div>
			<div style="height:{itemHeight}rem;"></div>
			<div
				class="border-t border-black/10 bg-gradient-to-t from-white to-white/60 dark:border-white/20 dark:from-black dark:to-black/60"
				style="height:{itemHeight * ((showRowsInner - 1) / 2)}rem;"
			></div>
		</div>
	</div>
</div>

<style>
	.picker-contents::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
