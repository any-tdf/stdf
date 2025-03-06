<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF } from '../utils/index.js';
	import Mask from '../mask/Mask.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { BottomSheetProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const bottomSheetLang: LangProps['bottomSheet'] = currentLang.bottomSheet;

	let {
		visible = $bindable(false),
		title = bottomSheetLang.title,
		titleAlign = 'left',
		showBackIcon = false,
		closeContent = 'downIcon',
		showDivider = true,
		duration = 450,
		outDuration = 240,
		mask = {},
		maskClosable = false,
		zIndex = 600,
		stayHeightList = [10, 50, 90],
		stayHeightIndex = 1,
		closeHeight = 0,
		radius = 'full',
		children,
		onheightChange,
		onclickMask,
		onclose,
		onback
	}: BottomSheetProps = $props();

	// 固定高度
	// stay height
	let stayHeight = stayHeightList[stayHeightIndex] || stayHeightList[stayHeightList.length - 1];

	// 此时是否正在滑动
	// is sliding or not now
	let isTouch = $state(false);

	// 滑动开始 Y 坐标，px
	// start Y coordinate, px
	let startY = 0;

	// 滑动中 Y 方向当前位置，px
	// current Y coordinate, px
	let currentY = 0;

	// 滑动开始距离顶部高度，%
	// start distance from top, %
	let startTop = $state(100 - stayHeight);

	// 滑动距离，%
	// move distance, %
	let moveDistance = $state(0);

	// 顶部滚动区域高度，%
	// top scroll area height, %
	let scrollTopHeight = $state(5);

	// 顶部滚动区域元素
	// top scroll area element
	let scrollTopDom = $state<HTMLDivElement | null>(null);

	// 当前距离顶部高度，%
	// current distance from top, %
	let currentTop = $state(0);
	$effect(() => {
		currentTop = startTop + moveDistance;
	});

	// 如果 stayHeightList 不是数组，或者元素不是正数，或者元素不是 0-100 之间的数，或者元素不是整数，给出警告。
	// If stayHeightList is not an array, or the element is not a positive number, or the element is not a number between 0 and 100, or the element is not an integer, give a warning.
	if (
		!Array.isArray(stayHeightList) ||
		stayHeightList.some((item) => typeof item !== 'number' || item < 0 || item > 100 || item % 1 !== 0)
	) {
		console.error(
			'[STDF BottomSheet error]stayHeightList 必须是一个 0-100 之间的正整数数组。(stayHeightList must be an array of positive integers between 0 and 100)'
		);
	}

	// 如果 stayHeightList 元素不是递增的，给出警告。
	// If the elements of stayHeightList are not increasing, give a warning.
	if (stayHeightList.some((item, index) => index > 0 && item <= stayHeightList[index - 1])) {
		console.error(
			'[STDF BottomSheet error]stayHeightList 数组元素必须是升序排列。(stayHeightList array elements must be in ascending order)'
		);
	}

	// 如果 stayHeightIndex 超出 stayHeightList 长度给出警告。
	// If stayHeightIndex exceeds the length of stayHeightList, give a warning.
	if (stayHeightIndex > stayHeightList.length - 1) {
		console.warn(
			'[STDF BottomSheet warn]stayHeightIndex 超出 stayHeightList 长度，将使用 stayHeightList 最后一个值。(stayHeightIndex exceeds the length of stayHeightList, the last value of stayHeightList will be used.)'
		);
	}

	// 如果 closeHeight 大于 stayHeightList 最小值给出警告。
	// If closeHeight is greater than the minimum value of stayHeightList, give a warning.
	if (closeHeight > stayHeightList[0]) {
		console.warn(
			'[STDF BottomSheet warn]closeHeight 大于 stayHeightList 最小值，closeHeight 将失效。(closeHeight is greater than the minimum value of stayHeightList, closeHeight will be invalid.)'
		);
	}

	// 标题对齐方式
	// title align
	const titleAlignClass = { left: ' text-left', center: ' text-center', right: ' text-right' };

	// 窗口圆角风格
	// window radius style
	const windowRadiusClass = { none: ' rounded-none', middle: ' rounded-t-lg', full: ' rounded-t-2xl' };

	// 图标圆角风格
	// icon radius style
	const iconRadiusClass = { none: ' rounded-none', middle: ' rounded-sm', full: ' rounded-full' };

	// 滑动开始
	// start sliding
	/** @type {(e:PointerEvent) => void} */
	const touchstartFun = (e: PointerEvent) => {
		moveDistance = 0;
		startTop = currentTop;
		startY = e.clientY;
		isTouch = true;
	};

	// 滑动中
	// sliding
	/** @type {(e:PointerEvent) => void} */
	const touchmoveFun = (e: PointerEvent) => {
		if (!isTouch) return;
		scrollTopDom?.setPointerCapture(e.pointerId);
		currentY = e.clientY;
		//移动百分比，moveDistance 为正时，向下移动
		//Move percentage, moveDistance is positive when moving down
		moveDistance = ((currentY - startY) / window.innerHeight) * 100;
		//处理向上滑动时超过最大高度情况
		//Handle the case when the maximum height is exceeded when sliding up
		if (moveDistance + startTop < 100 - stayHeightList[stayHeightList.length - 1]) {
			moveDistance = 100 - stayHeightList[stayHeightList.length - 1] - startTop;
		}
	};

	// 滑动结束
	// end sliding
	const touchendFun = () => {
		isTouch = false;
		//计算出每个高度对应的 top 值
		//Calculate the top value corresponding to each height
		let toTopList = stayHeightList.map((item) => 100 - item);
		let min = 100;
		let currentIndex = 0;
		toTopList.forEach((item, index) => {
			if (Math.abs(item - currentTop) < min) {
				min = Math.abs(item - currentTop);
				currentIndex = index;
			}
		});
		currentTop = toTopList[currentIndex];
		//派发事件，传递当前高度
		//Dispatch events and pass the current
		if (onheightChange) {
			onheightChange(stayHeightList[currentIndex]);
		}
		//判断滑动结束时如果位置低于 closeHeight 自动关闭，并派发事件
		//If the position is lower than closeHeight at the end of the slide, it will be automatically closed and the event will be dispatched.
		if (((window.innerHeight - currentY) / window.innerHeight) * 100 < closeHeight && closeHeight > 0) {
			visible = false;
			onclose?.();
		}
	};

	//点击遮罩层
	//click mask
	const clickMaskFn = () => {
		//点击遮罩时派发 clickMask 事件
		//Dispatch clickMask event when clicking mask
		onclickMask?.();
		if (maskClosable) {
			visible = false;
		}
	};

	//点击关闭图标
	//click close icon
	const closeFunc = () => {
		visible = false;
		//点击关闭时派发 close 事件
		//Dispatch close event when clicking close
		onclose?.();
	};

	//点击返回图标
	//click back icon
	const backFunc = () => {
		//点击返回时派发 back 事件
		//Dispatch back event when clicking back
		onback?.();
	};

	// 滚动时禁止 body 滚动
	// Disable body scrolling when scrolling
	$effect(() => {
		if (visible) {
			//当 visible 为 true 时，禁止 body 滚动
			//When visible is true, body scrolling is disabled
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
	onMount(() => {
		if (visible && scrollTopDom) {
			// 滚动内容高度
			// Scroll content height
			scrollTopHeight = scrollTopDom.clientHeight;
		}
	});
</script>

{#if visible}
	<Mask visible {duration} {outDuration} {...mask} onclickMask={clickMaskFn} />
{/if}

<div class="pointer-events-none fixed inset-0 flex h-screen w-screen flex-col justify-end px-0" style="z-index:{zIndex};">
	{#if visible}
		<div
			class="fixed w-screen bg-white dark:bg-gray-950{windowRadiusClass[radius] || windowRadiusClass['full']} pointer-events-auto{isTouch
				? ''
				: ' transition-all duration-300'}"
			style="height:{stayHeightList[stayHeightList.length - 1]}%;top:{currentTop}%"
			in:fly={{
				y: (stayHeightList[stayHeightList.length - 1] / 100) * window.innerHeight,
				opacity: 1,
				duration
			}}
			out:fly={{
				y: (stayHeightList[stayHeightList.length - 1] / 100) * window.innerHeight,
				opacity: 1,
				duration: outDuration
			}}
		>
			<div
				onpointerdown={(e: PointerEvent) => touchstartFun(e)}
				onpointermove={(e: PointerEvent) => throttleWithRAF(touchmoveFun)(e)}
				onpointerup={touchendFun}
				bind:this={scrollTopDom}
				class="cursor-move touch-none select-none py-1"
			>
				<div class="h-1 w-8 bg-black/20 dark:bg-white/30 mx-auto{radius === 'none' ? ' rounded-none' : ' rounded-full'}"></div>
				<div class="flex items-center justify-between gap-2 px-3 py-1">
					{#if showBackIcon}
						<button
							class="h-6 w-6 flex-none bg-black/5 dark:bg-white/10 text-center{iconRadiusClass[radius] || iconRadiusClass['full']}"
							onclick={backFunc}
						>
							<Icon name="ri-arrow-left-s-line" alpha={0.4} size={16} top={-2} />
						</button>
					{/if}
					<div class="h-7 truncate text-lg font-bold grow{titleAlignClass[titleAlign] || titleAlignClass['left']}">
						{title}
					</div>
					{#if closeContent === ''}
						<!-- null -->
					{:else if closeContent === 'closeIcon'}
						<button
							class="h-6 w-6 flex-none bg-black/5 dark:bg-white/10 text-center{iconRadiusClass[radius] || iconRadiusClass['full']}"
							onclick={closeFunc}
						>
							<Icon name="ri-close-line" alpha={0.4} size={14} top={-2} />
						</button>
					{:else if closeContent === 'downIcon'}
						<button
							class="h-6 w-6 flex-none bg-black/5 dark:bg-white/10 text-center{iconRadiusClass[radius] || iconRadiusClass['full']}"
							onclick={closeFunc}
						>
							<Icon name="ri-arrow-down-s-line" alpha={0.4} size={16} top={-1} />
						</button>
					{:else}
						<button class="text-primary dark:text-dark cursor-pointer font-bold" onclick={closeFunc}>{closeContent}</button>
					{/if}
				</div>
			</div>
			{#if showDivider}
				<div class="h-px w-full bg-black/5 dark:bg-white/10"></div>
			{/if}
			<div
				class="overflow-auto"
				style="height:{window.innerHeight * ((100 - currentTop) / 100) - scrollTopHeight}px;overscroll-behavior-y: contain;"
			>
				{@render children?.()}
			</div>
		</div>
	{/if}
</div>
