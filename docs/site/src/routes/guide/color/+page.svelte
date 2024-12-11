<script lang="ts">
	import Color from './Color.svelte';
	import ColorEn from './Color_en.svelte';

	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

{#if isZh}
	<Color />
{:else}
	<ColorEn />
{/if}
