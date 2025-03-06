<script lang="ts">
	import Loading from '../loading/Loading.svelte';
	import type { SwitchProps } from '../../types/index.js';

	let {
		active = false,
		radius = 'middle',
		inside = null,
		injClass = '',
		disabled = false,
		async = false,
		loading = {},
		trueChild,
		falseChild,
		onchange,
		onclick
	}: SwitchProps = $props();

	// 是否处于纵向拉长状态  is in the vertical elongation state
	let isLong = $state(false);
	const radiusObj = { none: 'rounded-none', middle: 'rounded-sm', full: 'rounded-full' };
	const setChangeFun = () => {
		if (!disabled) {
			if (!async) {
				active = !active;
				onchange?.(active);
			}
			onclick?.();
		}
	};
	$effect(() => {
		if (!disabled) {
			active = active;
			isLong = true;
			setTimeout(() => {
				isLong = false;
			}, 150);
		}
	});
</script>

<button
	onclick={setChangeFun}
	class="relative flex h-6 w-12 justify-around transition-all duration-500 active:opacity-80 {radiusObj[radius] || radiusObj.middle} {active
		? `bg-primary dark:bg-dark ${injClass}`
		: 'bg-black/10 dark:bg-white/20'} {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
>
	<div
		class="absolute top-0.5 h-5 w-5 bg-white text-center text-xs leading-5 text-black/80 transition-all duration-300 dark:bg-black dark:text-white/90 {radiusObj[
			radius
		] || radiusObj.middle}"
		style="left:{active ? '1.625rem' : '0.125rem'};transform:{isLong ? 'scaleX(1.3)' : 'scaleX(1)'}"
	>
		{#if inside === 'state'}
			<span class:hidden={!active}><div class="ml-2 mt-1 h-3 w-1 rounded-full bg-black/80 dark:bg-white/90"></div></span>
			<span class:hidden={active}><div class="ml-1 mt-1 h-3 w-3 rounded-full border-2 border-black/80 dark:border-white/90"></div></span>
		{:else if inside === 'loading'}
			<div class="m-0.5">
				<Loading width="full" height="full" {...loading} />
			</div>
		{:else if trueChild && falseChild}
			<span class={active ? '' : 'hidden'}>{@render trueChild?.()}</span>
			<span class={!active ? '' : 'hidden'}>{@render falseChild?.()}</span>
		{:else if Array.isArray(inside) && inside.length === 2}
			<span class={active ? '' : 'hidden'}>{inside[1]} </span>
			<span class={!active ? '' : 'hidden'}>{inside[0]} </span>
		{:else}{/if}
	</div>
</button>
