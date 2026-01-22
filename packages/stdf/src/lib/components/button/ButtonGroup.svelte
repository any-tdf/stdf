<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { ButtonGroupProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		items = [],
		fill = 'base',
		state,
		radius = '',
		size = 'big',
		border = 'solid',
		dividerHeight = 'mid',
		heightIn = '3',
		heightOut = '2',
		injClass = '',
		children
	}: ButtonGroupProps = $props();

	// fill + state 组合样式映射（与 Button 组件保持一致）
	// fill + state combination style mapping (consistent with Button component)

	// base 模式：实心填充，跟随 state
	const stateBaseObj: Record<string, string> = {
		theme: 'bg-primary dark:bg-dark',
		success: 'bg-success',
		warning: 'bg-warning',
		error: 'bg-error',
		info: 'bg-info'
	};

	// line 模式：无色边框
	const fillLineClass = 'border border-text-primary dark:border-text-dark !text-text-primary dark:!text-text-dark';

	// lineLight 模式：浅色无色边框
	const fillLineLightClass = 'border border-text-primary/20 dark:border-text-dark/30 !text-text-primary dark:!text-text-dark';

	// lineState 模式：状态色边框
	const stateLineStateObj: Record<string, string> = {
		theme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
		success: 'border border-success !text-success',
		warning: 'border border-warning !text-warning',
		error: 'border border-error !text-error',
		info: 'border border-info !text-info'
	};

	// text 模式：无色纯文本
	const fillTextClass = '!text-text-primary dark:!text-text-dark';

	// textState 模式：状态色纯文本
	const stateTextStateObj: Record<string, string> = {
		theme: '!text-primary dark:!text-dark',
		success: '!text-success',
		warning: '!text-warning',
		error: '!text-error',
		info: '!text-info'
	};

	// colorLight 模式：浅色填充，默认浅灰，state 指定时跟随 state
	const stateColorLightObj: Record<string, string> = {
		default: '!bg-black/10 dark:!bg-white/10 !text-black dark:!text-white',
		theme: '!bg-primary/10 dark:!bg-dark/10 !text-primary dark:!text-dark',
		success: '!bg-success/10 !text-success',
		warning: '!bg-warning/10 !text-warning',
		error: '!bg-error/10 !text-error',
		info: '!bg-info/10 !text-info'
	};

	// 计算 fill + state 组合样式
	const fillStateClass = $derived.by(() => {
		switch (fill) {
			case 'base':
				return stateBaseObj[state || 'theme'];
			case 'line':
				return fillLineClass;
			case 'lineLight':
				return fillLineLightClass;
			case 'lineState':
				return stateLineStateObj[state || 'theme'];
			case 'text':
				return fillTextClass;
			case 'textState':
				return stateTextStateObj[state || 'theme'];
			case 'colorLight':
				// colorLight 模式：未指定 state 时使用灰色，指定 state 时跟随 state
				return state ? stateColorLightObj[state] : stateColorLightObj.default;
			default:
				return stateBaseObj[state || 'theme'];
		}
	});

	// 分割线高度映射 full(100%) / mid(60%) / short(30%)
	// Divider height mapping
	const dividerHeightObj: Record<string, string> = {
		full: 'h-full',
		mid: 'h-[60%]',
		short: 'h-[30%]'
	};

	// 分割线颜色（跟随文字颜色）
	// Divider color (follows text color)
	const dividerColorClass = $derived.by(() => {
		if (fill === 'base') {
			// base 模式下文字是白色/黑色，分割线用半透明白色/黑色
			return 'bg-white/30 dark:bg-black/30';
		}
		// 其他模式分割线颜色跟随状态色
		const stateColorMap: Record<string, string> = {
			theme: 'bg-primary/30 dark:bg-dark/30',
			success: 'bg-success/30',
			warning: 'bg-warning/30',
			error: 'bg-error/30',
			info: 'bg-info/30'
		};
		// line/lineLight/text/colorLight（未指定 state）模式使用无色分割线
		if (fill === 'line' || fill === 'lineLight' || fill === 'text' || (fill === 'colorLight' && !state)) {
			return 'bg-text-primary/20 dark:bg-text-dark/30';
		}
		return stateColorMap[state ?? 'theme'];
	});

	// 尺寸样式
	const sizeObj: Record<string, string> = { full: 'w-full', big: 'w-full', md: 'w-[50vw]', sm: 'w-[25vw]', auto: 'w-auto' };

	// 边框风格样式
	const borderObj: Record<string, string> = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

	// 按钮外部高度样式
	const heightOutObj: Record<string, string> = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 按钮高度样式
	const heightInObj: Record<string, string> = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 是否块级元素
	let block = $derived(size === 'full' || size === 'big');

	// 文字颜色（仅 base 模式需要反色文字）
	const textColor = $derived.by(() => {
		if (fill === 'base') {
			return state === 'theme' || !state ? 'text-text-on-primary dark:text-text-on-dark' : 'text-text-on-primary';
		}
		return '';
	});

	// 是否使用 items 数组模式
	const useItems = $derived(items && items.length > 0);
</script>

<div class="{heightOutObj[heightOut] || heightOutObj['2']} {size === 'big' ? 'px-4' : 'px-0'} {block ? 'block' : 'inline'}">
	<div
		class="inline-flex items-center justify-center overflow-hidden {sizeObj[size] || sizeObj.big} {fillStateClass} {textColor} {borderObj[border] || borderObj.solid} {radius ? radiusObj[radius] : 'rounded-(--radius-form)'} {injClass}"
	>
		{#if useItems}
			<!-- items 数组模式 -->
			{#each items as item, index (index)}
				<button
					class="flex flex-1 items-center justify-center gap-1 {heightInObj[heightIn] || heightInObj['3']} {item.disabled ? 'cursor-not-allowed opacity-50' : 'active:opacity-80'}"
					disabled={item.disabled}
					onclick={item.onclick}
				>
					{#if item.icon && item.icon.name && item.iconPosition !== 'right'}
						<Icon {...item.icon} />
					{/if}
					{#if item.text}
						{item.text}
					{/if}
					{#if item.icon && item.icon.name && item.iconPosition === 'right'}
						<Icon {...item.icon} />
					{/if}
				</button>
				<!-- 分割线（最后一项后不显示） -->
				{#if index < items.length - 1}
					<div class="flex items-center self-stretch">
						<div class="w-px {dividerHeightObj[dividerHeight] || dividerHeightObj.mid} {dividerColorClass}"></div>
					</div>
				{/if}
			{/each}
		{:else if children}
			<!-- children 自定义模式 -->
			{@render children()}
		{/if}
	</div>
</div>
