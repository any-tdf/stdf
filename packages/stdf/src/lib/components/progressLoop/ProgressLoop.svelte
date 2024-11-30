<script lang="ts">
	import type { ProgressLoopProps } from '../../types/index.js';

	let {
		percent = 66,
		strokeWidth = 2,
		butt = false,
		reverse = false,
		duration = '300',
		gradient = null,
		injClass = '',
		trackInjClass = '',
		children
	}: ProgressLoopProps = $props();

	// 通过百分比计算半径
	// calculate radius by percent
	const r = 12 - strokeWidth / 2;

	// 计算圆周长
	// calculate circle length
	const circleLen = 2 * Math.PI * r;

	// 动画时间 class
	// animation duration class
	const durationClass = {
		'150': ' duration-150',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000'
	};
</script>

<div class="relative">
	<svg viewBox="0 0 24 24" class="-rotate-90{reverse ? ' -scale-y-100' : ''}">
		<circle
			cx="12"
			cy="12"
			{r}
			stroke-width={strokeWidth}
			fill="none"
			class="stroke-black/5 dark:stroke-white/5{trackInjClass === '' ? '' : ` ${trackInjClass}`}"
		></circle>
		{#if gradient && gradient.length === 2}
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
			class="{!gradient || gradient.length < 2 ? 'stroke-primary dark:stroke-dark ' : ''}transition-all {durationClass[duration] ||
				durationClass['300']}{injClass === '' ? '' : ` ${injClass}`}"
			fill="none"
			stroke-dashoffset={circleLen - (percent / 100) * circleLen || 0}
			stroke-dasharray={circleLen}
			stroke-linecap={butt ? 'butt' : 'round'}
			stroke="url(#gradient_ProgressLoop)"
		></circle>
	</svg>
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
		{#if children}
			{@render children?.()}
		{:else}
			<div class="text-xs">{percent}%</div>
		{/if}
	</div>
</div>
