<script lang="ts">
	type Props = { theme?: boolean; inverse?: boolean; size?: string; customColor?: string[]; speed?: number };

	let { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const colorClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' text-primary dark:text-dark' : ' text-black dark:text-white';
		}
	};
</script>

<div
	class="{size} m-auto border-2 rounded-full{colorClass()} animate-spin border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent"
	style="border-color: {customColor[0]};border-top-color:transparent;border-bottom-color:transparent;animation-duration: {1 /
		speed}s;-webkit-animation-duration: {1 / speed}s;"
></div>
