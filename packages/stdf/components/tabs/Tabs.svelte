<script>
	import { createEventDispatcher } from 'svelte';
	import Tab from './Tab.svelte';

	/**
	 * 选项卡
	 * label
	 * @typedef {Object} Label
	 * @property {string} [text] - 选项卡文字 Label text
	 * @property {Object} [icon] - 选项卡图标 Label icon
	 */

	/**
	 * 选项
	 * tab
	 * @typedef {Object} Tab
	 * @property {Label[]} [labels] - 选项卡组 label group
	 * @property {number} [active] - 当前选中的选项卡索引 index of active tab
	 * @property {boolean} [lineType] - 是否使用线性风格，layout 为 v 时失效 whether to use linear style, invalid when layout is v
	 * @property {'none'|'base'|'xl'|'full'} [radius] - 圆角风格 radius style
	 * @property {'fast'|'base'|'slow'|'slower'} [duration] - 过渡时间 transition time
	 * @property {'0'|'1'|'2'|'3'|'4'|'6'|'8'|'12'|'16'|'20'} [mx] - 左右间距 left and right margin
	 * @property {'h'|'v'} [layout] - 布局，h/v，对应tabs的placement layout,h/v,corresponding to placement of tabs
	 * @property {Boolean} [love] - 是否使用爱心样式 whether to use heart style
	 * @property {String} [injClass] - Tab 最外层注入 CSS 类 Tab outermost injection CSS class
	 * @property {String} [tabInjClass] - Tab 注入 CSS 类 Tab injection CSS class
	 * @property {String} [activeTabInjClass] -  选中 Tab 注入 CSS 类 Selected Tab injection CSS class
	 * @property {String} [activeInjClass] - 指示器注入 CSS 类 Indicator injection CSS class
	 */

	/**
	 * 选项卡组对象
	 * tab object
	 * @type {Tab}
	 * @default {}
	 */
	export let tab = {};

	/**
	 * 过渡时间
	 * transition time
	 * @type {'fast'|'base'|'slow'|'slower'}
	 * @default 'base'
	 */
	export let duration = 'base';

	/**
	 * 选项卡 Tab 位置
	 * placement of tabs
	 * @type {'t'|'b'|'l'|'r'}
	 * @default 't'
	 */
	export let placement = 't';

	/**
	 * 是否使用过渡动画
	 * whether to use transition animation
	 * @type {boolean}
	 * @default true
	 */
	export let transition = true;

	/**
	 * 当前选中的选项卡索引
	 * index of active tab
	 * @type {number}
	 * @range 0 - tab.labels.length - 1
	 * @default 0
	 */
	export let active = 0;

	const dispatch = createEventDispatcher(); //事件派发器

	const clickTabFun = e => {
		active = e.detail;
		dispatch('change', active); //Tab点击时派发Tabs的change事件，active表示激活的Tab索引值，即labels索引值
	};
	let width = 0; //宽度

	const durationObj = {
		fast: 'duration-150',
		base: 'duration-300',
		slow: 'duration-500',
		slower: 'duration-1000',
	};
</script>

{#if transition}
	{#if placement === 't'}
		<Tab {active} {duration} {...tab} on:clicktab={clickTabFun} />
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class={`transition-all relative flex ${durationObj[duration] || durationObj.base}`}
				style="width:{tab.labels.length * width}px;left:-{active * width}px"
			>
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
	{:else if placement === 'b'}
		<div class="overflow-hidden" bind:clientWidth={width}>
			<div
				class={`transition-all relative flex ${durationObj[duration] || durationObj.base}`}
				style="width:{tab.labels.length * width}px;left:-{active * width}px"
			>
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
		<Tab {active} {...tab} on:clicktab={clickTabFun} />
	{:else if placement === 'l'}
		<div class="flex">
			<div>
				<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
			</div>
			<div class="grow">
				<slot {active}>暂无 Tabs content！</slot>
			</div>
		</div>
	{:else if placement === 'r'}
		<div class="flex">
			<div class="grow">
				<slot {active}>暂无 Tabs content！</slot>
			</div>
			<div>
				<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
			</div>
		</div>
	{:else}
		<div>placement 参数错误！</div>
	{/if}
{:else if placement === 't'}
	<Tab {active} {duration} {...tab} on:clicktab={clickTabFun} />
	<slot {active}>暂无 Tabs content！</slot>
{:else if placement === 'b'}
	<slot {active}>暂无 Tabs content！</slot>
	<Tab {active} {...tab} on:clicktab={clickTabFun} />
{:else if placement === 'l'}
	<div class="flex">
		<div>
			<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
		</div>
		<div class="grow">
			<slot {active}>暂无 Tabs content！</slot>
		</div>
	</div>
{:else if placement === 'r'}
	<div class="flex">
		<div class="grow">
			<slot {active}>暂无 Tabs content！</slot>
		</div>
		<div>
			<Tab {active} {...tab} on:clicktab={clickTabFun} layout="v" />
		</div>
	</div>
{:else}
	<div>placement 参数错误！</div>
{/if}
