<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	/** @typedef {import('../../index.d').Mask} MaskProps */
	/** @type {MaskProps} */
	let {
		visible = false,
		opacity = 0.5,
		clickable = false,
		inverse = false,
		backdropBlur = 'none',
		duration = 150,
		outDuration = 0,
		zIndex = 500,
		children,
		onclickMask,
	} = $props();

	//遮罩模糊度样式
	// Mask blur style
	const backdropBlurClass = {
		none: '',
		sm: ' backdrop-blur-sm',
		base: ' backdrop-blur',
		md: ' backdrop-blur-md',
		lg: ' backdrop-blur-lg',
		xl: ' backdrop-blur-xl',
		'2xl': ' backdrop-blur-2xl',
		'3xl': ' backdrop-blur-3xl',
	};

	// 遮罩背景色
	// Mask background color
	const bgClass = {
		'0': ' bg-transparent',
		'0.1': ' bg-black/[.1] dark:bg-white/[.1]',
		'0.2': ' bg-black/[.2] dark:bg-white/[.2]',
		'0.3': ' bg-black/[.3] dark:bg-white/[.3]',
		'0.4': ' bg-black/[.4] dark:bg-white/[.4]',
		'0.5': ' bg-black/[.5] dark:bg-white/[.5]',
		'0.6': ' bg-black/[.6] dark:bg-white/[.6]',
		'0.7': ' bg-black/[.7] dark:bg-white/[.7]',
		'0.8': ' bg-black/[.8] dark:bg-white/[.8]',
		'0.9': ' bg-black/[.9] dark:bg-white/[.9]',
		'1': ' bg-black dark:bg-white',
	};

	// 遮罩背景色反色
	// Mask background color reverse color
	const bgClassInverse = {
		'0': ' bg-transparent',
		'0.1': ' bg-white/[.1] dark:bg-black/[.1]',
		'0.2': ' bg-white/[.2] dark:bg-black/[.2]',
		'0.3': ' bg-white/[.3] dark:bg-black/[.3]',
		'0.4': ' bg-white/[.4] dark:bg-black/[.4]',
		'0.5': ' bg-white/[.5] dark:bg-black/[.5]',
		'0.6': ' bg-white/[.6] dark:bg-black/[.6]',
		'0.7': ' bg-white/[.7] dark:bg-black/[.7]',
		'0.8': ' bg-white/[.8] dark:bg-black/[.8]',
		'0.9': ' bg-white/[.9] dark:bg-black/[.9]',
		'1': ' bg-white dark:bg-black',
	};

	// 点击遮罩派发事件
	// Click mask to dispatch event
	const clickMaskFunc = () => {
		onclickMask && onclickMask?.();
	};
</script>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		in:fade|global={{ duration }}
		out:fade|global={{ duration: outDuration }}
		onclick={clickMaskFunc}
		class={`fixed w-screen h-screen inset-0${
			inverse ? bgClassInverse[opacity] || bgClassInverse['0.5'] : bgClass[opacity] || bgClass['0.5']
		}${clickable ? ' pointer-events-none' : ''}${backdropBlurClass[backdropBlur] || backdropBlurClass['none']}`}
		style={`z-index:${zIndex};`}
	>
		{@render children?.()}
	</div>
{/if}
