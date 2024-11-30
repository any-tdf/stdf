<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' border-primary dark:border-dark' : ' border-black dark:border-white';
		}
	};
</script>

<div class="{size} relative m-auto box-border">
	<div
		class="absolute left-1/2 top-1/2 {size} m-auto border-2 !border-l-transparent !border-r-transparent rounded-full{colorClass()} loading"
		style="border-color: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	></div>
	<div
		class="absolute left-1/2 top-1/2 m-auto h-1/2 w-1/2 border-2 !border-b-transparent !border-t-transparent rounded-full{colorClass()} loading"
		style="animation-direction: reverse;border-color: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 /
			speed}s;"
	></div>
</div>

<style>
	.loading {
		animation: ball-clip-rotate-multiple-rotate 1.5s ease-in-out infinite;
	}

	@keyframes ball-clip-rotate-multiple-rotate {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}

		50% {
			transform: translate(-50%, -50%) rotate(180deg);
		}

		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
