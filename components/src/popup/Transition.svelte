<script>
    import { fly, scale } from 'svelte/transition';

    export let visible = false; //是否显示
    export let size = 40; //尺寸
    export let transitionParams = {}; //过渡动画参数
    export let transitionOutParams = {}; //过渡动画出去参数
    export let position = 'bottom'; //显示位置,center,top,bottom,left,right
    export let px = '0'; //左右间距
    export let py = '0'; //上下间距

    const sizeClass = {
        bottom: 'w-full',
        top: 'w-full',
        left: 'h-full',
        right: 'h-full',
        center: 'w-full',
    };
    const sizeStyle = {
        bottom: `height:${size === 0 ? 'auto' : size + '%'}`,
        top: `height:${size === 0 ? 'auto' : size + '%'}`,
        left: `width:${size === 0 ? 'auto' : size + '%'}`,
        right: `width:${size === 0 ? 'auto' : size + '%'}`,
        center: `height:${size === 0 ? 'auto' : size + '%'}`,
    };
    const pxClass = {
        '0': ' px-0',
        '1': ' px-1',
        '2': ' px-2',
        '3': ' px-3',
        '4': ' px-4',
        '5': ' px-5',
        '6': ' px-6',
        '8': ' px-8',
        '10': ' px-10',
        '12': ' px-12',
        '16': ' px-16',
        '20': ' px-20',
    };
    const pyClass = {
        '0': ' py-0',
        '1': ' py-1',
        '2': ' py-2',
        '3': ' py-3',
        '4': ' py-4',
        '5': ' py-5',
        '6': ' py-6',
        '8': ' py-8',
        '10': ' py-10',
        '12': ' py-12',
        '16': ' py-16',
        '24': ' py-24',
        '32': ' py-32',
        '48': ' py-48',
        '64': ' py-64',
    };

    // let dom = null;
    // $: {
    //     if (size === 0 && visible && dom) {
    //         // 获取dom的高度
    //         setTimeout(() => {
    //             transitionParams.y = dom.offsetHeight;
    //             console.log('transitionParams', transitionParams);
    //             // console.log('dom', dom, dom.offsetHeight);
    //         }, 5);
    //     }
    // }
</script>

{#if visible}
    {#if position === 'center'}
        <div
            out:scale={transitionOutParams}
            in:scale={transitionParams}
            class={`${sizeClass[position] || sizeClass['bottom']}${pxClass[px] || pxClass['0']}${
                pyClass[py] || pyClass['0']
            } pointer-events-auto`}
            style={sizeStyle[position] || sizeStyle['bottom']}
        >
            <slot />
        </div>
    {:else}
        <div
            in:fly={transitionParams}
            out:fly={transitionOutParams}
            class={`${sizeClass[position] || sizeClass['bottom']}${pxClass[px] || pxClass['0']}${
                pyClass[py] || pyClass['0']
            } pointer-events-auto`}
            style={sizeStyle[position] || sizeStyle['bottom']}
        >
            <slot />
        </div>
    {/if}
{/if}
