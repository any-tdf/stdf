<script>
	import Tab from './Tab.svelte';

	/** @typedef {import('../../index.d.ts').Tabs} TabsProps */
	/** @type {TabsProps} */
	let { tab = {}, duration = 'base', position = 't', active = $bindable(0), transition = true, onchange, children } = $props();
	const clickTabFun = a => {
		active = a;
		onchange && onchange(a);
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
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
	{/if}
	{#if position === 'b'}
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class="transition-all relative flex {durationObj[duration] || durationObj.base}"
				style="width:{tab.labels.length * width}px;left: -{active * width}px"
			>
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
		<Tab {active} {...tab} onclickTab={clickTabFun} />
	{/if}
	{#if position === 'l'}
		<div class="flex">
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
			<div class="grow">
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
	{/if}
	{#if position === 'r'}
		<div class="flex">
			<div class="grow">
				{#if children}{@render children({ active })}{/if}
			</div>
			<div>
				<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
			</div>
		</div>
	{/if}
{/if}
{#if position === 't'}
	<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
	{#if children}{@render children({ active })}{/if}
{/if}
{#if position === 'b'}
	{#if children}{@render children({ active })}{/if}
	<Tab {active} {...tab} onclickTab={clickTabFun} />
{/if}
{#if position === 'l'}
	<div class="flex">
		<div>
			<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
		</div>
		<div class="grow">
			{#if children}{@render children({ active })}{/if}
		</div>
	</div>
{/if}
{#if position === 'r'}
	<div class="flex">
		<div class="grow">
			{#if children}{@render children({ active })}{/if}
		</div>
		<div>
			<Tab {active} {...tab} onclickTab={clickTabFun} layout="v" />
		</div>
	</div>
{/if}
