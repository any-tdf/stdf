<!-- NumKeyboard Demo -->
<script>
	import { NumKeyboard, Cell, Toast } from '../../../../../packages/stdf/components';
	import { Confetti } from 'svelte-confetti';

	let visible1 = false;
	let visible2 = false;
	let visible3 = false;
	let visible4 = false;
	let visible5 = false;
	let visible6 = false;
	let visible7 = false;
	let visible8 = false;
	let visible9 = false;
	let visible10 = false;
	let visible11 = false;
	let visible12 = false;
	let visible13 = false;
	let visible14 = false;
	let visible15 = false;
	let visible16 = false;
	let visible17 = false;
	let visible18 = false;
	let visible19 = false;

	// 演示监听点击事件
	let visibleToast = false;
	let key = '';
	const clickFunc = e => {
		key = e.detail.key;
		visibleToast = true;
	};

	// 演示监听开启与关闭事件
	let loveDom = null;
	// loveDom 距离窗口底部的距离
	let loveDomBottom = 0;
	let value = '0';
	$: doneDisabled = value !== '5201314';
	let top = 0;
	const loveFunc = e => {
		value = e.detail.numStr || '0';
	};
	const openFunc = e => {
		// 如果 loveDom 距离窗口底部小于键盘高度，就把 loveDom 向上移动键盘高度
		loveDomBottom = window.innerHeight - loveDom.getBoundingClientRect().bottom;
		if (loveDomBottom < e.detail.keyboardHeight) {
			top = -(e.detail.keyboardHeight - loveDomBottom) - 50;
		} else {
			top = 0;
		}
	};
	const closeFunc = () => {
		top = 0;
	};
</script>

<Cell title="基础用法" on:click={() => (visible1 = true)} />
<NumKeyboard bind:visible={visible1} />

<Cell title="不显示完成" on:click={() => (visible2 = true)} />
<NumKeyboard bind:visible={visible2} done={false} />

<Cell title="显示关闭" on:click={() => (visible3 = true)} />
<NumKeyboard bind:visible={visible3} close />

<Cell title="显示关闭不显示完成" subTitle="必须隐藏小数点" on:click={() => (visible9 = true)} />
<NumKeyboard bind:visible={visible9} close dot={false} done={false} />

<Cell title="数字上下反向" on:click={() => (visible4 = true)} />
<NumKeyboard bind:visible={visible4} reverse />

<Cell title="增高按键高度" on:click={() => (visible5 = true)} />
<NumKeyboard bind:visible={visible5} height="16" />

<Cell title="增大间距" on:click={() => (visible6 = true)} />
<NumKeyboard bind:visible={visible6} gap="4" p="4" />

<Cell title="不显示小数点" on:click={() => (visible7 = true)} />
<NumKeyboard bind:visible={visible7} close dot={false} />

<Cell title="不必要的全部不显示" on:click={() => (visible8 = true)} />
<NumKeyboard bind:visible={visible8} done={false} dot={false} />

<Cell title="块式" on:click={() => (visible10 = true)} />
<NumKeyboard bind:visible={visible10} type="block" height="14" p="0" />

<Cell title="自定义完成文字" on:click={() => (visible18 = true)} />
<NumKeyboard bind:visible={visible18} doneText="转账" />

<Cell title="监听点击事件" on:click={() => (visible11 = true)} />
<NumKeyboard bind:visible={visible11} on:click={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`点击了 ${key}`}></Toast>

<div
	class="relative text-center text-xl mx-16 rounded-full py-3 bg-primary text-white dark:bg-dark dark:text-black backdrop-blur transition-all"
	style="top:{top}px"
	bind:this={loveDom}
>
	{value}
	{#if !doneDisabled}
		<span class="absolute left-1/2"><Confetti rounded amount="100" /></span>
	{/if}
</div>
<Cell title="请输入 5201314" on:click={() => (visible12 = true)} />
<NumKeyboard bind:visible={visible12} bind:doneDisabled on:click={loveFunc} on:open={openFunc} on:close={closeFunc} />

<Cell title="增大按键圆角" on:click={() => (visible13 = true)} />
<NumKeyboard bind:visible={visible13} radius="2xl" />

<Cell title="完成按键注入 Class" on:click={() => (visible14 = true)} />
<NumKeyboard bind:visible={visible14} doneClass="!bg-gradient-to-r from-[#9820a8] to-[#d16b98]" />

<Cell title="面板与按键注入 Class" on:click={() => (visible15 = true)} />
<NumKeyboard
	bind:visible={visible15}
	panelClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="自定义过渡动画" subTitle="通过 popup" on:click={() => (visible16 = true)} />
<NumKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="激活时背景不透明" subTitle="通过 popup 内的 mask" on:click={() => (visible17 = true)} />
<NumKeyboard bind:visible={visible17} popup={{ mask: 0.4 }} />

<Cell title="自定义按键字体" subTitle="需要引入并在 tailwind.config.js 中配置" on:click={() => (visible19 = true)} />
<NumKeyboard bind:visible={visible19} keyClass="font-Trueno" />
