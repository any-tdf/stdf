<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 定义事件派发器
	// Define event dispatcher
	const dispatch = createEventDispatcher();

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const commonLang = currentLang.common;

	// 键盘样式类型，按钮式或块式
	// Keyboard style type, button or block
	export let type = 'button';

	// 是否显示
	// Whether to show
	export let visible = true;

	// 每一个按键的高度
	// Height of each key
	export let height = '12';

	// 间距
	// the spacing
	export let gap = '2';

	// 键盘内边距
	// Keyboard padding
	export let p = '2';

	// 数字键盘上下反向
	// Number keyboard up and down reverse
	export let reverse = false;

	// 是否显示完成按钮
	// Whether to show the done button
	export let done = true;

	// 显示小数点
	// Show decimal point
	export let dot = true;

	// 显示关闭按钮
	// Show close button
	export let close = false;

	// 完成按钮文本
	// Done button text
	export let doneText = commonLang.done;

	// 完成按钮是否禁用
	// Whether the done button is disabled
	export let doneDisabled = false;

	// 按钮圆角
	// Button rounded corners
	export let radius = 'base';

	// 键盘面板注入 class
	// Keyboard panel injection class
	export let panelClass = '';

	// 按键注入 class
	// Key injection class
	export let keyClass = '';

	// 完成按键注入 class
	// Done key injection class
	export let doneClass = '';

	// popup 参数
	// popup parameter
	export let popup = {};

	// 高度 class
	// Height class
	const heightClass = {
		'8': 'h-8',
		'10': 'h-10',
		'12': 'h-12',
		'14': 'h-14',
		'16': 'h-16',
		'20': 'h-20',
	};

	// 根据高度动态数字大小
	// Dynamic number size based on height
	const fontSizeClass = {
		'8': 'text-sm',
		'10': 'text-base',
		'12': 'text-xl',
		'14': 'text-2xl',
		'16': 'text-2xl',
		'20': 'text-2xl',
	};

	// 间距 class
	// spacing class
	const gapClass = {
		'0': 'gap-0',
		'1': 'gap-1',
		'2': 'gap-2',
		'3': 'gap-3',
		'4': 'gap-4',
	};

	// 内边距 class
	// padding class
	const pClass = {
		'0': 'p-0',
		'1': 'p-1',
		'2': 'p-2',
		'3': 'p-3',
		'4': 'p-4',
	};

	// 圆角 class
	// radius class
	const radiusClass = {
		none: 'rounded-none',
		base: 'rounded',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl',
		'2xl': 'rounded-2xl',
		'3xl': 'rounded-3xl',
		full: 'rounded-full',
	};

	// 根据 p、gap、height 计算出键盘高度
	// Calculate the keyboard height based on p, gap, height
	const keyboardHeight = () => {
		const pNum = parseInt(p);
		const gapNum = type === 'button' ? parseInt(gap) : 0;
		const heightNum = parseInt(height);
		return (pNum * 2 + gapNum * 3 + heightNum * 4) * 4 + (type === 'block' ? 4 : 0);
	};

	// 按钮式 class
	// Button type class
	const buttonClass = `flex flex-col justify-center shadow-sm font-bold cursor-pointer active:scale-95 transition-all duration-100 ${
		heightClass[height] || 'h-12'
	} ${fontSizeClass[height] || 'text-base'} ${radiusClass[radius] || 'rounded'}${keyClass ? ' ' + keyClass : ''}`;

	// 块式 class
	// Block type class
	const blockClass = `flex flex-col justify-center font-bold cursor-pointer active:opacity-40 transition-all duration-100 ${
		heightClass[height] || 'h-12'
	} ${fontSizeClass[height] || 'text-base'}${keyClass ? ' ' + keyClass : ''}`;

	// 根据 type 类型，生成不同的基础样式
	// Generate different basic styles based on type type
	const baseClassFunc = key => {
		if (type === 'button') {
			return key === 'done' ? buttonClass : 'bg-white dark:bg-gray4 ' + buttonClass;
		} else {
			return key === 'done' ? blockClass : 'bg-white dark:bg-gray4 ' + blockClass;
		}
	};

	// 处理 0 占据的格数
	// Handle the number of grids occupied by 0
	const zeroColFunc = () => {
		// 不显示完成，右下角显示删除按钮，0 最多占 2 格
		// If you don't show it, the delete button will be displayed in the lower right corner, and 0 will occupy up to 2 grids
		if (!done) {
			return dot || close ? 'col-span-1' : 'col-span-2';
		} else {
			return dot && close ? 'col-span-1' : dot || close ? 'col-span-2' : 'col-span-3';
		}
	};

	// 输入的数字字符
	// Input number character
	let numStr = '';

	// 点击按键事件
	// Click the button event
	const clickFunc = key => {
		// 当 key 不是 close 或 done 时，拼接字符串，是删除时，删除最后一个字符
		// When key is not close or done, splice the string, delete the last character when it is deleted
		if (key !== 'close' && key !== 'done') {
			if (key === 'delete') {
				numStr = numStr.slice(0, numStr.length - 1);
			} else {
				numStr += key;
			}
		}
		// 如果 key 是数字处理为字符串
		// If key is a number, process it as a string
		const keyStr = typeof key === 'number' ? key.toString() : key;
		// close 和 done 事件都回关闭
		// Both close and done events will be closed
		if (keyStr === 'close' || (keyStr === 'done' && !doneDisabled)) {
			visible = false;
		}
		// 派发事件，传递出两个参数，输入的数字字符串和本次点击的类型
		// Dispatch events, pass out two parameters, the input number string and the type of this click
		dispatch('click', { numStr, key: keyStr });
	};

	// 激活与关闭键盘事件
	// Activate and close the keyboard event
	$: {
		if (visible) {
			dispatch('open', { keyboardHeight: keyboardHeight() });
		} else {
			dispatch('close');
		}
	}
</script>

<Popup bind:visible size={0} mask={{ opacity: 0 }} transitionDistance={keyboardHeight()} {...popup}>
	<div
		class="bg-gray8 dark:bg-gray1 text-center {type === 'block' ? 'border-t border-gray8 dark:border-gray1' : ''} {pClass[p] ||
			'p-2'}{panelClass ? ' ' + panelClass : ''}"
	>
		<div class="grid {type === 'button' ? gapClass[gap] || 'gap-2' : 'gap-px'} {done ? 'grid-cols-4' : 'grid-cols-3'}">
			{#each reverse ? [7, 8, 9] : [1, 2, 3] as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc(item)} on:click={() => clickFunc(item)}>
					{item}
				</div>
			{/each}
			{#if done}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc('delete')} on:click={() => clickFunc('delete')}>
					<Icon name="ri-delete-back-2-line" size={height * 2} />
				</div>
			{/if}
			{#each [4, 5, 6] as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc(item)} on:click={() => clickFunc(item)}>
					{item}
				</div>
			{/each}
			{#if done}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="{baseClassFunc('done')} h-full row-span-3 bg-primary dark:bg-dark text-white dark:text-black {doneDisabled
						? 'active:!scale-100 transition-none !opacity-50'
						: ''}{doneClass ? '' + doneClass : ''}"
					on:click={() => clickFunc('done')}
				>
					{doneText}
				</div>
			{/if}
			{#each reverse ? [1, 2, 3] : [7, 8, 9] as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc(item)} on:click={() => clickFunc(item)}>
					{item}
				</div>
			{/each}
			{#if dot}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc('.')} on:click={() => clickFunc('.')}>.</div>
			{/if}
			{#if done ? close : !dot && close}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc('close')} on:click={() => clickFunc('close')}>
					<Icon name="ri-skip-down-line" size={height * 2} />
				</div>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class={baseClassFunc('0') + ' ' + zeroColFunc()} on:click={() => clickFunc('0')}>0</div>
			{#if !done}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class={baseClassFunc('delete')} on:click={() => clickFunc('delete')}>
					<Icon name="ri-delete-back-2-line" size={height * 2} />
				</div>
			{/if}
		</div>
	</div>
</Popup>
