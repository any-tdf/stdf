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

<div class="relative {size} m-auto">
	<div
		class="absolute{colorClass()} w-1/3 h-1/3 rounded-full loading1"
		style="background: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	></div>
	<div
		class="absolute{colorClass()} w-1/3 h-1/3 rounded-full loading2"
		style="background: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	></div>
</div>

<style>
	.loading1 {
		animation: loading1 1.5s infinite;
	}

	.loading2 {
		animation: loading2 1.5s infinite;
	}

	@keyframes loading1 {
		0% {
			transform: translate(200%, 200%);
		}
		25% {
			transform: translate(0, 200%);
		}
		50% {
			transform: translate(0, 0);
		}
		75% {
			transform: translate(200%, 0);
		}
		100% {
			transform: translate(200%, 200%);
		}
	}

	@keyframes loading2 {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(200%, 0);
		}
		50% {
			transform: translate(200%, 200%);
		}
		75% {
			transform: translate(0, 200%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
