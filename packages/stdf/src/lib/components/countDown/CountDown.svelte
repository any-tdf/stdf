<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { CountDownProps, TimeData } from '../../types/index.js';

	let {
		time = 0,
		format = 'HH:mm:ss',
		autoStart = true,
		millisecond = false,
		injClass = '',
		children,
		onfinish,
		onchange
	}: CountDownProps = $props();

	// 剩余时间（毫秒）
	// Remaining time (milliseconds)
	let remain = $derived(time);
	;

	// 是否正在运行
	// Whether running
	let counting = $state(false);

	// 结束时间戳
	// End timestamp
	let endTime = 0;

	// 动画帧 ID
	// Animation frame ID
	let rafId: number | null = null;

	// 上一次的 time 值，用于检测外部传入的 time 是否变化
	// Previous time value, used to detect external time prop changes
	let prevTime = $derived(time);
	;

	// 解析时间为 TimeData
	// Parse time to TimeData
	const parseTime = (ms: number): TimeData => {
		const days = Math.floor(ms / (1000 * 60 * 60 * 24));
		const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((ms % (1000 * 60)) / 1000);
		const milliseconds = ms % 1000;

		return { days, hours, minutes, seconds, milliseconds };
	};

	// 当前时间数据
	// Current time data
	const timeData = $derived(parseTime(remain));

	// 补零函数
	// Pad zero function
	const padZero = (num: number, length: number = 2): string => {
		return String(num).padStart(length, '0');
	};

	// 格式化显示文本
	// Format display text
	const formattedTime = $derived(() => {
		let result = format;
		const { days, hours, minutes, seconds, milliseconds } = timeData;

		// 处理天数
		// Handle days
		if (result.includes('DD')) {
			result = result.replace('DD', padZero(days));
		} else {
			// 如果没有天数格式，将天数加到小时中
			// If no day format, add days to hours
		}

		// 计算总小时数（如果格式中没有 DD）
		// Calculate total hours (if no DD in format)
		const totalHours = format.includes('DD') ? hours : days * 24 + hours;

		result = result.replace('HH', padZero(totalHours));
		result = result.replace('mm', padZero(minutes));
		result = result.replace('ss', padZero(seconds));
		result = result.replace('SSS', padZero(milliseconds, 3));
		result = result.replace('SS', padZero(Math.floor(milliseconds / 10), 2));
		result = result.replace('S', String(Math.floor(milliseconds / 100)));

		return result;
	});

	// 计时核心函数
	// Core timing function
	const tick = () => {
		const now = Date.now();
		const newRemain = Math.max(0, endTime - now);

		// 根据是否毫秒级渲染决定是否更新
		// Decide whether to update based on millisecond rendering
		if (millisecond || Math.floor(newRemain / 1000) !== Math.floor(remain / 1000)) {
			remain = newRemain;
			onchange?.(timeData);
		} else {
			remain = newRemain;
		}

		if (remain > 0) {
			rafId = requestAnimationFrame(tick);
		} else {
			counting = false;
			onfinish?.();
		}
	};

	// 开始倒计时
	// Start countdown
	const start = () => {
		if (counting) return;
		if (remain <= 0) return;

		counting = true;
		endTime = Date.now() + remain;
		tick();
	};

	// 暂停倒计时
	// Pause countdown
	const pause = () => {
		if (!counting) return;

		counting = false;
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		// 暂停时更新剩余时间为当前精确值
		// Update remain to current exact value when pausing
		remain = Math.max(0, endTime - Date.now());
	};

	// 重置倒计时
	// Reset countdown
	const reset = (newTime?: number) => {
		pause();
		remain = newTime !== undefined ? newTime : time;
		onchange?.(timeData);
	};

	// 处理页面可见性变化
	// Handle page visibility change
	const handleVisibilityChange = () => {
		if (document.hidden) {
			// 页面隐藏时不需要特殊处理，因为我们使用的是绝对时间
			// No special handling needed when page is hidden, as we use absolute time
		} else {
			// 页面可见时，如果正在计时则继续
			// When page is visible, continue if counting
			if (counting && rafId === null) {
				tick();
			}
		}
	};

	onMount(() => {
		if (autoStart && time > 0) {
			start();
		}

		// 监听页面可见性变化
		// Listen for page visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);
	});

	onDestroy(() => {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
		}
		document.removeEventListener('visibilitychange', handleVisibilityChange);
	});

	// 监听 time 属性变化（只在外部 time 真正变化时才更新）
	// Watch time prop changes (only update when external time actually changes)
	$effect(() => {
		if (time !== prevTime) {
			prevTime = time;
			if (!counting) {
				remain = time;
			}
		}
	});

	// 暴露方法供外部调用
	// Expose methods for external use
	export { start, pause, reset };
</script>

<span class="inline-block{injClass ? ` ${injClass}` : ''}">
	{#if children}
		{@render children(timeData)}
	{:else}
		{formattedTime()}
	{/if}
</span>
