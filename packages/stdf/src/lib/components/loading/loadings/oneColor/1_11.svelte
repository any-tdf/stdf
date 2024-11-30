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
	{#each [0, 1, 2, 3, 4] as i}
		<div
			class="absolute -left-1/2 top-1/4{colorClass()} loading h-4 w-4 rounded-full opacity-60"
			style="animation-delay: {-0.5 * i}s, {-0.5 * (i + 1)}s;top:calc(5);background: {customColor[0]};animation-duration: {2.5 /
				speed}s;-webkit-animation-duration: {2.5 / speed}s;"
		></div>
	{/each}
</div>

<style>
	.loading {
		animation:
			loading1 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1),
			loading2 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1);
	}

	@keyframes loading1 {
		50% {
			left: 100%;
		}
	}

	@keyframes loading2 {
		50% {
			transform: scale(0.3, 0.3);
		}
	}
</style>
