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
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-dark border-l-dark/[1] dark:border-primary dark:border-l-primary/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-white border-l-white/[1] dark:border-black dark:border-l-black/[1]';
		} else {
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-primary border-l-primary/[1] dark:border-dark dark:border-l-dark/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-black border-l-black/[1] dark:border-white dark:border-l-white/[1]';
		}
	};
</script>

<div
	class={`${size} m-auto border-2 rounded-full animate-spin ${colorClass()}`}
	style={`border-color:${customColor[0] + '0D'};border-left-color:${customColor[0] + 'FF'};animation-duration: ${
		1 / speed
	}s;-webkit-animation-duration: ${1 / speed}s;`}
></div>
