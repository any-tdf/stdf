<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { DialogProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const dialogLang: LangProps['dialog'] = currentLang.dialog;

	let {
		visible = $bindable(false),
		title = dialogLang.title,
		titleAlign = 'center',
		content = dialogLang.content,
		popup = {},
		showIcon = false,
		icon = {},
		btnStyle = 'button',
		primaryText = dialogLang.primaryText,
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
		contentChild,
		primaryChild
	}: DialogProps = $props();

	// 标题对齐方式
	// Title alignment
	const titleAlignClass = { left: ' text-left', center: ' text-center', right: ' text-right' };

	// 按钮间距
	// Button spacing
	const btnGapClass = { '0': '', '1': ' gap-1', '2': ' gap-2', '4': ' gap-4', '8': ' gap-8', '12': ' gap-12', '16': ' gap-16' };
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
	<div class="px-4 pt-4{btnStyle === 'button' ? ' pb-2' : ''} space-y-4 text-center">
		<div class="font-bold{titleAlignClass[titleAlign] || titleAlignClass['center']}">{title}</div>
		{#if showIcon}
			<div><Icon {...icon} /></div>
		{/if}
		<div>
			{#if contentChild}
				{@render contentChild?.()}
			{:else}
				{content}
			{/if}
		</div>
		<div
			class="flex w-full{btnGapClass[btnGap] || btnGapClass['2']}{btnReverse ? ' flex-row-reverse' : ''}{btnStyle === 'textLine'
				? ' border-t border-black/10 dark:border-white/10'
				: ''}"
		>
			<div class={btnStyle === 'textLine' && !btnReverse ? 'border-r border-black/10 dark:border-white/10' : ''} style="flex:{btnRatio[1]}">
				<Button
					size="full"
					fill={btnStyle === 'button' ? 'colorLight' : 'text'}
					heightIn={btnStyle === 'button' ? '3' : '2'}
					injClass={btnStyle === 'button' ? '' : 'font-bold'}
					{...secondaryButton}
					onclick={() => {
						if (secondaryClose) {
							visible = false;
							onclose?.();
						}
						onsecondary?.();
					}}
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
					onclick={() => onprimary?.()}
				>
					{#if primaryChild}
						{@render primaryChild?.()}
					{:else}
						{primaryText}
					{/if}
				</Button>
			</div>
		</div>
	</div>
</Popup>
