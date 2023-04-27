<script>
    import { onMount, createEventDispatcher, getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import zh_CN from '../../lang/zh_CN';

    import Mask from '../mask/Mask.svelte';
    import Icon from '../icon/Icon.svelte';

    // 当前语言
    // current language
    const currentLang = getContext('lang') || zh_CN;
    const bottomSheetLang = currentLang.bottomSheet;

    // 是否显示
    // show or not
    export let visible = false;

    // 标题
    // title
    export let title = bottomSheetLang.title;

    // 标题对齐方式
    // title align
    export let titleAlign = 'left';

    // 是否显示返回图标
    // show back icon or not
    export let showBackIcon = false;

    // 关闭区域内容，‘’表示不显示，‘closeIcon’表示显示关闭图标，’downIcon‘表示显示下拉图标，其余文字表示显示文字
    // close content, '' means not show, 'closeIcon' means show close icon, 'downIcon' means show down icon,other text means show text
    export let closeContent = 'downIcon';

    // 是否在顶部显示分割线
    // show divider or not at the top
    export let showDivider = true;

    // 过渡动画出现时间
    // transition animation appear time
    export let duration = 450;

    // 过渡动画退出时间
    // transition animation exit time
    export let outDuration = 240;

    // 遮罩层参数
    // mask params
    export let mask = {};

    // 点击遮罩层是否关闭
    // click mask to close or not
    export let maskClosable = false;

    // z-index
    export let zIndex = 600;

    // 固定高度列表
    // stay height list
    export let stayHeightList = [10, 50, 90];

    // 初始固定高度索引
    // initial stay height index
    export let stayHeightIndex = 1;

    // 滑动结束时位置低于此高度自动关闭
    // close when position lower than this height
    export let closeHeight = 0;

    // 圆角风格
    // radius style
    export let radius = 'full';

    // 创建事件派发器
    // create event dispatcher
    const dispatch = createEventDispatcher();

    // 固定高度
    // stay height
    let stayHeight = stayHeightList[stayHeightIndex] || stayHeightList[stayHeightList.length - 1];

    // 此时是否正在滑动
    // is sliding or not now
    let isTouch = false;

    // 滑动开始Y坐标，px
    // start Y coordinate, px
    let startY = 0;

    // 滑动中Y方向当前位置，px
    // current Y coordinate, px
    let currentY = 0;

    // 滑动开始距离顶部高度，%
    // start distance from top, %
    let startTop = 100 - stayHeight;

    // 滑动距离，%
    // move distance, %
    let moveDistance = 0;

    // 顶部滚动区域高度，%
    // top scroll area height, %
    let scrollTopHeight = 5;

    // 顶部滚动区域元素
    // top scroll area element
    let scrollTopDom = null;

    // 当前距离顶部高度，%
    // current distance from top, %
    $: currentTop = startTop + moveDistance;

    // 如果 stayHeightList 不是数组，或者元素不是正数，或者元素不是 0-100 之间的数，或者元素不是整数，给出警告。
    // If stayHeightList is not an array, or the element is not a positive number, or the element is not a number between 0 and 100, or the element is not an integer, give a warning.
    if (
        !Array.isArray(stayHeightList) ||
        stayHeightList.some(item => typeof item !== 'number' || item < 0 || item > 100 || item % 1 !== 0)
    ) {
        console.error(
            '[STDF BottomSheet error]stayHeightList 必须是一个 0-100 之间的正整数数组。(stayHeightList must be an array of positive integers between 0 and 100)'
        );
    }

    // 如果 stayHeightList 元素不是递增的,给出警告。
    // If the elements of stayHeightList are not increasing, give a warning.
    if (stayHeightList.some((item, index) => index > 0 && item <= stayHeightList[index - 1])) {
        console.error(
            '[STDF BottomSheet error]stayHeightList 数组元素必须是升序排列。(stayHeightList array elements must be in ascending order)'
        );
    }

    // 如果 stayHeightIndex 超出 stayHeightList 长度给出警告。
    // If stayHeightIndex exceeds the length of stayHeightList, give a warning.
    if (stayHeightIndex > stayHeightList.length - 1) {
        console.warn(
            '[STDF BottomSheet warn]stayHeightIndex 超出 stayHeightList 长度，将使用 stayHeightList 最后一个值。(stayHeightIndex exceeds the length of stayHeightList, the last value of stayHeightList will be used.)'
        );
    }

    // 如果 closeHeight 大于 stayHeightList 最小值给出警告。
    // If closeHeight is greater than the minimum value of stayHeightList, give a warning.
    if (closeHeight > stayHeightList[0]) {
        console.warn(
            '[STDF BottomSheet warn]closeHeight 大于 stayHeightList 最小值，closeHeight 将失效。(closeHeight is greater than the minimum value of stayHeightList, closeHeight will be invalid.)'
        );
    }

    // 标题对齐方式
    // title align
    const titleAlignClass = {
        left: ' text-left',
        center: ' text-center',
        right: ' text-right',
    };

    // 窗口圆角风格
    // window radius style
    const windowRadiusClass = {
        none: ' rounded-none',
        base: ' rounded-t-lg',
        full: ' rounded-t-2xl',
    };

    // 图标圆角风格
    // icon radius style
    const iconRadiusClass = {
        none: ' rounded-none',
        base: ' rounded',
        full: ' rounded-full',
    };

    // 滑动开始
    // start sliding
    const touchstartFun = e => {
        moveDistance = 0;
        startTop = currentTop;
        startY = e.touches[0].clientY;
        isTouch = true;
    };

    // 滑动中
    // sliding
    const touchmoveFun = e => {
        currentY = e.touches[0].clientY;
        //移动百分比，moveDistance为正时，向下移动
        //Move percentage, moveDistance is positive when moving down
        moveDistance = ((currentY - startY) / window.innerHeight) * 100;
        //处理向上滑动时超过最大高度情况
        //Handle the case when the maximum height is exceeded when sliding up
        if (moveDistance + startTop < 100 - stayHeightList[stayHeightList.length - 1]) {
            moveDistance = 100 - stayHeightList[stayHeightList.length - 1] - startTop;
        }
    };

    // 滑动结束
    // end sliding
    const touchendFun = () => {
        isTouch = false;
        //计算出每个高度对应的top值
        //Calculate the top value corresponding to each height
        let toTopList = stayHeightList.map(item => 100 - item);
        let min = 100;
        let currentIndex = 0;
        toTopList.forEach((item, index) => {
            if (Math.abs(item - currentTop) < min) {
                min = Math.abs(item - currentTop);
                currentIndex = index;
            }
        });
        currentTop = toTopList[currentIndex];
        //派发事件，传递当前高度
        //Dispatch events and pass the current
        dispatch('heightChange', stayHeightList[currentIndex]);
        //判断滑动结束时如果位置低于 closeHeight 自动关闭，并派发事件
        //If the position is lower than closeHeight at the end of the slide, it will be automatically closed and the event will be dispatched.
        if (((window.innerHeight - currentY) / window.innerHeight) * 100 < closeHeight && closeHeight > 0) {
            visible = false;
            dispatch('close');
        }
    };

    //点击遮罩层
    //click mask
    const clickMask = () => {
        //点击遮罩时派发clickMask事件
        //Dispatch clickMask event when clicking mask
        dispatch('clickMask');
        if (maskClosable) {
            visible = false;
        }
    };

    //点击关闭图标
    //click close icon
    const closeFunc = () => {
        visible = false;
        //点击关闭时派发close事件
        //Dispatch close event when clicking close
        dispatch('close');
    };

    //点击返回图标
    //click back icon
    const backFunc = () => {
        //点击返回时派发back事件
        //Dispatch back event when clicking back
        dispatch('back');
    };

    // 滚动时禁止 body 滚动
    // Disable body scrolling when scrolling
    $: {
        if (visible) {
            //当 visible 为 true 时，禁止 body 滚动
            //When visible is true, body scrolling is disabled
            const top = document.documentElement.scrollTop || document.body.scrollTop;
            document.body.style.cssText += `
            position: fixed;
            width: 100vw;
            left: 0;
            top: ${-top}px;
            touch-action:none;
        `;
        } else {
            const top = document.body.style.top;
            document.body.style.cssText += `
            position: static;
            touch-action:auto;
        `;
            window.scrollTo(0, Math.abs(parseFloat(top)));
        }
    }
    onMount(() => {
        if (visible) {
            // 滚动内容高度
            // Scroll content height
            scrollTopHeight = scrollTopDom.clientHeight;
        }
    });
</script>

{#if visible}
    <Mask visible {duration} {outDuration} {...mask} on:clickMask={clickMask} />
{/if}

<div class={`fixed w-screen h-screen inset-0 flex flex-col justify-end px-0 pointer-events-none`} style={`z-index:${zIndex};`}>
    {#if visible}
        <div
            class={`fixed w-screen bg-white dark:bg-gray1${windowRadiusClass[radius] || windowRadiusClass['full']} pointer-events-auto${
                isTouch ? '' : ' transition-all duration-300'
            }`}
            style={`height:${stayHeightList[stayHeightList.length - 1]}%;top:${currentTop}%;`}
            in:fly={{ y: (stayHeightList[stayHeightList.length - 1] / 100) * window.innerHeight, opacity: 1, duration }}
            out:fly={{ y: (stayHeightList[stayHeightList.length - 1] / 100) * window.innerHeight, opacity: 1, duration: outDuration }}
        >
            <div class="py-1" bind:this={scrollTopDom} on:touchstart={touchstartFun} on:touchmove={touchmoveFun} on:touchend={touchendFun}>
                <div class={`w-8 h-1 bg-black/20 dark:bg-white/30 mx-auto${radius === 'none' ? ' rounded-none' : ' rounded-full'}`} />
                <div class="px-3 py-1 flex justify-between items-center gap-2">
                    {#if showBackIcon}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class={`flex-none bg-black/5 dark:bg-white/10 w-6 h-6 text-center${
                                iconRadiusClass[radius] || iconRadiusClass['full']
                            }`}
                            on:click={backFunc}
                        >
                            <Icon name="ri-arrow-left-s-line" alpha={0.4} size={16} top={-2} />
                        </div>
                    {/if}
                    <div class={`font-bold text-lg h-7 truncate grow${titleAlignClass[titleAlign] || titleAlignClass['left']}`}>
                        {title}
                    </div>
                    {#if closeContent === ''}
                        <!-- null -->
                    {:else if closeContent === 'closeIcon'}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class={`flex-none bg-black/5 dark:bg-white/10 w-6 h-6 text-center${
                                iconRadiusClass[radius] || iconRadiusClass['full']
                            }`}
                            on:click={closeFunc}
                        >
                            <Icon name="ri-close-line" alpha={0.4} size={14} top={-2} />
                        </div>
                    {:else if closeContent === 'downIcon'}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class={`flex-none bg-black/5 dark:bg-white/10 w-6 h-6 text-center${
                                iconRadiusClass[radius] || iconRadiusClass['full']
                            }`}
                            on:click={closeFunc}
                        >
                            <Icon name="ri-arrow-down-s-line" alpha={0.4} size={16} top={-1} />
                        </div>
                    {:else}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="text-primary dark:text-dark font-bold" on:click={closeFunc}>{closeContent}</div>
                    {/if}
                </div>
            </div>
            {#if showDivider}
                <div class="w-full h-px bg-black/5 dark:bg-white/10" />
            {/if}
            <div
                class="overflow-auto"
                style="height:{window.innerHeight * ((100 - currentTop) / 100) - scrollTopHeight}px;overscroll-behavior-y: contain;"
            >
                <slot />
            </div>
        </div>
    {/if}
</div>
