<script lang="ts">
	import type { TagProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		text = '',
		state = 'theme',
		fill = 'base',
		size = 'md',
		radius = 'sm',
		mark = false,
		closable = false,
		disabled = false,
		injClass = '',
		children,
		onclick,
		onclose
	}: TagProps = $props();

	// 状态颜色映射 - 实心样式
	// State color mapping - base fill style
	const stateBaseObj: Record<string, string> = {
		theme: 'bg-primary dark:bg-dark text-white dark:text-black',
		success: 'bg-success text-white',
		warning: 'bg-warning text-white',
		error: 'bg-error text-white',
		info: 'bg-info text-white',
		neutral: 'bg-black/30 text-white dark:bg-white/30 dark:text-black'
	};

	// 状态颜色映射 - 描边样式
	// State color mapping - line fill style
	const stateLineObj: Record<string, string> = {
		theme: 'border border-primary dark:border-dark text-primary dark:text-dark bg-transparent',
		success: 'border border-success text-success bg-transparent',
		warning: 'border border-warning text-warning bg-transparent',
		error: 'border border-error text-error bg-transparent',
		info: 'border border-info text-info bg-transparent',
		neutral: 'border border-black/20 text-black/50 bg-transparent dark:border-white/20 dark:text-white/50'
	};

	// 状态颜色映射 - 浅色样式
	// State color mapping - light fill style
	const stateLightObj: Record<string, string> = {
		theme: 'bg-primary/10 dark:bg-dark/10 text-primary dark:text-dark',
		success: 'bg-success/10 text-success',
		warning: 'bg-warning/10 text-warning',
		error: 'bg-error/10 text-error',
		info: 'bg-info/10 text-info',
		neutral: 'bg-black/5 text-black/50 dark:bg-white/5 dark:text-white/50'
	};

	// 尺寸映射
	// Size mapping
	const sizeObj: Record<string, string> = {
		xs: 'text-xs px-1 py-0.5',
		sm: 'text-xs px-1.5 py-0.5',
		md: 'text-sm px-2 py-0.5',
		lg: 'text-base px-2.5 py-1'
	};

	// 关闭图标尺寸映射
	// Close icon size mapping
	const closeSizeObj: Record<string, string> = {
		xs: 'w-3 h-3 ml-0.5',
		sm: 'w-3 h-3 ml-1',
		md: 'w-3.5 h-3.5 ml-1',
		lg: 'w-4 h-4 ml-1.5'
	};

	// 计算填充样式类
	// Calculate fill style class
	const fillClass = $derived(
		fill === 'base' ? stateBaseObj[state] : fill === 'line' ? stateLineObj[state] : stateLightObj[state]
	);

	// 计算圆角类
	// Calculate radius class
	const radiusClass = $derived(mark ? 'rounded-l-none rounded-r-full' : radius ? radiusObj[radius as keyof typeof radiusObj] : '');

	// 计算禁用样式
	// Calculate disabled style
	const disabledClass = $derived(disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer');

	// 处理点击事件
	// Handle click event
	const handleClick = () => {
		if (disabled) return;
		onclick?.();
	};

	// 处理关闭事件
	// Handle close event
	const handleClose = (e: MouseEvent) => {
		e.stopPropagation();
		if (disabled) return;
		onclose?.();
	};
</script>

<span
	class="inline-flex items-center whitespace-nowrap {sizeObj[size]} {fillClass} {radiusClass} {disabledClass}{injClass ? ` ${injClass}` : ''}"
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
	role="button"
	tabindex={disabled ? -1 : 0}
>
	{#if children}
		{@render children()}
	{:else}
		{text}
	{/if}
	{#if closable}
		<svg
			class="{closeSizeObj[size]} shrink-0"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			onclick={handleClose}
			onkeydown={(e) => e.key === 'Enter' && handleClose(e as unknown as MouseEvent)}
			role="button"
			tabindex={disabled ? -1 : 0}
		>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	{/if}
</span>
