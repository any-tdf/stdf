<script>
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;
	export let theme = false;
	export let inverse = false;

	const colorClass = () => {
		if (inverse) {
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-dark border-l-dark/[1] dark:border-primary dark:border-l-primary/[1] border-r-dark/[1] dark:border-r-primary/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-white border-l-white/[1] dark:border-black dark:border-l-black/[1] border-r-white/[1] dark:border-r-black/[1]';
		} else {
			return theme
				? ' border-opacity-5 dark:border-opacity-5 border-primary dark:border-dark border-l-primary/[1] dark:border-l-dark/[1] border-r-primary/[1] dark:border-r-dark/[1]'
				: ' border-opacity-5 dark:border-opacity-5 border-black dark:border-white border-l-black/[1] dark:border-l-white/[1] border-r-black/[1] dark:border-r-white/[1]';
		}
	};
</script>

<div
	class={`${size} m-auto border-4 rounded-full loading ${colorClass()}`}
	style={`border-color: ${customColor[0] + '0D'} ${customColor[0] + 'FF'} ${customColor[0] + '0D'} ${
		customColor[0] + 'FF'
	};animation-duration: ${2 / speed}s;-webkit-animation-duration: ${2 / speed}s;`}
/>

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
