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

	// Demonstrate listening for click events
	let visibleToast = false;
	let key = '';
	const clickFunc = e => {
		key = e.detail.key;
		visibleToast = true;
	};

	// Demonstrate listening for open and close events
	let loveDom = null;
	// The distance from loveDom to the bottom of the window
	let loveDomBottom = 0;
	let value = '0';
	$: doneDisabled = value !== '5201314';
	let top = 0;
	const loveFunc = e => {
		value = e.detail.numStr || '0';
	};
	const openFunc = e => {
		// If the distance from loveDom to the bottom of the window is less than the height of the keyboard, move loveDom up to the height of the keyboard
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

<Cell title="Basic" on:click={() => (visible1 = true)} />
<NumKeyboard bind:visible={visible1} />

<Cell title="No show done" on:click={() => (visible2 = true)} />
<NumKeyboard bind:visible={visible2} done={false} />

<Cell title="Show close" on:click={() => (visible3 = true)} />
<NumKeyboard bind:visible={visible3} close />

<Cell title="Show close and not show done" subTitle="Must hidden dot" on:click={() => (visible9 = true)} />
<NumKeyboard bind:visible={visible9} close dot={false} done={false} />

<Cell title="Digit up and down" on:click={() => (visible4 = true)} />
<NumKeyboard bind:visible={visible4} reverse />

<Cell title="Increase key height" on:click={() => (visible5 = true)} />
<NumKeyboard bind:visible={visible5} height="16" />

<Cell title="Increase spacing" on:click={() => (visible6 = true)} />
<NumKeyboard bind:visible={visible6} gap="4" p="4" />

<Cell title="The decimal point is not displayed" on:click={() => (visible7 = true)} />
<NumKeyboard bind:visible={visible7} dot={false} />

<Cell title="Unnecessary all are not displayed" on:click={() => (visible8 = true)} />
<NumKeyboard bind:visible={visible8} done={false} dot={false} />

<Cell title="Block type" on:click={() => (visible10 = true)} />
<NumKeyboard bind:visible={visible10} type="block" height="14" p="0" />

<Cell title="Customize the doneText" on:click={() => (visible18 = true)} />
<NumKeyboard bind:visible={visible18} doneText="Transfer" />

<Cell title="Listen click event" on:click={() => (visible11 = true)} />
<NumKeyboard bind:visible={visible11} on:click={clickFunc} />
<Toast bind:visible={visibleToast} duration={500} message={`clicked ${key}`}></Toast>

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
<Cell title="Please enter 5201314" on:click={() => (visible12 = true)} />
<NumKeyboard bind:visible={visible12} bind:doneDisabled on:click={loveFunc} on:open={openFunc} on:close={closeFunc} />

<Cell title="Increase key corners" on:click={() => (visible13 = true)} />
<NumKeyboard bind:visible={visible13} radius="2xl" />

<Cell title="Done key injection Class" on:click={() => (visible14 = true)} />
<NumKeyboard bind:visible={visible14} doneClass="!bg-gradient-to-r from-[#9820a8] to-[#d16b98]" />

<Cell title="Panel and key injection Class" on:click={() => (visible15 = true)} />
<NumKeyboard
	bind:visible={visible15}
	panelClass="bg-gradient-to-r from-[#CE9FFC] to-[#7367F0]"
	keyClass="!bg-transparent border border-white/40 !text-white"
/>

<Cell title="Custom transition animations" subTitle="By popup" on:click={() => (visible16 = true)} />
<NumKeyboard bind:visible={visible16} popup={{ duration: 1000, easeType: 'bounceOut' }} />

<Cell title="Opaque background when open" subTitle="By mask in popup" on:click={() => (visible17 = true)} />
<NumKeyboard bind:visible={visible17} popup={{ mask: 0.4 }} />

<Cell title="Customize key fonts" subTitle="Needs imported and config in tailwind.config.js" on:click={() => (visible19 = true)} />
<NumKeyboard bind:visible={visible19} keyClass="font-Trueno" />
