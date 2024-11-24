<script>
	import { getContext } from 'svelte';
	import Popup from '../popup/Popup.svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const commonLang = currentLang.common;

	/** @typedef {import('../../index.d').NumKeyboard} NumKeyboardProps */
	/** @type {NumKeyboardProps} */
	let {
		type = 'button',
		visible = $bindable(true),
		height = '12',
		space = '2',
		p = '2',
		reverse = false,
		done = true,
		dot = true,
		close = false,
		doneText = commonLang.done,
		doneDisabled = $bindable(false),
		radius = 'base',
		panelClass = '',
		keyClass = '',
		doneClass = '',
		popup = {},
		onclick,
		onopen,
		onclose,
	} = $props();

	// 高度 class
	// Height class
	const heightClass = { '8': 'h-8', '10': 'h-10', '12': 'h-12', '14': 'h-14', '16': 'h-16', '20': 'h-20' };

	// 根据高度动态数字大小
	// Dynamic number size based on height
	const fontSizeClass = { '8': 'text-sm', '10': 'text-base', '12': 'text-xl', '14': 'text-2xl', '16': 'text-2xl', '20': 'text-2xl' };

	// 间距 class
	// spacing class
	const gapClass = { '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3', '4': 'gap-4' };

	// 内边距 class
	// padding class
	const pClass = { '0': 'p-0', '1': 'p-1', '2': 'p-2', '3': 'p-3', '4': 'p-4' };

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
		const gapNum = type === 'button' ? parseInt(space) : 0;
		const heightNum = parseInt(height);
		return (pNum * 2 + gapNum * 3 + heightNum * 4) * 4 + (type === 'block' ? 4 : 0);
	};

	// 按钮式 class
	// Button type class
	const buttonClass = `flex flex-col justify-center items-center shadow-sm font-bold active:scale-95 transition-all duration-100 ${
		heightClass[height] || 'h-12'
	} ${fontSizeClass[height] || 'text-base'} ${radiusClass[radius] || 'rounded'}${keyClass ? ' ' + keyClass : ''}`;

	// 块式 class
	// Block type class
	const blockClass = `flex flex-col justify-center items-center font-bold active:opacity-40 transition-all duration-100 ${
		heightClass[height] || 'h-12'
	} ${fontSizeClass[height] || 'text-base'}${keyClass ? ' ' + keyClass : ''}`;

	// 根据 type 类型，生成不同的基础样式
	// Generate different basic styles based on type type
	const baseClassFunc = key => {
		if (type === 'button') {
			return key === 'done' ? buttonClass : 'bg-white dark:bg-gray-700 ' + buttonClass;
		} else {
			return key === 'done' ? blockClass : 'bg-white dark:bg-gray-700 ' + blockClass;
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
		onclick && onclick(numStr, keyStr);
	};

	// 激活与关闭键盘事件
	// Activate and close the keyboard event
	$effect(() => {
		if (visible) {
			onopen && onopen(keyboardHeight());
		} else {
			onclose && onclose();
		}
	});
</script>

<Popup bind:visible size={0} mask={{ opacity: '0' }} transitionDistance={keyboardHeight()} {...popup}>
	<div
		class="bg-gray-100 dark:bg-gray-950 text-center {type === 'block' ? 'border-t border-gray-100 dark:border-gray-950' : ''} {pClass[p] ||
			'p-2'}{panelClass ? ' ' + panelClass : ''}"
	>
		<div class="grid {type === 'button' ? gapClass[space] || 'gap-2' : 'gap-px'} {done ? 'grid-cols-4' : 'grid-cols-3'}">
			{#each reverse ? [7, 8, 9] : [1, 2, 3] as item}
				<button class={baseClassFunc(item)} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if done}
				<button class={baseClassFunc('delete')} onclick={() => clickFunc('delete')}>
					<Icon name="ri-delete-back-2-line" size={Number(height) * 2} />
				</button>
			{/if}
			{#each [4, 5, 6] as item}
				<button class={baseClassFunc(item)} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if done}
				<button
					class="{baseClassFunc('done')} h-full row-span-3 bg-primary dark:bg-dark text-white dark:text-black {doneDisabled
						? 'active:!scale-100 transition-none !opacity-50'
						: ''}{doneClass ? '' + doneClass : ''}"
					onclick={() => clickFunc('done')}
				>
					{doneText}
				</button>
			{/if}
			{#each reverse ? [1, 2, 3] : [7, 8, 9] as item}
				<button class={baseClassFunc(item)} onclick={() => clickFunc(item)}>{item} </button>
			{/each}
			{#if dot}
				<button class={baseClassFunc('.')} onclick={() => clickFunc('.')}>.</button>
			{/if}
			{#if done ? close : !dot && close}
				<button class={baseClassFunc('close')} onclick={() => clickFunc('close')}>
					<Icon name="ri-skip-down-line" size={Number(height) * 2} />
				</button>
			{/if}
			<button class={baseClassFunc('0') + ' ' + zeroColFunc()} onclick={() => clickFunc('0')}>0</button>
			{#if !done}
				<button class={baseClassFunc('delete')} onclick={() => clickFunc('delete')}>
					<Icon name="ri-delete-back-2-line" size={Number(height) * 2} />
				</button>
			{/if}
		</div>
	</div>
</Popup>
