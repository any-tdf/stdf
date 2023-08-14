<!-- Modal Demo -->
<script>
    import { Modal, Cell, Toast } from '../../../../packages/stdf/components';
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

    let toastVisible = false;

    $: if (visible15) {
        setTimeout(() => {
            visible15 = false;
        }, 3000);
    }
</script>

<div class="py-4">
    <Cell title="基础用法" on:click={() => (visible1 = true)} />
    <Modal bind:visible={visible1} title="您明白吗？" content="留下来的人才是最痛苦的" btnText="我明白了" />

    <Cell title="内容使用插槽" on:click={() => (visible2 = true)} />
    <Modal bind:visible={visible2} contentSlot>
        <Aphorism num={1} compact />
    </Modal>

    <Cell title="不显示标题" on:click={() => (visible3 = true)} />
    <Modal bind:visible={visible3} title="" />

    <Cell title="不显示按钮" on:click={() => (visible4 = true)} />
    <Modal bind:visible={visible4} showBtn={false} contentSlot>
        <Aphorism num={1} compact />
    </Modal>

    <Cell title="点击遮罩关闭" on:click={() => (visible5 = true)} />
    <Modal bind:visible={visible5} popup={{ maskClosable: true }} />

    <Cell title="自定义图标" on:click={() => (visible6 = true)} />
    <Modal
        bind:visible={visible6}
        content="请佩戴口罩！"
        showIcon
        icon={{ name: 'ri-surgical-mask-fill', size: 40, injClass: 'text-[#48a1b4]' }}
    />

    <Cell title="错误状态按钮" on:click={() => (visible8 = true)} />
    <Modal bind:visible={visible8} btnText="我错了" button={{ state: 'error' }} />

    <Cell title="全圆角按钮" on:click={() => (visible9 = true)} />
    <Modal bind:visible={visible9} button={{ radius: 'full' }} />

    <Cell title="主题色纯文本按钮" on:click={() => (visible12 = true)} />
    <Modal bind:visible={visible12} button={{ fill: 'textTheme' }} />

    <Cell title="内容使用插槽且滚动" on:click={() => (visible10 = true)} />
    <Modal bind:visible={visible10} contentSlot>
        <div class="h-56 overflow-auto">
            <Aphorism num={6} compact />
        </div>
    </Modal>

    <Cell title="显示窄一点" on:click={() => (visible7 = true)} />
    <Modal bind:visible={visible7} popup={{ px: '20' }} />

    <Cell title="另一种动画效果" on:click={() => (visible11 = true)} />
    <Modal bind:visible={visible11} content="回弹过渡" popup={{ easeType: 'backOut' }} />

    <Cell title="监听关闭事件" on:click={() => (visible13 = true)} />
    <Modal bind:visible={visible13} on:close={() => (toastVisible = true)} />
    <Toast bind:visible={toastVisible} message="关闭了 Modal！" />

    <Cell title="标题居左" on:click={() => (visible14 = true)} />
    <Modal bind:visible={visible14} title="标题居左" titleAlign="left" />

    <Cell title="自动关闭" on:click={() => (visible15 = true)} />
    <Modal bind:visible={visible15} content="别动！3 秒后我立即消失！" />
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
