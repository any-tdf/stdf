<script>
	import { mdTextToHljs } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	// @ts-ignore
	import text from '../../../../doc/guide/future.md';
	// @ts-ignore
	import text_en from '../../../../doc/guide/future_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const hljsText = mdTextToHljs((isZh ? text : text_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{@html hljsText}
</article>
