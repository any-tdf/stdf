<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = []; //自定义颜色
	export let speed = 1; //速度系数，基础为1，数值越大，速度越快

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class={`${size} m-auto relative`}>
	<div
		class={`absolute${colorClass()} rounded-full w-1/4 h-1/4 top-1/2 loading1`}
		style={`left:0;background: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	/>
	<div
		class={`absolute${colorClass()} rounded-full w-1/4 h-1/4 top-1/2 loading2`}
		style={`left:25%;background: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	/>
	<div
		class={`absolute${colorClass()} rounded-full w-1/4 h-1/4 top-1/2 loading3`}
		style={`left:50%;background: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	/>
	<div
		class={`absolute${colorClass()} rounded-full w-1/4 h-1/4 top-1/2 loading4`}
		style={`left:75%;background: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	/>
	<div
		class={`absolute${colorClass()} rounded-full w-1/4 h-1/4 top-1/2 loading5`}
		style={`left:100%;background: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	/>
</div>

<style>
	.loading1 {
		animation: ball-elastic-dots-anim1 1s infinite;
	}

	.loading2 {
		animation: ball-elastic-dots-anim2 1s infinite;
	}

	.loading3 {
		animation: ball-elastic-dots-anim3 1s infinite;
	}

	.loading4 {
		animation: ball-elastic-dots-anim4 1s infinite;
	}

	.loading5 {
		animation: ball-elastic-dots-anim5 1s infinite;
	}

	@keyframes ball-elastic-dots-anim1 {
		0%,
		100% {
			left: 0;
			transform: translateX(-50%) translateY(-50%) scale(1);
		}

		50% {
			left: -50%;
			transform: translateX(-50%) translateY(-50%) scale(0.67);
		}
	}

	@keyframes ball-elastic-dots-anim2 {
		0%,
		100% {
			left: 25%;
			transform: translateX(-50%) translateY(-50%) scale(1);
		}

		50% {
			left: 0%;
			transform: translateX(-50%) translateY(-50%) scale(0.67);
		}
	}

	@keyframes ball-elastic-dots-anim3 {
		0%,
		100% {
			left: 50%;
			transform: translateX(-50%) translateY(-50%) scale(1);
		}

		50% {
			left: 50%;
			transform: translateX(-50%) translateY(-50%) scale(0.67);
		}
	}

	@keyframes ball-elastic-dots-anim4 {
		0%,
		100% {
			left: 75%;
			transform: translateX(-50%) translateY(-50%) scale(1);
		}

		50% {
			left: 100%;
			transform: translateX(-50%) translateY(-50%) scale(0.67);
		}
	}

	@keyframes ball-elastic-dots-anim5 {
		0%,
		100% {
			left: 100%;
			transform: translateX(-50%) translateY(-50%) scale(1);
		}

		50% {
			left: 150%;
			transform: translateX(-50%) translateY(-50%) scale(0.67);
		}
	}
</style>
