<script lang="ts">
	import type { ProgressProps } from '../../types/index.js';

	let {
		percent = 66,
		percentPosition = 'right',
		height = '2',
		radius = 'full',
		inactive = false,
		overflowPercent = 10,
		duration = '300',
		injClass = '',
		trackInjClass = '',
		children
	}: ProgressProps = $props();

	// 高度样式
	// height class
	const heightClass = { '1': ' h-1', '2': ' h-2', '3': ' h-3', '4': ' h-4' };

	// 圆角样式
	// radius class
	const radiusClass = { full: ' rounded-full', middle: ' rounded-sm', none: ' rounded-none' };

	// 动画时间样式
	// duration class
	const durationClass = {
		'150': ' duration-150',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000'
	};
</script>

<div class="flex items-center justify-between space-x-2">
	<div
		class="relative w-full bg-black/10 dark:bg-white/20{percentPosition === 'inner'
			? ''
			: heightClass[height] || heightClass['2']}{radiusClass[radius] || radiusClass['full']}{trackInjClass === ''
			? ''
			: ` ${trackInjClass}`}"
	>
		<div
			class="{inactive ? 'bg-primary-300 dark:bg-dark-800' : 'bg-primary dark:bg-dark'} transition-all{durationClass[duration] ||
				durationClass['300']}{percentPosition === 'inner' ? '' : heightClass[height] || heightClass['2']}{radiusClass[radius] ||
				radiusClass['full']}{injClass === '' ? '' : ` ${injClass}`}"
			style="width:{percent}%;"
		>
			{#if percentPosition === 'inner'}
				<div
					class="px-1 py-0.5 text-right text-xs whitespace-nowrap{percent < overflowPercent
						? ' translate-x-full text-black dark:text-white'
						: ' text-white dark:text-black'}"
				>
					{#if children}
						{@render children?.()}
					{:else}
						{percent}%
					{/if}
				</div>
			{/if}
		</div>
		{#if percentPosition === 'block'}
			<div
				class="absolute top-1/2 {inactive
					? ' bg-primary-300 dark:bg-dark-800'
					: ' bg-primary dark:bg-dark'} px-1 py-0.5 text-xs text-white transition-all dark:text-black duration-300{radiusClass[radius] ||
					radiusClass['full']} -translate-y-1/2 -translate-x-1/2{injClass === '' ? '' : ` ${injClass}`}"
				style="left:{percent}%;"
			>
				{#if children}
					{@render children?.()}
				{:else}
					{percent}%
				{/if}
			</div>
		{/if}
	</div>
	{#if percentPosition === 'right'}
		{#if children}
			{@render children?.()}
		{:else}
			<div class="text-xs">{percent}%</div>
		{/if}
	{/if}
</div>
