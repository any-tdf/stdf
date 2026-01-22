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
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-primary dark:fill-dark">
				<path
					d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
				>
				</path>
			</svg>
		{:else}
			<Icon {...iconChecked} state="theme" />
		{/if}
	</div>
	<div class:hidden={checked}>
		{#if icon === null}{:else if icon === 'default'}
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current opacity-20">
				<path
					d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
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
