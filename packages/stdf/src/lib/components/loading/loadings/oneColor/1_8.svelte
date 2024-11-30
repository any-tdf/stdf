<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div
	class="{size} loading m-auto flex items-center justify-between"
	style="animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
>
	<div class="{colorClass()} h-2 w-2 rounded-full" style="background: {customColor[0]}"></div>
	<div class="{colorClass()} h-2 w-2 rounded-full" style="background: {customColor[0]}"></div>
	<div class="{colorClass()} h-2 w-2 rounded-full" style="background: {customColor[0]}"></div>
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
