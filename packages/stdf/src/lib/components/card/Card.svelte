<script lang="ts">
	import type { CardProps } from '../../types/index.js';
	import { radiusObj, bgObj } from '../utils/index.js';

	let {
		bg = 'surface',
		radius = '',
		shadow = 'sm',
		border = 'none',
		borderWidth = '1',
		mx = '2',
		my = '2',
		p = '4',
		px,
		py,
		overflow = true,
		headerLine = true,
		footerLine = true,
		injClass = '',
		headerClass = '',
		bodyClass = '',
		footerClass = '',
		header,
		children,
		footer,
		onclick
	}: CardProps = $props();

	// 阴影样式
	// Shadow style
	const shadowObj = {
		none: 'shadow-none',
		xs: 'shadow-xs dark:shadow-white/5',
		sm: 'shadow-sm dark:shadow-white/5',
		md: 'shadow-md dark:shadow-white/10',
		lg: 'shadow-lg dark:shadow-white/10',
		xl: 'shadow-xl dark:shadow-white/10',
		'2xl': 'shadow-2xl dark:shadow-white/20'
	};

	// 边框风格样式
	// Border style
	const borderObj = {
		none: '',
		solid: 'border-solid border-black/10 dark:border-white/10',
		dashed: 'border-dashed border-black/10 dark:border-white/10',
		dotted: 'border-dotted border-black/10 dark:border-white/10'
	};

	// 边框粗细样式
	// Border width style
	const borderWidthObj = {
		'0': 'border-0',
		'1': 'border',
		'2': 'border-2',
		'4': 'border-4'
	};

	// 外边距样式
	// Margin style
	const mxObj = {
		'0': 'mx-0',
		'1': 'mx-1',
		'2': 'mx-2',
		'3': 'mx-3',
		'4': 'mx-4',
		'6': 'mx-6',
		'8': 'mx-8'
	};

	const myObj = {
		'0': 'my-0',
		'1': 'my-1',
		'2': 'my-2',
		'3': 'my-3',
		'4': 'my-4',
		'6': 'my-6',
		'8': 'my-8'
	};

	// 内边距样式
	// Padding style
	const pObj = {
		'0': 'p-0',
		'1': 'p-1',
		'2': 'p-2',
		'3': 'p-3',
		'4': 'p-4',
		'6': 'p-6',
		'8': 'p-8'
	};

	const pxObj = {
		'0': 'px-0',
		'1': 'px-1',
		'2': 'px-2',
		'3': 'px-3',
		'4': 'px-4',
		'6': 'px-6',
		'8': 'px-8'
	};

	const pyObj = {
		'0': 'py-0',
		'1': 'py-1',
		'2': 'py-2',
		'3': 'py-3',
		'4': 'py-4',
		'6': 'py-6',
		'8': 'py-8'
	};

	// 计算 padding 类名
	// Calculate padding class name
	const paddingClass = $derived(px || py ? `${px ? pxObj[px] : ''} ${py ? pyObj[py] : ''}` : pObj[p] || pObj['4']);

	// 计算边框类名
	// Calculate border class name
	const borderClass = $derived(border !== 'none' ? `${borderObj[border]} ${borderWidthObj[borderWidth]}` : '');

	// 容器样式
	// Container style
	const containerClass = $derived(
		`${overflow ? 'overflow-hidden' : ''} ${bg in bgObj ? bgObj[bg] : bgObj['surface']} ${radius ? radiusObj[radius] : 'rounded-(--radius-box)'} ${shadowObj[shadow] || shadowObj['sm']} ${mxObj[mx] || mxObj['2']} ${myObj[my] || myObj['2']} ${borderClass} ${injClass}`
	);
</script>

{#if onclick}
	<button class="block text-left {containerClass}" {onclick}>
		{#if header}
			<div class="px-4 py-3 {headerClass}">
				{@render header()}
			</div>
			{#if headerLine && children}
				<div class="border-t border-black/5 dark:border-white/5"></div>
			{/if}
		{/if}
		{#if children}
			<div class="{paddingClass} {bodyClass}">
				{@render children()}
			</div>
		{/if}
		{#if footer}
			{#if footerLine && children}
				<div class="border-t border-black/5 dark:border-white/5"></div>
			{/if}
			<div class="px-4 py-3 {footerClass}">
				{@render footer()}
			</div>
		{/if}
	</button>
{:else}
	<div class="{containerClass}">
		{#if header}
			<div class="px-4 py-3 {headerClass}">
				{@render header()}
			</div>
			{#if headerLine && children}
				<div class="border-t border-black/5 dark:border-white/5"></div>
			{/if}
		{/if}
		{#if children}
			<div class="{paddingClass} {bodyClass}">
				{@render children()}
			</div>
		{/if}
		{#if footer}
			{#if footerLine && children}
				<div class="border-t border-black/5 dark:border-white/5"></div>
			{/if}
			<div class="px-4 py-3 {footerClass}">
				{@render footer()}
			</div>
		{/if}
	</div>
{/if}
