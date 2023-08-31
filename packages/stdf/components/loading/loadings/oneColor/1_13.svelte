<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = []; //自定义颜色
	export let speed = 1; //速度系数，基础为1，数值越大，速度越快

	const colorClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' border-primary dark:border-dark' : ' border-black dark:border-white';
		}
	};
</script>

<div class={`${size} m-auto relative box-border`}>
	<div
		class={`absolute top-1/2 left-1/2 ${size} m-auto border-2 !border-r-transparent !border-l-transparent rounded-full${colorClass()} loading`}
		style="border-color: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	/>
	<div
		class={`absolute top-1/2 left-1/2 w-1/2 h-1/2 m-auto border-2 !border-t-transparent !border-b-transparent rounded-full${colorClass()} loading`}
		style="animation-direction: reverse;border-color: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 /
			speed}s;"
	/>
</div>

<style>
	.loading {
		animation: ball-clip-rotate-multiple-rotate 1.5s ease-in-out infinite;
	}

	@keyframes ball-clip-rotate-multiple-rotate {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}

		50% {
			transform: translate(-50%, -50%) rotate(180deg);
		}

		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
