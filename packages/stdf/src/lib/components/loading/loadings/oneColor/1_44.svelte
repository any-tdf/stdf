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
	{#each [0, 0.4, 0.8] as item, i}
		<div
			class="dot absolute left-0 top-0 flex h-full w-full items-center"
			style="animation-duration: {2.5 / speed}s;transform: translateX({32 * item}px);animation-delay: {2.5 / speed / (-1.5 * i)}s"
		>
			<div class="w-2 rounded-full h-2{colorClass()}" style="background-color: {customColor[0]};"></div>
		</div>
	{/each}
</div>

<style>
	.dot {
		animation: leapFrog ease infinite;
	}

	@keyframes leapFrog {
		0% {
			transform: translateX(0) rotate(0deg);
		}

		33.333% {
			transform: translateX(0) rotate(180deg);
		}

		66.666% {
			transform: translateX(calc(32px * -0.38)) rotate(180deg);
		}

		99.999% {
			transform: translateX(calc(32px * -0.78)) rotate(180deg);
		}

		100% {
			transform: translateX(0) rotate(0deg);
		}
	}
</style>
