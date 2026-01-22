<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttleWithRAF, debounce, stepNumberFun, radiusObj } from '../utils/index.js';
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
		showSteps = false,
		stepsStyle = 'block',
		stepLabels = [],
		radius = '',
		lineBlock = false,
		disabled = false,
		readonly = false,
		children,
		onchange
	}: SliderProps = $props();

	// 根据值获取对应的档位标签 Get step label by value
	const getStepLabel = (val: number) => {
		if (!stepLabels || stepLabels.length === 0) return val;
		const index = Math.round((val - minRange) / step);
		return stepLabels[index] ?? val;
	};

	// 计算档位数量和位置 calculate step count and positions
	let stepCount = $derived(Math.floor((maxRange - minRange) / step) + 1);
	let stepPositions = $derived(
		Array.from({ length: stepCount }, (_, i) => ((i * step) / (maxRange - minRange)) * 100)
	);
	// 档位标记尺寸（像素）step marker size in pixels
	const stepMarkerSize = 8;
	// 滑块与线条之间的间距（像素）gap between slider and line in pixels
	const sliderGap = 2;
	// 滑块尺寸（像素）slider block size in pixels
	let sliderSize = $derived(lineBlock ? 24 : 20);

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
		// 拖动过程中不更新位置，避免跳动 Don't update position during drag to avoid jumping
		if (!isDown) {
			currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth;
		}
	});
	//区间选择时开始位置 start position
	let currentStartX = $state(0);
	$effect(() => {
		// 拖动过程中不更新位置，避免跳动 Don't update position during drag to avoid jumping
		if (!isDown) {
			currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth;
		}
	});
	//区间选择时结束位置 end position
	let currentEndX = $state(0);
	$effect(() => {
		// 拖动过程中不更新位置，避免跳动 Don't update position during drag to avoid jumping
		if (!isDown) {
			currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth;
		}
	});
	//当前移动的滑块 current move block
	let currentMove = $state('none');

	//是否按下 is down
	let isDown = $state(false);

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
			onchange?.(0, [startValue, endValue], undefined, [getStepLabel(startValue), getStepLabel(endValue)]);
		} else {
			currentMove = 'one';
			currentX = clientX - lineDomStartX;
			value = stepNumberFun((currentX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(value, undefined, getStepLabel(value), undefined);
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
			onchange?.(0, [startValue, endValue], undefined, [getStepLabel(startValue), getStepLabel(endValue)]);
		} else {
			if (clientX <= lineDomStartX) {
				currentX = 0;
			} else if (clientX >= lineDomEndX) {
				currentX = lineDomEndX - lineDomStartX;
			} else {
				currentX = clientX - lineDomStartX;
			}
			value = stepNumberFun(minRange + (currentX / lineDomWidth) * (maxRange - minRange), step);
			onchange?.(value, undefined, getStepLabel(value), undefined);
		}
	};
	const touchLineEnd = (e: PointerEvent) => {
		if (lineDom?.hasPointerCapture(e.pointerId)) {
			lineDom?.releasePointerCapture(e.pointerId);
		}
		// 松开时将滑块位置吸附到档位 Snap slider position to step when released
		if (isRange) {
			currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth;
			currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth;
		} else {
			currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth;
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

<div class="flex h-7 px-2.5{disabled ? ' opacity-50' : ''}">
	<div
		onpointerdown={touchLineStart}
		onpointermove={(e) => throttleWithRAF(touchLineMove)(e)}
		onpointerup={touchLineEnd}
		class="relative flex flex-1 cursor-move touch-none flex-col justify-center"
		bind:this={lineDom}
	>
		{#if children}
			{@render children()}
		{:else if showSteps && stepsStyle === 'break'}
			<!-- break 样式：线条被档位隔断 -->
			<div class="relative flex h-1 w-full items-center justify-between">
				{#each stepPositions as pos, i (i)}
					<!-- 档位标记（正方形，圆角跟随滑块） -->
					<div
						class="z-10 bg-text-primary/20 dark:bg-text-dark/30{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
						style="width: {stepMarkerSize}px; height: {stepMarkerSize}px; flex-shrink: 0;"
					></div>
					<!-- 线段（除了最后一个档位后面不需要） -->
					{#if i < stepPositions.length - 1}
						<div
							class="relative mx-0.5 h-1 flex-1 bg-text-primary/10 dark:bg-text-dark/20{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
						></div>
					{/if}
				{/each}
				<!-- 进度条覆盖层 -->
				<div class="pointer-events-none absolute inset-0 flex items-center justify-between">
					{#each stepPositions as pos, i (i)}
						<div
							class="z-20{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}{isRange
								? pos >= (startValue - minRange) / (maxRange - minRange) * 100 && pos <= (endValue - minRange) / (maxRange - minRange) * 100
									? ' bg-primary dark:bg-dark'
									: ' bg-transparent'
								: pos <= (value - minRange) / (maxRange - minRange) * 100
									? ' bg-primary dark:bg-dark'
									: ' bg-transparent'}"
							style="width: {stepMarkerSize}px; height: {stepMarkerSize}px; flex-shrink: 0;"
						></div>
						{#if i < stepPositions.length - 1}
							{@const segmentStart = pos}
							{@const segmentEnd = stepPositions[i + 1]}
							{@const progressPercent = isRange
								? (endValue - minRange) / (maxRange - minRange) * 100
								: (value - minRange) / (maxRange - minRange) * 100}
							{@const rangeStartPercent = isRange ? (startValue - minRange) / (maxRange - minRange) * 100 : 0}
							<div
								class="relative mx-0.5 h-1 flex-1 overflow-hidden{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
							>
								{#if isRange}
									{@const segmentRangeStart = Math.max(0, (rangeStartPercent - segmentStart) / (segmentEnd - segmentStart) * 100)}
									{@const segmentRangeEnd = Math.min(100, (progressPercent - segmentStart) / (segmentEnd - segmentStart) * 100)}
									{#if segmentRangeEnd > 0 && segmentRangeStart < 100}
										<div
											class="absolute h-full bg-primary dark:bg-dark{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
											style="left: {Math.max(0, segmentRangeStart)}%; width: {Math.max(0, segmentRangeEnd - segmentRangeStart)}%;"
										></div>
									{/if}
								{:else}
									{@const segmentProgress = Math.min(100, Math.max(0, (progressPercent - segmentStart) / (segmentEnd - segmentStart) * 100))}
									<div
										class="h-full bg-primary dark:bg-dark{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
										style="width: {segmentProgress}%;"
									></div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{:else}
			<!-- 默认样式或 block 样式：连续线条 + 档位标记 -->
			<div class="relative h-1 w-full bg-text-primary/10 dark:bg-text-dark/20{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}">
				{#if showSteps}
					{#each stepPositions as pos (pos)}
						<div
							class="absolute top-1/2 -translate-y-1/2 bg-text-primary/20 dark:bg-text-dark/30{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
							style="left: calc({pos}% - {stepMarkerSize / 2}px); width: {stepMarkerSize}px; height: {stepMarkerSize}px;"
						></div>
					{/each}
				{/if}
				{#if isRange}
					<!-- 区间进度条，两端留出滑块间距 Range progress bar with slider gaps -->
					{@const rangeGapStart = currentStartX + sliderSize / 2 + sliderGap}
					{@const rangeGapEnd = currentEndX - sliderSize / 2 - sliderGap}
					{@const rangeWidth = Math.max(0, rangeGapEnd - rangeGapStart)}
					<div
						class="bg-primary dark:bg-dark h-1{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
						style="width:{rangeWidth}px;transform: translateX({rangeGapStart}px);"
					></div>
					{#if showSteps}
						{#each stepPositions as pos (pos)}
							{@const posPercent = pos}
							{@const startPercent = (startValue - minRange) / (maxRange - minRange) * 100}
							{@const endPercent = (endValue - minRange) / (maxRange - minRange) * 100}
							{#if posPercent >= startPercent && posPercent <= endPercent}
								<div
									class="absolute top-1/2 -translate-y-1/2 bg-primary dark:bg-dark{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
									style="left: calc({pos}% - {stepMarkerSize / 2}px); width: {stepMarkerSize}px; height: {stepMarkerSize}px;"
								></div>
							{/if}
						{/each}
					{/if}
				{:else}
					<!-- 单值进度条，在滑块前留出间距 Single value progress bar with slider gap -->
					{@const progressWidth = Math.max(0, currentX - sliderSize / 2 - sliderGap)}
					<div class="bg-primary dark:bg-dark h-1{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}" style="width:{progressWidth}px"></div>
					{#if showSteps}
						{#each stepPositions as pos (pos)}
							{@const posPercent = pos}
							{@const valuePercent = (value - minRange) / (maxRange - minRange) * 100}
							{#if posPercent <= valuePercent}
								<div
									class="absolute top-1/2 -translate-y-1/2 bg-primary dark:bg-dark{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
									style="left: calc({pos}% - {stepMarkerSize / 2}px); width: {stepMarkerSize}px; height: {stepMarkerSize}px;"
								></div>
							{/if}
						{/each}
					{/if}
				{/if}
			</div>
		{/if}
		<!-- 滑块 Slider blocks -->
		{#if isRange}
			<div class="pointer-events-none absolute inset-0 flex h-7 flex-col justify-center">
				<div
					class="{lineBlock
						? 'border-primary dark:border-dark h-6 w-6 border bg-bg-base dark:bg-bg-base-dark'
						: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
					class:transition-transform={!isDown}
					class:duration-300={!isDown}
					class:ease-out={!isDown}
					style="transform: translateX(calc({currentStartX}px - 50%));"
				>
					{#if showTip === 'always' || (currentMove === 'start' && showTip !== 'never')}
						<div
							class="absolute -top-9 whitespace-nowrap bg-text-primary/90 py-1 text-xs text-text-dark dark:bg-text-dark dark:text-text-primary px-2{radius === 'none'
								? ' rounded-none'
								: ' rounded-sm'}"
							style="left: 50%;transform: translateX(-50%);"
							in:fly={{ y: 8, duration: 500 }}
							out:fly={{ y: 8, duration: 300 }}
						>
							{getStepLabel(startValue)}
							<div
								class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-text-primary/90 dark:border-t-text-dark"
								style="top:100%;left:50%;transform: translateX(-50%)"
							></div>
						</div>
					{/if}
				</div>
			</div>
			<div class="pointer-events-none absolute inset-0 flex h-7 flex-col justify-center">
				<div
					class="{lineBlock
						? 'border-primary dark:border-dark h-6 w-6 border bg-bg-base dark:bg-bg-base-dark'
						: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
					class:transition-transform={!isDown}
					class:duration-300={!isDown}
					class:ease-out={!isDown}
					style="transform: translateX(calc({currentEndX}px - 50%));"
					bind:this={blockDom}
				>
					{#if showTip === 'always' || (currentMove === 'end' && showTip !== 'never')}
						<div
							class="absolute -top-9 whitespace-nowrap bg-text-primary/90 py-1 text-xs text-text-dark dark:bg-text-dark dark:text-text-primary px-2{radius === 'none'
								? ' rounded-none'
								: ' rounded-sm'}"
							style="left: 50%;transform: translateX(-50%);"
							in:fly={{ y: 8, duration: 500 }}
							out:fly={{ y: 8, duration: 300 }}
						>
							{getStepLabel(endValue)}
							<div
								class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-text-primary/90 dark:border-t-text-dark"
								style="top:100%;left:50%;transform: translateX(-50%)"
							></div>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div class="pointer-events-none absolute inset-0 flex h-7 flex-col justify-center">
				<div
					class="{lineBlock
						? 'border-primary dark:border-dark h-6 w-6 border bg-bg-base dark:bg-bg-base-dark'
						: 'bg-primary ring-primary/10 dark:bg-dark dark:ring-dark/10 h-5 w-5 ring-4'}{ ` ${radius ? radiusObj[radius] : 'rounded-(--radius-small)'}`}"
					class:transition-transform={!isDown}
					class:duration-300={!isDown}
					class:ease-out={!isDown}
					style="transform: translateX(calc({currentX}px - 50%));"
				>
					{#if showTip === 'always' || (currentMove === 'one' && showTip !== 'never')}
						<div
							class="absolute -top-9 whitespace-nowrap bg-text-primary/90 py-1 text-xs text-text-dark dark:bg-text-dark dark:text-text-primary px-2{radius === 'none'
								? ' rounded-none'
								: ' rounded-sm'}"
							style="left: 50%;transform: translateX(-50%);"
							in:fly={{ y: 8, duration: 500 }}
							out:fly={{ y: 8, duration: 300 }}
						>
							{getStepLabel(value)}
							<div
								class="absolute h-0 w-0 border-4 border-t-4 border-transparent border-t-text-primary/90 dark:border-t-text-dark"
								style="top:100%;left:50%;transform: translateX(-50%)"
							></div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
