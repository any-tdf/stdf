<script>
	import { getContext } from 'svelte';
	import Icon from '../icon/Icon.svelte';
	import zh_CN from '../../lang/zh_CN';

	// 当前语言
	// current language
	const currentLang = getContext('STDF_lang') || zh_CN;
	const inputLang = currentLang.input;

	/** @typedef {import('../../index.d').Input} InputProps */
	/** @type {InputProps} */
	let {
		title = '',
		titlePosition = 'out',
		inputPosition = 'left',
		placeholder = '',
		radius = 'base',
		label1 = '',
		label2 = '',
		label3 = '',
		label4 = '',
		label5 = '',
		label6 = '',
		tip = '',
		data1 = '',
		data2 = '',
		data3 = '',
		value = '',
		clear = false,
		inputStyle = 'block',
		lineTransition = 'none',
		duration = 'base',
		autocomplete = true,
		py = '2',
		disabled = false,
		state: inputState = 'theme',
		type = 'text',
		inputmode = '',
		maxlength = 24,
		textareaMaxlength = 200,
		rows = 2,
		autosize = false,
		onfocus,
		onblur,
		onchange,
		onclear,
		onclicklabel1,
		onclicklabel2,
		onclicklabel3,
		onclicklabel4,
		onclicklabel5,
		onclicklabel6,
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
		tipChild,
	} = $props();

	// 是否获取焦点
	// Whether to get focus
	let focus = $state(false);

	// 中文输入上屏标识
	// Chinese input screening flag
	let flag = true;

	//textarea 元素
	//textarea element
	/** @type {HTMLTextAreaElement} */
	let textareaDom = $state(undefined);

	// 输入模式判断
	// Input mode judgment
	const modeFun = type => {
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
	const typeAction = node => {
		if (type !== 'textarea') {
			node.type = type === 'password' ? 'password' : 'text';
		}
	};

	// 圆角风格样式
	// Corner style style
	const radiusObj = { none: 'rounded-none', base: 'rounded', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' };

	// 输入框风格样式
	// Input box style style
	const inputStyleObj = {
		block: 'px-2 ring-2 ring-transparent bg-black/5 dark:bg-white/5 ' + radiusObj[radius] || radiusObj.base,
		line: 'px-1 border-b bg-transparent border-gray-300 dark:border-gray-500',
	};

	// 状态样式
	// State style
	const stateObj = {
		theme: 'ring-primary dark:ring-dark',
		success: 'ring-success',
		warning: 'ring-warning',
		error: 'ring-error',
		info: 'ring-info',
	};

	// 根据是否获取焦点判断输入框样式
	// Determine the input box style according to whether to get focus
	const inputStyleFocusObj = $derived({
		block: 'px-2 ring-2 bg-transparent ' + stateObj[inputState] || stateObj.theme + radiusObj[radius] || radiusObj.base,
		line: 'px-1 border-b bg-transparent border-gray-300 dark:border-gray-500',
	});

	// 线性动画样式
	// Linear animation style
	const lineTransitionStateObj = {
		theme: 'bg-primary dark:bg-dark ',
		success: 'bg-success',
		warning: 'bg-warning',
		error: 'bg-error',
		info: 'bg-info',
	};

	// 动画时长样式
	// Animation duration style
	const durationObj = { fast: 'duration-150', base: 'duration-300', slow: 'duration-500', slower: 'duration-1000' };

	// 垂直间距样式
	// Vertical spacing style
	const pyObj = { '0': 'py-0', '0.5': 'py-0.5', '1': 'py-1', '2': 'py-2', '3': 'py-3', '4': 'py-4', '6': 'py-6' };

	// 获取焦点是派发事件
	// Get focus to dispatch events
	const onFocus = () => {
		focus = true;
		onfocus && onfocus(value);
	};

	// 失去焦点时派发事件
	// Dispatch events when focus is lost
	const onBlur = () => {
		focus = false;
		onblur && onblur(value);
	};

	// 输入内容变化时触发
	// Triggered when input content changes
	const valueChangeFun = e => {
		//处理拼音输入时，内容上屏后才做校验
		//Handle pinyin input, content screening after validation
		setTimeout(function () {
			if (flag) {
				if (type === 'textarea' && autosize) {
					textareaDom.style.height = textareaDom.scrollHeight + 'px';
				}
				if (type === 'textarea' && e.target.value.length > textareaMaxlength) {
					//去除最后一个字符
					//Remove the last character
					e.target.value = e.target.value.substring(0, textareaMaxlength);
				}
				if (type !== 'textarea' && e.target.value.length > maxlength) {
					//去除最后一个字符
					//Remove the last character
					e.target.value = e.target.value.substring(0, maxlength);
				}
				if (type === 'decimal' || type === 'number') {
					// 数字
					// Number
					value = e.target.value.replace(/[^\d^.]+/g, '');
					// value = e.target.value.replace(/[^\d^\.]+/g, '');
				} else if (type === 'numeric') {
					// 整数
					// Integer
					value = e.target.value.replace(/[^\d]/g, '');
				} else {
					value = e.target.value;
				}
				onchange && onchange(value);
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
	const clearFun = () => {
		value = '';
		onclear && onclear();
	};

	// const clickLabel2Fun = () => {
	// 	onclicklabel2 && onclicklabel2();
	// };
	// const clickLabel3Fun = () => {
	// 	onclicklabel3 && onclicklabel3();
	// };
	// const clickLabel4Fun = () => {
	// 	onclicklabel4 && onclicklabel4();
	// };
	// const clickLabel5Fun = () => {
	// 	onclicklabel5 && onclicklabel5();
	// };
	// const clickLabel6Fun = () => {
	// 	onclicklabel6 && onclicklabel6();
	// };

	// 键盘事件
	// Keyboard event
	const keydownFunc = e => {
		// 派发事件，并传出按键的 key
		// Dispatch events and pass out the key of the key
		onkeydown && onkeydown(e.key);
	};
</script>

<div class={`px-2 ${pyObj[py] || pyObj['2']}`}>
	<label>
		<div class={`flex px-2 ${title === '' ? 'justify-end' : 'justify-between'}`}>
			{#if titlePosition === 'out'}
				{#if titleChild}
					{@render titleChild?.()}
				{:else if title === ''}
					<!-- none -->
				{:else}
					<div class="text-sm font-semibold mb-1">{title}</div>
				{/if}
			{/if}
			<div class="flex space-x-2 text-xs">
				{#if data1Child}
					{@render data1Child?.()}
				{:else if data1 === ''}
					<!-- none -->
				{:else}
					{data1}
				{/if}
				{#if data2Child}
					{@render data2Child?.()}
				{:else if data2 === ''}
					<!-- none -->
				{:else}
					{data2}
				{/if}
			</div>
		</div>
		<div
			class={`flex items-center my-0.5 space-x-1 text-sm relative transition-all whitespace-nowrap ${
				durationObj[duration] || durationObj.base
			} ${titlePosition === 'in' ? 'py-1' : 'py-3'} ${
				focus ? inputStyleFocusObj[inputStyle] || inputStyleFocusObj.block : inputStyleObj[inputStyle] || inputStyleObj.block
			} ${inputStyle === 'block' ? radiusObj[radius] || radiusObj.base : ''}`}
		>
			{#if label1Child}
				{@render label1Child?.()}
			{:else if label1 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel1 && onclicklabel1();
					}}
				>
					<Icon {...label1} />
				</div>
			{/if}
			{#if label2Child}
				{@render label2Child?.()}
			{:else if label2 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel2 && onclicklabel2();
					}}
				>
					{label2}
				</div>
			{/if}
			{#if label3Child}
				{@render label3Child?.()}
			{:else if label3 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel3 && onclicklabel3();
					}}
				>
					<Icon {...label3} />
				</div>
			{/if}
			<div class="flex flex-col grow">
				{#if titlePosition === 'in'}
					<div class="text-gray-400 text-xs">{title}</div>
				{/if}
				<div class="flex space-x-1">
					<div class="w-full">
						{#if type === 'textarea'}
							<textarea
								bind:value
								use:typeAction
								{rows}
								inputmode={mode}
								placeholder={placeholder !== '' ? placeholder : title !== '' ? inputLang.pleaseInput + ' ' + title : ''}
								class={`w-full focus:outline-none bg-transparent font-semibold ${inputPosition === 'left' ? 'text-left' : 'text-right'} ${
									disabled ? 'cursor-not-allowed opacity-50' : ''
								}`}
								onfocus={onFocus}
								onblur={onBlur}
								oninput={valueChangeFun}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								{autocomplete}
								{disabled}
								bind:this={textareaDom}
								onkeydown={keydownFunc}
							></textarea>
						{:else}
							<input
								bind:value
								use:typeAction
								inputmode={mode}
								placeholder={placeholder !== '' ? placeholder : title !== '' ? inputLang.pleaseInput + ' ' + title : ''}
								class={`w-full focus:outline-none bg-transparent font-semibold whitespace-normal ${
									inputPosition === 'left' ? 'text-left' : 'text-right'
								} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
								onfocus={onFocus}
								onblur={onBlur}
								oninput={valueChangeFun}
								oncompositionend={compositionendFun}
								oncompositionstart={compositionstartFun}
								{autocomplete}
								{disabled}
								onkeydown={keydownFunc}
							/>
						{/if}
					</div>
					{#if clear && value !== ''}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							onclick={e => {
								e.preventDefault();
								clearFun();
							}}
						>
							<Icon name="ri-close-circle-fill" size={16} alpha={0.3} />
						</div>
					{/if}
				</div>
			</div>
			{#if label4Child}
				{@render label4Child?.()}
			{:else if label4 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel4 && onclicklabel4();
					}}
				>
					<Icon {...label4} />
				</div>
			{/if}
			{#if label5Child}
				{@render label5Child?.()}
			{:else if label5 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel5 && onclicklabel5();
					}}
				>
					{label5}
				</div>
			{/if}
			{#if label6Child}
				{@render label6Child?.()}
			{:else if label6 === ''}
				<!-- none -->
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onclick={e => {
						e.preventDefault();
						onclicklabel6 && onclicklabel6();
					}}
				>
					<Icon {...label6} />
				</div>
			{/if}
			{#if inputStyle === 'line'}
				<div
					class={`h-[2px] absolute -bottom-px ${lineTransition === 'none' ? 'transition-colors' : 'transition-all'} ${
						durationObj[duration] || durationObj.base
					} ${!focus && lineTransition === 'none' && 'bg-transparent w-full'} ${
						focus && lineTransition === 'none' && `${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme} w-full`
					} ${!focus && lineTransition !== 'none' && `w-0 ${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme}`} ${
						focus && lineTransition !== 'none' && `w-full ${lineTransitionStateObj[inputState] || lineTransitionStateObj.theme}`
					}`}
					style={lineTransition === 'center'
						? 'left:50%;transform:translateX(calc( -50% - 0.25rem ));-webkit-transform:translateX(calc( -50% - 0.25rem ));'
						: 'left:0;transform:translateX( -0.25rem );-webkit-transform:translateX( -0.25rem );'}
				></div>
			{/if}
		</div>
		<div class={`flex  px-2 text-gay6 ${tip === '' ? 'justify-end' : 'justify-between'}`}>
			{#if tipChild}
				{@render tipChild?.()}
			{:else if tip === ''}
				<!-- none -->
			{:else}
				<div class="text-sm text-gray-400">
					{tip}
				</div>
			{/if}
			{#if data3Child}
				{@render data3Child?.()}
			{:else if data3 === ''}
				<!-- none -->
			{:else}
				<div class="text-xs">
					{data3}
				</div>
			{/if}
		</div>
	</label>
</div>
