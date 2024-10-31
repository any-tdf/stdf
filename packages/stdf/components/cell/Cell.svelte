<script>
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import Switch from '../switch/Switch.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const commonLang = currentLang.common;

	/** @typedef {import('../../index.d').Cell} CellProps */
	/** @type {CellProps} */
	let {
		title = '',
		detail = '',
		right = 'arrow',
		left = '',
		subTitle = '',
		info = '',
		line = false,
		my = '4',
		mx = '2',
		radius = 'lg',
		switchActive = false,
		shadow = 'sm',
		injClass = '',
		love = false,
		clickAll = true,
		leftChild,
		rightChild,
		detailChild,
		onclick,
	} = $props();

	// 圆角风格样式
	// Rounded style style
	const radiusObj = {
		none: ' rounded-none',
		base: ' rounded',
		md: ' rounded-md',
		lg: ' rounded-lg',
		xl: ' rounded-xl',
		'2xl': ' rounded-2xl',
		full: ' rounded-full',
	};

	// 阴影风格样式
	// Shadow style style
	const shadowClass = {
		none: ' shadow-none',
		sm: ' shadow-sm dark:shadow-white/5',
		base: ' shadow dark:shadow-white/10',
		md: ' shadow-md dark:shadow-white/10',
		lg: ' shadow-lg dark:shadow-white/10',
		xl: ' shadow-xl dark:shadow-white/10',
		'2xl': ' shadow-2xl dark:shadow-white/25',
	};

	// 左右间距样式
	// Left and right margin style
	const mxClass = { '0': ' mx-0', '1': ' mx-1', '2': ' mx-2', '3': ' mx-3', '4': ' mx-4', '6': ' mx-6', '8': ' mx-8' };

	// 上下边距样式
	// Top and bottom margin style
	const myClass = { '0': ' my-0', '1': ' my-1', '2': ' my-2', '3': ' my-3', '4': ' my-4', '6': ' my-6', '8': ' my-8' };

	// 点击事件
	// Click event
	const setClickFun = () => {
		if (clickAll) {
			if (typeof right === 'object' && right.type === 'switch' && !right.switch?.disabled) {
				switchActive = right.switch?.async ? switchActive : !switchActive;
			}
			// 派发事件
			// Dispatch event
			onclick && onclick();
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={setClickFun}
	class={`px-4 cursor-pointer bg-white dark:bg-gray-800${clickAll ? ' active:bg-gray-100 dark:active:bg-gray-600' : ''} ${
		myClass[my] || myClass['4']
	}${mxClass[mx] || mxClass['2']}${radiusObj[radius] || radiusObj['lg']} ${shadowClass[shadow] || shadowClass['sm']}${
		love ? ' text-xl' : ''
	} ${injClass}`}
>
	<div class={`flex justify-between gap-4 py-4${line && my === '0' ? ' border-b border-black/5 dark:border-white/5' : ''}`}>
		<!-- left -->
		<div class="flex justify-between items-center">
			{#if left === ''}
				<!-- none -->
			{:else if left === 'child'}
				{@render leftChild?.()}
			{:else}
				<div class="mr-1 flex flex-col justify-center">
					<Icon {...left} />
				</div>
			{/if}
			<div class={`flex flex-col ${subTitle === '' ? 'justify-center' : 'justify-between'}`}>
				<div class="font-medium">{title}</div>
				<div class="text-xs text-gray-500 dark:text-gray-400">{subTitle}</div>
			</div>
		</div>
		<!-- right -->
		<div class="flex justify-between items-center">
			<div class={`flex flex-col ${info === '' ? 'justify-center' : 'justify-between'} text-right `}>
				{#if detail === 'slot'}
					{@render detailChild?.()}
				{:else}
					<div class="text-gray-700 dark:text-gray-300">{detail}</div>
				{/if}
				<div class="text-xs text-gray-500 dark:text-gray-400 font-light">{info}</div>
			</div>
			{#if right === 'none'}
				<!-- none -->
			{:else if right === 'arrow'}
				<div class="text-gray-700 dark:text-gray-300 flex flex-col justify-center">
					<Icon name="ri-arrow-right-s-line" size={love ? 26 : 20} alpha={0.6} top={-2} />
				</div>
			{:else if typeof right === 'object' && right.type === 'switch' && right.switch}
				<div class="ml-1 flex flex-col justify-center">
					<Switch active={switchActive} {...right.switch} />
				</div>
			{:else if typeof right === 'object' && right.type === 'icon' && right.icon}
				<div class="ml-1 flex flex-col justify-center">
					<Icon {...right.icon} />
				</div>
			{:else if right === 'child'}
				{@render rightChild?.()}
			{:else}
				<!-- none -->
			{/if}
		</div>
	</div>
</div>
