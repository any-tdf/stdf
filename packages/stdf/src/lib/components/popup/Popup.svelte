<script lang="ts">
	import * as eases from 'svelte/easing';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';
	import type { PopupProps } from '../../types/index.js';

	let {
		visible = $bindable(false),
		size = 40,
		position = 'bottom',
		duration = 450,
		outDuration = 240,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
		px = '0',
		py = '0',
		mask = {},
		maskClosable = true,
		radiusPosition = 'top',
		radius = 'none',
		transitionDistance = 0,
		transparent = false,
		allowBodyScroll = false,
		zIndex = 600,
		dynamicFixed = true,
		hideScrollbar = false,
		children,
		onclose,
		onclickMask
	}: PopupProps = $props();

	// 通过不同位置结合圆角参数，生成不同的 class
	// Generate different classes by combining different positions and corner parameters
	const radiusFun = () => {
		const radioMap = {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			'3xl': 'rounded-3xl',
			full: 'rounded-full'
		};
		const radiusTopMap = {
			none: 'rounded-t-none',
			sm: 'rounded-t-sm',
			md: 'rounded-t-md',
			lg: 'rounded-t-lg',
			xl: 'rounded-t-xl',
			'2xl': 'rounded-t-2xl',
			'3xl': 'rounded-t-3xl',
			full: 'rounded-t-full'
		};
		const radiusBottomMap = {
			none: 'rounded-b-none',
			sm: 'rounded-b-sm',
			md: 'rounded-b-md',
			lg: 'rounded-b-lg',
			xl: 'rounded-b-xl',
			'2xl': 'rounded-b-2xl',
			'3xl': 'rounded-b-3xl',
			full: 'rounded-b-full'
		};
		const radiusLeftMap = {
			none: 'rounded-l-none',
			sm: 'rounded-l-sm',
			md: 'rounded-l-md',
			lg: 'rounded-l-lg',
			xl: 'rounded-l-xl',
			'2xl': 'rounded-l-2xl',
			'3xl': 'rounded-l-3xl',
			full: 'rounded-l-full'
		};
		const radiusRightMap = {
			none: 'rounded-r-none',
			sm: 'rounded-r-sm',
			md: 'rounded-r-md',
			lg: 'rounded-r-lg',
			xl: 'rounded-r-xl',
			'2xl': 'rounded-r-2xl',
			'3xl': 'rounded-r-3xl',
			full: 'rounded-r-full'
		};
		if (radiusPosition === 'all') {
			return radioMap[radius];
		} else if (radiusPosition === 'top') {
			return radiusTopMap[radius];
		} else if (radiusPosition === 'bottom') {
			return radiusBottomMap[radius];
		} else if (radiusPosition === 'left') {
			return radiusLeftMap[radius];
		} else if (radiusPosition === 'right') {
			return radiusRightMap[radius];
		} else {
			return '';
		}
	};

	// 通过不同位置，生成不同的布局 class
	// Generate different layout classes by different positions
	const positionClass = {
		bottom: ' flex-col justify-end',
		top: ' flex-col justify-start',
		left: ' justify-start',
		right: ' justify-end',
		center: ' flex-col justify-center'
	};

	// 点击遮罩时派发事件
	// Dispatch events when clicking the mask
	const clickMask = () => {
		onclickMask?.();
		if (maskClosable) {
			visible = false;
			onclose?.();
		}
	};

	// 根据不同位置，生成不同的出现动画参数
	// Generate different transition parameters by different positions
	const transitionParamsFun = () => {
		if (position === 'bottom') {
			return {
				y: size === 0 ? transitionDistance : (window.innerHeight * size) / 100,
				duration,
				easing: eases[easeType],
				opacity: 1
			};
		} else if (position === 'top') {
			return {
				y: -(size === 0 ? transitionDistance : (window.innerHeight * size) / 100),
				duration,
				easing: eases[easeType],
				opacity: 1
			};
		} else if (position === 'left') {
			return {
				x: -(size === 0 ? transitionDistance : (window.innerWidth * size) / 100),
				duration,
				easing: eases[easeType],
				opacity: 1
			};
		} else if (position === 'right') {
			return { x: size === 0 ? transitionDistance : (window.innerWidth * size) / 100, duration, easing: eases[easeType], opacity: 1 };
		} else {
			return { easing: eases[easeType], duration, opacity: 1 };
		}
	};

	// 根据不同位置，生成不同的消失动画参数
	// Generate different transition parameters by different positions
	const transitionOutParamsFun = () => {
		if (position === 'bottom') {
			return {
				y: size === 0 ? transitionDistance : (window.innerHeight * size) / 100,
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1
			};
		} else if (position === 'top') {
			return {
				y: -(size === 0 ? transitionDistance : (window.innerHeight * size) / 100),
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1
			};
		} else if (position === 'left') {
			return {
				x: -(size === 0 ? transitionDistance : (window.innerWidth * size) / 100),
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1
			};
		} else if (position === 'right') {
			return {
				x: size === 0 ? transitionDistance : (window.innerWidth * size) / 100,
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1
			};
		} else {
			return { duration: outDuration, easing: eases[easeOutType], opacity: 1 };
		}
	};

	// 监听 visible 与是否允许 body 滚动，动态控制 body 滚动
	// Listen to the change of visible and allowBodyScroll, and dynamically control the body scroll
	$effect(() => {
		if (visible && !allowBodyScroll) {
			const top = document.documentElement.scrollTop || document.body.scrollTop;
			document.body.style.cssText += `
            position: fixed;
            width: 100vw;
            left: 0;
            top: ${-top}px;
            touch-action:none;
        `;
		} else {
			const top = document.body.style.top;
			document.body.style.cssText += `
            position: static;
            touch-action:auto;
        `;
			window.scrollTo(0, Math.abs(parseFloat(top)));
		}
	});

	// 页面滚动时，动态计算窗口高度
	// Dynamically calculate the window height when the page scrolls
	let innerHeight = $state(0);
	$effect(() => {
		innerHeight = window.innerHeight;
	});
	if (dynamicFixed) {
		//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
		//Solve the problem of window height change caused by Safari and Chrome or other browsers hiding and showing the toolbar when scrolling
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if visible}
	<Mask visible {duration} {outDuration} {...mask} onclickMask={clickMask} />
{/if}

{#if visible}
	<div
		class="fixed inset-0 h-screen w-screen flex{positionClass[position] || positionClass['bottom']} pointer-events-none px-0"
		style="z-index:{zIndex};height:{innerHeight}px"
	>
		<Transition
			{visible}
			{size}
			{position}
			{px}
			{py}
			transitionParams={transitionParamsFun()}
			transitionOutParams={transitionOutParamsFun()}
		>
			<div
				class="w-full h-full{transparent ? ' bg-transparent' : ' bg-white dark:bg-gray-950'} {radiusFun()} overflow-y-auto"
				class:popup-container={hideScrollbar}
			>
				{@render children?.()}
			</div>
		</Transition>
	</div>
{/if}

<style>
	.popup-container::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
