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
	<svg class="{size} origin-center overflow-visible" x="0px" y="0px" viewBox="0 0 37 37" preserveAspectRatio="xMidYMid meet">
		<path
			class="opacity-10 {colorClass()}"
			fill="none"
			style="stroke: {customColor[0]};"
			stroke-width="5"
			pathLength="100"
			d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
		>
		</path>
		<path
			class="car {colorClass()}"
			fill="none"
			style="stroke: {customColor[0]}; animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
			stroke-width="5"
			pathLength="100"
			d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
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
		transition: stroke 0.5s ease;
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
