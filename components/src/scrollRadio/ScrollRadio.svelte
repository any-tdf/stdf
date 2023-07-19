<script>
    import { onMount, createEventDispatcher } from 'svelte';

    // 定义事件派发器
    // Define event dispatcher
    const dispatch = createEventDispatcher();

    // 数据
    // Data
    export let data = [];

    // 可见行数
    // Visible rows
    export let showRow = 5;

    // 默认选中项索引
    // Default selected item index
    export let initIndex = 0;

    // data 中 label 对应的 key
    // The key corresponding to label in data
    export let labelKey = 'label';

    // 是否自动滚动到上次的选中项
    // Whether to automatically scroll to the last selected item
    export let autoScrollToLast = true;

    // 自动滚动到选中项（initIndex）时，是否使用动画
    // Whether to use animation when automatically scrolling to the selected item (initIndex)
    export let useAnimation = true;

    // 上次选中项索引
    // Last selected item index
    export let lastSelectedIndex = 0;

    // 对齐方式
    // Alignment
    export let align = 'center';

    // 是否触摸
    // Whether to touch
    let isTouch = false;

    // 对齐方式样式
    // Alignment style
    const alignClass = {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
    };

    // 单条高度对象
    // Single height object
    const itemHeightObj = { '3': 4, '5': 3, '7': 2 };

    // 实际显示行数
    // Actual number of rows displayed
    const showRowsInner = showRow === 3 || showRow === 5 || showRow === 7 ? showRow : 5;

    // 单条高度
    // Single height
    const itemHeight = itemHeightObj[showRowsInner];

    // 定义空对象 emptyObj，当 showRowsInner 为 3 时，newData 前后各补足一条 emptyObj，当 showRowsInner 为 5 时，newData 前后各补足两条 emptyObj，当 showRowsInner 为 7 时，newData 前后各补足三条 emptyObj
    // Define empty object emptyObj, when showRowsInner is 3, newData is supplemented with one emptyObj at the front and back, when showRowsInner is 5, newData is supplemented with two emptyObj at the front and back, when showRowsInner is 7, newData is supplemented with three emptyObj at the front and back
    const emptyObj = {};
    emptyObj[labelKey] = '';
    const newData =
        showRowsInner === 3
            ? [...[emptyObj], ...data, ...[emptyObj]]
            : showRowsInner === 5
            ? [...[emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj]]
            : [...[emptyObj, emptyObj, emptyObj], ...data, ...[emptyObj, emptyObj, emptyObj]];

    // 滚动元素
    // Scroll element
    let scrollElement = null;

    // 当前选中项索引
    // Current selected item index
    let currentIndex = 0;
    onMount(() => {
        if (scrollElement) {
            // 监听 scrollElement 的滚动事件，同时考虑节流，滚动结束时，计算当前最中间的元素的索引
            // Listen to the scroll event of scrollElement, and consider throttling at the same time. The index of the element in the middle is calculated when the scroll ends
            let scrollTimer = null;
            scrollElement.addEventListener('scroll', e => {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    const scrollTop = e.target.scrollTop;
                    currentIndex = Math.round(scrollTop / (itemHeight * 16));
                    dispatch('scrollEnd', { index: currentIndex, isTouch });
                });
            });
        }
    });
    $: {
        if (scrollElement) {
            if (autoScrollToLast) {
                scrollElement.scrollTop = lastSelectedIndex * itemHeight * 16;
            } else {
                scrollElement.scrollTop = initIndex * itemHeight * 16;
            }
        }
    }
</script>

<div class="overflow-auto relative picker-contents" style="height:{itemHeight * showRowsInner}rem;">
    <div
        class={`overflow-auto snap-y picker-contents ${useAnimation ? 'scroll-smooth' : 'scroll-auto'}`}
        style="height:{itemHeight * showRowsInner}rem;"
        bind:this={scrollElement}
        on:scroll={() => {
            isTouch = true;
        }}
        
    >
        {#each newData as item}
            <div
                class={`${alignClass[align] || alignClass.center} px-2 flex flex-col justify-center snap-center`}
                style="height:{itemHeight}rem;"
            >
                <div class="truncate">{item[labelKey]}</div>
            </div>
        {/each}
        <div
            class="absolute inset-0 w-full pointer-events-none border-b border-t border-white dark:border-black"
            style="height:{itemHeight * showRowsInner}rem"
        >
            <div
                class="bg-gradient-to-b from-white to-white/60 dark:from-black dark:to-black/60 border-b border-black/10 dark:border-white/20"
                style="height:{itemHeight * ((showRowsInner - 1) / 2)}rem;"
            />
            <div style="height:{itemHeight}rem;" />
            <div
                class="bg-gradient-to-t from-white to-white/60 dark:from-black dark:to-black/60 border-t border-black/10 dark:border-white/20"
                style="height:{itemHeight * ((showRowsInner - 1) / 2)}rem;"
            />
        </div>
    </div>
</div>

<style>
    .picker-contents::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
</style>
