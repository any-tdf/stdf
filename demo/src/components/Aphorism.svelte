<script>
	// 引入数据
	// import data
	import aphorisms from '../data/aphorisms';

	// 显示条数
	// number of items to display
	export let num = 0;

	// 是否紧凑模式
	// whether to use compact mode
	export let compact = false;

	// 从 aphorisms 随机取出 num 条数据
	// get num items from aphorisms randomly
	const aphorismsList = aphorisms.sort(() => Math.random() - 0.5).slice(0, num);
</script>

<div class={`${compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5`}>
	{#each aphorismsList as item}
		<div class:py-6={num > 1}>
			<div class="text-sm text-justify">{item.text}</div>
			<div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
		</div>
	{/each}
</div>
