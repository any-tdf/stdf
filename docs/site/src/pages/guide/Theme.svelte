<script>
	import { mdTextToHljs } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	import theme from '../../../../mds/guide/theme.md';
	import theme_en from '../../../../mds/guide/theme_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs((isZh ? theme : theme_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{@html text}
</article>
