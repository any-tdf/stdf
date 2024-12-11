<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	import iconPluginText from '../../../../../../packages/rollup-plugin-stdf-icon/README_CN.md';
	import iconPluginText_en from '../../../../../../packages/rollup-plugin-stdf-icon/README.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(iconPluginText) : groupIconMdPlugin(iconPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article
	class="prose pb-12 dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-5xl'}"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html text}
</article>
