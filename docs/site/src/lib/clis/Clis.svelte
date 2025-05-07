<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import codeGroupSvgData from '../../utils/code-group-svg-data';
	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showCli = $state(0);
	let intervalTime: ReturnType<typeof setInterval>;
	let animation = $state(true);
	let isClicked = $state(false);
	let isHover = $state(false);
	// 每 3 秒切换一次
	onMount(() => {
		intervalTime = setInterval(() => {
			// 当是最后一个时立马切换到第一个，并且动画结束
			if (showCli === codeGroupSvgData.length - 1) {
				showCli = 0;
				animation = false;
			} else {
				animation = true;
				showCli++;
			}
		}, 6000);
	});
	onDestroy(() => {
		clearInterval(intervalTime);
	});
</script>

<div class="inline-flex justify-center">
	<div
		class="w-18 relative overflow-hidden rounded-l-lg border border-black/5 border-r-transparent bg-black/5 text-xs dark:border-white/10 dark:border-r-transparent dark:bg-white/10"
	>
		<div class="absolute {animation ? 'transition-all duration-300' : ''}" style="top: -{showCli * 28}px">
			{#each codeGroupSvgData as cli}
				<div class="flex h-7 items-center gap-1 px-3">
					<span class="translate-y-px">{@html cli.svg}</span>
					{cli.name}
				</div>
			{/each}
		</div>
	</div>
	<button
		type="button"
		onmouseenter={() => (isHover = true)}
		onmouseleave={() => (isHover = false)}
		class="relative inline-flex items-center justify-center rounded-r-lg border border-black/5 bg-black/5 px-4 py-1 transition-all duration-300 dark:border-white/10 dark:bg-white/10"
		onclick={async () => {
			await navigator.clipboard.writeText(codeGroupSvgData[showCli].cli);
			isClicked = true;
			setTimeout(() => {
				isClicked = false;
			}, 2000);
		}}
	>
		<code class="cursor-copy text-sm opacity-80">{codeGroupSvgData[showCli].cli}</code>
		<div
			class="bg-primary dark:bg-dark rounded-xs absolute -top-3 left-1/2 size-3 -translate-x-1/2 rotate-45 transition-all {isHover
				? '-translate-y-1/2 opacity-100'
				: '-translate-y-4 opacity-0'}"
		></div>
		<div
			class="bg-primary dark:bg-dark absolute -top-8 left-1/2 -translate-x-1/2 rounded-sm px-2 py-1 text-xs text-white transition-all dark:text-black {isHover
				? 'translate-y-0 opacity-100'
				: '-translate-y-2 opacity-0'}"
		>
			{isZh ? (isClicked ? '已复制' : '复制') : isClicked ? 'Copied' : 'Copy'}
		</div>
	</button>
</div>
