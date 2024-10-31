<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} [data] - Data
	 * @property {number} [showRow] - Visible rows
	 * @property {number} [initIndex] - Default selected item index
	 * @property {string} [labelKey] - The key corresponding to label in data
	 * @property {boolean} [autoScrollToLast] - Whether to automatically scroll to the last selected item
	 * @property {boolean} [useAnimation] - Whether to use animation when automatically scrolling to the selected item (initIndex)
	 * @property {number} [lastSelectedIndex] - Last selected item index
	 * @property {'center' | 'left' | 'right'} [align] - Alignment
	 * @property {(index: number, isTouch: boolean) => void} [onscrollEnd] - Callback function when scrolling ends
	 */
	/** @type {Props} */
	let {
		data = [],
		showRow = 5,
		initIndex = 0,
		labelKey = 'label',
		autoScrollToLast = true,
		useAnimation = true,
		lastSelectedIndex = 0,
		align = 'center',
		onscrollEnd,
	} = $props();

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
	const emptyObj = {};
	emptyObj[labelKey] = '';
	const newData =
		showRowsInner === 3
			? [...[emptyObj], ...data, ...[emptyObj]]
			: showRowsInner === 5
				? [...[emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj]]
				: [...[emptyObj, emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj, emptyObj]];

	// 滚动元素
	// Scroll element
	let scrollElement = $state(null);

	// 当前选中项索引
	// Current selected item index
	let currentIndex = 0;
	onMount(() => {
		if (scrollElement) {
			// 监听 scrollElement 的滚动事件，同时考虑节流，滚动结束时，计算当前最中间的元素的索引
			// Listen to the scroll event of scrollElement, and consider throttling at the same time. The index of the element in the middle is calculated when the scroll ends
			let scrollTimer = null;
			scrollElement.addEventListener('scroll', e => {
				clearTimeout(scrollTimer);
				scrollTimer = setTimeout(() => {
					const scrollTop = e.target.scrollTop;
					currentIndex = Math.round(scrollTop / (itemHeight * 16));
					onscrollEnd && onscrollEnd(currentIndex, isTouch);
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

<div class="overflow-auto relative picker-contents" style="height:{itemHeight * showRowsInner}rem;">
	<div
		class={`overflow-auto snap-y picker-contents ${useAnimation ? 'scroll-smooth' : 'scroll-auto'}`}
		style="height:{itemHeight * showRowsInner}rem;"
		bind:this={scrollElement}
		onscroll={() => {
			isTouch = true;
		}}
	>
		{#each newData as item}
			<div
				class={`${alignClass[align] || alignClass.center} px-2 flex flex-col justify-center snap-center`}
				style="height:{itemHeight}rem;"
			>
				<div class="truncate">{item[labelKey]}</div>
			</div>
		{/each}
		<div
			class="absolute inset-0 w-full pointer-events-none border-b border-t border-white dark:border-black"
			style="height:{itemHeight * showRowsInner}rem"
		>
			<div
				class="bg-gradient-to-b from-white to-white/60 dark:from-black dark:to-black/60 border-b border-black/10 dark:border-white/20"
				style="height:{itemHeight * ((showRowsInner - 1) / 2)}rem;"
			></div>
			<div style="height:{itemHeight}rem;"></div>
			<div
				class="bg-gradient-to-t from-white to-white/60 dark:from-black dark:to-black/60 border-t border-black/10 dark:border-white/20"
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
