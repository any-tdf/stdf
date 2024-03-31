<script>
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;
	export let theme = false;
	export let inverse = false;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class={`${size} m-auto relative loading`} style="animation-duration: {1.2 / speed}s;-webkit-animation-duration: {1.2 / speed}s;">
	<div
		class="w-1/2 h-1/2 rounded-tl-full absolute shape1 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	/>
	<div
		class="w-1/2 h-1/2 rounded-tr-full absolute shape2 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	/>
	<div
		class="w-1/2 h-1/2 rounded-br-full absolute shape3 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	/>
	<div
		class="w-1/2 h-1/2 rounded-bl-full absolute shape4 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	/>
</div>

<style>
	.loading {
		animation: animationContainer 1.2s ease infinite;
	}
	.shape1 {
		animation: animationShape1 0.6s ease infinite alternate;
	}

	.shape2 {
		animation: animationShape2 0.6s ease infinite alternate;
	}

	.shape3 {
		animation: animationShape3 0.6s ease infinite alternate;
	}

	.shape4 {
		animation: animationShape4 0.6s ease infinite alternate;
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
			top: -10%;
			left: -10%;
		}
	}

	@keyframes animationShape2 {
		0% {
			top: 0;
			left: 50%;
		}
		100% {
			top: -10%;
			left: 60%;
		}
	}

	@keyframes animationShape3 {
		0% {
			top: 50%;
			left: 50%;
		}
		100% {
			top: 60%;
			left: 60%;
		}
	}

	@keyframes animationShape4 {
		0% {
			top: 50%;
			left: 0;
		}
		100% {
			top: 60%;
			left: -10%;
		}
	}
</style>
