<script lang="ts">
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false } = $props();

	const bgClass = () => {
		return inverse ? 'bg-dark dark:bg-primary' : 'bg-primary dark:bg-dark';
	};
	const bgClass2 = () => {
		return inverse ? 'bg-white/50 dark:bg-black/50' : 'bg-black/50 dark:bg-white/50';
	};
</script>

<div class="{size} loading relative m-auto" style="animation-duration: {1.2 / speed}s;-webkit-animation-duration: {1.2 / speed}s;">
	<div
		class="shape1 absolute h-1/2 w-1/2 rounded-tl-full {bgClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	></div>
	<div
		class="shape2 absolute h-1/2 w-1/2 rounded-tr-full {bgClass2()}"
		style="background: {customColor[1]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	></div>
	<div
		class="shape3 absolute h-1/2 w-1/2 rounded-br-full {bgClass()}"
		style="background: {customColor[0]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	></div>
	<div
		class="shape4 absolute h-1/2 w-1/2 rounded-bl-full {bgClass2()}"
		style="background: {customColor[1]};animation-duration: {0.6 / speed}s;-webkit-animation-duration: {0.6 / speed}s;"
	></div>
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
