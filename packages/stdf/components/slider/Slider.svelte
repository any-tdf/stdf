<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { throttle, stepNumberFun } from '../utils';

	/**
	 * 当前值
	 * Current value
	 * @type {number}
	 * @range minRange - maxRange
	 * @default 40
	 */
	export let value = 40;

	/**
	 * 步长
	 * Step length
	 * @type {number}
	 * @default 1
	 */
	export let step = 1;

	/**
	 * 可选最小值
	 * Optional minimum value
	 * @type {number}
	 * @default 0
	 */
	export let minRange = 0;

	/**
	 * 可选最大值
	 * Optional maximum value
	 * @type {number}
	 * @default 100
	 */
	export let maxRange = 100;

	/**
	 * 是否为区间选择
	 * is range
	 * @type {boolean}
	 * @default false
	 */
	export let isRange = false;

	/**
	 * 区间选择开始值
	 * Range selection start value
	 * @type {number}
	 * @default 20
	 */
	export let startValue = 20;

	/**
	 * 区间选择结束值
	 * Range selection end value
	 * @type {number}
	 * @default 60
	 */
	export let endValue = 60;

	/**
	 * 提示显示方式
	 * Tip display method
	 * @type {'always'|'touch'|'never'}
	 * @default 'touch'
	 */
	export let showTip = 'touch';

	/**
	 * 圆角
	 * Radius
	 * @type {'none'|'base'|'xl'|'full'}
	 * @default 'full'
	 */
	export let radius = 'full';

	/**
	 * 滑块是否为线框
	 * is line block
	 * @type {boolean}
	 * @default false
	 */
	export let lineBlock = false;

	/**
	 * 是否使用slot
	 * is use slot
	 * @type {boolean}
	 * @default false
	 */
	export let useSlot = false;

	/**
	 * 是否禁用
	 * is disabled
	 * @type {boolean}
	 * @default false
	 */
	export let disabled = false;

	/**
	 * 是否只读
	 * is readonly
	 * @type {boolean}
	 * @default false
	 */
	export let readonly = false;

	let lineDom = null; //滑动条dom slider dom
	let blockDom = null; //滑块dom block dom
	let blockWidth = 0; //滑块宽度 block width
	let lineDomStartX = 0; //滑块条起始位置 slider start position
	let lineDomEndX = 0; //滑块条结束位置 slider end position
	let lineDomWidth = 0; //滑块条宽度 slider width
	let currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth; //初始位置 initial position
	let currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择时开始位置 start position
	let currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择时结束位置 end position
	let currentMove = 'none'; //当前移动的滑块 current move block

	let isDown = false; //是否按下 is down
	const dispatch = createEventDispatcher(); //事件分发器 event dispatcher

	//滑动开始
	//slide start
	const touchLineStart = e => {
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
			dispatch('change', [startValue, endValue]); //触发事件 trigger event
		} else {
			currentMove = 'one';
			currentX = clientX - lineDomStartX;
			value = stepNumberFun((currentX / lineDomWidth) * (maxRange - minRange), step);
			dispatch('change', value); //触发事件 trigger event
		}
	};
	const touchLineMove = e => {
		lineDom.setPointerCapture(e.pointerId);

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
					//由于开启了防抖，有极短时间内会出现currentEndX大于lineDomEndX的情况，所以这里做了一个判断
					//Due to the opening of the anti-shake, there will be a situation where currentEndX is greater than lineDomEndX in a very short time, so a judgment is made here
					currentEndX = currentEndX < currentStartX ? currentStartX : currentEndX;
				}
			}
			startValue = stepNumberFun(minRange + (currentStartX / lineDomWidth) * (maxRange - minRange), step);
			endValue = stepNumberFun(minRange + (currentEndX / lineDomWidth) * (maxRange - minRange), step);
			dispatch('change', [startValue, endValue]); //触发事件 trigger event
		} else {
			if (clientX <= lineDomStartX) {
				currentX = 0;
			} else if (clientX >= lineDomEndX) {
				currentX = lineDomEndX - lineDomStartX;
			} else {
				currentX = clientX - lineDomStartX;
			}
			value = stepNumberFun(minRange + (currentX / lineDomWidth) * (maxRange - minRange), step);
			dispatch('change', value); //触发事件 trigger event
		}
	};
	const touchLineEnd = () => {
		currentMove = 'none';
		isDown = false;
	};
	const radiusObj = { none: ' rounded-none', base: ' rounded', xl: ' rounded-xl', full: ' rounded-full' };
	onMount(() => {
		lineDomStartX = lineDom.getBoundingClientRect().left;
		lineDomEndX = lineDom.getBoundingClientRect().right;
		lineDomWidth = lineDom.getBoundingClientRect().width;
		currentX = ((value - minRange) / (maxRange - minRange)) * lineDomWidth; //挂载完成之后初始位置 initial position after mounting
		currentStartX = ((startValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择开始位置 initial position after mounting
		currentEndX = ((endValue - minRange) / (maxRange - minRange)) * lineDomWidth; //区间选择结束位置 initial position after mounting
		if (isRange) {
			blockWidth = blockDom.getBoundingClientRect().width;
		}
	});
</script>

<div class={`relative h-7${disabled ? ' opacity-50' : ''}`}>
	<div
		on:pointerdown={touchLineStart}
		on:pointermove={throttle(touchLineMove)}
		on:pointerup={touchLineEnd}
		class="absolute flex flex-col justify-center h-7 w-full touch-none cursor-move"
		bind:this={lineDom}
	>
		{#if useSlot}
			<slot />
		{:else}
			<div class={`w-full h-1 bg-black/10 dark:bg-white/20${radiusObj[radius] || radiusObj['full']}`}>
				{#if isRange}
					<div
						class={`bg-primary dark:bg-dark h-1${radiusObj[radius] || radiusObj['full']}`}
						style={`width:${currentEndX - currentStartX}px;transform: translateX(${currentStartX}px);`}
					/>
				{:else}
					<div class={`bg-primary dark:bg-dark h-1${radiusObj[radius] || radiusObj['full']}`} style={`width:${currentX}px`} />
				{/if}
			</div>
		{/if}
	</div>
	{#if isRange}
		<div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
			<div
				class={`${
					lineBlock
						? 'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-black'
						: 'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'
				}${radiusObj[radius] || radiusObj['full']}`}
				style={`transform: translateX(calc(${currentStartX}px - 50%));`}
			>
				{#if showTip === 'always' || (currentMove === 'start' && showTip !== 'never')}
					<div
						class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${
							radius === 'none' ? ' rounded-none' : ' rounded'
						}`}
						style={`left: 50%;transform: translateX(-50%);`}
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{startValue}
						<div
							class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style={`top:100%;left:50%;transform: translateX(-50%)`}
						/>
					</div>
				{/if}
			</div>
		</div>
		<div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
			<div
				class={`${
					lineBlock
						? 'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-black'
						: 'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'
				}${radiusObj[radius] || radiusObj['full']}`}
				style={`transform: translateX(calc(${currentEndX}px - 50%));`}
				bind:this={blockDom}
			>
				{#if showTip === 'always' || (currentMove === 'end' && showTip !== 'never')}
					<div
						class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${
							radius === 'none' ? ' rounded-none' : ' rounded'
						}`}
						style={`left: 50%;transform: translateX(-50%);`}
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{endValue}
						<div
							class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style={`top:100%;left:50%;transform: translateX(-50%)`}
						/>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
			<div
				class={`${
					lineBlock
						? 'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-black'
						: 'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'
				}${radiusObj[radius] || radiusObj['full']}`}
				style={`transform: translateX(calc(${currentX}px - 50%));`}
			>
				{#if showTip === 'always' || (currentMove === 'one' && showTip !== 'never')}
					<div
						class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${
							radius === 'none' ? ' rounded-none' : ' rounded'
						}`}
						style={`left: 50%;transform: translateX(-50%);`}
						in:fly={{ y: 8, duration: 500 }}
						out:fly={{ y: 8, duration: 300 }}
					>
						{value}
						<div
							class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
							style={`top:100%;left:50%;transform: translateX(-50%)`}
						/>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
