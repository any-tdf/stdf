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
	{#each [0, 1, 2] as i}
		<div
			class="absolute{colorClass()} w-1/3 h-1/3 rounded-full loading"
			style="animation-delay: {i - 2}s;background: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 /
				speed}s;"
		></div>
	{/each}
</div>

<style>
	.loading {
		animation: loading 1.5s linear infinite;
	}

	@keyframes loading {
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
</style>
