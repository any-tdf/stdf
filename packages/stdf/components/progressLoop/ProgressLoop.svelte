<script>
	// 百分比
	//  percent
	export let percent = 66;

	// 圆环宽度
	// circle width
	export let strokeWidth = 2;

	// 是否直角
	// is butt
	export let butt = false;

	// 是否反向
	// is reverse
	export let reverse = false;

	// 动画时间
	// animation duration
	export let duration = '300';

	// 渐变色
	// gradient color
	export let gradient = [];

	// 是否使用slot
	// is use slot
	export let useSlot = false;

	// 注入class
	// inject class
	export let injClass = '';

	// 轨道注入class
	// track inject class
	export let trackInjClass = '';

	// 通过百分比计算半径
	// calculate radius by percent
	let r = 12 - strokeWidth / 2;

	// 计算圆周长
	// calculate circle length
	let circleLen = 2 * Math.PI * r;

	// 动画时间class
	// animation duration class
	const durationClass = {
		'150': ' duration-150',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000',
	};
</script>

<div class="relative">
	<svg viewBox="0 0 24 24" class={`-rotate-90${reverse ? ' -scale-y-100' : ''}`}>
		<circle
			cx="12"
			cy="12"
			{r}
			stroke-width={strokeWidth}
			fill="none"
			class={`stroke-black/5 dark:stroke-white/5${trackInjClass === '' ? '' : ` ${trackInjClass}`}`}
		></circle>
		{#if gradient.length === 2}
			<defs>
				<linearGradient id="gradient_ProgressLoop">
					<stop offset="0%" style="stop-color: {gradient[1]};" />
					<stop offset="100%" style="stop-color: {gradient[0]};" />
				</linearGradient>
			</defs>
		{/if}
		<circle
			cx="12"
			cy="12"
			{r}
			stroke-width={strokeWidth}
			class={`${gradient.length < 2 ? 'stroke-primary dark:stroke-dark ' : ''}transition-all ${
				durationClass[duration] || durationClass['300']
			}${injClass === '' ? '' : ` ${injClass}`}`}
			fill="none"
			stroke-dashoffset={circleLen - (percent / 100) * circleLen || 0}
			stroke-dasharray={circleLen}
			stroke-linecap={butt ? 'butt' : 'round'}
			stroke="url(#gradient_ProgressLoop)"
		></circle>
	</svg>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		{#if useSlot}
			<slot />
		{:else}
			<div class="text-xs">{percent}%</div>
		{/if}
	</div>
</div>
