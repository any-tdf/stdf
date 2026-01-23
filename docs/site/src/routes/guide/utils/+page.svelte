<script lang="ts">
	import { mdTextToHljs } from '../../../utils/index';
	import { isWideScreenStore } from '../../../store';

	// @ts-ignore
	import utils from '../../../../../mds/guide/utils.md';
	// @ts-ignore
	import utils_en from '../../../../../mds/guide/utils_en.md';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const text = mdTextToHljs((isZh ? utils : utils_en).replace(/<a href="/g, '<a target="_blank" href="'));
</script>

<article
	class="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto pb-12 {$isWideScreenStore
		? 'max-w-full'
		: 'max-w-7xl'}"
>
	{@html text}
</article>
