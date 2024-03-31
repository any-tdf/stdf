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

<div class={`${size} m-auto relative rotate-45`}>
	<div
		class="w-1/3 h-1/3 absolute left-0 top-0 shape1 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	/>
	<div
		class="w-1/3 h-1/3 absolute right-0 top-0 shape2 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	/>
	<div
		class="w-1/3 h-1/3 absolute right-0 bottom-0 shape3 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	/>
	<div
		class="w-1/3 h-1/3 absolute left-0 bottom-0 shape4 {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	/>
</div>

<style>
	.shape1 {
		animation: animationShape1 0.5s ease infinite alternate;
	}

	.shape2 {
		animation: animationShape2 0.5s ease infinite alternate;
	}

	.shape3 {
		animation: animationShape3 0.5s ease infinite alternate;
	}

	.shape4 {
		animation: animationShape4 0.5s ease infinite alternate;
	}

	@keyframes animationShape1 {
		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(16px, 16px);
		}
	}

	@keyframes animationShape2 {
		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(-16px, 16px);
		}
	}

	@keyframes animationShape3 {
		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(-16px, -16px);
		}
	}

	@keyframes animationShape4 {
		0% {
			transform: translate(0, 0);
		}

		100% {
			transform: translate(16px, -16px);
		}
	}
</style>
