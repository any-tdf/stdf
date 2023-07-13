<!-- Dialog Demo -->
<script>
    import { Dialog, Cell, Toast, Loading } from '../../../../components';
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
    <Cell title="基础用法" on:click={() => (visible1 = true)} />
    <Dialog bind:visible={visible1} title="李逍遥" content="你确认前往仙灵岛吗？" />

    <Cell title="内容使用插槽" on:click={() => (visible2 = true)} />
    <Dialog bind:visible={visible2} contentSlot>
        <Aphorism slot="content" num={1} compact />
    </Dialog>

    <Cell title="不显示标题" on:click={() => (visible3 = true)} />
    <Dialog bind:visible={visible3} title="" />

    <Cell title="点击遮罩关闭" on:click={() => (visible5 = true)} />
    <Dialog bind:visible={visible5} popup={{ maskClosable: true }} />

    <Cell title="自定义图标" on:click={() => (visible6 = true)} />
    <Dialog
        bind:visible={visible6}
        content="请佩戴口罩！"
        showIcon
        icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-[#48a1b4]' }}
        secondaryText="没携带"
        primaryText="好的"
    />

    <Cell title="内容使用插槽且滚动" on:click={() => (visible4 = true)} />
    <Dialog bind:visible={visible4} contentSlot>
        <div slot="content" class="max-h-56 overflow-auto">
            <Aphorism num={6} compact />
        </div>
    </Dialog>

    <Cell title="另一种动画效果" on:click={() => (visible11 = true)} />
    <Dialog bind:visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} />

    <Cell title="标题居左" on:click={() => (visible7 = true)} />
    <Dialog bind:visible={visible7} title="标题居左" titleAlign="left" />

    <Cell title="自动关闭" on:click={() => (visible8 = true)} />
    <Dialog bind:visible={visible8} content="别动！3 秒后我立即消失！" />

    <Cell title="主按钮占比多一点" on:click={() => (visible9 = true)} />
    <Dialog bind:visible={visible9} btnRatio={[3, 2]} />

    <Cell title="主次按钮位置反转" on:click={() => (visible10 = true)} />
    <Dialog bind:visible={visible10} btnReverse />

    <Cell title="按钮间距大一点" on:click={() => (visible19 = true)} />
    <Dialog bind:visible={visible19} btnGap="16" />

    <Cell title="按钮为纯文字" on:click={() => (visible12 = true)} />
    <Dialog bind:visible={visible12} btnStyle="text" />

    <Cell title="按钮为纯文字有分割线" on:click={() => (visible13 = true)} />
    <Dialog bind:visible={visible13} btnStyle="textLine" />

    <Cell title="全圆角按钮" on:click={() => (visible15 = true)} />
    <Dialog bind:visible={visible15} primaryButton={{ radius: 'full' }} secondaryButton={{ radius: 'full' }} />

    <Cell title="监听次要事件" on:click={() => (visible14 = true)} />
    <Dialog bind:visible={visible14} on:secondary={() => (toastVisible = true)} />
    <Toast bind:visible={toastVisible} message="点击了取消！" />

    <Cell title="监听关闭事件" on:click={() => (visible16 = true)} />
    <Dialog bind:visible={visible16} on:close={() => (toastVisible2 = true)} />
    <Toast bind:visible={toastVisible2} message="关闭了 Dialog！" />

    <Cell title="监听主要事件" on:click={() => (visible17 = true)} />
    <Dialog bind:visible={visible17} on:primary={() => (toastVisible3 = true)} />
    <Toast bind:visible={toastVisible3} message="点击了确认！" />

    <Cell title="异步执行主要事件" on:click={() => (visible18 = true)} />
    <Dialog bind:visible={visible18} on:primary={somethingFnc} primarySlot title="小鬼" content="你一定要进入锁妖塔吗？">
        <span slot="primary">
            {#if loading}
                <Loading slot="primary" inverse width="12" height="6" type="1_17" />
            {:else}
                进入
            {/if}
        </span>
    </Dialog>
    <Toast bind:visible={toastVisible4} message="已进入锁妖塔！" />
</div>

<!-- Aphorism.svelte -->
<!-- 
<script>
    import aphorisms from '../data/aphorisms'; //引入数据

    export let num = 0; //显示条数
    export let compact = false; //是否紧凑模式

    //从 aphorisms 随机取出 num 条数据
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
