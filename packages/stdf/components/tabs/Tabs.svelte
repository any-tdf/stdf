<script>
	import Tab from './Tab.svelte';

	/** @typedef {import('../../index.d.ts').Tabs} TabsProps */
	/** @type {TabsProps} */
	let { tab = {}, duration = 'base', position = 't', transition = true, active = $bindable(0), onchange, children } = $props();

	const clickTabFun = e => {
		active = e.detail;
		// Tab 点击时派发 Tabs的change事件，active表示激活的Tab索引值，即labels索引值
		// Click Tab to dispatch the change event of Tabs, active represents the index value of the activated Tab, that is, the index value of labels
		onchange && onchange(active);
	};
	let width = $state(window.innerWidth);

	const durationObj = { fast: 'duration-150', base: 'duration-300', slow: 'duration-500', slower: 'duration-1000' };
</script>

{#if transition}
	{#if position === 't'}
		<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class="transition-all relative flex {durationObj[duration] || durationObj.base}"
				style="width: {tab.labels.length * width}px;left: -{active * width}px"
			>
				{#if children}{@render children()}{/if}
			</div>
		</div>
	{:else if position === 'b'}
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class="transition-all relative flex {durationObj[duration] || durationObj.base}"
				style="width:{tab.labels.length * width}px;left:-{active * width}px"
			>
				{#if children}{@render children()}{/if}
			</div>
		</div>
		<Tab {active} {...tab} onclickTab={clickTabFun} />
	{:else if position === 'l'}
		<div class="flex">
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
			<div class="grow">
				{#if children}{@render children()}{/if}
			</div>
		</div>
	{:else if position === 'r'}
		<div class="flex">
			<div class="grow">
				{#if children}{@render children()}{/if}
			</div>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
		</div>
	{:else}
		<div>position params error!</div>
	{/if}
{:else if position === 't'}
	<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
	{#if children}{@render children()}{/if}
{:else if position === 'b'}
	{#if children}{@render children()}{/if}
	<Tab {active} {...tab} onclickTab={clickTabFun} />
{:else if position === 'l'}
	<div class="flex">
		<div>
			<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
		</div>
		<div class="grow">
			{#if children}{@render children()}{/if}
		</div>
	</div>
{:else if position === 'r'}
	<div class="flex">
		<div class="grow">
			{#if children}{@render children()}{/if}
		</div>
		<div>
			<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
		</div>
	</div>
{:else}
	<div>position params error!</div>
{/if}
