<script>
    import { onMount } from 'svelte';
    import {
        Loading1_0,
        Loading1_1,
        Loading1_2,
        Loading1_3,
        Loading1_4,
        Loading1_5,
        Loading1_6,
        Loading1_7,
        Loading1_8,
        Loading1_9,
        Loading1_10,
        Loading1_11,
        Loading1_12,
        Loading1_13,
        Loading1_14,
        Loading1_15,
        Loading1_16,
        Loading1_17,
    } from './loadings/oneColor';
    import { Loading2_0, Loading2_1 } from './loadings/twoColor';
    import { Loading4_0, Loading4_1, Loading4_2, Loading4_3 } from './loadings/fourColor';

    // 编号
    // type
    export let type = '1_0';

    // 容器高度
    // container height
    export let height = '8';

    // 容器宽度
    // container width
    export let width = '8';

    // 是否使用主题色
    // use theme color
    export let theme = false;

    // 是否反色
    // inverse color
    export let inverse = false;

    // 自定义颜色
    // custom color
    export let customColor = [];

    // 是否开启懒动画
    // lazy animation
    export let lazyAnimation = true;

    // 速度系数，基础为1，数值越大，速度越快
    // speed coefficient, the basic is 1, the larger the number, the faster the speed
    export let speed = 1;

    // loading 元素
    // loading element
    let loadingDom = null;

    // 容器高度样式
    // container height class
    const heightClass = {
        '2': 'h-2',
        '4': 'h-4',
        '6': 'h-6',
        '8': 'h-8',
        '12': 'h-12',
        '16': 'h-16',
        '20': 'h-20',
        '28': 'h-28',
        '36': 'h-36',
        '48': 'h-48',
        '56': 'h-56',
        '64': 'h-64',
        '72': 'h-72',
        '80': 'h-80',
        '96': 'h-96',
        full: 'h-full',
    };

    // 容器宽度样式
    // container width class
    const widthClass = {
        '2': 'w-2',
        '4': 'w-4',
        '6': 'w-6',
        '8': 'w-8',
        '12': 'w-12',
        '16': 'w-16',
        '20': 'w-20',
        '28': 'w-28',
        '36': 'w-36',
        '48': 'w-48',
        '56': 'w-56',
        '64': 'w-64',
        '72': 'w-72',
        '80': 'w-80',
        '96': 'w-96',
        full: 'w-full',
    };

    // 组合容器高度和宽度样式
    // combine container height and width class
    const sizeFunc = (height, width) => {
        return heightClass[height] + ' ' + widthClass[width];
    };

    // 递归获取 dom 的所有后代元素
    // recursively get all descendants of dom
    const getAllChildren = dom => {
        let children = [];
        if (dom?.children?.length) {
            for (let i = 0; i < dom.children.length; i++) {
                children.push(dom.children[i]);
                children = children.concat(getAllChildren(dom.children[i]));
            }
        }
        return children;
    };

    //判断 Loading 容器是否在可视区域内，如果不在，则设置所有后代元素的动画状态为 paused
    //determine whether the Loading container is in the visible area. If not, set the animation state of all descendants to paused
    const io = new IntersectionObserver(ele => {
        ele.forEach(item => {
            const loadingChildren = getAllChildren(loadingDom);
            // isIntersecting 是一个 Boolean 值，判断目标元素当前是否可见
            // isIntersecting is a Boolean value that determines whether the target element is currently visible
            if (item.isIntersecting) {
                //loadingDom 所有后代元素的 animation-play-state 设置为 running
                //loadingDom all descendants of the element's animation-play-state set to running
                loadingChildren.length > 0 &&
                    loadingChildren.forEach(item => {
                        item.style.animationPlayState = 'running';
                    });
            } else {
                //loadingDom 所有后代元素的 animation-play-state 设置为 paused
                //loadingDom all descendants of the element's animation-play-state set to paused
                loadingChildren.length > 0 &&
                    loadingChildren.forEach(item => {
                        item.style.animationPlayState = 'paused';
                    });
            }
        });
    });
    onMount(() => {
        if (lazyAnimation) {
            io.observe(loadingDom);
        }
    });
</script>

<div bind:this={loadingDom}>
    <!--oneÏ-->
    {#if type === '1_0'}
        <Loading1_0 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_1'}
        <Loading1_1 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_2'}
        <Loading1_2 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_3'}
        <Loading1_3 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_4'}
        <Loading1_4 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_5'}
        <Loading1_5 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_6'}
        <Loading1_6 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_7'}
        <Loading1_7 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_8'}
        <Loading1_8 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_9'}
        <Loading1_9 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_10'}
        <Loading1_10 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_11'}
        <Loading1_11 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_12'}
        <Loading1_12 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_13'}
        <Loading1_13 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_14'}
        <Loading1_14 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_15'}
        <Loading1_15 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_16'}
        <Loading1_16 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '1_17'}
        <Loading1_17 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />

        <!--twoColor-->
    {:else if type === '2_0'}
        <Loading2_0 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '2_1'}
        <Loading2_1 {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />

        <!--fourColor-->
    {:else if type === '4_0'}
        <Loading4_0 size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '4_1'}
        <Loading4_1 size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '4_2'}
        <Loading4_2 size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else if type === '4_3'}
        <Loading4_3 size={sizeFunc(height, width)} {customColor} bind:speed />
    {:else}
        <Loading1_0 {theme} {inverse} size={sizeFunc(height, width)} {customColor} bind:speed />
    {/if}
</div>
