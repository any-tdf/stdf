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
	{#each [[-0.375, 1], [-0.375, 0.8], [-0.3, 0.6], [-0.225, 0.4], [-0.15, 0.2], [-0.075, 0.1]] as item}
		<div
			class="line absolute left-0 h-1 w-full rounded-full{colorClass()}"
			style="background-color: {customColor[0]};top: calc(50% - 2px);animation-duration: {0.9 / speed}s;animation-delay: {(0.9 / speed) *
				item[0]}s;opacity: {item[1]};"
		></div>
	{/each}
</div>

<style>
	.line {
		animation: rotate ease-in-out infinite alternate;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(180deg);
		}
	}
</style>
