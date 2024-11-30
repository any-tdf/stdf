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

<div class="{size} m-auto flex flex-col justify-center">
	<svg
		class="{size} m-auto h-full w-full origin-center overflow-visible"
		x="0px"
		y="0px"
		viewBox="0 0 55 23.1"
		preserveAspectRatio="xMidYMid meet"
	>
		<path
			class="opacity-10{colorClass()}"
			fill="none"
			style="stroke: {customColor[0]};"
			stroke-width="5"
			pathLength="100"
			d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
		/>
		<path
			class="car{colorClass()}"
			fill="none"
			style="stroke: {customColor[0]}; animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
			stroke-width="5"
			pathLength="100"
			d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
		/>
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
			stroke-dashoffset: 100;
		}
	}
</style>
