<script lang="ts">
	import type { TabContentProps } from '../../types/index.js';

	let { show = true, children }: TabContentProps = $props();
</script>

<div class:hidden={!show} class="flex-1">
	{@render children?.()}
</div>
