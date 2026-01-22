<script lang="ts">
	import { fly, slide, fade, scale, blur } from 'svelte/transition';
	import * as eases from 'svelte/easing';
	import Card from '../card/Card.svelte';
	import Icon from '../icon/Icon.svelte';
	import type { AlertProps } from '../../types/index.js';

	let {
		visible = $bindable(false),
		title = '',
		message = '',
		duration = 3000,
		position = 'top',
		py = '20',
		type = null,
		showIcon = true,
		icon = {},
		closable = true,
		inverse = true,
		card = {},
		transitionType = 'fly',
		transitionParams = {},
		outDuration = 300,
		easeType = 'cubicOut',
		easeOutType = 'cubicOut',
		zIndex = 1000,
		clickable = true,
		injClass = '',
		children,
		onclose
	}: AlertProps = $props();

	let closingBySelf = $state(false);

	// 自动关闭
	// Auto close
	$effect(() => {
		if (visible && duration > 0) {
			const timer = setTimeout(() => {
				requestClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	});

	// 关闭按钮点击
	// Close button click
	const handleClose = () => {
		requestClose();
	};

	const requestClose = () => {
		if (!visible || closingBySelf) return;
		closingBySelf = true;
		visible = false;
		if (!transitionType || outDuration <= 0) {
			onclose?.();
			closingBySelf = false;
		}
	};

	const handleOutroEnd = () => {
		if (!closingBySelf) return;
		onclose?.();
		closingBySelf = false;
	};

	// 位置样式
	// Position style
	const positionClass = {
		top: 'top-0 left-0 right-0',
		bottom: 'bottom-0 left-0 right-0'
	};

	// 距离样式
	// Padding style
	const pyClass = {
		'0': 'py-0',
		'10': 'py-10',
		'20': 'py-5',
		'40': 'py-10',
		'60': 'py-15',
		'80': 'py-20'
	};

	// 类型图标颜色
	// Type icon color
	const typeIconClass: Record<string, string> = {
		success: 'text-success',
		error: 'text-error',
		warning: 'text-warning',
		info: 'text-info'
	};

	// 进入过渡参数
	// In transition params
	const getInTransitionParams = () => {
		const params: Record<string, unknown> = { duration: 300, easing: eases[easeType], ...transitionParams };
		if (transitionType === 'fly' && params.y === undefined) {
			params.y = position === 'top' ? -100 : 100;
		}
		return params;
	};

	// 退出过渡参数
	// Out transition params
	const getOutTransitionParams = () => {
		const params: Record<string, unknown> = { ...transitionParams, duration: outDuration, easing: eases[easeOutType] };
		if (transitionType === 'fly' && params.y === undefined) {
			params.y = position === 'top' ? -100 : 100;
		}
		return params;
	};

	// 反转色样式（Tailwind safelist: bg-bg-surface-dark dark:bg-bg-surface text-text-dark dark:text-text-primary text-text-dark/70 dark:text-text-primary/70 text-text-dark/50 dark:text-text-primary/50 hover:bg-text-dark/5 dark:hover:bg-text-primary/5 active:bg-text-dark/10 dark:active:bg-text-primary/10）
	// Inverse color styles
	const inverseBgClass = $derived(inverse ? 'bg-bg-surface-dark dark:bg-bg-surface' : '');
	const inverseTextClass = $derived(inverse ? 'text-text-dark dark:text-text-primary' : '');
	const inverseMessageClass = $derived(inverse ? 'text-text-dark/70 dark:text-text-primary/70' : 'text-black/70 dark:text-white/70');
	const inverseCloseClass = $derived(
		inverse
			? 'text-text-dark/50 dark:text-text-primary/50 hover:bg-text-dark/5 dark:hover:bg-text-primary/5 active:bg-text-dark/10 dark:active:bg-text-primary/10'
			: 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10'
	);
</script>

{#snippet alertContent()}
	<div class="pointer-events-auto {inverseBgClass} {inverseTextClass} rounded-(--radius-box)">
		<Card shadow="lg" mx="0" my="0" bg={inverse ? 'none' : 'surface'} {...card}>
			<div class="flex items-start gap-3">
				<!-- 类型图标 Type icon -->
				{#if showIcon && type}
					<div class="shrink-0 {typeIconClass[type]}">
						{#if type === 'success'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
								/>
							</svg>
						{:else if type === 'error'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
								/>
							</svg>
						{:else if type === 'warning'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
								/>
							</svg>
						{:else if type === 'info'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 7V9H13V7H11ZM11 11V17H13V11H11Z"
								/>
							</svg>
						{/if}
					</div>
				{:else if showIcon && icon && Object.keys(icon).length > 0}
					<div class="shrink-0">
						<Icon size={24} {...icon} />
					</div>
				{/if}

				<!-- 内容区域 Content area -->
				<div class="min-w-0 flex-1">
					{#if children}
						{@render children()}
					{:else}
						{#if title}
							<div class="font-medium">{title}</div>
						{/if}
						{#if message}
							<div class="text-sm {inverseMessageClass} {title ? 'mt-1' : ''}">{message}</div>
						{/if}
					{/if}
				</div>

				<!-- 关闭按钮 Close button -->
				{#if closable}
					<button
						type="button"
						class="-m-1 shrink-0 rounded-full p-1 transition-colors {inverseCloseClass}"
						onclick={handleClose}
						aria-label="Close"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 10.5858L16.9497 5.63604L18.364 7.05025L13.4142 12L18.364 16.9497L16.9497 18.364L12 13.4142L7.05025 18.364L5.63604 16.9497L10.5858 12L5.63604 7.05025L7.05025 5.63604L12 10.5858Z"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</Card>
	</div>
{/snippet}

{#if visible}
	{#if transitionType === 'scale'}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
			in:scale|global={getInTransitionParams()}
			out:scale|global={getOutTransitionParams()}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'fly'}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
			in:fly|global={getInTransitionParams()}
			out:fly|global={getOutTransitionParams()}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'slide'}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
			in:slide|global={getInTransitionParams()}
			out:slide|global={getOutTransitionParams()}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'fade'}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
			in:fade|global={getInTransitionParams()}
			out:fade|global={getOutTransitionParams()}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else if transitionType === 'blur'}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
			in:blur|global={getInTransitionParams()}
			out:blur|global={getOutTransitionParams()}
			onoutroend={handleOutroEnd}
		>
			{@render alertContent()}
		</div>
	{:else}
		<div
			class="fixed {positionClass[position]} {pyClass[py]} px-2 {clickable ? 'pointer-events-none' : ''} {injClass}"
			style="z-index: {zIndex};"
		>
			{@render alertContent()}
		</div>
	{/if}
{/if}
