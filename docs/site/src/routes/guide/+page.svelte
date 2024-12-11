<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	import quickStartText from '../../../../mds/guide/quickStart.md';
	import quickStartText_en from '../../../../mds/guide/quickStart_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = groupIconMdPlugin(
		mdTextToHljs(isZh ? quickStartText : quickStartText_en).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article
	class="prose pb-12 dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</article>
