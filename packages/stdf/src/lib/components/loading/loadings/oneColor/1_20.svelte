<script lang="ts">
	type Props = { size?: string; customColor?: any[]; speed?: number; theme?: boolean; inverse?: boolean };
	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1), theme = false, inverse = false }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme
				? ' border-dark/5 border-l-dark/[1] dark:border-primary/5 dark:border-l-primary/[1] border-r-dark/[1] dark:border-r-primary/[1]'
				: ' border-white/5 border-l-white/[1] dark:border-black/5 dark:border-l-black/[1] border-r-white/[1] dark:border-r-black/[1]';
		} else {
			return theme
				? ' border-primary/5 dark:border-dark/5 border-l-primary/[1] dark:border-l-dark/[1] border-r-primary/[1] dark:border-r-dark/[1]'
				: ' border-black/5 dark:border-white/5 border-l-black/[1] dark:border-l-white/[1] border-r-black/[1] dark:border-r-white/[1]';
		}
	};
</script>

<div
	class="{size} loading m-auto rounded-full border-4 {colorClass()}"
	style="border-color: {customColor[0] + '0D'} {customColor[0] + 'FF'} {customColor[0] + '0D'} {customColor[0] +
		'FF'};animation-duration: {2 / speed}s;-webkit-animation-duration: {2 / speed}s;"
></div>

<style>
	.loading {
		animation: loading-animation 2s ease-in-out infinite alternate;
	}

	@keyframes loading-animation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(720deg);
		}
	}
</style>
