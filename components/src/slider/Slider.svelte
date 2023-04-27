<script>
    import {onMount, createEventDispatcher} from 'svelte';
    import {fly} from 'svelte/transition';
    import {debounce, stepNumberFun} from '../utils';

    // 当前值
    // Current value
    export let value = 40; 

    // 步长
    // Step length
    export let step = 1; 
    
    // 可选最小值
    // Optional minimum value
    export let minRange = 0; 
    
    // 可选最大值
    // Optional maximum value
    export let maxRange = 100; 
    
    // 是否为区间选择
    // is range
    export let isRange = false; 
    
    // 区间选择开始值
    // Range selection start value
    export let startValue = 20; 
    
    // 区间选择结束值
    // Range selection end value
    export let endValue = 60; 
    
    // 提示显示方式
    // Tip display method
    export let showTip = 'touch'; 

    // 圆角
    // radius
    export let radius = 'full'; 
    
    // 滑块是否为线框
    // is line block
    export let lineBlock = false; 

    // 是否使用slot
    // is use slot
    export let useSlot = false; 
    
    // 是否禁用
    // is disabled
    export let disabled = false; 
    
    // 是否只读
    // is readonly
    export let readonly = false; 
    
    
    let lineDom = null;//滑动条dom
    let blockDom = null;//滑块dom
    let blockWidth = 0;//滑块宽度
    let lineDomStartX = 0;//滑块条起始位置
    let lineDomEndX = 0;//滑块条结束位置
    let lineDomWidth = 0;//滑块条宽度
    let currentX = (value - minRange) / (maxRange - minRange) * lineDomWidth; //初始位置
    let currentStartX = (startValue - minRange) / (maxRange - minRange) * lineDomWidth; //区间选择时开始位置
    let currentEndX = (endValue - minRange) / (maxRange - minRange) * lineDomWidth; //区间选择时结束位置
    let currentMove = 'none';//当前移动的滑块
    const dispatch = createEventDispatcher();//事件分发器
    //滑动开始
    const touchLineStart = e => {
        if (disabled || readonly) {
            return;
        }
        if (isRange) {
            //判断点击位置距离哪一个更近
            if (startValue === endValue) {
                console.log(e.targetTouches[0].clientX, currentStartX, currentEndX);
                if (e.targetTouches[0].clientX - lineDomStartX <= currentStartX) {
                    // 点击的是开始滑块
                    currentMove = 'start';
                    currentStartX = e.targetTouches[0].clientX - lineDomStartX;
                } else {
                    // 点击的是结束滑块
                    currentMove = 'end';
                    console.log('点击的是结束滑块1');
                    currentEndX = e.targetTouches[0].clientX - lineDomStartX;
                }
            } else if (Math.abs(e.targetTouches[0].clientX - currentStartX - lineDomStartX) <
                Math.abs(e.targetTouches[0].clientX - currentEndX - lineDomStartX)) {
                // 点击的是开始滑块
                currentMove = 'start';
                currentStartX = e.targetTouches[0].clientX - lineDomStartX;
            } else {
                console.log('点击的是结束滑块2');
                // 点击的是结束滑块
                currentMove = 'end';
                currentEndX = e.targetTouches[0].clientX - lineDomStartX;
            }
            startValue = stepNumberFun(minRange + currentStartX / lineDomWidth * (maxRange - minRange), step);
            endValue = stepNumberFun(minRange + currentEndX / lineDomWidth * (maxRange - minRange), step);
            dispatch('change', [startValue, endValue]);//触发事件
        } else {
            currentMove = 'one';
            currentX = e.targetTouches[0].clientX - lineDomStartX;
            value = stepNumberFun(currentX / lineDomWidth * (maxRange - minRange), step);
            dispatch('change', value);//触发事件
        }
    };
    const touchLineMove = e => {
        if (disabled || readonly) {
            return;
        }
        if (isRange) {
            if (currentMove === 'start') {
                if (e.targetTouches[0].clientX <= lineDomStartX) {
                    currentStartX = 0;
                } else if (e.targetTouches[0].clientX >= currentEndX + blockWidth / 2) {
                    currentStartX = currentEndX;
                } else {
                    currentStartX = e.targetTouches[0].clientX - lineDomStartX;
                }
            } else {
                if (e.targetTouches[0].clientX <= currentStartX + blockWidth / 2) {
                    currentEndX = currentStartX;
                } else if (e.targetTouches[0].clientX >= lineDomEndX) {
                    currentEndX = lineDomEndX - lineDomStartX;
                } else {
                    currentEndX = e.targetTouches[0].clientX - lineDomStartX;
                    //由于开启了防抖，有极短时间内会出现currentEndX大于lineDomEndX的情况，所以这里做了一个判断
                    currentEndX = currentEndX < currentStartX ? currentStartX : currentEndX;
                }
            }
            startValue = stepNumberFun(minRange + currentStartX / lineDomWidth * (maxRange - minRange), step);
            endValue = stepNumberFun(minRange + currentEndX / lineDomWidth * (maxRange - minRange), step);
            dispatch('change', [startValue, endValue]);//触发事件
        } else {
            if (e.targetTouches[0].clientX <= lineDomStartX) {
                currentX = 0;
            } else if (e.targetTouches[0].clientX >= lineDomEndX) {
                currentX = lineDomEndX - lineDomStartX;
            } else {
                currentX = e.targetTouches[0].clientX - lineDomStartX;
            }
            value = stepNumberFun(minRange + currentX / lineDomWidth * (maxRange - minRange), step);
            dispatch('change', value);//触发事件
        }
    };
    const touchLineEnd = () => {
        currentMove = 'none';
    };
    const radiusObj = {
        none: ' rounded-none',
        base: ' rounded',
        xl: ' rounded-xl',
        full: ' rounded-full',
    };
    onMount(() => {
        lineDomStartX = lineDom.getBoundingClientRect().left;
        lineDomEndX = lineDom.getBoundingClientRect().right;
        lineDomWidth = lineDom.getBoundingClientRect().width;
        currentX = (value - minRange) / (maxRange - minRange) * lineDomWidth; //挂载完成之后初始位置
        currentStartX = (startValue - minRange) / (maxRange - minRange) * lineDomWidth; //区间选择开始位置
        currentEndX = (endValue - minRange) / (maxRange - minRange) * lineDomWidth; //区间选择结束位置
        if (isRange) {
            blockWidth = blockDom.getBoundingClientRect().width;
        }
    });
</script>
<div class={`relative h-7${disabled ? ' opacity-50' : ''}`}>
    <div on:touchstart={touchLineStart} on:touchmove|preventDefault={debounce(touchLineMove,15)} on:touchend={touchLineEnd}
         class="absolute flex flex-col justify-center h-7 w-full" bind:this={lineDom}>
        {#if useSlot}
            <slot></slot>
        {:else}
            <div class={`w-full h-1 bg-black/5 dark:bg-white/5${radiusObj[radius]||radiusObj['full']}`}>
                {#if isRange}
                    <div class={`bg-primary dark:bg-dark h-1${radiusObj[radius]||radiusObj['full']}`}
                         style={`width:${currentEndX-currentStartX}px;transform: translateX(${currentStartX}px);`}></div>
                {:else}
                    <div class={`bg-primary dark:bg-dark h-1${radiusObj[radius]||radiusObj['full']}`} style={`width:${currentX}px`}></div>
                {/if}
            </div>
        {/if}
    </div>
    {#if isRange}
        <div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
            <div class={`${lineBlock?'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-gray2':'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'}${radiusObj[radius]||radiusObj['full']}`}
                 style={`transform: translateX(calc(${currentStartX}px - 50%));`}>
                {#if showTip === 'always' || currentMove === 'start' && showTip !== 'never'}
                    <div class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${radius==='none'?' rounded-none':' rounded'}`}
                         style={`left: 50%;transform: translateX(-50%);`} in:fly={{ y: 8, duration: 500 }} out:fly={{ y: 8, duration: 300 }}>
                        {startValue}
                        <div class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
                             style={`top:100%;left:50%;transform: translateX(-50%)`}></div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
            <div class={`${lineBlock?'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-gray2':'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'}${radiusObj[radius]||radiusObj['full']}`}
                 style={`transform: translateX(calc(${currentEndX}px - 50%));`} bind:this={blockDom}>
                {#if showTip === 'always' || currentMove === 'end' && showTip !== 'never'}
                    <div class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${radius==='none'?' rounded-none':' rounded'}`}
                         style={`left: 50%;transform: translateX(-50%);`} in:fly={{ y: 8, duration: 500 }} out:fly={{ y: 8, duration: 300 }}>
                        {endValue}
                        <div class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
                             style={`top:100%;left:50%;transform: translateX(-50%)`}></div>
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <div class="absolute flex flex-col justify-center h-7 w-full pointer-events-none">
            <div class={`${lineBlock?'w-6 h-6 border border-primary dark:border-dark bg-white dark:bg-gray2':'w-5 h-5 ring-4 ring-primary/10 dark:ring-dark/10 bg-primary dark:bg-dark'}${radiusObj[radius]||radiusObj['full']}`}
                 style={`transform: translateX(calc(${currentX}px - 50%));`}>
                {#if showTip === 'always' || currentMove === 'one' && showTip !== 'never'}
                    <div class={`absolute -top-9 text-white dark:text-black text-xs py-1 bg-black/90 dark:bg-white px-2${radius==='none'?' rounded-none':' rounded'}`}
                         style={`left: 50%;transform: translateX(-50%);`} in:fly={{ y: 8, duration: 500 }} out:fly={{ y: 8, duration: 300 }}>
                        {value}
                        <div class="absolute w-0 h-0 border-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white"
                             style={`top:100%;left:50%;transform: translateX(-50%)`}></div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>