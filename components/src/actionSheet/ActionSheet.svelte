<script>
    import { createEventDispatcher, getContext } from 'svelte';
    import Popup from '../popup/Popup.svelte';
    import zh_CN from '../../lang/zh_CN';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 当前语言
    // current language
    const currentLang = getContext('lang') || zh_CN;
    const actionSheetLang = currentLang.actionSheet;

    // 是否显示
    // Whether to show
    export let visible = false;

    // 标题
    // Title
    export let title = '';

    //标题对齐方式
    //Title alignment
    export let titleAlign = 'center';

    // 菜单项，style有 normal、theme、danger、disabled
    // Menu items, style has normal, theme, danger, disabled
    export let actions = [];

    // 弹出层参数
    // Popup parameters
    export let popup = {};

    // 是否显示取消选项。
    // Whether to show the cancel option.
    export let showCancel = false;

    // 取消选项文本
    // Cancel option text
    export let cancelText = actionSheetLang.cancelText;

    // 点击选项是否关闭
    // Click option to close
    export let actionClosable = true;

    // 对齐方式
    // Alignment
    export let align = 'center';

    // 标题对齐方式
    // Title alignment
    const titleAlignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    // 选项样式
    // Option style
    const stateClass = {
        normal: ' ',
        theme: ' text-primary dark:text-dark ',
        danger: ' text-error ',
        disabled: ' text-black/20 dark:text-white/20 ',
    };

    // 图片圆角
    // Image radius
    const imgRadiusClass = {
        none: 'rounded-none',
        base: 'rounded',
        full: 'rounded-full',
        lg: 'rounded-lg',
    };

    // 图片对齐方式
    // Image alignment
    const alignClass = {
        left: 'justify-start pl-4',
        center: 'justify-center',
        right: 'justify-end pr-4',
    };

    // 计算弹出层高度
    // Calculate the height of the popup
    const getTransitionDistanceunc = (title, showCancel, actions) => {
        const titleHeight = title ? 40 : 0;
        const cancelHeight = showCancel ? 56 : 0;
        // 循环 actions，如果有 desc 高度为 61, 没有 desc 高度为 56，分割线每条1px，计算总高度
        // Loop actions, if there is desc, the height is 61, if there is no desc, the height is 56, and the divider is 1px each, and the total height is calculated
        const actionsHeight = actions.reduce((total, item) => {
            return total + (item.desc ? 60 : 56);
        }, 0);
        return titleHeight + cancelHeight + actionsHeight + actions.length - 1;
    };

    // 取消按钮点击事件
    // Click event of cancel button
    const cancelFunc = () => {
        visible = false;
        dispatch('cancel'); //派发取消事件
    };

    // 选项点击事件，如果选项不可点击，不触发事件，如果可点击，触发事件，如果 actionClosable 为 true，关闭弹出层
    // Click event of action, if the action is not clickable, the event will not be triggered, if it is clickable, the event will be triggered, and if actionClosable is true, the popup will be closed
    const clickActionFunc = (index, item) => {
        if (item.style !== 'disabled') {
            dispatch('clickAction', { index, item }); //派发选项点击事件，返回选项索引和选项对象
            if (actionClosable) {
                visible = false;
            }
        }
    };

    // 监听 visible 变化，如果为 true，派发 open 事件，如果为 false，派发 close 事件
    // Listen to the change of visible, if it is true, dispatch the open event, if it is false, dispatch the close event
    $: {
        if (visible) {
            dispatch('open');
        } else {
            dispatch('close');
        }
    }
</script>

<Popup bind:visible size={0} maskClosable transitionDistance={getTransitionDistanceunc(title, showCancel, actions)} {...popup}>
    {#if title}
        <div
            class={`truncate text-xs text-black/50 dark:text-white/50 border-b border-black/5 dark:border-white/5 h-10 flex flex-col justify-center ${
                titleAlignClass[titleAlign] || titleAlignClass['left']
            }`}
        >
            {title}
        </div>
    {/if}
    <div>
        {#each actions as item, index}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class={`${item.style !== 'disabled' ? 'active:scale-90 ' : ''}transition-all flex items-center gap-2 ${
                    alignClass[align] || alignClass['center']
                }`}
                on:click={() => clickActionFunc(index, item)}
            >
                <!-- 图片 -->
                {#if item.showImg}
                    <div class={`w-6 h-6 overflow-hidden ${imgRadiusClass[item.imgRadius] || 'rounded-full'}`}>
                        <img class="w-full h-full object-cover" src={item.imgSrc} alt="" />
                    </div>
                {/if}
                <div>
                    <div
                        class={`truncate text-center font-bold${stateClass[item.style] || stateClass.normal}flex flex-col justify-center${
                            item.desc ? ' h-10' : ' h-14'
                        }`}
                    >
                        {item.content}
                    </div>
                    {#if item.desc}
                        <div class="truncate text-center text-xs pb-1 text-black/50 dark:text-white/40">{item.desc}</div>
                    {/if}
                </div>
            </div>
            {#if index !== actions.length - 1}
                <div class="h-px w-full bg-black/5 dark:bg-white/5" />
            {/if}
        {/each}
    </div>
    {#if showCancel}
        <div class="bg-black/5 dark:bg-white/5 h-2" />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="active:scale-90 transition-all text-center h-12 flex flex-col justify-center" on:click={cancelFunc}>{cancelText}</div>
    {/if}
</Popup>
