<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import type { NavBarProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const navBarLang: LangProps['navBar'] = currentLang.navBar;

	let {
		title = navBarLang.title,
		titleAlign = 'left',
		left = 'back',
		rights = [],
		line = true,
		injClass = '',
		love = false,
		onclickLeft,
		onclickRight,
		titleChild,
		leftChild,
		rightChild
	}: NavBarProps = $props();

	//图标大小
	//Icon size
	const iconSize = $derived(love ? 30 : 24);

	// 标题对齐方式
	// Title alignment
	const titleAlignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };
</script>

<div
	class="flex h-12 w-full justify-between border-black/10 leading-12 dark:border-white/10 {line
		? 'border-b '
		: ' '}bg-white dark:bg-black{love ? ' text-xl' : ''}{injClass === '' ? '' : ' ' + injClass}"
>
	{#if leftChild}
		{@render leftChild()}
	{:else if left === 'back'}
		<button class="min-w-12 text-center lining-nums active:opacity-80" onclick={() => onclickLeft && onclickLeft()} aria-label="back">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={iconSize} height={iconSize} class="mx-auto block fill-current">
				<path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
			</svg>
		</button>
	{:else if left === null}
		<div class="h-full w-4"></div>
	{:else}
		<button class="min-w-12 text-center lining-nums active:opacity-80" onclick={() => onclickLeft && onclickLeft()}>
			<Icon {...left} />
		</button>
	{/if}
	<div class="flex-1 truncate" class:pl-2={left === null}>
		{#if titleChild}
			{@render titleChild()}
		{:else}
			<div class={titleAlignClass[titleAlign] || titleAlignClass['left']}>{title}</div>
		{/if}
	</div>
	<div class="flex">
		{#if rightChild}
			{@render rightChild()}
		{:else if rights.length > 0}
			{#each rights as icon, i (icon.name)}
				<button class="w-12 text-center active:opacity-80" onclick={() => onclickRight && onclickRight(i)}>
					<Icon {...icon} size={iconSize} />
				</button>
			{/each}
		{:else}{/if}
	</div>
</div>
