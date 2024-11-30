<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' stroke-dark dark:stroke-primary' : ' stroke-white dark:stroke-black';
		} else {
			return theme ? ' stroke-primary dark:stroke-dark' : ' stroke-black dark:stroke-white';
		}
	};
</script>

<div class="{size} m-auto">
	<svg
		class="h-full w-full origin-center overflow-visible"
		x="0px"
		y="0px"
		viewBox="0 0 50 31.25"
		height="31.25"
		width="50"
		preserveAspectRatio="xMidYMid meet"
	>
		<path
			class="track opacity-10{colorClass()}"
			style="stroke: {customColor[0]};"
			stroke-width="4"
			fill="none"
			pathLength="100"
			d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
		/>
		<path
			class="car{colorClass()}"
			style="stroke: {customColor[0]}; animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
			stroke-width="4"
			fill="none"
			pathLength="100"
			d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
		/>
	</svg>
</div>

<style>
	.car {
		stroke-dasharray: 100;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		stroke-linejoin: round;
		animation:
			travel ease-in-out infinite,
			fade ease-out infinite;
		will-change: stroke-dasharray, stroke-dashoffset;
	}

	.track {
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@keyframes travel {
		0% {
			stroke-dashoffset: 100;
		}

		75% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}

		20%,
		55% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>
