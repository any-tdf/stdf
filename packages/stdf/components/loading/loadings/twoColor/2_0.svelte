<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [inverse]
	 * @property {string} [size]
	 * @property {any} [customColor]
	 * @property {number} [speed]
	 */

	/** @type {Props} */
	let { inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) } = $props();

	const outerBorderClass = () => {
		return inverse ? ' border-white/10 dark:border-black/10' : ' border-black/10 dark:border-white/10';
	};
	const innerColorClass = () => {
		return inverse
			? ' border-transparent dark:border-transparent border-l-dark dark:border-l-primary'
			: ' border-transparent dark:border-transparent border-l-primary dark:border-l-dark';
	};
</script>

<div
	class={`${size} m-auto border-2 p-0.5 rounded-full animate-spin${outerBorderClass()}`}
	style="border-color:{customColor[0]};;animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
>
	<div
		class={`w-full h-full border-2 rounded-full${innerColorClass()}`}
		style="border-color:{customColor[1] && 'transparent'};border-left-color:{customColor[1]}"
	></div>
</div>
