<script>
	import CheckboxItem from './CheckboxItem.svelte';

	/** @typedef {import('../../index.js').Checkbox} CheckboxProps */
	/** @type {CheckboxProps} */
	let {
		data = [],
		layout = 'v',
		checkeds = $bindable([]),
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		checkboxChild,
		onchange,
	} = $props();

	const clickItemFn = name => {
		checkeds = checkeds.includes(name) ? checkeds.filter(v => v !== name) : [name, ...checkeds];
		onchange && onchange(checkeds);
	};
</script>

<div class={layout === 'inline' ? 'flex flex-wrap' : `flex ${layout === 'h' ? 'justify-between' : 'flex-col space-y-2 w-full'}`}>
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
