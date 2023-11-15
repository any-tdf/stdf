<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import Popup from '../popup/Popup.svelte';
	import Loading from '../loading/Loading.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const asyncPickerLang = currentLang.asyncPicker;

	/**
	 * 是否显示
	 * Whether to show
	 * @type {Boolean}
	 * @default false
	 */
	export let visible = false;

	/**
	 * 列数据
	 * Column data
	 * @type {Array<Object>}
	 * @default []
	 */
	export let data = [];

	/**
	 * 是否是最后一级
	 * Whether it is the last level
	 * @type {Boolean}
	 * @default false
	 */
	export let lastLevel = false;

	/**
	 * 是否是第一级
	 * Whether it is the first level
	 * @type {Boolean}
	 * @default true
	 */
	export let firstLevel = true;

	/**
	 * 可见行数
	 * Visible rows
	 * @type {3|5|7}
	 * @default 5
	 */
	export let showRow = 5;

	/**
	 * data 中 label 对应的 key
	 * The key corresponding to label in data
	 * @type {String}
	 * @default 'label'
	 */
	export let labelKey = 'label';

	/**
	 * 对齐方式
	 * Alignment
	 * @type {'left'|'center'|'right'}
	 * @default 'center'
	 */
	export let align = 'center';

	/**
	 * 取消选项文本
	 * Cancel option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultCancel
	 */
	export let cancelText = asyncPickerLang.defaultCancel;

	/**
	 * 确定选项文本
	 * Confirm option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultConfirm
	 */
	export let confirmText = asyncPickerLang.defaultConfirm;

	/**
	 * 中间选项文本
	 * Middle option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultTitle
	 */
	export let title = asyncPickerLang.defaultTitle;

	/**
	 * 下一步选项文本
	 * Next option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultNext
	 */
	export let nextText = asyncPickerLang.defaultNext;

	/**
	 * 上一步选项文本
	 * Previous option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultPrev
	 */
	export let prevText = asyncPickerLang.defaultPrev;

	/**
	 * 是否显示已选选项
	 * Whether to show selected options
	 * @type {Boolean}
	 * @default false
	 */
	export let showSelected = false;

	/**
	 * 已选选项文本
	 * Selected option text
	 * @type {String}
	 * @default Current language asyncPicker.defaultSelected
	 */
	export let selectedText = asyncPickerLang.defaultSelected;

	/**
	 * 弹出层参数
	 * Popup parameters
	 * @type {Object}
	 */
	export let popup = {};

	/**
	 * 加载数据时的loading参数
	 * Loading parameters when loading data
	 * @type {Object}
	 */
	export let loading = {};

	// 用于存储当前选定的所有项和索引
	// Used to store all selected items and indexes
	let items = [];
	let indexs = [];

	// 当前选中项索引
	// Current selected item index
	let currentIndex = 0;

	// 点击左侧按钮
	// Click left button
	const clickLeftFunc = () => {
		if (firstLevel) {
			visible = false;
			dispatch('cancel');
		} else {
			items = items.slice(0, items.length - 1);
			indexs.pop();
			data = [];
			setTimeout(() => {
				dispatch('prev');
				currentIndex = 0;
			});
		}
	};

	// 点击右侧按钮，如果是最后一列，则触发 confirm 事件，否则触发 next 事件
	// Click the right button, if it is the last column, trigger the confirm event, otherwise trigger the next event
	const clickRightFunc = () => {
		if (lastLevel) {
			items.push(data[currentIndex]);
			indexs.push(currentIndex);
			data = [];
			visible = false;
			currentIndex = 0;
			dispatch('confirm', { items, indexs });
		} else {
			items = [...items, data[currentIndex]];
			indexs.push(currentIndex);
			indexs = indexs;
			data = [];
			setTimeout(() => {
				dispatch('next', { index: currentIndex });
				currentIndex = 0;
			});
		}
	};

	// 滚动结束
	// Scroll end
	const scrollEndFunc = e => {
		currentIndex = e.detail.index;
	};
	$: isLoading = data.length === 0;
	$: {
		if (visible) {
			dispatch('open');
		} else {
			currentIndex = 0;
			items = [];
			indexs = [];
			dispatch('close');
		}
	}
</script>

<Popup
	bind:visible
	size={0}
	maskClosable
	transitionDistance={(showRow === 3 ? 64 : showRow === 5 ? 48 : 32) * showRow + 41 + (showSelected ? 32 : 0)}
	{...popup}
>
	<div class="flex justify-between items-center bg-white dark:bg-black border-b border-black/10 dark:border-white/20">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="text-black/60 dark:text-white/60 h-10 leading-10 px-4 cursor-pointer"
			on:click={() => {
				!isLoading && clickLeftFunc();
			}}
		>
			{#if isLoading}
				<div class="p-3">
					<Loading width="4" height="4" customColor={['#666']} />
				</div>
			{:else}
				{firstLevel ? cancelText : prevText}
			{/if}
		</div>
		<div>{title}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="text-primary dark:text-dark h-10 leading-10 px-4 cursor-pointer"
			on:click={() => {
				!isLoading && clickRightFunc();
			}}
		>
			{#if isLoading}
				<div class="p-3">
					<Loading width="4" height="4" theme />
				</div>
			{:else}
				{lastLevel ? confirmText : nextText}
			{/if}
		</div>
	</div>
	{#if showSelected}
		<div class="flex gap-3 w-full overflow-x-hidden px-4 bg-white dark:bg-black">
			<div class="text-center text-black/60 dark:text-white/60 flex-none h-8 leading-8 text-sm">{selectedText}</div>
			{#each items as item}
				{#if !isLoading}
					<div
						in:fly|global={{ x: document.documentElement.clientWidth, duration: 500 }}
						out:fly|global={{ x: document.documentElement.clientWidth, duration: 300 }}
						class="flex-1 text-center h-8 leading-8 text-sm truncate px-1"
					>
						{item[labelKey]}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	<div class="bg-white dark:bg-black">
		<div class="truncate">
			{#if isLoading}
				<div class="flex justify-center items-center" style="height:{(showRow === 3 ? 64 : showRow === 5 ? 48 : 32) * showRow}px">
					<Loading width="28" height="8" type="1_16" theme {...loading} />
				</div>
			{:else}
				<div>
					<ScrollRadio {data} {showRow} {labelKey} {align} autoScrollToLast={false} on:scrollEnd={scrollEndFunc} />
				</div>
			{/if}
		</div>
	</div>
</Popup>
