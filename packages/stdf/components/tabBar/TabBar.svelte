<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon/Icon.svelte';

	/**
	 * 选项卡内容
	 * label of TabBar
	 * @typedef {Object} Label
	 * @property {string} [text] - 选项卡文字  TabBar text
	 * @property {Object} [icon] - 选项卡图标  TabBar icon
	 * @property {Object} [activeIcon] - 选项卡选中时的图标  TabBar icon when selected
	 */

	/**
	 * 选项卡组
	 * label group of TabBar
	 * @type {Label[]}
	 * @default []
	 */
	export let labels = [];

	/**
	 * 当前选中的选项卡索引
	 * index of active label
	 * @type {number}
	 * @range 0 - labels.length - 1
	 * @default 0
	 */
	export let active = 0;

	/**
	 * 底部是否显示线条
	 * whether to show line at the bottom
	 * @type {boolean}
	 * @default false
	 */
	export let line = false;

	/**
	 * 线条占当前Tab宽度的比例
	 * line width ratio of current Tab
	 * @type {number}
	 * @default 4
	 */
	export let lineW = 4;

	/**
	 * 是否开启关爱版
	 * whether to open love version
	 * @type {boolean}
	 * @default false
	 */
	export let love = false;

	/**
	 * TabBar最外层注入CSS
	 * TabBar outermost layer injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let injClass = '';

	/**
	 * Tab注入CSS
	 * Tab injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let tabInjClass = '';

	/**
	 * 选中tab注入CSS
	 * selected tab injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let activeTabInjClass = '';

	/**
	 * 线条注入CSS
	 * line injection CSS
	 * @type {string}
	 * @default ''
	 */
	export let activeInjClass = '';

	const dispatch = createEventDispatcher(); //事件派发器  event dispatcher

	const clickFun = i => {
		active = i;
		//派发TabBar点击事件，active表示点击的Tab索引值，即labels索引值
		//Dispatch TabBar click event, active indicates the index value of the clicked Tab, that is, the index value of labels
		dispatch('change', active);
	};
	let tabW = 0;
	$: activeW = tabW / labels.length / lineW;
	$: activeLeft = active * (tabW / labels.length) + tabW / labels.length / 2 - activeW / 2;
</script>

<div bind:clientWidth={tabW} class={`bg-white dark:bg-gray-800 relative ${injClass}`} style="padding-bottom: env(safe-area-inset-bottom);">
	{#if line}
		<div
			class={`mx-auto rounded-full h-[2px] absolute transition-all bottom-px bg-primary dark:bg-dark ${activeInjClass}`}
			style="width:{lineW < 1 ? tabW / labels.length : activeW < 2 ? 2 : activeW}px;left:{lineW < 1
				? active * (tabW / labels.length)
				: activeLeft}px;"
		/>
	{/if}
	<div class={`flex justify-between`}>
		{#each labels as label, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={() => clickFun(i)}
				class={`flex-1 flex flex-col justify-center text-center py-1 active:opacity-80 cursor-pointer ${
					i === active ? 'text-primary dark:text-dark' : 'text-black/80 dark:text-white/90'
				} ${love ? 'text-lg' : 'text-sm'} ${tabInjClass} ${i === active && activeTabInjClass}`}
			>
				{#if label.icon}
					<div class={`${!label.text && 'py-2'}`}>
						<i class:hidden={i !== active}>
							<Icon
								{...label.icon}
								name={label.activeIcon ? label.activeIcon.name : label.icon.name}
								size={i === active
									? (label.activeIcon && label.activeIcon.size * (love ? 1.2 : 1)) || label.icon.size * (love ? 1.2 : 1)
									: label.icon.size * (love ? 1.2 : 1)}
								top={0}
							/>
						</i>
						<i class:hidden={i === active}>
							<Icon
								{...label.icon}
								name={label.icon.name}
								size={i === active
									? (label.activeIcon && label.activeIcon.size * (love ? 1.2 : 1)) || label.icon.size * (love ? 1.2 : 1)
									: label.icon.size * (love ? 1.2 : 1)}
								top={0}
							/>
						</i>
					</div>
				{/if}
				{#if label.text}
					<div class={`${label.icon ? 'mt-[2px]' : 'py-1 text-lg'} ${i === active && !label.icon ? ' font-bold' : ''}`}>
						{label.text}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
