<script lang="ts">
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { ModalProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const modalLang: LangProps['modal'] = currentLang.modal;

	let {
		visible = $bindable(false),
		title = modalLang.title,
		titleAlign = 'center',
		content = modalLang.content,
		popup = {},
		showIcon = false,
		icon = {},
		showBtn = true,
		btnText = modalLang.btnText,
		button = {},
		contentChild,
		onclose
	}: ModalProps = $props();

	// 标题对齐方式样式
	// Title alignment style
	const titleAlignClass = { left: ' text-left', center: ' text-center', right: ' text-right' };

	// 关闭并派发事件
	// Close and dispatch events
	const closeModalFunc = () => {
		visible = false;
		onclose?.();
	};
</script>

<Popup
	bind:visible
	size={0}
	duration={300}
	outDuration={150}
	maskClosable={!showBtn}
	position="center"
	radiusPosition="all"
	radius="lg"
	px="8"
	{...popup}
>
	<div class="px-4 pt-4 {showBtn ? 'pb-2' : 'pb-4'} space-y-4 text-center">
		<div class="font-bold{titleAlignClass[titleAlign] || titleAlignClass['center']}">{title}</div>
		{#if showIcon}
			<div><Icon {...icon} /></div>
		{/if}
		<div>
			{#if contentChild}
				{@render contentChild()}
			{:else}
				{content}
			{/if}
		</div>
		{#if showBtn}
			<div><Button size="full" {...button} onclick={closeModalFunc}>{btnText}</Button></div>
		{/if}
	</div>
</Popup>
