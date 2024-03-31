<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' text-dark dark:text-primary' : ' text-white dark:text-black';
		} else {
			return theme ? ' text-primary dark:text-dark' : ' text-black dark:text-white';
		}
	};
</script>

<div class={`${size} m-auto`}>
	<svg
		viewBox="0 0 24 24"
		class={`animate-spin${colorClass()}`}
		style={`color: ${customColor[0]};animation-duration: ${1 / speed}s;-webkit-animation-duration: ${1 / speed}s;`}
	>
		<circle cx="12" cy="12" r="10" stroke-width="4" fill="none" class="opacity-5" stroke="currentColor" />
		<circle
			cx="12"
			cy="12"
			r="10"
			stroke-width="4"
			class="opacity-80"
			stroke="currentColor"
			fill="none"
			stroke-dashoffset="46.07669455648491"
			stroke-dasharray="69.11503837897544"
			stroke-linecap="round"
		/>
	</svg>
</div>
