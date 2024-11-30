<script lang="ts">
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import Popup from '../popup/Popup.svelte';
	import Loading from '../loading/Loading.svelte';
	import ScrollRadio from '../scrollRadio/ScrollRadio.svelte';
	import type { AsyncPickerProps } from '../../types/index.js';
	import { zh_CN, type LangProps } from '../../lang/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const asyncPickerLang: LangProps['asyncPicker'] = currentLang.asyncPicker;

	let {
		visible = $bindable(false),
		data = $bindable([]),
		lastLevel = $bindable(false),
		firstLevel = $bindable(true),
		showRow = 5,
		labelKey = $bindable('label'),
		align = 'center',
		cancelText = asyncPickerLang.defaultCancel,
		confirmText = asyncPickerLang.defaultConfirm,
		title = $bindable(asyncPickerLang.defaultTitle),
		nextText = asyncPickerLang.defaultNext,
		prevText = asyncPickerLang.defaultPrev,
		showSelected = false,
		selectedText = asyncPickerLang.defaultSelected,
		popup = {},
		loading = {},
		oncancel,
		onprev,
		onconfirm,
		onnext,
		onclose
	}: AsyncPickerProps = $props();

	// 用于存储当前选定的所有项和索引
	// Used to store all selected items and indexes
	let items: Record<string, unknown>[] = $state([]);
	let indexs: number[] = $state([]);

	// 当前选中项索引
	// Current selected item index
	let currentIndex = $state(0);

	// 点击左侧按钮
	// Click left button
	const clickLeftFunc = () => {
		if (firstLevel) {
			visible = false;
			oncancel?.();
		} else {
			items = items.slice(0, items.length - 1);
			indexs.pop();
			data = [];
			setTimeout(() => {
				onprev?.();
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
			onclose?.();
			currentIndex = 0;
			onconfirm?.(items as [], indexs);
		} else {
			items = [...items, data[currentIndex]];
			indexs.push(currentIndex);
			indexs = indexs;
			data = [];
			setTimeout(() => {
				onnext?.(currentIndex);
				currentIndex = 0;
			});
		}
	};

	// 滚动结束
	// Scroll end
	const scrollEndFunc = (index: number) => {
		currentIndex = index;
	};
	let isLoading = $derived(data.length === 0);
</script>

<Popup
	bind:visible
	size={0}
	maskClosable
	transitionDistance={(showRow === 3 ? 64 : showRow === 5 ? 48 : 32) * showRow + 41 + (showSelected ? 32 : 0)}
	{...popup}
>
	<div class="flex items-center justify-between border-b border-black/10 bg-white dark:border-white/20 dark:bg-black">
		<button
			class="h-10 px-4 leading-10 text-black/60 dark:text-white/60"
			onclick={() => {
				if (!isLoading) clickLeftFunc();
			}}
		>
			{#if isLoading}
				<div class="p-3">
					<Loading width="4" height="4" customColor={['#666']} />
				</div>
			{:else}
				{firstLevel ? cancelText : prevText}
			{/if}
		</button>
		<div>{title}</div>
		<button
			class="text-primary dark:text-dark h-10 px-4 leading-10"
			onclick={() => {
				if (!isLoading) clickRightFunc();
			}}
		>
			{#if isLoading}
				<div class="p-3">
					<Loading width="4" height="4" theme />
				</div>
			{:else}
				{lastLevel ? confirmText : nextText}
			{/if}
		</button>
	</div>
	{#if showSelected}
		<div class="flex w-full gap-3 overflow-x-hidden bg-white px-4 dark:bg-black">
			<div class="h-8 flex-none text-center text-sm leading-8 text-black/60 dark:text-white/60">
				{selectedText}
			</div>
			{#each items as item}
				{#if !isLoading}
					<div
						in:fly|global={{ x: document.documentElement.clientWidth, duration: 500 }}
						out:fly|global={{ x: document.documentElement.clientWidth, duration: 300 }}
						class="h-8 flex-1 truncate px-1 text-center text-sm leading-8"
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
				<div class="flex items-center justify-center" style="height:{(showRow === 3 ? 64 : showRow === 5 ? 48 : 32) * showRow}px">
					<Loading width="28" height="8" type="1_16" theme {...loading} />
				</div>
			{:else}
				<div>
					<ScrollRadio
						data={data as Record<string, string>[]}
						{showRow}
						{labelKey}
						{align}
						autoScrollToLast={false}
						onscrollEnd={scrollEndFunc}
					/>
				</div>
			{/if}
		</div>
	</div>
</Popup>
