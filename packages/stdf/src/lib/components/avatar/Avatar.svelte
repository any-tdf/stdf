<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { AvatarProps } from '../../types/index.js';

	let {
		image = '',
		alt = '',
		icon = {},
		altSize = 'md',
		radius = 'sm',
		size = 'base',
		imgSize = 'l',
		line = 'none',
		injClass = '',
		onclick
	}: AvatarProps = $props();

	// 圆角风格样式
	// radius style
	const radiusObj = {
		none: 'rounded-none',
		sm: 'rounded-sm',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full'
	};

	// 头像框大小样式
	// avatar size style
	const sizeObj = {
		xs: 'w-6 h-6',
		sm: 'w-10 h-10',
		base: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-20 h-20',
		xl: 'w-28 h-28',
		'2xl': 'w-32 h-32'
	};

	// 头像图片大小样式
	// avatar image size style
	const imgSizeObj = { s: 'h-1/3 w-1/3', m: 'h-2/3 w-2/3', l: 'h-full w-full' };

	// 边框风格样式
	// border style
	const lineObj = {
		none: ' ',
		solid: ' border border-solid border-primary dark:border-dark',
		dashed: ' border border-dashed border-primary dark:border-dark',
		dotted: ' border border-dotted border-primary dark:border-dark'
	};

	// 替换文本大小样式
	// replace text size style
	const altSizeObj = {
		xs: 'text-base',
		sm: 'text-2xl',
		md: 'text-4xl',
		lg: 'text-6xl',
		xl: 'text-8xl'
	};

	// 当默认情况时根据 size 计算 Icon 大小
	// when default, calculate Icon size by size
	const iconSizeObj = { xs: 12, sm: 20, base: 24, md: 32, lg: 40, xl: 56, '2xl': 64 };
</script>

<button
	class="bg-primary-200 dark:bg-dark-200 flex justify-center overflow-hidden relative{lineObj[line] || ''} {sizeObj[size] ||
		sizeObj.md} {radiusObj[radius] || radiusObj.sm} {injClass}"
	onclick={() => onclick && onclick()}
>
	{#if image === '' && alt === ''}
		<div class="m-auto">
			<Icon
				size={iconSizeObj[size] || iconSizeObj.base}
				name="ri-user-3-line"
				theme
				{...icon}
				injClass="text-primary-950 dark:text-dark-950"
			/>
		</div>
	{:else if image === '' && alt !== ''}
		<div
			class="text-primary-950 dark:text-dark-950 text-center {altSizeObj[altSize] || altSizeObj.md}"
			style="position: absolute;top: 50%;left:50%;transform: translate(-50%, -50%);"
		>
			{alt}
		</div>
	{:else}
		<div class="m-auto text-center">
			<img
				src={image}
				class="inline-block object-cover {imgSizeObj[imgSize] || imgSizeObj.l}"
				alt=""
				style="position: absolute;top: 50%;left:50%;transform: translate(-50%, -50%);"
			/>
		</div>
	{/if}
</button>
