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

<div
	class=" {size} m-auto relative top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full overflow-hidden"
	style="height:4px"
>
	<div class="absolute left-0 w-full h-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
	<div
		class="container w-full h-full rounded-full{colorClass()}"
		style="background-color: {customColor[0]}; animation-duration: {2 / speed}s"
	></div>
</div>

<style>
	.container {
		animation: zoom ease-in-out infinite;
	}

	@keyframes zoom {
		0%,
		100% {
			transform: translateX(-95%);
		}
		50% {
			transform: translateX(95%);
		}
	}
</style>
