<script>
	import { createEventDispatcher } from 'svelte';
	import Avatar from './Avatar.svelte';
	import Icon from '../icon/Icon.svelte';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	/**
	 * 头像数据
	 * avatar data
	 * @type {Array}
	 */
	export let data = [];

	/**
	 * 圆角风格
	 * radius style
	 * @type {'none'|'base'|'xl'|'2xl'|'3xl'|'full'}
	 * @default 'base'
	 */
	export let radius = 'full';

	/**
	 * 头像框大小
	 * avatar size
	 * @type {'xs'|'sm'|'base'|'md'|'lg'|'xl'}
	 * @default 'base'
	 */
	export let size = 'base';

	/**
	 * 紧凑度，1-10
	 * compactness, 1-10
	 * @type {Number}
	 * @default 5
	 */
	export let compact = 5;

	/**
	 * 边框粗细
	 * border width
	 * @type {'0'|'1'|'2'|'3'|'4'|'8'}
	 * @default '3'
	 */
	export let lineWidth = '3';

	/**
	 * 是否反向
	 * is reverse
	 * @type {Boolean}
	 * @default false
	 */
	export let reverse = false;

	/**
	 * 最大显示数量
	 * max display count
	 * @type {Number}
	 * @default 10
	 */
	export let max = 10;

	/**
	 * 顶层内容
	 * top content
	 * @type {'totle'|'add'|'none'|'slot'}
	 * @default 'totle'
	 */
	export let top = 'totle';

	/**
	 * 注入CSS
	 * inject CSS
	 * @type {String}
	 * @default ''
	 */
	export let injClass = '';

	// 圆角风格样式
	// radius style
	const radiusObj = {
		none: 'rounded-none',
		base: 'rounded',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full',
	};
	// 边框粗细样式
	// border width style
	const lineWidthClass = {
		0: 'ring-0',
		1: 'ring-1',
		2: 'ring-2',
		3: 'ring',
		4: 'ring-4',
		8: 'ring-8',
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
		'2xl': 'w-32 h-32',
	};

	// 替换文本大小样式
	// replace text size style
	const textSizeObj = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-lg',
		md: 'text-3xl',
		lg: 'text-4xl',
		xl: 'text-6xl',
	};

	$: dataInner = data.slice(0, max);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex"
	on:click={() => {
		dispatch('clickgroup');
	}}
>
	{#if reverse}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.base} {injClass}"
			style="z-index:{dataInner.length}"
		>
			{#if top === 'totle'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col text-center justify-center overflow-hidden text-primary-950 dark:text-dark-950 {radiusObj[
						radius
					] || radiusObj.base} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					+{data.length}
				</div>
			{:else if top === 'add'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col text-center justify-center overflow-hidden {radiusObj[radius] ||
						radiusObj.base} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					<Icon name="ri-user-add-line" injClass="text-primary-950 dark:text-dark-950" />
				</div>
			{:else if top === 'slot'}
				<slot />
			{:else if top === 'none'}
				<!-- none -->
			{:else}
				<span>Please pass in the correct top!</span>
			{/if}
		</div>
	{/if}
	{#each dataInner as item, i}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.base} {injClass}"
			style="transform: translateX({-compact * 10 * i - (reverse ? 50 : 0)}%);z-index:{reverse ? dataInner.length - 1 - i : i}"
		>
			<Avatar {radius} {size} {...item} />
		</div>
	{/each}
	{#if !reverse}
		<div
			class="relative {lineWidthClass[lineWidth] || lineWidthClass[2]} ring-primaryWhite dark:ring-darkBlack {radiusObj[radius] ||
				radiusObj.base} {injClass}"
			style="transform: translateX(-{compact * 10 * dataInner.length}%);z-index:{dataInner.length}"
		>
			{#if top === 'totle'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col text-center justify-center overflow-hidden text-primary-950 dark:text-dark-950 {radiusObj[
						radius
					] || radiusObj.base} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					+{data.length}
				</div>
			{:else if top === 'add'}
				<div
					class="bg-primary-200 dark:bg-dark-200 flex flex-col text-center justify-center overflow-hidden {radiusObj[radius] ||
						radiusObj.base} {sizeObj[size] || sizeObj.md} {textSizeObj[size] || textSizeObj.base}"
				>
					<Icon name="ri-user-add-line" injClass="text-primary-950 dark:text-dark-950" />
				</div>
			{:else if top === 'slot'}
				<slot />
			{:else if top === 'none'}
				<!-- none -->
			{:else}
				<span>Please pass in the correct top!</span>
			{/if}
		</div>
	{/if}
</div>
