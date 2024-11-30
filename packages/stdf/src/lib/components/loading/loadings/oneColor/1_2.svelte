<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-dark border-l-dark/[1] dark:border-primary dark:border-l-primary/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-white border-l-white/[1] dark:border-black dark:border-l-black/[1]';
		} else {
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-primary border-l-primary/[1] dark:border-dark dark:border-l-dark/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-black border-l-black/[1] dark:border-white dark:border-l-white/[1]';
		}
	};
</script>

<div
	class="{size} m-auto animate-spin rounded-full border-2 {colorClass()}"
	style="border-color:{customColor[0] + '0D'};border-left-color:{customColor[0] + 'FF'};animation-duration: {1 /
		speed}s;-webkit-animation-duration: {1 / speed}s;"
></div>
