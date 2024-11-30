<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const borderClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' border-primary dark:border-dark' : ' border-black dark:border-white';
		}
	};
	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} relative m-auto">
	<div
		class="absolute h-full w-full border-2 !border-l-transparent !border-r-transparent rounded-full{borderClass()} loading1"
		style="border-color: {customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
	></div>
	<div
		class="absolute left-1/4 top-1/4 h-1/2 w-1/2 rounded-full{colorClass()} loading2"
		style="background: {customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
	></div>
</div>

<style>
	.loading1 {
		animation: ball-clip-rotate-multiple-rotate 1s ease-in-out infinite;
	}

	.loading2 {
		animation: ball-clip-rotate-pulse-scale 1s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
	}

	@keyframes ball-clip-rotate-multiple-rotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes ball-clip-rotate-pulse-scale {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}

		30% {
			opacity: 0.3;
			transform: scale(0.15);
		}
	}
</style>
