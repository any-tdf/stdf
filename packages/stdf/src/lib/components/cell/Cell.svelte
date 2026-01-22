<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Switch from '../switch/Switch.svelte';
	import type { CellProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		title = '',
		detail = '',
		right = 'arrow',
		left = null,
		subTitle = '',
		info = '',
		line = false,
		bg = 'surface',
		my = '4',
		mx = '2',
		radius = '',
		switchActive = $bindable(false),
		shadow = 'xs',
		injClass = '',
		love = false,
		clickAll = true,
		leftChild,
		rightChild,
		detailChild,
		onclick
	}: CellProps = $props();

	// 背景样式
	// Background style
	const bgClass = {
		white: 'bg-white dark:bg-gray-800',
		surface: 'bg-bg-surface dark:bg-bg-surface-dark',
		gray: 'bg-text-primary/5 dark:bg-text-dark/5',
		theme: 'bg-primary/5 dark:bg-dark/5'
	};

	// 激活背景样式
	// Active background style
	const activeBgClass = {
		white: 'active:bg-black/5 dark:active:bg-white/5',
		surface: 'active:bg-text-primary/5 dark:active:bg-text-dark/5',
		gray: 'active:bg-text-primary/10 dark:active:bg-text-dark/10',
		theme: 'active:bg-primary/10 dark:active:bg-dark/10'
	};

	// 阴影风格样式
	// Shadow style style
	const shadowClass = {
		none: ' shadow-none',
		xs: ' shadow-xs dark:shadow-white/5',
		sm: ' shadow-sm dark:shadow-white/5',
		md: ' shadow-md dark:shadow-white/10',
		lg: ' shadow-lg dark:shadow-white/10',
		xl: ' shadow-xl dark:shadow-white/10',
		'2xl': ' shadow-2xl dark:shadow-white/25'
	};

	// 左右间距样式
	// Left and right margin style
	const mxClass = {
		'0': ' mx-0',
		'1': ' mx-1',
		'2': ' mx-2',
		'3': ' mx-3',
		'4': ' mx-4',
		'6': ' mx-6',
		'8': ' mx-8'
	};

	// 上下边距样式
	// Top and bottom margin style
	const myClass = {
		'0': ' my-0',
		'1': ' my-1',
		'2': ' my-2',
		'3': ' my-3',
		'4': ' my-4',
		'6': ' my-6',
		'8': ' my-8'
	};

	// 点击事件
	// Click event
	const setClickFun = () => {
		if (clickAll) {
			if (typeof right === 'object' && right?.type === 'switch' && !right?.switch?.disabled) {
				switchActive = right?.switch?.async ? switchActive : !switchActive;
			}
			// 派发事件
			// Dispatch event
			onclick?.();
		}
	};
</script>

<div
	class="relative overflow-hidden {myClass[my] || myClass['4']}{mxClass[mx] || mxClass['2']} {radius ? radiusObj[radius] : 'rounded-(--radius-box)'} {shadowClass[shadow] || shadowClass['xs']} {injClass}"
>
	<!-- 主内容区域 -->
	<!-- Main content area -->
	<div
		class="{bgClass[bg] || bgClass['surface']} px-3{clickAll ? ` ${activeBgClass[bg] || activeBgClass['surface']}` : ''}{love ? ' text-xl' : ''}"
	>
		<button
			onclick={setClickFun}
			class="flex w-full items-center justify-between gap-4 py-4{line && my === '0' ? ' border-b border-text-primary/5 dark:border-text-dark/5' : ''}"
		>
			<div class="flex items-center justify-between">
				{#if leftChild}
					{@render leftChild?.()}
				{:else if left}
					<div class="mr-1 flex flex-col justify-center">
						<Icon {...left} />
					</div>
				{:else}{/if}
				<div class="flex flex-col text-left {subTitle === '' ? 'justify-center' : 'justify-between'}">
					<div class="font-medium">{title}</div>
					<div class="text-xs text-gray-500 dark:text-gray-400">{subTitle}</div>
				</div>
			</div>
			<div class="11 flex items-center justify-between">
				<div class="flex flex-col {info === '' ? 'justify-center' : 'justify-between'} text-right">
					{#if detailChild}
						{@render detailChild?.()}
					{:else if detail}
						<div class="text-gray-700 dark:text-gray-300">{detail}</div>
					{:else}{/if}
					<div class="text-xs font-light text-gray-500 dark:text-gray-400">{info}</div>
				</div>
				{#if rightChild}
					{@render rightChild?.()}
				{:else if right === 'arrow'}
					<div class="flex flex-col justify-center text-gray-700 dark:text-gray-300">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="fill-current opacity-60"
							width={love ? 26 : 20}
							height={love ? 26 : 20}
						>
							<path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
							></path>
						</svg>
					</div>
				{:else if typeof right === 'object' && right?.type === 'switch'}
					<div class="ml-1 flex flex-col justify-center">
						<Switch active={switchActive} {...right?.switch} />
					</div>
				{:else if typeof right === 'object' && right?.type === 'icon' && right?.icon}
					<div class="ml-1 flex flex-col justify-center">
						<Icon {...right?.icon} />
					</div>
				{:else}{/if}
			</div>
		</button>
	</div>
</div>
