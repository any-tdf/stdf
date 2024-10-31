<script>
	import Loading from '../loading/Loading.svelte';

	/** @typedef {import('../../index.d').Switch} SwitchProps */
	/** @type {SwitchProps} */
	let {
		active = false,
		radius = 'base',
		inside = '',
		injClass = '',
		disabled = false,
		async = false,
		loading = {},
		trueChild,
		falseChild,
		onchange,
		onclick,
	} = $props();

	let isLong = $state(false); // 是否处于纵向拉长状态  is in the vertical elongation state
	const radiusObj = { none: 'rounded-none', base: 'rounded', full: 'rounded-full' };
	const setChangeFun = () => {
		if (!disabled) {
			if (!async) {
				active = !active;
				onchange && onchange(active);
			}
			onclick && onclick();
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={setChangeFun}
	class="flex justify-around w-12 h-6 relative transition-all duration-500 active:opacity-80 {radiusObj[radius] || radiusObj.base} {active
		? `bg-primary dark:bg-dark ${injClass}`
		: 'bg-black/10 dark:bg-white/20'} {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
>
	<div
		class="bg-white dark:bg-black absolute w-5 h-5 leading-5 top-0.5 transition-all duration-300 text-xs text-center text-black/80 dark:text-white/90 {radiusObj[
			radius
		] || radiusObj.base}"
		style="left:{active ? '1.625rem' : '0.125rem'};transform:{isLong ? 'scaleX(1.3)' : 'scaleX(1)'}"
	>
		{#if inside === 'state'}
			<span class:hidden={!active}><div class="bg-black/80 dark:bg-white/90 w-1 h-3 mt-1 ml-2 rounded-full"></div></span>
			<span class:hidden={active}><div class="w-3 h-3 mt-1 ml-1 border-2 border-black/80 dark:border-white/90 rounded-full"></div></span>
		{:else if inside === 'loading'}
			<div class="m-0.5">
				<Loading width="full" height="full" {...loading} />
			</div>
		{:else if inside === 'child'}
			<span class={active ? '' : 'hidden'}>{@render trueChild?.()}</span>
			<span class={!active ? '' : 'hidden'}>{@render falseChild?.()}</span>
		{:else if Array.isArray(inside) && inside.length === 2}
			<span class={active ? '' : 'hidden'}>{inside[1]} </span>
			<span class={!active ? '' : 'hidden'}>{inside[0]} </span>
		{:else}
			<!-- none -->
		{/if}
	</div>
</div>
