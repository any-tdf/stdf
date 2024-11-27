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
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' border-primary dark:border-dark' : ' border-black dark:border-white';
		}
	};
</script>

<div
	class="{size} m-auto border-2{colorClass()} rounded-full border-t-transparent dark:border-t-transparent animate-spin"
	style="border-color: {customColor[0]};border-top-color:transparent;animation-duration: {1 / speed}s;-webkit-animation-duration: {1 /
		speed}s;"
></div>
