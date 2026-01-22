<script lang="ts">
	import type { TooltipProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';
	import { fade, fly } from 'svelte/transition';
	import { tick } from 'svelte';

	let {
		content = '',
		position = 'top',
		visible = $bindable(false),
		delay = 0,
		hideDelay = 0,
		arrow = true,
		radius = 'sm',
		state: colorState = 'black',
		maxWidth = 200,
		zIndex = 800,
		disabled = false,
		injClass = '',
		contentClass = '',
		children,
		contentSnippet,
		onshow,
		onhide
	}: TooltipProps = $props();

	// 触发元素引用
	// Trigger element reference
	let triggerEl: HTMLElement | null = $state(null);

	// Tooltip 元素引用
	// Tooltip element reference
	let tooltipEl: HTMLElement | null = $state(null);

	// Tooltip 位置
	// Tooltip position
	let tooltipTop = $state(0);
	let tooltipLeft = $state(0);

	// 延迟定时器
	// Delay timer
	let showTimer: ReturnType<typeof setTimeout> | null = null;
	let hideTimer: ReturnType<typeof setTimeout> | null = null;

	// 状态对应的背景色类
	// State background color classes
	const stateClasses = {
		theme: 'bg-primary dark:bg-dark text-white dark:text-black',
		success: 'bg-success text-white',
		warning: 'bg-warning text-white',
		error: 'bg-error text-white',
		info: 'bg-info text-white',
		black: 'bg-black/90 text-white dark:bg-white/90 dark:text-black'
	} as const;

	// 状态对应的箭头颜色类（按位置分别设置）
	// State arrow color classes (set by position)
	const arrowStateClasses = {
		top: {
			theme: 'border-t-primary dark:border-t-dark',
			success: 'border-t-success',
			warning: 'border-t-warning',
			error: 'border-t-error',
			info: 'border-t-info',
			black: 'border-t-black/90 dark:border-t-white/90'
		},
		bottom: {
			theme: 'border-b-primary dark:border-b-dark',
			success: 'border-b-success',
			warning: 'border-b-warning',
			error: 'border-b-error',
			info: 'border-b-info',
			black: 'border-b-black/90 dark:border-b-white/90'
		},
		left: {
			theme: 'border-l-primary dark:border-l-dark',
			success: 'border-l-success',
			warning: 'border-l-warning',
			error: 'border-l-error',
			info: 'border-l-info',
			black: 'border-l-black/90 dark:border-l-white/90'
		},
		right: {
			theme: 'border-r-primary dark:border-r-dark',
			success: 'border-r-success',
			warning: 'border-r-warning',
			error: 'border-r-error',
			info: 'border-r-info',
			black: 'border-r-black/90 dark:border-r-white/90'
		}
	} as const;

	// 圆角类
	// Radius class
	const radiusClass = $derived(radius ? radiusObj[radius] : 'rounded-(--radius-small)');

	// 箭头方向类
	// Arrow direction classes
	const arrowClasses = {
		top: 'top-full left-1/2 -translate-x-1/2 border-transparent',
		bottom: 'bottom-full left-1/2 -translate-x-1/2 border-transparent',
		left: 'left-full top-1/2 -translate-y-1/2 border-transparent',
		right: 'right-full top-1/2 -translate-y-1/2 border-transparent'
	} as const;

	// 动画方向
	// Animation direction
	const flyConfig = {
		top: { y: 4 },
		bottom: { y: -4 },
		left: { x: 4 },
		right: { x: -4 }
	} as const;

	// 计算位置
	// Calculate position
	const updatePosition = () => {
		if (!triggerEl || !tooltipEl) return;

		const triggerRect = triggerEl.getBoundingClientRect();
		const tooltipRect = tooltipEl.getBoundingClientRect();
		const gap = 8;

		let top = 0;
		let left = 0;

		switch (position) {
			case 'top':
				top = triggerRect.top - tooltipRect.height - gap;
				left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
				break;
			case 'bottom':
				top = triggerRect.bottom + gap;
				left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
				break;
			case 'left':
				top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
				left = triggerRect.left - tooltipRect.width - gap;
				break;
			case 'right':
				top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
				left = triggerRect.right + gap;
				break;
		}

		// 边界检测
		// Boundary detection
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const padding = 4;

		if (left < padding) left = padding;
		if (left + tooltipRect.width > viewportWidth - padding) {
			left = viewportWidth - tooltipRect.width - padding;
		}
		if (top < padding) top = padding;
		if (top + tooltipRect.height > viewportHeight - padding) {
			top = viewportHeight - tooltipRect.height - padding;
		}

		tooltipTop = top;
		tooltipLeft = left;
	};

	// 显示 tooltip
	// Show tooltip
	const show = () => {
		if (disabled) return;

		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}

		if (delay > 0) {
			showTimer = setTimeout(() => {
				visible = true;
				onshow?.();
			}, delay);
		} else {
			visible = true;
			onshow?.();
		}
	};

	// 隐藏 tooltip
	// Hide tooltip
	const hide = () => {
		if (showTimer) {
			clearTimeout(showTimer);
			showTimer = null;
		}

		if (hideDelay > 0) {
			hideTimer = setTimeout(() => {
				visible = false;
				onhide?.();
			}, hideDelay);
		} else {
			visible = false;
			onhide?.();
		}
	};

	// 切换显示状态
	// Toggle visibility
	const toggle = (e: MouseEvent) => {
		e.stopPropagation();
		if (visible) {
			hide();
		} else {
			show();
		}
	};

	// 点击外部关闭
	// Close on click outside
	const handleClickOutside = () => {
		hide();
	};

	// 监听 visible 变化，添加滚动监听和点击外部监听
	// Listen for visible changes, add scroll listener and click outside listener
	$effect(() => {
		if (visible) {
			// 延迟添加点击外部监听
			// Delay adding click outside listener
			const clickTimer = setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);

			// 添加滚动监听，跟随滚动更新位置
			// Add scroll listener to follow scroll
			const handleScroll = () => {
				requestAnimationFrame(updatePosition);
			};
			window.addEventListener('scroll', handleScroll, true);

			// 初始计算位置
			// Initial position calculation
			tick().then(() => {
				updatePosition();
			});

			return () => {
				clearTimeout(clickTimer);
				document.removeEventListener('click', handleClickOutside);
				window.removeEventListener('scroll', handleScroll, true);
			};
		}
	});
</script>

<div class="inline-block" bind:this={triggerEl}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={toggle} class={disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}>
		{@render children?.()}
	</div>
</div>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={tooltipEl}
		class="fixed {radiusClass} px-2 py-1.5 text-xs {stateClasses[colorState]} {injClass}"
		style="top: {tooltipTop}px; left: {tooltipLeft}px; max-width: {maxWidth}px; z-index: {zIndex};"
		onclick={(e) => e.stopPropagation()}
		in:fly={{ ...flyConfig[position], duration: 200 }}
		out:fade={{ duration: 150 }}
	>
		{#if contentSnippet}
			<div class="{contentClass}">
				{@render contentSnippet()}
			</div>
		{:else}
			<div class="{contentClass}">{content}</div>
		{/if}

		{#if arrow}
			<div
				class="absolute h-0 w-0 border-4 {arrowClasses[position]} {arrowStateClasses[position][colorState]}"
			></div>
		{/if}
	</div>
{/if}
