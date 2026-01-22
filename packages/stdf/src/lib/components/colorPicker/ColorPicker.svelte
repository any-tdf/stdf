<script lang="ts">
	import type { ColorPickerProps, OklchColor, ColorPickerMode, ColorPickerValue } from '../../types/index.js';
	import Popup from '../popup/Popup.svelte';
	import Tab from '../tabs/Tab.svelte';
	import {
		throttleWithRAF,
		radiusObj,
		rgbToOklch,
		oklchToRgb,
		rgbToHex,
		hexToRgb,
		isDisplayable,
		getMaxChroma,
		hslToRgb,
		rgbToHsl,
		formatOklch,
		formatRgb
	} from '../utils/index.js';

	// 获取主题颜色作为默认值
	// Get theme color as default value
	const getThemeColor = (): OklchColor => {
		if (typeof window === 'undefined') return { l: 0.7, c: 0.15, h: 250 };
		const isDark = document.documentElement.getAttribute('data-mode') === 'dark';
		const colorVar = isDark ? '--color-dark' : '--color-primary';
		const colorValue = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
		if (colorValue) {
			// 尝试解析颜色值
			// Try to parse color value
			try {
				// 如果是 oklch 格式
				// If oklch format
				if (colorValue.startsWith('oklch(')) {
					const match = colorValue.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);
					if (match) {
						const l = parseFloat(match[1]) > 1 ? parseFloat(match[1]) / 100 : parseFloat(match[1]);
						return { l, c: parseFloat(match[2]), h: parseFloat(match[3]) };
					}
				}
				// 如果是 rgb 格式
				// If rgb format
				if (colorValue.startsWith('rgb')) {
					const match = colorValue.match(/rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/);
					if (match) {
						const oklch = rgbToOklch(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
						return { l: oklch.l, c: oklch.c, h: oklch.h || 250 };
					}
				}
				// 如果是 hex 格式
				// If hex format
				if (colorValue.startsWith('#')) {
					const rgb = hexToRgb(colorValue);
					const oklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
					return { l: oklch.l, c: oklch.c, h: oklch.h || 250 };
				}
			} catch {
				// 解析失败，使用默认值
				// Parse failed, use default value
			}
		}
		return { l: 0.7, c: 0.15, h: 250 };
	};

	let {
		visible = $bindable(false),
		value = $bindable<ColorPickerValue | undefined>(undefined),
		modes = ['oklch', 'rgb', 'hex'],
		showPreview = true,
		showPanel = true,
		showInputs = true,
		showCopy = true,
		panelHeight = 160,
		sliderHeight = 24,
		radius = 'md',
		injClass = '',
		popup = {},
		tab = {},
		onchange,
		onclose,
		oncopy
	}: ColorPickerProps = $props();

	// 有效模式列表
	// Effective modes list
	const effectiveModes: ColorPickerMode[] = $derived(modes && modes.length > 0 ? modes : ['oklch']);

	// 将传入的值转换为内部 OKLCH 格式
	// Convert input value to internal OKLCH format
	const parseInputValue = (val: ColorPickerValue | undefined): OklchColor => {
		// 如果未传入值，使用主题颜色
		// If no value passed, use theme color
		if (val === undefined) {
			return getThemeColor();
		}
		// 如果是 OKLCH 对象格式
		// If OKLCH object format
		if (typeof val === 'object' && val !== null && 'l' in val && 'c' in val && 'h' in val) {
			return val as OklchColor;
		}
		// 如果是 RGB 数组格式 [r, g, b]
		// If RGB array format [r, g, b]
		if (Array.isArray(val) && val.length === 3) {
			const oklch = rgbToOklch(val[0], val[1], val[2]);
			return { l: oklch.l, c: oklch.c, h: oklch.h || 250 };
		}
		// 如果是 HEX 字符串格式
		// If HEX string format
		if (typeof val === 'string') {
			const rgb = hexToRgb(val);
			const oklch = rgbToOklch(rgb[0], rgb[1], rgb[2]);
			return { l: oklch.l, c: oklch.c, h: oklch.h || 250 };
		}
		// 默认使用主题颜色
		// Default to theme color
		return getThemeColor();
	};

	// 内部 OKLCH 颜色状态
	// Internal OKLCH color state
	let internalColor = $state<OklchColor>(parseInputValue(value));

	// 当外部 value 变化时同步内部状态
	// Sync internal state when external value changes
	$effect(() => {
		const parsed = parseInputValue(value);
		// 只有当值真正变化时才更新（避免循环）
		// Only update when value actually changes (avoid loop)
		if (parsed.l !== internalColor.l || parsed.c !== internalColor.c || parsed.h !== internalColor.h) {
			internalColor = parsed;
		}
	});

	// 根据首选模式生成对应格式的输出值
	// Generate output value in format matching the first mode
	const getOutputValue = (color: OklchColor): ColorPickerValue => {
		const primaryMode = effectiveModes[0];
		if (primaryMode === 'rgb') {
			return oklchToRgb(color.l, color.c, color.h);
		} else if (primaryMode === 'hex') {
			return rgbToHex(...oklchToRgb(color.l, color.c, color.h));
		}
		return color;
	};

	// 容器宽度（自适应）
	// Container width (adaptive)
	let containerWidth = $state(0);
	let panelWidth = $derived(containerWidth > 0 ? containerWidth : 280);

	// 滑动条宽度（由于标签和输入框占据空间，滑动条实际宽度小于面板宽度）
	// Slider width (actual width is less than panel width due to labels and inputs)
	let sliderWidth = $state(0);

	// Canvas refs
	let panelCanvas = $state<HTMLCanvasElement | null>(null);
	let slider1Canvas = $state<HTMLCanvasElement | null>(null);
	let slider2Canvas = $state<HTMLCanvasElement | null>(null);
	let slider3Canvas = $state<HTMLCanvasElement | null>(null);

	// 交互状态
	// Interaction state
	let isDraggingPanel = $state(false);
	let isDragging1 = $state(false);
	let isDragging2 = $state(false);
	let isDragging3 = $state(false);

	// 当前模式索引
	// Current mode index
	let activeModeIndex = $state(0);

	// 当前模式
	// Current mode
	let colorMode = $derived<ColorPickerMode>(effectiveModes[activeModeIndex] || 'oklch');

	// 输入框临时值
	// Input temporary values
	let input1 = $state('');
	let input2 = $state('');
	let input3 = $state('');

	// 复制提示
	// Copy tooltip
	let showCopyTip = $state(false);

	// 设备像素比
	// Device pixel ratio
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

	// 圆形色轮尺寸（用于 RGB/HEX 模式）
	// Circular color wheel size (for RGB/HEX mode)
	const wheelSize = $derived(Math.min(panelWidth, panelHeight));

	// 派生值
	// Derived values
	let currentRgb = $derived(oklchToRgb(internalColor.l, internalColor.c, internalColor.h));
	let currentHex = $derived(rgbToHex(...currentRgb));
	let currentOklch = $derived(formatOklch(internalColor.l, internalColor.c, internalColor.h));
	let currentRgbStr = $derived(formatRgb(...currentRgb));
	let maxChroma = $derived(getMaxChroma(internalColor.l, internalColor.h));

	// 是否直接显示模式
	// Whether direct display mode
	const isDirectMode = $derived(popup === null);

	// Tab 标签
	// Tab labels
	const tabLabels = $derived(
		effectiveModes.map((mode) => ({
			text: mode.toUpperCase()
		}))
	);

	// 生成颜色值字符串数组
	// Generate color value string array
	const getColorStrings = (): string[] => {
		return effectiveModes.map((mode) => {
			if (mode === 'oklch') {
				return currentOklch;
			} else if (mode === 'rgb') {
				return currentRgbStr;
			} else {
				return currentHex;
			}
		});
	};

	// 同步输入框值
	// Sync input values
	$effect(() => {
		if (colorMode === 'oklch') {
			input1 = internalColor.l.toFixed(3);
			input2 = internalColor.c.toFixed(3);
			input3 = internalColor.h.toFixed(1);
		} else if (colorMode === 'rgb') {
			input1 = currentRgb[0].toString();
			input2 = currentRgb[1].toString();
			input3 = currentRgb[2].toString();
		} else {
			input1 = currentRgb[0].toString(16).padStart(2, '0');
			input2 = currentRgb[1].toString(16).padStart(2, '0');
			input3 = currentRgb[2].toString(16).padStart(2, '0');
		}
	});

	// 更新颜色
	// Update color
	const updateColor = (newValue: OklchColor) => {
		internalColor = newValue;
		// 同步外部 value
		// Sync external value
		value = getOutputValue(newValue);
		// 直接显示模式下，每次变化都触发 onchange
		// In direct mode, trigger onchange on every change
		if (isDirectMode) {
			onchange?.(getColorStrings());
		}
	};

	// 从 RGB 更新颜色
	// Update color from RGB
	const updateFromRgb = (r: number, g: number, b: number) => {
		const oklch = rgbToOklch(r, g, b);
		updateColor({ l: oklch.l, c: oklch.c, h: oklch.h || internalColor.h });
	};

	// Popup 关闭处理
	// Popup close handler
	const handlePopupClose = () => {
		visible = false;
		onclose?.(getColorStrings());
	};

	// ==================== Canvas 绘制 ====================
	// ==================== Canvas Drawing ====================

	// 绘制颜色面板
	// Draw color panel
	const drawPanel = () => {
		if (!panelCanvas || panelWidth <= 0) return;

		if (colorMode === 'oklch') {
			// OKLCH 模式：矩形 L-C 平面
			// OKLCH mode: rectangular L-C plane
			panelCanvas.width = panelWidth * dpr;
			panelCanvas.height = panelHeight * dpr;
			const ctx = panelCanvas.getContext('2d');
			if (!ctx) return;

			const w = panelWidth * dpr;
			const h = panelHeight * dpr;
			const imageData = ctx.createImageData(w, h);
			const data = imageData.data;

			for (let y = 0; y < h; y++) {
				const l = 1 - y / h;
				for (let x = 0; x < w; x++) {
					const c = (x / w) * 0.4;
					const idx = (y * w + x) * 4;

					if (isDisplayable(l, c, internalColor.h)) {
						const [r, g, b] = oklchToRgb(l, c, internalColor.h);
						data[idx] = r;
						data[idx + 1] = g;
						data[idx + 2] = b;
						data[idx + 3] = 255;
					} else {
						// 超出色域显示棋盘格
						// Show checkerboard for out-of-gamut colors
						const checkSize = 4 * dpr;
						const isLight = (Math.floor(x / checkSize) + Math.floor(y / checkSize)) % 2 === 0;
						const gray = isLight ? 200 : 180;
						data[idx] = gray;
						data[idx + 1] = gray;
						data[idx + 2] = gray;
						data[idx + 3] = 255;
					}
				}
			}
			ctx.putImageData(imageData, 0, 0);
		} else {
			// RGB/HEX 模式：圆形色轮
			// RGB/HEX mode: circular color wheel
			panelCanvas.width = wheelSize * dpr;
			panelCanvas.height = wheelSize * dpr;
			const ctx = panelCanvas.getContext('2d');
			if (!ctx) return;

			const size = wheelSize * dpr;
			const radius = size / 2;
			const imageData = ctx.createImageData(size, size);
			const data = imageData.data;

			const [, , currentL] = rgbToHsl(...currentRgb);
			const edgeWidth = 1.5 * dpr;

			for (let y = 0; y < size; y++) {
				for (let x = 0; x < size; x++) {
					const idx = (y * size + x) * 4;
					const dx = x - radius;
					const dy = y - radius;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist <= radius + edgeWidth) {
						const angle = Math.atan2(dy, dx);
						const h = ((angle * 180) / Math.PI + 360) % 360;
						const s = Math.min(dist / radius, 1);
						const [r, g, b] = hslToRgb(h, s, currentL);
						data[idx] = r;
						data[idx + 1] = g;
						data[idx + 2] = b;

						if (dist > radius - edgeWidth) {
							const alpha = Math.max(0, 1 - (dist - radius + edgeWidth) / (edgeWidth * 2));
							data[idx + 3] = Math.round(alpha * 255);
						} else {
							data[idx + 3] = 255;
						}
					} else {
						data[idx + 3] = 0;
					}
				}
			}
			ctx.putImageData(imageData, 0, 0);
		}
	};

	// 绘制滑动条 1 (OKLCH: L / RGB: R)
	// Draw slider 1 (OKLCH: L / RGB: R)
	const drawSlider1 = () => {
		if (!slider1Canvas || sliderWidth <= 0) return;
		slider1Canvas.width = sliderWidth * dpr;
		slider1Canvas.height = sliderHeight * dpr;
		const ctx = slider1Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = sliderHeight * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				const l = x / w;
				if (isDisplayable(l, internalColor.c, internalColor.h)) {
					[r, g, b] = oklchToRgb(l, internalColor.c, internalColor.h);
				} else {
					const mc = getMaxChroma(l, internalColor.h);
					[r, g, b] = oklchToRgb(l, Math.min(internalColor.c, mc), internalColor.h);
				}
			} else {
				r = Math.round((x / w) * 255);
				g = 0;
				b = 0;
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制滑动条 2 (OKLCH: C / RGB: G)
	// Draw slider 2 (OKLCH: C / RGB: G)
	const drawSlider2 = () => {
		if (!slider2Canvas || sliderWidth <= 0) return;
		slider2Canvas.width = sliderWidth * dpr;
		slider2Canvas.height = sliderHeight * dpr;
		const ctx = slider2Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = sliderHeight * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				const c = (x / w) * 0.4;
				if (isDisplayable(internalColor.l, c, internalColor.h)) {
					[r, g, b] = oklchToRgb(internalColor.l, c, internalColor.h);
				} else {
					r = g = b = 180;
				}
			} else {
				r = 0;
				g = Math.round((x / w) * 255);
				b = 0;
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// 绘制滑动条 3 (OKLCH: H / RGB: B)
	// Draw slider 3 (OKLCH: H / RGB: B)
	const drawSlider3 = () => {
		if (!slider3Canvas || sliderWidth <= 0) return;
		slider3Canvas.width = sliderWidth * dpr;
		slider3Canvas.height = sliderHeight * dpr;
		const ctx = slider3Canvas.getContext('2d');
		if (!ctx) return;

		const w = sliderWidth * dpr;
		const h = sliderHeight * dpr;
		const imageData = ctx.createImageData(w, h);
		const data = imageData.data;

		for (let x = 0; x < w; x++) {
			let r = 0,
				g = 0,
				b = 0;

			if (colorMode === 'oklch') {
				// H 滑动条使用固定的 L 和 C 值
				// H slider uses fixed L and C values
				const hue = (x / w) * 360;
				const fixedL = 0.7;
				const fixedC = 0.15;
				if (isDisplayable(fixedL, fixedC, hue)) {
					[r, g, b] = oklchToRgb(fixedL, fixedC, hue);
				} else {
					const mc = getMaxChroma(fixedL, hue);
					[r, g, b] = oklchToRgb(fixedL, Math.min(fixedC, mc), hue);
				}
			} else {
				r = 0;
				g = 0;
				b = Math.round((x / w) * 255);
			}

			for (let y = 0; y < h; y++) {
				const idx = (y * w + x) * 4;
				data[idx] = r;
				data[idx + 1] = g;
				data[idx + 2] = b;
				data[idx + 3] = 255;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// ==================== 交互处理 ====================
	// ==================== Interaction Handling ====================

	// 面板交互
	// Panel interaction
	const handlePanelInteraction = (e: PointerEvent) => {
		if (!panelCanvas) return;
		const rect = panelCanvas.getBoundingClientRect();
		const clientX = e.clientX;
		const clientY = e.clientY;

		if (colorMode === 'oklch') {
			const x = Math.max(0, Math.min(panelWidth, clientX - rect.left));
			const y = Math.max(0, Math.min(panelHeight, clientY - rect.top));
			const newL = 1 - y / panelHeight;
			const newC = (x / panelWidth) * 0.4;
			const mc = getMaxChroma(newL, internalColor.h);
			updateColor({ l: newL, c: Math.min(newC, mc), h: internalColor.h });
		} else {
			const centerX = wheelSize / 2;
			const centerY = wheelSize / 2;
			const dx = clientX - rect.left - centerX;
			const dy = clientY - rect.top - centerY;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const r = wheelSize / 2;

			const clampedDist = Math.min(dist, r);
			const angle = Math.atan2(dy, dx);
			const hue = ((angle * 180) / Math.PI + 360) % 360;
			const saturation = clampedDist / r;

			const [, , currentL] = rgbToHsl(...currentRgb);
			const [nr, ng, nb] = hslToRgb(hue, saturation, currentL);
			updateFromRgb(nr, ng, nb);
		}
	};

	// 滑动条 1 交互
	// Slider 1 interaction
	const handleSlider1Interaction = (e: PointerEvent) => {
		if (!slider1Canvas) return;
		const rect = slider1Canvas.getBoundingClientRect();
		const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));

		if (colorMode === 'oklch') {
			const newL = x / rect.width;
			const mc = getMaxChroma(newL, internalColor.h);
			updateColor({ l: newL, c: Math.min(internalColor.c, mc), h: internalColor.h });
		} else {
			const newR = Math.round((x / rect.width) * 255);
			updateFromRgb(newR, currentRgb[1], currentRgb[2]);
		}
	};

	// 滑动条 2 交互
	// Slider 2 interaction
	const handleSlider2Interaction = (e: PointerEvent) => {
		if (!slider2Canvas) return;
		const rect = slider2Canvas.getBoundingClientRect();
		const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));

		if (colorMode === 'oklch') {
			const newC = (x / rect.width) * 0.4;
			const mc = getMaxChroma(internalColor.l, internalColor.h);
			updateColor({ l: internalColor.l, c: Math.min(newC, mc), h: internalColor.h });
		} else {
			const newG = Math.round((x / rect.width) * 255);
			updateFromRgb(currentRgb[0], newG, currentRgb[2]);
		}
	};

	// 滑动条 3 交互
	// Slider 3 interaction
	const handleSlider3Interaction = (e: PointerEvent) => {
		if (!slider3Canvas) return;
		const rect = slider3Canvas.getBoundingClientRect();
		const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));

		if (colorMode === 'oklch') {
			const newH = (x / rect.width) * 360;
			const mc = getMaxChroma(internalColor.l, newH);
			updateColor({ l: internalColor.l, c: Math.min(internalColor.c, mc), h: newH });
		} else {
			const newB = Math.round((x / rect.width) * 255);
			updateFromRgb(currentRgb[0], currentRgb[1], newB);
		}
	};

	// Pointer 事件处理
	// Pointer event handlers
	const onPanelPointerDown = (e: PointerEvent) => {
		if (!panelCanvas) return;
		isDraggingPanel = true;
		panelCanvas.setPointerCapture(e.pointerId);
		handlePanelInteraction(e);
	};
	const onPanelPointerMove = (e: PointerEvent) => {
		if (!isDraggingPanel) return;
		throttleWithRAF(handlePanelInteraction)(e);
	};
	const onPanelPointerUp = (e: PointerEvent) => {
		isDraggingPanel = false;
		if (panelCanvas?.hasPointerCapture(e.pointerId)) {
			panelCanvas.releasePointerCapture(e.pointerId);
		}
	};

	const onSlider1PointerDown = (e: PointerEvent) => {
		if (!slider1Canvas) return;
		isDragging1 = true;
		slider1Canvas.setPointerCapture(e.pointerId);
		handleSlider1Interaction(e);
	};
	const onSlider1PointerMove = (e: PointerEvent) => {
		if (!isDragging1) return;
		throttleWithRAF(handleSlider1Interaction)(e);
	};
	const onSlider1PointerUp = (e: PointerEvent) => {
		isDragging1 = false;
		if (slider1Canvas?.hasPointerCapture(e.pointerId)) {
			slider1Canvas.releasePointerCapture(e.pointerId);
		}
	};

	const onSlider2PointerDown = (e: PointerEvent) => {
		if (!slider2Canvas) return;
		isDragging2 = true;
		slider2Canvas.setPointerCapture(e.pointerId);
		handleSlider2Interaction(e);
	};
	const onSlider2PointerMove = (e: PointerEvent) => {
		if (!isDragging2) return;
		throttleWithRAF(handleSlider2Interaction)(e);
	};
	const onSlider2PointerUp = (e: PointerEvent) => {
		isDragging2 = false;
		if (slider2Canvas?.hasPointerCapture(e.pointerId)) {
			slider2Canvas.releasePointerCapture(e.pointerId);
		}
	};

	const onSlider3PointerDown = (e: PointerEvent) => {
		if (!slider3Canvas) return;
		isDragging3 = true;
		slider3Canvas.setPointerCapture(e.pointerId);
		handleSlider3Interaction(e);
	};
	const onSlider3PointerMove = (e: PointerEvent) => {
		if (!isDragging3) return;
		throttleWithRAF(handleSlider3Interaction)(e);
	};
	const onSlider3PointerUp = (e: PointerEvent) => {
		isDragging3 = false;
		if (slider3Canvas?.hasPointerCapture(e.pointerId)) {
			slider3Canvas.releasePointerCapture(e.pointerId);
		}
	};

	// ==================== 输入框处理 ====================
	// ==================== Input Handling ====================

	const onBlur1 = () => {
		if (colorMode === 'oklch') {
			const val = parseFloat(input1);
			if (!isNaN(val) && val >= 0 && val <= 1) {
				const mc = getMaxChroma(val, internalColor.h);
				updateColor({ l: val, c: Math.min(internalColor.c, mc), h: internalColor.h });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input1);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(val, currentRgb[1], currentRgb[2]);
			}
		} else {
			const val = parseInt(input1, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(val, currentRgb[1], currentRgb[2]);
			}
		}
	};

	const onBlur2 = () => {
		if (colorMode === 'oklch') {
			const val = parseFloat(input2);
			if (!isNaN(val) && val >= 0 && val <= 0.4) {
				const mc = getMaxChroma(internalColor.l, internalColor.h);
				updateColor({ l: internalColor.l, c: Math.min(val, mc), h: internalColor.h });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input2);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(currentRgb[0], val, currentRgb[2]);
			}
		} else {
			const val = parseInt(input2, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(currentRgb[0], val, currentRgb[2]);
			}
		}
	};

	const onBlur3 = () => {
		if (colorMode === 'oklch') {
			const val = parseFloat(input3);
			if (!isNaN(val)) {
				const newH = ((val % 360) + 360) % 360;
				const mc = getMaxChroma(internalColor.l, newH);
				updateColor({ l: internalColor.l, c: Math.min(internalColor.c, mc), h: newH });
			}
		} else if (colorMode === 'rgb') {
			const val = parseInt(input3);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(currentRgb[0], currentRgb[1], val);
			}
		} else {
			const val = parseInt(input3, 16);
			if (!isNaN(val) && val >= 0 && val <= 255) {
				updateFromRgb(currentRgb[0], currentRgb[1], val);
			}
		}
	};

	const onKeydown = (e: KeyboardEvent, blurFn: () => void) => {
		if (e.key === 'Enter') {
			blurFn();
		}
	};

	// ==================== 复制功能 ====================
	// ==================== Copy Functionality ====================

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			oncopy?.(text);
			showCopyTip = true;
			setTimeout(() => {
				showCopyTip = false;
			}, 1500);
		} catch (err) {
			console.error('Copy failed:', err);
		}
	};

	// ==================== 位置计算 ====================
	// ==================== Position Calculation ====================

	const getSlider1Position = () => {
		if (colorMode === 'oklch') {
			return internalColor.l * sliderWidth;
		} else {
			return (currentRgb[0] / 255) * sliderWidth;
		}
	};

	const getSlider2Position = () => {
		if (colorMode === 'oklch') {
			const mc = getMaxChroma(internalColor.l, internalColor.h);
			const displayC = Math.min(internalColor.c, mc);
			return (displayC / 0.4) * sliderWidth;
		} else {
			return (currentRgb[1] / 255) * sliderWidth;
		}
	};

	const getSlider3Position = () => {
		if (colorMode === 'oklch') {
			return (internalColor.h / 360) * sliderWidth;
		} else {
			return (currentRgb[2] / 255) * sliderWidth;
		}
	};

	const getPanelPosition = (): { x: number; y: number } => {
		if (colorMode === 'oklch') {
			const mc = getMaxChroma(internalColor.l, internalColor.h);
			const displayC = Math.min(internalColor.c, mc);
			return {
				x: (displayC / 0.4) * panelWidth,
				y: (1 - internalColor.l) * panelHeight
			};
		} else {
			const [hue, saturation] = rgbToHsl(...currentRgb);
			const r = wheelSize / 2;
			const angle = (hue * Math.PI) / 180;
			const dist = saturation * r;
			return {
				x: r + Math.cos(angle) * dist,
				y: r + Math.sin(angle) * dist
			};
		}
	};

	const getLabels = (): [string, string, string] => {
		if (colorMode === 'oklch') {
			return ['L', 'C', 'H'];
		} else {
			return ['R', 'G', 'B'];
		}
	};

	// ==================== 响应式绘制 ====================
	// ==================== Reactive Drawing ====================

	// 监听 visible 变化，重新打开时延迟绘制
	// Watch visible change, delay drawing when reopened
	$effect(() => {
		if (visible && panelWidth > 0 && sliderWidth > 0) {
			// 使用 setTimeout 确保 canvas 已渲染
			// Use setTimeout to ensure canvas is rendered
			setTimeout(() => {
				drawPanel();
				drawSlider1();
				drawSlider2();
				drawSlider3();
			}, 50);
		}
	});

	$effect(() => {
		if (panelWidth > 0) {
			drawPanel();
		}
	});

	// 滑动条宽度变化时重绘
	// Redraw when slider width changes
	$effect(() => {
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	});

	$effect(() => {
		internalColor.h;
		internalColor.l;
		internalColor.c;
		colorMode;
		if (panelWidth > 0) {
			drawPanel();
		}
		if (sliderWidth > 0) {
			drawSlider1();
			drawSlider2();
			drawSlider3();
		}
	});
</script>

{#snippet pickerContent()}
	<div class="w-full select-none px-6 py-4 {injClass}">
		<div bind:clientWidth={containerWidth}></div>
		<!-- 颜色预览 -->
		<!-- Color preview -->
		{#if showPreview}
			<div class="mb-3 flex items-center gap-3">
				<div
					class="h-10 w-10 flex-none {radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md'} border border-black/10 dark:border-white/20"
					style="background-color: {currentHex}"
				></div>
				<div class="relative flex-1 text-xs">
					{#if showCopy}
						<button
							onclick={() => copyToClipboard(currentHex)}
							class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/20"
						>
							{currentHex}
						</button>
						<button
							onclick={() => copyToClipboard(currentRgbStr)}
							class="mb-0.5 w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/20"
						>
							{currentRgbStr}
						</button>
						<button
							onclick={() => copyToClipboard(currentOklch)}
							class="w-full cursor-pointer rounded px-1 py-0.5 text-left font-mono transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/20"
						>
							{currentOklch}
						</button>
					{:else}
						<div class="mb-0.5 px-1 py-0.5 font-mono">{currentHex}</div>
						<div class="mb-0.5 px-1 py-0.5 font-mono">{currentRgbStr}</div>
						<div class="px-1 py-0.5 font-mono">{currentOklch}</div>
					{/if}
					{#if showCopyTip}
						<div
							class="absolute -top-1 right-0 rounded bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/80 dark:text-black"
						>
							Copied
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- 颜色面板 -->
		<!-- Color panel -->
		{#if showPanel}
			<div class="relative mb-3 {colorMode === 'oklch' ? '' : 'flex justify-center'}">
				<canvas
					bind:this={panelCanvas}
					style="width: {colorMode === 'oklch' ? panelWidth : wheelSize}px; height: {colorMode === 'oklch'
						? panelHeight
						: wheelSize}px;"
					class="cursor-crosshair touch-none {colorMode === 'oklch'
						? radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md'
						: ''} {colorMode === 'oklch' ? 'border border-black/10 dark:border-white/20' : ''}"
					onpointerdown={onPanelPointerDown}
					onpointermove={onPanelPointerMove}
					onpointerup={onPanelPointerUp}
					onpointercancel={onPanelPointerUp}
				></canvas>
				<div
					class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
					style="left: {colorMode === 'oklch'
						? getPanelPosition().x
						: (panelWidth - wheelSize) / 2 + getPanelPosition().x}px; top: {getPanelPosition().y}px; background-color: {currentHex}"
				></div>
			</div>
		{/if}

		<!-- 滑动条 1 -->
		<!-- Slider 1 -->
		<div class="mb-2 flex items-center gap-2">
			{#if showInputs}
				<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[0]}</span>
			{/if}
			<div class="relative flex-1" bind:clientWidth={sliderWidth}>
				<canvas
					bind:this={slider1Canvas}
					style="height: {sliderHeight}px;"
					class="w-full cursor-pointer touch-none {radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md'} border border-black/10 dark:border-white/20"
					onpointerdown={onSlider1PointerDown}
					onpointermove={onSlider1PointerMove}
					onpointerup={onSlider1PointerUp}
					onpointercancel={onSlider1PointerUp}
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-3 -translate-x-1/2 rounded-sm bg-white shadow-md"
					style="left: {getSlider1Position()}px; border: 1px solid rgba(0,0,0,0.3)"
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input1}
					onblur={onBlur1}
					onkeydown={(e) => onKeydown(e, onBlur1)}
					class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			{/if}
		</div>

		<!-- 滑动条 2 -->
		<!-- Slider 2 -->
		<div class="mb-2 flex items-center gap-2">
			{#if showInputs}
				<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[1]}</span>
			{/if}
			<div class="relative flex-1">
				<canvas
					bind:this={slider2Canvas}
					style="height: {sliderHeight}px;"
					class="w-full cursor-pointer touch-none {radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md'} border border-black/10 dark:border-white/20"
					onpointerdown={onSlider2PointerDown}
					onpointermove={onSlider2PointerMove}
					onpointerup={onSlider2PointerUp}
					onpointercancel={onSlider2PointerUp}
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-3 -translate-x-1/2 rounded-sm bg-white shadow-md"
					style="left: {getSlider2Position()}px; border: 1px solid rgba(0,0,0,0.3)"
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input2}
					onblur={onBlur2}
					onkeydown={(e) => onKeydown(e, onBlur2)}
					class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			{/if}
		</div>

		<!-- 滑动条 3 -->
		<!-- Slider 3 -->
		<div class="mb-3 flex items-center gap-2">
			{#if showInputs}
				<span class="w-3 flex-none text-xs text-black/60 dark:text-white/60">{getLabels()[2]}</span>
			{/if}
			<div class="relative flex-1">
				<canvas
					bind:this={slider3Canvas}
					style="height: {sliderHeight}px;"
					class="w-full cursor-pointer touch-none {radius && radiusObj[radius as keyof typeof radiusObj] ? radiusObj[radius as keyof typeof radiusObj] : 'rounded-md'} border border-black/10 dark:border-white/20"
					onpointerdown={onSlider3PointerDown}
					onpointermove={onSlider3PointerMove}
					onpointerup={onSlider3PointerUp}
					onpointercancel={onSlider3PointerUp}
				></canvas>
				<div
					class="pointer-events-none absolute top-0 h-full w-3 -translate-x-1/2 rounded-sm bg-white shadow-md"
					style="left: {getSlider3Position()}px; border: 1px solid rgba(0,0,0,0.3)"
				></div>
			</div>
			{#if showInputs}
				<input
					type="text"
					bind:value={input3}
					onblur={onBlur3}
					onkeydown={(e) => onKeydown(e, onBlur3)}
					class="w-14 flex-none rounded border border-black/10 bg-transparent px-1 py-0.5 text-right font-mono text-xs focus:border-primary focus:outline-none dark:border-white/20 dark:focus:border-dark"
				/>
			{/if}
		</div>

		<!-- 模式切换 Tab -->
		<!-- Mode switch Tab -->
		{#if effectiveModes.length > 1}
			<Tab labels={tabLabels} bind:active={activeModeIndex} mx="0" {...tab} />
		{/if}
	</div>
{/snippet}

<!-- 根据 popup 参数决定渲染方式 -->
<!-- Render based on popup parameter -->
{#if isDirectMode}
	<!-- 直接显示模式 -->
	<!-- Direct display mode -->
	{@render pickerContent()}
{:else}
	<!-- Popup 模式 -->
	<!-- Popup mode -->
	<Popup bind:visible size={0} transitionDistance={400} position="bottom" {...popup} onclose={handlePopupClose}>
		{@render pickerContent()}
	</Popup>
{/if}
