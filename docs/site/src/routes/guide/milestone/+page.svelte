<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import text from '../../../../../mds/guide/milestone.md';
	// @ts-ignore
	import text_en from '../../../../../mds/guide/milestone_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	const hljsText = mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-8 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html hljsText}
</article>
