<script>
    import { createEventDispatcher, getContext } from 'svelte';
    import Popup from '../popup/Popup.svelte';
    import Button from '../button/Button.svelte';
    import Icon from '../icon/Icon.svelte';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 当前语言
    // current language
    const currentLang = getContext('STDF_lang') || zh_CN;
    const dialogLang = currentLang.dialog;

    // 是否显示
    // Whether to show
    export let visible = false;

    // 标题
    // Title
    export let title = dialogLang.title;

    //标题对齐方式
    //Title alignment
    export let titleAlign = 'center';

    // 内容
    // Content
    export let content = dialogLang.content;

    // 内容是否使用slot
    // Whether to use slot for content
    export let contentSlot = false;

    // 弹出层参数
    // Popup parameters
    export let popup = {};

    // 是否显示图标
    // Whether to show icon
    export let showIcon = false;

    // 图标参数
    // Icon parameters
    export let icon = {};

    // 按钮样式，button/text/textLine
    // Button style, button/text/textLine
    export let btnStyle = 'button';

    // 主按钮文字
    // Primary button text
    export let primaryText = dialogLang.primaryText;

    // 主按钮内部是否使用slot
    // Whether to use slot for primary button
    export let primarySlot = false;

    // 主按钮参数
    // Primary button parameters
    export let primaryButton = {};

    // 次按钮文字
    // Secondary button text
    export let secondaryText = dialogLang.secondaryText;

    //次按钮参数
    // Secondary button parameters
    export let secondaryButton = {};

    // 主次按钮大小比例
    // Primary and secondary button size ratio
    export let btnRatio = [1, 1];

    // 主次按钮位置是否反转
    // Whether to reverse the position of primary and secondary buttons
    export let btnReverse = false;

    // 主按钮是否关闭弹窗
    // Whether to close the popup when the primary button is clicked
    export let secondaryClose = true;

    // 按钮间距
    // Button spacing
    export let btnGap = '2';

    // 标题对齐方式
    // Title alignment
    const titleAlignClass = {
        left: ' text-left',
        center: ' text-center',
        right: ' text-right',
    };

    // 按钮间距
    // Button spacing
    const btnGapClass = {
        '0': '',
        '1': ' gap-1',
        '2': ' gap-2',
        '4': ' gap-4',
        '8': ' gap-8',
        '12': ' gap-12',
        '16': ' gap-16',
    };

    // 次按钮点击事件
    // Secondary button click event
    const secondaryFunc = () => {
        if (secondaryClose) {
            visible = false;
        }
        dispatch('secondary');
    };

    // 主按钮点击事件
    // Primary button click event
    const primaryFunc = () => {
        dispatch('primary');
    };

    // 监听visible变化，派发open/close事件
    // Listen to the change of visible, dispatch open/close events
    $: {
        if (visible) {
            dispatch('open');
        } else {
            dispatch('close');
        }
    }
</script>

<Popup
    bind:visible
    size={0}
    maskClosable={false}
    duration={300}
    outDuration={150}
    position="center"
    radiusPosition="all"
    radius="lg"
    px="4"
    {...popup}
>
    <div class={`px-4 pt-4${btnStyle === 'button' ? ' pb-2' : ''} text-center space-y-4`}>
        <div class={`font-bold${titleAlignClass[titleAlign] || titleAlignClass['center']}`}>{title}</div>
        {#if showIcon}
            <div>
                <Icon {...icon} />
            </div>
        {/if}
        <div>
            {#if contentSlot}
                <slot name="content" />
            {:else}
                {content}
            {/if}
        </div>
        <div
            class={`flex w-full${btnGapClass[btnGap] || btnGapClass['2']}${btnReverse ? ' flex-row-reverse' : ''}${
                btnStyle === 'textLine' ? ' border-t border-black/10 dark:border-white/10' : ''
            }`}
        >
            <div
                class={`${btnStyle === 'textLine' && !btnReverse ? 'border-r border-black/10 dark:border-white/10' : ''}`}
                style="flex:{btnRatio[1]}"
            >
                <Button
                    size="full"
                    fill={btnStyle === 'button' ? 'colorLight' : 'text'}
                    heightIn={btnStyle === 'button' ? '3' : '2'}
                    injClass={btnStyle === 'button' ? '' : 'font-bold'}
                    {...secondaryButton}
                    on:click={secondaryFunc}
                >
                    {secondaryText}
                </Button>
            </div>
            <div
                class={btnStyle === 'textLine' && btnReverse ? 'border-r border-black/10 dark:border-white/10' : ''}
                style="flex:{btnRatio[0]}"
            >
                <Button
                    size="full"
                    fill={btnStyle === 'button' ? 'base' : 'textTheme'}
                    heightIn={btnStyle === 'button' ? '3' : '2'}
                    injClass={btnStyle === 'button' ? '' : 'font-bold'}
                    {...primaryButton}
                    on:click={primaryFunc}
                >
                    {#if primarySlot}
                        <slot name="primary" />
                    {:else}
                        {primaryText}
                    {/if}</Button
                >
            </div>
        </div>
    </div>
</Popup>
