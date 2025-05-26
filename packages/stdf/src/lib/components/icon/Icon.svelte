<script lang="ts">
	import { getContext } from 'svelte';
	import type { IconProps } from '../../types/index.js';

	let {
		type = 'symbol',
		name = '',
		size = 24,
		width = 0,
		height = 0,
		theme = false,
		opacity = 1,
		path = getContext('STDF-global-icon-svg-path') || 'fonts/symbol.svg',
		y = 0,
		injClass = '',
		children
	}: IconProps = $props();
</script>

{#if children}
	{@render children()}
{:else if type === 'iconify' || type === 'iconify-color'}
	<span
		class="{type} {name} relative{theme ? ' text-primary dark:text-dark' : ''} {injClass}"
		style="opacity:{opacity}; width:{width || size}px; height:{height || size}px; top:{y}px;"
	>
	</span>
{:else if type === 'symbol'}
	<svg
		width={width || size}
		height={height || size}
		class="relative{theme ? ' text-primary dark:text-dark' : ''} inline fill-current {injClass}"
		style="fill-opacity:{opacity}; top:{y}px;"
	>
		<use xlink:href="/{path}#{name}" />
	</svg>
{:else}{/if}
