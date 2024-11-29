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
		class="relative w-8 h-8 m-auto border-2 rounded-full{colorClass()} border-t-transparent border-b-transparent dark:border-t-transparent dark:border-b-transparent animate-spin"
		style="border-color: {customColor[0]};border-top-color:transparent;border-bottom-color:transparent;animation-duration: {1 /
			speed}s;-webkit-animation-duration: {1 / speed}s;"
	>
		<div
			class="absolute{colorClass()} border-t-[5px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent dark:border-r-transparent dark:border-l-transparent"
			style="transform: rotate(225deg);border-color: {customColor[0]};border-right-color:transparent;border-left-color:transparent;"
		></div>
		<div
			class="absolute bottom-0 right-0{colorClass()} border-t-[5px] border-r-[5px] border-l-[5px] border-r-transparent border-l-transparent dark:border-r-transparent dark:border-l-transparent"
			style="transform: rotate(45deg);border-color: {customColor[0]};border-right-color:transparent;border-left-color:transparent;"
		></div>
	</div>
</div>
