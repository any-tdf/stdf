<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} relative m-auto">
	{#each [0, -2] as item}
		<div
			class="dot absolute left-0 top-0 h-full w-full rounded-full{colorClass()}"
			style="background-color: {customColor[0]};animation-duration: {2 / speed}s;animation-delay: {2 / speed / item}s;"
		></div>
	{/each}
</div>

<style>
	.dot {
		animation: pulse linear infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0);
			opacity: 1;
		}
		50% {
			transform: scale(1);
			opacity: 0.25;
		}
	}
</style>
