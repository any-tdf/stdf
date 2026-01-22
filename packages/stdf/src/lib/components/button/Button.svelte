<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { ButtonProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		fill = 'base',
		state,
		radius = '',
		size = 'big',
		border = 'solid',
		injClass = '',
		love = false,
		heightOut = '2',
		heightIn = '3',
		disabled = false,
		customSize = false,
		customWidth = 0,
		customHeight = 0,
		icon = null,
		iconPosition = 'left',
		loading = null,
		disabledLoading = true,
		type = 'button',
		children,
		onclick
	}: ButtonProps = $props();

	let innerDisabled = $derived(disabled || (loading && disabledLoading));

	// fill + state 组合样式映射
	// fill + state combination style mapping

	// base 模式：实心填充，跟随 state
	// base mode: solid fill, follows state
	const stateBaseObj: Record<string, string> = {
		theme: 'bg-primary dark:bg-dark',
		success: 'bg-success',
		warning: 'bg-warning',
		error: 'bg-error',
		info: 'bg-info'
	};

	// line 模式：无色边框（黑/白），不跟随 state
	// line mode: colorless border (black/white), does not follow state
	const fillLineClass = 'border border-text-primary dark:border-text-dark !text-text-primary dark:!text-text-dark';

	// lineLight 模式：浅色无色边框，不跟随 state
	// lineLight mode: light colorless border, does not follow state
	const fillLineLightClass = 'border border-text-primary/20 dark:border-text-dark/30 !text-text-primary dark:!text-text-dark';

	// lineState 模式：状态色边框，跟随 state
	// lineState mode: state color border, follows state
	const stateLineStateObj: Record<string, string> = {
		theme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
		success: 'border border-success !text-success',
		warning: 'border border-warning !text-warning',
		error: 'border border-error !text-error',
		info: 'border border-info !text-info'
	};

	// text 模式：无色纯文本（黑/白），不跟随 state
	// text mode: colorless text (black/white), does not follow state
	const fillTextClass = '!text-text-primary dark:!text-text-dark';

	// textState 模式：状态色纯文本，跟随 state
	// textState mode: state color text, follows state
	const stateTextStateObj: Record<string, string> = {
		theme: '!text-primary dark:!text-dark',
		success: '!text-success',
		warning: '!text-warning',
		error: '!text-error',
		info: '!text-info'
	};

	// colorLight 模式：浅色填充，默认浅灰，state 指定时跟随 state
	// colorLight mode: light fill, default gray, follows state when specified
	const stateColorLightObj: Record<string, string> = {
		default: '!bg-black/10 dark:!bg-white/10 !text-black dark:!text-white',
		theme: '!bg-primary/10 dark:!bg-dark/10 !text-primary dark:!text-dark',
		success: '!bg-success/10 !text-success',
		warning: '!bg-warning/10 !text-warning',
		error: '!bg-error/10 !text-error',
		info: '!bg-info/10 !text-info'
	};

	// 计算 fill + state 组合样式
	// Calculate fill + state combination style
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
				// colorLight mode: use gray when state not specified, follow state when specified
				return state ? stateColorLightObj[state] : stateColorLightObj.default;
			default:
				return stateBaseObj[state || 'theme'];
		}
	});

	// 尺寸样式（md/sm 根据视口宽度计算）
	// Size style (md/sm calculated based on viewport width)
	const sizeObj = { full: 'w-full', big: 'w-full', md: 'w-[50vw]', sm: 'w-[25vw]', auto: 'w-auto' };

	// 边框风格样式
	// Border style
	const borderObj = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

	// 按钮外部高度样式
	// Button outer height style
	const heightOutObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 按钮高度样式
	// Button height style
	const heightInObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 是否块级元素
	// Whether it is a block element
	let block = $derived((size === 'full' || size === 'big') && !customSize);

	// 文字颜色（仅 base 模式需要反色文字）
	// Text color (only base mode needs inverted text)
	const textColor = $derived.by(() => {
		if (fill === 'base') {
			return state === 'theme' || !state ? 'text-text-on-primary dark:text-text-on-dark' : 'text-text-on-primary';
		}
		return '';
	});
</script>

<div
	class="{heightOutObj[heightOut] || heightOutObj['2']} {size === 'big' && !customSize ? 'px-4' : 'px-0'} {block ? 'block' : 'inline'} {love
		? 'text-xl'
		: ''}"
>
	<button
		{onclick}
		class="inline-flex items-center justify-center gap-1 truncate {!innerDisabled ? 'active:opacity-80' : ''} {heightInObj[heightIn] ||
			heightInObj['3']} {sizeObj[size] || sizeObj.big} {textColor} {borderObj[border] || borderObj.solid} {radius
			? radiusObj[radius]
			: 'rounded-(--radius-form)'} {fillStateClass} {injClass} {innerDisabled ? 'cursor-not-allowed opacity-50' : ''}"
		disabled={innerDisabled}
		style={customSize ? `width:${customWidth}px;height:${customHeight}px;padding:0;` : ''}
		{type}
	>
		{#if loading}
			<Loading {...loading} />
		{/if}
		{#if icon && icon.name && iconPosition === 'left'}
			<Icon {...icon} />
		{/if}
		{@render children?.()}
		{#if icon && icon.name && iconPosition === 'right'}
			<Icon {...icon} />
		{/if}
	</button>
</div>
