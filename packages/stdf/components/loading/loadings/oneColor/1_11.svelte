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
	{#each [0, 1, 2, 3, 4] as i}
		<div
			class={`absolute -left-1/2 top-1/4${colorClass()} rounded-full w-4 h-4 opacity-60 loading`}
			style="animation-delay: {-0.5 * i}s, {-0.5 * (i + 1)}s;top:calc(5);background: {customColor[0]};animation-duration: {2.5 /
				speed}s;-webkit-animation-duration: {2.5 / speed}s;"
		/>
	{/each}
</div>

<style>
	.loading {
		animation:
			loading1 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1),
			loading2 2.5s infinite cubic-bezier(0.25, 0, 0.75, 1);
	}

	@keyframes loading1 {
		50% {
			left: 100%;
		}
	}

	@keyframes loading2 {
		50% {
			transform: scale(0.3, 0.3);
		}
	}
</style>
