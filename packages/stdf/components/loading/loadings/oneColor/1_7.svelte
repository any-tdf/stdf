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
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class={`${size} m-auto flex items-center`}>
	<div
		class={`flex-1${colorClass()} rounded-full w-1/2 h-1/2 loading1`}
		style="background: {customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
	></div>
	<div
		class={`flex-1${colorClass()} rounded-full w-1/2 h-1/2 loading2`}
		style="background: {customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
	></div>
</div>

<style>
	.loading1 {
		animation: loading infinite 1s -0.4s cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	.loading2 {
		animation: loading infinite 1s cubic-bezier(0.2, 0.68, 0.18, 1.08);
	}

	@keyframes loading {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(0.1);
			opacity: 0.6;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
