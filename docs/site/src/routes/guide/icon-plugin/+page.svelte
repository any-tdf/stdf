<script lang="ts">
	import { mdTextToHljs, groupIconMdPlugin } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import iconPluginText from '../../../../../mds/guide/iconPlugin.md';
	// @ts-ignore
	import iconPluginText_en from '../../../../../mds/guide/iconPlugin_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs(
		(isZh ? groupIconMdPlugin(iconPluginText) : groupIconMdPlugin(iconPluginText_en)).replace(/<a href="/g, '<a target="_blank" href="')
	);
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-8 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	{@html text}
</article>
