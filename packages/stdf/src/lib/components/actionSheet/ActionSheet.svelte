<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Icon from '../icon/Icon.svelte';
	import type { ActionSheetProps, ActionProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const actionSheetLang: LangProps['actionSheet'] = currentLang.actionSheet;

	let {
		visible = $bindable(false),
		title = '',
		titleAlign = 'center',
		actions = [],
		popup = {},
		showCancel = false,
		cancelText = actionSheetLang.cancelText,
		actionClosable = true,
		align = 'center',
		oncancel,
		onclickAction,
		onclose
	}: ActionSheetProps = $props();

	// 静态样式类定义移到组件外部
	// static style class definition moved to component outside
	const STYLE_MAPS = {
		titleAlign: { left: 'text-left', center: 'text-center', right: 'text-right' },
		state: {
			normal: ' ',
			theme: ' text-primary dark:text-dark ',
			success: ' text-success ',
			warning: ' text-warning ',
			error: ' text-error ',
			info: ' text-info '
		},
		imgRadius: {
			none: 'rounded-none',
			xs: 'rounded-xs',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			full: 'rounded-full'
		},
		align: { left: 'justify-start pl-4', center: 'justify-center', right: 'justify-end pr-4' }
	};

	// 优化高度计算函数
	// optimize height calculation function
	const getTransitionDistance = (title: string, showCancel: boolean, actions: ActionProps[]): number => {
		const BASE_HEIGHTS = { title: 40, cancel: 56, action: 56, actionWithDesc: 60, divider: 1 };
		return (
			(title ? BASE_HEIGHTS.title : 0) +
			(showCancel ? BASE_HEIGHTS.cancel : 0) +
			actions.reduce((total: number, item: ActionProps) => total + (item.desc ? BASE_HEIGHTS.actionWithDesc : BASE_HEIGHTS.action), 0) +
			(actions.length - 1) * BASE_HEIGHTS.divider
		);
	};

	// 优化事件处理函数
	// optimize event handling function
	const handleCancel = () => {
		visible = false;
		oncancel?.();
		onclose?.();
	};

	// 处理选项点击事件
	// handle option click event
	const handleActionClick = (index: number, item: ActionProps) => {
		if (item.disabled) return;
		onclickAction?.(index, item);
		if (actionClosable) {
			visible = false;
			onclose?.();
		}
	};
</script>

<Popup bind:visible size={0} transitionDistance={getTransitionDistance(title, showCancel, actions)} {onclose} {...popup}>
	{#if title}
		<div
			class="flex h-10 flex-col justify-center truncate border-b border-black/5 text-xs text-black/50 dark:border-white/5 dark:text-white/50 {STYLE_MAPS
				.titleAlign[titleAlign] || STYLE_MAPS.titleAlign['left']}"
		>
			{title}
		</div>
	{/if}
	<div>
		{#each actions as item, index (index)}
			{@const isDisabled = item.disabled}
			{@const itemState = item.style || 'normal'}
			{@const itemStateClass = STYLE_MAPS.state[itemState] || STYLE_MAPS.state.normal}
			{@const iconState = item.icon?.state || (itemState !== 'normal' ? itemState : undefined)}
			<button
				class="{!isDisabled
					? 'active:scale-90 '
					: 'cursor-not-allowed opacity-40 '}transition-all flex w-full items-center gap-2 {STYLE_MAPS.align[align] || STYLE_MAPS.align['center']}"
				disabled={isDisabled}
				onclick={() => handleActionClick(index, item)}
			>
				{#if item.icon}
					<Icon
						{...item.icon}
						state={iconState}
						injClass={item.icon.injClass || ''}
					/>
				{:else if item.showImg}
					<div class="h-6 w-6 overflow-hidden {(item.imgRadius && STYLE_MAPS.imgRadius[item.imgRadius]) || 'rounded-full'}">
						<img class="h-full w-full object-cover" src={item.imgSrc} alt="" />
					</div>
				{/if}
				<div>
					<div
						class="truncate text-center font-bold {itemStateClass} flex flex-col justify-center {item.desc
							? ' h-10'
							: ' h-14'}"
					>
						{item.content}
					</div>
					{#if item.desc}
						<div class="truncate pb-1 text-center text-xs text-black/50 dark:text-white/40">
							{item.desc}
						</div>
					{/if}
				</div>
			</button>
			{#if index !== actions.length - 1}
				<div class="h-px w-full bg-black/5 dark:bg-white/5"></div>
			{/if}
		{/each}
	</div>
	{#if showCancel}
		<div class="h-2 bg-black/5 dark:bg-white/5"></div>
		<button
			class="flex h-12 w-full items-center transition-all active:scale-90 {STYLE_MAPS.align[align] || STYLE_MAPS.align['center']}"
			onclick={handleCancel}
		>
			<div>
				{cancelText}
			</div>
		</button>
	{/if}
</Popup>
