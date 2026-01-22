<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { AvatarProps } from '$lib/types/index.js';
	import { radiusObj } from '../utils/index.js';

	let {
		image = '',
		alt = '',
		icon = {},
		altSize = 'md',
		radius = '',
		size = 'base',
		imgSize = 'l',
		line = 'none',
		injClass = '',
		onclick
	}: AvatarProps = $props();

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
	const altSizeObj = { xs: 'text-base', sm: 'text-2xl', md: 'text-4xl', lg: 'text-6xl', xl: 'text-8xl' };

	// 当默认情况时根据 size 计算 Icon 大小
	// when default, calculate Icon size by size
	const iconSizeObj = { xs: 12, sm: 20, base: 24, md: 32, lg: 40, xl: 56, '2xl': 64 };
</script>

<button
	class="bg-primary-200 dark:bg-dark-200 flex flex-col items-center justify-center overflow-hidden relative{lineObj[line] || ''} {sizeObj[
		size
	] || sizeObj.md} {radius ? radiusObj[radius] : 'rounded-(--radius-form)'} {injClass}"
	onclick={() => onclick && onclick()}
>
	{#if image === '' && alt === ''}
		<div class="flex flex-col items-center justify-center">
			{#if icon.type && icon.name}
				<Icon {...icon} />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width={iconSizeObj[size] || iconSizeObj.base}
					height={iconSizeObj[size] || iconSizeObj.base}
					class="text-primary-900 dark:text-dark-900 fill-current"
				>
					<path
						d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
					></path>
				</svg>
			{/if}
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
