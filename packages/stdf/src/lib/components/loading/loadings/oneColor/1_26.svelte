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

<div class="m-auto">
	<svg
		class="{size} origin-center overflow-visible"
		x="0px"
		y="0px"
		viewBox="0 0 37 37"
		height="37"
		width="37"
		preserveAspectRatio="xMidYMid meet"
	>
		<path
			class="opacity-10{colorClass()}"
			fill="none"
			style="stroke: {customColor[0]};"
			stroke-width="5"
			pathLength="100"
			d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"
		></path>
		<path
			class="car{colorClass()}"
			fill="none"
			style="stroke: {customColor[0]}; animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
			stroke-width="5"
			pathLength="100"
			d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"
		></path>
	</svg>
</div>

<style>
	.car {
		fill: none;
		stroke-dasharray: 15, 85;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: travel linear infinite;
		will-change: stroke-dasharray, stroke-dashoffset;
		transition: stroke 0.5s ease;
	}

	@keyframes travel {
		0% {
			stroke-dashoffset: 0;
		}

		100% {
			stroke-dashoffset: 100;
		}
	}
</style>
