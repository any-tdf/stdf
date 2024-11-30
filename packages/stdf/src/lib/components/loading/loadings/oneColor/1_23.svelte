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

<div class="{size} relative m-auto -translate-x-0.5">
	{#each new Array(12) as item, i}
		<div
			class="absolute left-1/2 flex h-8 w-[3px] flex-col gap-5 rounded-full bg-transparent"
			style="transform: rotate(calc(360deg / -12*{i}));"
		>
			<div
				class="h-1/5 rounded-full line{colorClass()}"
				style="background: {customColor[0]};animation-delay: calc( {1 / speed}s / -12 * {i}); animation-duration: {1 /
					speed}s;-webkit-animation-duration: {1 / speed}s;"
			></div>
		</div>
	{/each}
</div>

<style>
	.line {
		animation: pulse ease-in-out infinite;
		transition: background-color 0.3s ease;
		transform-origin: center bottom;
	}

	@keyframes pulse {
		0%,
		80%,
		100% {
			transform: scaleY(0.75);
			opacity: 0;
		}
		20% {
			transform: scaleY(1);
			opacity: 1;
		}
	}
</style>
