<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} m-auto container relative flex flex-col rotate-45" style="animation-duration: {3.5 / speed}s;">
	<div
		class="w-[13.92px] h-[13.92px] absolute flex items-center justify-center overflow-hidden isolation"
		style="top: 8.25%; left: 8.25%; border-radius: 50% 50% calc(32px / 15);"
	>
		<div class="absolute top-0 left-0 w-full h-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
		<div
			class="half1 origin-bottom-right relative w-full h-full{colorClass()}"
			style="background-color: {customColor[0]}; animation-duration: {3.5 / speed}s;"
		></div>
	</div>
	<div
		class="w-[13.92px] h-[13.92px] absolute flex items-center justify-center overflow-hidden isolation"
		style="bottom: 8.25%; right: 8.25%; transform: rotate(180deg); align-self: flex-end; border-radius: 50% 50% calc(32px / 15);"
	>
		<div class="absolute top-0 left-0 w-full h-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
		<div
			class="half2 origin-bottom-right relative w-full h-full z-10{colorClass()}"
			style="background-color: {customColor[0]}; animation-delay: -{3.5 / speed / 2}s; animation-duration: {3.5 / speed}s;"
		></div>
	</div>
</div>

<style>
	.container {
		animation: rotate ease-in-out infinite;
	}

	.half1 {
		animation: flow linear infinite both;
		border-radius: 0 0 1.6px 0;
		transform: rotate(45deg) translate(-3%, 50%) scaleX(1.2);
	}

	.half2 {
		animation: flow linear infinite both;
		border-radius: 0 0 1.6px 0;
		transform: rotate(45deg) translate(-3%, 50%) scaleX(1.2);
	}

	@keyframes flow {
		0% {
			transform: rotate(45deg) translate(-3%, 50%) scaleX(1.2);
		}
		30% {
			transform: rotate(45deg) translate(115%, 50%) scaleX(1.2);
		}

		30.001%,
		50% {
			transform: rotate(0deg) translate(-85%, -85%) scaleX(1);
		}

		80%,
		100% {
			transform: rotate(0deg) translate(0%, 0%) scaleX(1);
		}
	}

	@keyframes rotate {
		0%,
		30% {
			transform: rotate(45deg);
		}

		50%,
		80% {
			transform: rotate(225deg);
		}

		100% {
			transform: rotate(405deg);
		}
	}
</style>
