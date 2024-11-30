<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		fade,
		fly,
		blur,
		slide,
		scale,
		type ScaleParams,
		type FlyParams,
		type SlideParams,
		type BlurParams,
		type FadeParams
	} from 'svelte/transition';

	type Props = {
		visible: boolean;
		transitionType: 'scale' | 'fly' | 'slide' | 'blur' | 'fade' | null;
		transitionParams: ScaleParams | FlyParams | SlideParams | BlurParams | FadeParams;
		outDuration: number;
		children: Snippet;
	};
	let { visible = false, transitionType = 'scale', transitionParams = {}, outDuration = 0, children }: Props = $props();
</script>

{#if visible}
	{#if transitionType === 'scale'}
		<div in:scale|global={{ duration: 300, ...transitionParams }} out:scale|global={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fly'}
		<div in:fly|global={{ duration: 300, ...transitionParams }} out:fly|global={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fade'}
		<div in:fade|global={{ duration: 300, ...transitionParams }} out:fade|global={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'slide'}
		<div in:slide|global={{ duration: 300, ...transitionParams }} out:slide|global={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'blur'}
		<div in:blur|global={{ duration: 300, ...transitionParams }} out:blur|global={{ ...transitionParams, duration: outDuration }}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
{/if}
