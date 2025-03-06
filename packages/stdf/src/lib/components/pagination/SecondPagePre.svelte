<script lang="ts">
	import Page from './Page.svelte';

	type Props = {
		pageCol: number;
		Pages: number[];
		maxShowPage: number;
		radius: string;
		type: string;
		onclickItem: (index: number) => void;
	};
	let { pageCol = 3, Pages = [], maxShowPage = 7, radius = 'md', type = 'bold', onclickItem }: Props = $props();
</script>

{#if Pages.length > 0}
	<div
		class="second-page-contents absolute -top-3 grid max-h-[7.25rem] -translate-x-1/2 -translate-y-full gap-y-2 overflow-y-auto rounded-lg bg-white p-1 shadow-sm dark:bg-black dark:shadow-white/10"
		style="width: calc({(pageCol / (maxShowPage + 2)) * 100}% + 8px);left:{(2.5 / (maxShowPage + 2)) *
			100}%;grid-template-columns: repeat({pageCol}, minmax(0, 1fr));"
	>
		{#each Pages as item}
			<Page onclick={() => onclickItem && onclickItem(item)} {type} {radius}>{item}</Page>
		{/each}
	</div>
	<div
		class="absolute -top-3 h-0 w-0 -translate-x-1/2 border-8 border-t-8 border-transparent border-t-white dark:border-t-black"
		style="left:{(2.5 / (maxShowPage + 2)) * 100}%;"
	></div>
{/if}

<style>
	.second-page-contents::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
