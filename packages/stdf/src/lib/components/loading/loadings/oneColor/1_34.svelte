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

<div class="{size} flex flex-col justify-center">
	<div class="{size} relative m-auto overflow-hidden rounded-full" style="height:4px">
		<div class="absolute h-full w-full opacity-10{colorClass()}" style="background-color: {customColor[0]};"></div>
		<div
			class="container h-full w-full rounded-full{colorClass()}"
			style="background-color: {customColor[0]}; animation-duration: {1.5 / speed}s"
		></div>
	</div>
</div>

<style>
	.container {
		animation: zoom ease-in-out infinite;
	}

	@keyframes zoom {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
