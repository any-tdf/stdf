<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [size]
	 * @property {any} [customColor]
	 * @property {number} [speed]
	 * @property {boolean} [inverse]
	 */

	/** @type {Props} */
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false } = $props();

	const borderClass = () => {
		return inverse
			? 'border-white/5 dark:border-black/5 border-l-dark dark:border-l-primary border-r-dark dark:border-r-primary'
			: 'border-black/5 dark:border-white/5 border-l-primary dark:border-l-dark border-r-primary dark:border-r-dark';
	};
</script>

<div
	class={`${size} m-auto border-4 rounded-full loading ${borderClass()}`}
	style={`border-color: ${customColor[0] || (inverse ? '' : '')} ${customColor[1] || (inverse ? '' : '')} ${
		customColor[0] || (inverse ? '' : '')
	} ${customColor[1] || (inverse ? '' : '')};animation-duration: ${2 / speed}s;-webkit-animation-duration: ${2 / speed}s;`}
></div>

<style>
	.loading {
		animation: loading-animation 2s ease-in-out infinite alternate;
	}

	@keyframes loading-animation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(720deg);
		}
	}
</style>
