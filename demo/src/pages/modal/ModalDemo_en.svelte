<!-- Modal Demo -->
<script>
    import { Modal, Cell, Toast } from '../../../../packages/stdf';
    import Aphorism from '../../packages/stdf/Aphorism.svelte';

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

    let toastVisible = false;

    $: if (visible15) {
        setTimeout(() => {
            visible15 = false;
        }, 3000);
    }
</script>

<div class="py-4">
    <Cell title="Basic usage" on:click={() => (visible1 = true)} />
    <Modal bind:visible={visible1} title="Do you understand?" content="Those who stay will suffer the most" btnText="I see" />

    <Cell title="Content usage slot" on:click={() => (visible2 = true)} />
    <Modal bind:visible={visible2} contentSlot>
        <Aphorism num={1} compact />
    </Modal>

    <Cell title="Do not show the title" on:click={() => (visible3 = true)} />
    <Modal bind:visible={visible3} title="" />

    <Cell title="Do not show button" on:click={() => (visible4 = true)} />
    <Modal bind:visible={visible4} showBtn={false} contentSlot>
        <Aphorism num={1} compact />
    </Modal>

    <Cell title="Click the mask to close" on:click={() => (visible5 = true)} />
    <Modal bind:visible={visible5} popup={{ maskClosable: true }} />

    <Cell title="Custom icon" on:click={() => (visible6 = true)} />
    <Modal
        bind:visible={visible6}
        content="Please wear a mask!"
        showIcon
        icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-[#48a1b4]' }}
    />

    <Cell title="Error status button" on:click={() => (visible8 = true)} />
    <Modal bind:visible={visible8} btnText="I was wrong." button={{ state: 'error' }} />

    <Cell title="Full rounded corner button" on:click={() => (visible9 = true)} />
    <Modal bind:visible={visible9} button={{ radius: 'full' }} />

    <Cell title="Theme color plain text button" on:click={() => (visible12 = true)} />
    <Modal bind:visible={visible12} button={{ fill: 'textTheme' }} />

    <Cell title="Content uses slots and scrolls" on:click={() => (visible10 = true)} />
    <Modal bind:visible={visible10} contentSlot>
        <div class="h-56 overflow-auto">
            <Aphorism num={6} compact />
        </div>
    </Modal>

    <Cell title="Show narrow" on:click={() => (visible7 = true)} />
    <Modal bind:visible={visible7} popup={{ px: '20' }} />

    <Cell title="Another animation effect" on:click={() => (visible11 = true)} />
    <Modal bind:visible={visible11} content="Rebound transition" popup={{ easeType: 'backOut' }} />

    <Cell title="Listening shutdown event" on:click={() => (visible13 = true)} />
    <Modal bind:visible={visible13} on:close={() => (toastVisible = true)} />
    <Toast bind:visible={toastVisible} message="Shut down Modal！" />

    <Cell title="Heading left" on:click={() => (visible14 = true)} />
    <Modal bind:visible={visible14} title="Heading left" titleAlign="left" />

    <Cell title="Automatic shutdown" on:click={() => (visible15 = true)} />
    <Modal bind:visible={visible15} content="Don't move! I'll be gone in three seconds!" />
</div>

<!-- Aphorism.svelte -->
<!-- 
<script>
    import aphorisms from '../data/aphorisms'; //Incoming data

    export let num = 0; //Display number
    export let compact = false; //Compact or not mode

    //num bars were randomly extracted from aphorisms
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
