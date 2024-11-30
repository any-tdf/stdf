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

<div class="relative {size} m-auto">
	<div
		class="absolute{colorClass()} loading1 h-1/3 w-1/3 rounded-full"
		style="background: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	></div>
	<div
		class="absolute{colorClass()} loading2 h-1/3 w-1/3 rounded-full"
		style="background: {customColor[0]};animation-duration: {1.5 / speed}s;-webkit-animation-duration: {1.5 / speed}s;"
	></div>
</div>

<style>
	.loading1 {
		animation: loading1 1.5s infinite;
	}

	.loading2 {
		animation: loading2 1.5s infinite;
	}

	@keyframes loading1 {
		0% {
			transform: translate(200%, 200%);
		}
		25% {
			transform: translate(0, 200%);
		}
		50% {
			transform: translate(0, 0);
		}
		75% {
			transform: translate(200%, 0);
		}
		100% {
			transform: translate(200%, 200%);
		}
	}

	@keyframes loading2 {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(200%, 0);
		}
		50% {
			transform: translate(200%, 200%);
		}
		75% {
			transform: translate(0, 200%);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>
