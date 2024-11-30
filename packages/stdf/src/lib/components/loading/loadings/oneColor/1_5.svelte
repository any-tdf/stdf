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
	class="{size} m-auto rounded-full{colorClass()}"
	style="background: {customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
></div>

<style>
	div {
		animation: ball-scale infinite linear 1s;
	}

	@keyframes ball-scale {
		0% {
			transform: scale(0.1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
