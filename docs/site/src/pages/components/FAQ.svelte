<script>
	// @ts-nocheck

	import { mdTextToHljs } from '../../utils/index';

	export let guide = 'button';
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let loading = true;
	const getMdStrFunc = async nav => {
		loading = true;
		const rawObj = await import(`../../../../doc/components/${nav}/FAQ${isZh ? '' : '_en'}.md`);
		const mdStr = rawObj.default;
		loading = false;
		return mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="'));
	};
	$: guideText = getMdStrFunc(guide).then(res => {
		// @ts-ignore
		guideText = res;
	});
</script>

<p class="text-xs mb-4 text-black/40 dark:text-white/30">
	{isZh
		? '注：请将开发中遇到的问题或想法提到 GitHub Issue，后续会筛选出有代表性的问题整理在此处。'
		: 'Note: Please raise any issues or ideas encountered in development to GitHub Issue, and then select representative issues to organize here.'}
</p>
<article
	class="prose dark:prose-invert max-w-none pb-12 prose-table:break-all overflow-x-auto prose-td:whitespace-nowrap md:prose-td:whitespace-normal"
>
	{#if loading}
		{isZh ? '请等待...' : 'Please wait...'}
	{:else}
		{@html guideText}
	{/if}
</article>
<div class="pb-8 text-xs flex gap-2">
	<a
		href={'https://github.com/any-tdf/stdf/edit/main/doc/components/' + guide + '/FAQ' + (isZh ? '' : '_en') + '.md'}
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
