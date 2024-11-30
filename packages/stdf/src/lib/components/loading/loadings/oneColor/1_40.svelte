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
	const brList = [
		[24, -35],
		[16, -6],
		[8, 23],
		[-1, 51],
		[38, -17.5],
		[30, 10],
		[22, 39],
		[14, 67],
		[53, -0.8],
		[44.5, 27],
		[36, 55.7],
		[28.7, 84.3],
		[66.8, 15],
		[58.8, 43],
		[50, 72],
		[42, 100]
	];
</script>

<div class="{size} relative m-auto flex items-center">
	{#each [-0.48, -0.4, -0.32, -0.24, -0.4, -0.32, -0.24, -0.16, -0.32, -0.24, -0.16, -0.08, -0.24, -0.16, -0.08, -0] as item, i}
		<div
			class="dot absolute h-1 w-1 rounded-full{colorClass()}"
			style="background-color: {customColor[0]};bottom: calc({brList[i][0]}% + 1.6px);right: calc({brList[
				i
			][1]}% + 1.6px);animation-duration: {1.5 / speed}s;animation-delay: {(1.5 / speed) * item}s"
		></div>
	{/each}
</div>

<style>
	.dot {
		animation: jump ease-in-out infinite;
	}

	@keyframes jump {
		0%,
		100% {
			transform: translateY(120%);
		}

		50% {
			transform: translateY(-120%);
		}
	}
</style>
