<script>
	import { fade, fly, blur, slide, scale } from 'svelte/transition';

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [visible]
	 * @property {string} [transitionType]
	 * @property {any} [transitionParams]
	 * @property {number} [outDuration]
	 * @property {import('svelte').Snippet} [children]
	 */
	/** @type {Props} */
	let { visible = false, transitionType = 'scale', transitionParams = {}, outDuration = 0, children } = $props();
</script>

{#if visible}
	{#if transitionType === 'scale'}
		<div in:scale|global={{ duration: 300, ...transitionParams }} out:scale={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fly'}
		<div in:fly|global={{ duration: 300, ...transitionParams }} out:fly={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fade'}
		<div in:fade|global={{ duration: 300, ...transitionParams }} out:fade={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'slide'}
		<div in:slide|global={{ duration: 300, ...transitionParams }} out:slide={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'blur'}
		<div in:blur|global={{ duration: 300, ...transitionParams }} out:blur={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
{/if}
