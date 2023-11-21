<script>
	import { onMount, createEventDispatcher, getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const commonLang = currentLang.common;

	/**
	 * 通告内容组成的数组
	 * Array of notice content
	 * @type {string[]}
	 */
	export let textList = [];

	/**
	 * 左侧内容
	 * Left content
	 * @type {'slot'|'none'|object}
	 * @default { name: 'ri-volume-down-line', size: 20, top: -1 }
	 */
	export let leftIcon = { name: 'ri-volume-down-line', size: 20, top: -1 };

	/**
	 * 右侧内容
	 * Right content
	 * @type {'close'|'arrow'|'none'}
	 * @default 'close'
	 */
	export let rightIcon = 'close';

	/**
	 * 通告字体大小
	 * Notice font size
	 * @type {'xs'|'sm'|'base'|'lg'}
	 * @default 'sm'
	 */
	export let fontSize = 'sm';

	/**
	 * 通告间距，单位是 px
	 * Notice spacing, unit is px
	 * @type {number}
	 * @default 100
	 */
	export let space = 100;

	/**
	 * 横向滚动速度，单位是 px/s
	 * Horizontal scroll speed, unit is px/s
	 * @type {number}
	 * @default 30
	 */
	export let speed = 30;

	/**
	 * 是否垂直滚动
	 * Whether to scroll vertically
	 * @type {boolean}
	 * @default false
	 */
	export let vertical = false;

	/**
	 * 垂直滚动过渡时间，单位是 ms
	 * Vertical scroll transition time, unit is ms
	 * @type {100|300|500|700|1000}
	 * @default 500
	 */
	export let duration = 500;

	/**
	 * 垂直滚动间隔时间，单位是 s
	 * Vertical scroll interval time，unit is s
	 * @type {number}
	 * @default 4
	 */
	export let interval = 4;

	/**
	 * 注入 CSS 名称
	 * Inject CSS name
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	//如果 textList 不是数组给出中英文报错
	if (!Array.isArray(textList)) {
		console.error('[STDF NoticeBar error]textList 必须是数组。(textList must be an array.)');
	}

	//如果 textList 为空数组给出中英文报错
	if (textList.length === 0) {
		console.error('[STDF NoticeBar error]textList 不能为空数组。(textList must not be empty.)');
	}

	// 字体大小样式
	// Font size style
	const fontSizeClass = { xs: ' text-xs', sm: ' text-sm', base: ' text-base', lg: ' text-lg' };

	// 动画时长样式
	// Animation duration style
	const durationClass = {
		'100': ' duration-100',
		'300': ' duration-300',
		'500': ' duration-500',
		'700': ' duration-700',
		'1000': ' duration-1000',
	};

	let left = speed;
	let boxDom = null;
	let outBoxDom = null;
	let boxWidth = 0;
	let outBoxWidth = 0;
	let outBoxHeight = 0;
	let requestAnimationFrameFlag = null;
	let startTime = 0;
	let fps = 0;

	//垂直滚动时的处理
	//Processing when scrolling vertically
	let times = null;
	let currentIndex = 0;
	let textListVertical = [...textList, textList[0]];
	let isTransition = true;
	const stepFun = time => {
		fps = time - startTime;
		startTime = time;
		left -= (speed * fps) / 1000;
		requestAnimationFrameFlag = requestAnimationFrame(stepFun);
		if (left < -boxWidth / 2) {
			left = 0;
		}
	};
	let newTextList = [...textList, ...textList];
	onMount(() => {
		if (!vertical) {
			boxWidth = boxDom.getBoundingClientRect().width;
		}
		outBoxWidth = outBoxDom.getBoundingClientRect().width;
		outBoxHeight = outBoxDom.getBoundingClientRect().height;
		if (!vertical && boxWidth / 2 - space < outBoxWidth) {
			newTextList = textList;
			left = 0;
			return;
		}
		requestAnimationFrameFlag = requestAnimationFrame(stepFun);
		if (vertical) {
			if (textListVertical.length > 1) {
				times = setInterval(() => {
					currentIndex++;
					if (currentIndex === textListVertical.length - 1) {
						setTimeout(() => {
							currentIndex = 0;
							isTransition = false;
						}, duration);
					} else {
						isTransition = true;
					}
				}, interval * 1000);
			}
		}
		return () => {
			if (vertical) {
				clearInterval(times);
			} else {
				cancelAnimationFrame(requestAnimationFrameFlag);
			}
		};
	});
	let isShow = true;
	let isShowClose = true;
	const clickFun = () => {
		if (rightIcon === 'close') {
			isShow = false;
			setTimeout(() => {
				isShowClose = false;
			}, 200);
		}
		dispatch('clickright');
	};
</script>

{#if isShowClose}
	<div
		class={`flex justify-between bg-primary/10 text-primary dark:bg-dark/10 dark:text-dark${
			fontSizeClass[fontSize] || fontSizeClass['sm']
		} p-2${rightIcon === 'none' ? ' pr-2' : ' pr-0'} transition-all duration-300${isShow ? '' : ' scale-0'}${
			injClass === '' ? '' : ` ${injClass}`
		}`}
	>
		<div class={`${leftIcon === 'none' ? '' : 'mr-1'}`}>
			{#if leftIcon === 'slot'}
				<slot>{commonLang.slotEmpty}</slot>
			{:else if leftIcon === 'none'}
				<!--none-->
			{:else}
				<Icon {...leftIcon} />
			{/if}
		</div>
		{#if vertical}
			<div class="grow" bind:this={outBoxDom}>
				<div class="relative overflow-hidden" style={`height:${outBoxHeight}px;`}>
					{#each textListVertical as item, i}
						<div
							class={`absolute truncate${isTransition ? ' transition-all' : ' transition-none'}${
								durationClass[duration] || durationClass['500']
							}`}
							style={`top:${-(currentIndex - i) * outBoxHeight}px;width:${outBoxWidth}px`}
						>
							{item}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="grow overflow-hidden relative" bind:this={outBoxDom}>
				<div class="whitespace-nowrap absolute" style="left:{left}px" bind:this={boxDom}>
					{#each newTextList as item}
						<div class="inline-block" style="margin-right:{space}px">{item}</div>
					{/each}
				</div>
			</div>
		{/if}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class={`${rightIcon === 'none' ? '' : 'pl-2 pr-4'}`} on:click={clickFun}>
			{#if rightIcon === 'close'}
				<Icon name="ri-close-line" size={20} top={-1} />
			{:else if rightIcon === 'arrow'}
				<Icon name="ri-arrow-right-s-line" size={20} top={-1} />
			{/if}
		</div>
	</div>
{/if}
