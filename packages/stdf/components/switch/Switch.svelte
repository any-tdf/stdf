<script>
	import { createEventDispatcher } from 'svelte';
	import Loading from '../loading/Loading.svelte';

	export let check = false; // 是否选中 is checked
	export let radius = 'base'; // 圆角风格：none/base/full rounded style: none/base/full
	export let inside = []; // 内部内容 inside content
	export let injClass = ''; // 注入 CSS injection CSS
	export let disabled = false; // 是否禁用 is disabled
	export let async = false; // 是否异步  is async
	export let loading = {}; // 加载状态  loading status

	let isLong = false; // 是否处于纵向拉长状态  is in the vertical elongation state
	const radiusObj = {
		none: 'rounded-none',
		base: 'rounded',
		full: 'rounded-full',
	};
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
	class={`flex justify-around w-12 h-6 relative transition-all duration-500 active:opacity-80 ${
		check ? `bg-primary dark:bg-dark ${injClass}` : 'bg-black/10 dark:bg-white/10'
	} ${radiusObj[radius] || radiusObj.base} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
>
	<div
		class={`bg-white dark:bg-gray2 absolute top-[2px] left-[2px] transition-all duration-300 text-xs text-center text-gray6 ${
			radiusObj[radius] || radiusObj.base
		}`}
		style="height:calc(1.5rem - 4px);width:calc(1.5rem - 4px);line-height:calc(1.5rem - 4px);left: {check
			? 'calc(1.5rem + 2px)'
			: '2px'};transform:scaleX({isLong ? '1.3' : '1'});})"
	>
		{#if inside === 'state'}
			<span class:hidden={!check}><div class="bg-gray6 w-1 h-3 mt-1 ml-2 rounded-full" /></span>
			<span class:hidden={check}><div class="w-3 h-3 mt-1 ml-1 border-2 border-gray6 rounded-full" /></span>
		{:else if inside === 'loading'}
			<div class="m-0.5">
				<Loading {...loading} width="full" height="full" />
			</div>
		{:else if inside === 'slot'}
			<span class={check ? '' : 'hidden'}><slot name="true" /></span>
			<span class={!check ? '' : 'hidden'}> <slot name="false" /></span>
		{:else if Array.isArray(inside) && inside.length !== 0}
			<span class={check ? '' : 'hidden'}>{inside[1]} </span>
			<span class={!check ? '' : 'hidden'}>{inside[0]} </span>
		{:else}
			<!-- 不显示 -->
		{/if}
	</div>
</div>
