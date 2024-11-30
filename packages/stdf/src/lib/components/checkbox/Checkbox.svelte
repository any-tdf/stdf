<script lang="ts">
	import CheckboxItem from './CheckboxItem.svelte';
	import type { CheckboxProps } from '../../types/index.js';

	let {
		data = [],
		layout = 'v',
		checkeds = $bindable([]),
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		checkboxChild,
		onchange
	}: CheckboxProps = $props();

	const clickItemFn = (name: string) => {
		checkeds = checkeds.includes(name) ? checkeds.filter((v) => v !== name) : [name, ...checkeds];
		onchange?.(checkeds);
	};
</script>

<div class={layout === 'inline' ? 'flex flex-wrap' : `flex ${layout === 'h' ? 'justify-between' : 'w-full flex-col space-y-2'}`}>
	{#each data as item}
		{#if checkboxChild}
			{@render checkboxChild({ item })}
		{:else}
			<CheckboxItem {layout} {...item} {textPosition} {icon} {iconChecked} checked={checkeds.includes(item.name)} onclick={clickItemFn}>
				{item.label}
			</CheckboxItem>
		{/if}
	{/each}
</div>
