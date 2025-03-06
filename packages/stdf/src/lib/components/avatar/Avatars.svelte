<script lang="ts">
	import Avatar from './Avatar.svelte';
	import Icon from '../icon/Icon.svelte';
	import type { AvatarsProps } from '../../types/index.js';

	let {
		data = [],
		radius = 'full',
		size = 'base',
		compact = 5,
		lineWidth = '3',
		reverse = false,
		max = 10,
		top = 'totle',
		injClass = '',
		onclick
	}: AvatarsProps = $props();

	// 圆角风格样式
	// radius style
	const radiusObj = {
		none: 'rounded-none',
		sm: 'rounded-sm',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full'
	};
	// 边框粗细样式
	// border width style
	const lineWidthClass = {
		0: 'ring-0',
		1: 'ring-1',
		2: 'ring-2',
		3: 'ring',
		4: 'ring-4',
		8: 'ring-8'
	};

	// 头像框大小样式
	// avatar size style
	const sizeObj = {
		xs: 'w-6 h-6',
		sm: 'w-10 h-10',
		base: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-20 h-20',
		xl: 'w-28 h-28',
		'2xl': 'w-32 h-32'
	};

	// 替换文本大小样式
	// replace text size style
	const textSizeObj = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-lg',
		md: 'text-3xl',
		lg: 'text-4xl',
		xl: 'text-6xl',
		'2xl': 'text-8xl'
	};

	const dataInner = data.slice(0, max);
</script>

<button class="flex" onclick={() => onclick && onclick()}>
	{#if reverse}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.sm} {injClass}"
			style="z-index:{dataInner.length}"
		>
			{#if top === 'totle'}
				<div
					class="bg-primary-200 dark:bg-dark-200 text-primary-950 dark:text-dark-950 flex flex-col justify-center overflow-hidden text-center {radiusObj[
						radius
					] || radiusObj.sm} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					+{data.length}
				</div>
			{:else if top === 'add'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col justify-center overflow-hidden text-center {radiusObj[radius] ||
						radiusObj.sm} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					<Icon name="ri-user-add-line" injClass="text-primary-950 dark:text-dark-950" />
				</div>
			{:else if top === null}{:else}
				{@render top?.()}
			{/if}
		</div>
	{/if}
	{#each dataInner as item, i}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.sm} {injClass}"
			style="transform: translateX({-compact * 10 * i - (reverse ? 50 : 0)}%);z-index:{reverse ? dataInner.length - 1 - i : i}"
		>
			<Avatar {radius} {size} {...item} />
		</div>
	{/each}
	{#if !reverse}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.sm} {injClass}"
			style="transform: translateX(-{compact * 10 * dataInner.length}%);z-index:{dataInner.length}"
		>
			{#if top === 'totle'}
				<div
					class="bg-primary-200 dark:bg-dark-200 text-primary-950 dark:text-dark-950 flex flex-col justify-center overflow-hidden text-center {radiusObj[
						radius
					] || radiusObj.sm} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					+{data.length}
				</div>
			{:else if top === 'add'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col justify-center overflow-hidden text-center {radiusObj[radius] ||
						radiusObj.sm} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					<Icon name="ri-user-add-line" injClass="text-primary-950 dark:text-dark-950" />
				</div>
			{:else if top === null}{:else}
				{@render top?.()}
			{/if}
		</div>
	{/if}
</button>
