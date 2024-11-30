<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} loading relative m-auto box-border">
	<div
		class="absolute{colorClass()} ball rounded-full"
		style="background: {customColor[0]};animation-duration: {speed >= 1 ? 0.6 / speed : 0.6}s;-webkit-animation-duration: {speed >= 1
			? 0.6 / speed
			: 0.6}s;"
	></div>
	<div
		class="absolute top-0 right-0{colorClass()} steps step1"
		style="background: {customColor[0]};animation-duration: {speed >= 1 ? 1.8 / speed : 1.8}s;-webkit-animation-duration: {speed >= 1
			? 1.8 / speed
			: 1.8}s;"
	></div>
	<div
		class="absolute top-0 right-0{colorClass()} steps step2"
		style="background: {customColor[0]};animation-duration: {speed >= 1 ? 1.8 / speed : 1.8}s;-webkit-animation-duration: {speed >= 1
			? 1.8 / speed
			: 1.8}s;"
	></div>
	<div
		class="absolute top-0 right-0{colorClass()} steps step3"
		style="background: {customColor[0]};animation-duration: {speed >= 1 ? 1.8 / speed : 1.8}s;-webkit-animation-duration: {speed >= 1
			? 1.8 / speed
			: 1.8}s;"
	></div>
</div>

<style>
	.loading {
		width: 42px;
		height: 32px;
	}

	.ball {
		bottom: 32%;
		left: 18%;
		width: 14px;
		height: 14px;
		transform-origin: center bottom;
		animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
	}

	.steps {
		width: 14px;
		height: 2px;
		transform: translate(60%, 0);
		animation: ball-climbing-dot-steps 1.8s linear infinite;
	}

	.step1 {
		animation-delay: 0ms;
	}

	.step2 {
		animation-delay: -600ms;
	}

	.step3 {
		animation-delay: -1200ms;
	}

	@keyframes ball-climbing-dot-jump {
		0% {
			transform: scale(1, 0.8);
		}

		20% {
			transform: scale(0.8, 1.1);
		}

		40% {
			transform: scale(1, 1);
		}

		50% {
			bottom: 125%;
		}

		46% {
			transform: scale(1, 1);
		}

		80% {
			transform: scale(0.8, 1.1);
		}

		90% {
			transform: scale(0.8, 1.1);
		}

		100% {
			transform: scale(1, 0.8);
		}
	}

	@keyframes ball-climbing-dot-steps {
		0% {
			top: 0;
			right: 0;
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			top: 100%;
			right: 100%;
			opacity: 0;
		}
	}
</style>
