<script lang="ts">
	import { getContext, onMount, onDestroy, tick } from 'svelte';
	import { scale, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Icon from '../icon/Icon.svelte';
	import type { ActionPopoverProps, ActionProps, RingActionProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const actionPopoverLang: LangProps['actionSheet'] = currentLang.actionSheet;

	let {
		visible = $bindable(false),
		title = '',
		titleAlign = 'center',
		actions = [],
		showCancel = false,
		cancelText = actionPopoverLang.cancelText,
		actionClosable = true,
		align = 'center',
		inverse = false,
		layout = 'v',
		gridColumns = 3,
		// inline 模式相关属性
		// inline mode related props
		triggerRef = null,
		inlineAlign = 'center',
		inlineDirection = 'auto',
		inlineOffset = 8,
		inlineShadow = 'md',
		inlineRadius = '',
		// 环形布局相关属性
		// ring layout related props
		ringActions = [],
		ringRadius = 0,
		ringItemSize = 44,
		ringShape = 'auto',
		oncancel,
		onclickAction,
		onclose
	}: ActionPopoverProps = $props();

	// inline 模式面板引用
	// inline mode panel reference
	let panelRef = $state<HTMLElement | null>(null);

	// 位置是否已计算完成
	// whether position has been calculated
	let positionReady = $state(false);

	// inline 模式位置状态
	// inline mode position state
	let inlinePosition = $state({ top: 0, left: 0 });
	let actualDirection = $state<'up' | 'down'>('down');

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
		align: { left: 'justify-start pl-4', center: 'justify-center', right: 'justify-end pr-4' },
		shadow: {
			none: 'shadow-none',
			xs: 'shadow-xs dark:shadow-white/5',
			sm: 'shadow-sm dark:shadow-white/5',
			md: 'shadow-md dark:shadow-white/10',
			lg: 'shadow-lg dark:shadow-white/10',
			xl: 'shadow-xl dark:shadow-white/10',
			'2xl': 'shadow-2xl dark:shadow-white/20'
		},
		radius: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			'3xl': 'rounded-3xl',
			'4xl': 'rounded-4xl'
		},
		gridColumns: {
			2: 'grid-cols-2',
			3: 'grid-cols-3',
			4: 'grid-cols-4'
		}
	};

	// 反转色样式。
	// Tailwind safelist: bg-bg-surface-dark dark:bg-bg-surface border-white/10 dark:border-black/5 text-text-dark dark:text-text-primary text-text-dark/60 dark:text-text-primary/60 bg-white/10 dark:bg-black/10 divide-white/10 dark:divide-black/10 active:bg-text-dark/10 dark:active:bg-text-primary/10
	const inversePanelClass = $derived(
		inverse
			? 'bg-bg-surface-dark dark:bg-bg-surface border-white/10 dark:border-black/5 text-text-dark dark:text-text-primary'
			: 'bg-bg-surface dark:bg-bg-surface-dark border-black/5 dark:border-white/10'
	);
	const inverseTitleClass = $derived(
		inverse ? 'text-text-dark/60 dark:text-text-primary/60 border-white/10 dark:border-black/5' : 'text-black/50 dark:text-white/50 border-black/5 dark:border-white/5'
	);
	const inverseDescClass = $derived(inverse ? 'text-text-dark/60 dark:text-text-primary/60' : 'text-black/50 dark:text-white/40');
	const inverseDividerClass = $derived(inverse ? 'bg-white/10 dark:bg-black/10' : 'bg-black/5 dark:bg-white/5');
	const inverseDivideClass = $derived(inverse ? 'divide-white/10 dark:divide-black/10' : 'divide-black/5 dark:divide-white/5');
	const inverseActiveClass = $derived(inverse ? 'active:bg-text-dark/10 dark:active:bg-text-primary/10' : 'active:bg-black/5 dark:active:bg-white/5');
	const inverseItemBgClass = $derived(inverse ? 'bg-bg-surface-dark dark:bg-bg-surface' : 'bg-bg-surface dark:bg-bg-surface-dark');

	const actionContainerClass = $derived(
		layout === 'grid'
			? `grid ${STYLE_MAPS.gridColumns[gridColumns] || STYLE_MAPS.gridColumns[3]} gap-px ${inverseDividerClass}`
			: layout === 'h'
				? `flex items-stretch divide-x ${inverseDivideClass}`
				: ''
	);

	const actionLayoutClass = $derived(layout === 'grid' ? `w-full ${inverseItemBgClass}` : layout === 'h' ? 'flex-1' : '');

	// 环形布局相关计算
	// ring layout related calculations
	let ringPosition = $state({ x: 0, y: 0 });
	let computedRingShape = $state<'full' | 'half' | 'quarter'>('quarter');
	let ringStartAngle = $state(0);

	// 根据触发元素位置和操作项数量自动计算环形形状和起始角度
	// auto calculate ring shape and start angle based on trigger position and action count
	const calculateRingLayout = () => {
		if (!triggerRef || layout !== 'ring') return;

		const triggerRect = triggerRef.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// 触发元素中心点
		// trigger element center point
		const triggerCenterX = triggerRect.left + triggerRect.width / 2;
		const triggerCenterY = triggerRect.top + triggerRect.height / 2;

		// 判断触发元素在视口的位置（左/右、上/下）
		// determine trigger position in viewport (left/right, top/bottom)
		const isLeft = triggerCenterX < viewportWidth / 2;
		const isTop = triggerCenterY < viewportHeight / 2;

		// 设置环形中心位置（相对于触发元素）
		// set ring center position (relative to trigger element)
		ringPosition = {
			x: triggerCenterX,
			y: triggerCenterY
		};

		const itemCount = ringActions.length;

		// 根据 ringShape 属性或自动判断形状
		// determine shape based on ringShape prop or auto
		if (ringShape !== 'auto') {
			computedRingShape = ringShape;
		} else {
			// 自动判断：根据操作项数量
			// auto: based on action count
			if (itemCount <= 3) {
				computedRingShape = 'quarter';
			} else if (itemCount <= 5) {
				computedRingShape = 'half';
			} else {
				computedRingShape = 'full';
			}
		}

		// 根据位置计算起始角度
		// calculate start angle based on position
		if (computedRingShape === 'quarter') {
			// 1/4 圆：根据四个角落确定起始角度
			// quarter: determine start angle based on corner
			if (isTop && isLeft) {
				ringStartAngle = 0; // 右下方向展开
			} else if (isTop && !isLeft) {
				ringStartAngle = 90; // 左下方向展开
			} else if (!isTop && !isLeft) {
				ringStartAngle = 180; // 左上方向展开
			} else {
				ringStartAngle = 270; // 右上方向展开
			}
		} else if (computedRingShape === 'half') {
			// 半圆：根据上下位置确定起始角度
			// half: determine start angle based on top/bottom
			if (isTop) {
				ringStartAngle = 0; // 向下展开
			} else {
				ringStartAngle = 180; // 向上展开
			}
		} else {
			// 全圆：从右侧开始
			// full: start from right
			ringStartAngle = 0;
		}
	};

	// 计算每个操作项的位置
	// calculate position for each action item
	const getRingItemPosition = (index: number) => {
		const itemCount = ringActions.length;
		const radius = ringRadius || Math.max(60, ringItemSize * 1.5);

		let angleSpan: number;
		let startAngle: number;

		if (computedRingShape === 'quarter') {
			angleSpan = 90;
			startAngle = ringStartAngle;
		} else if (computedRingShape === 'half') {
			angleSpan = 180;
			startAngle = ringStartAngle;
		} else {
			angleSpan = 360;
			startAngle = ringStartAngle;
		}

		// 计算每个项的角度
		// calculate angle for each item
		const angleStep = itemCount > 1 ? angleSpan / (itemCount - 1 + (computedRingShape === 'full' ? 1 : 0)) : 0;
		const angle = startAngle + index * angleStep;
		const radian = (angle * Math.PI) / 180;

		return {
			x: Math.cos(radian) * radius,
			y: Math.sin(radian) * radius
		};
	};

	// 计算 inline 模式位置
	// calculate inline mode position
	const calculateInlinePosition = () => {
		if (!triggerRef || !panelRef) return;

		const triggerRect = triggerRef.getBoundingClientRect();
		const panelRect = panelRef.getBoundingClientRect();
		const panelWidth = panelRef.offsetWidth || panelRect.width;
		const panelHeight = panelRef.offsetHeight || panelRect.height;
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;

		// 计算垂直方向
		// calculate vertical direction
		if (inlineDirection === 'auto') {
			const triggerCenter = triggerRect.top + triggerRect.height / 2;
			const viewportCenter = viewportHeight / 2;
			actualDirection = triggerCenter > viewportCenter ? 'up' : 'down';
		} else {
			actualDirection = inlineDirection as 'up' | 'down';
		}

		// 计算 top 位置
		// calculate top position
		let top: number;
		if (actualDirection === 'down') {
			top = triggerRect.bottom + inlineOffset;
			// 边界检测：如果超出底部，则向上弹出
			// boundary detection: if exceeds bottom, pop up
			if (top + panelHeight > viewportHeight - 8) {
				actualDirection = 'up';
				top = triggerRect.top - panelHeight;
			}
		} else {
			top = triggerRect.top - panelHeight;
			// 边界检测：如果超出顶部，则向下弹出
			// boundary detection: if exceeds top, pop down
			if (top < 8) {
				actualDirection = 'down';
				top = triggerRect.bottom + inlineOffset;
			}
		}

		// 计算水平位置
		// calculate horizontal position
		let left: number;
		if (inlineAlign === 'left') {
			left = triggerRect.left;
		} else if (inlineAlign === 'right') {
			left = triggerRect.right - panelWidth;
		} else {
			// center
			left = triggerRect.left + (triggerRect.width - panelWidth) / 2;
		}

		// 水平边界约束
		// horizontal boundary constraint
		left = Math.max(8, Math.min(left, viewportWidth - panelWidth - 8));

		inlinePosition = { top, left };
	};

	// 计算 transform-origin
	// calculate transform-origin
	const transformOrigin = $derived(() => {
		const vertical = actualDirection === 'down' ? 'top' : 'bottom';
		return `${vertical} ${inlineAlign}`;
	});

	// 点击外部关闭
	// click outside to close
	const handleClickOutside = (event: MouseEvent) => {
		if (!visible) return;
		const target = event.target as Node;
		if (panelRef && !panelRef.contains(target) && triggerRef && !triggerRef.contains(target)) {
			visible = false;
			onclose?.();
		}
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

	// 处理环形操作项点击事件
	// handle ring action click event
	const handleRingActionClick = (index: number, item: RingActionProps) => {
		if (item.disabled) return;
		onclickAction?.(index, item);
		if (actionClosable) {
			visible = false;
			onclose?.();
		}
	};

	// 监听 visible 变化，更新位置
	// watch visible change, update position
	$effect(() => {
		if (visible && triggerRef) {
			positionReady = false;
			// 使用 tick 确保 DOM 已完全更新
			// use tick to ensure DOM has been fully updated
			tick().then(() => {
				requestAnimationFrame(() => {
					if (layout === 'ring') {
						calculateRingLayout();
					} else {
						calculateInlinePosition();
					}
					positionReady = true;
				});
			});
		} else if (!visible) {
			positionReady = false;
		}
	});

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

{#if visible}
	{#if layout === 'ring'}
		<!-- 环形布局 Ring layout -->
		{#if positionReady}
			<div
				bind:this={panelRef}
				class="fixed z-50"
				style="top: {ringPosition.y}px; left: {ringPosition.x}px; transform: translate(-50%, -50%);"
			>
				{#each ringActions as item, index (index)}
					{@const pos = getRingItemPosition(index)}
					{@const isDisabled = item.disabled}
					{@const itemState = item.style || 'normal'}
					{@const iconState = item.icon?.state || (itemState !== 'normal' ? itemState : undefined)}
					<button
						class="absolute flex items-center justify-center rounded-full border transition-all {inversePanelClass} {STYLE_MAPS.shadow[inlineShadow] || STYLE_MAPS.shadow['md']} {!isDisabled ? inverseActiveClass : 'cursor-not-allowed opacity-40'}"
						style="width: {ringItemSize}px; height: {ringItemSize}px; left: {pos.x}px; top: {pos.y}px; transform: translate(-50%, -50%);"
						disabled={isDisabled}
						onclick={() => handleRingActionClick(index, item)}
						in:fly|global={{ duration: 250, x: -pos.x, y: -pos.y, opacity: 0, easing: cubicOut }}
						out:fly|global={{ duration: 150, x: -pos.x, y: -pos.y, opacity: 0, easing: cubicOut }}
					>
						<Icon
							{...item.icon}
							state={iconState}
							injClass={item.icon.injClass || ''}
						/>
					</button>
				{/each}
			</div>
		{/if}
	{:else}
		<!-- 普通布局 Normal layout -->
		<div
			bind:this={panelRef}
			class="fixed z-50 inline-block overflow-hidden border {inversePanelClass} {inlineRadius
				? STYLE_MAPS.radius[inlineRadius] || 'rounded-(--radius-box)'
				: 'rounded-(--radius-box)'} {STYLE_MAPS.shadow[inlineShadow] || STYLE_MAPS.shadow['md']}"
			style="top: {inlinePosition.top}px; left: {inlinePosition.left}px; transform-origin: {transformOrigin()}; {positionReady ? '' : 'visibility: hidden;'}"
			in:scale|global={{ duration: 200, start: 0.5, opacity: 0, easing: cubicOut }}
			out:scale|global={{ duration: 150, start: 0.5, opacity: 0, easing: cubicOut }}
		>
			{#if title}
				<div
					class="flex h-10 flex-col justify-center whitespace-nowrap border-b px-4 text-xs {inverseTitleClass} {STYLE_MAPS
						.titleAlign[titleAlign] || STYLE_MAPS.titleAlign['left']}"
				>
					{title}
				</div>
			{/if}
			<div class="{actionContainerClass}">
				{#each actions as item, index (index)}
					{@const isDisabled = item.disabled}
					{@const itemState = item.style || 'normal'}
					{@const itemStateClass = STYLE_MAPS.state[itemState] || STYLE_MAPS.state.normal}
					{@const iconState = item.icon?.state || (itemState !== 'normal' ? itemState : undefined)}
					<button
						class="{!isDisabled ? `${inverseActiveClass} ` : 'cursor-not-allowed opacity-40 '}transition-all flex items-center gap-2 whitespace-nowrap px-4 {STYLE_MAPS
							.align[align] || STYLE_MAPS.align['center']} {actionLayoutClass}"
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
						<div class="{itemStateClass} flex flex-col justify-center {item.desc ? ' h-10' : ' h-12'}">
							{item.content}
							{#if item.desc}
								<div class="text-xs {inverseDescClass}">
									{item.desc}
								</div>
							{/if}
						</div>
					</button>
					{#if layout === 'v' && index !== actions.length - 1}
						<div class="mx-2 h-px {inverseDividerClass}"></div>
					{/if}
				{/each}
			</div>
			{#if showCancel}
				<div class="h-px {inverseDividerClass}"></div>
				<button
					class="flex h-12 items-center whitespace-nowrap px-4 transition-all {inverseActiveClass} {STYLE_MAPS.align[align] ||
						STYLE_MAPS.align['center']}"
					onclick={handleCancel}
				>
					{cancelText}
				</button>
			{/if}
		</div>
	{/if}
{/if}
