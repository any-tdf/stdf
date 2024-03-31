<script>
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;
</script>

<div
	class={`${size} m-auto border-4 rounded-full loading`}
	style={`border-color: ${customColor[0] || '#DA1414'} ${customColor[1] || '#11BB8D'} ${customColor[2] || '#7356BF'} ${
		customColor[3] || '#FFC043'
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
