<script>
	import { getContext } from 'svelte';
	/**
	 * 图标名称
	 * Icon name
	 * @type {string}
	 * @default ''
	 */
	export let name = '';

	/**
	 * 图标大小
	 * Icon size
	 * @type {number|string}
	 * @default 24
	 */
	export let size = 24;

	/**
	 * 是否跟随主题色
	 * Whether to follow the theme color
	 * @type {boolean}
	 * @default false
	 */
	export let theme = false;

	/**
	 * 透明度
	 * Opacity
	 * @type {number}
	 * @range 0 - 1
	 * @default 1
	 */
	export let alpha = 1;

	/**
	 * 项目存放 symbol.svg 文件的路径
	 * The path where the symbol.svg file is stored in the project
	 * @type {string}
	 * @default 'fonts/symbol.svg'
	 */
	export let path = getContext('STDF-global-icon-svg-path') || 'fonts/symbol.svg';

	/**
	 * 偏移量
	 * Offset
	 * @type {number}
	 * @default 0
	 */
	export let top = 0;

	/**
	 * 注入 CSS
	 * Inject CSS
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';
</script>

<i class={`cursor-pointer relative ${theme ? 'text-primary dark:text-dark' : ''} ${injClass}`} style="top:{top}px;">
	{#if name === 'slot'}
		<slot><span>无插槽内容！</span></slot>
	{:else}
		<svg width={size} height={size} style="fill: currentColor;fill-opacity: {alpha};display: inline;">
			<use xlink:href="/{path}#{name}" />
		</svg>
	{/if}
</i>
