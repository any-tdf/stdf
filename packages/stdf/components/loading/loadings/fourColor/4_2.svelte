<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [size]
	 * @property {any} [customColor]
	 * @property {number} [speed]
	 */

	/** @type {Props} */
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) } = $props();
</script>

<div class="{size} m-auto relative loading" style="animation-duration: {1.6 / speed}s;-webkit-animation-duration: {1.6 / speed}s;">
	<div
		class="w-1/3 h-1/3 rounded-full absolute shape1"
		style="background: {customColor[0] || '#DA1414'};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="w-1/3 h-1/3 rounded-full absolute shape2"
		style="background: {customColor[1] || '#11BB8D'};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="w-1/3 h-1/3 rounded-full absolute shape3"
		style="background: {customColor[2] || '#7356BF'};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="w-1/3 h-1/3 rounded-full absolute shape4"
		style="background: {customColor[3] || '#FFC043'};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
</div>

<style>
	.loading {
		animation: animationContainer 1.6s ease infinite;
	}
	.shape1 {
		animation: animationShape1 0.8s ease infinite alternate;
	}

	.shape2 {
		animation: animationShape2 0.8s ease infinite alternate;
	}

	.shape3 {
		animation: animationShape3 0.8s ease infinite alternate;
	}

	.shape4 {
		animation: animationShape4 0.8s ease infinite alternate;
	}

	@keyframes animationContainer {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes animationShape1 {
		0% {
			top: 0;
			left: 0;
		}
		100% {
			top: 66.6666666667%;
			left: 66.6666666667%;
		}
	}

	@keyframes animationShape2 {
		0% {
			top: 0;
			left: 66.6666666667%;
		}
		100% {
			top: 66.6666666667%;
			left: 0;
		}
	}

	@keyframes animationShape3 {
		0% {
			top: 66.6666666667%;
			left: 66.6666666667%;
		}
		100% {
			top: 0;
			left: 0;
		}
	}

	@keyframes animationShape4 {
		0% {
			top: 66.6666666667%;
			left: 0;
		}
		100% {
			top: 0;
			left: 66.6666666667%;
		}
	}
</style>
