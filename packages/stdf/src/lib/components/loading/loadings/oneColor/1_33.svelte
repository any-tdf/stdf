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

<div class="{size} container relative m-auto flex flex-col" style="animation-duration: {3.5 / speed}s;">
	<div
		class="isolation absolute flex h-[13.92px] w-[13.92px] items-center justify-center overflow-hidden"
		style="top: 8.25%; left: 8.25%; border-radius: 50% 50% calc(32px / 15);"
	>
		<div class="absolute left-0 top-0 h-full w-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
		<div
			class="half1 relative w-full origin-bottom-right h-full{colorClass()}"
			style="background-color: {customColor[0]}; animation-duration: {3.5 / speed}s;"
		></div>
	</div>
	<div
		class="isolation absolute flex h-[13.92px] w-[13.92px] items-center justify-center overflow-hidden"
		style="bottom: 8.25%; right: 8.25%; transform: rotate(180deg); align-self: flex-end; border-radius: 50% 50% calc(32px / 15);"
	>
		<div class="absolute left-0 top-0 h-full w-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
		<div
			class="half2 relative h-full w-full origin-bottom-right z-10{colorClass()}"
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
