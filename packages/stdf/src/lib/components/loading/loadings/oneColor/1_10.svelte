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

<div class="{size} m-auto flex items-center justify-between">
	{#each [0, 1, 2] as i}
		<div
			class="{colorClass()} loading h-2 w-2 rounded-full"
			style="animation-delay: {i === 1 ? -0.3 : 0}s;background: {customColor[0]};animation-duration: {1 /
				speed}s;-webkit-animation-duration: {1 / speed}s;"
		></div>
	{/each}
</div>

<style>
	.loading {
		animation: loading 1s infinite linear;
	}

	@keyframes loading {
		50% {
			opacity: 0.2;
			transform: scale(0.75);
		}
		100% {
			opacity: 1;
			transform: scale(1.2);
		}
	}
</style>
