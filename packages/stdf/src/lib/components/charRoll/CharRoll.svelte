<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { CharRollProps, CharRollPreset } from '../../types/index.js';
	import * as easing from 'svelte/easing';

	let {
		value = '',
		duration = 1000,
		delay = 0,
		stagger = 50,
		direction = 'up',
		height = 40,
		separator = false,
		decimal,
		prefix = '',
		suffix = '',
		charSet,
		preset = 'number',
		loops = 1,
		autoStart = true,
		loop = false,
		loopInterval = 3000,
		easing: easingType = 'cubicOut',
		radius = 'sm',
		bg = 'none',
		gap = '1',
		fontSize = 'xl',
		fontWeight = 'bold',
		injClass = '',
		charClass = '',
		children,
		onstart,
		oncomplete,
		onchange
	}: CharRollProps = $props();

	// 预设字符集映射
	// Preset character set mapping
	const presetCharSets: Record<CharRollPreset, string> = {
		number: '0123456789',
		letter: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		letterUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		letterLower: 'abcdefghijklmnopqrstuvwxyz',
		alphanumeric: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		hex: '0123456789abcdef',
		hexUpper: '0123456789ABCDEF',
		binary: '01',
		octal: '01234567'
	};

	// 获取实际使用的字符集
	// Get actual character set
	const getActualCharSet = (): string => {
		if (charSet) return charSet;
		return presetCharSets[preset] || presetCharSets.number;
	};

	// 圆角样式映射
	// Radius style mapping
	const radiusClass: Record<string, string> = {
		none: 'rounded-none',
		xs: 'rounded-xs',
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		full: 'rounded-full',
		'': ''
	};

	// 背景色样式映射
	// Background style mapping
	const bgClass: Record<string, string> = {
		none: '',
		surface: 'bg-bg-surface dark:bg-bg-surface-dark',
		gray: 'bg-gray-100 dark:bg-gray-800',
		theme: 'bg-primary/10 dark:bg-dark/10'
	};

	// 间距样式映射
	// Gap style mapping
	const gapClass: Record<string, string> = {
		'0': 'gap-0',
		'1': 'gap-1',
		'2': 'gap-2',
		'3': 'gap-3',
		'4': 'gap-4'
	};

	// 字体大小样式映射
	// Font size style mapping
	const fontSizeClass: Record<string, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl'
	};

	// 字体粗细样式映射
	// Font weight style mapping
	const fontWeightClass: Record<string, string> = {
		normal: 'font-normal',
		medium: 'font-medium',
		semibold: 'font-semibold',
		bold: 'font-bold'
	};

	// 格式化数值
	// Format number value
	const formatValue = (val: string | number): string => {
		if (typeof val === 'number') {
			let numStr = decimal !== undefined ? val.toFixed(decimal) : String(val);
			if (separator) {
				const parts = numStr.split('.');
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				numStr = parts.join('.');
			}
			return numStr;
		}
		return String(val);
	};

	// 当前显示的字符数组（包含前缀后缀）
	// Current display characters array (including prefix and suffix)
	let displayChars = $state<string[]>([]);

	// 每个字符的动画进度 (0-1)
	// Animation progress for each character (0-1)
	let animationProgress = $state<number[]>([]);

	// 每个字符的起始索引（动画开始时显示的字符在字符集中的索引）
	// Starting index for each character (character index in charset when animation starts)
	let startIndexes = $state<number[]>([]);

	// 每个字符的目标索引
	// Target index for each character
	let targetIndexes = $state<number[]>([]);

	// 是否正在动画中
	// Whether animating
	let isAnimating = $state(false);
	let charStarted = $state<boolean[]>([]);

	// 动画帧 ID
	// Animation frame ID
	let rafId: number | null = null;

	// 循环定时器
	// Loop timer
	let loopTimer: ReturnType<typeof setTimeout> | null = null;

	// 上一次的值
	// Previous value
	let prevValue = '';

	// 获取缓动函数
	// Get easing function
	const getEasingFn = () => {
		return easing[easingType] || easing.cubicOut;
	};

	// 将字符集转为数组（支持 Unicode 字符）
	// Convert charset to array (support Unicode characters)
	const getCharSetArray = (): string[] => {
		return Array.from(getActualCharSet());
	};

	// 解析字符到字符集的索引
	// Parse character to charset index
	const getCharIndex = (char: string): number => {
		const charSetArray = getCharSetArray();
		const idx = charSetArray.indexOf(char);
		return idx >= 0 ? idx : 0;
	};

	// 检查字符是否在字符集中
	// Check if character is in charset
	const isCharInSet = (char: string): boolean => {
		return getCharSetArray().includes(char);
	};

	const getAutoStartIndex = (targetIdx: number, charIndex: number, charSetLength: number): number => {
		if (charSetLength <= 1) return targetIdx;
		const offset = (charIndex % (charSetLength - 1)) + 1;
		return (targetIdx + offset) % charSetLength;
	};

	// 获取当前显示的字符索引
	// Get current displayed character index
	const getCurrentDisplayIndex = (charIndex: number): number => {
		const char = displayChars[charIndex];
		if (!isCharInSet(char)) return 0;

		const progress = animationProgress[charIndex] || 0;
		const charSetLength = getCharSetArray().length;
		const startIdx = startIndexes[charIndex] || 0;
		const targetIdx = targetIndexes[charIndex] || 0;

		// 计算滚动距离
		let scrollDistance = targetIdx - startIdx;
		if (direction === 'up') {
			if (scrollDistance <= 0) scrollDistance += charSetLength;
			scrollDistance += charSetLength * Math.max(0, loops - 1);
		} else {
			if (scrollDistance >= 0) scrollDistance -= charSetLength;
			scrollDistance -= charSetLength * Math.max(0, loops - 1);
		}

		const currentScroll = progress * scrollDistance;
		const currentIdx = (startIdx + Math.round(currentScroll) % charSetLength + charSetLength) % charSetLength;
		return currentIdx;
	};

	// 更新显示字符
	// Update display characters
	const updateDisplayChars = () => {
		const formattedValue = formatValue(value);
		const fullValue = prefix + formattedValue + suffix;
		// 使用 Array.from 正确处理 Unicode 字符（如表情符号）
		// Use Array.from to correctly handle Unicode characters (like emoji)
		const newDisplayChars = Array.from(fullValue);
		const newTargetIndexes = newDisplayChars.map((char) => getCharIndex(char));

		// 保存当前显示的字符索引作为新动画的起始索引
		// Save current displayed character indexes as starting indexes for new animation
		const newStartIndexes = newDisplayChars.map((char, i) => {
			if (i < displayChars.length && animationProgress[i] !== undefined) {
				return getCurrentDisplayIndex(i);
			}
			if (autoStart && isCharInSet(char)) {
				const charSetLength = getCharSetArray().length;
				const targetIdx = newTargetIndexes[i] ?? 0;
				return getAutoStartIndex(targetIdx, i, charSetLength);
			}
			// 新增的字符位置，从目标字符开始（不滚动）
			return newTargetIndexes[i];
		});

		displayChars = newDisplayChars;
		targetIndexes = newTargetIndexes;
		startIndexes = newStartIndexes;
		animationProgress = displayChars.map(() => 0);
		charStarted = displayChars.map(() => false);
	};

	// 开始动画
	// Start animation
	const start = () => {
		if (isAnimating) return;

		reset();
		isAnimating = true;
		onstart?.();

		const startTime = Date.now();
		const easingFn = getEasingFn();
		const charCount = displayChars.length;

		const animate = () => {
			const elapsed = Date.now() - startTime - delay;
			let allComplete = true;

			for (let i = 0; i < charCount; i++) {
				const charDelay = i * stagger;
				const charElapsed = elapsed - charDelay;

				if (charElapsed < 0) {
					animationProgress[i] = 0;
					charStarted[i] = false;
					allComplete = false;
				} else if (charElapsed >= duration) {
					animationProgress[i] = 1;
					charStarted[i] = true;
				} else {
					animationProgress[i] = easingFn(charElapsed / duration);
					charStarted[i] = true;
					allComplete = false;
				}
			}

			if (allComplete) {
				isAnimating = false;
				rafId = null;

				// 动画完成后，将 startIndexes 更新为 targetIndexes
				// After animation completes, update startIndexes to targetIndexes
				startIndexes = [...targetIndexes];
				charStarted = displayChars.map(() => true);

				oncomplete?.();
				onchange?.(formatValue(value));

				if (loop && loopInterval > 0) {
					loopTimer = setTimeout(() => {
						reset();
						start();
					}, loopInterval);
				}
			} else {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);
	};

	// 重置动画
	// Reset animation
	const reset = () => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		isAnimating = false;
		animationProgress = displayChars.map(() => 0);
		charStarted = displayChars.map(() => false);
	};

	// 暂停动画（保存当前位置以便继续）
	// Pause animation (save current position for resuming)
	const pause = () => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		isAnimating = false;

		// 保存当前显示的字符索引到 startIndexes，以便下次 start 时从此位置继续
		// Save current displayed character indexes to startIndexes for resuming
		const charSetArray = getCharSetArray();
		const charSetLength = charSetArray.length;
		for (let i = 0; i < animationProgress.length; i++) {
			const char = displayChars[i];
			if (isCharInSet(char)) {
				const startIdx = startIndexes[i] ?? 0;
				const targetIdx = targetIndexes[i] ?? 0;
				const progress = animationProgress[i] || 0;

				// 计算滚动距离
				let scrollDistance: number;
				if (direction === 'up') {
					scrollDistance = targetIdx - startIdx;
					if (scrollDistance <= 0) scrollDistance += charSetLength;
					scrollDistance += charSetLength * Math.max(0, loops - 1);
				} else {
					scrollDistance = targetIdx - startIdx;
					if (scrollDistance >= 0) scrollDistance -= charSetLength;
					scrollDistance -= charSetLength * Math.max(0, loops - 1);
				}

				// 计算当前字符索引并对齐到整数位置
				const currentScroll = progress * scrollDistance;
				const currentIdx = ((startIdx + Math.round(currentScroll)) % charSetLength + charSetLength) % charSetLength;
				startIndexes[i] = currentIdx;
			}
		}
		// 重置进度，下次 start 会从新的 startIndexes 开始
		animationProgress = displayChars.map(() => 0);
	};

	// 计算字符的滚动偏移
	// Calculate character scroll offset
	const getScrollOffset = (charIndex: number, progress: number): number => {
		const char = displayChars[charIndex];

		// 如果字符不在字符集中（如逗号、点号等），不滚动
		// If char is not in charset (like comma, dot), don't scroll
		if (!isCharInSet(char)) {
			return 0;
		}

		const charSetArray = getCharSetArray();
		const charSetLength = charSetArray.length;
		const startIdx = startIndexes[charIndex] ?? 0;
		const targetIdx = targetIndexes[charIndex] ?? 0;

		// 计算从 startIdx 到 targetIdx 的滚动距离（包含 loops 圈）
		// Calculate scroll distance from startIdx to targetIdx (including loops cycles)
		let scrollDistance: number;
		if (direction === 'up') {
			// 向上滚动：数字变大的方向
			scrollDistance = targetIdx - startIdx;
			if (scrollDistance <= 0) {
				scrollDistance += charSetLength;
			}
			scrollDistance += charSetLength * Math.max(0, loops - 1);
		} else {
			// 向下滚动：数字变小的方向
			scrollDistance = targetIdx - startIdx;
			if (scrollDistance >= 0) {
				scrollDistance -= charSetLength;
			}
			scrollDistance -= charSetLength * Math.max(0, loops - 1);
		}

		// 当前滚动位置
		const currentScroll = startIdx + progress * scrollDistance;
		const loopsCount = Math.max(1, loops);
		const baseOffset = charSetLength * loopsCount;

		return -(baseOffset + currentScroll) * height;
	};

	// 获取当前显示的字符
	// Get current display character
	const getCurrentChar = (charIndex: number, progress: number): string => {
		const char = displayChars[charIndex];

		// 如果字符不在字符集中，直接显示
		// If char is not in charset, display directly
		if (!isCharInSet(char)) {
			return char;
		}

		const charSetArray = getCharSetArray();
		const charSetLength = charSetArray.length;
		const startIdx = startIndexes[charIndex] ?? 0;
		const targetIdx = targetIndexes[charIndex] ?? 0;

		// 计算滚动距离
		let scrollDistance: number;
		if (direction === 'up') {
			scrollDistance = targetIdx - startIdx;
			if (scrollDistance <= 0) scrollDistance += charSetLength;
			scrollDistance += charSetLength * Math.max(0, loops - 1);
		} else {
			scrollDistance = targetIdx - startIdx;
			if (scrollDistance >= 0) scrollDistance -= charSetLength;
			scrollDistance -= charSetLength * Math.max(0, loops - 1);
		}

		const currentScroll = progress * scrollDistance;
		const currentIdx = ((startIdx + Math.floor(currentScroll)) % charSetLength + charSetLength) % charSetLength;

		return charSetArray[currentIdx];
	};

	// 计算需要渲染的字符数量
	// Calculate the number of characters to render
	const getRenderCount = (): number => {
		const charSetArray = getCharSetArray();
		const loopsCount = Math.max(1, loops);
		return charSetArray.length * (loopsCount * 2 + 1) + 1;
	};

	// 是否已初始化
	// Whether initialized
	let initialized = false;

	// 初始化
	// Initialize
	onMount(() => {
		prevValue = formatValue(value);
		updateDisplayChars();
		if (autoStart) {
			start();
		} else {
			// 首次加载时，startIndexes 应该等于 targetIndexes（然后滚动 loops 圈）
			// On first load, startIndexes equals targetIndexes (then scroll loops cycles)
			startIndexes = [...targetIndexes];
		}
		initialized = true;
	});

	// 监听 value 变化
	// Watch value changes
	$effect(() => {
		const formattedValue = formatValue(value);
		if (initialized && formattedValue !== prevValue) {
			prevValue = formattedValue;
			updateDisplayChars();
			if (autoStart) {
				reset();
				start();
			}
		}
	});

	onDestroy(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
		if (loopTimer !== null) {
			clearTimeout(loopTimer);
		}
	});

	// 暴露方法供外部调用
	// Expose methods for external use
	export { start, pause, reset };
</script>

<div
	class="inline-flex items-center {gapClass[gap] || gapClass['1']} {fontSizeClass[fontSize] ||
		fontSizeClass['xl']} {fontWeightClass[fontWeight] || fontWeightClass['bold']}{injClass
		? ` ${injClass}`
		: ''}"
>
	{#each displayChars as char, index (index)}
		{@const inCharSet = isCharInSet(char)}
		{@const progress = animationProgress[index] || 0}
		{@const hasStarted = !isAnimating || (charStarted[index] ?? false)}
		{@const charSetArray = getCharSetArray()}
		{@const charSetLength = charSetArray.length}
		{@const startIndex = startIndexes[index] ?? targetIndexes[index] ?? 0}
		{@const standbyChar = inCharSet && charSetLength > 0 ? charSetArray[startIndex % charSetLength] : char}
		{@const displayChar = hasStarted ? (inCharSet ? getCurrentChar(index, progress) : char) : standbyChar}
		{@const renderCount = getRenderCount()}
		<div
			class="relative overflow-hidden {radiusClass[radius] || ''} {bgClass[bg] || ''}{charClass
				? ` ${charClass}`
				: ''}"
			style="height: {height}px;"
		>
			{#if children}
				{@render children(displayChar, index)}
			{:else if inCharSet && hasStarted}
				<!-- 滚动的字符列表 -->
				<!-- Scrolling character list -->
				<div
					class="flex flex-col items-center justify-center transition-none"
					style="transform: translateY({getScrollOffset(index, progress)}px);"
				>
					{#each Array(renderCount) as _, i (i)}
						<div
							class="flex items-center justify-center"
							style="height: {height}px; min-width: {height * 0.6}px;"
						>
							{charSetArray[i % charSetArray.length]}
						</div>
					{/each}
				</div>
			{:else}
				<!-- 非字符集中的字符（如逗号、点号、空格等）直接显示 -->
				<!-- Characters not in charset (like comma, dot, space) display directly -->
				<div
					class="flex items-center justify-center"
					style="height: {height}px; min-width: {displayChar === ',' || displayChar === '.' ? height * 0.3 : displayChar === ' ' ? height * 0.4 : height * 0.6}px;"
				>
					{displayChar}
				</div>
			{/if}
		</div>
	{/each}
</div>
