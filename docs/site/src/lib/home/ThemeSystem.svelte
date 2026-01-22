<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Button,
		Switch,
		Avatar,
		Progress,
		Tab,
		Badge,
		Rate,
		Slider,
		Stepper,
		Loading,
		Radio,
		Checkbox,
		Card,
		NoticeBar,
		Cell,
		Icon
	} from 'stdf';
	import { themes as stdfThemes, generateColorScale } from 'stdf/theme';
	import { themeLabels } from '../../data/homeData.js';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 生成亮色层样式：所有 dark 变量都用 primary 的值，背景色和文字色使用主题配置的值
	const generateLightLayerStyles = (theme: (typeof themes)[0]) => {
		if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
		const primaryScale = generateColorScale(theme['color-primary']);

		return `
			--color-primary-50: ${primaryScale[50]};
			--color-primary-100: ${primaryScale[100]};
			--color-primary-200: ${primaryScale[200]};
			--color-primary-300: ${primaryScale[300]};
			--color-primary-400: ${primaryScale[400]};
			--color-primary-500: ${primaryScale[500]};
			--color-primary: ${primaryScale[600]};
			--color-primary-700: ${primaryScale[700]};
			--color-primary-800: ${primaryScale[800]};
			--color-primary-900: ${primaryScale[900]};
			--color-primary-950: ${primaryScale[950]};
			--color-dark-50: ${primaryScale[50]};
			--color-dark-100: ${primaryScale[100]};
			--color-dark-200: ${primaryScale[200]};
			--color-dark-300: ${primaryScale[300]};
			--color-dark-400: ${primaryScale[400]};
			--color-dark-500: ${primaryScale[500]};
			--color-dark: ${primaryScale[600]};
			--color-dark-700: ${primaryScale[700]};
			--color-dark-800: ${primaryScale[800]};
			--color-dark-900: ${primaryScale[900]};
			--color-dark-950: ${primaryScale[950]};
			--color-bg-base: ${theme['color-bg-base']};
			--color-bg-surface: ${theme['color-bg-surface']};
			--color-bg-overlay: ${theme['color-bg-overlay']};
			--color-bg-highlight: ${theme['color-bg-highlight']};
			--color-bg-base-dark: ${theme['color-bg-base']};
			--color-bg-surface-dark: ${theme['color-bg-surface']};
			--color-bg-overlay-dark: ${theme['color-bg-overlay']};
			--color-bg-highlight-dark: ${theme['color-bg-highlight']};
			--color-text-primary: ${theme['color-text-primary']};
			--color-text-dark: ${theme['color-text-primary']};
			--color-text-on-primary: ${theme['color-text-on-primary']};
			--color-text-on-dark: ${theme['color-text-on-primary']};
			--color-success: ${theme['color-success']};
			--color-warning: ${theme['color-warning']};
			--color-error: ${theme['color-error']};
			--color-info: ${theme['color-info']};
			--radius-box: ${theme['radius-box']};
			--radius-form: ${theme['radius-form']};
			--radius-small: ${theme['radius-small']};
		`;
	};

	// 生成暗色层样式：所有 primary 变量都用 dark 的值，背景色和文字色使用主题配置的暗色值
	const generateDarkLayerStyles = (theme: (typeof themes)[0]) => {
		if (!theme?.['color-primary'] || !theme?.['color-dark']) return '';
		const darkScale = generateColorScale(theme['color-dark']);

		return `
			--color-primary-50: ${darkScale[50]};
			--color-primary-100: ${darkScale[100]};
			--color-primary-200: ${darkScale[200]};
			--color-primary-300: ${darkScale[300]};
			--color-primary-400: ${darkScale[400]};
			--color-primary-500: ${darkScale[500]};
			--color-primary: ${darkScale[600]};
			--color-primary-700: ${darkScale[700]};
			--color-primary-800: ${darkScale[800]};
			--color-primary-900: ${darkScale[900]};
			--color-primary-950: ${darkScale[950]};
			--color-dark-50: ${darkScale[50]};
			--color-dark-100: ${darkScale[100]};
			--color-dark-200: ${darkScale[200]};
			--color-dark-300: ${darkScale[300]};
			--color-dark-400: ${darkScale[400]};
			--color-dark-500: ${darkScale[500]};
			--color-dark: ${darkScale[600]};
			--color-dark-700: ${darkScale[700]};
			--color-dark-800: ${darkScale[800]};
			--color-dark-900: ${darkScale[900]};
			--color-dark-950: ${darkScale[950]};
			--color-bg-base: ${theme['color-bg-base-dark']};
			--color-bg-surface: ${theme['color-bg-surface-dark']};
			--color-bg-overlay: ${theme['color-bg-overlay-dark']};
			--color-bg-highlight: ${theme['color-bg-highlight-dark']};
			--color-bg-base-dark: ${theme['color-bg-base-dark']};
			--color-bg-surface-dark: ${theme['color-bg-surface-dark']};
			--color-bg-overlay-dark: ${theme['color-bg-overlay-dark']};
			--color-bg-highlight-dark: ${theme['color-bg-highlight-dark']};
			--color-text-primary: ${theme['color-text-dark']};
			--color-text-dark: ${theme['color-text-dark']};
			--color-text-on-primary: ${theme['color-text-on-dark']};
			--color-text-on-dark: ${theme['color-text-on-dark']};
			--color-success: ${theme['color-success']};
			--color-warning: ${theme['color-warning']};
			--color-error: ${theme['color-error']};
			--color-info: ${theme['color-info']};
			--radius-box: ${theme['radius-box']};
			--radius-form: ${theme['radius-form']};
			--radius-small: ${theme['radius-small']};
		`;
	};

	// 圆角可选值
	// boxRadius (容器类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem (无 full)
	// formRadius (表单类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, calc(infinity * 1px)
	// smallRadius (小型控件类): 0, 0.25rem, 0.375rem, 0.5rem, 0.75rem, 1rem, 1.5rem, calc(infinity * 1px)

	// 从 STDF 导入的内置主题，添加 label 用于显示
	const themes = stdfThemes.map((t) => ({
		...t,
		label: isZh ? themeLabels[t.name] || t.name : t.name
	}));

	let currentTheme = $state(localStorage.getItem('theme_color') || 'STDF');
	let previewEl: HTMLDivElement;
	let sliderPos = $state(50);
	let isDragging = $state(false);

	// Loading 随机类型 - 生成 5 个不重复的
	const getRandomLoadingTypes = () => {
		const types = Array.from({ length: 54 }, (_, i) => `1_${i}`);
		const shuffled = types.sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 5);
	};
	const randomLoadingTypes = getRandomLoadingTypes();

	// 演示数据
	let switchActive = $state(true);
	let cellSwitchActive = $state(false);
	let sliderValue = $state(65);
	let stepperValue = $state(3);

	// 键盘导航相关
	let sectionEl: HTMLElement;
	let isVisible = $state(false);

	const selectTheme = (name: string) => {
		currentTheme = name;
	};

	// 键盘导航：切换到上一个/下一个主题
	const navigateTheme = (direction: 'prev' | 'next') => {
		const currentIndex = themes.findIndex((t) => t.name === currentTheme);
		let newIndex: number;
		if (direction === 'prev') {
			newIndex = currentIndex <= 0 ? themes.length - 1 : currentIndex - 1;
		} else {
			newIndex = currentIndex >= themes.length - 1 ? 0 : currentIndex + 1;
		}
		currentTheme = themes[newIndex].name;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (!isVisible) return;
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			navigateTheme('prev');
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			navigateTheme('next');
		}
	};

	onMount(() => {
		// 监听键盘事件
		window.addEventListener('keydown', handleKeydown);

		// 监听区域可见性
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisible = entry.isIntersecting;
				});
			},
			{ threshold: 0.3 }
		);

		if (sectionEl) {
			observer.observe(sectionEl);
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			observer.disconnect();
		};
	});

	const currentThemeData = $derived(themes.find((t) => t.name === currentTheme) || themes[0]);

	// 派生当前主题的所有颜色（用于展示区域）
	const currentThemeColors = $derived(() => {
		if (!currentThemeData?.['color-primary'] || !currentThemeData?.['color-dark']) {
			return {
				primary: '',
				dark: '',
				success: '',
				warning: '',
				error: '',
				info: '',
				bgBase: '',
				bgSurface: '',
				bgOverlay: '',
				bgHighlight: '',
				bgBaseDark: '',
				bgSurfaceDark: '',
				bgOverlayDark: '',
				bgHighlightDark: '',
				textPrimary: '',
				textDark: '',
				textOnPrimary: '',
				textOnDark: '',
				radiusBox: '',
				radiusForm: '',
				radiusSmall: ''
			};
		}
		return {
			// 主题色
			primary: currentThemeData['color-primary'],
			dark: currentThemeData['color-dark'],
			// 功能色
			success: currentThemeData['color-success'],
			warning: currentThemeData['color-warning'],
			error: currentThemeData['color-error'],
			info: currentThemeData['color-info'],
			// 背景色（亮色）- 直接使用主题配置的值
			bgBase: currentThemeData['color-bg-base'],
			bgSurface: currentThemeData['color-bg-surface'],
			bgOverlay: currentThemeData['color-bg-overlay'],
			bgHighlight: currentThemeData['color-bg-highlight'],
			// 背景色（暗色）- 直接使用主题配置的值
			bgBaseDark: currentThemeData['color-bg-base-dark'],
			bgSurfaceDark: currentThemeData['color-bg-surface-dark'],
			bgOverlayDark: currentThemeData['color-bg-overlay-dark'],
			bgHighlightDark: currentThemeData['color-bg-highlight-dark'],
			// 文字色 - 直接使用主题配置的值
			textPrimary: currentThemeData['color-text-primary'],
			textDark: currentThemeData['color-text-dark'],
			textOnPrimary: currentThemeData['color-text-on-primary'],
			textOnDark: currentThemeData['color-text-on-dark'],
			// 圆角（直接从主题配置读取）
			radiusBox: currentThemeData['radius-box'],
			radiusForm: currentThemeData['radius-form'],
			radiusSmall: currentThemeData['radius-small']
		};
	});

	// 生成亮色层和暗色层各自的样式（完全独立，不受全局主题影响）
	const lightLayerStyles = $derived(generateLightLayerStyles(currentThemeData));
	const darkLayerStyles = $derived(generateDarkLayerStyles(currentThemeData));

	// 拖动控制
	const startDrag = (e: PointerEvent) => {
		isDragging = true;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	};

	const onDrag = (e: PointerEvent) => {
		if (!isDragging || !previewEl) return;
		const rect = previewEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		// 移动端窄屏时扩大拖动范围
		const percent = Math.min(Math.max((x / rect.width) * 100, 2), 98);
		sliderPos = percent;
	};

	const endDrag = () => {
		isDragging = false;
	};
</script>

<section bind:this={sectionEl} class="relative overflow-hidden py-8">
	<div class="relative z-10 mx-auto">
		<div class="mb-12 text-center">
			<!-- 标签 -->
			<div
				class="border-primary/20 bg-primary/5 text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 3.09735L7.05025 8.04709C4.31658 10.7808 4.31658 15.2129 7.05025 17.9466C9.78392 20.6803 14.2161 20.6803 16.9497 17.9466C19.6834 15.2129 19.6834 10.7808 16.9497 8.0471L12 3.09735ZM12 0.268921L18.364 6.63288C21.8787 10.1476 21.8787 15.8461 18.364 19.3608C14.8492 22.8755 9.15076 22.8755 5.63604 19.3608C2.12132 15.8461 2.12132 10.1476 5.63604 6.63288L12 0.268921ZM7 12.9968H17C17 15.7583 14.7614 17.9968 12 17.9968C9.23858 17.9968 7 15.7583 7 12.9968Z"
					/>
				</svg>
				<span>{isZh ? '主题系统' : 'Theme System'}</span>
			</div>

			<h2
				class="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white"
			>
				{isZh ? '无限主题，双色适配' : 'Infinite Themes, Dual Colors'}
			</h2>
			<p class="mx-auto max-w-2xl text-base opacity-70">
				{isZh
					? '每个主题都包含亮色和暗色两种配色，自动适配系统偏好。'
					: 'Each theme includes both light and dark color schemes, automatically adapting to system preferences.'}
			</p>
		</div>

		<div class="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-16">
			<!-- 主题选择器 -->
			<div class="flex w-full max-w-3xl flex-col gap-4 lg:w-auto">
				<div class="text-center lg:text-left">
					<div class="flex items-center justify-center gap-2 lg:justify-start">
						<span class="text-xl font-bold text-gray-800 dark:text-gray-200">
							{isZh ? '42 套内置主题' : '42 Built-in Themes'}
						</span>
						<!-- 键盘提示图标 - 移动端隐藏 -->
						<div class="group relative hidden md:block">
							<svg class="size-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
								<path d="M4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4ZM1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V6ZM6 13H8V15H6V13ZM10 13H14V15H10V13ZM16 13H18V15H16V13ZM5 9H7V11H5V9ZM9 9H11V11H9V9ZM13 9H15V11H13V9ZM17 9H19V11H17V9Z" />
							</svg>
							<!-- Tooltip -->
							<div class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-gray-700">
								{isZh ? '按 ← → 键切换主题' : 'Press ← → to switch themes'}
								<div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
							</div>
						</div>
					</div>
					<div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
						{isZh ? '点击选择，拖动对比亮暗效果' : 'Click to select, drag to compare light/dark'}
					</div>
				</div>

				<!-- 主题网格 -->
				<div class="grid grid-cols-6 gap-2">
					{#each themes as theme (theme)}
						<button
							onclick={() => selectTheme(theme.name)}
							class="group relative flex flex-col items-center gap-1.5 rounded p-1.5 transition-all duration-300 {currentTheme === theme.name
								? 'bg-gray-100 shadow-sm dark:bg-gray-800'
								: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}"
						>
							{#if currentTheme === theme.name}
								<div class="border-primary dark:border-dark absolute -inset-px rounded border-2"></div>
							{/if}

							<!-- 圆角矩形 - 左浅色背景+亮色，右深色背景+暗色 -->
							<div
								class="relative flex h-6 w-full overflow-hidden rounded shadow-sm transition-transform duration-300 group-hover:scale-105 {currentTheme ===
								theme.name
									? 'scale-105'
									: ''}"
							>
								<!-- 左侧：浅色背景 + 亮色圆点 -->
								<div class="flex w-1/2 items-center justify-center bg-gray-100">
									<div class="size-2.5 rounded-full" style="background: {theme['color-primary']}"></div>
								</div>
								<!-- 右侧：深色背景 + 暗色圆点 -->
								<div class="flex w-1/2 items-center justify-center bg-gray-800">
									<div class="size-2.5 rounded-full" style="background: {theme['color-dark']}"></div>
								</div>
							</div>

							<span class="text-2.25 font-medium leading-tight text-gray-600 dark:text-gray-400">
								{theme.label}
							</span>
						</button>
					{/each}
				</div>

				<!-- 当前主题信息 -->
				<div class="rounded-xl border border-gray-200/50 bg-white/60 p-3 backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-900/60">
					<!-- 主题色 -->
					<div class="mb-1 text-center text-2.5 text-gray-500 dark:text-gray-400">{isZh ? '主题色' : 'Theme'}</div>
					<div class="mb-1.5 flex gap-1">
						<div class="h-6 flex-1 rounded shadow-sm" style="background: {currentThemeColors().primary}"></div>
						<div class="h-6 flex-1 rounded shadow-sm" style="background: {currentThemeColors().dark}"></div>
					</div>

					<!-- 背景色 -->
					<div class="mb-1 text-center text-2.5 text-gray-500 dark:text-gray-400">{isZh ? '背景色' : 'Background'}</div>
					<div class="mb-1.5 flex gap-1">
						<div
							class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
							style="background: {currentThemeColors().bgBase}"
						></div>
						<div
							class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
							style="background: {currentThemeColors().bgSurface}"
						></div>
						<div
							class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
							style="background: {currentThemeColors().bgOverlay}"
						></div>
						<div
							class="h-5 flex-1 rounded border border-gray-200 shadow-sm dark:border-gray-700"
							style="background: {currentThemeColors().bgHighlight}"
						></div>
						<div class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500" style="background: {currentThemeColors().bgBaseDark}"></div>
						<div class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500" style="background: {currentThemeColors().bgSurfaceDark}"></div>
						<div class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500" style="background: {currentThemeColors().bgOverlayDark}"></div>
						<div class="h-5 flex-1 rounded border border-gray-700 shadow-sm dark:border-gray-500" style="background: {currentThemeColors().bgHighlightDark}"></div>
					</div>

					<!-- 文字色 -->
					<div class="mb-1 text-center text-2.5 text-gray-500 dark:text-gray-400">{isZh ? '文字色' : 'Text'}</div>
					<div class="mb-1.5 flex gap-1">
						<div
							class="flex h-5 flex-1 items-center justify-center rounded text-2.5 font-medium"
							style="background: {currentThemeColors().bgBase}; color: {currentThemeColors().textPrimary}"
						>
							Aa
						</div>
						<div
							class="flex h-5 flex-1 items-center justify-center rounded text-2.5 font-medium"
							style="background: {currentThemeColors().primary}; color: {currentThemeColors().textOnPrimary}"
						>
							Aa
						</div>
						<div
							class="flex h-5 flex-1 items-center justify-center rounded text-2.5 font-medium"
							style="background: {currentThemeColors().bgBaseDark}; color: {currentThemeColors().textDark}"
						>
							Aa
						</div>
						<div
							class="flex h-5 flex-1 items-center justify-center rounded text-2.5 font-medium"
							style="background: {currentThemeColors().dark}; color: {currentThemeColors().textOnDark}"
						>
							Aa
						</div>
					</div>

					<!-- 功能色 -->
					<div class="mb-1 text-center text-2.5 text-gray-500 dark:text-gray-400">{isZh ? '功能色' : 'Functional'}</div>
					<div class="mb-1.5 flex gap-1">
						<div class="h-5 flex-1 rounded shadow-sm" style="background: {currentThemeColors().success}"></div>
						<div class="h-5 flex-1 rounded shadow-sm" style="background: {currentThemeColors().warning}"></div>
						<div class="h-5 flex-1 rounded shadow-sm" style="background: {currentThemeColors().error}"></div>
						<div class="h-5 flex-1 rounded shadow-sm" style="background: {currentThemeColors().info}"></div>
					</div>

					<!-- 圆角 -->
					<div class="mb-1 text-center text-2.5 text-gray-500 dark:text-gray-400">{isZh ? '圆角' : 'Radius'}</div>
					<div class="flex gap-1">
						<div class="relative h-6 flex-1 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
							<div
								class="border-primary bg-primary/10 dark:border-dark dark:bg-dark/10 absolute -bottom-6 -left-8 h-10 w-14 border-2"
								style="border-radius: {currentThemeColors().radiusBox}"
							></div>
						</div>
						<div class="relative h-6 flex-1 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
							<div
								class="border-primary bg-primary/10 dark:border-dark dark:bg-dark/10 absolute -bottom-6 -left-8 h-10 w-14 border-2"
								style="border-radius: {currentThemeColors().radiusForm}"
							></div>
						</div>
						<div class="relative h-6 flex-1 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
							<div
								class="border-primary bg-primary/10 dark:border-dark dark:bg-dark/10 absolute -bottom-6 -left-8 h-10 w-14 border-2"
								style="border-radius: {currentThemeColors().radiusSmall}"
							></div>
						</div>
					</div>
				</div>

				<!-- 自定义主题链接 -->
				<a
					href="/guide/generator"
					class="hover:border-primary hover:bg-primary/5 dark:hover:border-dark dark:hover:bg-dark/5 group flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-3 transition-all dark:border-gray-700 dark:bg-gray-800/50"
				>
					<div
						class="from-primary to-primary-700 dark:from-dark dark:to-dark-700 flex size-8 items-center justify-center rounded-lg bg-linear-to-br text-white shadow-md"
					>
						<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
							/>
						</svg>
					</div>
					<div class="flex-1 text-left">
						<div class="text-sm font-medium text-gray-800 dark:text-gray-200">{isZh ? '创建自定义主题' : 'Create Custom Theme'}</div>
						<div class="text-xs text-gray-500">{isZh ? '使用主题生成器' : 'Use theme generator'}</div>
					</div>
					<svg class="size-4 text-gray-400 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
						/>
					</svg>
				</a>
			</div>

			<!-- 预览区域 - 亮暗对比（使用独立的内联样式，不受全局主题影响） -->
			<div
				bind:this={previewEl}
				role="presentation"
				class="relative w-full max-w-130 overflow-hidden rounded-2xl border border-gray-200/30 shadow-xl shadow-black/5 dark:border-white/10 dark:shadow-white/5"
				onpointermove={onDrag}
				onpointerup={endDrag}
				onpointerleave={endDrag}
			>
				<!-- 亮色层 -->
				<div data-mode="light" style="{lightLayerStyles} background-color: var(--color-bg-base)">
					<div class="flex justify-center p-3" style="color: var(--color-text-primary)">
						<div class="flex w-full max-w-100 flex-col gap-2">
							<!-- 头部 -->
							<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
								<div class="flex items-center gap-3">
									<Avatar size="sm" image="/assets/images/home/avatar_1.jpg" />
									<div class="flex-1">
										<div class="text-sm font-semibold">Light Mode</div>
										<div class="text-xs opacity-60">{currentThemeData.label}</div>
									</div>
									<Badge text="11">
										<div class="bg-primary size-7" style="border-radius: var(--radius-small)"></div>
									</Badge>
								</div>
							</Card>

							<!-- NoticeBar -->
							<NoticeBar
								textList={[
									isZh
										? '欢迎使用 STDF 组件库，简单、快速、高效的移动端组件库。支持 Svelte 5，基于 Tailwind CSS 4，祝您使用愉快！'
										: 'Welcome to STDF, a simple, fast, and efficient mobile component library. Supports Svelte 5, built on Tailwind CSS 4, Enjoy your development!'
								]}
								rightIcon={null}
							/>

							<!-- Loading -->
							<div class="flex items-center justify-around py-2">
								{#each randomLoadingTypes as type (type)}
									<Loading {type} theme />
								{/each}
							</div>

							<!-- Tab -->
							<Tab labels={[{ text: isZh ? '推荐' : 'For You' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }]} />

							<!-- Icon -->
							<div class="flex items-center justify-around py-2">
								<Icon name="ri-home-4-line" theme />
								<Icon name="ri-heart-line" theme />
								<Icon name="ri-star-line" theme />
								<Icon name="ri-message-3-line" theme />
								<Icon name="ri-share-forward-line" theme />
							</div>

							<!-- Cell -->
							<div>
								<Cell title={isZh ? '个人信息' : 'Profile'} />
								<Cell title={isZh ? '消息通知' : 'Notifications'} right={{ type: 'switch' }} bind:switchActive={cellSwitchActive} />
							</div>

							<!-- 开关和滑块 -->
							<div class="grid grid-cols-2 gap-2">
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex justify-center">
										<Switch bind:active={switchActive} />
									</div>
								</Card>
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<Slider bind:value={sliderValue} showTip="never" />
								</Card>
							</div>

							<!-- 进度 -->
							<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
								<Progress percent={75} percentPosition="block" />
							</Card>

							<!-- 评分和数量 -->
							<div class="grid grid-cols-2 gap-2">
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<Rate value={4} height={16} />
								</Card>
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex justify-center">
										<Stepper bind:value={stepperValue} min={1} max={10} />
									</div>
								</Card>
							</div>

							<!-- 功能色状态 -->
							<div class="grid grid-cols-4 gap-2">
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-success/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-success size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
												/></svg
											>
										</div>
										<span class="text-success text-2.5">{isZh ? '成功' : 'OK'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-warning/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-warning size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
												/></svg
											>
										</div>
										<span class="text-warning text-2.5">{isZh ? '警告' : 'Warn'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-error/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-error size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
												/></svg
											>
										</div>
										<span class="text-error text-2.5">{isZh ? '错误' : 'Error'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-black/5">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-info/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-info size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
												/></svg
											>
										</div>
										<span class="text-info text-2.5">{isZh ? '信息' : 'Info'}</span>
									</div>
								</Card>
							</div>

							<!-- 按钮组 -->
							<div class="grid grid-cols-2 gap-2">
								<Button fill="base" size="full">{isZh ? '确认' : 'Confirm'}</Button>
								<Button fill="lineState" size="full">{isZh ? '取消' : 'Cancel'}</Button>
							</div>
						</div>
					</div>
				</div>

				<!-- 暗色层 -->
				<div
					data-mode="dark"
					class="dark absolute inset-0"
					style="{darkLayerStyles} background-color: var(--color-bg-base-dark); clip-path: inset(0 0 0 {sliderPos}%)"
				>
					<div class="flex justify-center p-3" style="color: var(--color-text-dark)">
						<div class="flex w-full max-w-100 flex-col gap-2">
							<!-- 头部 -->
							<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
								<div class="flex items-center gap-3">
									<Avatar size="sm" image="/assets/images/home/avatar_1.jpg" />
									<div class="flex-1">
										<div class="text-sm font-semibold">Dark Mode</div>
										<div class="text-xs opacity-60">{currentThemeData.label}</div>
									</div>
									<Badge text="11">
										<div class="bg-dark size-7" style="border-radius: var(--radius-small)"></div>
									</Badge>
								</div>
							</Card>

							<!-- NoticeBar -->
							<NoticeBar
								textList={[
									isZh
										? '欢迎使用 STDF 组件库，简单、快速、高效的移动端组件库。支持 Svelte 5，基于 Tailwind CSS 4，祝您使用愉快！'
										: 'Welcome to STDF, a simple, fast, and efficient mobile component library. Supports Svelte 5, built on Tailwind CSS 4, Enjoy your development!'
								]}
								rightIcon={null}
							/>

							<!-- Loading -->
							<div class="flex items-center justify-around py-2">
								{#each randomLoadingTypes as type (type)}
									<Loading {type} theme />
								{/each}
							</div>

							<!-- Tab -->
							<Tab labels={[{ text: isZh ? '推荐' : 'For You' }, { text: isZh ? '关注' : 'Follow' }, { text: isZh ? '热门' : 'Hot' }]} />

							<!-- Icon -->
							<div class="flex items-center justify-around py-2">
								<Icon name="ri-home-4-line" theme />
								<Icon name="ri-heart-line" theme />
								<Icon name="ri-star-line" theme />
								<Icon name="ri-message-3-line" theme />
								<Icon name="ri-share-forward-line" theme />
							</div>

							<!-- Cell -->
							<div>
								<Cell title={isZh ? '个人信息' : 'Profile'} />
								<Cell title={isZh ? '消息通知' : 'Notifications'} right={{ type: 'switch' }} bind:switchActive={cellSwitchActive} />
							</div>

							<!-- 开关和滑块 -->
							<div class="grid grid-cols-2 gap-2">
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex justify-center">
										<Switch bind:active={switchActive} />
									</div>
								</Card>
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<Slider bind:value={sliderValue} showTip="never" />
								</Card>
							</div>

							<!-- 进度 -->
							<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
								<Progress percent={75} percentPosition="block" />
							</Card>

							<!-- 评分和数量 -->
							<div class="grid grid-cols-2 gap-2">
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<Rate value={4} height={16} />
								</Card>
								<Card mx="0" my="0" p="3" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex justify-center">
										<Stepper bind:value={stepperValue} min={1} max={10} />
									</div>
								</Card>
							</div>

							<!-- 功能色状态 -->
							<div class="grid grid-cols-4 gap-2">
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-success/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-success size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
												/></svg
											>
										</div>
										<span class="text-success text-2.5">{isZh ? '成功' : 'OK'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-warning/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-warning size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
												/></svg
											>
										</div>
										<span class="text-warning text-2.5">{isZh ? '警告' : 'Warn'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-error/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-error size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
												/></svg
											>
										</div>
										<span class="text-error text-2.5">{isZh ? '错误' : 'Error'}</span>
									</div>
								</Card>
								<Card mx="0" my="0" p="2" shadow="sm" border="solid" borderWidth="1" injClass="border-white/10">
									<div class="flex flex-col items-center gap-1">
										<div class="bg-info/15 flex size-6 items-center justify-center rounded-full">
											<svg class="text-info size-3.5" viewBox="0 0 24 24" fill="currentColor"
												><path
													d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
												/></svg
											>
										</div>
										<span class="text-info text-2.5">{isZh ? '信息' : 'Info'}</span>
									</div>
								</Card>
							</div>

							<!-- 按钮组 -->
							<div class="grid grid-cols-2 gap-2">
								<Button fill="base" size="full">{isZh ? '确认' : 'Confirm'}</Button>
								<Button fill="lineState" size="full">{isZh ? '取消' : 'Cancel'}</Button>
							</div>
						</div>
					</div>
				</div>

				<!-- 分割线手柄 -->
				<div
					class="absolute top-0 z-20 h-full w-0.5 -translate-x-1/2 cursor-ew-resize"
					style="left: {sliderPos}%"
					onpointerdown={startDrag}
				>
					<div
						class="from-primary to-primary-700 absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-linear-to-br shadow-xl transition-transform duration-300 active:scale-110"
					>
						<svg class="size-4 text-white" viewBox="0 0 24 24" fill="currentColor">
							<path d="M8 5L3 12L8 19V5ZM16 5V19L21 12L16 5Z" />
						</svg>
					</div>
				</div>
			</div>
		</div>

		<!-- 底部特性标签 -->
		<div class="mt-8 flex flex-wrap justify-center gap-2">
			{#each [{ icon: '🎨', text: isZh ? 'OKLCH 色彩空间' : 'OKLCH Color Space' }, { icon: '💎', text: isZh ? '42 套内置主题' : '42 Built-in Themes' }, { icon: '🌗', text: isZh ? '亮暗双色配置' : 'Light & Dark Colors' }, { icon: '⚙️', text: isZh ? '丰富配置项' : 'Rich Configuration' }, { icon: '⚡', text: isZh ? '实时主题切换' : 'Real-time Switch' }, { icon: '🛠', text: isZh ? '自定义主题生成' : 'Custom Theme Generator' }] as tag}
				<span
					class="inline-flex items-center gap-1.5 rounded-full bg-gray-100/80 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
				>
					<span>{tag.icon}</span>
					{tag.text}
				</span>
			{/each}
		</div>
	</div>
</section>

<style>
	/* 亮色层：强制使用 primary 颜色，覆盖 dark: 变体 */
	[data-mode='light'] :global(.bg-primary),
	[data-mode='light'] :global(.dark\:bg-dark) {
		background-color: var(--color-primary) !important;
	}
	[data-mode='light'] :global(.text-primary),
	[data-mode='light'] :global(.dark\:text-dark) {
		color: var(--color-primary) !important;
	}
	[data-mode='light'] :global(.border-primary:not(.border-t-transparent):not(.border-b-transparent):not(.border-l-transparent):not(.border-r-transparent)),
	[data-mode='light'] :global(.dark\:border-dark:not(.border-t-transparent):not(.border-b-transparent):not(.border-l-transparent):not(.border-r-transparent)) {
		border-color: var(--color-primary) !important;
	}
	[data-mode='light'] :global(.fill-primary),
	[data-mode='light'] :global(.dark\:fill-dark) {
		fill: var(--color-primary) !important;
	}
	[data-mode='light'] :global(.stroke-primary),
	[data-mode='light'] :global(.dark\:stroke-dark) {
		stroke: var(--color-primary) !important;
	}
	/* 亮色层背景色 */
	[data-mode='light'] :global(.bg-surface),
	[data-mode='light'] :global(.dark\:bg-surface-dark) {
		background-color: var(--color-bg-surface) !important;
	}
	[data-mode='light'] :global(.text-on-primary),
	[data-mode='light'] :global(.dark\:text-on-dark) {
		color: var(--color-text-on-primary) !important;
	}
	/* 亮色层：覆盖暗色模式的文字颜色 */
	[data-mode='light'] :global(.dark\:text-white) {
		color: inherit !important;
	}
	[data-mode='light'] :global(.dark\:text-gray-100),
	[data-mode='light'] :global(.dark\:text-gray-200),
	[data-mode='light'] :global(.dark\:text-gray-300),
	[data-mode='light'] :global(.dark\:text-gray-400),
	[data-mode='light'] :global(.dark\:text-gray-500) {
		color: inherit !important;
	}
	/* 亮色层：覆盖暗色模式的背景 - 使用亮色模式对应值 */
	[data-mode='light'] :global(.dark\:bg-surface-dark),
	[data-mode='light'] :global(.dark\:bg-bg-surface-dark) {
		background-color: var(--color-bg-surface) !important;
	}
	[data-mode='light'] :global(.dark\:bg-white\/5) {
		background-color: rgba(0, 0, 0, 0.05) !important;
	}
	[data-mode='light'] :global(.dark\:bg-white\/10) {
		background-color: rgba(0, 0, 0, 0.05) !important;
	}
	[data-mode='light'] :global(.dark\:bg-dark\/5) {
		background-color: color-mix(in oklch, var(--color-primary) 5%, transparent) !important;
	}
	/* 亮色层：覆盖暗色模式的边框 - 使用亮色模式对应值 */
	[data-mode='light'] :global(.dark\:border-white\/5) {
		border-color: rgba(0, 0, 0, 0.05) !important;
	}
	[data-mode='light'] :global(.dark\:border-white\/10) {
		border-color: rgba(0, 0, 0, 0.1) !important;
	}
	/* 亮色层：覆盖暗色模式的阴影 - 移除白色阴影 */
	[data-mode='light'] :global(.dark\:shadow-white\/5),
	[data-mode='light'] :global(.dark\:shadow-white\/10),
	[data-mode='light'] :global(.dark\:shadow-white\/20) {
		--tw-shadow-color: rgba(0, 0, 0, 0.1) !important;
	}

	/* 暗色层：强制使用 dark 颜色 */
	[data-mode='dark'] :global(.bg-primary) {
		background-color: var(--color-dark) !important;
	}
	[data-mode='dark'] :global(.text-primary) {
		color: var(--color-dark) !important;
	}
	[data-mode='dark'] :global(.border-primary:not(.border-t-transparent):not(.border-b-transparent):not(.border-l-transparent):not(.border-r-transparent)) {
		border-color: var(--color-dark) !important;
	}
	[data-mode='dark'] :global(.fill-primary) {
		fill: var(--color-dark) !important;
	}
	[data-mode='dark'] :global(.stroke-primary) {
		stroke: var(--color-dark) !important;
	}
	/* 暗色层背景色 */
	[data-mode='dark'] :global(.bg-surface) {
		background-color: var(--color-bg-surface-dark) !important;
	}
	[data-mode='dark'] :global(.text-on-primary) {
		color: var(--color-text-on-dark) !important;
	}
</style>
