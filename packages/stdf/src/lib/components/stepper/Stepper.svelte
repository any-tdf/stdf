<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { StepperProps } from '../../types/index.js';

	let {
		value = $bindable(10),
		min = 0,
		max = 100,
		step = 1,
		vertical = false,
		numberHighlight = false,
		theme = true,
		radius = 'sm',
		decimal = 0,
		async = false,
		asyncLoading = false,
		loading = {},
		padding = true,
		injClassOut = '',
		injClassBtn = '',
		injClassNum = '',
		onchange,
		ondecrease,
		onincrease
	}: StepperProps = $props();

	// 圆角
	// Round
	const roundObj = { none: 'rounded-none', sm: 'rounded-sm', xl: 'rounded-xl', full: 'rounded-full' };

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
</script>

<div
	class="inline-flex items-center bg-gray-100 dark:bg-gray-800 {roundObj[radius] || 'rounded-sm'} {padding
		? 'p-1'
		: 'p-0'} overflow-hidden {injClassOut} {vertical ? 'flex-col-reverse' : 'flex-row'}"
>
	<button
		onclick={decreaseFn}
		class="{vertical ? 'w-full' : 'w-9'} h-9 {roundObj[radius] ||
			'rounded-sm'} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
				? ' bg-primary/5 dark:bg-dark/10'
				: ' bg-white dark:bg-black'}"
		disabled={async || value === min}
		aria-label="decrease"
	>
		<span class={async || value === min ? 'opacity-20' : ''}>
			<Icon name="ri-subtract-line" theme={theme && (numberHighlight ? false : true)} />
		</span>
	</button>

	{#if async && asyncLoading}
		<div class="h-9 px-2 {roundObj[radius] || 'rounded-sm'} flex flex-col items-center justify-center">
			<Loading width="6" height="6" {...loading} />
		</div>
	{:else}
		<div
			class="h-9 px-4 {roundObj[radius] || 'rounded-sm'} flex flex-col items-center {injClassNum} justify-center{numberHighlight
				? theme
					? ' bg-primary/5 text-primary dark:bg-dark/10 dark:text-dark'
					: ' bg-white dark:bg-black'
				: ''}"
		>
			{value.toFixed(decimal)}
		</div>
	{/if}

	<button
		onclick={increaseFn}
		class="{vertical ? 'w-full' : 'w-9'} h-9 {roundObj[radius] ||
			'rounded-sm'} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
				? ' bg-primary/5 dark:bg-dark/10'
				: ' bg-white dark:bg-black'}"
		aria-label="increase"
		disabled={async || value === max}
	>
		<span class={async || value === max ? 'opacity-20' : ''}>
			<Icon name="ri-add-line" theme={theme && (numberHighlight ? false : true)} />
		</span>
	</button>
</div>
