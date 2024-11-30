<script lang="ts">
	type Props = { size?: string; customColor?: any[]; speed?: number; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), inverse = false }: Props = $props();

	const bgClass = () => {
		return inverse ? 'bg-dark dark:bg-primary' : 'bg-primary dark:bg-dark';
	};
	const bgClass2 = () => {
		return inverse ? 'bg-white/50 dark:bg-black/50' : 'bg-black/50 dark:bg-white/50';
	};
</script>

<div class="{size} relative m-auto rotate-45">
	<div
		class="shape1 absolute left-0 top-0 h-1/3 w-1/3 {bgClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	></div>
	<div
		class="shape2 absolute right-0 top-0 h-1/3 w-1/3 {bgClass2()}"
		style="background: {customColor[1]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	></div>
	<div
		class="shape3 absolute bottom-0 right-0 h-1/3 w-1/3 {bgClass()}"
		style="background: {customColor[0]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	></div>
	<div
		class="shape4 absolute bottom-0 left-0 h-1/3 w-1/3 {bgClass2()}"
		style="background: {customColor[1]};animation-duration: {0.5 / speed}s;-webkit-animation-duration: {0.5 / speed}s;"
	></div>
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
