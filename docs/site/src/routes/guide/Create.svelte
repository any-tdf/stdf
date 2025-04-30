<script>
	import { mdTextToHljs, groupIconMdPlugin } from '../../utils/index.js';
	import { isWideScreenStore } from '../../store.js';

	// @ts-ignore
	import createText from '../../../../../../packages/create-stdf/README_CN.md';
	// @ts-ignore
	import createText_en from '../../../../../../packages/create-stdf/README.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = groupIconMdPlugin(
		(isZh ? mdTextToHljs(createText) : mdTextToHljs(createText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</article>
