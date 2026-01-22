<script lang="ts">
	import type { SkeletonProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	let { type = 'div', width = '6', height = '6', radius = '', space = '1', lines = 3, iconRatio = 0.6, effect = 'pulse', bg = 'gray' }: SkeletonProps = $props();

	// 计算圆角类名
	// Calculate radius class name
	const radiusClass = $derived(radius ? radiusObj[radius] : 'rounded-(--radius-box)');

	// 效果类名
	// Effect class name
	const effectClass = $derived(
		effect === 'pulse' ? 'animate-pulse' : effect === 'wave' ? 'skeleton-wave' : effect === 'breathe' ? 'skeleton-breathe' : ''
	);

	// 背景色类名
	// Background color class name
	const bgClass = {
		gray: 'bg-black/20 dark:bg-white/20',
		theme: 'bg-primary/20 dark:bg-dark/20'
	};

	const widthObj = {
		full: ' w-full',
		'2': ' w-2',
		'4': ' w-4',
		'6': ' w-6',
		'8': ' w-8',
		'12': ' w-12',
		'16': ' w-16',
		'24': ' w-24',
		'32': ' w-32',
		'48': ' w-48',
		'64': ' w-64',
		'96': ' w-96'
	};
	const heightObj = {
		'1': ' h-1',
		'2': ' h-2',
		'4': ' h-4',
		'6': ' h-6',
		'8': ' h-8',
		'12': ' h-12',
		'16': ' h-16',
		'24': ' h-24',
		'32': ' h-32',
		'48': ' h-48',
		'64': ' h-64',
		'96': ' h-96'
	};
	const paddingObj = { '0.5': ' p-0.5', '1': ' p-1', '2': ' p-2', '4': ' p-4' };
	const randomArr = ['w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-2/5', 'w-3/5', 'w-4/5', 'w-5/6'];
</script>

<div
	class="{effectClass} {type === 'p' || width === 'full' ? 'block' : 'inline-block'}{paddingObj[space as keyof typeof paddingObj] ||
		paddingObj['1']}"
>
	{#if type === 'p'}
		<div class="flex flex-col space-y-2">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each new Array(lines - 1) as _, i (i)}
				<div class="skeleton-item {bgClass[bg] || bgClass.gray} w-full{heightObj[height] || heightObj['6']} {radiusClass}"></div>
			{/each}
			<div
				class="skeleton-item {bgClass[bg] || bgClass.gray} {randomArr[Math.floor(Math.random() * randomArr.length)]}{heightObj[height] ||
					heightObj['6']} {radiusClass}"
			></div>
		</div>
	{:else}
		<div
			class="skeleton-item {bgClass[bg] || bgClass.gray}{widthObj[width] || widthObj.full}{heightObj[height] || heightObj['6']} {radiusClass} flex flex-col justify-center"
		>
			{#if type === 'img' || type === 'video' || type === 'code' || type === 'qrcode' || type === 'barcode'}
				<div class="m-auto" style="width:{iconRatio * 100 + '%'}">
					{#if type === 'img'}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" class="fill-current opacity-20">
							<path
								d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z"
							>
							</path>
						</svg>
					{/if}
					{#if type === 'video'}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" class="fill-current opacity-20">
							<path
								d="M18.001 20H20V22H12C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 15.2712 20.4293 18.1755 18.001 20ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10ZM8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14ZM16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14ZM12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
							>
							</path>
						</svg>
					{/if}
					{#if type === 'code'}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" class="fill-current opacity-20">
							<path
								d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM16.4645 15.5355L20 12L16.4645 8.46447L15.0503 9.87868L17.1716 12L15.0503 14.1213L16.4645 15.5355ZM6.82843 12L8.94975 9.87868L7.53553 8.46447L4 12L7.53553 15.5355L8.94975 14.1213L6.82843 12ZM11.2443 17L14.884 7H12.7557L9.11597 17H11.2443Z"
							>
							</path>
						</svg>
					{/if}
					{#if type === 'qrcode'}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" class="fill-current opacity-20">
							<path
								d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM18 13H21V15H18V13ZM6 6V8H8V6H6ZM6 16V18H8V16H6ZM16 6V8H18V6H16Z"
							>
							</path>
						</svg>
					{/if}
					{#if type === 'barcode'}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" class="fill-current opacity-20">
							<path d="M2 4H4V20H2V4ZM6 4H8V20H6V4ZM9 4H12V20H9V4ZM13 4H15V20H13V4ZM16 4H18V20H16V4ZM19 4H22V20H19V4Z"></path>
						</svg>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.skeleton-wave .skeleton-item {
		position: relative;
		overflow: hidden;
	}
	.skeleton-wave .skeleton-item::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		animation: wave 1.5s infinite;
	}
	@keyframes wave {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
	.skeleton-breathe .skeleton-item {
		animation: breathe 2s ease-in-out infinite;
	}
	@keyframes breathe {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.97);
		}
	}
</style>
