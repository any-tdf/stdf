<script lang="ts">
	import Tab from './Tab.svelte';
	import type { TabsProps } from '../../types/index.js';

	let { tab = {}, duration = 'base', position = 't', active = $bindable(0), transition = true, onchange, children }: TabsProps = $props();
	const clickTabFun = (a: number) => {
		active = a;
		onchange?.(a);
	};
	let width = $state(window.innerWidth);

	const durationObj = { fast: 'duration-150', base: 'duration-300', slow: 'duration-500', slower: 'duration-1000' };
</script>

{#if transition}
	{#if position === 't'}
		<Tab {active} {duration} {...tab} onclickTab={clickTabFun} />
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class="relative flex transition-all {durationObj[duration] || durationObj.base}"
				style="width: {(tab?.labels?.length ?? 0) * width}px;left: -{active * width}px"
			>
				{#if children}{@render children({ active })}{/if}
			</div>
		</div>
	{/if}
	{#if position === 'b'}
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class="relative flex transition-all {durationObj[duration] || durationObj.base}"
				style="width: {(tab?.labels?.length ?? 0) * width}px;left: -{active * width}px"
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
{:else}
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
{/if}
