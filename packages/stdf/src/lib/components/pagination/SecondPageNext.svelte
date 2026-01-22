<script lang="ts">
	import Page from './Page.svelte';
	import type { SmallAreaRadius } from '../../types/index.js';

	type Props = {
		pageCol: number;
		Pages: number[];
		maxShowPage: number;
		radius: SmallAreaRadius;
		type: 'border' | 'block' | 'bold';
		bg: 'white' | 'surface' | 'gray' | 'theme';
		onclickItem: (index: number) => void;
	};
	let { pageCol = 3, Pages = [], maxShowPage = 9, radius = 'md', type = 'bold', bg = 'white', onclickItem }: Props = $props();

	// 背景样式
	// Background style
	const bgClass = {
		white: 'bg-white dark:bg-gray-800',
		surface: 'bg-bg-surface dark:bg-bg-surface-dark',
		gray: 'bg-bg-overlay dark:bg-bg-overlay-dark',
		theme: 'bg-primary-50 dark:bg-dark-950'
	};

	// 箭头颜色样式
	// Arrow color style
	const arrowClass = {
		white: 'border-t-white dark:border-t-gray-800',
		surface: 'border-t-bg-surface dark:border-t-bg-surface-dark',
		gray: 'border-t-bg-overlay dark:border-t-bg-overlay-dark',
		theme: 'border-t-primary-50 dark:border-t-dark-950'
	};
</script>

{#if Pages.length > 0}
	<div
		class="absolute -top-3 translate-x-1/2 -translate-y-full drop-shadow-sm dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
		style="width: calc({(pageCol / (maxShowPage + 2)) * 100}% + 8px);right:{(2.5 / (maxShowPage + 2)) * 100}%;"
	>
		<div
			class="second-page-contents grid max-h-29 w-full gap-y-2 overflow-y-auto rounded-lg {bgClass[bg] || bgClass['white']} p-1"
			style="grid-template-columns: repeat({pageCol}, minmax(0, 1fr));"
		>
			{#each Pages as item, index (index)}
				<Page onclick={() => onclickItem && onclickItem(item)} {type} {radius}>{item}</Page>
			{/each}
		</div>
		<div
			class="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 -translate-y-px border-8 border-t-8 border-transparent {arrowClass[bg] || arrowClass['white']}"
		></div>
	</div>
{/if}

<style>
	.second-page-contents::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
