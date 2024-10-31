<script>
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const navBarLang = currentLang.navBar;

	/** @typedef {import('../../index.d').NavBar} NavBarProps */
	/** @type {NavBarProps} */
	let {
		title = navBarLang.title,
		left = 'back',
		rights = [],
		line = true,
		injClass = '',
		love = false,
		onclickLeft,
		onclickRight,
		titleChild,
		leftChild,
		rightChild,
	} = $props();

	//图标大小
	//Icon size
	const iconSize = love ? 30 : 24;
</script>

<div
	class={`h-12 w-full border-black/10 dark:border-white/10 flex justify-between leading-[3rem] ${
		line ? 'border-b ' : ' '
	}bg-white dark:bg-black/50${love ? ' text-xl' : ''}${injClass === '' ? '' : ' ' + injClass}`}
>
	{#if leftChild}
		{@render leftChild()}
	{:else if left === 'back'}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="text-center lining-nums min-w-[3rem] active:opacity-80" on:click={() => onclickLeft && onclickLeft()}>
			<Icon name="ri-arrow-left-s-line" size={iconSize} top={-2} />
		</div>
	{:else if left === 'none'}
		<div class="w-4 h-full"></div>
	{:else}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="text-center lining-nums min-w-[3rem] active:opacity-80" on:click={() => onclickLeft && onclickLeft()}>
			<Icon {...left} />
		</div>
	{/if}
	<div class="flex-1 truncate" class:pl-2={left === 'none'}>
		{#if titleChild}
			{@render titleChild()}
		{:else}
			{title}
		{/if}
	</div>
	<div class="flex">
		{#if rightChild}
			{@render rightChild()}
		{:else if rights.length > 0}
			{#each rights as icon, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="w-12 text-center active:opacity-80" on:click={() => onclickRight && onclickRight(i)}>
					<Icon {...icon} size={iconSize} />
				</div>
			{/each}
		{:else}
			<!-- none -->
		{/if}
	</div>
</div>
