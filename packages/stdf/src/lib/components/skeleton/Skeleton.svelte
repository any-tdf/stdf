<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { SkeletonProps } from '../../types/index.js';

	let { type = 'div', width = '6', height = '6', radius = 'sm', space = '1', lines = 3, iconRatio = 0.6 }: SkeletonProps = $props();

	const radiusObj = {
		none: ' rounded-none',
		sm: ' rounded-sm',
		md: ' rounded-md',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl',
		'3xl': ' rounded-3xl',
		full: ' rounded-full'
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
	const typeIconFun = (type: string) => {
		const typeMap = {
			img: 'ri-image-2-fill',
			video: 'ri-movie-2-fill',
			code: 'ri-code-box-fill',
			qrcode: 'ri-qr-code-fill',
			barcode: 'ri-barcode-fill'
		};
		return typeMap[type as keyof typeof typeMap] || typeMap.qrcode;
	};
</script>

<div
	class="animate-pulse {type === 'p' || width === 'full' ? 'block' : 'inline-block'}{paddingObj[space as keyof typeof paddingObj] ||
		paddingObj['1']}"
>
	{#if type === 'p'}
		<div class="flex flex-col space-y-2">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each new Array(lines - 1) as _}
				<div class="bg-black/20 dark:bg-white/20 w-full{heightObj[height] || heightObj['6']}{radiusObj[radius] || radiusObj.base}"></div>
			{/each}
			<div
				class="bg-black/20 dark:bg-white/20 {randomArr[Math.floor(Math.random() * randomArr.length)]}{heightObj[height] ||
					heightObj['6']}{radiusObj[radius] || radiusObj.sm}"
			></div>
		</div>
	{:else}
		<div
			class="bg-black/20 dark:bg-white/20{widthObj[width] || widthObj.full}{heightObj[height] || heightObj['6']}{radiusObj[radius] ||
				radiusObj.sm} flex flex-col justify-center"
		>
			{#if type === 'img' || type === 'video' || type === 'code' || type === 'qrcode' || type === 'barcode'}
				<div class="m-auto" style="width:{iconRatio * 100 + '%'}">
					<Icon name={typeIconFun(type)} size="full" alpha={0.2} />
				</div>
			{/if}
		</div>
	{/if}
</div>
