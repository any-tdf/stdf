<script lang="ts">
	import { getContext } from 'svelte';
	import type { IconProps } from '../../types/index.js';

	let {
		name = '',
		size = 24,
		theme = false,
		alpha = 1,
		path = getContext('STDF-global-icon-svg-path') || 'fonts/symbol.svg',
		top = 0,
		injClass = '',
		children
	}: IconProps = $props();
</script>

<i class="relative{theme ? ' text-primary dark:text-dark' : ''} {injClass}" style="top:{top}px;">
	{#if children}
		{@render children()}
	{:else}
		<svg width={size} height={size === 'full' ? '100%' : size} class="inline fill-current" style="fill-opacity: {alpha};">
			<use xlink:href="/{path}#{name}" />
		</svg>
	{/if}
</i>
