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
		viewBox="0 0 40 40"
		height="40"
		width="40"
		preserveAspectRatio="xMidYMid meet"
	>
		<path
			class="opacity-10{colorClass()}"
			style="stroke: {customColor[0]};"
			fill="none"
			stroke-width="4"
			pathLength="100"
			d="M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z"
		>
		</path>
		<path
			class="car{colorClass()}"
			style="stroke: {customColor[0]}; animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
			fill="none"
			stroke-width="4"
			pathLength="100"
			d="M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z"
		>
		</path>
	</svg>
</div>

<style>
	.car {
		stroke-dasharray: 15, 85;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: travel linear infinite;
		will-change: stroke-dasharray, stroke-dashoffset;
	}

	@keyframes travel {
		0% {
			stroke-dashoffset: 0;
		}

		100% {
			stroke-dashoffset: -100;
		}
	}
</style>
