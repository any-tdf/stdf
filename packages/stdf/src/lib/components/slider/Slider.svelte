<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF, debounce, stepNumberFun } from '../utils/index.js';
	import type { SliderProps } from '../../types/index.js';

	let {
		value = $bindable(40),
		step = 1,
		minRange = 0,
		maxRange = 100,
		isRange = false,
		valueRange = $bindable([20, 60]),
		startValue = $bindable(20),
		endValue = $bindable(60),
		showTip = 'touch',
		radius = 'full',
		lineBlock = false,
		disabled = false,
		readonly = false,
		children,
		onchange
	}: SliderProps = $props();

	//滑动条 dom slider dom
	let lineDom = $state<HTMLDivElement | null>(null);
	//滑块 dom block dom
	let blockDom = $state<HTMLDivElement | null>(null);
	//滑块宽度 block width
	let blockWidth = $state(0);
	//滑块条起始位置 slider start position
	let lineDomStartX = $state(0);
	//滑块条结束位置 slider end position
	let lineDomEndX = $state(0);
	//滑块条宽度 slider width
	let lineDomWidth = $state(0);
	//初始位置 initial position
	let currentX = $state(0);
	$effect(() => {
		currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth;
	});
	//区间选择时开始位置 start position
	let currentStartX = $state(0);
	$effect(() => {
		currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth;
	});
	//区间选择时结束位置 end position
	let currentEndX = $state(0);
	$effect(() => {
		currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth;
	});
	//当前移动的滑块 current move block
	let currentMove = $state('none');

	//是否按下 is down
	let isDown = false;
	const radiusObj = { none: ' rounded-none', sm: ' rounded-sm', xl: ' rounded-xl', full: ' rounded-full' };

	const touchLineStart = (e: PointerEvent) => {
		if (disabled || readonly) {
			return;
		}
		isDown = true;
		const clientX = e.clientX;
		if (isRange) {
			//判断点击位置距离哪一个更近
			// Determine which one is closer to the click position
			if (startValue === endValue) {
				if (clientX - lineDomStartX <= currentStartX) {
					// 点击的是开始滑块
					// Click on the start block
					currentMove = 'start';
					currentStartX = clientX - lineDomStartX;
				} else {
					// 点击的是结束滑块
					// Click on the end block
					currentMove = 'end';
					currentEndX = clientX - lineDomStartX;
				}
			} else if (Math.abs(clientX - currentStartX - lineDomStartX) < Math.abs(clientX - currentEndX - lineDomStartX)) {
				// 点击的是开始滑块
				// Click on the start block
				currentMove = 'start';
				currentStartX = clientX - lineDomStartX;
			} else {
				// 点击的是结束滑块
				// Click on the end block
				currentMove = 'end';
				currentEndX = clientX - lineDomStartX;
			}
			startValue = stepNumberFun(minRange + (currentStartX / lineDomWidth) * (maxRange - minRange), step);
			endValue = stepNumberFun(minRange + (currentEndX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(0, [startValue, endValue]);
		} else {
			currentMove = 'one';
			currentX = clientX - lineDomStartX;
			value = stepNumberFun((currentX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(value);
		}
	};
	const touchLineMove = (e: PointerEvent) => {
		if (!lineDom?.hasPointerCapture(e.pointerId)) {
			lineDom?.setPointerCapture(e.pointerId);
		}
		if (disabled || readonly) {
			return;
		}
		if (!isDown) {
			return;
		}
		const clientX = e.clientX;
		if (isRange) {
			if (currentMove === 'start') {
				if (clientX <= lineDomStartX) {
					currentStartX = 0;
				} else if (clientX >= currentEndX + blockWidth / 2) {
					currentStartX = currentEndX;
				} else {
					currentStartX = clientX - lineDomStartX;
				}
			} else {
				if (clientX <= currentStartX + blockWidth / 2) {
					currentEndX = currentStartX;
				} else if (clientX >= lineDomEndX) {
					currentEndX = lineDomEndX - lineDomStartX;
				} else {
					currentEndX = clientX - lineDomStartX;
					//由于开启了防抖，有极短时间内会出现 currentEndX 大于 lineDomEndX 的情况，所以这里做了一个判断
					//Due to the opening of the anti-shake, there will be a situation where currentEndX is greater than lineDomEndX in a very short time, so a judgment is made here
					currentEndX = currentEndX < currentStartX ? currentStartX : currentEndX;
				}
			}
			startValue = stepNumberFun(minRange + (currentStartX / lineDomWidth) * (maxRange - minRange), step);
			endValue = stepNumberFun(minRange + (currentEndX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(0, [startValue, endValue]);
		} else {
			if (clientX <= lineDomStartX) {
				currentX = 0;
			} else if (clientX >= lineDomEndX) {
				currentX = lineDomEndX - lineDomStartX;
			} else {
				currentX = clientX - lineDomStartX;
			}
			value = stepNumberFun(minRange + (currentX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(value);
		}
	};
	const touchLineEnd = (e: PointerEvent) => {
		if (lineDom?.hasPointerCapture(e.pointerId)) {
			lineDom?.releasePointerCapture(e.pointerId);
		}
		currentMove = 'none';
		isDown = false;
	};
	const handleResize = () => {
		if (!lineDom) return;
		lineDomStartX = lineDom.getBoundingClientRect().left;
		lineDomEndX = lineDom.getBoundingClientRect().right;
		lineDomWidth = lineDom.getBoundingClientRect().width;
		currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth; //挂载完成之后初始位置 initial position after mounting
		currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择开始位置 initial position after mounting
		currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择结束位置 initial position after mounting
		if (isRange && blockDom) {
			blockWidth = blockDom.getBoundingClientRect().width;
		}
	};
	onMount(() => {
		handleResize();
		window.addEventListener('resize', debounce(handleResize, 200));
	});
</script>

<div class="relative h-7{disabled ? ' opacity-50' : ''}">
	<div
		onpointerdown={touchLineStart}
		onpointermove={(e) => throttleWithRAF(touchLineMove)(e)}
		onpointerup={touchLineEnd}
		class="absolute flex h-7 w-full cursor-move touch-none flex-col justify-center"
		bind:this={lineDom}
	>
		{#if children}
			{@render children()}
		{:else}
			<div class="h-1 w-full bg-black/10 dark:bg-white/20{radiusObj[radius] || radiusObj['full']}">
				{#if isRange}
					<div
						class="bg-primary dark:bg-dark h-1{radiusObj[radius] || radiusObj['full']}"
						style="width:{currentEndX - currentStartX}px;transform: translateX({currentStartX}px);"
					></div>
				{:else}
					<div class="bg-primary dark:bg-dark h-1{radiusObj[radius] || radiusObj['full']}" style="width:{currentX}px"></div>
				{/if}
			</div>
		{/if}
	</div>
	{#if isRange}
		<div class="pointer-events-none absolute flex h-7 w-full flex-col justify-center">
			<div
				class="{lineBlock
					? 'border-primary dark:border-dark h-6 w-6 border bg-white dark:bg-black'
					: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{radiusObj[radius] || radiusObj['full']}"
				style="transform: translateX(calc({currentStartX}px - 50%));"
			>
				{#if showTip === 'always' || (currentMove === 'start' && showTip !== 'never')}
					<div
						class="absolute -top-9 bg-black/90 py-1 text-xs text-white dark:bg-white dark:text-black px-2{radius === 'none'
							? ' rounded-none'
							: ' rounded-sm'}"
						style="left: 50%;transform: translateX(-50%);"
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{startValue}
						<div
							class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style="top:100%;left:50%;transform: translateX(-50%)"
						></div>
					</div>
				{/if}
			</div>
		</div>
		<div class="pointer-events-none absolute flex h-7 w-full flex-col justify-center">
			<div
				class="{lineBlock
					? 'border-primary dark:border-dark h-6 w-6 border bg-white dark:bg-black'
					: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{radiusObj[radius] || radiusObj['full']}"
				style="transform: translateX(calc({currentEndX}px - 50%));"
				bind:this={blockDom}
			>
				{#if showTip === 'always' || (currentMove === 'end' && showTip !== 'never')}
					<div
						class="absolute -top-9 bg-black/90 py-1 text-xs text-white dark:bg-white dark:text-black px-2{radius === 'none'
							? ' rounded-none'
							: ' rounded-sm'}"
						style="left: 50%;transform: translateX(-50%);"
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{endValue}
						<div
							class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style="top:100%;left:50%;transform: translateX(-50%)"
						></div>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="pointer-events-none absolute flex h-7 w-full flex-col justify-center">
			<div
				class="{lineBlock
					? 'border-primary dark:border-dark h-6 w-6 border bg-white dark:bg-black'
					: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{radiusObj[radius] || radiusObj['full']}"
				style="transform: translateX(calc({currentX}px - 50%));"
			>
				{#if showTip === 'always' || (currentMove === 'one' && showTip !== 'never')}
					<div
						class="absolute -top-9 bg-black/90 py-1 text-xs text-white dark:bg-white dark:text-black px-2{radius === 'none'
							? ' rounded-none'
							: ' rounded-sm'}"
						style="left: 50%;transform: translateX(-50%);"
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{value}
						<div
							class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style="top:100%;left:50%;transform: translateX(-50%)"
						></div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
