<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' border-dark dark:border-primary' : ' border-white dark:border-black';
		} else {
			return theme ? ' text-primary dark:text-dark' : ' text-black dark:text-white';
		}
	};
</script>

<div
	class={`${size} m-auto border-2 rounded-full${colorClass()} border-t-transparent border-b-transparent dark:border-t-transparent dark:border-b-transparent animate-spin`}
	style={`border-color: ${customColor[0]};border-top-color:transparent;border-bottom-color:transparent;;animation-duration: ${
		1 / speed
	}s;-webkit-animation-duration: ${1 / speed}s;`}
/>
