<script>
	import { mdTextToHljs } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	import text from '../../../../doc/guide/icon.md';
	import text_en from '../../../../doc/guide/icon_en.md';

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
