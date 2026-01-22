<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { RadioItemProps } from '../../types/index.js';

	let {
		name = '',
		textPosition = 'r',
		layout = 'v',
		checked = false,
		icon = 'default',
		iconChecked = 'default',
		children,
		onclick
	}: RadioItemProps = $props();

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
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-primary dark:fill-dark">
				<path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z"
				>
				</path>
			</svg>
		{:else}
			<Icon {...iconChecked} state="theme" />
		{/if}
	</div>
	<div class:hidden={checked}>
		{#if icon === null}{:else if icon === 'default'}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current opacity-20">
				<path
					d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
				>
				</path>
			</svg>
		{:else}
			<Icon opacity={0.2} {...icon} />
		{/if}
	</div>
	{#if textPosition === 'r' || textPosition === 'b'}
		<div class={textPosition === 'r' && icon !== null ? 'ml-0.5 text-left' : ''}>
			{@render children?.()}
		</div>
	{/if}
</button>
