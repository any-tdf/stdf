<script>
	import { mdTextToHljs, groupIconMdPlugin } from '../../utils/index';
	import { isWideScreenStore } from '../../store';

	// @ts-ignore
	import iconPluginText from '../../../../../packages/rollup-plugin-stdf-icon/README_CN.md';
	// @ts-ignore
	import iconPluginText_en from '../../../../../packages/rollup-plugin-stdf-icon/README.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(iconPluginText) : groupIconMdPlugin(iconPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="'),
	);
</script>

<article
	class="prose prose-strong:text-primary dark:prose-strong:text-dark dark:prose-invert pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	{@html text}
</article>
