<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import { zh_CN, type LangProps } from '../../lang/index.js';
	import type { InputProps } from '../../types/index.js';

	// 当前语言
	// current language
	const currentLang = (getContext('STDF_lang') || zh_CN) as LangProps;
	const inputLang: LangProps['input'] = currentLang.input;

	let {
		title = '',
		titlePosition = 'out',
		inputPosition = 'left',
		placeholder = '',
		radius = 'sm',
		label1 = null,
		label2 = null,
		label3 = null,
		label4 = null,
		label5 = null,
		label6 = null,
		tip = null,
		data1 = null,
		data2 = null,
		data3 = null,
		value = $bindable(''),
		clear = false,
		inputStyle = 'block',
		lineTransition = null,
		duration = 'base',
		autocomplete = true,
		py = '2',
		disabled = false,
		state: inputState = 'theme',
		type = 'text',
		inputmode = '',
		readonly = false,
		select = false,
		required = false,
		maxlength = 24,
		textareaMaxlength = 200,
		rows = 2,
		autosize = false,
		negative = false,
		onfocus,
		onblur,
		onchange,
		onclear,
		onclickLabel1,
		onclickLabel2,
		onclickLabel3,
		onclickLabel4,
		onclickLabel5,
		onclickLabel6,
		onkeydown,
		titleChild,
		data1Child,
		data2Child,
		data3Child,
		label1Child,
		label2Child,
		label3Child,
		label4Child,
		label5Child,
		label6Child,
		tipChild
	}: InputProps = $props();

	// 是否获取焦点
	// Whether to get focus
	let focus = $state(false);

	// 中文输入上屏标识
	// Chinese input screening flag
	let flag = true;

	//textarea 元素
	//textarea element
	let textareaDom: HTMLTextAreaElement | undefined = $state(undefined);

	// 输入模式判断
	// Input mode judgment
	const modeFun = (type: string) => {
		switch (type) {
			case 'password':
				return 'text';
			case 'number':
				return 'decimal';
			case 'textarea':
				return 'text';
			default:
				return type;
		}
	};

	// 输入框类型判断
	// Input box type judgment
	const mode = $derived(inputmode === '' ? modeFun(type) : inputmode);

	// 输入框类型判断
	// Input type judgment
	const typeAction = (node: HTMLInputElement | HTMLTextAreaElement) => {
		if (type !== 'textarea' && node instanceof HTMLInputElement) {
			node.type = type === 'password' ? 'password' : 'text';
		}
	};

	// 圆角风格样式
	// Corner style style
	const radiusObj = { none: 'rounded-none', sm: 'rounded-sm', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' };

	// 输入框风格样式
	// Input box style style
	const inputStyleObj = {
		block: 'px-2 ring-2 ring-transparent bg-black/5 dark:bg-white/5 ' + radiusObj[radius] || radiusObj.sm,
		line: 'px-1 border-b bg-transparent border-gray-300 dark:border-gray-500'
	};

	// 状态样式
	// State style
	const stateObj = {
		theme: 'ring-primary dark:ring-dark',
		success: 'ring-success',
		warning: 'ring-warning',
		error: 'ring-error',
		info: 'ring-info'
	};

	// 根据是否获取焦点判断输入框样式
	// Determine the input box style according to whether to get focus
	const inputStyleFocusObj = $derived({
		block: 'px-2 ring-2 bg-transparent ' + stateObj[inputState] || stateObj.theme + radiusObj[radius] || radiusObj.sm,
		line: 'px-1 border-b bg-transparent border-gray-300 dark:border-gray-500'
	});

	// 线性动画样式
	// Linear animation style
	const lineTransitionStateObj = {
		theme: 'bg-primary dark:bg-dark ',
		success: 'bg-success',
		warning: 'bg-warning',
		error: 'bg-error',
		info: 'bg-info'
	};

	// 动画时长样式
	// Animation duration style
	const durationObj = { fast: 'duration-150', base: 'duration-300', slow: 'duration-500', slower: 'duration-1000' };

	// 垂直间距样式
	// Vertical spacing style
	const pyObj = { '0': 'py-0', '0.5': 'py-0.5', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4', '6': 'py-6' };

	// 获取焦点时派发事件
	// Get focus to dispatch events
	const onFocus = () => {
		focus = true;
		onfocus?.(value);
	};

	// 失去焦点时派发事件
	// Dispatch events when focus is lost
	const onBlur = () => {
		focus = false;
		onblur?.(value);
	};

	// 输入内容变化时触发
	// Triggered when input content changes
	const valueChangeFun = (e: HTMLInputElement | HTMLTextAreaElement) => {
		//处理拼音输入时，内容上屏后才做校验
		//Handle pinyin input, content screening after validation
		setTimeout(function () {
			if (flag) {
				if (type === 'textarea' && autosize) {
					if (textareaDom) {
						textareaDom.style.height = textareaDom.scrollHeight + 'px';
					}
				}
				if (type === 'textarea' && e.value.length > textareaMaxlength) {
					//去除最后一个字符
					//Remove the last character
					e.value = e.value.substring(0, textareaMaxlength);
				}
				if (type !== 'textarea' && e.value.length > maxlength) {
					//去除最后一个字符
					//Remove the last character
					e.value = e.value.substring(0, maxlength);
				}
				if (type === 'decimal' || type === 'number') {
					// 数字
					// Number
					if (negative && e.value.startsWith('-')) {
						// 允许第一个字符为负号
						// Allow the first character to be a negative sign
						value =
							'-' +
							e.value
								.substring(1)
								.replace(/[^\d.]+/g, '')
								.replace(/\.{2,}/g, '.')
								.replace(/^(\d*\.\d*)\./, '$1');
					} else {
						// 不允许小数点开头且只允许一个小数点
						// Do not allow decimal points to start and only allow one decimal point
						value = e.value
							.replace(/[^\d.]+/g, '')
							.replace(/^\./, '')
							.replace(/\.{2,}/g, '.')
							.replace(/^(\d*\.\d*)\./, '$1');
					}
				} else if (type === 'numeric') {
					// 整数
					// Integer
					if (negative && e.value.startsWith('-')) {
						// 允许第一个字符为负号
						// Allow the first character to be a negative sign
						value = '-' + e.value.substring(1).replace(/[^\d]+/g, '');
					} else {
						value = e.value.replace(/[^\d]+/g, '');
					}
				} else {
					value = e.value;
				}
				onchange?.(value);
			}
		}, 0);
	};

	//拼音输入时，文字还未上屏触发
	//Triggered when the text has not been screened during pinyin input
	const compositionendFun = () => {
		flag = true;
	};

	//拼音输入时，文字完成上屏触发
	//Triggered when the text is completed during pinyin input
	const compositionstartFun = () => {
		flag = false;
	};

	//清除时触发
	//Triggered when cleared
	const clearFun = (e?: Event) => {
		// 阻止事件冒泡，避免在 select 模式下触发焦点
		// Prevent event bubbling to avoid triggering focus in select mode
		e?.preventDefault();
		e?.stopPropagation();
		value = '';
		onclear?.();
		onchange?.('');
	};

	// 键盘事件
	// Keyboard event
	const keydownFunc = (e: KeyboardEvent) => {
		// 派发事件，并传出按键的 key
		// Dispatch events and pass out the key of the key
		onkeydown?.(e.key);
	};
</script>

<div class="px-2 {pyObj[py] || pyObj['2']}">
	<label>
		<div class="flex px-2 {title === '' ? 'justify-end' : 'justify-between'}">
			{#if titlePosition === 'out'}
				{#if titleChild}
					{@render titleChild?.()}
				{:else if title === ''}{:else}
					<div class="relative mb-1 text-sm font-semibold">
						{#if required}
							<span class="text-error absolute -left-2.5 text-base">*</span>
						{/if}
						{title}
					</div>
				{/if}
			{/if}
			<div class="flex space-x-2 text-xs">
				{#if data1Child}
					{@render data1Child?.()}
				{:else if data1 === ''}{:else}
					{data1}
				{/if}
				{#if data2Child}
					{@render data2Child?.()}
				{:else if data2 === ''}{:else}
					{data2}
				{/if}
			</div>
		</div>
		<div
			class="relative my-0.5 flex items-center space-x-1 whitespace-nowrap text-sm transition-all {durationObj[duration] ||
				durationObj.base} {titlePosition === 'in' ? 'py-1' : 'py-3'} {focus
				? inputStyleFocusObj[inputStyle] || inputStyleFocusObj.block
				: inputStyleObj[inputStyle] || inputStyleObj.block} {inputStyle === 'block' ? radiusObj[radius] || radiusObj.sm : ''}"
		>
			{#if label1Child}
				{@render label1Child?.()}
			{:else if label1 === null}{:else}
				<button onclick={() => onclickLabel1 && onclickLabel1()}>
					<Icon {...label1} />
				</button>
			{/if}
			{#if label2Child}
				{@render label2Child?.()}
			{:else if label2 === null}{:else}
				<button onclick={() => onclickLabel2 && onclickLabel2()}>
					{label2}
				</button>
			{/if}
			{#if label3Child}
				{@render label3Child?.()}
			{:else if label3 === null}{:else}
				<button onclick={() => onclickLabel3 && onclickLabel3()}>
					<Icon {...label3} />
				</button>
			{/if}
			<div class="flex grow flex-col">
				{#if titlePosition === 'in'}
					<div class="relative text-xs text-gray-400">
						{#if required}
							<span class="text-error absolute -left-2 text-sm">*</span>
						{/if}
						{title}
					</div>
				{/if}
				<div class="flex space-x-1">
					<div class="w-full">
						{#if type === 'textarea'}
							<textarea
								bind:value
								use:typeAction
								{rows}
								inputmode={mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
								placeholder={placeholder !== ''
									? placeholder
									: title !== ''
										? (select ? inputLang.pleaseSelect : inputLang.pleaseInput) + ' ' + title
										: ''}
								class="focus:outline-hidden w-full bg-transparent font-semibold text-black dark:text-white {inputPosition === 'left'
									? 'text-left'
									: 'text-right'} {disabled ? 'cursor-not-allowed opacity-50' : ''}"
								onfocus={onFocus}
								onblur={() => onBlur()}
								oninput={(e) => valueChangeFun(e.currentTarget)}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								autocomplete={autocomplete === true ? 'on' : 'off'}
								{disabled}
								readonly={readonly || select}
								bind:this={textareaDom}
								onkeydown={keydownFunc}
							></textarea>
						{:else}
							<input
								bind:value
								use:typeAction
								inputmode={mode as 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'email' | 'search' | 'url'}
								placeholder={placeholder !== ''
									? placeholder
									: title !== ''
										? (select ? inputLang.pleaseSelect : inputLang.pleaseInput) + ' ' + title
										: ''}
								class="focus:outline-hidden w-full whitespace-normal bg-transparent font-semibold text-black dark:text-white {inputPosition ===
								'left'
									? 'text-left'
									: 'text-right'} {disabled ? 'cursor-not-allowed opacity-50' : ''}"
								onfocus={onFocus}
								onblur={() => onBlur()}
								oninput={(e) => valueChangeFun(e.currentTarget)}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								autocomplete={autocomplete === true ? 'on' : 'off'}
								{disabled}
								readonly={readonly || select}
								onkeydown={keydownFunc}
							/>
						{/if}
					</div>
					{#if clear && value !== ''}
						<button onclick={(e) => clearFun(e)} aria-label="clear">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="fill-current opacity-30">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
								>
								</path>
							</svg>
						</button>
					{/if}
				</div>
			</div>
			{#if label4Child}
				{@render label4Child?.()}
			{:else if label4 === null}{:else}
				<button onclick={() => onclickLabel4 && onclickLabel4()}>
					<Icon {...label4} />
				</button>
			{/if}
			{#if label5Child}
				{@render label5Child?.()}
			{:else if label5 === null}{:else}
				<button onclick={() => onclickLabel5 && onclickLabel5()}>
					{label5}
				</button>
			{/if}
			{#if select}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current opacity-50">
					<path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z">
					</path>
				</svg>
			{/if}
			{#if label6Child}
				{@render label6Child?.()}
			{:else if label6 === null}{:else}
				<button onclick={() => onclickLabel6 && onclickLabel6()}>
					<Icon {...label6} />
				</button>
			{/if}
			{#if inputStyle === 'line'}
				<div
					class="absolute -bottom-px h-0.5 {lineTransition === null ? 'transition-colors' : 'transition-all'} {durationObj[duration] ||
						durationObj.base} {!focus && lineTransition === null && 'w-full bg-transparent'} {focus &&
						lineTransition === null &&
						`${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme} w-full`} {!focus &&
						lineTransition !== null &&
						`w-0 ${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme}`} {focus &&
						lineTransition !== null &&
						`w-full ${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme}`}"
					style={lineTransition === 'center'
						? 'left:50%;transform:translateX(calc( -50% - 0.25rem ));-webkit-transform:translateX(calc( -50% - 0.25rem ));'
						: 'left:0;transform:translateX( -0.25rem );-webkit-transform:translateX( -0.25rem );'}
				></div>
			{/if}
		</div>
		<div class="flex px-2 {tip === null ? 'justify-end' : 'justify-between'}">
			{#if tipChild}
				{@render tipChild?.()}
			{:else if tip === null}{:else}
				<div class="text-xs text-gray-400">
					{tip}
				</div>
			{/if}
			{#if data3Child}
				{@render data3Child?.()}
			{:else if data3 === null}{:else}
				<div class="text-xs">
					{data3}
				</div>
			{/if}
		</div>
	</label>
</div>
