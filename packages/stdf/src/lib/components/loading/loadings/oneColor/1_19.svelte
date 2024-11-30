<script lang="ts">
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), theme = false, inverse = false }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} loading relative m-auto" style="animation-duration: {1.6 / speed}s;-webkit-animation-duration: {1.6 / speed}s;">
	<div
		class="shape1 absolute h-1/3 w-1/3 rounded-full {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="shape2 absolute h-1/3 w-1/3 rounded-full {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="shape3 absolute h-1/3 w-1/3 rounded-full {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
	></div>
	<div
		class="shape4 absolute h-1/3 w-1/3 rounded-full {colorClass()}"
		style="background: {customColor[0]};animation-duration: {0.8 / speed}s;-webkit-animation-duration: {0.8 / speed}s;"
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
