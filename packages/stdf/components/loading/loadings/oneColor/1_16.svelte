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

<div class={`${size} m-auto flex justify-between items-center`}>
	{#each [0, 1, 2] as i}
		<div
			class={`${colorClass()} rounded-full w-2 h-2 loading`}
			style="animation-delay: {i * 100 - 300}ms;background: {customColor[0]};animation-duration: {1 /
				speed}s;-webkit-animation-duration: {1 / speed}s;"
		/>
	{/each}
</div>

<style>
	.loading {
		animation: ball-fall 1s ease-in-out infinite;
	}

	@keyframes ball-fall {
		0% {
			opacity: 0;
			transform: translateY(-145%);
		}

		10% {
			opacity: 0.5;
		}

		20% {
			opacity: 1;
			transform: translateY(0);
		}

		80% {
			opacity: 1;
			transform: translateY(0);
		}

		90% {
			opacity: 0.5;
		}

		100% {
			opacity: 0;
			transform: translateY(145%);
		}
	}
</style>
