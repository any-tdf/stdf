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

<div
	class={`${size} m-auto flex justify-between items-center loading`}
	style="animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
>
	<div class={`${colorClass()} rounded-full w-2 h-2`} style="background: {customColor[0]}" />
	<div class={`${colorClass()} rounded-full w-2 h-2`} style="background: {customColor[0]}" />
	<div class={`${colorClass()} rounded-full w-2 h-2`} style="background: {customColor[0]}" />
</div>

<style>
	.loading {
		animation: loading 1s cubic-bezier(0.7, -0.13, 0.22, 0.86) infinite;
	}

	@keyframes loading {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(0.6);
		}
		100% {
			transform: rotate(360deg) scale(1);
		}
	}
</style>
