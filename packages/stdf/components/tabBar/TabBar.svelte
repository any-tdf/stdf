<script>
    import { createEventDispatcher } from 'svelte';
    import Icon from '../icon/Icon.svelte';

    export let labels = []; //选项卡内容组  label group of TabBar
    export let active = 0; //当前选中的选项卡索引  index of active label
    export let line = false; //底部是否显示线条  whether to show line at the bottom
    export let lineW = 4; //线条占当前Tab宽度的比例  line width ratio of current Tab
    export let love = false; //是否开启关爱版  whether to open love version
    export let injClass = ''; //TabBar最外层注入CSS  TabBar outermost layer injection CSS
    export let tabInjClass = ''; //tab注入CSS  tab injection CSS
    export let activeTabInjClass = ''; //选中tab注入CSS   selected tab injection CSS
    export let activeInjClass = ''; //线条注入CSS  line injection CSS

    const dispatch = createEventDispatcher(); //事件派发器  event dispatcher

    const clickFun = i => {
        active = i;
        //派发TabBar点击事件，active表示点击的Tab索引值，即labels索引值
        //Dispatch TabBar click event, active indicates the index value of the clicked Tab, that is, the index value of labels
        dispatch('change', active); 
    };
    let tabW = 0;
    $: activeW = tabW / labels.length / lineW;
    $: activeLeft = active * (tabW / labels.length) + tabW / labels.length / 2 - activeW / 2;
</script>

<div bind:clientWidth={tabW} class={`bg-white dark:bg-gray1 relative ${injClass}`} style="padding-bottom: env(safe-area-inset-bottom);">
    {#if line}
        <div
            class={`mx-auto rounded-full h-[2px] absolute transition-all bottom-px bg-primary dark:bg-dark ${activeInjClass}`}
            style="width:{lineW < 1 ? tabW / labels.length : activeW < 2 ? 2 : activeW}px;left:{lineW < 1
                ? active * (tabW / labels.length)
                : activeLeft}px;"
        />
    {/if}
    <div class={`flex justify-between`}>
        {#each labels as label, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                on:click={() => clickFun(i)}
                class={`flex-1 flex flex-col justify-center text-center py-1 active:opacity-80 cursor-pointer ${
                    i === active ? 'text-primary dark:text-dark' : 'text-gray6'
                } ${love ? 'text-lg' : 'text-sm'} ${tabInjClass} ${i === active && activeTabInjClass}`}
            >
                {#if label.icon}
                    <div class={`${!label.text && 'py-2'}`}>
                        <i class:hidden={i !== active}>
                            <Icon
                                {...label.icon}
                                name={label.activeIcon ? label.activeIcon.name : label.icon.name}
                                size={i === active
                                    ? (label.activeIcon && label.activeIcon.size * (love ? 1.2 : 1)) || label.icon.size * (love ? 1.2 : 1)
                                    : label.icon.size * (love ? 1.2 : 1)}
                                top={0}
                            />
                        </i>
                        <i class:hidden={i === active}>
                            <Icon
                                {...label.icon}
                                name={label.icon.name}
                                size={i === active
                                    ? (label.activeIcon && label.activeIcon.size * (love ? 1.2 : 1)) || label.icon.size * (love ? 1.2 : 1)
                                    : label.icon.size * (love ? 1.2 : 1)}
                                top={0}
                            />
                        </i>
                    </div>
                {/if}
                {#if label.text}
                    <div class={`${label.icon ? 'mt-[2px]' : 'py-1 text-lg'} ${i === active && !label.icon ? ' font-bold' : ''}`}>
                        {label.text}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
