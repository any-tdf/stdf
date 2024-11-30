<script lang="ts">
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' text-dark dark:text-primary' : ' text-white dark:text-black';
		} else {
			return theme ? ' text-primary dark:text-dark' : ' text-black dark:text-white';
		}
	};
</script>

<div class="{size} m-auto" style="animation-duration: {2 / speed}s;-webkit-animation-duration: {2 / speed}s;">
	<svg
		class="container overflow-visible will-change-transform origin-center{colorClass()}"
		viewBox="0 0 40 40"
		style="color: {customColor[0]}"
	>
		<circle class="track stroke-[5px] opacity-0" stroke="currentColor" cx="20" cy="20" r="17.5" fill="none" />
		<circle
			class="car stroke-[5px]"
			style="animation-duration: {(2 / speed) * 0.75}s;-webkit-animation-duration: {(2 / speed) * 0.75}s;"
			stroke="currentColor"
			cx="20"
			cy="20"
			r="17.5"
			fill="none"
		/>
	</svg>
</div>

<style>
	.container {
		animation: rotate 2s linear infinite;
	}

	.car {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: stretch 1.5s ease-in-out infinite;
		will-change: stroke-dasharray, stroke-dashoffset;
		transition: stroke 0.5s ease;
	}

	.track {
		transition: stroke 0.5s ease;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes stretch {
		0% {
			stroke-dasharray: 0, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 75, 150;
			stroke-dashoffset: -25;
		}
		100% {
			stroke-dashoffset: -100;
		}
	}
</style>
