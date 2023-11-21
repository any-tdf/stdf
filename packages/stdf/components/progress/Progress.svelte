<script>
	/**
	 * 百分比
	 * percent
	 * @type {number}
	 * @range 0 - 100
	 * @default 66
	 */
	export let percent = 66;

	/**
	 * 百分比位置
	 * percent position
	 * @type {'inner'|'right'|'block'|'none'}
	 * @default 'right'
	 */
	export let percentPosition = 'right';

	/**
	 * 高度
	 * height
	 * @type {'1'|'2'|'3'|'4'}
	 * @default '2'
	 */
	export let height = '2';

	/**
	 * 圆角
	 * radius
	 * @type {'full'|'base'|'none'}
	 * @default 'full'
	 */
	export let radius = 'full';

	/**
	 * 是否禁用
	 * inactive
	 * @type {boolean}
	 * @default false
	 */
	export let inactive = false;

	/**
	 * percentPosition 为 inner 时，内部文字溢出时百分比阀值
	 * percentPosition is inner, overflowPercent is percent value when inner text overflow
	 * @type {number}
	 * @range 0 - 100
	 * @default 10
	 */
	export let overflowPercent = 10;

	/**
	 * 是否使用slot
	 * useSlot
	 * @type {boolean}
	 * @default false
	 */
	export let useSlot = false;

	/**
	 * 注入class
	 * inject class
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	/**
	 * 轨道注入class
	 * tranck inject class
	 * @type {string}
	 * @default ''
	 */
	export let trackInjClass = '';

	/**
	 * 动画时间
	 * duration
	 * @type {'150'|'300'|'500'|'700'|'1000'}
	 * @default '300'
	 */
	export let duration = '300';

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
					{#if useSlot}
						<slot />
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
				{#if useSlot}
					<slot />
				{:else}
					{percent}%
				{/if}
			</div>
		{/if}
	</div>
	{#if percentPosition === 'right'}
		{#if useSlot}
			<slot />
		{:else}
			<div class="text-xs">{percent}%</div>
		{/if}
	{/if}
</div>
