<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NavBarProps } from '../../types';
	import { zh_CN, type LangProps } from '../../lang';

	// 当前语言
	// current language
	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const navBarLang: LangProps['navBar'] = currentLang.navBar;

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
	}: NavBarProps = $props();

	//图标大小
	//Icon size
	const iconSize = love ? 30 : 24;
</script>

<div
	class="h-12 w-full border-black/10 dark:border-white/10 flex justify-between leading-[3rem] {line
		? 'border-b '
		: ' '}bg-white dark:bg-black/50{love ? ' text-xl' : ''}{injClass === '' ? '' : ' ' + injClass}"
>
	{#if leftChild}
		{@render leftChild()}
	{:else if left === 'back'}
		<button class="text-center lining-nums min-w-[3rem] active:opacity-80" onclick={() => onclickLeft && onclickLeft()}>
			<Icon name="ri-arrow-left-s-line" size={iconSize} top={-2} />
		</button>
	{:else if left === null}
		<div class="w-4 h-full"></div>
	{:else}
		<button class="text-center lining-nums min-w-[3rem] active:opacity-80" onclick={() => onclickLeft && onclickLeft()}>
			<Icon {...left} />
		</button>
	{/if}
	<div class="flex-1 truncate" class:pl-2={left === null}>
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
				<button class="w-12 text-center active:opacity-80" onclick={() => onclickRight && onclickRight(i)}>
					<Icon {...icon} size={iconSize} />
				</button>
			{/each}
		{:else}{/if}
	</div>
</div>
