<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { debounce } from '../utils';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	//数据
	//Data
	export let data = [];

	//当前页码
	//Current page
	export let current = 0;

	//索引内容区域距离文档顶部的距离
	//The distance from the top of the document to the index content area
	export let top = 0;

	//索引内容区域高度
	//Index content area height
	export let height = 100;

	//圆角风格
	//Rounded style
	export let radius = 'base';

	//是否滚动对齐
	//Whether to scroll align
	export let scrollAlign = true;

	// 索引组标题注入 CSS
	// Index group title injection CSS
	export let titleInjClass = '';

	// 索引项文本注入 CSS
	// Index item text injection CSS
	export let textInjClass = '';

	// 用于绑定bar的高度
	// Used to bind the height of the bar
	let barHeight = 0;

	// 主体内容高度累计，用于监听滑动
	// The cumulative height of the main content is used to listen to the slide
	let longSumList = [];

	// 当前滑动的索引
	// Current sliding index
	let currentTouch = -1;

	// 主体内容元素
	// Main body content element
	let bodyDom = null;

	// Bar外层距离顶部的距离
	// Bar outside the distance from the top
	let barToTop = 0;

	// bar元素
	// bar element
	let barDom = null;

	let isDown = false; //是否按下 is down

	// 每一个的高度
	// Height of each
	$: itemHeight = barHeight / data.length;

	// 圆角风格样式
	// Rounded style style
	const radiusObj = {
		none: 'rounded-none',
		base: 'rounded',
		full: 'rounded-full',
	};

	onMount(() => {
		bodyDom.scrollTop = 0;
		for (let t = 0; t < data.length + 1; t++) {
			const long = data.slice(0, t).reduce((sum, current) => {
				return sum + current.height;
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
	const touchBoxStart = e => {
		isDown = true;
		const clientY = e.clientY;
		currentTouch = Math.floor((clientY - barToTop) / itemHeight);
		current = Math.floor((clientY - barToTop) / itemHeight);
		bodyDom.scrollTop = data.slice(0, current).reduce((sum, current) => {
			return sum + current.height;
		}, 0);
	};

	// bar区域滑动中
	// bar area sliding in the middle
	const touchBoxMove = e => {
		if (!isDown) {
			return;
		}
		barDom.setPointerCapture(e.pointerId);
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
		bodyDom.scrollTop = data.slice(0, current).reduce((sum, current) => {
			return sum + current.height;
		}, 0);
	};

	// bar区域滑动结束
	// bar area sliding end
	const touchBoxEnd = () => {
		currentTouch = -1;
		isDown = false;
	};

	//监听主体内容滚动
	//Listen to the main content scroll
	const scrollBody = () => {
		const scrollTop = bodyDom.scrollTop + top;
		for (let w = 0; w < longSumList.length; w++) {
			if (scrollTop - top >= longSumList[w] && scrollTop - top < longSumList[w + 1]) {
				current = w;
			}
		}
	};

	// 点击主体内容区域
	// Click on the main body content area
	const chickChildFun = (index, group, childIndex, child) => {
		// 派发点击事件，向外传递出四个参数。 1. index：点击项的父级组索引值；2. group：点击项的父级组内容；3. childIndex：点击项索引值；4. child：点击项内容。
		// Dispatch click events to pass four parameters out. 1. index: the parent group index value of the clicked item; 2. group: the parent group content of the clicked item; 3. childIndex: the index value of the clicked item; 4. child: the content of the clicked item.
		dispatch('clickchild', { index, group, childIndex, child });
	};
</script>

<div bind:this={bodyDom} class={`overflow-y-auto ${scrollAlign && 'snap-y'}`} on:scroll={scrollBody} style="height:{height}px;">
	{#each data as group, index}
		<div class="px-4 pt-8 snap-start" bind:clientHeight={group.height}>
			<div class={`text-primary dark:text-dark text-sm ${titleInjClass}`}>{group.title}</div>
			{#each group.child as child, childIndex}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={`py-2 ${textInjClass}`} on:click={() => chickChildFun(index, group, childIndex, child)}>
					{child.text}
				</div>
				<div class="h-px bg-black/5 dark:bg-white/5" />
			{/each}
		</div>
	{/each}
</div>
<div
	on:pointerdown={touchBoxStart}
	on:pointermove={debounce(touchBoxMove, 5)}
	on:pointerup={debounce(touchBoxEnd, 15)}
	bind:clientHeight={barHeight}
	bind:this={barDom}
	class={`fixed right-5 bg-black/5 dark:bg-white/5 w-7 p-1 flex flex-col justify-around touch-none cursor-move select-none ${
		radiusObj[radius] || radiusObj.base
	}`}
	style="top:{top + (height - barHeight) / 2}px;min-height:{height / 4}px;"
>
	{#each data as group, i}
		<div class={`flex-1 relative flex flex-col justify-center`}>
			<div
				class={`w-5 h-5 leading-5 text-center text-xs transition-all ${
					current === i ? 'bg-primary dark:bg-dark text-white dark:text-gray1' : 'text-gray5 dark:text-gray7'
				} ${radiusObj[radius] || radiusObj.base}`}
			>
				{group.index}
			</div>
			{#if currentTouch === i}
				<div
					class={`absolute text-center -left-24 top-1/2 -translate-y-2/4 text-3xl border border-primary dark:border-dark w-14 h-14 leading-[3.5rem] text-primary dark:text-dark ${
						radiusObj[radius] || radiusObj.base
					}`}
					transition:fly={{ x: 38, duration: 300 }}
				>
					{group.index}
				</div>
			{/if}
		</div>
	{/each}
</div>
