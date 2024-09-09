<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	/**
	 * 当前值
	 * Current value
	 * @type {number}
	 * @range min - max
	 * @default 0
	 */
	export let value = 10;

	/**
	 * 最小值
	 * Minimum value
	 * @type {number}
	 * @default 0
	 */
	export let min = 0;

	/**
	 * 最大值
	 * Maximum value
	 * @type {number}
	 * @default 100
	 */
	export let max = 100;

	/**
	 * 步长
	 * Step length
	 * @type {number}
	 * @default 1
	 */
	export let step = 1;

	/**
	 * 是否纵向
	 * Whether it is vertical
	 * @type {boolean}
	 * @default false
	 */
	export let vertical = false;

	/**
	 * 强调数字区域
	 * Highlight the number area
	 * @type {boolean}
	 * @default false
	 */
	export let numberHighlight = false;

	/**
	 * 强调区域是否是主题色
	 * Whether the highlight area is the theme color
	 * @type {boolean}
	 * @default true
	 */
	export let theme = true;

	/**
	 * 圆角风格
	 * Round style
	 * @type {'none'|'base'|'xl'|'full'}
	 * @default 'base'
	 */
	export let radius = 'base';

	/**
	 * 对内部显示数字保留小数位数
	 * The number of decimal places to display internally
	 * @type {number}
	 * @default 0
	 */
	export let decimal = 0;

	/**
	 * 是否异步状态
	 * Whether it is in asynchronous state
	 * @type {boolean}
	 * @default false
	 */
	export let async = false;

	/**
	 * 异步状态时，是否显示内部loading
	 * Whether to show internal loading when in asynchronous state
	 * @type {boolean}
	 * @default false
	 */
	export let asyncLoading = false;

	/**
	 * 异步状态时，loading的参数
	 * Loading parameters when in asynchronous state
	 * @type {object}
	 * @default {}
	 */
	export let loading = {};

	/**
	 * 外部有无 padding
	 * Whether there is external padding
	 * @type {boolean}
	 * @default true
	 */
	export let padding = true;

	/**
	 * 外部注入的类
	 * External injected class
	 * @type {string}
	 * @default ''
	 */
	export let injClassOut = '';

	/**
	 * 按钮区域注入的类
	 * Button area injected class
	 * @type {string}
	 * @default ''
	 */
	export let injClassBtn = '';

	/**
	 * 数字区域注入的类
	 * Number area injected class
	 * @type {string}
	 * @default ''
	 */
	export let injClassNum = '';

	// 圆角
	// Round
	const roundObj = {
		none: 'rounded-none',
		base: 'rounded',
		xl: 'rounded-xl',
		full: 'rounded-full',
	};

	const dispatch = createEventDispatcher();

	// 减少
	// Decrease
	const decreaseFn = () => {
		if (!async) {
			if (value > min) {
				value = Math.max(min, value - step);
				dispatch('change', value);
			}
		}
		dispatch('decrease');
	};

	// 增加
	// Increase
	const increaseFn = () => {
		if (!async) {
			if (value < max) {
				value = Math.min(max, value + step);
				dispatch('change', value);
			}
		}
		dispatch('increase');
	};
</script>

<div
	class="inline-flex items-center bg-gray-100 dark:bg-gray-800 {roundObj[radius] || 'rounded'} {padding
		? 'p-1'
		: 'p-0'} overflow-hidden {injClassOut} {vertical ? 'flex-col-reverse' : 'flex-row'}"
>
	<button
		on:click={decreaseFn}
		class="{vertical ? 'w-full' : 'w-9'} h-9 {roundObj[radius] ||
			'rounded'} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
			? ' bg-primary/5 dark:bg-dark/10'
			: ' bg-white dark:bg-black'}"
		disabled={async || value === min}
		aria-label="decrease"
	>
		<span class={async || value === min ? 'opacity-20' : ''}>
			<Icon name="ri-subtract-line" theme={theme && (numberHighlight ? false : true)} />
		</span>
	</button>

	{#if async && asyncLoading}
		<div class="px-2 h-9 {roundObj[radius] || 'rounded'} flex flex-col items-center justify-center">
			<Loading width="6" height="6" {...loading} />
		</div>
	{:else}
		<div
			class="px-4 h-9 {roundObj[radius] || 'rounded'} flex flex-col items-center {injClassNum} justify-center{numberHighlight
				? theme
					? ' bg-primary/5 text-primary dark:bg-dark/10 dark:text-dark'
					: ' bg-white dark:bg-black'
				: ''}"
		>
			{value.toFixed(decimal)}
		</div>
	{/if}

	<button
		on:click={increaseFn}
		class="{vertical ? 'w-full' : 'w-9'} h-9 {roundObj[radius] ||
			'rounded'} flex flex-col items-center {injClassBtn} justify-center{numberHighlight
			? ''
			: theme
			? ' bg-primary/5 dark:bg-dark/10'
			: ' bg-white dark:bg-black'}"
		aria-label="increase"
		disabled={async || value === max}
	>
		<span class={async || value === max ? 'opacity-20' : ''}>
			<Icon name="ri-add-line" theme={theme && (numberHighlight ? false : true)} />
		</span>
	</button>
</div>
