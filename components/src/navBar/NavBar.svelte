<script>
    import { createEventDispatcher, getContext } from 'svelte';
    import Icon from '../icon/Icon.svelte';
    import zh_CN from '../../lang/zh_CN';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 当前语言
    // current language
    const currentLang = getContext('STDF_lang') || zh_CN;
    const navBarLang = currentLang.navBar;
    const commonLang = currentLang.common;

    // 标题
    // Title
    export let title = navBarLang.title;

    //标题是否使用slot
    //Whether to use slot for title
    export let titleSlot = false;

    //左侧图标
    //Left icon
    export let left = 'back';

    //左侧图标参数
    //Left icon parameters
    export let leftIcon = {};

    //左侧是否使用slot
    //Whether to use slot for left
    export let leftSlot = false;

    //右侧 Icon 数组
    //Right Icon array
    export let rights = [];

    //右侧是否使用slot
    //Whether to use slot for right
    export let rightSlot = false;

    //是否显示底部分割线
    //Whether to show bottom line
    export let line = true;

    //注入CSS
    //Inject CSS
    export let injClass = '';

    //是否开启关爱版
    //Whether to open love version
    export let love = false;

    //图标大小
    //Icon size
    $: iconSize = love ? 30 : 24;

    //左侧图标点击事件
    //Left icon click event
    const clickLeftFun = () => {
        dispatch('clickleft');
    };

    //右侧图标点击事件
    //Right icon click event
    const clickRightFun = i => {
        dispatch('clickright', i);
    };
</script>

<div
    class={`h-12 w-full border-black/10 dark:border-white/10 flex justify-between leading-[3rem] ${
        line ? 'border-b ' : ' '
    }bg-white dark:bg-black/50${love ? ' text-xl' : ''}${injClass === '' ? '' : ' ' + injClass}`}
>
    {#if leftSlot}
        <slot name="left">
            {commonLang.slotEmpty}
        </slot>
    {:else if left === 'back'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="text-center lining-nums min-w-[3rem] active:opacity-80" on:click={clickLeftFun}>
            <Icon name="ri-arrow-left-s-line" size={iconSize} top={-2} />
        </div>
    {:else if left === 'customIcon'}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="text-center lining-nums min-w-[3rem] active:opacity-80" on:click={clickLeftFun}>
            <Icon {...leftIcon} />
        </div>
    {:else}
        <div class="w-4 h-full" />
    {/if}
    <div class="flex-1 truncate" class:pl-2={left === 'none'}>
        {#if titleSlot}
            <slot name="title">
                {commonLang.slotEmpty}
            </slot>
        {:else}
            {title}
        {/if}
    </div>
    <div class="flex">
        {#if rightSlot}
            <slot name="right">{commonLang.slotEmpty}</slot>
        {:else if rights.length > 0}
            {#each rights as icon, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="w-12 text-center active:opacity-80" on:click={() => clickRightFun(i)}>
                    <Icon {...icon} size={iconSize} />
                </div>
            {/each}
        {:else}
            <!-- none -->
        {/if}
    </div>
</div>
