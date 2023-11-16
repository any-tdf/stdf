<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Button from '../button/Button.svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const dialogLang = currentLang.dialog;

	/**
	 * 是否显示
	 * Whether to show
	 * @type {boolean}
	 * @default false
	 */
	export let visible = false;

	/**
	 * 标题
	 * Title
	 * @type {string}
	 * @default Current language dialog.title
	 */
	export let title = dialogLang.title;

	/**
	 * 标题对齐方式
	 * Title alignment
	 * @type {'left' | 'center' | 'right'}
	 * @default 'center'
	 */
	export let titleAlign = 'center';

	/**
	 * 内容
	 * Content
	 * @type {string}
	 * @default Current language dialog.content
	 */
	export let content = dialogLang.content;

	/**
	 * 内容是否使用slot
	 * Whether to use slot for content
	 * @type {boolean}
	 * @default false
	 */
	export let contentSlot = false;

	/**
	 * 弹出层参数
	 * Popup parameters
	 * @type {object}
	 * @default {}
	 */
	export let popup = {};

	/**
	 * 是否显示图标
	 * Whether to show icon
	 * @type {boolean}
	 * @default false
	 */
	export let showIcon = false;

	/**
	 * 图标参数
	 * Icon parameters
	 * @type {object}
	 * @default {}
	 */
	export let icon = {};

	/**
	 * 按钮样式
	 * Button style
	 * @type {'button' | 'text' | 'textLine'}
	 * @default 'button'
	 */
	export let btnStyle = 'button';

	/**
	 * 主按钮文字
	 * Primary button text
	 * @type {string}
	 * @default Current language dialog.primaryText
	 */
	export let primaryText = dialogLang.primaryText;

	/**
	 * 主按钮内部是否使用slot
	 * Whether to use slot for primary button
	 * @type {boolean}
	 * @default false
	 */
	export let primarySlot = false;

	/**
	 * 主按钮参数
	 * Primary button parameters
	 * @type {object}
	 * @default {}
	 */
	export let primaryButton = {};

	/**
	 * 次按钮文字
	 * Secondary button text
	 * @type {string}
	 * @default Current language dialog.secondaryText
	 */
	export let secondaryText = dialogLang.secondaryText;

	/**
	 * 次按钮参数
	 * Secondary button parameters
	 * @type {object}
	 * @default {}
	 */
	export let secondaryButton = {};

	/**
	 * 主次按钮大小比例
	 * Primary and secondary button size ratio
	 * @type {[number, number]}
	 * @default [1, 1]
	 */
	export let btnRatio = [1, 1];

	/**
	 * 主次按钮位置是否反转
	 * Whether to reverse the position of primary and secondary buttons
	 * @type {boolean}
	 * @default false
	 */
	export let btnReverse = false;

	/**
	 * 主按钮是否关闭弹窗
	 * Whether to close the popup when the primary button is clicked
	 * @type {boolean}
	 * @default true
	 */
	export let secondaryClose = true;

	/**
	 * 按钮间距
	 * Button spacing
	 * @type {'0' | '1' | '2' | '4' | '8' | '12' | '16'}
	 * @default '2'
	 */
	export let btnGap = '2';

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
		dispatch('secondary');
	};

	// 主按钮点击事件
	// Primary button click event
	const primaryFunc = () => {
		dispatch('primary');
	};

	// 监听visible变化，派发open/close事件
	// Listen to the change of visible, dispatch open/close events
	$: {
		if (visible) {
			dispatch('open');
		} else {
			dispatch('close');
		}
	}
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
			{#if contentSlot}
				<slot name="content" />
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
					on:click={secondaryFunc}
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
					on:click={primaryFunc}
				>
					{#if primarySlot}
						<slot name="primary" />
					{:else}
						{primaryText}
					{/if}</Button
				>
			</div>
		</div>
	</div>
</Popup>
