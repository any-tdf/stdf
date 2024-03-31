<script>
	export let theme = false;
	export let inverse = false;
	export let size = 'w-8 h-8';
	export let customColor = [];
	export let speed = 1;

	const colorClass = () => {
		if (inverse) {
			return theme ? ' bg-dark dark:bg-primary' : ' bg-white dark:bg-black';
		} else {
			return theme ? ' bg-primary dark:bg-dark' : ' bg-black dark:bg-white';
		}
	};
</script>

<div class="{size} m-auto relative">
	<div
		class="line1 absolute w-1 h-1{colorClass()}"
		style="background-color: {customColor[0]}; top: calc(50% - 2px); left: calc(50% - 2px); animation-duration: {4 / speed}s;"
	/>
	<div class="line2 absolute w-1 h-1{colorClass()}" style="background-color: {customColor[0]}; animation-duration: {4 / speed}s;" />
	<div
		class="line2 absolute w-1 h-1{colorClass()}"
		style="background-color: {customColor[0]}; animation-duration: {4 / speed}s; animation-delay: calc({4 / speed}s * -0.5);"
	/>
</div>

<style>
	.line1 {
		animation: center-line ease infinite;
	}

	.line2 {
		animation: explore ease infinite;
	}

	@keyframes center-line {
		0%,
		25%,
		50%,
		75%,
		100% {
			transform: scaleX(1) scaleY(1);
		}
		12.5%,
		62.5% {
			transform: scaleX(8) scaleY(1);
		}
		37.5%,
		87.5% {
			transform: scaleX(1) scaleY(8);
		}
	}

	@keyframes explore {
		0%,
		100% {
			transform: scaleX(1) scaleY(1) translate(0%, 0%);
			transform-origin: top left;
			top: 0;
			left: 0;
		}

		12.5% {
			transform: scaleX(8) scaleY(1) translate(0%, 0%);
			transform-origin: top left;
			top: 0;
			left: 0;
		}

		12.50001% {
			transform: scaleX(8) scaleY(1) translate(0%, 0%);
			transform-origin: top right;
			top: 0;
			left: initial;
			right: 0;
		}

		25% {
			transform: scaleX(1) scaleY(1) translate(0%, 0%);
			transform-origin: top right;
			top: 0;
			left: initial;
			right: 0;
		}

		37.5% {
			transform: scaleX(1) scaleY(8) translate(0%, 0%);
			transform-origin: top right;
			top: 0;
			left: initial;
			right: 0;
		}

		37.5001% {
			transform: scaleX(1) scaleY(8) translate(0%, 0%);
			transform-origin: bottom right;
			top: initial;
			bottom: 0;
			left: initial;
			right: 0;
		}

		50% {
			transform: scaleX(1) scaleY(1) translate(0%, 0%);
			transform-origin: bottom right;
			top: initial;
			bottom: 0;
			left: initial;
			right: 0;
		}

		62.5% {
			transform: scaleX(8) scaleY(1) translate(0%, 0%);
			transform-origin: bottom right;
			top: initial;
			bottom: 0;
			left: initial;
			right: 0;
		}

		62.5001% {
			transform: scaleX(8) scaleY(1) translate(0%, 0%);
			transform-origin: bottom left;
			top: initial;
			bottom: 0;
			left: 0;
		}

		75% {
			transform: scaleX(1) scaleY(1) translate(0%, 0%);
			transform-origin: bottom left;
			top: initial;
			bottom: 0;
			left: 0;
		}

		87.5% {
			transform: scaleX(1) scaleY(8) translate(0%, 0%);
			transform-origin: bottom left;
			top: initial;
			bottom: 0;
			left: 0;
		}

		87.5001% {
			transform: scaleX(1) scaleY(8) translate(0%, 0%);
			transform-origin: top left;
			top: 0;
			left: 0;
		}
	}
</style>
