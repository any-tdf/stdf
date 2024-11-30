<script lang="ts">
	type Props = { size?: string; customColor?: string[]; speed?: number };

	let { size = 'w-8 h-8', customColor = [], speed = $bindable(1) }: Props = $props();
</script>

<div
	class="{size} loading m-auto rounded-full border-4"
	style="border-color: {customColor[0] || '#DA1414'} {customColor[1] || '#11BB8D'} {customColor[2] || '#7356BF'} {customColor[3] ||
		'#FFC043'};animation-duration: {2 / speed}s;-webkit-animation-duration: {2 / speed}s;"
></div>

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
