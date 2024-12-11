<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	import text from '../../../../../mds/guide/compatibility.md';
	import text_en from '../../../../../mds/guide/compatibility_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const hljsText = mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose pb-12 dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html hljsText}
</article>
