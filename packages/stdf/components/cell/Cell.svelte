<script>
	import Icon from '../icon/Icon.svelte';
	import Switch from '../switch/Switch.svelte';

	/** @typedef {import('../../index.d').Cell} CellProps */
	/** @type {CellProps} */
	let {
		title = '',
		detail = '',
		right = 'arrow',
		left = null,
		subTitle = '',
		info = '',
		line = false,
		my = '4',
		mx = '2',
		radius = 'lg',
		switchActive = $bindable(false),
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
			if (typeof right === 'object' && right?.type === 'switch' && !right?.switch?.disabled) {
				switchActive = right?.switch?.async ? switchActive : !switchActive;
			}
			// 派发事件
			// Dispatch event
			onclick && onclick();
		}
	};
</script>

<div
	class="px-4 bg-white dark:bg-gray-800{clickAll ? ' active:bg-gray-100 dark:active:bg-gray-600' : ''} {myClass[my] ||
		myClass['4']}{mxClass[mx] || mxClass['2']}{radiusObj[radius] || radiusObj['lg']} {shadowClass[shadow] || shadowClass['sm']}{love
		? ' text-xl'
		: ''} {injClass}"
>
	<button
		onclick={setClickFun}
		class="flex w-full justify-between gap-4 py-4{line && my === '0' ? ' border-b border-black/5 dark:border-white/5' : ''}"
	>
		<div class="flex justify-between items-center">
			{#if leftChild}
				{@render leftChild?.()}
			{:else if left}
				<div class="flex flex-col justify-center mr-1">
					<Icon {...left} />
				</div>
			{:else}{/if}
			<div class="flex flex-col text-left {subTitle === '' ? 'justify-center' : 'justify-between'}">
				<div class="font-medium">{title}</div>
				<div class="text-xs text-gray-500 dark:text-gray-400">{subTitle}</div>
			</div>
		</div>
		<div class="flex justify-between items-center">
			<div class="flex flex-col {info === '' ? 'justify-center' : 'justify-between'} text-right">
				{#if detailChild}
					{@render detailChild?.()}
				{:else if detail}
					<div class="text-gray-700 dark:text-gray-300">{detail}</div>
				{:else}{/if}
				<div class="text-xs font-light text-gray-500 dark:text-gray-400">{info}</div>
			</div>
			{#if rightChild}
				{@render rightChild?.()}
			{:else if right === 'arrow'}
				<div class="flex flex-col justify-center text-gray-700 dark:text-gray-300">
					<Icon name="ri-arrow-right-s-line" size={love ? 26 : 20} alpha={0.6} top={-2} />
				</div>
			{:else if typeof right === 'object' && right?.type === 'switch'}
				<div class="flex flex-col justify-center ml-1">
					<Switch active={switchActive} {...right?.switch} />
				</div>
			{:else if typeof right === 'object' && right?.type === 'icon' && right?.icon}
				<div class="flex flex-col justify-center ml-1">
					<Icon {...right?.icon} />
				</div>
			{:else}{/if}
		</div>
	</button>
</div>
