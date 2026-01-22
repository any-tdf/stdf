<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Mask from '../mask/Mask.svelte';
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	import type { ImagePreviewProps, ImagePreviewItemProps } from '../../types/index.js';

	let {
		visible = $bindable(false),
		images = [],
		current = $bindable(0),
		loop = true,
		swipeDuration = 300,
		minScale = 0.5,
		maxScale = 3,
		closePosition = 'tr',
		showNavigation = true,
		navigationPosition = 'center',
		maskClosable = false,
		showIndex = true,
		indicatorType = 'number',
		zIndex = 1000,
		duration = 300,
		outDuration = 200,
		mask = {},
		icon = {},
		showRotation = false,
		rotationIcon = {},
		children,
		loadingChild,
		errorChild,
		indexChild,
		onchange,
		onclose,
		onscale,
		onrotate
	}: ImagePreviewProps = $props();

	// 标准化图片数据
	// Normalize image data
	const normalizedImages = $derived<ImagePreviewItemProps[]>(
		images.map((img) => (typeof img === 'string' ? { url: img } : img))
	);

	// 图片总数
	// Total images
	const total = $derived(normalizedImages.length);

	// 当前图片
	// Current image
	const currentImage = $derived(normalizedImages[current] || { url: '' });

	// 图片加载状态 { [index]: 'loading' | 'loaded' | 'error' }
	// Image load status
	let loadStatus = $state<Record<number, 'loading' | 'loaded' | 'error'>>({});

	// 图片旋转状态（内部使用，支持 360 用于连续动画）
	// Image rotation status (internal use, supports 360 for continuous animation)
	let rotationStatus = $state<Record<number, number>>({});

	// 是否正在重置旋转（用于禁用动画）
	// Whether resetting rotation (for disabling animation)
	let isResettingRotation = $state(false);

	// 缩放相关状态
	// Scale related states
	let currentScale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);

	// Pointer 事件相关状态
	// Pointer event related states
	let activePointers = $state<Map<number, PointerEvent>>(new Map());
	let startX = $state(0);
	let startY = $state(0);
	let isMoving = $state(false);
	let isSwiping = $state(false);
	let swipeStartX = $state(0);
	let swipeOffset = $state(0);
	let hasMoved = $state(false); // 是否有移动，用于判断点击 Whether moved, for tap detection

	// 双指缩放状态
	// Pinch zoom states
	let isPinching = $state(false);
	let pinchStartDistance = $state(0);
	let pinchStartScale = $state(1);

	// 容器元素引用
	// Container element reference
	let containerRef = $state<HTMLElement | null>(null);

	// 关闭预览
	// Close preview
	const close = () => {
		visible = false;
		resetTransform();
		onclose?.();
	};

	// 重置变换
	// Reset transform
	const resetTransform = () => {
		currentScale = 1;
		translateX = 0;
		translateY = 0;
	};

	// 旋转当前图片（逆时针）
	// Rotate current image (counterclockwise)
	const rotate = () => {
		const currentRotation = rotationStatus[current] || 0;
		const newRotation = currentRotation + 90;
		rotationStatus[current] = newRotation;

		// 回调返回规范化的角度 (0, 90, 180, 270)
		// Callback returns normalized angle (0, 90, 180, 270)
		const normalizedAngle = (newRotation % 360) as 0 | 90 | 180 | 270;
		onrotate?.(normalizedAngle);

		// 当旋转到 360° 时，动画完成后重置为 0（无动画）
		// When rotated to 360°, reset to 0 after animation completes (no animation)
		if (newRotation % 360 === 0) {
			const idx = current;
			setTimeout(() => {
				// 先禁用动画
				// First disable animation
				isResettingRotation = true;
				// 等待 transition: none 生效后再更新角度
				// Wait for transition: none to take effect before updating angle
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						rotationStatus[idx] = 0;
						// 等待角度更新完成后恢复动画
						// Restore animation after angle update completes
						setTimeout(() => {
							isResettingRotation = false;
						}, 20);
					});
				});
			}, 200);
		}
	};

	// 切换图片
	// Switch image
	const switchImage = (index: number) => {
		if (index === current) return;
		let newIndex = index;
		if (loop) {
			if (index < 0) newIndex = total - 1;
			else if (index >= total) newIndex = 0;
		} else {
			if (index < 0) newIndex = 0;
			else if (index >= total) newIndex = total - 1;
		}
		if (newIndex !== current) {
			current = newIndex;
			resetTransform();
			onchange?.(newIndex);
		}
	};

	// 上一张
	// Previous
	const prev = () => switchImage(current - 1);

	// 下一张
	// Next
	const next = () => switchImage(current + 1);

	// 计算两点距离
	// Calculate distance between two points
	const getDistanceFromPointers = (p1: PointerEvent, p2: PointerEvent) => {
		const dx = p1.clientX - p2.clientX;
		const dy = p1.clientY - p2.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};

	// Pointer 按下
	// Pointer down
	const handlePointerDown = (e: PointerEvent) => {
		// 捕获 pointer
		// Capture pointer
		containerRef?.setPointerCapture(e.pointerId);
		activePointers.set(e.pointerId, e);
		hasMoved = false;

		if (activePointers.size === 2) {
			// 双指缩放开始
			// Pinch zoom start
			isPinching = true;
			isSwiping = false;
			isMoving = false;
			const pointers = Array.from(activePointers.values());
			pinchStartDistance = getDistanceFromPointers(pointers[0], pointers[1]);
			pinchStartScale = currentScale;
		} else if (activePointers.size === 1) {
			startX = e.clientX;
			startY = e.clientY;

			// 滑动检测
			// Swipe detection
			if (currentScale === 1) {
				isSwiping = true;
				swipeStartX = e.clientX;
				swipeOffset = 0;
			} else {
				isMoving = true;
			}
		}
	};

	// Pointer 移动
	// Pointer move
	const handlePointerMove = (e: PointerEvent) => {
		if (!activePointers.has(e.pointerId)) return;

		// 更新当前 pointer 位置
		// Update current pointer position
		activePointers.set(e.pointerId, e);

		if (activePointers.size === 2 && isPinching) {
			// 双指缩放
			// Pinch zoom
			hasMoved = true;
			const pointers = Array.from(activePointers.values());
			const currentDistance = getDistanceFromPointers(pointers[0], pointers[1]);
			const scaleDelta = currentDistance / pinchStartDistance;
			let newScale = pinchStartScale * scaleDelta;
			newScale = Math.max(minScale, Math.min(maxScale, newScale));
			currentScale = newScale;
			onscale?.(newScale);
		} else if (activePointers.size === 1) {
			const deltaX = e.clientX - startX;
			const deltaY = e.clientY - startY;

			// 判断是否有明显移动
			if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
				hasMoved = true;
			}

			if (isSwiping && currentScale === 1) {
				const swipeDeltaX = e.clientX - swipeStartX;
				// 左右滑动切换
				// Swipe to switch
				swipeOffset = swipeDeltaX;
				e.preventDefault();
			} else if (isMoving && currentScale > 1) {
				// 拖动图片
				// Drag image
				translateX += deltaX;
				translateY += deltaY;
				startX = e.clientX;
				startY = e.clientY;
				e.preventDefault();
			}
		}
	};

	// Pointer 抬起/取消
	// Pointer up/cancel
	const handlePointerUp = (e: PointerEvent) => {
		containerRef?.releasePointerCapture(e.pointerId);
		activePointers.delete(e.pointerId);

		// 如果还有一个 pointer，重置为单指状态
		// If one pointer left, reset to single finger state
		if (activePointers.size === 1) {
			isPinching = false;
			const pointer = Array.from(activePointers.values())[0];
			startX = pointer.clientX;
			startY = pointer.clientY;
			if (currentScale === 1) {
				isSwiping = true;
				swipeStartX = pointer.clientX;
			} else {
				isMoving = true;
			}
			return;
		}

		// 所有 pointer 都抬起
		// All pointers up
		if (activePointers.size === 0) {
			isPinching = false;
			isMoving = false;

			// 滑动切换判断
			// Swipe switch judgment
			if (isSwiping) {
				isSwiping = false;
				const threshold = window.innerWidth * 0.2;
				if (swipeOffset > threshold) {
					prev();
				} else if (swipeOffset < -threshold) {
					next();
				}
				swipeOffset = 0;
			}

			// 点击关闭判断（没有移动 = 点击）
			// Tap to close judgment (no movement = tap)
			if (!hasMoved && maskClosable && currentScale === 1) {
				close();
				return;
			}

			// 缩放边界处理
			// Scale boundary handling
			if (currentScale < 1) {
				currentScale = 1;
				translateX = 0;
				translateY = 0;
			}

		}
	};

	// 图片加载完成
	// Image loaded
	const handleImageLoad = (index: number) => {
		loadStatus[index] = 'loaded';
	};

	// 图片加载失败
	// Image load error
	const handleImageError = (index: number) => {
		loadStatus[index] = 'error';
	};

	// 当 visible 变化时重置状态并控制页面滚动
	// Reset state when visible changes and control page scroll
	$effect(() => {
		if (visible) {
			resetTransform();
			// 禁止页面滚动
			// Disable page scroll
			document.body.style.overflow = 'hidden';
		} else {
			// 恢复页面滚动
			// Restore page scroll
			document.body.style.overflow = '';
		}
		return () => {
			// 组件销毁时恢复页面滚动
			// Restore page scroll when component is destroyed
			document.body.style.overflow = '';
		};
	});

	// 关闭按钮位置类名
	// Close button position class
	const closePositionClass = $derived(
		{
			tl: 'top-4 left-4',
			tr: 'top-4 right-4',
			bl: 'bottom-4 left-4',
			br: 'bottom-4 right-4'
		}[closePosition] || 'top-4 right-4'
	);

	// 合并默认图标参数
	// Merge default icon parameters
	const mergedIcon = $derived({
		name: 'ri-close-line',
		size: 24,
		...icon
	});

	// 合并旋转图标参数
	// Merge rotation icon parameters
	const mergedRotationIcon = $derived({
		size: 24,
		...rotationIcon
	});

	// 当前图片的旋转角度
	// Current image rotation
	const currentRotation = $derived(rotationStatus[current] || 0);
</script>

{#if visible}
	<!-- 遮罩层 Mask layer -->
	<Mask
		visible
		opacity="0.9"
		{duration}
		{outDuration}
		{...mask}
		{zIndex}
	/>

	<!-- 主容器 Main container -->
	<div
		class="fixed inset-0 flex items-center justify-center"
		style="z-index: {zIndex + 1}"
		in:fade={{ duration }}
		out:fade={{ duration: outDuration }}
	>
		<!-- 图片容器 Image container -->
		<div
			bind:this={containerRef}
			class="relative w-full h-full overflow-hidden touch-none"
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerUp}
		>
			<!-- 图片滑动容器 Image slide container -->
			<div
				class="flex h-full transition-transform"
				style="transform: translateX(calc({-current * 100}% + {swipeOffset}px)); transition-duration: {isSwiping ? '0ms' : `${swipeDuration}ms`}"
			>
				{#each normalizedImages as img, index (index)}
					<div class="shrink-0 w-full h-full flex items-center justify-center">
						{#if loadStatus[index] !== 'loaded' && loadStatus[index] !== 'error'}
							<!-- 加载中 Loading -->
							<div class="absolute inset-0 flex items-center justify-center">
								{#if loadingChild}
									{@render loadingChild()}
								{:else}
									<Loading height="12" width="12" theme />
								{/if}
							</div>
						{/if}

						{#if loadStatus[index] === 'error'}
							<!-- 加载失败 Load error -->
							<div class="flex flex-col items-center justify-center text-white/60">
								{#if errorChild}
									{@render errorChild()}
								{:else}
									<Icon name="ri-image-line" size={48} />
									<span class="mt-2 text-sm">加载失败</span>
								{/if}
							</div>
						{:else}
							<!-- 图片 Image -->
							<img
								src={img.url}
								alt={img.alt || ''}
								class="max-w-full max-h-full object-contain select-none"
								style={index === current
									? `transform: scale(${currentScale}) translate(${translateX / currentScale}px, ${translateY / currentScale}px) rotate(-${rotationStatus[index] || 0}deg); transition: ${isMoving || isPinching || isResettingRotation ? 'none' : 'transform 0.2s'}`
									: `transform: rotate(-${rotationStatus[index] || 0}deg); transition: ${isResettingRotation ? 'none' : 'transform 0.2s'}`}
								draggable="false"
								onload={() => handleImageLoad(index)}
								onerror={() => handleImageError(index)}
							/>
						{/if}
					</div>
				{/each}
			</div>

			<!-- 自定义内容插槽 Custom content slot -->
			{#if children}
				<div class="absolute bottom-20 left-0 right-0 px-4">
					{@render children(currentImage, current)}
				</div>
			{/if}
		</div>

		<!-- 关闭按钮和旋转按钮 Close button and rotation button -->
		<div class="absolute {closePositionClass} flex gap-2" in:scale={{ duration: 200, delay: 100 }}>
			{#if showRotation}
				<!-- 旋转按钮 Rotation button -->
				<button
					class="p-2 rounded-full bg-black/30 text-white active:bg-black/50"
					onclick={rotate}
					aria-label="Rotate"
				>
					<!-- 逆时针旋转图标 Counterclockwise rotation icon -->
					<svg xmlns="http://www.w3.org/2000/svg" width={mergedRotationIcon.size} height={mergedRotationIcon.size} viewBox="0 0 24 24" fill="currentColor">
						<path d="M11 9H21C21.5522 9 22 9.44772 22 10V20C22 20.5523 21.5522 21 21 21H11C10.4477 21 9.99996 20.5523 9.99996 20V10C9.99996 9.44772 10.4477 9 11 9ZM12 11V19H20V11H12ZM5.99996 10.5858L7.82839 8.75736L9.24261 10.1716L4.99996 14.4142L0.757324 10.1716L2.17154 8.75736L3.99996 10.5858V8C3.99996 5.23858 6.23854 3 8.99996 3H13V5H8.99996C7.34311 5 5.99996 6.34315 5.99996 8V10.5858Z"></path>
					</svg>
				</button>
			{/if}
			<!-- 关闭按钮 Close button -->
			<button
				class="p-2 rounded-full bg-black/30 text-white active:bg-black/50"
				onclick={close}
			>
				<Icon {...mergedIcon} />
			</button>
		</div>

		<!-- 左右导航按钮（居中模式）Prev/Next navigation buttons (center mode) -->
		{#if showNavigation && navigationPosition === 'center' && total > 1}
			<!-- 上一张 Previous -->
			{#if loop || current > 0}
				<button
					class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white active:bg-black/50"
					onclick={prev}
					aria-label="Previous"
					in:scale={{ duration: 200, delay: 100 }}
				>
					<Icon name="ri-arrow-left-s-line" size={24} />
				</button>
			{/if}
			<!-- 下一张 Next -->
			{#if loop || current < total - 1}
				<button
					class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white active:bg-black/50"
					onclick={next}
					aria-label="Next"
					in:scale={{ duration: 200, delay: 100 }}
				>
					<Icon name="ri-arrow-right-s-line" size={24} />
				</button>
			{/if}
		{/if}

		<!-- 底部栏：导航（底部模式）+ 索引指示器 Bottom bar: navigation (bottom mode) + index indicator -->
		{#if (showIndex && total > 1) || (showNavigation && navigationPosition === 'bottom' && total > 1)}
			<div class="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-4">
				<!-- 左侧导航（底部模式）Left navigation (bottom mode) -->
				{#if showNavigation && navigationPosition === 'bottom' && total > 1 && (loop || current > 0)}
					<button
						class="p-2 rounded-full bg-black/30 text-white active:bg-black/50"
						onclick={prev}
						aria-label="Previous"
						in:scale={{ duration: 200, delay: 100 }}
					>
						<Icon name="ri-arrow-left-s-line" size={24} />
					</button>
				{/if}

				<!-- 索引指示器 Index indicator -->
				{#if showIndex && total > 1}
					{#if indexChild}
						{@render indexChild(current + 1, total)}
					{:else if indicatorType === 'number'}
						<span class="px-3 py-1 rounded-full bg-black/30 text-white text-sm">
							{current + 1} / {total}
						</span>
					{:else if indicatorType === 'dot'}
						<div class="flex gap-2">
							{#each normalizedImages as _, index (index)}
								<button
									class="w-2 h-2 rounded-full transition-all {index === current
										? 'bg-white w-4'
										: 'bg-white/50'}"
									onclick={() => switchImage(index)}
									aria-label="Go to image {index + 1}"
								></button>
							{/each}
						</div>
					{/if}
				{/if}

				<!-- 右侧导航（底部模式）Right navigation (bottom mode) -->
				{#if showNavigation && navigationPosition === 'bottom' && total > 1 && (loop || current < total - 1)}
					<button
						class="p-2 rounded-full bg-black/30 text-white active:bg-black/50"
						onclick={next}
						aria-label="Next"
						in:scale={{ duration: 200, delay: 100 }}
					>
						<Icon name="ri-arrow-right-s-line" size={24} />
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
