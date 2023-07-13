<!-- BottomSheet Demo -->
<script>
    import { getContext } from 'svelte';
    import { BottomSheet, Cell, Toast, Button, NoticeBar } from '../../../../components';
    import Aphorism from '../../components/Aphorism.svelte';

    const isIframe = getContext('iframe') === '1'; //判断是否是iframe

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

{#if isIframe}
    <NoticeBar textList={['BottomSheet 头部区域绑定了 Touch 事件，请直接在移动设备或通过开发者工具模拟移动设备预览。']} right="none" />
{/if}
<div class="py-4">
    <Cell title="基础用法" on:click={() => (visible1 = true)} />
    <BottomSheet bind:visible={visible1} title="此区域支持滑动">
        <div class="text-center h-full flex flex-col justify-center">
            <div>这里是内容区域</div>
        </div>
    </BottomSheet>

    <Cell title="内容区域滚动" on:click={() => (visible8 = true)} />
    <BottomSheet bind:visible={visible8}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="有返回按钮" on:click={() => (visible2 = true)} />
    <BottomSheet
        bind:visible={visible2}
        showBackIcon
        title="点击返回与关闭可触发事件"
        on:back={() => (toastBackVisible = true)}
        on:close={() => (toastCloseVisible = true)}
    >
        <Aphorism num={12} />
    </BottomSheet>
    <Toast bind:visible={toastBackVisible} message="触发了 BottomSheet 返回事件！" />
    <Toast bind:visible={toastCloseVisible} message="触发了 BottomSheet 关闭事件！" />

    <Cell title="初始高度为 90" on:click={() => (visible3 = true)} />
    <BottomSheet bind:visible={visible3} stayHeightIndex={2}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="固定高度为 40/60/80" on:click={() => (visible4 = true)} />
    <BottomSheet bind:visible={visible4} {stayHeightList} on:heightChange={heightChangeFunc} title={`当前固定高度为${currentHeight}`}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="点击遮罩可关闭" on:click={() => (visible5 = true)} />
    <BottomSheet bind:visible={visible5} maskClosable>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="出现过渡时间为 1 秒" on:click={() => (visible6 = true)} />
    <BottomSheet bind:visible={visible6} duration={1000}>
        <Aphorism num={12} />
    </BottomSheet>

    <Cell title="遮罩完全透明且模糊" on:click={() => (visible7 = true)} />
    <BottomSheet bind:visible={visible7} mask={{ opacity: 0, backdropBlur: 'base' }}>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="头部不显示任何内容" on:click={() => (visible9 = true)} />
    <BottomSheet bind:visible={visible9} showDivider={false} closeContent="" title="">
        <div class="px-4 py-8 h-full flex flex-col justify-around text-center">
            <div>头部区域</div>
            <div>标题</div>
            <div>返回与关闭图标</div>
            <div>分割线</div>
            <div>都不显示</div>
            <div>位置依旧保留作为滑动触控区域</div>
            <div class="mb-8">
                <Button on:click={() => (visible9 = false)}>关闭</Button>
            </div>
        </div>
    </BottomSheet>

    <Cell title="隐藏关闭图标且标题居中" on:click={() => (visible10 = true)} />
    <BottomSheet bind:visible={visible10} closeContent="" titleAlign="center" maskClosable title="点击遮罩关闭">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="另一种关闭图标" on:click={() => (visible13 = true)} />
    <BottomSheet bind:visible={visible13} closeContent="closeIcon">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="关闭区域自定义文字" on:click={() => (visible14 = true)} />
    <BottomSheet bind:visible={visible14} closeContent="完成">
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="图标不同圆角风格" on:click={() => (visible12 = true)} />
    <BottomSheet bind:visible={visible12} radius="base" showBackIcon>
        <Aphorism num={2} />
    </BottomSheet>

    <Cell title="可下滑到底部关闭" on:click={() => (visible11 = true)} />
    <BottomSheet bind:visible={visible11} closeHeight={10} closeContent="">
        <div class="p-4">将 closeHeight 设置为 10，如果滑动结束时位置距离页面底部小于页面高度的 10% 则自动关闭。</div>
    </BottomSheet>
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
