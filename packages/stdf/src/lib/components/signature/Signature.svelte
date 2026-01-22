<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import Button from '../button/Button.svelte';
	import { radiusObj } from '../utils/index.js';
	import type { SignatureProps, SignatureResult, SignatureRotation, LargeAreaRadius } from '../../types/index.js';

	// 大区域圆角类名映射
	// Large area radius class mapping
	const largeAreaRadiusMap: Record<LargeAreaRadius, string> = {
		none: radiusObj.none,
		sm: radiusObj.sm,
		md: radiusObj.md,
		lg: radiusObj.lg,
		xl: radiusObj.xl,
		'2xl': radiusObj['2xl'],
		'3xl': radiusObj['3xl'],
		'4xl': radiusObj['4xl'],
		'': ''
	};

	let {
		aspectRatio = [3, 1],
		lineWidth = 3,
		lineColor = '#000000',
		bgColor = '#ffffff',
		radius = '',
		showButtons = true,
		clearText = '',
		confirmText = '',
		clearButton = {},
		confirmButton = {},
		imageType = 'png',
		imageQuality = 0.92,
		injClass = '',
		canvasClass = '',
		onclear,
		onconfirm,
		ondrawStart,
		ondrawEnd
	}: SignatureProps = $props();

	// 画布元素引用
	// Canvas element reference
	let canvasEl: HTMLCanvasElement | undefined = $state();
	let containerEl: HTMLDivElement | undefined = $state();

	// 绘制状态
	// Drawing state
	let isDrawing = $state(false);
	let hasDrawn = $state(false);
	let ctx: CanvasRenderingContext2D | null = $state(null);

	// 指针追踪
	// Pointer tracking
	const pointers = new SvelteMap<number, { x: number; y: number }>();

	// 圆角类名
	// Radius class name
	const radiusClass = $derived(largeAreaRadiusMap[radius] || '');

	// 初始化 Canvas
	// Initialize Canvas
	$effect(() => {
		if (canvasEl && containerEl) {
			const dpr = window.devicePixelRatio || 1;
			const rect = containerEl.getBoundingClientRect();

			// 设置 canvas 实际像素大小（高清屏适配）
			// Set canvas actual pixel size (Retina adaptation)
			canvasEl.width = rect.width * dpr;
			canvasEl.height = rect.height * dpr;

			// 设置 canvas CSS 大小
			// Set canvas CSS size
			canvasEl.style.width = `${rect.width}px`;
			canvasEl.style.height = `${rect.height}px`;

			ctx = canvasEl.getContext('2d');
			if (ctx) {
				// 缩放上下文以匹配设备像素比
				// Scale context to match device pixel ratio
				ctx.scale(dpr, dpr);

				// 设置绘制属性
				// Set drawing properties
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = lineColor;

				// 清空画布并填充背景色
				// Clear canvas and fill background color
				clearCanvas();
			}
		}
	});

	// 监听画笔颜色变化
	// Watch line color change
	$effect(() => {
		if (ctx) {
			ctx.strokeStyle = lineColor;
		}
	});

	// 监听画笔粗细变化
	// Watch line width change
	$effect(() => {
		if (ctx) {
			ctx.lineWidth = lineWidth;
		}
	});

	// 获取指针在 canvas 上的坐标
	// Get pointer position on canvas
	function getPointerPos(e: PointerEvent): { x: number; y: number } {
		if (!canvasEl) return { x: 0, y: 0 };
		const rect = canvasEl.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	}

	// 指针按下
	// Pointer down
	function handlePointerDown(e: PointerEvent) {
		if (!ctx || !canvasEl) return;

		canvasEl.setPointerCapture(e.pointerId);
		const pos = getPointerPos(e);
		pointers.set(e.pointerId, pos);

		// 只有单指才开始绘制
		// Only start drawing with single pointer
		if (pointers.size === 1) {
			isDrawing = true;
			ctx.beginPath();
			ctx.moveTo(pos.x, pos.y);
			ondrawStart?.();
		}
	}

	// 指针移动
	// Pointer move
	function handlePointerMove(e: PointerEvent) {
		if (!ctx || !isDrawing) return;

		const pos = getPointerPos(e);
		const lastPos = pointers.get(e.pointerId);

		if (lastPos && pointers.size === 1) {
			// 单指绘制
			// Single pointer drawing
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(pos.x, pos.y);
			hasDrawn = true;
		}

		pointers.set(e.pointerId, pos);
	}

	// 指针抬起
	// Pointer up
	function handlePointerUp(e: PointerEvent) {
		if (!canvasEl) return;

		canvasEl.releasePointerCapture(e.pointerId);
		pointers.delete(e.pointerId);

		if (pointers.size === 0 && isDrawing) {
			isDrawing = false;
			ctx?.closePath();
			ondrawEnd?.();
		}
	}

	// 指针取消
	// Pointer cancel
	function handlePointerCancel(e: PointerEvent) {
		handlePointerUp(e);
	}

	// 清空画布
	// Clear canvas
	function clearCanvas() {
		if (!ctx || !canvasEl || !containerEl) return;

		const rect = containerEl.getBoundingClientRect();
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, rect.width, rect.height);

		hasDrawn = false;
	}

	// 清空按钮点击
	// Clear button click
	function handleClear() {
		clearCanvas();
		onclear?.();
	}

	// 生成旋转后的图片
	// Generate rotated image
	function getRotatedDataUrl(rotation: SignatureRotation = 0): string {
		if (!canvasEl) return '';

		const mimeType = `image/${imageType}`;
		const quality = imageType === 'png' ? undefined : imageQuality;

		// 如果不需要旋转，直接返回原图
		// Return original image if no rotation needed
		if (rotation === 0) {
			return canvasEl.toDataURL(mimeType, quality);
		}

		// 创建临时 canvas 进行旋转
		// Create temporary canvas for rotation
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		if (!tempCtx) return '';

		const sourceWidth = canvasEl.width;
		const sourceHeight = canvasEl.height;

		// 90 度或 270 度旋转时，宽高互换
		// Swap width and height for 90 or 270 degree rotation
		if (rotation === 90 || rotation === 270) {
			tempCanvas.width = sourceHeight;
			tempCanvas.height = sourceWidth;
		} else {
			tempCanvas.width = sourceWidth;
			tempCanvas.height = sourceHeight;
		}

		// 移动到画布中心并旋转
		// Move to canvas center and rotate
		tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
		tempCtx.rotate((rotation * Math.PI) / 180);
		tempCtx.drawImage(canvasEl, -sourceWidth / 2, -sourceHeight / 2);

		return tempCanvas.toDataURL(mimeType, quality);
	}

	// 确认按钮点击
	// Confirm button click
	function handleConfirm() {
		if (!canvasEl) return;

		const result: SignatureResult = {
			dataUrl: getRotatedDataUrl(0),
			isEmpty: !hasDrawn
		};

		onconfirm?.(result);
	}

	// 导出方法供外部调用
	// Export methods for external use
	export function clear() {
		clearCanvas();
	}

	export function getSignature(rotation: SignatureRotation = 0): SignatureResult | null {
		if (!canvasEl) return null;

		return {
			dataUrl: getRotatedDataUrl(rotation),
			isEmpty: !hasDrawn
		};
	}

	export function isEmpty(): boolean {
		return !hasDrawn;
	}
</script>

<div class="flex flex-col gap-3 {injClass}">
	<!-- 画布容器 Canvas container -->
	<div
		bind:this={containerEl}
		class="relative w-full overflow-hidden border border-black/10 dark:border-white/10 {radiusClass} {canvasClass}"
		style="aspect-ratio: {aspectRatio[0]} / {aspectRatio[1]}; background-color: {bgColor};"
	>
		<!-- Canvas 画布 Canvas element -->
		<canvas
			bind:this={canvasEl}
			class="absolute inset-0 cursor-crosshair touch-none {radiusClass}"
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerCancel}
			onpointerleave={handlePointerUp}
		></canvas>
	</div>

	<!-- 操作按钮 Action buttons -->
	{#if showButtons}
		<div class="flex justify-end gap-3">
			<Button fill="line" size="md" customSize customWidth={80} customHeight={36} {...clearButton} onclick={handleClear}>
				{clearText || '清空'}
			</Button>
			<Button fill="base" size="md" customSize customWidth={80} customHeight={36} {...confirmButton} onclick={handleConfirm}>
				{confirmText || '确认'}
			</Button>
		</div>
	{/if}
</div>
