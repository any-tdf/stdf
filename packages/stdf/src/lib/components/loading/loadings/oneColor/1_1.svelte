<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' border-primary dark:border-dark' : ' border-black dark:border-white';
		}
	};
</script>

<div
	class="{size} m-auto border-2{colorClass()} animate-spin rounded-full border-t-transparent dark:border-t-transparent"
	style="border-color: {customColor[0]};border-top-color:transparent;animation-duration: {1 / speed}s;-webkit-animation-duration: {1 /
		speed}s;"
></div>
