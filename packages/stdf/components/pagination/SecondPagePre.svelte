<script>
	import Page from './Page.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {number} [pageCol]
	 * @property {any} [Pages]
	 * @property {number} [maxShowPage]
	 * @property {string} [radius]
	 * @property {string} [type]
	 * @property {(index: number) => void} [onclickItem]
	 */
	/** @type {Props} */
	let { pageCol = 3, Pages = [], maxShowPage = 7, radius = 'md', type = 'bold', onclickItem } = $props();
</script>

{#if Pages.length > 0}
	<div
		class="absolute -top-3 bg-white dark:bg-black grid -translate-x-1/2 -translate-y-full rounded-lg shadow dark:shadow-white/10 p-1 gap-y-2 max-h-[7.25rem] overflow-y-auto second-page-contents"
		style="width: calc({(pageCol / (maxShowPage + 2)) * 100}% + 8px);left:{(2.5 / (maxShowPage + 2)) *
			100}%;grid-template-columns: repeat({pageCol}, minmax(0, 1fr));"
	>
		{#each Pages as item}
			<Page onclick={() => onclickItem && onclickItem(item)} {type} {radius}>{item}</Page>
		{/each}
	</div>
	<div
		class="absolute -top-3 w-0 h-0 border-8 border-t-8 border-transparent -translate-x-1/2 border-t-white dark:border-t-black"
		style="left:{(2.5 / (maxShowPage + 2)) * 100}%;"
	></div>
{/if}

<style>
	.second-page-contents::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
