<script lang="ts">
	import type { CodeInputProps } from '../../types/index.js';
	import { radiusObj, bgObj } from '../utils/index.js';

	let {
		value = $bindable(''),
		length = 6,
		mask = false,
		gutter = '2',
		focused = $bindable(false),
		type = 'number',
		inputMode = '',
		native = false,
		info = '',
		errorInfo = '',
		radius = '',
		cellSize = 'md',
		cellStyle = 'box',
		cellBg = 'gray',
		cellBorder = 'solid',
		cursorStyle = 'line',
		cursorAnimation = 'blink',
		keyboardVisible = $bindable(false),
		autoClose = false,
		autoScroll = true as boolean | number,
		bold = false,
		injClass = '',
		onfinish,
		onclose,
		onfocus
	}: CodeInputProps = $props();

	// 隐藏输入框引用
	// Hidden input reference
	let inputRef: HTMLInputElement | null = $state(null);

	// 组件容器引用
	// Component container reference
	let containerRef: HTMLDivElement | null = $state(null);

	// 间距 class
	// Gutter class
	const gutterClass: Record<string, string> = {
		'0': 'gap-0',
		'1': 'gap-1',
		'2': 'gap-2',
		'3': 'gap-3',
		'4': 'gap-4'
	};

	// 边框风格样式
	// Border style
	const borderObj: Record<string, string> = {
		none: '',
		solid: 'border-solid',
		dashed: 'border-dashed',
		dotted: 'border-dotted'
	};

	// 单元格大小 class
	// Cell size class
	const sizeClass: Record<string, string> = {
		sm: 'w-10 h-10 text-base',
		md: 'w-12 h-12 text-xl',
		lg: 'w-14 h-14 text-2xl'
	};

	// 线模式单元格大小 class
	// Line mode cell size class
	const lineSizeClass: Record<string, string> = {
		sm: 'w-10 h-10 text-base',
		md: 'w-12 h-12 text-xl',
		lg: 'w-14 h-14 text-2xl'
	};

	// 圆点大小 class
	// Dot size class
	const dotSizeClass: Record<string, string> = {
		sm: 'w-2 h-2',
		md: 'w-2.5 h-2.5',
		lg: 'w-3 h-3'
	};

	// 光标大小 class（竖线模式）
	// Cursor size class (line mode)
	const cursorSizeClass: Record<string, string> = {
		sm: 'h-4',
		md: 'h-5',
		lg: 'h-6'
	};

	// 光标动画 class
	// Cursor animation class
	const cursorAnimationClass = $derived(cursorAnimation === 'blink' ? 'animate-[blink_1s_step-end_infinite]' : 'animate-pulse');

	// 加大加粗模式下的文字样式
	// Bold mode text style
	const boldTextClass: Record<string, string> = {
		sm: 'text-xl font-bold',
		md: 'text-2xl font-bold',
		lg: 'text-3xl font-bold'
	};

	// 左侧圆角映射
	// Left radius mapping
	const radiusLeftObj: Record<string, string> = {
		none: 'rounded-l-none',
		xs: 'rounded-l-xs',
		sm: 'rounded-l-sm',
		md: 'rounded-l-md',
		lg: 'rounded-l-lg',
		xl: 'rounded-l-xl',
		'2xl': 'rounded-l-2xl',
		'3xl': 'rounded-l-3xl',
		'4xl': 'rounded-l-4xl',
		full: 'rounded-l-full'
	};

	// 右侧圆角映射
	// Right radius mapping
	const radiusRightObj: Record<string, string> = {
		none: 'rounded-r-none',
		xs: 'rounded-r-xs',
		sm: 'rounded-r-sm',
		md: 'rounded-r-md',
		lg: 'rounded-r-lg',
		xl: 'rounded-r-xl',
		'2xl': 'rounded-r-2xl',
		'3xl': 'rounded-r-3xl',
		'4xl': 'rounded-r-4xl',
		full: 'rounded-r-full'
	};

	// 获取圆角
	// Get border radius
	const cellRadius = $derived(
		cellStyle === 'line' ? '' : radius ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-(--radius-form)'
	);

	// 获取左侧圆角
	// Get left border radius
	const cellRadiusLeft = $derived(
		cellStyle === 'line' ? '' : radius ? radiusLeftObj[radius] : 'rounded-l-(--radius-form)'
	);

	// 获取右侧圆角
	// Get right border radius
	const cellRadiusRight = $derived(
		cellStyle === 'line' ? '' : radius ? radiusRightObj[radius] : 'rounded-r-(--radius-form)'
	);

	// 获取单元格数组
	// Get cell array
	const cells = $derived(Array.from({ length }, (_, i) => i));

	// 获取当前输入位置
	// Get current input position
	const currentIndex = $derived(value.length);

	// 是否显示光标（键盘收起时不闪烁）
	// Whether to show cursor (no blink when keyboard is hidden)
	const showCursor = $derived(keyboardVisible && currentIndex < length);

	// 是否有错误
	// Whether has error
	const hasError = $derived(!!errorInfo);

	// 单元格点击事件
	// Cell click event
	const handleClick = () => {
		focused = true;
		if (native && inputRef) {
			inputRef.focus();
		}
		onfocus?.();
	};

	// 原生输入处理
	// Native input handler
	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		let newValue = target.value;
		// 数字模式下过滤非数字
		// Filter non-numbers in number mode
		if (type === 'number') {
			newValue = newValue.replace(/[^0-9]/g, '');
		}
		// 限制长度
		// Limit length
		value = newValue.slice(0, length);
	};

	// 原生输入失焦
	// Native input blur
	const handleBlur = () => {
		focused = false;
	};

	// 监听输入完成
	// Watch input finish
	$effect(() => {
		if (value.length >= length) {
			onfinish?.(value.slice(0, length));
			// 自动关闭键盘
			// Auto close keyboard
			if (autoClose) {
				keyboardVisible = false;
				focused = false;
				onclose?.();
			}
		}
	});

	// 限制值长度（非原生模式）
	// Limit value length (non-native mode)
	$effect(() => {
		if (!native) {
			if (value.length > length) {
				value = value.slice(0, length);
			}
			// 数字模式下过滤非数字
			// Filter non-numbers in number mode
			if (type === 'number') {
				value = value.replace(/[^0-9]/g, '');
			}
		}
	});

	// 键盘弹出时自动滚动页面，避免键盘遮挡输入区域
	// Auto scroll page when keyboard opens to avoid keyboard covering input area
	$effect(() => {
		const shouldScroll = autoScroll;
		const isKeyboardVisible = keyboardVisible;
		const container = containerRef;

		if (shouldScroll && isKeyboardVisible && container) {
			// 延迟执行，等待键盘动画完成
			// Delay execution to wait for keyboard animation
			const timer = setTimeout(() => {
				const rect = container.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				// 键盘高度：如果传入数字则使用，否则默认视口高度的 40%
				// Keyboard height: use number if provided, otherwise default to 40% of viewport
				const keyboardHeight = typeof autoScroll === 'number' ? autoScroll : viewportHeight * 0.4;
				const availableHeight = viewportHeight - keyboardHeight;

				// 如果元素底部超出可用区域，则滚动页面
				// Scroll page if element bottom exceeds available area
				if (rect.bottom > availableHeight) {
					const scrollAmount = rect.bottom - availableHeight + 20; // 20px 额外间距
					window.scrollTo({
						top: window.scrollY + scrollAmount,
						behavior: 'smooth'
					});
				}
			}, 300);

			return () => clearTimeout(timer);
		}
	});
</script>

<div bind:this={containerRef} class="relative {injClass}">
	<!-- 原生隐藏输入框 -->
	<!-- Native hidden input -->
	{#if native}
		<input
			bind:this={inputRef}
			{value}
			oninput={handleInput}
			onblur={handleBlur}
			type="text"
			inputmode={inputMode || (type === 'number' ? 'numeric' : 'text')}
			maxlength={length}
			autocomplete="one-time-code"
			class="absolute -left-2499.75 opacity-0 w-px h-px"
		/>
	{/if}

	<!-- 输入格子 -->
	<!-- Input cells -->
	<button
		class="flex {gutterClass[gutter] || 'gap-2'}"
		onclick={handleClick}
		aria-label="code input"
	>
		{#each cells as index (index)}
			{#if cellStyle === 'line'}
				<!-- 线模式 -->
				<!-- Line mode -->
				<div
					class="relative flex items-center justify-center {lineSizeClass[cellSize] || 'w-12 h-12 text-xl'} font-semibold transition-colors"
				>
					{#if index < value.length}
						{#if mask === true}
							<span class="bg-text-primary dark:bg-text-dark rounded-full {dotSizeClass[cellSize] || 'w-2.5 h-2.5'}"></span>
						{:else if typeof mask === 'string'}
							<span class="text-text-primary dark:text-text-dark {bold ? boldTextClass[cellSize] || 'text-2xl font-bold' : ''}">{mask}</span>
						{:else}
							<span class="text-text-primary dark:text-text-dark {bold ? boldTextClass[cellSize] || 'text-2xl font-bold' : ''}">{value[index]}</span>
						{/if}
					{:else if showCursor && index === currentIndex}
						{#if cursorStyle === 'underline'}
							<span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary dark:bg-dark {cursorAnimationClass}"></span>
						{:else}
							<span class="w-0.5 bg-primary dark:bg-dark {cursorSizeClass[cellSize] || 'h-5'} {cursorAnimationClass}"></span>
						{/if}
					{/if}
					<!-- 底部线条 -->
					<!-- Bottom line -->
					<span
						class="absolute bottom-0 left-0 right-0 h-0.5 transition-colors {hasError
							? 'bg-error dark:bg-error-dark'
							: focused && index === currentIndex
								? 'bg-primary dark:bg-dark'
								: 'bg-text-primary/30 dark:bg-text-dark/30'}"
					></span>
				</div>
			{:else}
				<!-- 方格模式 -->
				<!-- Box mode -->
				<div
					class="relative flex items-center justify-center {bgObj[cellBg] || bgObj['gray']} {cellBorder !== 'none' ? 'border' : ''} {borderObj[cellBorder] || ''} {hasError
						? 'border-error dark:border-error-dark'
						: focused && index === currentIndex
							? 'border-primary dark:border-dark'
							: cellBorder !== 'none'
								? 'border-black/10 dark:border-white/10'
								: ''} {gutter === '0' && index > 0 && !(focused && index === currentIndex)
						? 'border-l-0'
						: ''} {gutter === '0'
						? index === 0
							? cellRadiusLeft
							: index === length - 1
								? cellRadiusRight
								: ''
						: cellRadius} {sizeClass[cellSize] || 'w-12 h-12 text-xl'} font-semibold transition-colors"
				>
					{#if index < value.length}
						{#if mask === true}
							<span class="bg-text-primary dark:bg-text-dark rounded-full {dotSizeClass[cellSize] || 'w-2.5 h-2.5'}"></span>
						{:else if typeof mask === 'string'}
							<span class="text-text-primary dark:text-text-dark {bold ? boldTextClass[cellSize] || 'text-2xl font-bold' : ''}">{mask}</span>
						{:else}
							<span class="text-text-primary dark:text-text-dark {bold ? boldTextClass[cellSize] || 'text-2xl font-bold' : ''}">{value[index]}</span>
						{/if}
					{:else if showCursor && index === currentIndex}
						{#if cursorStyle === 'underline'}
							<span class="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary dark:bg-dark {cursorAnimationClass}"></span>
						{:else}
							<span class="w-0.5 bg-primary dark:bg-dark {cursorSizeClass[cellSize] || 'h-5'} {cursorAnimationClass}"></span>
						{/if}
					{/if}
				</div>
			{/if}
		{/each}
	</button>

	<!-- 提示信息 -->
	<!-- Info text -->
	{#if info || errorInfo}
		<p class="mt-2 text-sm {hasError ? 'text-error dark:text-error-dark' : 'text-gray-500 dark:text-gray-400'}">
			{errorInfo || info}
		</p>
	{/if}
</div>
