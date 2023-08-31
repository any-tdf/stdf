<script>
	import { fade, fly, blur, slide, scale } from 'svelte/transition';

	export let visible = false; //是否显示  is show
	export let transitionType = 'scale'; //过渡动画进入类型，可选值：fade,fly, scale，slide,none  transition type
	export let transitionParams = {}; //过渡动画参数  transition params
	export let outDuration = 0; //过渡动画退出时间  transition out duration
</script>

{#if visible}
	{#if transitionType === 'scale'}
		<div in:scale|global={{ duration: 300, ...transitionParams }} out:scale={{ ...transitionParams, duration: outDuration }}>
			<slot />
		</div>
	{:else if transitionType === 'fly'}
		<div in:fly|global={{ duration: 300, ...transitionParams }} out:fly={{ ...transitionParams, duration: outDuration }}>
			<slot />
		</div>
	{:else if transitionType === 'fade'}
		<div in:fade|global={{ duration: 300, ...transitionParams }} out:fade={{ ...transitionParams, duration: outDuration }}>
			<slot />
		</div>
	{:else if transitionType === 'slide'}
		<div in:slide|global={{ duration: 300, ...transitionParams }} out:slide={{ ...transitionParams, duration: outDuration }}>
			<slot />
		</div>
	{:else if transitionType === 'blur'}
		<div in:blur|global={{ duration: 300, ...transitionParams }} out:blur={{ ...transitionParams, duration: outDuration }}>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
{/if}
