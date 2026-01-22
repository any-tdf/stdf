<script lang="ts">
	import { getContext } from 'svelte';
	import type { IconProps } from '../../types/index.js';

	let {
		type = 'symbol',
		name = '',
		size = 24,
		width = 0,
		height = 0,
		state,
		theme = false,
		opacity = 1,
		path = getContext('STDF-global-icon-svg-path') || 'fonts/symbol.svg',
		y = 0,
		injClass = '',
		children
	}: IconProps = $props();

	// 状态颜色映射
	// state color mapping
	const stateColorClass: Record<string, string> = {
		theme: 'text-primary dark:text-dark',
		success: 'text-success',
		warning: 'text-warning',
		error: 'text-error',
		info: 'text-info'
	};

	const stateClass = $derived(state ? stateColorClass[state] || '' : theme ? stateColorClass.theme : '');
</script>

{#if children}
	{@render children()}
{:else if type === 'iconify' || type === 'iconify-color'}
	<span
		class="{type} {name} relative {stateClass} {injClass}"
		style="opacity:{opacity}; width:{width || size}px; height:{height || size}px; top:{y}px;"
	>
	</span>
{:else if type === 'symbol'}
	<svg
		width={width || size}
		height={height || size}
		class="relative {stateClass} inline fill-current {injClass}"
		style="fill-opacity:{opacity}; top:{y}px;"
	>
		<use xlink:href="/{path}#{name}" />
	</svg>
{:else}{/if}
