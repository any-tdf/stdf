<script>
	/** @typedef {import('../../index.d').Icon} IconProps */
	/** @type {IconProps} */
	let { name = '', size = 24, theme = false, alpha = 1, path = 'fonts/symbol.svg', top = 0, injClass = '', children } = $props();
</script>

<i class={`cursor-pointer relative ${theme ? 'text-primary dark:text-dark' : ''} ${injClass}`} style="top:{top}px;">
	{#if name === 'slot'}
		{#if children}
			{@render children()}
		{/if}
	{:else}
		<svg width={size} height={size === 'full' ? '100%' : size} style="fill: currentColor;fill-opacity: {alpha};display: inline;">
			<use xlink:href="/{path}#{name}" />
		</svg>
	{/if}
</i>
