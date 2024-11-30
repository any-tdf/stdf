<script lang="ts">
	import RadioItem from './RadioItem.svelte';
	import type { RadioProps } from '../../types/index.js';

	let {
		data = [],
		value = $bindable(''),
		layout = 'v',
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		radioChild,
		onchange
	}: RadioProps = $props();

	const clickItemFn = (name: string) => {
		value = name;
		onchange?.(value);
	};
</script>

<div class={layout === 'inline' ? 'flex flex-wrap' : `flex ${layout === 'h' ? 'justify-between' : 'w-full flex-col space-y-2'}`}>
	{#each data as item}
		{#if radioChild}
			{@render radioChild({ item })}
		{:else}
			<RadioItem
				{layout}
				{...item}
				{textPosition}
				{icon}
				{iconChecked}
				checked={value === item.name}
				onclick={() => clickItemFn(item.name)}
			>
				{item.label}
			</RadioItem>
		{/if}
	{/each}
</div>
