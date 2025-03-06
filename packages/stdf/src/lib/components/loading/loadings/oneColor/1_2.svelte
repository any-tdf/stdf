<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme
				? ' border-dark/5 border-l-dark/[1] dark:border-primary/5 dark:border-l-primary/[1]'
				: ' border-white/5 border-l-white/[1] dark:border-black/5 dark:border-l-black/[1]';
		} else {
			return theme
				? ' border-primary/5 border-l-primary/[1] dark:border-dark/5 dark:border-l-dark/[1]'
				: ' border-black/5 border-l-black/[1] dark:border-white/5 dark:border-l-white/[1]';
		}
	};
</script>

<div
	class="{size} m-auto animate-spin rounded-full border-2 {colorClass()}"
	style="border-color:{customColor[0] + '0D'};border-left-color:{customColor[0] + 'FF'};animation-duration: {1 /
		speed}s;-webkit-animation-duration: {1 / speed}s;"
></div>
