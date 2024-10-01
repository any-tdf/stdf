<script>
	import Icon from '../icon/Icon.svelte';
	import Loading from '../loading/Loading.svelte';
	/**
	 * 填充模式
	 * Fill mode
	 * @type {'base' | 'line' | 'lineLight' | 'lineTheme' | 'text' | 'textTheme' | 'colorLight'}
	 * @default 'base'
	 */
	export let fill = 'base';

	/**
	 * 状态
	 * State
	 * @type {'theme' | 'success' | 'warning' | 'error' | 'info'}
	 * @default 'theme'
	 */
	export let state = 'theme';

	/**
	 * 圆角风格
	 * Corner style
	 * @type {'none' | 'base' | 'xl' | '2xl' | 'full'}
	 * @default 'base'
	 */
	export let radius = 'base';

	/**
	 * 尺寸
	 * Size
	 * @type {'full' | 'big' | 'md' | 'sm' | 'auto'}
	 * @default 'big'
	 */
	export let size = 'big';

	/**
	 * 边框风格
	 * Border style
	 * @type {'solid' | 'dashed' | 'dotted'}
	 * @default 'solid'
	 */
	export let line = 'solid';

	/**
	 * 注入类
	 * Inject class
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	/**
	 * 是否开启关爱版
	 * Whether to open the care version
	 * @type {boolean}
	 * @default false
	 */
	export let love = false;

	/**
	 * 按钮外部高度
	 * Button outer height
	 * @type {'0' | '1' | '2' | '3' | '4'}
	 * @default '2'
	 */
	export let heightOut = '2';

	/**
	 * 按钮内部高度
	 * Button inner height
	 * @type {'0' | '1' | '2' | '3' | '4'}
	 * @default '3'
	 */
	export let heightIn = '3';

	/**
	 * 是否使用按钮组
	 * Whether to use button group
	 * @type {boolean}
	 * @default false
	 */
	export let group = false;

	/**
	 * 是否禁用
	 * Whether to disable
	 * @type {boolean}
	 * @default false
	 */
	export let disabled = false;

	/**
	 * 是否自定义大小
	 * Whether to customize size
	 * @type {boolean}
	 * @default false
	 */
	export let customSize = false;

	/**
	 * 自定义宽度
	 * Custom width
	 * @type {number}
	 * @default 0
	 */
	export let customWidth = 0;

	/**
	 * 自定义高度
	 * Custom height
	 * @type {number}
	 * @default 0
	 */
	export let customHeight = 0;

	/**
	 * @typedef {Object} iconLoading
	 * @property {string|undefined} type 类型
	 * @property {Object|undefined} params 参数
	 */

	/**
	 * Icon/loading area
	 * @type {iconLoading}
	 * @default {}
	 */
	export let iconLoading = { type: 'icon', params: {} };

	/**
	 * 如果带加载，是否禁用
	 * Whether to disable if loading
	 * @type {boolean}
	 * @default false
	 */
	export let disabledLoading = true;

	const innerDisabled = disabled || (iconLoading.type === 'loading' && disabledLoading);

	// 状态样式
	// State style
	const stateObj = { theme: 'bg-primary dark:bg-dark', success: 'bg-success', warning: 'bg-warning', error: 'bg-error', info: 'bg-info' };

	// 圆角风格样式
	// Corner style style
	const radiusObj = { none: 'rounded-none', base: 'rounded', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' };

	// 填充模式样式
	// Fill mode style
	const fillObj = {
		base: '',
		line: 'border border-black dark:border-white !text-black dark:!text-white',
		lineLight: 'border border-black/20 dark:border-white/30 !text-black dark:!text-white',
		lineTheme: 'border border-primary dark:border-dark !text-primary dark:!text-dark',
		text: '!text-black dark:!text-white',
		textTheme: '!text-primary dark:!text-dark',
		colorLight: '!bg-black/5 dark:!bg-white/10 !text-black dark:!text-white',
	};

	// 尺寸样式
	// Size style
	const sizeObj = { full: 'w-full', big: 'w-full', md: 'w-1/2', sm: 'w-1/4', auto: 'w-auto' };

	// 边框风格样式
	// Border style style
	const lineObj = { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' };

	// 按钮外部高度样式
	// Button outer height style
	const heightOutObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 按钮高度样式
	// Button height style
	const heightInObj = { '0': 'py-0', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4' };

	// 是否块级元素
	// Whether it is a block element
	const block = (size === 'full' || size === 'big') && !customSize;

	// 文字颜色
	// Text color
	const textColor = state === 'theme' ? 'text-white dark:text-black' : 'text-white';
</script>

<div
	class={`${heightOutObj[heightOut] || heightOutObj['2']} ${size === 'big' && !customSize ? 'px-4' : 'px-0'} ${
		block ? 'block' : 'inline'
	} ${love ? 'text-xl' : ''}`}
>
	<button
		on:click
		class={`truncate ${!group && !innerDisabled ? 'active:opacity-80' : ''} ${heightInObj[heightIn] || heightInObj['3']} ${
			sizeObj[size] || sizeObj.big
		} ${textColor} ${lineObj[line] || lineObj.solid} ${radiusObj[radius] || radiusObj.base} ${
			fill === 'base' && (stateObj[state] || stateObj.theme)
		} ${fillObj[fill] || fillObj.base} ${injClass} ${innerDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
		disabled={innerDisabled}
		style={customSize ? `width:${customWidth}px;height:${customHeight}px;padding:0;` : ''}
	>
		{#if iconLoading.type === 'loading'}
			<div class="flex items-center justify-center gap-2">
				<Loading {...iconLoading.params} />
				<slot />
			</div>
		{:else if iconLoading.type === 'icon' && iconLoading.params.name}
			<Icon {...iconLoading.params} />
			<slot />
		{:else}
			<slot />
		{/if}
	</button>
</div>
