<script>
	/** @typedef {import('../../index.d.ts').TabContent} TabContentProps */
	/** @type {TabContentProps} */
	let { show = true, children } = $props();
</script>

<div class:hidden={!show} class="flex-1">
	{@render children?.()}
</div>
