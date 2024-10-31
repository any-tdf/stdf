<script>
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const dialogLang = currentLang.dialog;

	/** @typedef {import('../../index.d').Dialog} DialogProps */
	/** @type {DialogProps} */
	let {
		visible = false,
		title = dialogLang.title,
		titleAlign = 'center',
		content = dialogLang.content,
		isContentChild = false,
		popup = {},
		showIcon = false,
		icon = {},
		btnStyle = 'button',
		primaryText = dialogLang.primaryText,
		isPrimaryChild = false,
		primaryButton = {},
		secondaryText = dialogLang.secondaryText,
		secondaryButton = {},
		btnRatio = [1, 1],
		btnReverse = false,
		secondaryClose = true,
		btnGap = '2',
		onsecondary,
		onprimary,
		onclose,
		onopen,
		contentChild,
		primaryChild,
	} = $props();

	// 标题对齐方式
	// Title alignment
	const titleAlignClass = { left: ' text-left', center: ' text-center', right: ' text-right' };

	// 按钮间距
	// Button spacing
	const btnGapClass = { '0': '', '1': ' gap-1', '2': ' gap-2', '4': ' gap-4', '8': ' gap-8', '12': ' gap-12', '16': ' gap-16' };

	// 次按钮点击事件
	// Secondary button click event
	const secondaryFunc = () => {
		if (secondaryClose) {
			visible = false;
		}
		onsecondary && onsecondary();
	};

	// 主按钮点击事件
	// Primary button click event
	const primaryFunc = () => {
		onprimary && onprimary();
	};

	// 监听visible变化，派发open/close事件
	// Listen to the change of visible, dispatch open/close events
	$effect(() => {
		if (visible) {
			onopen && onopen();
		} else {
			onclose && onclose();
		}
	});
</script>

<Popup
	bind:visible
	size={0}
	maskClosable={false}
	duration={300}
	outDuration={150}
	position="center"
	radiusPosition="all"
	radius="lg"
	px="4"
	{...popup}
>
	<div class={`px-4 pt-4${btnStyle === 'button' ? ' pb-2' : ''} text-center space-y-4`}>
		<div class={`font-bold${titleAlignClass[titleAlign] || titleAlignClass['center']}`}>{title}</div>
		{#if showIcon}
			<div>
				<Icon {...icon} />
			</div>
		{/if}
		<div>
			{#if isContentChild}
				{@render contentChild?.()}
			{:else}
				{content}
			{/if}
		</div>
		<div
			class={`flex w-full${btnGapClass[btnGap] || btnGapClass['2']}${btnReverse ? ' flex-row-reverse' : ''}${
				btnStyle === 'textLine' ? ' border-t border-black/10 dark:border-white/10' : ''
			}`}
		>
			<div
				class={`${btnStyle === 'textLine' && !btnReverse ? 'border-r border-black/10 dark:border-white/10' : ''}`}
				style="flex:{btnRatio[1]}"
			>
				<Button
					size="full"
					fill={btnStyle === 'button' ? 'colorLight' : 'text'}
					heightIn={btnStyle === 'button' ? '3' : '2'}
					injClass={btnStyle === 'button' ? '' : 'font-bold'}
					{...secondaryButton}
					onclick={secondaryFunc}
				>
					{secondaryText}
				</Button>
			</div>
			<div class={btnStyle === 'textLine' && btnReverse ? 'border-r border-black/10 dark:border-white/10' : ''} style="flex:{btnRatio[0]}">
				<Button
					size="full"
					fill={btnStyle === 'button' ? 'base' : 'textTheme'}
					heightIn={btnStyle === 'button' ? '3' : '2'}
					injClass={btnStyle === 'button' ? '' : 'font-bold'}
					{...primaryButton}
					onclick={primaryFunc}
				>
					{#if isPrimaryChild}
						{@render primaryChild?.()}
					{:else}
						{primaryText}
					{/if}</Button
				>
			</div>
		</div>
	</div>
</Popup>
