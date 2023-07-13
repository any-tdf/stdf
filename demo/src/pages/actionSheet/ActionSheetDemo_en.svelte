<!-- ActionSheet Demo -->
<script>
    import { Cell, ActionSheet, Toast } from '../../../../components';

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

    const actions = [{ content: 'Option one' }, { content: 'Option twoion two' }, { content: 'Option three' }];
    const actions1 = [
        { content: 'Conventional option' },
        { content: 'Theme option', style: 'theme' },
        { content: 'Disable option', style: 'disabled' },
        { content: 'Warning option', style: 'danger' },
    ];
    const actions2 = [
        { content: 'Option one' },
        { content: 'Option two', desc: 'Here is description information description information' },
        { content: 'Option three', style: 'Here is description information' },
    ];
    const action3 = [
        { content: 'Fire girl', showImg: true, imgSrc: './assets/images/dota_火女.png', imgRadius: 'base' },
        { content: 'calf', showImg: true, imgSrc: './assets/images/dota_小牛.png', imgRadius: 'base' },
        { content: 'water man', showImg: true, imgSrc: './assets/images/dota_水人.png', imgRadius: 'base' },
    ];
    const action4 = [
        { content: 'Apple', showImg: true, imgSrc: './assets/logos/apple.png', imgRadius: 'none' },
        { content: 'Google', showImg: true, imgSrc: './assets/logos/google.png', imgRadius: 'none' },
        { content: 'Microsoft', showImg: true, imgSrc: './assets/logos/microsoft.png', imgRadius: 'none' },
        { content: 'Adobe', showImg: true, imgSrc: './assets/logos/adobe.png', imgRadius: 'none' },
        { content: 'Figma', showImg: true, imgSrc: './assets/logos/figma.png', imgRadius: 'none' },
    ];

    let toastVisible1 = false;
    let toastVisible2 = false;
    let toastVisible3 = false;
    let index = 0;
    let item = {};
    const clickActionFunc = e => {
        index = e.detail.index;
        item = e.detail.item;
        toastVisible3 = true;
    };
</script>

<div class="py-4">
    <Cell title="Basic usage" on:click={() => (visible1 = true)} />
    <ActionSheet bind:visible={visible1} {actions} />

    <Cell title="If you have canceled operation and click on the mask, you cannot turn off" on:click={() => (visible2 = true)} />
    <ActionSheet bind:visible={visible2} {actions} showCancel popup={{ maskClosable: false }} />

    <Cell title="Different styles" on:click={() => (visible3 = true)} />
    <ActionSheet bind:visible={visible3} actions={actions1} />

    <Cell title="Title and description information" on:click={() => (visible4 = true)} />
    <ActionSheet bind:visible={visible4} actions={actions2} title="This is the title, which can be briefly explained." />

    <Cell title="Come on the top" on:click={() => (visible5 = true)} />
    <ActionSheet bind:visible={visible5} {actions} popup={{ radius: 'xl' }} />

    <Cell title="There is a spacing on both sides" on:click={() => (visible6 = true)} />
    <ActionSheet bind:visible={visible6} {actions} popup={{ radius: 'xl', px: '2' }} />

    <Cell title="Supervision and closing incident" on:click={() => (visible7 = true)} />
    <ActionSheet bind:visible={visible7} {actions} on:close={() => (toastVisible1 = true)} />
    <Toast bind:visible={toastVisible1} message="closed ActionSheet!" />

    <Cell title="Supervision and canceling incident" on:click={() => (visible8 = true)} />
    <ActionSheet bind:visible={visible8} {actions} showCancel on:cancel={() => (toastVisible2 = true)} />
    <Toast bind:visible={toastVisible2} message="Click to cancel!" />

    <Cell title="Survening options click event" on:click={() => (visible9 = true)} />
    <ActionSheet bind:visible={visible9} {actions} on:clickAction={clickActionFunc} />
    <Toast bind:visible={toastVisible3} message={`Click the ${index + 1} item,${item.content}!`} />

    <Cell title="Click the option not to be closed" on:click={() => (visible10 = true)} />
    <ActionSheet bind:visible={visible10} {actions} actionClosable={false} />

    <Cell title="Options with pictures" on:click={() => (visible11 = true)} />
    <ActionSheet bind:visible={visible11} actions={action3} />

    <Cell title="Option left" on:click={() => (visible12 = true)} />
    <ActionSheet bind:visible={visible12} actions={action4} align="left" />
</div>
