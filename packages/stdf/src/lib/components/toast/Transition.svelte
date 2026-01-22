<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as eases from 'svelte/easing';
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
	import type { SvelteEasingProps } from '../../types/index.js';

	type Props = {
		visible: boolean;
		transitionType: 'scale' | 'fly' | 'slide' | 'blur' | 'fade' | null;
		transitionParams: ScaleParams | FlyParams | SlideParams | BlurParams | FadeParams;
		outDuration: number;
		easeType: SvelteEasingProps;
		easeOutType: SvelteEasingProps;
		children: Snippet;
	};
	let { visible = false, transitionType = 'scale', transitionParams = {}, outDuration = 0, easeType = 'cubicOut', easeOutType = 'cubicOut', children }: Props = $props();

	// 进入过渡参数
	// In transition params
	const getInTransitionParams = () => {
		const params: Record<string, unknown> = { duration: 300, easing: eases[easeType], ...transitionParams };
		// fly 动画默认设置 y 值
		if (transitionType === 'fly' && params.y === undefined && params.x === undefined) {
			params.y = -100;
		}
		return params;
	};

	// 退出过渡参数
	// Out transition params
	const getOutTransitionParams = () => {
		const params: Record<string, unknown> = { ...transitionParams, duration: outDuration, easing: eases[easeOutType] };
		// fly 动画默认设置 y 值
		if (transitionType === 'fly' && params.y === undefined && params.x === undefined) {
			params.y = -100;
		}
		return params;
	};
</script>

{#if visible}
	{#if transitionType === 'scale'}
		<div in:scale|global={getInTransitionParams()} out:scale|global={getOutTransitionParams()}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fly'}
		<div in:fly|global={getInTransitionParams()} out:fly|global={getOutTransitionParams()}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'fade'}
		<div in:fade|global={getInTransitionParams()} out:fade|global={getOutTransitionParams()}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'slide'}
		<div in:slide|global={getInTransitionParams()} out:slide|global={getOutTransitionParams()}>
			{@render children?.()}
		</div>
	{:else if transitionType === 'blur'}
		<div in:blur|global={getInTransitionParams()} out:blur|global={getOutTransitionParams()}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
{/if}
