<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import theme from '../../../../../mds/guide/theme.md';
	// @ts-ignore
	import theme_en from '../../../../../mds/guide/theme_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs((isZh ? theme : theme_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</article>
