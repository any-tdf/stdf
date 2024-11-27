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
			return theme ? ' text-primary dark:text-dark' : ' text-black dark:text-white';
		}
	};
</script>

<div
	class="{size} m-auto border-2 rounded-full{colorClass()} border-t-transparent border-b-transparent dark:border-t-transparent dark:border-b-transparent animate-spin"
	style="border-color: {customColor[0]};border-top-color:transparent;border-bottom-color:transparent;animation-duration: {1 /
		speed}s;-webkit-animation-duration: {1 / speed}s;"
></div>
