<script>
	import { createEventDispatcher } from 'svelte';
	import Loading from '../loading/Loading.svelte';

	/**
	 * 是否选中
	 * Whether to select
	 * @type {boolean}
	 * @default false
	 */
	export let check = false;

	/**
	 * 圆角风格
	 * Rounded style
	 * @type {'none' | 'base' | 'full'}
	 * @default 'base'
	 */
	export let radius = 'base';

	/**
	 * 内部内容
	 * Inside content
	 * @type {'state' | 'loading' | 'slot' | [string, string]|''}
	 * @default ''
	 */
	export let inside = '';

	/**
	 * 注入 CSS
	 * Injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	/**
	 * 是否禁用
	 * is disabled
	 * @type {boolean}
	 * @default false
	 */
	export let disabled = false;

	/**
	 * 是否异步
	 * is async
	 * @type {boolean}
	 * @default false
	 */
	export let async = false;

	/**
	 * 加载状态
	 * loading status
	 * @type {object}
	 * @default {}
	 */
	export let loading = {}; // 加载状态  loading status

	let isLong = false; // 是否处于纵向拉长状态  is in the vertical elongation state
	const radiusObj = { none: 'rounded-none', base: 'rounded', full: 'rounded-full' };
	const dispatch = createEventDispatcher();
	const setChangeFun = () => {
		if (!disabled) {
			if (!async) {
				check = !check;
				dispatch('change', check);
			}
			dispatch('click');
		}
	};
	$: if (!disabled) {
		check = check;
		isLong = true;
		setTimeout(() => {
			isLong = false;
		}, 150);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={setChangeFun}
	class="flex justify-around w-12 h-6 relative transition-all duration-500 active:opacity-80 {radiusObj[radius] || radiusObj.base} {check
		? `bg-primary dark:bg-dark ${injClass}`
		: 'bg-black/10 dark:bg-white/20'} {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}"
>
	<div
		class="bg-white dark:bg-black absolute w-5 h-5 leading-5 top-0.5 transition-all duration-300 text-xs text-center text-black/80 dark:text-white/90 {radiusObj[
			radius
		] || radiusObj.base}"
		style="left:{check ? '1.625rem' : '0.125rem'};transform:{isLong ? 'scaleX(1.3)' : 'scaleX(1)'}"
	>
		{#if inside === 'state'}
			<span class:hidden={!check}><div class="bg-black/80 dark:bg-white/90 w-1 h-3 mt-1 ml-2 rounded-full" /></span>
			<span class:hidden={check}><div class="w-3 h-3 mt-1 ml-1 border-2 border-black/80 dark:border-white/90 rounded-full" /></span>
		{:else if inside === 'loading'}
			<div class="m-0.5">
				<Loading {...loading} width="full" height="full" />
			</div>
		{:else if inside === 'slot'}
			<span class={check ? '' : 'hidden'}><slot name="true" /></span>
			<span class={!check ? '' : 'hidden'}> <slot name="false" /></span>
		{:else if Array.isArray(inside) && inside.length === 2}
			<span class={check ? '' : 'hidden'}>{inside[1]} </span>
			<span class={!check ? '' : 'hidden'}>{inside[0]} </span>
		{:else}
			<!-- 不显示 -->
		{/if}
	</div>
</div>
