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

<div class="{size} m-auto flex flex-col justify-center">
	<div class="relative flex items-center justify-between">
		{#each [-0.375, -0.25, -0.125] as item}
			<div
				class="dot w-2 h-2 rounded-full{colorClass()}"
				style="background-color: {customColor[0]};animation-duration: {1.3 / speed}s;animation-delay: {(1.3 / speed) * item}s"
			/>
		{/each}
	</div>
</div>

<style>
	.dot {
		animation: pulse ease-in-out infinite both;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0);
		}

		50% {
			transform: scale(1);
		}
	}
</style>
