<script lang="ts">
	type Props = { inverse?: boolean; size?: string; customColor?: any[]; speed?: number };
	let { inverse = false, size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();

	const outerBorderClass = () => {
		return inverse ? ' border-white/10 dark:border-black/10' : ' border-black/10 dark:border-white/10';
	};
	const innerColorClass = () => {
		return inverse
			? ' border-transparent dark:border-transparent border-l-dark dark:border-l-primary'
			: ' border-transparent dark:border-transparent border-l-primary dark:border-l-dark';
	};
</script>

<div
	class="{size} m-auto rounded-full border-2 p-0.5 animate-spin{outerBorderClass()}"
	style="border-color:{customColor[0]};animation-duration: {1 / speed}s;-webkit-animation-duration: {1 / speed}s;"
>
	<div
		class="h-full w-full border-2 rounded-full{innerColorClass()}"
		style="border-color:{customColor[1] && 'transparent'};border-left-color:{customColor[1]}"
	></div>
</div>
