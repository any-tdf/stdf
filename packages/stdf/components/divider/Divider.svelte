<script>
    //分隔线类型：h/v
    // Divider type: h/v
    export let layout = 'h';

    //水平左右间距
    // Horizontal left and right margin
    export let px = '0';

    //水平高度
    // Horizontal height
    export let py = '4';

    //文本内容
    // Text content
    export let text = '';

    //文本位置（仅在水平分割线有效）
    // Text position (only valid for horizontal divider)
    export let align = 'center';

    //线条风格：solid/dashed/dotted
    // Line style: solid/dashed/dotted
    export let line = 'solid';

    //垂直间距
    // Vertical spacing
    export let mx = '1';

    //线条粗细
    // Line thickness
    export let weight = '1';

    //注入CSS
    // Inject CSS
    export let injClass = '';

    // 水平间距样式
    // Horizontal spacing style
    const pxObj = {
        '0': 'px-0',
        '4': 'px-4',
        '8': 'px-8',
        '16': 'px-16',
        '36': 'px-36',
    };

    // 水平高度样式
    // Horizontal height style
    const pyObj = {
        '0': 'py-0',
        '4': 'py-4',
        '8': 'py-8',
    };

    // 垂直间距样式
    // Vertical spacing style
    const mxObj = {
        '1': 'm-1',
        '2': 'm-2',
        '4': 'm-4',
    };

    // 线条风格样式
    // Line style style
    const lineObj = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
    };

    // 线条粗细样式
    // Line thickness style
    const weightHObj = {
        '1': 'border-t',
        '2': 'border-t-2 rounded-full',
        '4': 'border-t-4 rounded-full',
    };

    // 线条粗细样式
    // Line thickness style
    const weightWObj = {
        '1': 'border-r',
        '2': 'border-r-2 rounded-full',
        '4': 'border-r-4 rounded-full',
    };
</script>

{#if layout === 'v'}
    <div
        class={`inline ${weightWObj[weight] || weightWObj['1']} border-black/10 dark:border-white/20 ${mxObj[mx] || mxObj['1']} ${
            lineObj[line] || lineObj.solid
        } ${injClass}`}
    />
{:else}
    <div class={`flex items-center ${pxObj[px] || pxObj['0']} ${pyObj[py] || pyObj['4']}`}>
        {#if (text !== '' && align !== 'left') || text === ''}
            <div
                class={`grow  ${weightHObj[weight] || weightHObj['1']} border-black/10 dark:border-white/20 ${
                    lineObj[line] || lineObj.solid
                }  ${injClass}`}
            />
        {/if}
        {#if text !== ''}
            <div class={`flex-none mx-2 text-xs text-gray6 ${injClass}`}>{text}</div>
        {/if}
        {#if (text !== '' && align !== 'right') || text === ''}
            <div
                class={`grow  ${weightHObj[weight] || weightHObj['1']} border-black/10 dark:border-white/20 ${
                    lineObj[line] || lineObj.solid
                }  ${injClass}`}
            />
        {/if}
    </div>
{/if}
