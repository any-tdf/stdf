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

<div class="{size} m-auto flex flex-col justify-center">
	<div class="relative flex items-center justify-between">
		{#each [-0.375, -0.25, -0.125] as item}
			<div
				class="dot h-2 w-2 rounded-full{colorClass()}"
				style="background-color: {customColor[0]};animation-duration: {1.3 / speed}s;animation-delay: {(1.3 / speed) * item}s"
			></div>
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
