<script lang="ts">
	import { onMount } from 'svelte';
	import type { SwiperProps } from '../../types';

	let {
		data = [],
		interval = 4,
		duration = 1000,
		autoplay = true,
		lazyplay = true,
		initActive = 0,
		indicatePosition = 'inner',
		indicateAlign = 'center',
		indicateStyle = 'pointLine',
		indicateRadius = true,
		indicateInjClass = '',
		indicateColor = '',
		indicateActiveColor = '',
		aspectRatio = [16, 9],
		containerWidth = 0,
		px = '0',
		py = '0',
		translateX = 0,
		translateZ = 0,
		rotateX = 0,
		rotateY = 0,
		rotateZ = 0,
		activeInjClass = '',
		notActiveInjClass = '',
		radius = 'none',
		innerInjClass = '',
		triggerLong = 30,
		notTriggerLong = 10,
		triggerSpeed = 0.5,
		onchange,
		onclick,
	}: SwiperProps = $props();

	let width = containerWidth === 0 ? document.body.clientWidth : containerWidth; //宽度 width
	let active = $state(data.length > 1 ? initActive + 1 : 1); //当前激活的item current active item
	let currentIndicate = $state(data.length > 1 ? initActive : 0); //当前激活的指示器  current active indicate
	let longTransition = $state(true); //长线指示器过渡 long line indicate transition
	let long = $state(false); //长线指示器是否较长状态 long line indicate is long
	let once = $state(true); //是否是第首次轮播，处理轮播间隔与过渡时间的差异 is first time play, handle interval and duration difference
	let translateXTransition = $state(true); //是否进行过渡动画 is transition animation
	let initialState = true; //是否是初始状态 is initial state
	let startX = 0; //滑动开始X坐标 when start touch x position
	let moveX = $state(0); //滑动移动X坐标 when move touch x position
	let startTime = 0; //滑动开始时间 when start touch time
	let endTime = 0; //滑动结束时间 when end touch time
	let isMove = false; //是否滑动 is touch move
	// let transition = true;
	let swiperDom = $state(null); //Swiper容器
	let movePercent = $derived(moveX / width); //滑动距离占总宽度的百分比 touch width percent

	const dataNew =
		data.length > 1
			? [data[data.length - 1], ...data, data[0], data[1]]
			: data.length === 1
				? [data[data.length - 1], ...data, data[0]]
				: data; //实现无限轮播，复制一个新数组，防止改变原数组 implement infinite loop, copy a new array to prevent change original array
	const indicateAlignObj = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };
	const pxObj = { '0': '', '1': 'px-1', '2': 'px-2', '4': 'px-4', '6': 'px-6', '8': 'px-8', '12': 'px-12', '16': 'px-16', '24': 'px-24' };
	const pyObj = { '0': '', '1': 'py-1', '2': 'py-2', '4': 'py-4', '6': 'py-6', '8': 'py-8', '12': 'py-12' };
	const radiusObj = { none: 'rounded-none', base: 'rounded-base', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' };
	//根据 indicateStyle 和是否激活生成不同样式的 indicate
	//generate different style indicate according to indicateStyle and isActive
	const indicateStyleInnerFun = (indicateStyle, isActive, indicateColor, indicateActiveColor) => {
		switch (indicateStyle) {
			case 'point':
				return isActive
					? `w-1.5 h-1.5 ${indicateActiveColor === '' ? 'bg-white' : indicateActiveColor}`
					: `w-1.5 h-1.5 ${indicateColor === '' ? 'bg-white/40' : indicateColor}`;
			case 'line':
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-white' : indicateActiveColor}`
					: `w-6 h-1 ${indicateColor === '' ? 'bg-white/40' : indicateColor}`;
			case 'pointLine':
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-white' : indicateActiveColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-white' : indicateColor}`;
			case 'longLine':
				return isActive
					? `w-16 h-1 ${indicateColor === '' ? 'bg-white/40' : indicateColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-white/40' : indicateColor}`;
			default:
				console.log('传入的indicateStyle不在备选参数之内，将使用默认值！');
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-white' : indicateActiveColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-white' : indicateColor}`;
		}
	};
	const indicateStyleOutFun = (indicateStyle, isActive, indicateColor, indicateActiveColor) => {
		switch (indicateStyle) {
			case 'point':
				return isActive
					? `w-1.5 h-1.5 ${indicateActiveColor === '' ? 'bg-primary dark:bg-dark' : indicateActiveColor}`
					: `w-1.5 h-1.5 ${indicateColor === '' ? 'bg-black/20 dark:bg-white/40' : indicateColor}`;
			case 'line':
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-primary dark:bg-dark' : indicateActiveColor}`
					: `w-6 h-1 ${indicateColor === '' ? 'bg-black/20 dark:bg-white/40' : indicateColor}`;
			case 'pointLine':
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-primary dark:bg-dark' : indicateActiveColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-primary dark:bg-dark' : indicateColor}`;
			case 'longLine':
				return isActive
					? `w-16 h-1 ${indicateColor === '' ? 'bg-black/5 dark:bg-white/10' : indicateColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-black/20 dark:bg-white/40' : indicateColor}`;
			default:
				console.log('传入的indicateStyle不在备选参数之内，将使用默认值！');
				return isActive
					? `w-6 h-1 ${indicateActiveColor === '' ? 'bg-primary dark:bg-dark' : indicateActiveColor}`
					: `w-1 h-1 ${indicateColor === '' ? 'bg-primary dark:bg-dark' : indicateColor}`;
		}
	};
	//对需要处理的偏移与旋转数值进行处理
	//process the offset and rotate value that need to be processed
	const translateXFun = (i, active, translateX) => {
		if (i === active) {
			return '0px';
		}
		if (i < active) {
			return `${translateX}px`;
		}
		if (i > active) {
			return `${-translateX}px`;
		}
	};
	const translateZFun = (i, active, translateZ, movePercent) =>
		i === active
			? `${0 - Math.abs(translateZ * (isMove ? movePercent : 0))}px`
			: `${-translateZ + Math.abs(translateZ * (isMove ? movePercent : 0))}px`;

	const rotateXFun = (i, active, rotateX, movePercent) => {
		if (i === active) {
			return `${-rotateX * (isMove ? movePercent : 0)}deg`;
		}
		if (i < active) {
			return `${rotateX - rotateX * (isMove ? movePercent : 0)}deg`;
		}
		if (i > active) {
			return `${-rotateX - rotateX * (isMove ? movePercent : 0)}deg`;
		}
	};
	const rotateYFun = (i, active, rotateY, movePercent) => {
		if (i === active) {
			return `${-rotateY * (isMove ? movePercent : 0)}deg`;
		}
		if (i < active) {
			return `${rotateY - rotateY * (isMove ? movePercent : 0)}deg`;
		}
		if (i > active) {
			return `${-rotateY - rotateY * (isMove ? movePercent : 0)}deg`;
		}
	};
	const rotateZFun = (i, active, rotateZ, movePercent) => {
		if (i === active) {
			return `${-rotateZ * (isMove ? movePercent : 0)}deg`;
		}
		if (i < active) {
			return `${rotateZ - rotateZ * (isMove ? movePercent : 0)}deg`;
		}
		if (i > active) {
			return `${-rotateZ - rotateZ * (isMove ? movePercent : 0)}deg`;
		}
	};
	const zIndexFun = (i, active, dataNew) => {
		if (i === active) {
			return i + 2;
		}
		if (i < active) {
			return -(dataNew.length - i - 1) + dataNew.length;
		}
		if (i > active) {
			return 2 * active - i + 2;
		}
	};
	//定时器
	// timer
	let intervalTime = null;
	//定时器执行函数
	// timer function
	const intervalTimeFun = () => {
		intervalTime = setInterval(() => {
			once = false;
			initialState = false;
			active++;
			currentIndicate++;
			long = false;
			longTransition = false;
			setTimeout(() => {
				long = autoplay;
				longTransition = true;
			}, duration);
			if (active === dataNew.length - 2) {
				//最后一个
				// the last one
				currentIndicate = 0;
				setTimeout(() => {
					// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
					// After the switching animation is completed, turn off the transition animation, and at the same time, the displayed part is secretly replaced with the original appearance.
					active = 1;
					// transition = false;
					translateXTransition = false;
				}, duration);
			} else {
				//开启过渡
				// turn on transition
				// transition = true;
				translateXTransition = !initialState;
			}
			//派发Swiper容器change事件，i表示当前容器索引值
			// dispatch the Swiper container change event, i indicates the current container index value
			onchange && onchange(currentIndicate);
		}, interval * 1000);
	};
	//判断Swiper容器是否在可视区域内，如果在，则开启定时器，否则不开启定时器
	// Determine whether the Swiper container is in the visible area. If it is, start the timer, otherwise do not start the timer
	const io = new IntersectionObserver(entries => {
		entries.forEach(item => {
			// isIntersecting是一个Boolean值，判断目标元素当前是否可见
			// isIntersecting is a Boolean value that determines whether the target element is currently visible
			if (item.isIntersecting) {
				if (autoplay) {
					clearInterval(intervalTime); //清除定时器 clear timer
					intervalTimeFun();
				}
			} else {
				clearInterval(intervalTime); //清除定时器 clear timer
			}
		});
	});
	onMount(() => {
		if (duration >= interval * 1000) {
			console.log('间隔时间必须大于过渡时间');
			return false;
		}
		// 加载完成后，通过定时器使item自动轮播。
		// After loading, use the timer to make the item automatically rotate.
		if (data.length < 2 || !autoplay) return false;
		long = false;
		longTransition = false;
		setTimeout(() => {
			long = autoplay;
			longTransition = true;
		}, 0);
		//懒轮播
		if (lazyplay) {
			io.observe(swiperDom);
		} else {
			if (autoplay) {
				clearInterval(intervalTime); //清除定时器 clear timer
				intervalTimeFun();
			}
		}
		return () => clearInterval(intervalTime); //清除定时器 clear timer
	});
	//点击事件
	// click event
	const clickImgFun = () => {
		//派发Swiper容器点击事件，currentIndicate表示点击的容器索引值
		// dispatch the Swiper container click event, currentIndicate indicates the index value of the clicked container
		onclick && onclick(currentIndicate);
	};
	//滑动开始
	// slide start
	const touchstartFun = e => {
		// 阻止默认事件
		// prevent default event
		e.preventDefault();
		isMove = true;
		startTime = new Date().getTime();
		translateXTransition = false;
		startX = e.clientX;
	};
	//滑动中
	// slideing
	const touchmoveFun = e => {
		if (!isMove) return false;
		swiperDom.setPointerCapture(e.pointerId);
		clearInterval(intervalTime); //清除定时器 clear timer
		moveX = e.clientX - startX;
	};

	//滑动结束
	// slide end
	const touchendFun = () => {
		endTime = new Date().getTime();
		const moveXABS = Math.abs(moveX); //滑动距离，moveX绝对值。  slide distance, moveX absolute value
		const timeLong = endTime - startTime; //滑动时间  slide time
		const speed = moveXABS / timeLong; //滑动速度阈值  slide speed threshold

		//滑动距离大于等于容器宽度 triggerLong/100 不用考虑滑动速度，都触发切换。
		//滑动距离小于等于容器宽度 notTriggerLong/100，无论速度快慢都不触发切换。
		//滑动距离大于容器宽度 notTriggerLong/100 且小于 triggerLong/100，需要判断滑动速度，用一个速度阈值来判断。阈值大于等于 triggerSpeed 切换，否则不切换。
		// The sliding distance is greater than or equal to the container width triggerLong/100, and the sliding speed does not need to be considered, and the switching is triggered.
		// The sliding distance is less than or equal to the container width notTriggerLong/100, and the switching is not triggered regardless of the speed.
		// The sliding distance is greater than the container width notTriggerLong/100 and less than triggerLong/100, the sliding speed needs to be judged, and a speed threshold is used to judge. The threshold is greater than or equal to triggerSpeed to switch, otherwise it will not switch.

		isMove = false;
		translateXTransition = true;

		long = false;
		longTransition = false;
		setTimeout(() => {
			long = autoplay;
			longTransition = true;
		}, duration);
		if (moveX <= -(width * (triggerLong / 100))) {
			//左滑
			// slide left
			moveX = 0;
			currentIndicate++;
			active++;
			if (active === dataNew.length - 2) {
				//最后一个
				// the last one
				currentIndicate = 0;
				setTimeout(() => {
					// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
					// After the switching animation is completed, turn off the transition animation, and at the same time, replace the displayed part with the original appearance.
					active = 1;
					translateXTransition = false;
				}, duration);
			}
		} else if (moveX >= width * (triggerLong / 100)) {
			moveX = 0;
			currentIndicate--;
			active--;
			if (active === 0) {
				//第0个
				// the first one
				currentIndicate = dataNew.length - 4;
				setTimeout(() => {
					// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
					// After the switching animation is completed, turn off the transition animation, and at the same time, replace the displayed part with the original appearance.
					active = dataNew.length - 3;
					translateXTransition = false;
				}, duration);
			}
		} else if (moveXABS > (notTriggerLong / 100) * width && moveXABS < width * (triggerLong / 100)) {
			if (moveX < 0 && speed >= triggerSpeed) {
				//左滑
				// slide left
				moveX = 0;
				currentIndicate++;
				active++;
				if (active === dataNew.length - 2) {
					//最后一个
					// last one
					currentIndicate = 0;
					setTimeout(() => {
						// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
						// After the switching animation is completed, turn off the transition animation, and at the same time, replace the displayed part with the original appearance.
						active = 1;
						translateXTransition = false;
					}, duration);
				}
			} else if (moveX > 0 && speed >= triggerSpeed) {
				//右滑
				// slide right
				moveX = 0;
				currentIndicate--;
				active--;
				if (active === 0) {
					//第0个
					// the first one
					currentIndicate = dataNew.length - 4;
					setTimeout(() => {
						// 切换动画完成后，关闭过渡动画，同时将展示的部分偷偷替换为最开始的样子。
						// After the switching animation is completed, turn off the transition animation, and at the same time, replace the displayed part with the original appearance.
						active = dataNew.length - 3;
						translateXTransition = false;
					}, duration);
				}
			} else {
				moveX = 0;
			}
		} else {
			moveX = 0;
		}
		if (autoplay) {
			clearInterval(intervalTime); //清除定时器 clear timer
			intervalTimeFun();
		} else {
			//派发Swiper容器change事件，i表示当前容器索引值  Dispatch the Swiper container change event, i indicates the current container index value
			onchange && onchange(currentIndicate);
		}
	};
</script>

<div
	bind:this={swiperDom}
	onpointerdown={touchstartFun}
	onpointermove={touchmoveFun}
	onpointerup={touchendFun}
	class="touch-none cursor-move"
>
	<!-- 轮播容器 -->
	<!-- Carousel container -->
	<div class="overflow-hidden relative" style="width:{width}px;height:{(width * aspectRatio[1]) / aspectRatio[0]}px;perspective:{width}px;">
		<!-- 通过循环dataNew渲染多个item -->
		<!-- Render multiple item through loop dataNew -->
		{#each dataNew as item, i}
			<div
				class="absolute {pxObj[px] || ''} {pyObj[py] || ''} {translateXTransition ? 'transition-all' : 'transition-none'} {i === active
					? activeInjClass
					: notActiveInjClass}"
				style="width:{width}px;height:{(width * aspectRatio[1]) / aspectRatio[0]}px;left:{width * (i - active) +
					moveX}px;transition-duration: {duration}ms;z-index:{zIndexFun(i, active, dataNew)};transform:translateX({translateXFun(
					i,
					active,
					translateX,
				)}) translateZ({translateZFun(i, active, translateZ, movePercent)}) rotateX({rotateXFun(
					i,
					active,
					rotateX,
					movePercent,
				)}) rotateY({rotateYFun(i, active, rotateY, movePercent)}) rotateZ({rotateZFun(i, active, rotateZ, movePercent)});"
			>
				{#if item.type === 'img'}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<img onclick={clickImgFun} class="object-cover w-full h-full {radiusObj[radius] || ''} {innerInjClass}" src={item.url} alt="" />
				{/if}
				{#if item.type === 'component'}
					<div class="w-full h-full {radiusObj[radius] || ''} {innerInjClass}">
						<item.component />
					</div>
				{/if}
			</div>
		{/each}
		<!-- 轮播指示器(内部) -->
		<!-- Carousel indicator (inner) -->
		<div
			class:hidden={data.length < 2 || indicatePosition === 'out' || indicatePosition === null}
			class="absolute bottom-0 flex pt-4 pb-2 px-4 space-x-2 w-full bg-gradient-to-b from-black/0 to-black/40 z-50 {indicateInjClass} {indicateAlignObj[
				indicateAlign
			] || indicateAlignObj.center}"
		>
			<!-- eslint-disable-next-line no-unused-vars -->
			{#each data as item, i}
				<div
					class="{indicateStyleInnerFun(indicateStyle, currentIndicate === i, indicateColor, indicateActiveColor)} {indicateRadius &&
						'rounded-full'} transition-all"
					style="transition-duration: {duration}ms;"
				>
					{#if indicateStyle === 'longLine'}
						<div
							class="absolute h-1 transition-all {long ? 'ease-linear' : ''} {indicateRadius && 'rounded-full'} {long &&
							currentIndicate === i
								? 'w-16'
								: 'w-1'} {indicateActiveColor === '' ? 'bg-white' : indicateActiveColor}"
							style={longTransition
								? `transition-duration: ${currentIndicate === 0 && once ? interval * 1000 : interval * 1000 - duration}ms`
								: `transition-duration:${duration}ms`}
						></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<!-- 轮播指示器(外部) -->
	<!-- Carousel indicator (outer) -->
	<div
		class:hidden={data.length < 2 || indicatePosition === 'inner' || indicatePosition === null}
		class="flex py-3 px-4 space-x-2 w-full {indicateAlignObj[indicateAlign] || indicateAlignObj.center} {indicateInjClass}"
	>
		{#each data as item, i}
			<div
				class="{indicateStyleOutFun(indicateStyle, currentIndicate === i, indicateColor, indicateActiveColor)} {indicateRadius &&
					'rounded-full'} transition-all"
				style="transition-duration: {duration}ms;"
			>
				{#if indicateStyle === 'longLine'}
					<div
						class="absolute h-1 transition-all {long ? 'ease-linear' : ''} {indicateRadius && 'rounded-full'} {long && currentIndicate === i
							? 'w-16'
							: 'w-1'} {indicateActiveColor === '' ? 'bg-primary dark:bg-dark' : indicateActiveColor}"
						style={longTransition
							? `transition-duration: ${currentIndicate === 0 && once ? interval * 1000 : interval * 1000 - duration}ms;`
							: `transition-duration:${duration}ms`}
					></div>
				{/if}
			</div>
		{/each}
	</div>
</div>
