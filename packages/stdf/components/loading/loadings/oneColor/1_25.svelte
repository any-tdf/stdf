<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [theme]
	 * @property {boolean} [inverse]
	 * @property {string} [size]
	 * @property {any} [customColor]
	 * @property {number} [speed]
	 */

	/** @type {Props} */
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) } = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' stroke-dark dark:stroke-primary' : ' stroke-white dark:stroke-black';
		} else {
			return theme ? ' stroke-primary dark:stroke-dark' : ' stroke-black dark:stroke-white';
		}
	};
</script>

<div class="m-auto">
	<svg class="{size} origin-center will-change-transform overflow-visible" viewBox="0 0 35 35">
		<rect
			class="opacity-10 {colorClass()}"
			style="stroke: {customColor[0]};"
			x="2.5"
			y="2.5"
			fill="none"
			stroke-width="5px"
			width="32.5"
			height="32.5"
		/>
		<rect
			class="car {colorClass()}"
			style="stroke: {customColor[0]};  animation-duration: {1.2 / speed}s;-webkit-animation-duration: {1.2 / speed}s;"
			x="2.5"
			y="2.5"
			fill="none"
			stroke-width="5px"
			width="32.5"
			height="32.5"
			pathLength="100"
		/>
	</svg>
</div>

<style>
	.car {
		stroke-dasharray: 25, 75;
		stroke-dashoffset: 0;
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
