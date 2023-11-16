<!-- Dialog Demo -->
<script>
	import { Dialog, Cell, Toast, Loading } from '../../../../../packages/stdf/components';
	import Aphorism from '../../components/Aphorism.svelte';

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

	let toastVisible = false;
	let toastVisible2 = false;
	let toastVisible3 = false;
	let toastVisible4 = false;

	$: if (visible8) {
		setTimeout(() => {
			visible8 = false;
		}, 3000);
	}

	let loading = false;
	const somethingFnc = () => {
		loading = true;
		setTimeout(() => {
			loading = false;
			visible18 = false;
			toastVisible4 = true;
		}, 3000);
	};
</script>

<div class="py-4">
	<Cell title="Basic usage" on:click={() => (visible1 = true)} />
	<Dialog bind:visible={visible1} title="Li Xiaoyao" content="Do you confirm that going to Xianling Island?" />

	<Cell title="Content use slot" on:click={() => (visible2 = true)} />
	<Dialog bind:visible={visible2} contentSlot>
		<Aphorism slot="content" num={1} compact />
	</Dialog>

	<Cell title="Display the title" on:click={() => (visible3 = true)} />
	<Dialog bind:visible={visible3} title="" />

	<Cell title="Click the mask to close" on:click={() => (visible5 = true)} />
	<Dialog bind:visible={visible5} popup={{ maskClosable: true }} />

	<Cell title="Custom icon" on:click={() => (visible6 = true)} />
	<Dialog
		bind:visible={visible6}
		content="Please wear a mask!"
		showIcon
		icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-[#48a1b4]' }}
		secondaryText="Not carried"
		primaryText="OK"
	/>

	<Cell title="The content uses slot and rolls" on:click={() => (visible4 = true)} />
	<Dialog bind:visible={visible4} contentSlot>
		<div slot="content" class="max-h-56 overflow-auto">
			<Aphorism num={6} compact />
		</div>
	</Dialog>

	<Cell title="Another animation effect" on:click={() => (visible11 = true)} />
	<Dialog bind:visible={visible11} content="Rebound transition" popup={{ easeType: 'backOut' }} />

	<Cell title="Title left" on:click={() => (visible7 = true)} />
	<Dialog bind:visible={visible7} title="Title left" titleAlign="left" />

	<Cell title="Automatically close" on:click={() => (visible8 = true)} />
	<Dialog bind:visible={visible8} content="do not move!I disappeared immediately after 3 seconds!" />

	<Cell title="The main button accounts for a little more" on:click={() => (visible9 = true)} />
	<Dialog bind:visible={visible9} btnRatio={[3, 2]} />

	<Cell title="Primary button position reverse" on:click={() => (visible10 = true)} />
	<Dialog bind:visible={visible10} btnReverse />

	<Cell title="The button spacing is larger" on:click={() => (visible19 = true)} />
	<Dialog bind:visible={visible19} btnGap="16" />

	<Cell title="The button is pure text" on:click={() => (visible12 = true)} />
	<Dialog bind:visible={visible12} btnStyle="text" />

	<Cell title="There is a division of the button for the button" on:click={() => (visible13 = true)} />
	<Dialog bind:visible={visible13} btnStyle="textLine" />

	<Cell title="Full rounded button" on:click={() => (visible15 = true)} />
	<Dialog bind:visible={visible15} primaryButton={{ radius: 'full' }} secondaryButton={{ radius: 'full' }} />

	<Cell title="Monitoring secondary event" on:click={() => (visible14 = true)} />
	<Dialog bind:visible={visible14} on:secondary={() => (toastVisible = true)} />
	<Toast bind:visible={toastVisible} message="Click to cancel!" />

	<Cell title="Supervision and closing incident" on:click={() => (visible16 = true)} />
	<Dialog bind:visible={visible16} on:close={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="Close Dialog!" />

	<Cell title="Main incident" on:click={() => (visible17 = true)} />
	<Dialog bind:visible={visible17} on:primary={() => (toastVisible3 = true)} />
	<Toast bind:visible={toastVisible3} message="Click to confirm!" />

	<Cell title="Main events asynchronous execution" on:click={() => (visible18 = true)} />
	<Dialog bind:visible={visible18} on:primary={somethingFnc} primarySlot title="Ghost" content="Do you have to enter the lock demon tower?">
		<span slot="primary">
			{#if loading}
				<Loading inverse width="12" height="6" type="1_17" />
			{:else}
				Enter
			{/if}
		</span>
	</Dialog>
	<Toast bind:visible={toastVisible4} message="Enter the lock demon tower!he lock demon tower!" />
</div>

<!-- Aphorism.svelte -->
<!-- 
<script>
    import aphorisms from '../data/aphorisms'; //Introduce data

    export let num = 0; //Display number
    export let compact = false; //Whether to compact mode

    //Randomly remove NUM data from Aphorisms
    const aphorismsList = aphorisms.sort(() => Math.random() - 0.5).slice(0, num);
</script>

<div class={`${compact ? '' : 'px-4 py-8 '}divide-y divide-black/5 dark:divide-white/5`}>
    {#each aphorismsList as item}
        <div class:py-6={num > 1}>
            <div class="text-sm text-justify">{item.text}</div>
            <div class="text-right mt-1" class:italic={item.fromItalic}>{item.from}</div>
        </div>
    {/each}
</div>
-->
