<script lang="ts">
	import { onMount } from 'svelte';
	import { mdTextToHljs } from './../../utils/index';
	import { themeStore, sysThemeStore, isWideScreenStore } from '../../store';

	interface Props {
		guide?: string;
	}

	let { guide = 'button' }: Props = $props();

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	let loading = $state(true);
	let theme = $derived($themeStore === 'auto' ? ($sysThemeStore === 'dark' ? 'dark' : 'light') : $themeStore);
	const getMdStrFunc = async (nav: string) => {
		loading = true;
		const rawObj = await import(`../../../../mds/components/${nav}/guide${isZh ? '' : '_en'}.md`);
		const mdStr = rawObj.default;
		loading = false;
		return mdTextToHljs(
			mdStr
				.replace(/<img src="/g, `<img class="w-full md:w-1/2${theme === 'dark' ? ' invert' : ''}" src="./assets/images/guide/`)
				.replace(/<a href="/g, '<a target="_blank" href="')
		);
	};
	let guideText: string | null = $state(null);
	onMount(async () => {
		guideText = await getMdStrFunc(guide);
	});

	// 全屏
	const changeFullFunc = () => {
		if ($isWideScreenStore) {
			isWideScreenStore.set(false);
			localStorage.setItem('isFull', 'notFull');
		} else {
			isWideScreenStore.set(true);
			localStorage.setItem('isFull', 'full');
		}
	};
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{#if loading}
		{isZh ? '请等待...' : 'Please wait...'}
	{:else}
		{@html guideText}
	{/if}
</article>

<div class="flex gap-2 pb-8 text-xs">
	<!-- main -> next -->
	<a
		href={'https://github.com/any-tdf/stdf/edit/main/docs/mds/components/' + guide + '/guide' + (isZh ? '' : '_en') + '.md'}
		target="_blank"
		class="text-primary dark:text-dark flex"
	>
		<span class="mr-1 h-4 w-4">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" style="fill: currentColor;">
				<path
					d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
				/>
			</svg>
		</span>
		{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'}
	</a>
</div>

<button
	class="bg-primary shadow-primary/50 dark:bg-dark dark:shadow-dark/50 fixed bottom-4 right-2 z-50 hidden h-8 w-8 rounded-full p-1.5 text-white shadow-md md:block dark:text-black"
	onclick={changeFullFunc}
>
	{#if $isWideScreenStore}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><path
				d="M20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20ZM11 5H5V19H11V15H13V19H19V5H13V9H11V5ZM15 9L18 12L15 15V13H9V15L6 12L9 9V11H15V9Z"
				fill="currentColor"
			></path></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><path
				d="M20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20ZM11 5H5V10.999H7V9L10 12L7 15V13H5V19H11V17H13V19H19V13H17V15L14 12L17 9V10.999H19V5H13V7H11V5ZM13 13V15H11V13H13ZM13 9V11H11V9H13Z"
				fill="currentColor"
			></path></svg
		>
	{/if}
</button>
