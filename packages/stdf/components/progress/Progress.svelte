<script>
	/** @typedef {import('../../index.d').Progress} Progress */
	/** @type {Progress} */
	let {
		percent = 66,
		percentPosition = 'right',
		height = '2',
		radius = 'full',
		inactive = false,
		overflowPercent = 10,
		injClass = '',
		trackInjClass = '',
		duration = '300',
		children,
	} = $props();

	// 高度样式
	// height class
	const heightClass = { '1': ' h-1', '2': ' h-2', '3': ' h-3', '4': ' h-4' };

	// 圆角样式
	// radius class
	const radiusClass = { full: ' rounded-full', base: ' rounded', none: ' rounded-none' };

	// 动画时间样式
	// duration class
	const durationClass = {
		'150': ' duration-150',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000',
	};
</script>

<div class={`flex justify-between space-x-2 items-center`}>
	<div
		class={`relative w-full bg-black/10 dark:bg-white/20${percentPosition === 'inner' ? '' : heightClass[height] || heightClass['2']}${
			radiusClass[radius] || radiusClass['full']
		}${trackInjClass === '' ? '' : ` ${trackInjClass}`}`}
	>
		<div
			class={`${inactive ? 'bg-primary-300 dark:bg-dark-800' : 'bg-primary dark:bg-dark'} transition-all${
				durationClass[duration] || durationClass['300']
			}${percentPosition === 'inner' ? '' : heightClass[height] || heightClass['2']}${radiusClass[radius] || radiusClass['full']}${
				injClass === '' ? '' : ` ${injClass}`
			}`}
			style={`width:${percent}%;`}
		>
			{#if percentPosition === 'inner'}
				<div
					class={`py-0.5 px-1 text-xs text-right whitespace-nowrap${
						percent < overflowPercent ? ' translate-x-full text-black dark:text-white' : ' text-white dark:text-black'
					}`}
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
				class={`absolute top-1/2 ${
					inactive ? ' bg-primary-300 dark:bg-dark-800' : ' bg-primary dark:bg-dark'
				} py-0.5 px-1 text-xs text-white dark:text-black transition-all duration-300${
					radiusClass[radius] || radiusClass['full']
				} -translate-y-1/2 -translate-x-1/2${injClass === '' ? '' : ` ${injClass}`}`}
				style={`left:${percent}%;`}
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
