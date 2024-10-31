<script>
	import * as eases from 'svelte/easing';
	import Mask from '../mask/Mask.svelte';
	import Transition from './Transition.svelte';

	/** @typedef {import('../../index.d').Popup} PopupProps */
	/** @type {PopupProps} */
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
		onopen,
		onclose,
		onclickMask,
	} = $props();

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
	$effect(() => {
		if (visible) {
			onopen && onopen();
		} else {
			onclose && onclose();
		}
	});

	// 点击遮罩时派发事件
	// Dispatch events when clicking the mask
	const clickMask = () => {
		onclickMask && onclickMask();
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
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class={`w-full h-full${transparent ? ' bg-transparent' : ' bg-white dark:bg-gray-950'} ${radiusFun()} overflow-y-auto`}
				class:popup-container={hideScrollbar}
				onclick={e => {
					e.stopPropagation();
				}}
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
