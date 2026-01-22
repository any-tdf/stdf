<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { AccordionProps } from '../../types/index.js';
	import Icon from '../icon/Icon.svelte';

	let {
		items = [],
		activeIndex = $bindable<number | number[] | undefined>(undefined),
		multiple = false,
		radius = 'md',
		border = 'solid',
		divider = true,
		expandIcon = 'arrow',
		iconPosition = 'right',
		transitionDuration = 300,
		injClass = '',
		titleClass = '',
		contentClass = '',
		children,
		onchange
	}: AccordionProps = $props();

	// 圆角样式映射
	// Radius style mapping
	const radiusObj: Record<string, string> = {
		none: 'rounded-none',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		'4xl': 'rounded-4xl',
		'': 'rounded-(--radius-box)'
	};

	// 边框样式映射
	// Border style mapping
	const borderObj: Record<string, string> = {
		none: '',
		solid: 'border border-solid border-black/10 dark:border-white/10',
		dashed: 'border border-dashed border-black/10 dark:border-white/10',
		dotted: 'border border-dotted border-black/10 dark:border-white/10'
	};

	// 分割线样式映射（与边框样式保持一致）
	// Divider style mapping (consistent with border style)
	const dividerObj: Record<string, string> = {
		none: 'border-t border-black/10 dark:border-white/10',
		solid: 'border-t border-solid border-black/10 dark:border-white/10',
		dashed: 'border-t border-dashed border-black/10 dark:border-white/10',
		dotted: 'border-t border-dotted border-black/10 dark:border-white/10'
	};

	// 判断某项是否展开
	// Check if an item is expanded
	const isExpanded = (index: number): boolean => {
		if (activeIndex === undefined) return false;
		if (multiple && Array.isArray(activeIndex)) {
			return activeIndex.includes(index);
		}
		return activeIndex === index;
	};

	// 切换展开/折叠
	// Toggle expand/collapse
	const toggle = (index: number) => {
		const item = items[index];
		if (item?.disabled) return;

		if (multiple) {
			// 多选模式
			// Multiple selection mode
			const currentActive = Array.isArray(activeIndex) ? [...activeIndex] : [];
			const idx = currentActive.indexOf(index);
			if (idx > -1) {
				currentActive.splice(idx, 1);
			} else {
				currentActive.push(index);
			}
			activeIndex = currentActive;
			onchange?.(currentActive);
		} else {
			// 单选模式
			// Single selection mode
			activeIndex = activeIndex === index ? undefined : index;
			onchange?.(activeIndex as number);
		}
	};

	// 展开图标的旋转样式
	// Expand icon rotation style
	const getIconRotation = (index: number): string => {
		if (!isExpanded(index)) return '';
		if (expandIcon === 'arrow') return 'rotate-90';
		if (expandIcon === 'plus') return 'rotate-45';
		return '';
	};
</script>

<div class="overflow-hidden {radiusObj[radius]} {borderObj[border]} {injClass}">
	{#each items as item, index (index)}
		{@const expanded = isExpanded(index)}
		<div class={index > 0 && divider ? dividerObj[border] : ''}>
			<!-- 标题区域 Title area -->
			<button
				type="button"
				class="flex w-full items-center justify-between px-4 py-3 text-left transition-colors
					{item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:bg-black/5 dark:active:bg-white/5'}
					{iconPosition === 'left' ? 'flex-row-reverse' : ''}
					{titleClass}"
				onclick={() => toggle(index)}
				disabled={item.disabled}
			>
				<div class="flex flex-1 items-center gap-2 {iconPosition === 'left' ? 'flex-row-reverse justify-end' : ''}">
					{#if item.icon}
						<Icon {...item.icon} />
					{/if}
					<span class="font-medium">{item.title}</span>
				</div>
				{#if expandIcon}
					<span class="shrink-0 transition-transform duration-300 {getIconRotation(index)}">
						{#if expandIcon === 'arrow'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						{:else if expandIcon === 'plus'}
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
							</svg>
						{/if}
					</span>
				{/if}
			</button>

			<!-- 内容区域 Content area -->
			{#if expanded}
				<div class="overflow-hidden" transition:slide={{ duration: transitionDuration }}>
					<div class="px-4 pb-4 text-sm text-black/70 dark:text-white/70 {contentClass}">
						{#if children}
							{@render children(item, index)}
						{:else if item.content}
							{item.content}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
