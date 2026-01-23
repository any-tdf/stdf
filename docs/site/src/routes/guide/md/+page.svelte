<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import mdPluginText from '../../../../../mds/guide/mdPlugin.md';
	// @ts-ignore
	import mdPluginText_en from '../../../../../mds/guide/mdPlugin_en.md';

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
	{@html text}
</article>
