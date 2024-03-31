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
	<div class="flex justify-between items-center">
		{#each [-0.45, -0.3, -0.15, 0] as item}
			<div
				class="dot w-1.5 h-1.5 rounded-full{colorClass()}"
				style="background-color: {customColor[0]};animation-duration: {1 / speed}s;animation-delay: {(1 / speed) * item}s"
			></div>
		{/each}
	</div>
</div>

<style>
	.dot {
		animation: jump ease-in-out infinite;
	}

	@keyframes jump {
		0%,
		100% {
			transform: translateY(100%);
		}

		50% {
			transform: translateY(-100%);
		}
	}
</style>
