<script>
	import { mdTextToHljs, groupIconMdPlugin } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	// @ts-ignore
	import quickStartText from '../../../../doc/guide/quickStart.md';
	// @ts-ignore
	import quickStartText_en from '../../../../doc/guide/quickStart_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = groupIconMdPlugin(
		mdTextToHljs(isZh ? quickStartText : quickStartText_en).replace(/<a href="/g, '<a target="_blank" href="'),
	);
</script>

<article
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{@html text}
</article>
