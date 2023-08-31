<script>
	import { createEventDispatcher } from 'svelte';
	import Tab from './Tab.svelte';

	export let tab = {}; //数据
	export let duration = 'base'; //过渡时间fast/base/slow/slower/slowest
	export let placement = 't'; //选项卡Tab位置t/b/l/r
	export let transition = true; //是否使用过渡动画
	export let active = 0; //当前选中的选项卡索引

	const dispatch = createEventDispatcher(); //事件派发器

	const clickTabFun = e => {
		active = e.detail;
		dispatch('change', active); //Tab点击时派发Tabs的change事件，active表示激活的Tab索引值，即labels索引值
	};
	let width = 0; //宽度

	const durationObj = {
		fast: 'duration-150',
		base: 'duration-300',
		slow: 'duration-500',
		slower: 'duration-1000',
	};
</script>

{#if transition}
	{#if placement === 't'}
		<Tab {active} {duration} {...tab} on:clicktab={clickTabFun} />
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class={`transition-all relative flex ${durationObj[duration] || durationObj.base}`}
				style="width:{tab.labels.length * width}px;left:-{active * width}px"
			>
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
	{:else if placement === 'b'}
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class={`transition-all relative flex ${durationObj[duration] || durationObj.base}`}
				style="width:{tab.labels.length * width}px;left:-{active * width}px"
			>
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
		<Tab {active} {...tab} on:clicktab={clickTabFun} />
	{:else if placement === 'l'}
		<div class="flex">
			<div>
				<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
			</div>
			<div class="grow">
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
	{:else if placement === 'r'}
		<div class="flex">
			<div class="grow">
				<slot {active}>暂无 Tabs content！</slot>
			</div>
			<div>
				<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
			</div>
		</div>
	{:else}
		<div>placement 参数错误！</div>
	{/if}
{:else if placement === 't'}
	<Tab {active} {duration} {...tab} on:clicktab={clickTabFun} />
	<slot {active}>暂无 Tabs content！</slot>
{:else if placement === 'b'}
	<slot {active}>暂无 Tabs content！</slot>
	<Tab {active} {...tab} on:clicktab={clickTabFun} />
{:else if placement === 'l'}
	<div class="flex">
		<div>
			<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
		</div>
		<div class="grow">
			<slot {active}>暂无 Tabs content！</slot>
		</div>
	</div>
{:else if placement === 'r'}
	<div class="flex">
		<div class="grow">
			<slot {active}>暂无 Tabs content！</slot>
		</div>
		<div>
			<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
		</div>
	</div>
{:else}
	<div>placement 参数错误！</div>
{/if}
