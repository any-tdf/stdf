<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import type { StepperProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		value = $bindable(10),
		min = 0,
		max = 100,
		step = 1,
		vertical = false,
		numberHighlight = false,
		theme = true,
		radius = '',
		decimal = 0,
		async = false,
		asyncLoading = false,
		loading = {},
		padding = true,
		width = 0,
		injClassOut = '',
		injClassBtn = '',
		injClassNum = '',
		onchange,
		ondecrease,
		onincrease
	}: StepperProps = $props();

	// 减少
	// Decrease
	const decreaseFn = () => {
		if (!async) {
			if (value > min) {
				value = Math.max(min, value - step);
				onchange?.(value);
			}
		}
		ondecrease?.();
	};

	// 增加
	// Increase
	const increaseFn = () => {
		if (!async) {
			if (value < max) {
				value = Math.min(max, value + step);
				onchange?.(value);
			}
		}
		onincrease?.();
	};

	// 计算圆角类名，竖向时不允许 full
	// Calculate radius class, full is not allowed when vertical
	const radiusClass = $derived(
		radius ? (vertical && radius === 'full' ? 'rounded-2xl' : radiusObj[radius]) : vertical ? 'rounded-2xl' : 'rounded-(--radius-small)'
	);
</script>

<div
	class="inline-flex items-center bg-black/5 dark:bg-white/5 {radiusClass} {padding ? 'p-1' : 'p-0'} overflow-hidden {injClassOut} {vertical
		? 'flex-col-reverse'
		: 'flex-row'}"
>
	<button
		onclick={decreaseFn}
		class="{vertical ? 'w-full' : 'w-8'} h-8 {radiusClass} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
				? ' bg-primary/5 dark:bg-dark/10'
				: ' bg-bg-highlight dark:bg-bg-highlight-dark'}"
		disabled={async || value === min}
		aria-label="decrease"
	>
		<span class={async || value === min ? 'opacity-20' : ''}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				class={theme && (numberHighlight ? false : true) ? 'fill-primary dark:fill-dark' : 'fill-black dark:fill-white'}
			>
				<path d="M5 11V13H19V11H5Z"></path>
			</svg>
		</span>
	</button>

	{#if async && asyncLoading}
		<div class="h-8 px-2 {radiusClass} flex flex-col items-center justify-center">
			<Loading width="6" height="6" {...loading} />
		</div>
	{:else}
		<div
			class="h-8 px-4 {radiusClass} flex flex-col items-center {injClassNum} justify-center{numberHighlight
				? theme
					? ' bg-primary/5 text-primary dark:bg-dark/10 dark:text-dark'
					: ' bg-bg-highlight dark:bg-bg-highlight-dark'
				: ''}"
			style={width ? `width: ${width}px;` : ''}
		>
			{value.toFixed(decimal)}
		</div>
	{/if}

	<button
		onclick={increaseFn}
		class="{vertical ? 'w-full' : 'w-8'} h-8 {radiusClass} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
				? ' bg-primary/5 dark:bg-dark/10'
				: ' bg-bg-highlight dark:bg-bg-highlight-dark'}"
		aria-label="increase"
		disabled={async || value === max}
	>
		<span class={async || value === max ? 'opacity-20' : ''}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				class={theme && (numberHighlight ? false : true) ? 'fill-primary dark:fill-dark' : 'fill-black dark:fill-white'}
			>
				<path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
			</svg>
		</span>
	</button>
</div>
