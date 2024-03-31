<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} m-auto relative">
	{#each [0, -2] as item}
		<div
			class="dot absolute top-0 left-0 w-full h-full rounded-full{colorClass()}"
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
