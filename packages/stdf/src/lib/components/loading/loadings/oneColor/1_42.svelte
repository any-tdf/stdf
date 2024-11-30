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

<div class="{size} container relative m-auto inline-block" style="animation-duration: {1.5 / speed}s;">
	{#each [120, -120, 0] as item}
		<div class="absolute h-full" style="transform: rotate({item}deg);left: 37.5%;width:25%;">
			<div
				class="dot absolute left-0 top-0 h-0 w-full rounded-full{colorClass()}"
				style="background-color: {customColor[0]};padding-bottom: 100%;animation-duration: {1.5 / speed}s;"
			></div>
		</div>
	{/each}
</div>

<style>
	.container {
		animation: spin infinite linear;
	}
	.dot {
		animation: wobble infinite ease-in-out;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes wobble {
		0%,
		100% {
			transform: translateY(0%);
		}
		50% {
			transform: translateY(65%);
		}
	}
</style>
