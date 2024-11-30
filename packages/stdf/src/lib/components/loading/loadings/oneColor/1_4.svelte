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

<div class="{size} m-auto flex flex-col justify-center">
	<div
		class="relative m-auto h-8 w-8 border-2 rounded-full{colorClass()} animate-spin border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent"
		style="border-color: {customColor[0]};border-top-color:transparent;border-bottom-color:transparent;animation-duration: {1 /
			speed}s;-webkit-animation-duration: {1 / speed}s;"
	>
		<div
			class="absolute{colorClass()} border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent dark:border-l-transparent dark:border-r-transparent"
			style="transform: rotate(225deg);border-color: {customColor[0]};border-right-color:transparent;border-left-color:transparent;"
		></div>
		<div
			class="absolute bottom-0 right-0{colorClass()} border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent dark:border-l-transparent dark:border-r-transparent"
			style="transform: rotate(45deg);border-color: {customColor[0]};border-right-color:transparent;border-left-color:transparent;"
		></div>
	</div>
</div>
