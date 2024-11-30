<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };
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
	{#each [-0.45, -0.3, -0.15, 0] as item}
		<div
			class="bar h-full w-[3px]{colorClass()}"
			style="background-color: {customColor[0]}; animation-duration: {1 / speed}s; animation-delay: {1 * item}s"
		></div>
	{/each}
</div>

<style>
	.bar {
		animation: grow ease-in-out infinite;
	}

	@keyframes grow {
		0%,
		100% {
			transform: scaleY(0.3);
		}

		50% {
			transform: scaleY(1);
		}
	}
</style>
