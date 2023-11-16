<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	/**
	 * 是否显示
	 * Whether to show
	 * @type {boolean}
	 * @default false
	 */
	export let visible = false;

	/**
	 * 遮罩透明度
	 * Mask opacity
	 * @type {number}
	 * @range 0 - 1
	 * @default 0.5
	 */
	export let opacity = 0.5;

	/**
	 * 遮罩是否可点击穿透
	 * Whether the mask can be clicked through
	 * @type {boolean}
	 * @default false
	 */
	export let clickable = false;

	/**
	 * 是否反色
	 * Whether to reverse color
	 * @type {boolean}
	 * @default false
	 */
	export let inverse = false;

	/**
	 * 模糊度
	 * Blur degree
	 * @type {'none'|'sm'|'base'|'md'|'lg'|'xl'|'2xl'|'3xl'}
	 * @default 'none'
	 */
	export let backdropBlur = 'none';

	/**
	 * 出现动画过渡时长，单位毫秒
	 * Transition duration of appearance animation, in milliseconds
	 * @type {number}
	 * @default 150
	 */
	export let duration = 150;

	/**
	 * 消失动画过渡时长，单位毫秒
	 * Transition duration of disappearance animation, in milliseconds
	 * @type {number}
	 * @default 0
	 */
	export let outDuration = 0;

	/**
	 * z-index
	 * @type {number}
	 * @default 500
	 */
	export let zIndex = 500;

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
		dispatch('clickMask');
	};
</script>

{#if visible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		in:fade|global={{ duration }}
		out:fade|global={{ duration: outDuration }}
		on:click={clickMaskFunc}
		class={`fixed w-screen h-screen inset-0${
			inverse ? bgClassInverse[opacity] || bgClassInverse['0.5'] : bgClass[opacity] || bgClass['0.5']
		}${clickable ? ' pointer-events-none' : ''}${backdropBlurClass[backdropBlur] || backdropBlurClass['none']}`}
		style={`z-index:${zIndex};`}
	>
		<slot />
	</div>
{/if}
