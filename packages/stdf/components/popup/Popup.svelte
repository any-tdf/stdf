<script>
	import { createEventDispatcher } from 'svelte';
	import * as eases from 'svelte/easing';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 是否显示
	// Whether to show
	export let visible = false;

	// 弹出层大小，值为 0 时由内部元素决定
	// Popup size, value of 0 is determined by internal elements
	export let size = 40;

	// 弹出层位置，center,top,bottom,left,right
	// Popup position, center, top, bottom, left, right
	export let position = 'bottom';

	// 过渡动画出现时间
	// Transition animation appearance time
	export let duration = 450;

	// 过渡动画退出时间
	// Transition animation exit time
	export let outDuration = 240;

	// 过渡动画进入类型
	// Transition animation entry type
	export let easeType = 'cubicOut';

	// 过渡动画退出类型
	// Transition animation exit type
	export let easeOutType = 'cubicOut';

	// 左右间距
	// Left and right spacing
	export let px = '0';

	// 上下间距
	// Top and bottom spacing
	export let py = '0';

	// 遮罩层参数
	// Mask layer parameters
	export let mask = {};

	// 点击遮罩层是否关闭
	// Click mask layer to close
	export let maskClosable = true;

	// 圆角位置
	// Corner position
	export let radiusPosition = 'top';

	// 圆角大小
	// Corner size
	export let radius = 'none';

	// 动画距离，当弹出层大小由内部元素决定时生效
	// Animation distance, effective when popup size is determined by internal elements
	export let transitionDistance = 0;

	// 背景是否透明
	// Whether the background is transparent
	export let transparent = false;

	// 是否允许 body 滚动
	// Whether to allow body scrolling
	export let allowBodyScroll = false;

	// z-index
	export let zIndex = 600;

	// 是否动态固定
	// Whether to dynamically fix
	export let dynamicFixed = true;

	// 是否隐藏滚动区域滚动条
	// Whether to hide the scroll bar of the scroll area
	export let hideScrollbar = false;

	// 通过不同位置结合圆角参数，生成不同的 class
	// Generate different classes by combining different positions and corner parameters
	const radiusFun = () => {
		if (radiusPosition === 'all') {
			if (radius === 'none') {
				return 'rounded-none';
			} else if (radius === 'base') {
				return 'rounded';
			} else if (radius === 'md') {
				return 'rounded-md';
			} else if (radius === 'lg') {
				return 'rounded-lg';
			} else if (radius === 'xl') {
				return 'rounded-xl';
			} else if (radius === '2xl') {
				return 'rounded-2xl';
			} else if (radius === '3xl') {
				return 'rounded-3xl';
			} else if (radius === 'full') {
				return 'rounded-full';
			}
		} else if (radiusPosition === 'top') {
			if (radius === 'none') {
				return 'rounded-t-none';
			} else if (radius === 'base') {
				return 'rounded-t';
			} else if (radius === 'md') {
				return 'rounded-t-md';
			} else if (radius === 'lg') {
				return 'rounded-t-lg';
			} else if (radius === 'xl') {
				return 'rounded-t-xl';
			} else if (radius === '2xl') {
				return 'rounded-t-2xl';
			} else if (radius === '3xl') {
				return 'rounded-t-3xl';
			} else if (radius === 'full') {
				return 'rounded-t-full';
			}
		} else if (radiusPosition === 'bottom') {
			if (radius === 'none') {
				return 'rounded-b-none';
			} else if (radius === 'base') {
				return 'rounded-b';
			} else if (radius === 'md') {
				return 'rounded-b-md';
			} else if (radius === 'lg') {
				return 'rounded-b-lg';
			} else if (radius === 'xl') {
				return 'rounded-b-xl';
			} else if (radius === '2xl') {
				return 'rounded-b-2xl';
			} else if (radius === '3xl') {
				return 'rounded-b-3xl';
			} else if (radius === 'full') {
				return 'rounded-b-full';
			}
		} else if (radiusPosition === 'left') {
			if (radius === 'none') {
				return 'rounded-l-none';
			} else if (radius === 'base') {
				return 'rounded-l';
			} else if (radius === 'md') {
				return 'rounded-l-md';
			} else if (radius === 'lg') {
				return 'rounded-l-lg';
			} else if (radius === 'xl') {
				return 'rounded-l-xl';
			} else if (radius === '2xl') {
				return 'rounded-l-2xl';
			} else if (radius === '3xl') {
				return 'rounded-l-3xl';
			} else if (radius === 'full') {
				return 'rounded-l-full';
			}
		} else if (radiusPosition === 'right') {
			if (radius === 'none') {
				return 'rounded-r-none';
			} else if (radius === 'base') {
				return 'rounded-r';
			} else if (radius === 'md') {
				return 'rounded-r-md';
			} else if (radius === 'lg') {
				return 'rounded-r-lg';
			} else if (radius === 'xl') {
				return 'rounded-r-xl';
			} else if (radius === '2xl') {
				return 'rounded-r-2xl';
			} else if (radius === '3xl') {
				return 'rounded-r-3xl';
			} else if (radius === 'full') {
				return 'rounded-r-full';
			}
		}
	};

	// 通过不同位置，生成不同的布局 class
	// Generate different layout classes by different positions
	const positionClass = {
		bottom: ' flex-col justify-end',
		top: ' flex-col justify-start',
		left: ' justify-start',
		right: ' justify-end',
		center: ' flex-col justify-center',
	};

	// 监听 visible 变化派发事件
	// Listen to the change of visible and dispatch events
	$: {
		if (visible) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	}

	// 点击遮罩时派发事件
	// Dispatch events when clicking the mask
	const clickMask = () => {
		dispatch('clickMask');
		if (maskClosable) {
			visible = false;
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
				opacity: 1,
			};
		} else if (position === 'top') {
			return {
				y: -(size === 0 ? transitionDistance : (window.innerHeight * size) / 100),
				duration,
				easing: eases[easeType],
				opacity: 1,
			};
		} else if (position === 'left') {
			return {
				x: -(size === 0 ? transitionDistance : (window.innerWidth * size) / 100),
				duration,
				easing: eases[easeType],
				opacity: 1,
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
				opacity: 1,
			};
		} else if (position === 'top') {
			return {
				y: -(size === 0 ? transitionDistance : (window.innerHeight * size) / 100),
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1,
			};
		} else if (position === 'left') {
			return {
				x: -(size === 0 ? transitionDistance : (window.innerWidth * size) / 100),
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1,
			};
		} else if (position === 'right') {
			return {
				x: size === 0 ? transitionDistance : (window.innerWidth * size) / 100,
				duration: outDuration,
				easing: eases[easeOutType],
				opacity: 1,
			};
		} else {
			return { duration: outDuration, easing: eases[easeOutType], opacity: 1 };
		}
	};

	// 监听 visible 与是否允许 body 滚动，动态控制 body 滚动
	// Listen to the change of visible and allowBodyScroll, and dynamically control the body scroll
	$: {
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
	}

	// 页面滚动时，动态计算窗口高度
	// Dynamically calculate the window height when the page scrolls
	$: innerHeight = window.innerHeight;
	if (dynamicFixed) {
		//解决 Safari 和 Chrome 或其他浏览器滚动时工具栏隐藏与显示引发的窗口高度变化问题
		//Solve the problem of window height change caused by Safari and Chrome or other browsers hiding and showing the toolbar when scrolling
		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
		});
	}
</script>

{#if visible}
	<Mask visible {duration} {outDuration} {...mask} on:clickMask={clickMask} />
{/if}

{#if visible}
	<div
		class={`fixed w-screen h-screen inset-0 flex${positionClass[position] || positionClass['bottom']} px-0 pointer-events-none`}
		style={`z-index:${zIndex};height:${innerHeight}px`}
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
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class={`w-full h-full${transparent ? ' bg-transparent' : ' bg-white dark:bg-gray1'} ${radiusFun()} overflow-y-auto`}
				class:popup-container={hideScrollbar}
				on:click|stopPropagation
			>
				<slot />
			</div>
		</Transition>
	</div>
{/if}

<style>
	.popup-container::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
</style>
