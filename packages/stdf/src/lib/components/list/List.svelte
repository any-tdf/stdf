<script lang="ts" generics="T extends Record<string, unknown>">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import { radiusObj } from '../utils/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { ListProps, SwipeActionProps } from '../../types/index.js';

	// 当前语言
	// Current language
	const currentLang: LangProps = getContext('STDF_lang') || zh_CN;
	const listLang = (currentLang.list || zh_CN.list) as NonNullable<LangProps['list']>;

	let {
		data = [],
		keyField = 'id',
		gap = '0',
		mx = '0',
		my = '0',
		itemPx = '0',
		itemPy = '0',
		transition: listTransition = 'slideRight',
		transitionDelay = 50,
		batchMode = $bindable(false),
		batchSelected = $bindable([]),
		batchSelectable = false,
		batchActions = [],
		injClass = '',
		itemInjClass = '',
		arrow = false,
		divider = true,
		itemRadius = '',
		// 滑动操作相关
		// Swipe action related
		swipeActions = [],
		swipeHint = 'first',
		swipeThreshold = 30,
		// Snippets
		itemChild,
		headerChild,
		footerChild,
		// Events
		onbatchChange,
		onclickItem,
		onswipeAction
	}: ListProps<T> = $props();

	// 滑动操作状态
	// Swipe action state
	let swipeStartX = 0;
	let swipeStartY = 0;
	let swipeMovedDistance = 0;
	let swipeMovedKey: string | number | null = null;
	let swipeClickBlockKey: string | number | null = null;
	let swipeOffsets: Record<string | number, number> = $state({});
	let activeSwipeKey: string | number | null = $state(null);
	let isSwiping = false; // 是否正在滑动 Whether swiping

	// 计算滑动操作项的限制（最多 4 项）
	// Compute limited swipe actions (max 4)
	const limitedSwipeActions = $derived(swipeActions.slice(0, 4));

	// 是否有滑动操作
	// Whether has swipe actions
	const hasSwipeActions = $derived(limitedSwipeActions.length > 0);

	// 滑动操作按钮总宽度
	// Swipe action buttons total width
	const swipeActionWidth = $derived(limitedSwipeActions.length * 64);

	// 批量选择图标宽度
	// Batch selection icon width
	const batchSelectWidth = 40;

	// 间距样式映射
	// Gap style mapping
	const gapClass: Record<string, string> = {
		'0': 'gap-0',
		'1': 'gap-1',
		'2': 'gap-2',
		'3': 'gap-3',
		'4': 'gap-4',
		'6': 'gap-6',
		'8': 'gap-8'
	};

	const mxClass: Record<string, string> = {
		'0': 'mx-0',
		'1': 'mx-1',
		'2': 'mx-2',
		'3': 'mx-3',
		'4': 'mx-4',
		'6': 'mx-6',
		'8': 'mx-8'
	};

	const myClass: Record<string, string> = {
		'0': 'my-0',
		'1': 'my-1',
		'2': 'my-2',
		'3': 'my-3',
		'4': 'my-4',
		'6': 'my-6',
		'8': 'my-8'
	};

	const itemPxClass: Record<string, string> = {
		'0': 'px-0',
		'1': 'px-1',
		'2': 'px-2',
		'3': 'px-3',
		'4': 'px-4',
		'6': 'px-6',
		'8': 'px-8'
	};

	const itemPyClass: Record<string, string> = {
		'0': 'py-0',
		'1': 'py-1',
		'2': 'py-2',
		'3': 'py-3',
		'4': 'py-4',
		'6': 'py-6',
		'8': 'py-8'
	};

	// 背景色映射
	// Background color mapping
	const bgColorClass: Record<string, string> = {
		theme: 'bg-primary dark:bg-dark',
		success: 'bg-success',
		warning: 'bg-warning',
		error: 'bg-error',
		info: 'bg-info'
	};

	// 文字颜色映射
	// Text color mapping
	const textColorClass: Record<string, string> = {
		theme: 'text-primary dark:text-dark',
		success: 'text-success',
		warning: 'text-warning',
		error: 'text-error',
		info: 'text-info'
	};

	const itemRadiusClass = $derived(itemRadius ? radiusObj[itemRadius] : '');
	const swipeActionRadiusClass = $derived(itemRadius ? `${radiusObj[itemRadius]} rounded-l-none` : '');

	// 获取项目的 key
	// Get item key
	const getItemKey = (item: T, index: number): string | number => {
		if (keyField && item[keyField] !== undefined) {
			return item[keyField] as string | number;
		}
		return index;
	};

	type ListRenderItem = {
		key: string | number;
		item: T;
		leaving: boolean;
		leaveTimer?: ReturnType<typeof setTimeout>;
	};

	let renderItems = $state<ListRenderItem[]>([]);
	const listTransitionDuration = 300;

	$effect(() => {
		const currentItems = renderItems;
		const currentMap = new Map(currentItems.map((item) => [item.key, item]));
		const nextItems: ListRenderItem[] = data.map((item, index) => {
			const key = getItemKey(item, index);
			const existing = currentMap.get(key);
			if (existing) {
				existing.item = item;
				if (existing.leaving) {
					existing.leaving = false;
					if (existing.leaveTimer) {
						clearTimeout(existing.leaveTimer);
						existing.leaveTimer = undefined;
					}
				}
				return existing;
			}
			return { key, item, leaving: false };
		});
		const nextKeySet = new Set(nextItems.map((item) => item.key));
		const merged: ListRenderItem[] = [];
		let nextIndex = 0;

		for (const currentItem of currentItems) {
			if (nextKeySet.has(currentItem.key)) {
				while (nextIndex < nextItems.length && nextItems[nextIndex].key !== currentItem.key) {
					merged.push(nextItems[nextIndex]);
					nextIndex += 1;
				}
				if (nextIndex < nextItems.length) {
					merged.push(nextItems[nextIndex]);
					nextIndex += 1;
				}
			} else if (listTransition) {
				if (!currentItem.leaving) {
					currentItem.leaving = true;
					const leavingKey = currentItem.key;
					if (currentItem.leaveTimer) {
						clearTimeout(currentItem.leaveTimer);
					}
					currentItem.leaveTimer = setTimeout(() => {
						renderItems = renderItems.filter((item) => item.key !== leavingKey);
					}, listTransitionDuration);
				}
				merged.push(currentItem);
			}
		}

		while (nextIndex < nextItems.length) {
			merged.push(nextItems[nextIndex]);
			nextIndex += 1;
		}

		const isSame = merged.length === currentItems.length && merged.every((item, index) => item === currentItems[index]);
		if (!isSame) {
			renderItems = merged;
		}
	});

	// 滑动操作指针事件
	// Swipe action pointer events
	const handleSwipeStart = (e: PointerEvent, itemKey: string | number) => {
		if (!hasSwipeActions || batchMode) return;
		isSwiping = true;
		swipeMovedDistance = 0;
		swipeMovedKey = null;
		swipeStartX = e.clientX;
		swipeStartY = e.clientY;
		// 捕获指针以确保持续接收事件
		// Capture pointer to ensure continuous event receiving
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		// 如果有其他项打开，先关闭
		if (activeSwipeKey !== null && activeSwipeKey !== itemKey) {
			closeSwipe(activeSwipeKey);
		}
	};

	const handleSwipeMove = (e: PointerEvent, itemKey: string | number) => {
		if (!hasSwipeActions || batchMode || !isSwiping) return;
		const currentX = e.clientX;
		const currentY = e.clientY;
		const diffX = currentX - swipeStartX;
		const diffY = currentY - swipeStartY;

		// 如果垂直滑动大于水平滑动，不处理
		if (Math.abs(diffY) > Math.abs(diffX)) return;

		const currentOffset = swipeOffsets[itemKey] || 0;
		let newOffset = currentOffset + diffX;

		// 限制滑动范围
		newOffset = Math.max(-swipeActionWidth, Math.min(0, newOffset));

		swipeMovedDistance += Math.abs(diffX);
		if (swipeMovedDistance > 4) {
			swipeMovedKey = itemKey;
		}

		swipeOffsets = { ...swipeOffsets, [itemKey]: newOffset };
		swipeStartX = currentX;
	};

	const handleSwipeEnd = (e: PointerEvent, itemKey: string | number) => {
		if (!hasSwipeActions || batchMode || !isSwiping) return;
		isSwiping = false;
		// 释放指针捕获
		// Release pointer capture
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);
		const offset = swipeOffsets[itemKey] || 0;

		// 根据滑动距离决定是否打开或关闭
		if (Math.abs(offset) > swipeThreshold) {
			// 打开滑动操作
			swipeOffsets = { ...swipeOffsets, [itemKey]: -swipeActionWidth };
			activeSwipeKey = itemKey;
		} else {
			// 关闭滑动操作
			closeSwipe(itemKey);
		}

		if (swipeMovedKey === itemKey) {
			swipeClickBlockKey = itemKey;
			setTimeout(() => {
				if (swipeClickBlockKey === itemKey) {
					swipeClickBlockKey = null;
				}
			}, 0);
		}
		swipeMovedKey = null;
	};

	const closeSwipe = (itemKey: string | number) => {
		swipeOffsets = { ...swipeOffsets, [itemKey]: 0 };
		if (activeSwipeKey === itemKey) {
			activeSwipeKey = null;
		}
	};

	// 点击滑动操作按钮
	// Click swipe action button
	const handleSwipeActionClick = (actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number, itemKey: string | number) => {
		// 先关闭滑动
		closeSwipe(itemKey);
		// 触发操作的 onclick
		action.onclick?.();
		// 触发组件的 onswipeAction
		onswipeAction?.(actionIndex, action, item, itemIndex);
	};

	// 批量选择处理
	// Batch selection handling
	const handleBatchSelect = (item: T, index: number) => {
		const key = getItemKey(item, index);
		if (batchSelected.includes(key)) {
			batchSelected = batchSelected.filter((k) => k !== key);
		} else {
			batchSelected = [...batchSelected, key];
		}
		onbatchChange?.(batchSelected);
	};

	// 全选
	// Select all
	const handleSelectAll = () => {
		if (batchSelected.length === data.length) {
			batchSelected = [];
		} else {
			batchSelected = data.map((item, index) => getItemKey(item, index));
		}
		onbatchChange?.(batchSelected);
	};

	// 切换批量模式
	// Toggle batch mode
	const toggleBatchMode = () => {
		batchMode = !batchMode;
		if (!batchMode) {
			batchSelected = [];
			onbatchChange?.(batchSelected);
		}
	};

	// 点击列表项
	// Click list item
	const handleItemClick = (item: T, index: number, itemKey: string | number) => {
		if (swipeClickBlockKey === itemKey) return;
		// 如果有滑动打开，先关闭
		if (activeSwipeKey !== null) {
			closeSwipe(activeSwipeKey);
			return;
		}
		// 如果批量模式，触发选择
		if (batchMode) {
			handleBatchSelect(item, index);
			return;
		}
		// 触发点击事件
		if (onclickItem) {
			onclickItem(item, index);
		}
	};

</script>

{#snippet swipeHintIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3">
		<path d="M10.071 4.92896L11.4852 6.34317L6.82834 11L16.0002 11.0002L16.0002 13.0002L6.82839 13L11.4852 17.6569L10.071 19.0711L2.99994 12L10.071 4.92896ZM18.0001 19V4.99997H20.0001V19H18.0001Z"></path>
	</svg>
{/snippet}

{#snippet batchUncheckedIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-gray-400 dark:text-gray-500">
		<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
	</svg>
{/snippet}

{#snippet batchCheckedIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-primary dark:text-dark">
		<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>
	</svg>
{/snippet}

{#snippet listItem(item: T, index: number, itemKey: string | number)}
	{@const swipeOffset = swipeOffsets[itemKey] || 0}
	{@const batchOffset = batchMode ? batchSelectWidth : 0}
	{@const isSwipeActive = swipeOffset !== 0}

	<div class="relative {hasSwipeActions ? 'overflow-x-clip' : ''}">
		<!-- 批量选择图标层 -->
		<!-- Batch selection icon layer -->
		{#if batchMode}
			<button
				class="absolute inset-y-0 left-0 flex items-center justify-center bg-bg-surface dark:bg-bg-surface-dark"
				style="width: {batchSelectWidth}px"
				onclick={() => handleBatchSelect(item, index)}
			>
				{#if batchSelected.includes(itemKey)}
					{@render batchCheckedIcon()}
				{:else}
					{@render batchUncheckedIcon()}
				{/if}
			</button>
		{/if}

		<!-- 滑动操作按钮层 -->
		<!-- Swipe action buttons layer -->
		{#if hasSwipeActions && !batchMode}
			<div class="absolute inset-y-0 right-0 flex overflow-hidden {swipeActionRadiusClass} {isSwipeActive ? '' : 'opacity-0 pointer-events-none'}">
				{#each limitedSwipeActions as action, actionIndex (actionIndex)}
					{@const actionColor = action.bgColor === 'primary' ? 'theme' : action.bgColor || 'theme'}
					<button
						class="flex h-full w-16 flex-col items-center justify-center {bgColorClass[actionColor]} {actionColor === 'theme' ? 'text-text-on-primary dark:text-text-on-dark' : 'text-white'}"
						onclick={() => handleSwipeActionClick(actionIndex, action, item, index, itemKey)}
					>
						{#if action.icon}
							<Icon name={action.icon} size={20} />
						{/if}
						{#if action.text}
							<span class="mt-1 text-xs">{action.text}</span>
						{/if}
					</button>
				{/each}
			</div>
		{/if}

		<!-- 列表项内容层 -->
		<!-- List item content layer -->
		<div
			class="relative transition-transform duration-200 touch-none"
			style="transform: translateX({swipeOffset + batchOffset}px)"
			onpointerdown={(e) => handleSwipeStart(e, itemKey)}
			onpointermove={(e) => handleSwipeMove(e, itemKey)}
			onpointerup={(e) => handleSwipeEnd(e, itemKey)}
			onpointercancel={(e) => handleSwipeEnd(e, itemKey)}
		>
			<button
				class="flex w-full items-start gap-2 text-left {itemPxClass[itemPx] || 'px-0'} {itemPyClass[itemPy] || 'py-0'} {itemRadiusClass} {itemInjClass}"
				onclick={() => handleItemClick(item, index, itemKey)}
				disabled={!onclickItem && !batchMode}
			>
				<div class="min-w-0 flex-1">
					{@render itemChild(item, index)}
				</div>
				{#if arrow && !batchMode}
					<div class="shrink-0 self-center text-gray-400 dark:text-gray-500">
						<Icon name="ri-arrow-right-s-line" size={20} />
					</div>
				{/if}
			</button>
			{#if hasSwipeActions && !batchMode && (swipeHint === 'all' || (swipeHint === 'first' && index === 0))}
				<div class="absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600">
					{@render swipeHintIcon()}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<div class="relative {mxClass[mx] || 'mx-0'} {myClass[my] || 'my-0'} {injClass}">
	<!-- 批量操作栏 -->
	<!-- Batch operation bar -->
	{#if batchSelectable}
		<div class="flex items-center justify-between px-4 py-2">
			{#if batchMode}
				<div class="flex items-center gap-4">
					<button
						class="text-primary dark:text-dark text-sm"
						onclick={handleSelectAll}
					>
						{listLang.selectAllText} ({batchSelected.length}/{data.length})
					</button>
					{#if batchSelected.length > 0}
						{#each batchActions as action, actionIndex (actionIndex)}
							<button
								class="text-sm {textColorClass[action.status || 'theme']}"
								onclick={() => action.onclick?.(batchSelected)}
							>
								{action.text}
							</button>
						{/each}
					{/if}
				</div>
				<button
					class="text-primary dark:text-dark text-sm"
					onclick={toggleBatchMode}
				>
					{listLang.doneText}
				</button>
			{:else}
				<span></span>
				<button
					class="text-primary dark:text-dark text-sm"
					onclick={toggleBatchMode}
				>
					{listLang.editText}
				</button>
			{/if}
		</div>
	{/if}

	<!-- 头部插槽 -->
	<!-- Header slot -->
	{#if headerChild}
		{@render headerChild()}
	{/if}

	<!-- 列表内容 -->
	<!-- List content -->
	<div class="flex flex-col {gapClass[gap] || 'gap-2'} {divider ? 'divide-y divide-black/10 dark:divide-white/10' : ''}">
		{#each renderItems as renderItem, index (renderItem.key)}
			{@const itemKey = renderItem.key}
			<div
				class="relative"
				class:stdf-list-transition={!!listTransition && !renderItem.leaving}
				class:stdf-list-slide-right={!renderItem.leaving && listTransition === 'slideRight'}
				class:stdf-list-slide-up={!renderItem.leaving && listTransition === 'slideUp'}
				class:stdf-list-fade-scale={!renderItem.leaving && listTransition === 'fadeScale'}
				class:stdf-list-stagger={!renderItem.leaving && listTransition === 'stagger'}
				class:stdf-list-leave={!!listTransition && renderItem.leaving}
				class:stdf-list-leave-slide-right={renderItem.leaving && listTransition === 'slideRight'}
				class:stdf-list-leave-slide-up={renderItem.leaving && listTransition === 'slideUp'}
				class:stdf-list-leave-fade-scale={renderItem.leaving && listTransition === 'fadeScale'}
				class:stdf-list-leave-stagger={renderItem.leaving && listTransition === 'stagger'}
				style={listTransition
					? `animation-delay: ${renderItem.leaving ? 0 : index * transitionDelay}ms; --stdf-list-stagger-x: ${
							index % 2 === 0 ? '-100px' : '100px'
						};`
					: ''}
			>
				{@render listItem(renderItem.item, index, itemKey)}
			</div>
		{/each}
	</div>

	<!-- 底部插槽 -->
	<!-- Footer slot -->
	{#if footerChild}
		{@render footerChild()}
	{/if}
</div>

<style>
	.stdf-list-transition {
		animation-duration: 300ms;
		animation-fill-mode: both;
		animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
		will-change: opacity, transform;
	}

	.stdf-list-leave {
		animation-duration: 300ms;
		animation-fill-mode: both;
		animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
		will-change: opacity, transform;
	}

	.stdf-list-slide-right {
		animation-name: stdf-list-slide-right;
	}

	.stdf-list-slide-up {
		animation-name: stdf-list-slide-up;
	}

	.stdf-list-fade-scale {
		animation-name: stdf-list-fade-scale;
	}

	.stdf-list-stagger {
		animation-name: stdf-list-stagger;
	}

	.stdf-list-leave-slide-right {
		animation-name: stdf-list-slide-right-out;
	}

	.stdf-list-leave-slide-up {
		animation-name: stdf-list-slide-up-out;
	}

	.stdf-list-leave-fade-scale {
		animation-name: stdf-list-fade-scale-out;
	}

	.stdf-list-leave-stagger {
		animation-name: stdf-list-stagger-out;
	}

	@keyframes stdf-list-slide-right {
		from {
			opacity: 0;
			transform: translateX(100px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes stdf-list-slide-up {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes stdf-list-fade-scale {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes stdf-list-stagger {
		from {
			opacity: 0;
			transform: translateX(var(--stdf-list-stagger-x));
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes stdf-list-slide-right-out {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(100px);
		}
	}

	@keyframes stdf-list-slide-up-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(50px);
		}
	}

	@keyframes stdf-list-fade-scale-out {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.8);
		}
	}

	@keyframes stdf-list-stagger-out {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(var(--stdf-list-stagger-x));
		}
	}
</style>
