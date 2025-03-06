<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { ButtonProps } from '../../types/index.js';

	let {
		fill = 'base',
		state = 'theme',
		radius = 'sm',
		size = 'big',
		line = 'solid',
		injClass = '',
		love = false,
		heightOut = '2',
		heightIn = '3',
		group = false,
		disabled = false,
		customSize = false,
		customWidth = 0,
		customHeight = 0,
		icon = null,
		loading = null,
		disabledLoading = true,
		children,
		onclick
	}: ButtonProps = $props();

	let innerDisabled = $derived(disabled || (loading && disabledLoading));

	// 状态样式
	// State style
	const stateObj = { theme: 'bg-primary dark:bg-dark', success: 'bg-success', warning: 'bg-warning', error: 'bg-error', info: 'bg-info' };

	// 圆角风格样式
	// Corner style style
	const radiusObj = { none: 'rounded-none', sm: 'rounded-sm', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' };

	// 填充模式样式
	// Fill mode style
	const fillObj = {
		base: '',
		line: 'border border-black dark:border-white !text-black dark:!text-white',
		lineLight: 'border border-black/20 dark:border-white/30 !text-black dark:!text-white',
		lineTheme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
		text: '!text-black dark:!text-white',
		textTheme: '!text-primary dark:!text-dark',
		colorLight: '!bg-black/5 dark:!bg-white/10 !text-black dark:!text-white'
	};

	// 尺寸样式
	// Size style
	const sizeObj = { full: 'w-full', big: 'w-full', md: 'w-1/2', sm: 'w-1/4', auto: 'w-auto' };

	// 边框风格样式
	// Border style style
	const lineObj = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

	// 按钮外部高度样式
	// Button outer height style
	const heightOutObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 按钮高度样式
	// Button height style
	const heightInObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 是否块级元素
	// Whether it is a block element
	const block = (size === 'full' || size === 'big') && !customSize;

	// 文字颜色
	// Text color
	const textColor = state === 'theme' ? 'text-white dark:text-black' : 'text-white';
</script>

<div
	class="{heightOutObj[heightOut] || heightOutObj['2']} {size === 'big' && !customSize ? 'px-4' : 'px-0'} {block ? 'block' : 'inline'} {love
		? 'text-xl'
		: ''}"
>
	<button
		{onclick}
		class="inline-flex items-center justify-center gap-1 truncate {!group && !innerDisabled ? 'active:opacity-80' : ''} {heightInObj[
			heightIn
		] || heightInObj['3']} {sizeObj[size] || sizeObj.big} {textColor} {lineObj[line] || lineObj.solid} {radiusObj[radius] ||
			radiusObj.sm} {fill === 'base' && (stateObj[state] || stateObj.theme)} {fillObj[fill] || fillObj.base} {injClass} {innerDisabled
			? 'cursor-not-allowed opacity-50'
			: ''}"
		disabled={innerDisabled}
		style={customSize ? `width:${customWidth}px;height:${customHeight}px;padding:0;` : ''}
	>
		{#if loading}
			<Loading {...loading} />
		{/if}
		{#if icon && icon.name}
			<Icon {...icon} />
		{/if}
		{@render children?.()}
	</button>
</div>
