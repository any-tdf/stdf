<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { CheckboxItemProps } from '../../types/index.js';

	let {
		name = '',
		layout = 'v',
		checked = false,
		textPosition = 'r',
		icon = 'default',
		iconChecked = 'default',
		children,
		onclick
	}: CheckboxItemProps = $props();

	// 点击选项事件
	// Click option event
	const clickRadioFun = () => {
		onclick?.(name);
	};
</script>

<button
	onclick={() => clickRadioFun()}
	class="{layout === 'inline' ? 'inline-block' : 'flex'} grow active:opacity-80 {textPosition === 'l' && layout === 'v'
		? 'justify-between'
		: ''} {textPosition === 'b' || textPosition === 't' ? 'flex-col items-center' : layout === 'h' ? 'justify-center' : 'items-center'}"
>
	{#if textPosition === 'l' || textPosition === 't'}
		<div class="{textPosition === 'l' && icon !== null ? 'mr-0.5 text-left' : ''} {layout === 'v' ? 'grow' : ''}">
			{@render children?.()}
			{#if layout === 'v'}
				<div class="mt-1 h-px bg-black/10 dark:bg-white/10"></div>
			{/if}
		</div>
	{/if}
	<div class:hidden={!checked}>
		{#if iconChecked === null}{:else if iconChecked === 'default'}
			<Icon name="ri-checkbox-fill" theme top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
		{:else}
			<Icon {...iconChecked} theme />
		{/if}
	</div>
	<div class:hidden={checked}>
		{#if icon === null}{:else if icon === 'default'}
			<Icon name="ri-checkbox-line" alpha={0.2} top={textPosition === 't' || textPosition === 'b' ? 0 : -1} />
		{:else}
			<Icon alpha={0.2} {...icon} />
		{/if}
	</div>
	{#if textPosition === 'r' || textPosition === 'b'}
		<div class={textPosition === 'r' && icon !== null ? 'ml-0.5 text-left' : ''}>
			{@render children?.()}
		</div>
	{/if}
</button>
