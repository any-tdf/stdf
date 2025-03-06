<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { MaskProps } from '../../types/index.js';

	let {
		visible = false,
		opacity = '0.5',
		clickable = false,
		inverse = false,
		backdropBlur = 'none',
		duration = 150,
		outDuration = 0,
		zIndex = 500,
		children,
		onclickMask
	}: MaskProps = $props();

	//遮罩模糊度样式
	// Mask blur style
	const backdropBlurClass = {
		none: '',
		xs: ' backdrop-blur-xs',
		sm: ' backdrop-blur-sm',
		md: ' backdrop-blur-md',
		lg: ' backdrop-blur-lg',
		xl: ' backdrop-blur-xl',
		'2xl': ' backdrop-blur-2xl',
		'3xl': ' backdrop-blur-3xl'
	};

	// 遮罩背景色
	// Mask background color
	const bgClass = {
		'0': ' bg-transparent',
		'0.1': ' bg-black/10 dark:bg-white/10',
		'0.2': ' bg-black/20 dark:bg-white/20',
		'0.3': ' bg-black/30 dark:bg-white/30',
		'0.4': ' bg-black/40 dark:bg-white/40',
		'0.5': ' bg-black/50 dark:bg-white/50',
		'0.6': ' bg-black/60 dark:bg-white/60',
		'0.7': ' bg-black/70 dark:bg-white/70',
		'0.8': ' bg-black/80 dark:bg-white/80',
		'0.9': ' bg-black/90 dark:bg-white/90',
		'1': ' bg-black dark:bg-white'
	};

	// 遮罩背景色反色
	// Mask background color reverse color
	const bgClassInverse = {
		'0': ' bg-transparent',
		'0.1': ' bg-white/10 dark:bg-black/10',
		'0.2': ' bg-white/20 dark:bg-black/20',
		'0.3': ' bg-white/30 dark:bg-black/30',
		'0.4': ' bg-white/40 dark:bg-black/40',
		'0.5': ' bg-white/50 dark:bg-black/50',
		'0.6': ' bg-white/60 dark:bg-black/60',
		'0.7': ' bg-white/70 dark:bg-black/70',
		'0.8': ' bg-white/80 dark:bg-black/80',
		'0.9': ' bg-white/90 dark:bg-black/90',
		'1': ' bg-white dark:bg-black'
	};
</script>

{#if visible}
	<button
		in:fade|global={{ duration }}
		out:fade|global={{ duration: outDuration }}
		onclick={() => onclickMask && onclickMask?.()}
		class="fixed h-screen w-screen inset-0{inverse
			? bgClassInverse[opacity] || bgClassInverse['0.5']
			: bgClass[opacity] || bgClass['0.5']}{clickable ? ' pointer-events-none' : ''}{backdropBlurClass[backdropBlur] ||
			backdropBlurClass['none']}"
		style="z-index:{zIndex}"
	>
		{@render children?.()}
	</button>
{/if}
