<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import mdPluginText from '../../../../../../packages/rollup-plugin-md-ts/README_CN.md';
	// @ts-ignore
	import mdPluginText_en from '../../../../../../packages/rollup-plugin-md-ts/README.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(mdPluginText) : groupIconMdPlugin(mdPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-8 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</article>
