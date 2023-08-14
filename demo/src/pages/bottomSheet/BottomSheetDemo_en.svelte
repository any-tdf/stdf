<!-- BottomSheet Demo -->
<script>
    import { BottomSheet, Cell, Toast, Button } from '../../../../packages/stdf/components';
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

    let toastBackVisible = false;
    let toastCloseVisible = false;

    const stayHeightList = [40, 60, 80];
    let currentHeight = 60;
    const heightChangeFunc = e => (currentHeight = e.detail);
</script>

<div class="py-4">
    <Cell title="Basic usage" on:click={() => (visible1 = true)} />
    <BottomSheet bind:visible={visible1} title="This area supports sliding">
        <div class="text-center h-full flex flex-col justify-center">
            <div>This is the content area</div>
        </div>
    </BottomSheet>

    <Cell title="Content area scrolling" on:click={() => (visible8 = true)} />
    <BottomSheet bind:visible={visible8}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="There is a return button" on:click={() => (visible2 = true)} />
    <BottomSheet
        bind:visible={visible2}
        showBackIcon
        title="Click back and closed to trigger events"
        on:back={() => (toastBackVisible = true)}
        on:close={() => (toastCloseVisible = true)}
    >
        <Aphorism num={12} />
    </BottomSheet>
    <Toast bind:visible={toastBackVisible} message="Trigger BottomSheet Return to the incident!" />
    <Toast bind:visible={toastCloseVisible} message="Trigger BottomSheet Close the event!" />

    <Cell title="The initial height is 90" on:click={() => (visible3 = true)} />
    <BottomSheet bind:visible={visible3} stayHeightIndex={2}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="Fixed height 40/60/80" on:click={() => (visible4 = true)} />
    <BottomSheet
        bind:visible={visible4}
        {stayHeightList}
        on:heightChange={heightChangeFunc}
        title={`The current fixed height is ${currentHeight}`}
    >
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="Click the mask to close" on:click={() => (visible5 = true)} />
    <BottomSheet bind:visible={visible5} maskClosable>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="The transition time is 1s" on:click={() => (visible6 = true)} />
    <BottomSheet bind:visible={visible6} duration={1000}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="The mask is completely transparent and blurred" on:click={() => (visible7 = true)} />
    <BottomSheet bind:visible={visible7} mask={{ opacity: 0, backdropBlur: 'base' }}>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="No content on the head" on:click={() => (visible9 = true)} />
    <BottomSheet bind:visible={visible9} showDivider={false} closeContent="" title="">
        <div class="px-4 py-8 h-full flex flex-col justify-around text-center">
            <div>Head area</div>
            <div>title</div>
            <div>Return and close icons</div>
            <div>Dividing line</div>
            <div>No display</div>
            <div>The location still retains as a sliding touch area</div>
            <div class="mb-8">
                <Button on:click={() => (visible9 = false)}>closure</Button>
            </div>
        </div>
    </BottomSheet>

    <Cell title="Hide off the icon and the title is centered" on:click={() => (visible10 = true)} />
    <BottomSheet bind:visible={visible10} closeContent="" titleAlign="center" maskClosable title="Click the mask to close">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="Another turning off icon" on:click={() => (visible13 = true)} />
    <BottomSheet bind:visible={visible13} closeContent="closeIcon">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="Close the area custom text" on:click={() => (visible14 = true)} />
    <BottomSheet bind:visible={visible14} closeContent="Finish">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="The icon is different from the corner style" on:click={() => (visible12 = true)} />
    <BottomSheet bind:visible={visible12} radius="base" showBackIcon>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="Can decline to the end to close" on:click={() => (visible11 = true)} />
    <BottomSheet bind:visible={visible11} closeHeight={10} closeContent="">
        <div class="p-4">
            Set the Closeheight to 10. If the position from the bottom of the page is less than 10% at the bottom of the page at the end of
            the sliding, it will automatically turn off.
        </div>
    </BottomSheet>
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
