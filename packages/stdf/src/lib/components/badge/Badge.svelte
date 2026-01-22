<script lang="ts">
	import type { BadgeProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		text = '',
		radius = '',
		isLeft = false,
		isShow = true,
		offsetY = 0,
		offsetX = 0,
		isInner = false,
		injClass = '',
		children
	}: BadgeProps = $props();

	// 叶形圆角样式
	// leaf radius style
	const leafRadiusObj = {
		leftLeaf: ' rounded-full rounded-br-none',
		rightLeaf: ' rounded-full rounded-bl-none'
	};

	// 通过 radius 配置圆角风格或叶形
	// set radius style or leaf style by radius
	const radiusClass = $derived(
		radius === 'leaf'
			? isLeft
				? leafRadiusObj.leftLeaf
				: leafRadiusObj.rightLeaf
			: ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`
	);
</script>

{#if isInner}
	<div
		class="whitespace-nowrap px-1 text-xs text-white {radiusClass}{text === ''
			? ' h-3 w-3'
			: ' '} text-center leading-4 transition-all bg-[red]{injClass === '' ? '' : ` ${injClass}`}"
		style="transform:{isShow ? ' scale(1)' : ' scale(0)'}"
	>
		{text}
	</div>
{:else}
	<div class="relative">
		{@render children?.()}
		<div
			class="absolute{text === '' ? ' -top-1.5' : ' -top-2'}{isLeft
				? ' left-0'
				: ' right-0'} whitespace-nowrap px-1 text-xs text-white {radiusClass}{text === ''
				? ' h-3 w-3'
				: ' '} text-center leading-4 transition-all bg-[red]{injClass === '' ? '' : ` ${injClass}`}"
			style="transform: translateX(calc({isLeft ? '-' : ''}50% {isLeft ? '+' : '-'} {offsetX}px)) translateY({offsetY}px){isShow
				? ' scale(1)'
				: ' scale(0)'}"
		>
			{text}
		</div>
	</div>
{/if}
