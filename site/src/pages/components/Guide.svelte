<script>
	// @ts-nocheck

	import { mdTextToHljs } from './../../utils/index';
	import { themeStore, sysThemeStore, isWideScreenStore } from '../../store';

	export let guide = 'button';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	let loading = true;
	$: theme = $themeStore === 'auto' ? ($sysThemeStore === 'dark' ? 'dark' : 'light') : $themeStore;
	const getMdStrFunc = async nav => {
		loading = true;
		const rawObj = await import(`../../../../doc/components/${nav}/guide${isZh ? '' : '_en'}.md`);
		const mdStr = rawObj.default;
		loading = false;
		return mdTextToHljs(
			mdStr
				.replace(/<img src="/g, `<img class="w-full md:w-1/2${theme === 'dark' ? ' invert' : ''}" src="./assets/images/guide/`)
				.replace(/<a href="/g, '<a target="_blank" href="'),
		);
	};
	$: guideText = getMdStrFunc(guide).then(res => {
		guideText = res;
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
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{#if loading}
		{isZh ? '请等待...' : 'Please wait...'}
	{:else}
		{@html guideText}
	{/if}
</article>

<div class="pb-8 text-xs flex gap-2">
	<a
		href={'https://github.com/any-tdf/stdf/edit/main/doc/components/' + guide + '/guide' + (isZh ? '' : '_en') + '.md'}
		target="_blank"
		class="flex text-primary dark:text-dark"
	>
		<span class="h-4 w-4 mr-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" style="fill: currentColor;">
				<path
					d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
				/>
			</svg>
		</span>
		{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'}
	</a>
</div>

<button
	class="hidden md:block fixed right-2 bottom-4 z-50 p-1.5 w-8 h-8 rounded-full bg-primary dark:bg-dark text-white dark:text-black shadow-md shadow-primary/50 dark:shadow-dark/50"
	on:click={changeFullFunc}
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
