<script lang="ts">
	import * as eases from 'svelte/easing';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';
	import type { PopupProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

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
		radiusPosition = 'auto',
		radius = '',
		transitionDistance = 0,
		transparent = false,
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
		const radiusTopMap = {
			none: 'rounded-t-none',
			sm: 'rounded-t-sm',
			md: 'rounded-t-md',
			lg: 'rounded-t-lg',
			xl: 'rounded-t-xl',
			'2xl': 'rounded-t-2xl',
			'3xl': 'rounded-t-3xl',
			'4xl': 'rounded-t-4xl'
		};
		const radiusBottomMap = {
			none: 'rounded-b-none',
			sm: 'rounded-b-sm',
			md: 'rounded-b-md',
			lg: 'rounded-b-lg',
			xl: 'rounded-b-xl',
			'2xl': 'rounded-b-2xl',
			'3xl': 'rounded-b-3xl',
			'4xl': 'rounded-b-4xl'
		};
		const radiusLeftMap = {
			none: 'rounded-l-none',
			sm: 'rounded-l-sm',
			md: 'rounded-l-md',
			lg: 'rounded-l-lg',
			xl: 'rounded-l-xl',
			'2xl': 'rounded-l-2xl',
			'3xl': 'rounded-l-3xl',
			'4xl': 'rounded-l-4xl'
		};
		const radiusRightMap = {
			none: 'rounded-r-none',
			sm: 'rounded-r-sm',
			md: 'rounded-r-md',
			lg: 'rounded-r-lg',
			xl: 'rounded-r-xl',
			'2xl': 'rounded-r-2xl',
			'3xl': 'rounded-r-3xl',
			'4xl': 'rounded-r-4xl'
		};

		// 自动根据 position 计算 radiusPosition
		// Automatically calculate radiusPosition based on position
		let actualRadiusPosition: 'none' | 'left' | 'right' | 'auto' | 'top' | 'bottom' | 'all' = radiusPosition;
		if (radiusPosition === 'auto') {
			// bottom 弹出 → 圆角在上; top 弹出 → 圆角在下; left 弹出 → 圆角在右; right 弹出 → 圆角在左; center → 四周
			const autoMap: Record<string, 'top' | 'bottom' | 'left' | 'right' | 'all'> = {
				bottom: 'top',
				top: 'bottom',
				left: 'right',
				right: 'left',
				center: 'all'
			};
			actualRadiusPosition = autoMap[position] || 'top';
		}

		// 当 radius 为空时使用 CSS 变量
		// Use CSS variable when radius is empty
		if (!radius) {
			if (actualRadiusPosition === 'all') {
				return 'rounded-(--radius-box)';
			} else if (actualRadiusPosition === 'top') {
				return 'rounded-t-(--radius-box)';
			} else if (actualRadiusPosition === 'bottom') {
				return 'rounded-b-(--radius-box)';
			} else if (actualRadiusPosition === 'left') {
				return 'rounded-l-(--radius-box)';
			} else if (actualRadiusPosition === 'right') {
				return 'rounded-r-(--radius-box)';
			} else {
				return '';
			}
		}
		if (actualRadiusPosition === 'all') {
			return radiusObj[radius];
		} else if (actualRadiusPosition === 'top') {
			return radiusTopMap[radius];
		} else if (actualRadiusPosition === 'bottom') {
			return radiusBottomMap[radius];
		} else if (actualRadiusPosition === 'left') {
			return radiusLeftMap[radius];
		} else if (actualRadiusPosition === 'right') {
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

	// 页面滚动时，动态计算窗口高度
	// Dynamically calculate the window height when the page scrolls
	let innerHeight = $state(typeof window !== 'undefined' ? window.innerHeight : 0);
	$effect(() => {
		if (dynamicFixed) {
			//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
			//Solve the problem of window height change caused by Safari and Chrome or other browsers hiding and showing the toolbar when scrolling
			const handleResize = () => {
				innerHeight = window.innerHeight;
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});
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
				class="w-full h-full{transparent ? ' bg-transparent' : ' bg-bg-overlay dark:bg-bg-overlay-dark'} {radiusFun()} overflow-y-auto"
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
