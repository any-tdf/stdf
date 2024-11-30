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

<div class="{size} relative m-auto flex items-center">
	{#each [0, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125] as item, i}
		<div class="absolute left-0 right-0 flex" style="transform: rotate(calc(360deg / 8 * {i})); ">
			<div
				class="dot h-1.5 w-1.5 rounded-full{colorClass()}"
				style="background-color: {customColor[0]};animation-duration: {1 / speed}s ; animation-delay: calc({1 / speed}s * {item});"
			></div>
		</div>
	{/each}
</div>

<style>
	.dot {
		animation: pulse ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			transform: scale(0);
			opacity: 0.5;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
