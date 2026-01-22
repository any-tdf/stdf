<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { FullKeyboardProps } from '../../types/index.js';
	import { radiusObj } from '../utils/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const commonLang: LangProps['common'] = currentLang.common;

	let {
		value = $bindable(''),
		visible = $bindable(true),
		type = 'button',
		mode = 'full',
		done = true,
		doneText = commonLang.done,
		doneDisabled = $bindable(false),
		radius = '',
		preview = false,
		previewMask = false,
		panelClass = '',
		keyClass: keyClassProp = '',
		doneClass = '',
		popup = {},
		onclick,
		onopen,
		onclose
	}: FullKeyboardProps = $props();

	// 是否使用弹出层，当 popup 为 null 时不使用
	// Whether to use popup, when popup is null, do not use
	const usePopup = $derived(popup !== null);

	// 是否大写模式
	// Whether uppercase mode
	let isUpperCase = $state(false);

	// 是否符号模式（用于 full 模式下切换字母/数字符号）
	// Whether symbol mode (for switching between letters and numbers/symbols in full mode)
	let isSymbolMode = $state(false);

	// QWERTY 键盘布局
	// QWERTY keyboard layout
	const letterRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const letterRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	const letterRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

	// 数字行
	// Number row
	const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	// 符号布局（美式键盘符号顺序）
	// Symbol layout (US keyboard symbol order)
	const symbolRow1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const symbolRow2 = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*'];
	const symbolRow3 = ['(', ')', '-', '_', '=', '+', '[', ']', '{', '}'];
	const symbolRow4 = ['\\', '|', ';', ':', "'", '"', ',', '.', '<'];
	const symbolRow5 = ['>', '/', '?'];

	// 预览区高度（px）
	// Preview area height (px)
	const previewHeight = 44;

	// 根据模式计算键盘高度
	// Calculate keyboard height based on mode
	const getKeyboardHeight = () => {
		let baseHeight = 260;
		if (mode === 'letterNumber' || mode === 'full') {
			baseHeight = 304; // 多一行（数字或符号）
		}
		return preview ? baseHeight + previewHeight : baseHeight;
	};

	// 按键样式
	// Key style
	const keyClass = $derived(
		type === 'button'
			? `flex items-center justify-center h-11 bg-bg-highlight dark:bg-bg-highlight-dark shadow-xs font-medium active:scale-95 transition-all duration-100 text-lg text-text-primary dark:text-text-dark${keyClassProp ? ' ' + keyClassProp : ''}`
			: `flex items-center justify-center h-11 bg-bg-highlight dark:bg-bg-highlight-dark font-medium active:opacity-40 transition-all duration-100 text-lg text-text-primary dark:text-text-dark${keyClassProp ? ' ' + keyClassProp : ''}`
	);

	// 功能键样式
	// Function key style
	const funcKeyClass = $derived(
		type === 'button'
			? `flex items-center justify-center h-11 bg-black/10 dark:bg-white/10 shadow-xs font-medium active:scale-95 transition-all duration-100${keyClassProp ? ' ' + keyClassProp : ''}`
			: `flex items-center justify-center h-11 bg-black/10 dark:bg-white/10 font-medium active:opacity-40 transition-all duration-100${keyClassProp ? ' ' + keyClassProp : ''}`
	);

	// 获取按键圆角（block 模式下不使用圆角）
	// Get key border radius (no radius in block mode)
	const keyRadius = $derived(type === 'button' ? (radius ? radiusObj[radius] : 'rounded-(--radius-form)') : '');

	// 间距 class
	// Gap class
	const gapClass = $derived(type === 'button' ? 'gap-0.5' : 'gap-px');

	// 点击按键事件
	// Click key event
	const clickKey = (key: string) => {
		const actualKey = isUpperCase ? key.toUpperCase() : key;
		value += actualKey;
		onclick?.(actualKey);
	};

	// 点击删除
	// Click delete
	const clickDelete = () => {
		value = value.slice(0, -1);
		onclick?.('delete');
	};

	// 点击空格
	// Click space
	const clickSpace = () => {
		value += ' ';
		onclick?.(' ');
	};

	// 点击完成
	// Click done
	const clickDone = () => {
		if (!doneDisabled) {
			visible = false;
			onclick?.('done');
		}
	};

	// 切换大小写
	// Toggle uppercase
	const toggleCase = () => {
		isUpperCase = !isUpperCase;
	};

	// 切换符号模式
	// Toggle symbol mode
	const toggleSymbolMode = () => {
		isSymbolMode = !isSymbolMode;
	};

	// 激活与关闭键盘事件
	// Activate and close the keyboard event
	$effect(() => {
		if (visible) {
			onopen?.(getKeyboardHeight());
		} else {
			onclose?.();
		}
	});
</script>

{#snippet shiftKey()}
	<button
		class="{funcKeyClass} {keyRadius} w-12 {isUpperCase ? 'bg-primary/20 dark:bg-dark/20' : ''}"
		onclick={toggleCase}
		aria-label="shift"
	>
		<svg width="18" height="16" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" class="fill-current">
			<path d="M4.64062 11.3613C3.70898 11.3613 3.1875 10.8105 3.1875 9.90234V7.46484H1.00195C0.416016 7.46484 0 7.11914 0 6.58008C0 6.24609 0.134766 6.04102 0.451172 5.71875L5.71875 0.392578C5.97656 0.140625 6.25781 0 6.55664 0C6.85547 0 7.13672 0.140625 7.39453 0.392578L12.6621 5.71875C12.9727 6.0293 13.1133 6.24609 13.1133 6.58008C13.1133 7.11914 12.6973 7.46484 12.1113 7.46484H9.93164V9.90234C9.93164 10.8105 9.4043 11.3613 8.47266 11.3613H4.64062ZM5.08594 9.82031H8.02734C8.20312 9.82031 8.33789 9.68555 8.33789 9.50977V6.31641C8.33789 6.18164 8.38477 6.12891 8.52539 6.12891H10.8398C10.8691 6.12891 10.8867 6.11133 10.8867 6.09375C10.8867 6.07617 10.8809 6.06445 10.8574 6.04102L6.64453 1.82227C6.61523 1.79297 6.58594 1.78125 6.55664 1.78125C6.52734 1.78125 6.49805 1.79297 6.47461 1.82227L2.25586 6.04102C2.23242 6.06445 2.22656 6.07617 2.22656 6.09375C2.22656 6.11133 2.24414 6.12891 2.2793 6.12891H4.58789C4.72852 6.12891 4.78125 6.18164 4.78125 6.31641V9.50977C4.78125 9.69141 4.9043 9.82031 5.08594 9.82031Z" />
		</svg>
	</button>
{/snippet}

{#snippet deleteKey()}
	<button class="{funcKeyClass} {keyRadius} w-12" onclick={clickDelete} aria-label="delete">
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="fill-current">
			<path d="M6.53451 3H20.9993C21.5516 3 21.9993 3.44772 21.9993 4V20C21.9993 20.5523 21.5516 21 20.9993 21H6.53451C6.20015 21 5.88792 20.8329 5.70246 20.5547L0.369122 12.5547C0.145189 12.2188 0.145189 11.7812 0.369122 11.4453L5.70246 3.4453C5.88792 3.1671 6.20015 3 6.53451 3ZM7.06969 5L2.40302 12L7.06969 19H19.9993V5H7.06969ZM12.9993 10.5858L15.8277 7.75736L17.242 9.17157L14.4135 12L17.242 14.8284L15.8277 16.2426L12.9993 13.4142L10.1709 16.2426L8.75668 14.8284L11.5851 12L8.75668 9.17157L10.1709 7.75736L12.9993 10.5858Z" />
		</svg>
	</button>
{/snippet}

{#snippet letterRows()}
	<div class="grid grid-cols-10 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
		{#each letterRow1 as key (key)}
			<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>
				{isUpperCase ? key.toUpperCase() : key}
			</button>
		{/each}
	</div>
	<div class="grid grid-cols-9 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'} px-4">
		{#each letterRow2 as key (key)}
			<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>
				{isUpperCase ? key.toUpperCase() : key}
			</button>
		{/each}
	</div>
	<div class="flex {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
		{@render shiftKey()}
		<div class="flex-1 grid grid-cols-7 {gapClass}">
			{#each letterRow3 as key (key)}
				<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>
					{isUpperCase ? key.toUpperCase() : key}
				</button>
			{/each}
		</div>
		{@render deleteKey()}
	</div>
{/snippet}

{#snippet keyboardContent()}
	<div class="bg-black/5 dark:bg-white/5 select-none {type === 'button' ? 'p-1.5' : 'border-t border-gray-100 dark:border-gray-950'}{panelClass ? ' ' + panelClass : ''}">
		{#if preview}
			<!-- 输入预览区 -->
			<!-- Input preview area -->
			<div class="flex items-center justify-center h-11 {type === 'button' ? 'mb-1' : 'mb-px'} bg-bg-highlight dark:bg-bg-highlight-dark rounded-(--radius-form) text-xl font-semibold tracking-widest">
				{#if previewMask && value}
					{#each value.split('') as _ (_)}
						<span class="w-2.5 h-2.5 mx-1 rounded-full bg-text-primary dark:bg-text-dark"></span>
					{/each}
				{:else}
					{value || ''}
				{/if}
			</div>
		{/if}

		{#if mode === 'letter'}
			<!-- 纯字母模式 -->
			<!-- Letter only mode -->
			{@render letterRows()}
			<!-- 底部行：空格、完成 -->
			<div class="flex {gapClass}">
				<button class="{keyClass} {keyRadius} flex-1" onclick={clickSpace}>
					<span class="text-sm opacity-60">{currentLang.fullKeyboard?.space || 'space'}</span>
				</button>
				{#if done}
					<button
						class="{keyRadius} w-24 h-11 bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark font-medium {type === 'button' ? 'active:scale-95' : 'active:opacity-40'} transition-all duration-100 {doneDisabled ? 'opacity-50 active:scale-100' : ''}{doneClass ? ' ' + doneClass : ''}"
						onclick={clickDone}
					>
						{doneText}
					</button>
				{/if}
			</div>

		{:else if mode === 'letterNumber'}
			<!-- 字母+数字模式：数字在字母上方一行 -->
			<!-- Letter + Number mode: numbers in a row above letters -->
			<div class="grid grid-cols-10 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
				{#each numberRow as key (key)}
					<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>{key}</button>
				{/each}
			</div>
			{@render letterRows()}
			<!-- 底部行：空格、完成 -->
			<div class="flex {gapClass}">
				<button class="{keyClass} {keyRadius} flex-1" onclick={clickSpace}>
					<span class="text-sm opacity-60">{currentLang.fullKeyboard?.space || 'space'}</span>
				</button>
				{#if done}
					<button
						class="{keyRadius} w-24 h-11 bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark font-medium {type === 'button' ? 'active:scale-95' : 'active:opacity-40'} transition-all duration-100 {doneDisabled ? 'opacity-50 active:scale-100' : ''}{doneClass ? ' ' + doneClass : ''}"
						onclick={clickDone}
					>
						{doneText}
					</button>
				{/if}
			</div>

		{:else}
			<!-- full 模式：字母+数字+符号，可切换 -->
			<!-- Full mode: letters + numbers + symbols, switchable -->
			{#if isSymbolMode}
				<!-- 数字符号模式 -->
				<!-- Number symbol mode -->
				<div class="grid grid-cols-10 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
					{#each symbolRow1 as key (key)}
						<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>{key}</button>
					{/each}
				</div>
				<div class="grid grid-cols-10 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
					{#each symbolRow2 as key (key)}
						<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>{key}</button>
					{/each}
				</div>
				<div class="grid grid-cols-10 {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
					{#each symbolRow3 as key (key)}
						<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>{key}</button>
					{/each}
				</div>
				<div class="flex {gapClass} {type === 'button' ? 'mb-0.5' : 'mb-px'}">
					<div class="flex-1 grid grid-cols-9 {gapClass}">
						{#each symbolRow4 as key (key)}
							<button class="{keyClass} {keyRadius}" onclick={() => clickKey(key)}>{key}</button>
						{/each}
					</div>
					{@render deleteKey()}
				</div>
			{:else}
				<!-- 字母模式 -->
				<!-- Letter mode -->
				{@render letterRows()}
			{/if}

			<!-- 底部行：123/ABC、<>/? (符号模式)、空格、完成 -->
			<!-- Bottom row: 123/ABC, <>/? (symbol mode), space, done -->
			<div class="flex {gapClass}">
				<button class="{funcKeyClass} {keyRadius} w-16 text-base" onclick={toggleSymbolMode}>
					{isSymbolMode ? 'ABC' : '123'}
				</button>
				{#if isSymbolMode}
					{#each symbolRow5 as key (key)}
						<button class="{keyClass} {keyRadius} w-10" onclick={() => clickKey(key)}>{key}</button>
					{/each}
				{/if}
				<button class="{keyClass} {keyRadius} flex-1" onclick={clickSpace}>
					<span class="text-sm opacity-60">{currentLang.fullKeyboard?.space || 'space'}</span>
				</button>
				{#if done}
					<button
						class="{keyRadius} w-24 h-11 bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark font-medium {type === 'button' ? 'active:scale-95' : 'active:opacity-40'} transition-all duration-100 {doneDisabled ? 'opacity-50 active:scale-100' : ''}{doneClass ? ' ' + doneClass : ''}"
						onclick={clickDone}
					>
						{doneText}
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/snippet}

{#if usePopup}
	<Popup bind:visible size={0} mask={{ opacity: '0' }} transitionDistance={getKeyboardHeight()} {...popup} radius={type === 'block' ? 'none' : popup?.radius}>
		{@render keyboardContent()}
	</Popup>
{:else}
	{@render keyboardContent()}
{/if}
