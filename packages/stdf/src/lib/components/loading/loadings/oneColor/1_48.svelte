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

<div class="{size} relative m-auto flex -rotate-90 items-center">
	{#each [1, 0.9, 0.6, 0.4] as item, i}
		<div
			class="dot absolute left-0 flex h-full w-full flex-col items-center"
			style="animation-duration: {1.6 / speed}s;animation-delay: {(1.6 / speed) * -(0.4 - i * 0.09)}s;"
		>
			<div
				class="h-1/4 w-1/4 rounded-full{colorClass()}"
				style="background-color: {customColor[0]};opacity: {item};transform: scale({1 - 0.1 * i});"
			></div>
		</div>
	{/each}
</div>

<style>
	.dot {
		animation: swing linear infinite;
	}

	@keyframes swing {
		0% {
			transform: rotate(0deg);
		}

		15% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		65% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
